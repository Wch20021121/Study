(() => {
  "use strict";

  const VERSION = window.__DRILL_VERSION__ || "1";
  const DATA = "../assets/drill";
  const HISTORY_KEY = "dse-drill-history-v1";
  const SEEN_KEY = "dse-drill-seen-v1";
  const SEEN_SETS_KEY = "dse-drill-seen-sets-v1";
  const SET_MODES = new Set(["reading", "partb", "cloze"]);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const nl2br = (s) => esc(s).replace(/\n/g, "<br>");

  const state = {
    index: null,
    mode: "all",
    descriptor: null,
    setKey: "",
    isSet: false,
    bank: null,
    items: [],
    selected: {},
    answerData: null,
    submitted: false,
  };

  function readJSON(key, fallback) {
    try {
      const raw = JSON.parse(localStorage.getItem(key) || "null");
      return raw == null ? fallback : raw;
    } catch (e) { return fallback; }
  }

  function showToast(message) {
    let toast = $("#toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function modeLabel(id) {
    return {
      all: "随机一题", reading: "随机阅读", first: "各年首题",
      readingFirst: "各年阅读首题", partb: "随机新题型", cloze: "随机完形",
    }[id] || "随机练";
  }

  async function fetchJSON(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`请求失败（${response.status}）`);
    return response.json();
  }

  function setKeyFor(descriptor) {
    if (descriptor.kind === "reading") return `${descriptor.year}-${descriptor.section}`;
    if (descriptor.kind === "partb") return `${descriptor.year}-partb`;
    return `${descriptor.year}-cloze`;
  }

  function readSeen() { return readJSON(SEEN_KEY, {}); }
  function readSeenSets() { return readJSON(SEEN_SETS_KEY, {}); }

  function markSeen(descriptor, setKey, isSet) {
    if (isSet) {
      const seen = readSeenSets();
      const list = Array.isArray(seen[state.mode]) ? seen[state.mode] : [];
      if (!list.includes(setKey)) list.push(setKey);
      seen[state.mode] = list;
      localStorage.setItem(SEEN_SETS_KEY, JSON.stringify(seen));
      return;
    }
    const seen = readSeen();
    const list = Array.isArray(seen[state.mode]) ? seen[state.mode] : [];
    if (!list.includes(descriptor.id)) list.push(descriptor.id);
    seen[state.mode] = list;
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  }

  function pickSingle(index, mode) {
    const candidates = (index.questions || []).filter((q) => (q.modes || []).includes(mode));
    if (!candidates.length) throw new Error("这个模式暂时没有题目");
    const seen = readSeen();
    const seenMode = new Set(Array.isArray(seen[mode]) ? seen[mode] : []);
    let pool = candidates.filter((q) => !seenMode.has(q.id));
    if (!pool.length) {
      pool = candidates;
      delete seen[mode];
      localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function pickSet(index, mode) {
    const groups = new Map();
    (index.questions || []).filter((q) => (q.modes || []).includes(mode)).forEach((q) => {
      const key = setKeyFor(q);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(q);
    });
    if (!groups.size) throw new Error("这个模式暂时没有题组");
    const seen = readSeenSets();
    const seenMode = new Set(Array.isArray(seen[mode]) ? seen[mode] : []);
    let keys = [...groups.keys()].filter((key) => !seenMode.has(key));
    if (!keys.length) {
      keys = [...groups.keys()];
      delete seen[mode];
      localStorage.setItem(SEEN_SETS_KEY, JSON.stringify(seen));
    }
    const key = keys[Math.floor(Math.random() * keys.length)];
    return { descriptor: groups.get(key)[0], setKey: key, isSet: true };
  }

  function pickSession(index, mode) {
    if (SET_MODES.has(mode)) return pickSet(index, mode);
    return { descriptor: pickSingle(index, mode), setKey: "", isSet: false };
  }

  function setHeader(descriptor) {
    const yearEl = $("#modeYear");
    const nameEl = $("#modeName");
    if (yearEl) yearEl.textContent = descriptor ? descriptor.year : "—";
    const metaYear = $("#metaYear");
    if (metaYear) metaYear.textContent = descriptor ? descriptor.year : "—";
    if (nameEl) nameEl.textContent = modeLabel(state.mode);
    if (descriptor) document.title = `${modeLabel(state.mode)} · ${descriptor.year} 英语（一）`;
    const section = $("#metaSection");
    if (section) section.textContent = descriptor ? descriptor.sectionLabel : "";
    const mode = $("#metaMode");
    if (mode) mode.textContent = `${modeLabel(state.mode)} · 做完再提交`;
    $("#skipButton").textContent = state.isSet ? "换一套" : "换一题";
  }

  function withBlanks(text, targetN) {
    return esc(text || "").replace(/\{\{(\d+)\}\}/g, (_, raw) => {
      const n = Number(raw);
      const isTarget = targetN != null && n === Number(targetN);
      return `<span class="drill-blank${isTarget ? " is-target" : ""}">${isTarget ? `第 ${n} 空` : n}</span>`;
    });
  }

  function renderPassage() {
    const mount = $("#passagePanel");
    const descriptor = state.descriptor;
    const bank = state.bank;
    if (!mount || !bank) return;
    const target = state.isSet ? null : (state.items[0] ? state.items[0].n : null);

    if (descriptor.kind === "cloze" && bank.cloze) {
      mount.innerHTML = `<div class="drill-paper-head"><span>${esc(bank.cloze.title || "完形填空")}</span></div>
        <div class="drill-paper">${bank.cloze.passage.map((p, i) => `<div class="drill-para"><span class="drill-para-no">P${i + 1}</span><p>${withBlanks(p.en, target)}</p></div>`).join("")}</div>`;
      return;
    }

    if (descriptor.kind === "reading") {
      const text = bank.reading.find((t) => t.id === descriptor.section);
      if (!text) {
        mount.innerHTML = '<div class="drill-error">原文没有找到。</div>';
        return;
      }
      mount.innerHTML = `<div class="drill-paper-head"><span>${esc(descriptor.sectionLabel)} · 原文</span></div>
        <div class="drill-paper">${text.paragraphs.map((p, i) => `<div class="drill-para"><span class="drill-para-no">P${i + 1}</span><p>${esc(p.en)}</p></div>`).join("")}</div>`;
      return;
    }

    if (descriptor.kind === "partb" && bank.partb) {
      mount.innerHTML = renderPartbPassage(bank.partb, target);
      return;
    }

    mount.innerHTML = '<div class="drill-error">这类题的原文暂时没有找到。</div>';
  }

  function renderPartbPassage(partb, target) {
    const type = partb.type || "7选5";
    const rows = [];
    if (type === "ordering") {
      Object.entries(partb.paragraphs || {}).forEach(([letter, p]) => {
        rows.push(`<div class="drill-para"><span class="drill-para-no">${esc(letter)}</span><p>${esc(p.en)}</p></div>`);
      });
    } else if (type === "matching") {
      (partb.blocks || []).forEach((b) => {
        rows.push(`<div class="drill-para"><span class="drill-para-no">${esc((b.label || "").split("·")[0].trim())}</span><p><b>${esc(b.label || "")}</b> ${esc(b.en || "")}</p></div>`);
      });
    } else {
      (partb.blocks || []).forEach((b, i) => {
        rows.push(`<div class="drill-para"><span class="drill-para-no">${String(i + 1).padStart(2, "0")}</span><p>${withBlanks(b.en, target)}</p></div>`);
      });
    }
    return `<div class="drill-paper-head"><span>${esc(partb.title || "新题型")}</span></div>
      <div class="drill-paper">${rows.join("")}</div>`;
  }

  function partbOptions(bank) {
    const options = bank.partb && bank.partb.options ? bank.partb.options : {};
    const entries = Object.entries(options).sort(([a], [b]) => a.localeCompare(b));
    if (entries.length) return entries.map(([letter, value]) => ({ letter, text: value.en || "" }));
    return Object.keys((bank.partb && bank.partb.paragraphs) || {}).sort()
      .map((letter) => ({ letter, text: `段落 ${letter}` }));
  }

  function optionsFor(item) {
    if (item.kind === "partb") return partbOptions(state.bank);
    return (item.options || []).map((text, i) => ({ letter: String.fromCharCode(65 + i), text }));
  }

  function buildItems(descriptor, bank) {
    const year = descriptor.year;
    if (descriptor.kind === "reading") {
      const text = bank.reading.find((t) => t.id === descriptor.section);
      if (!text) throw new Error("阅读原文没有找到");
      const questions = state.isSet ? text.questions : text.questions.filter((q) => Number(q.n) === Number(descriptor.n));
      return questions.map((q) => ({
        id: `${year}-${text.id}-${q.n}`, n: q.n, kind: "reading",
        stem: q.stem || `第 ${q.n} 题`, options: q.options || [],
        label: `${year} · ${descriptor.sectionLabel} · 第 ${q.n} 题`,
      }));
    }
    if (descriptor.kind === "cloze") {
      const questions = state.isSet ? bank.cloze.questions : bank.cloze.questions.filter((q) => Number(q.n) === Number(descriptor.n));
      return questions.map((q) => ({
        id: `${year}-cloze-${q.n}`, n: q.n, kind: "cloze",
        options: q.options || [], label: `${year} · 完形第 ${q.n} 题`,
      }));
    }
    if (descriptor.kind === "partb") {
      const ns = state.isSet ? [41, 42, 43, 44, 45] : [descriptor.n];
      return ns.map((n) => ({
        id: `${year}-partb-${n}`, n, kind: "partb",
        options: [], label: `${year} · 新题型 · 第 ${n} 题`,
      }));
    }
    throw new Error("未知题型");
  }

  function renderOptions(item) {
    const answer = state.answerData ? state.answerData[item.id] : null;
    const selected = state.selected[item.id] || "";
    const list = optionsFor(item);
    const note = state.submitted && answer && Array.isArray(answer.optionNotes) ? answer.optionNotes : [];
    return list.map((o, i) => {
      const isCorrect = state.submitted && answer && o.letter === answer.answer;
      const isWrong = state.submitted && o.letter === selected && answer && o.letter !== answer.answer;
      const cls = isCorrect ? " is-correct" : (isWrong ? " is-wrong" : (selected === o.letter ? " is-selected" : ""));
      const noteHtml = state.submitted && note[i] ? `<span class="drill-option-note">${esc(note[i])}</span>` : "";
      return `<label class="drill-option${cls}">
        <input type="radio" name="ans-${esc(item.id)}" value="${o.letter}"${selected === o.letter ? " checked" : ""}${state.submitted ? " disabled" : ""}>
        <span class="drill-letter">${o.letter}</span>
        <span class="drill-option-text">${esc(o.text)}${noteHtml}</span>
      </label>`;
    }).join("");
  }

  function renderItemResult(item) {
    const answer = state.answerData ? state.answerData[item.id] : null;
    if (!answer) return '<p class="drill-trap">答案解析暂时没有找到。</p>';
    const selected = state.selected[item.id] || "";
    const correct = selected === answer.answer;
    const evidence = answer.evidence ? `<div class="drill-evidence"><b>证据句</b>${esc(answer.evidence)}</div>` : "";
    const trap = answer.trap ? `<p class="drill-trap"><b>干扰项</b>${nl2br(answer.trap)}</p>` : "";
    const clue = answer.clue ? `<p class="drill-clue"><b>衔接线索</b>${esc(answer.clue)}</p>` : "";
    return `<div class="drill-item-result ${correct ? "is-correct" : "is-wrong"}">
      <div class="drill-item-verdict"><b>${correct ? "正确" : "错误"}</b><span>正确答案 ${esc(answer.answer)}${selected ? ` · 你选 ${esc(selected)}` : " · 未作答"}</span></div>
      <p class="drill-explanation"><b>解析</b>${nl2br(answer.explain || "暂无文字解析。")}</p>
      ${evidence}${trap}${clue}
    </div>`;
  }

  function renderQuestionSheet() {
    const mount = $("#questionMount");
    mount.className = `drill-set-list${state.isSet && state.descriptor.kind === "cloze" ? " is-cloze" : ""}`;
    mount.innerHTML = state.items.map((item) => {
      const prompt = item.kind === "reading"
        ? `<p class="drill-stem">${esc(item.stem)}</p>`
        : "";
      return `<article class="drill-item" data-id="${esc(item.id)}">
        <div class="drill-item-head"><span class="drill-item-no">${item.kind === "reading" ? `第 ${item.n} 题` : `第 ${item.n} 空`}</span></div>
        ${prompt}
        <div class="drill-options" role="radiogroup" aria-label="${item.kind === "reading" ? `第 ${item.n} 题` : `第 ${item.n} 空`}">${renderOptions(item)}</div>
        ${state.submitted ? renderItemResult(item) : ""}
      </article>`;
    }).join("");
    if (!state.submitted) {
      $$('input[type="radio"]', mount).forEach((input) => {
        input.addEventListener("change", () => {
          const card = input.closest(".drill-item");
          const id = card.dataset.id;
          state.selected[id] = input.value;
          $$(".drill-option", card).forEach((label) => {
            label.classList.toggle("is-selected", Boolean(label.querySelector("input:checked")));
          });
          updateProgress();
        });
      });
    }
  }

  function updateProgress() {
    const total = state.items.length;
    const done = state.items.filter((item) => state.selected[item.id]).length;
    const setCount = $("#setCount");
    if (setCount) setCount.textContent = `${done} / ${total}`;
    const submit = $("#submitButton");
    if (submit) submit.disabled = done === 0;
  }

  function renderSummary() {
    const total = state.items.length;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    state.items.forEach((item) => {
      const selected = state.selected[item.id];
      const answer = state.answerData[item.id];
      if (!selected) unanswered += 1;
      else if (answer && selected === answer.answer) correct += 1;
      else wrong += 1;
    });
    const result = $("#resultMount");
    result.innerHTML = `<div class="drill-summary-head"><div><p class="drill-result-kicker">${state.isSet ? "SET RESULT" : "RESULT"}</p><h2>${state.isSet ? "本套成绩" : "本题结果"}</h2></div>
      <div class="drill-summary-score"><b>${correct}</b><span>/ ${total}</span></div></div>
      <div class="drill-summary-stats"><span>正确 <b>${correct}</b></span><span>错误 <b>${wrong}</b></span><span>未答 <b>${unanswered}</b></span></div>`;
    result.hidden = false;
    $("#submitButton").hidden = true;
    $("#nextButton").hidden = false;
    $("#fullLink").hidden = false;
    $("#fullLink").href = `../analysis/${state.descriptor.year}.html`;
    $("#nextButton").textContent = state.isSet ? "下一套" : "下一题";
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function saveHistory() {
    const history = readJSON(HISTORY_KEY, []);
    state.items.forEach((item) => {
      const selected = state.selected[item.id] || "";
      const answer = state.answerData[item.id] || {};
      history.push({
        id: item.id,
        mode: state.mode,
        modeLabel: modeLabel(state.mode),
        label: item.label,
        correct: Boolean(answer.answer && selected === answer.answer),
        chosen: selected,
        answer: answer.answer || "",
        at: new Date().toISOString(),
      });
    });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-400)));
  }

  async function submit() {
    if (state.submitted) return;
    const total = state.items.length;
    const done = state.items.filter((item) => state.selected[item.id]).length;
    if (!done) {
      showToast("先至少选一道题");
      return;
    }
    if (done < total && !window.confirm(`还有 ${total - done} 题未作答，仍然提交并看答案吗？`)) return;
    const button = $("#submitButton");
    button.disabled = true;
    button.textContent = "正在取答案…";
    try {
      const data = await fetchJSON(`${DATA}/answers/${state.descriptor.year}.json?v=${VERSION}`);
      state.answerData = data;
      state.submitted = true;
      renderQuestionSheet();
      renderSummary();
      saveHistory();
      updateProgress();
    } catch (error) {
      button.disabled = false;
      button.textContent = state.isSet ? "提交整套" : "提交答案";
      showToast(`提交失败：${error.message}`);
    }
  }

  async function load(session) {
    const { descriptor, setKey, isSet } = session;
    state.descriptor = descriptor;
    state.setKey = setKey;
    state.isSet = Boolean(isSet);
    state.bank = null;
    state.items = [];
    state.selected = {};
    state.answerData = null;
    state.submitted = false;
    $("#drillCard").hidden = true;
    $("#drillLoading").hidden = false;
    $("#drillLoading").textContent = "正在抽题…";
    setHeader(descriptor);
    markSeen(descriptor, setKey, state.isSet);
    try {
      state.bank = await fetchJSON(`${DATA}/questions/${descriptor.year}.json?v=${VERSION}`);
      state.items = buildItems(descriptor, state.bank);
      renderPassage();
      renderQuestionSheet();
      updateProgress();
      $("#submitButton").hidden = false;
      $("#submitButton").disabled = true;
      $("#submitButton").textContent = state.isSet ? "提交整套" : "提交答案";
      $("#nextButton").hidden = true;
      $("#fullLink").hidden = true;
      $("#resultMount").hidden = true;
      $("#resultMount").innerHTML = "";
      $("#drillCard").hidden = false;
      $("#drillLoading").hidden = true;
      const jump = $("#jumpToQuestion");
      if (jump) jump.textContent = "去答题 ↓";
    } catch (error) {
      $("#drillLoading").textContent = `题目读取失败：${error.message}`;
    }
  }

  function next() {
    if (!state.index) return;
    try {
      const session = pickSession(state.index, state.mode);
      const url = new URL(location.href);
      url.searchParams.delete("id");
      url.searchParams.set("mode", state.mode);
      history.replaceState(null, "", url);
      load(session);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      showToast(error.message);
    }
  }

  async function init() {
    const params = new URLSearchParams(location.search);
    const requestedMode = params.get("mode") || "all";
    const explicitId = params.get("id");
    try {
      const index = await fetchJSON(`${DATA}/index.json?v=${VERSION}`);
      state.index = index;
      state.mode = (index.modes || []).some((m) => m.id === requestedMode) ? requestedMode : "all";
      let session = null;
      if (explicitId) {
        const descriptor = (index.questions || []).find((q) => q.id === explicitId);
        if (descriptor) {
          const isSet = SET_MODES.has(state.mode);
          session = { descriptor, setKey: isSet ? setKeyFor(descriptor) : "", isSet };
        }
      }
      if (!session) session = pickSession(index, state.mode);
      await load(session);
    } catch (error) {
      $("#drillLoading").textContent = `抽题失败：${error.message}。请确认页面通过 HTTP 打开。`;
    }
  }

  $("#submitButton")?.addEventListener("click", submit);
  $("#nextButton")?.addEventListener("click", next);
  $("#skipButton")?.addEventListener("click", next);
  $("#jumpToQuestion")?.addEventListener("click", () => {
    const target = state.submitted ? $("#resultMount") : $("#questionMount");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  init();
})();
