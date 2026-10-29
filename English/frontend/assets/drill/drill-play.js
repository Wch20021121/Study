(() => {
  "use strict";

  const VERSION = window.__DRILL_VERSION__ || "1";
  const DATA = "../assets/drill";
  const HISTORY_KEY = "dse-drill-history-v1";
  const SEEN_KEY = "dse-drill-seen-v1";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const nl2br = (s) => esc(s).replace(/\n/g, "<br>");
  const pad = (n) => String(n).padStart(2, "0");

  const state = {
    index: null,
    mode: "all",
    descriptor: null,
    bank: null,
    question: null,
    answer: null,
    selected: "",
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

  function typeLabel(type) {
    return {
      ordering: "排序", matching: "匹配", headings: "小标题匹配",
      "7选5": "7选5",
    }[type] || type || "客观题";
  }

  async function fetchJSON(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`请求失败（${response.status}）`);
    return response.json();
  }

  function readSeen() {
    return readJSON(SEEN_KEY, {});
  }

  function markSeen(mode, id) {
    const seen = readSeen();
    const list = Array.isArray(seen[mode]) ? seen[mode] : [];
    if (!list.includes(id)) list.push(id);
    seen[mode] = list;
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  }

  function pickQuestion(index, mode) {
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

  function setHeader(descriptor) {
    const yearEl = $("#modeYear");
    const nameEl = $("#modeName");
    if (yearEl) yearEl.textContent = descriptor ? descriptor.year : "—";
    if (nameEl) nameEl.textContent = modeLabel(state.mode);
    if (descriptor) document.title = `${modeLabel(state.mode)} · ${descriptor.year} 英语（一）`;
  }

  function renderPassage(descriptor, bank, question) {
    const mount = $("#passagePanel");
    if (!mount) return;
    if (descriptor.kind === "cloze" && bank.cloze) {
      const cloze = bank.cloze;
      mount.innerHTML = `<div class="drill-paper-head"><span>${esc(cloze.title || "完形填空")}</span><span>${esc(cloze.topic || "Use of English")}</span></div>
        ${cloze.intro ? `<p class="drill-paper-intro">${esc(cloze.intro)}</p>` : ""}
        ${cloze.directions ? `<p class="drill-paper-note">${esc(cloze.directions)}</p>` : ""}
        <div class="drill-paper">${cloze.passage.map((p, i) => `<div class="drill-para"><span class="drill-para-no">P${i + 1}</span><p>${withBlanks(p.en, question.n)}</p></div>`).join("")}</div>
        <p class="drill-context-note">本题只做第 ${question.n} 空；其他空格只作为上下文。</p>`;
      return;
    }

    if (descriptor.kind === "reading") {
      const text = bank.reading.find((t) => t.id === descriptor.section);
      if (!text) {
        mount.innerHTML = '<div class="drill-error">原文没有找到。</div>';
        return;
      }
      mount.innerHTML = `<div class="drill-paper-head"><span>${esc(descriptor.sectionLabel)} · 原文</span><span>${esc(descriptor.topic)}</span></div>
        ${text.intro ? `<p class="drill-paper-intro">${esc(text.intro)}</p>` : ""}
        <h2 class="drill-paper-title">${esc(text.cn_title || text.title || descriptor.sectionLabel)}</h2>
        <div class="drill-paper">${text.paragraphs.map((p, i) => `<div class="drill-para"><span class="drill-para-no">P${i + 1}</span><p>${esc(p.en)}</p></div>`).join("")}</div>`;
      return;
    }

    if (descriptor.kind === "partb" && bank.partb) {
      mount.innerHTML = renderPartbPassage(bank.partb, question);
      return;
    }

    mount.innerHTML = '<div class="drill-error">这类题的原文暂时没有找到。</div>';
  }

  function withBlanks(text, targetN) {
    return esc(text || "").replace(/\{\{(\d+)\}\}/g, (_, raw) => {
      const n = Number(raw);
      return `<span class="drill-blank${n === Number(targetN) ? " is-target" : ""}">${n === Number(targetN) ? `第 ${n} 空` : n}</span>`;
    });
  }

  function renderPartbPassage(partb, question) {
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
        rows.push(`<div class="drill-para"><span class="drill-para-no">${pad(i + 1)}</span><p>${withBlanks(b.en, question.n)}</p></div>`);
      });
    }
    return `<div class="drill-paper-head"><span>${esc(partb.title || "新题型")} · 新题型</span><span>${esc(partb.cn_title || partb.type || "")}</span></div>
      ${partb.directions ? `<p class="drill-paper-note">${esc(partb.directions)}</p>` : ""}
      ${partb.intro ? `<p class="drill-paper-intro">${esc(partb.intro)}</p>` : ""}
      <div class="drill-paper">${rows.join("")}</div>
      ${partb.fixed_note ? `<p class="drill-context-note">${esc(partb.fixed_note)}</p>` : ""}`;
  }

  function optionList(descriptor, bank) {
    if (descriptor.kind === "partb" && bank.partb) {
      const options = bank.partb.options || {};
      const entries = Object.entries(options).sort(([a], [b]) => a.localeCompare(b));
      if (entries.length) {
        return entries.map(([letter, value]) => ({ letter, text: value.en || "", zh: value.zh || "" }));
      }
      return Object.keys(bank.partb.paragraphs || {}).sort().map((letter) => ({ letter, text: `段落 ${letter}` }));
    }
    const q = state.question;
    if (!q) return [];
    return (q.options || []).map((text, i) => ({ letter: String.fromCharCode(65 + i), text }));
  }

  function renderOptions() {
    const mount = $("#questionMount");
    if (!mount) return;
    const descriptor = state.descriptor;
    const bank = state.bank;
    const q = state.question;
    const submitted = state.submitted;
    const answer = state.answer;
    const list = optionList(descriptor, bank);
    const note = submitted && answer && Array.isArray(answer.optionNotes) ? answer.optionNotes : [];
    let prompt = "";
    if (descriptor.kind === "cloze") {
      prompt = `<p class="drill-prompt">第 ${q.n} 空 · ${esc(q.type || "从下面选出最合适的一项")}</p>`;
    } else if (descriptor.kind === "reading") {
      prompt = `<p class="drill-stem">${esc(q.stem || `第 ${q.n} 题`)}</p>`;
    } else {
      prompt = `<p class="drill-stem">第 ${q.n} 空${q.type ? ` · ${esc(typeLabel(q.type))}` : ""}</p>`;
    }
    const opts = list.map((o) => {
      const isCorrect = submitted && answer && o.letter === answer.answer;
      const isWrong = submitted && o.letter === state.selected && answer && o.letter !== answer.answer;
      const cls = isCorrect ? " is-correct" : (isWrong ? " is-wrong" : "");
      const zh = submitted && note[list.indexOf(o)] ? `<span class="drill-option-note">${esc(note[list.indexOf(o)])}</span>` : "";
      return `<label class="drill-option${cls}">
        <input type="radio" name="drill-answer" value="${o.letter}"${state.selected === o.letter ? " checked" : ""}${submitted ? " disabled" : ""}>
        <span class="drill-letter">${o.letter}</span>
        <span class="drill-option-text">${esc(o.text)}${zh}</span>
      </label>`;
    }).join("");
    mount.innerHTML = `${prompt}<div class="drill-options" role="radiogroup" aria-label="选项">${opts}</div>
      ${submitted ? '<p class="drill-choice-hint">正确答案已标出；错选项是你自己的选择。</p>' : '<p class="drill-choice-hint">选择一个答案后可提交；提交前不显示对错。</p>'}`;
    if (!submitted) {
      $$('input[name="drill-answer"]', mount).forEach((input) => {
        input.addEventListener("change", () => {
          state.selected = input.value;
          $$(".drill-option", mount).forEach((label) => {
            label.classList.toggle("is-selected", Boolean(label.querySelector("input:checked")));
          });
          $("#submitButton").disabled = false;
        });
      });
    }
  }

  function setCardMeta(descriptor) {
    $("#metaYear").textContent = descriptor.year;
    $("#metaSection").textContent = descriptor.sectionLabel || "";
    $("#metaType").textContent = typeLabel(descriptor.type);
    $("#metaMode").textContent = `${modeLabel(state.mode)} · 一题一屏`;
    $("#metaTopic").textContent = descriptor.topic || "";
    $("#questionNo").textContent = descriptor.kind === "cloze" ? `第 ${descriptor.n} 空` : `第 ${descriptor.n} 题`;
    $("#questionType").textContent = typeLabel(descriptor.type);
    const full = $("#fullLink");
    if (full) {
      const anchor = descriptor.analysisId || descriptor.id;
      full.href = `../analysis/${descriptor.year}.html#ans-${encodeURIComponent(anchor)}`;
    }
  }

  function renderQuestion() {
    const descriptor = state.descriptor;
    const bank = state.bank;
    if (!descriptor || !bank) return;
    let q = null;
    if (descriptor.kind === "cloze" && bank.cloze) {
      q = bank.cloze.questions.find((x) => Number(x.n) === Number(descriptor.n));
    } else if (descriptor.kind === "reading") {
      const text = bank.reading.find((t) => t.id === descriptor.section);
      q = text && text.questions.find((x) => Number(x.n) === Number(descriptor.n));
    } else if (descriptor.kind === "partb" && bank.partb) {
      q = { n: descriptor.n, type: bank.partb.type || "", stem: "" };
    }
    if (!q) {
      $("#drillLoading").textContent = "这道题的数据没有找到，换一题试试。";
      return;
    }
    state.question = q;
    state.answer = null;
    state.selected = "";
    state.submitted = false;
    setCardMeta(descriptor);
    renderPassage(descriptor, bank, q);
    renderOptions();
    $("#resultMount").hidden = true;
    $("#resultMount").innerHTML = "";
    $("#submitButton").hidden = false;
    $("#submitButton").disabled = true;
    $("#nextButton").hidden = true;
    $("#drillLoading").hidden = true;
    $("#drillCard").hidden = false;
    const jump = $("#jumpToQuestion");
    if (jump) jump.textContent = "去答题 ↓";
  }

  function saveHistory(correct) {
    const history = readJSON(HISTORY_KEY, []);
    history.push({
      id: state.descriptor.id,
      mode: state.mode,
      modeLabel: modeLabel(state.mode),
      label: state.descriptor.label,
      correct: Boolean(correct),
      chosen: state.selected,
      answer: state.answer ? state.answer.answer : "",
      at: new Date().toISOString(),
    });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-300)));
  }

  function renderResult() {
    const ans = state.answer;
    if (!ans) return;
    const correct = state.selected === ans.answer;
    saveHistory(correct);
    const evidence = ans.evidence ? `<div class="drill-evidence"><b>证据句</b>${esc(ans.evidence)}</div>` : "";
    const trap = ans.trap ? `<p class="drill-trap"><b>干扰项</b>${nl2br(ans.trap)}</p>` : "";
    const clue = ans.clue ? `<p class="drill-clue"><b>衔接线索</b>${esc(ans.clue)}</p>` : "";
    const result = $("#resultMount");
    result.innerHTML = `<div class="drill-result-head ${correct ? "is-correct" : "is-wrong"}">
        <div><p class="drill-result-kicker">${correct ? "CORRECT" : "REVIEW"}</p><h2>${correct ? "答对了" : "再看一遍"}</h2><p>你选 ${esc(state.selected)} · 正确答案 ${esc(ans.answer)}</p></div>
        <div class="drill-answer-stamp"><span>ANSWER</span><b>${esc(ans.answer)}</b></div>
      </div>
      <p class="drill-explanation"><b>解析</b>${nl2br(ans.explain || "这道题暂时没有文字解析。")}</p>
      ${evidence}${trap}${clue}
      <p class="drill-result-next">可以继续下一题，或者去整卷解析里看这道题的上下文。</p>`;
    result.hidden = false;
    $("#submitButton").hidden = true;
    $("#nextButton").hidden = false;
    const jump = $("#jumpToQuestion");
    if (jump) jump.textContent = "看解析 ↑";
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function submit() {
    if (!state.selected || state.submitted) return;
    const button = $("#submitButton");
    button.disabled = true;
    button.textContent = "正在取解析…";
    try {
      const data = await fetchJSON(`${DATA}/answers/${state.descriptor.year}.json?v=${VERSION}`);
      const answer = data[state.descriptor.id];
      if (!answer) throw new Error("这道题的答案解析暂时没有找到");
      state.answer = answer;
      state.submitted = true;
      renderOptions();
      renderResult();
      button.textContent = "提交答案";
    } catch (error) {
      button.disabled = false;
      button.textContent = "提交答案";
      showToast(`提交失败：${error.message}`);
    }
  }

  async function load(descriptor) {
    state.descriptor = descriptor;
    state.bank = null;
    state.question = null;
    state.answer = null;
    state.selected = "";
    state.submitted = false;
    $("#drillCard").hidden = true;
    $("#drillLoading").hidden = false;
    $("#drillLoading").textContent = "正在抽题…";
    setHeader(descriptor);
    markSeen(state.mode, descriptor.id);
    try {
      state.bank = await fetchJSON(`${DATA}/questions/${descriptor.year}.json?v=${VERSION}`);
      renderQuestion();
    } catch (error) {
      $("#drillLoading").textContent = `题目读取失败：${error.message}`;
    }
  }

  function next() {
    if (!state.index) return;
    try {
      const descriptor = pickQuestion(state.index, state.mode);
      const url = new URL(location.href);
      url.searchParams.delete("id");
      url.searchParams.set("mode", state.mode);
      history.replaceState(null, "", url);
      load(descriptor);
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
      const validMode = (index.modes || []).some((m) => m.id === requestedMode) ? requestedMode : "all";
      state.mode = validMode;
      let descriptor = null;
      if (explicitId) descriptor = (index.questions || []).find((q) => q.id === explicitId) || null;
      if (!descriptor) descriptor = pickQuestion(index, state.mode);
      await load(descriptor);
    } catch (error) {
      $("#drillLoading").textContent = `抽题失败：${error.message}。请确认页面通过 HTTP 打开。`;
    }
  }

  $("#submitButton")?.addEventListener("click", submit);
  $("#nextButton")?.addEventListener("click", next);
  $("#jumpToQuestion")?.addEventListener("click", () => {
    const target = state.submitted ? $("#resultMount") : $("#questionMount");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#skipButton")?.addEventListener("click", () => {
    if (state.submitted) next();
    else next();
  });

  document.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea, select")) return;
    if (state.submitted && (event.key === "n" || event.key === "N")) {
      next();
      return;
    }
    if (!state.submitted && /^[1-8]$/.test(event.key)) {
      const inputs = $$('input[name="drill-answer"]');
      const input = inputs[Number(event.key) - 1];
      if (input) { input.click(); }
      return;
    }
    if (!state.submitted && event.key === "Enter" && state.selected) submit();
  });

  init();
})();
