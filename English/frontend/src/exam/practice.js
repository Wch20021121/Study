(() => {
  "use strict";

  const DATA = window.__PAPER__;
  const { meta, cloze, reading, partb, partc, writing } = DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const KEY = `dse-practice-${meta.year}-v2`;

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const pad = (n) => String(n).padStart(2, "0");
  const qid = (section, n) => `${section}-${n}`;
  const withBlanks = (text, section) => esc(text || "").replace(/\{\{(\d+)\}\}/g, (_, n) => {
    const done = state.answers[qid(section, Number(n))];
    return `<button class="blank-token${done ? " is-done" : ""}" type="button" data-goto="q-${section}-${n}" aria-label="第 ${n} 空">${n}</button>`;
  });

  const defaults = () => ({
    answers: {},
    texts: {},
    startedAt: Date.now(),
    submittedAt: null,
    duration: 0,
  });
  const load = () => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
      return {
        answers: raw.answers && typeof raw.answers === "object" ? raw.answers : {},
        texts: raw.texts && typeof raw.texts === "object" ? raw.texts : {},
        startedAt: Number(raw.startedAt) || Date.now(),
        submittedAt: raw.submittedAt || null,
        duration: Number(raw.duration) || 0,
      };
    } catch (e) { return defaults(); }
  };
  const state = load();
  let saveTimer = null;
  const save = (immediate = false) => {
    clearTimeout(saveTimer);
    const write = () => {
      try {
        localStorage.setItem(KEY, JSON.stringify({
          answers: state.answers,
          texts: state.texts,
          startedAt: state.startedAt,
          submittedAt: state.submittedAt,
          duration: state.duration,
        }));
        const el = $("#saveState");
        if (el) {
          el.textContent = "已保存 · " + new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
          window.setTimeout(() => { if (el) el.textContent = "答题自动保存在本机"; }, 1800);
        }
      } catch (e) { /* private mode */ }
    };
    if (immediate) write(); else saveTimer = window.setTimeout(write, 250);
  };

  const sections = [];
  if (cloze) sections.push({ id: "cloze", no: "01", label: "完形填空", count: cloze.questions.length, score: cloze.score || 10 });
  reading.forEach((t, i) => sections.push({
    id: t.id, no: pad(i + 2), label: t.title || `Text ${i + 1}`,
    count: t.questions.length, score: 10,
  }));
  if (partb) sections.push({ id: "partb", no: pad(sections.length + 1), label: "新题型", count: 5, score: 10 });
  if (partc) sections.push({ id: "partc", no: pad(sections.length + 1), label: "翻译", count: 5, score: 10, subjective: true });
  if (writing) sections.push({ id: "writing", no: pad(sections.length + 1), label: "写作", count: 2, score: 30, subjective: true });

  const objectiveQuestions = [];
  if (cloze) cloze.questions.forEach((q) => objectiveQuestions.push({ id: qid("cloze", q.n), n: q.n, section: "cloze", answer: null }));
  reading.forEach((t) => t.questions.forEach((q) => objectiveQuestions.push({ id: qid(t.id, q.n), n: q.n, section: t.id, answer: null })));
  if (partb) [41, 42, 43, 44, 45].forEach((n) => objectiveQuestions.push({ id: qid("partb", n), n, section: "partb", answer: null }));

  function choiceHtml(q, section, letters = "ABCD") {
    const id = qid(section, q.n);
    const opts = q.options.map((opt, i) => {
      const letter = letters[i];
      const checked = state.answers[id] === letter ? " checked" : "";
      return `<label class="option${checked ? " is-chosen" : ""}" data-option="${letter}">
        <input type="radio" name="${id}" value="${letter}" data-q="${id}"${checked}>
        <span class="letter">${letter}</span>
        <span class="option-text">${esc(opt)}</span>
      </label>`;
    }).join("");
    const stem = section === "cloze" ? "" : (q.stem || `${q.n}.`);
    return `<fieldset class="q-item" id="q-${id}" data-qid="${id}">
      <legend><span class="q-no">${pad(q.n)}</span>${stem ? `<span class="q-stem">${esc(stem)}</span>` : ""}${q.type ? `<span class="q-type">${esc(q.type)}</span>` : ""}</legend>
      <div class="options">${opts}</div>
    </fieldset>`;
  }

  function clozePassage() {
    return `<div class="passage">${cloze.passage.map((p, i) => `<div class="para">
      <span class="para-no">P${i + 1}</span>
      <div><p class="para-en">${withBlanks(p.en, "cloze")}</p></div>
    </div>`).join("")}</div>`;
  }

  function readingSection(t, index) {
    const qs = t.questions;
    return `<section class="exam-section" id="${t.id}" data-section="${t.id}">
      <header class="exam-section-head">
        <span class="exam-section-index">${pad(index)}</span>
        <div><h2>${esc(t.title || "Reading Comprehension")}</h2><p>Section II · Part A · ${qs[0].n}–${qs[qs.length - 1].n} 题</p></div>
        <div class="exam-section-score"><b>10</b>points</div>
      </header>
      <div class="exam-directions">Read the following text carefully and choose the best answer for each question.</div>
      <article class="passage">${t.paragraphs.map((p, i) => `<div class="para"><span class="para-no">P${i + 1}</span><div><p class="para-en">${esc(p.en)}</p></div></div>`).join("")}</article>
      <div class="question-block">
        <div class="question-block-head"><b>${qs[0].n}–${qs[qs.length - 1].n}</b><span>每题 2 分 · 只记录选择，不显示对错</span></div>
        ${qs.map((q) => choiceHtml(q, t.id)).join("")}
      </div>
    </section>`;
  }

  function clozeSection() {
    return `<section class="exam-section" id="cloze" data-section="cloze">
      <header class="exam-section-head">
        <span class="exam-section-index">01</span>
        <div><h2>完形填空</h2><p>Section I · Use of English · 1–20 题</p></div>
        <div class="exam-section-score"><b>10</b>points</div>
      </header>
      <div class="exam-directions">${esc(cloze.directions || "Read the following text. Choose the best word for each numbered blank.")}</div>
      ${clozePassage()}
      <div class="question-block">
        <div class="question-block-head"><b>1–20</b><span>每题 0.5 分 · 点击选项，不显示对错</span></div>
        <div class="cloze-grid">${cloze.questions.map((q) => choiceHtml(q, "cloze")).join("")}</div>
      </div>
    </section>`;
  }

  function optionsLetters() {
    return Object.keys(partb.options || {}).sort();
  }

  function partbSelects(letters) {
    return `<div class="question-block"><div class="question-block-head"><b>41–45</b><span>从 ${letters[0]}–${letters[letters.length - 1]} 中选择 · 交卷后统一阅卷</span></div>
      ${[41, 42, 43, 44, 45].map((n) => {
        const id = qid("partb", n);
        return `<fieldset class="q-item" id="q-${id}" data-qid="${id}">
          <legend><span class="q-no">${n}</span><span class="q-stem">第 ${n} 空</span></legend>
          <div class="select-answer"><label for="sel-${id}">选择</label><select id="sel-${id}" data-select-q="${id}"><option value="">—</option>${letters.map((l) => `<option value="${l}"${state.answers[id] === l ? " selected" : ""}>${l}</option>`).join("")}</select></div>
        </fieldset>`;
      }).join("")}</div>`;
  }

  function renderPartB() {
    const letters = partb.type === "ordering"
      ? Object.keys(partb.paragraphs || {}).sort()
      : optionsLetters();
    let body = "";
    if (partb.type === "ordering") {
      body = `<div class="passage">${Object.entries(partb.paragraphs || {}).map(([letter, p]) => `<div class="para"><span class="para-no">${letter}</span><div><p class="para-en">${esc(p.en)}</p></div></div>`).join("")}</div>`;
    } else if (partb.type === "matching") {
      body = `<div class="passage">${(partb.blocks || []).map((b) => `<div class="para"><span class="para-no">${esc((b.label || "").split("·")[0].trim())}</span><div><p class="para-en"><b class="pool-letter">${esc(b.label || "")}</b> ${esc(b.en || "")}</p></div></div>`).join("")}</div>
        <div class="option-pool">${Object.entries(partb.options || {}).map(([l, o]) => `<div class="pool-item"><span class="pool-letter">${l}</span><p class="pool-en">${esc(o.en)}</p></div>`).join("")}</div>`;
    } else {
      body = `<div class="passage">${(partb.blocks || []).map((b, i) => `<div class="para"><span class="para-no">${pad(i + 1)}</span><div><p class="para-en">${withBlanks(b.en, "partb")}</p></div></div>`).join("")}</div>
        <div class="option-pool">${Object.entries(partb.options || {}).map(([l, o]) => `<div class="pool-item"><span class="pool-letter">${l}</span><p class="pool-en">${esc(o.en)}</p></div>`).join("")}</div>`;
    }
    return `<section class="exam-section" id="partb" data-section="partb">
      <header class="exam-section-head"><span class="exam-section-index">${sections.find((s) => s.id === "partb")?.no || ""}</span><div><h2>新题型</h2><p>Section II · Part B · 41–45 题</p></div><div class="exam-section-score"><b>10</b>points</div></header>
      <div class="exam-directions">${esc(partb.directions || "")}</div>
      ${body}
      ${partbSelects(letters)}
    </section>`;
  }

  function renderPartC() {
    const segs = Object.entries(partc.segments || {});
    return `<section class="exam-section" id="partc" data-section="partc">
      <header class="exam-section-head"><span class="exam-section-index">${sections.find((s) => s.id === "partc")?.no || ""}</span><div><h2>翻译</h2><p>Section II · Part C · 46–50 题</p></div><div class="exam-section-score"><b>10</b>points</div></header>
      <div class="exam-directions">${esc(partc.directions || "")}</div>
      <div class="passage">${partc.paragraphs.map((p, i) => `<div class="para"><span class="para-no">P${i + 1}</span><div><p class="para-en">${esc(p.en).replace(/\[\[(\d+)\]\]([\s\S]*?)\[\[\/\1\]\]/g, (_, n, txt) => `<span class="segment-mark">${txt}</span><sup class="q-no">${n}</sup>`)}</p></div></div>`).join("")}</div>
      <div class="segment-inputs">${segs.map(([n, s]) => {
        const id = `partc-${n}`;
        const value = state.texts[id] || "";
        return `<div class="segment-input" id="text-${id}"><div class="segment-input-head"><b>${n}</b><span>把画线部分译成中文</span></div><p class="segment-en">${esc(s.en)}</p><textarea class="text-answer" data-text="${id}" placeholder="写出你的译文…">${esc(value)}</textarea></div>`;
      }).join("")}</div>
    </section>`;
  }

  function renderWriting() {
    const part = (key) => {
      const p = writing[key];
      const id = `writing-${key === "partA" ? "A" : "B"}`;
      const value = state.texts[id] || "";
      const pic = p.picture || {};
      let picture = "";
      if (pic.src) {
        picture = `<figure class="writing-picture"><div><img src="${esc(pic.src)}" alt="${esc(pic.caption || "作文图片")}" loading="lazy"><p class="picture-caption">${esc(pic.caption || "")}</p></div></figure>`;
      } else if (pic.child || pic.father) {
        picture = `<div class="picture-dialogue"><p>孩子：${esc(pic.child || "")}</p><p>父亲：${esc(pic.father || "")}</p><p class="picture-caption">${esc(pic.caption || "")}</p></div>`;
      }
      return `<div class="writing-prompt">
        <div class="writing-head"><h3>${esc(p.title || key)}</h3><span>${esc(p.score)} 分 · ${esc(p.words)}</span></div>
        <p class="prompt-en">${esc(p.prompt || "")}</p>
        <p class="prompt-zh">${esc(p.prompt_zh || "")}</p>
        ${picture}
        <textarea class="text-answer" data-text="${id}" placeholder="在这里写作文…">${esc(value)}</textarea>
        <div class="word-count" data-count="${id}">0 words</div>
      </div>`;
    };
    return `<section class="exam-section" id="writing" data-section="writing">
      <header class="exam-section-head"><span class="exam-section-index">${sections.find((s) => s.id === "writing")?.no || ""}</span><div><h2>写作</h2><p>Section III · Part A / Part B · 51–52 题</p></div><div class="exam-section-score"><b>30</b>points</div></header>
      <div class="exam-directions">Part A 约 100 词；Part B 160–200 词。先写提纲，再写正文；不要在答题区写真实姓名。</div>
      ${part("partA")}${part("partB")}
    </section>`;
  }

  function setupRailAnswers() {
    const rail = document.getElementById("railAnswers");
    if (!rail) return;
    const mq = window.matchMedia("(min-width: 901px)");
    rail.open = mq.matches;
    if (mq.addEventListener) mq.addEventListener("change", (e) => { rail.open = e.matches; });
  }

  function render() {
    $("#coverLede").textContent = meta.topics.length
      ? "本卷主题：" + meta.topics.join(" · ")
      : "先做题，交卷后查看答案、错题与全卷词汇。";
    const nav = sections.map((s) => `<a href="#${s.id}" data-nav="${s.id}"><span>${s.no}</span>${esc(s.label)}<em>${s.subjective ? "主观" : s.count + "题"}</em></a>`).join("");
    $("#paperNav").innerHTML = nav;
    $("#sectionProgress").textContent = sections.length + " 节";

    const groups = [];
    if (cloze) groups.push({ label: "完形 1–20", ids: cloze.questions.map((q) => qid("cloze", q.n)) });
    reading.forEach((t) => groups.push({ label: `${t.title} ${t.questions[0].n}–${t.questions[t.questions.length - 1].n}`, ids: t.questions.map((q) => qid(t.id, q.n)) }));
    if (partb) groups.push({ label: "新题型 41–45", ids: [41, 42, 43, 44, 45].map((n) => qid("partb", n)) });
    $("#answerSheet").innerHTML = groups.map((g) => `<div class="sheet-group">${esc(g.label)}</div>` + g.ids.map((id) => `<button type="button" data-goto="q-${id}">${id.split("-").pop()}</button>`).join("")).join("");

    const mount = [];
    if (cloze) mount.push(clozeSection());
    reading.forEach((t, i) => mount.push(readingSection(t, i + 2)));
    if (partb) mount.push(renderPartB());
    if (partc) mount.push(renderPartC());
    if (writing) mount.push(renderWriting());
    $("#paperMount").innerHTML = mount.join("");
    const submittedNotice = $("#submittedNotice");
    if (submittedNotice) submittedNotice.hidden = !state.submittedAt;
    updateAll();
    renderWordCounts();
    startTimer();
  }

  function answeredCount() {
    return objectiveQuestions.filter((q) => Boolean(state.answers[q.id])).length;
  }

  function refreshProgress() {
    const count = answeredCount();
    $("#answerProgress").textContent = `${count} / ${objectiveQuestions.length}`;
    $("#mobileProgress").textContent = `已答 ${count} / ${objectiveQuestions.length}`;
    $$("#answerSheet button[data-goto]").forEach((b) => {
      const id = b.dataset.goto.replace(/^q-/, "");
      b.classList.toggle("is-done", Boolean(state.answers[id]));
    });
    $$(".blank-token").forEach((b) => {
      const target = b.dataset.goto || "";
      const id = target.replace(/^q-/, "");
      b.classList.toggle("is-done", Boolean(state.answers[id]));
    });
  }

  function updateAll() {
    refreshProgress();
    $$(".option").forEach((label) => {
      const input = label.querySelector("input");
      label.classList.toggle("is-chosen", Boolean(input && input.checked));
    });
    $$("[data-select-q]").forEach((sel) => {
      const id = sel.dataset.selectQ;
      if (state.answers[id]) sel.value = state.answers[id];
    });
  }

  function startTimer() {
    const tick = () => {
      const elapsed = state.submittedAt
        ? Math.floor(state.duration || 0)
        : Math.floor((Date.now() - state.startedAt) / 1000);
      const text = formatTime(elapsed);
      ["timer", "mobileTimer"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.textContent = text;
          el.classList.toggle("is-overtime", elapsed > 180 * 60);
        }
      });
    };
    tick();
    window.setInterval(tick, 1000);
  }

  function formatTime(sec) {
    const s = Math.max(0, sec | 0);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    return `${pad(h)}:${pad(m)}:${pad(r)}`;
  }

  function renderWordCounts() {
    $$("[data-count]").forEach((el) => {
      const id = el.dataset.count;
      const text = (state.texts[id] || "").trim();
      const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
      el.textContent = `${words} words`;
    });
  }

  function updateText(id, value) {
    state.texts[id] = value;
    save();
    renderWordCounts();
  }

  function openSubmit() {
    const unanswered = objectiveQuestions.filter((q) => !state.answers[q.id]);
    const answered = objectiveQuestions.length - unanswered.length;
    $("#submitSummary").textContent = `客观题已答 ${answered} / ${objectiveQuestions.length}。交卷后会跳到“真题解析”，自动阅卷并列出错题；主观题请在解析页对照参考答案自评。`;
    $("#unansweredList").innerHTML = unanswered.length
      ? unanswered.map((q) => `<span>${q.n}</span>`).join("")
      : '<span class="ok">客观题全部已答</span>';
    $("#submitModal").hidden = false;
    document.body.style.overflow = "hidden";
    const close = $("[data-confirm-submit]", $("#submitModal"));
    if (close) close.focus();
  }

  function closeSubmit() {
    $("#submitModal").hidden = true;
    document.body.style.overflow = "";
  }

  function submit() {
    state.submittedAt = new Date().toISOString();
    state.duration = Math.floor((Date.now() - state.startedAt) / 1000);
    save(true);
    $("[data-confirm-submit]", $("#submitModal")).textContent = "正在阅卷…";
    window.setTimeout(() => {
      location.href = `../analysis/${meta.year}.html?submitted=1`;
    }, 220);
  }

  document.addEventListener("change", (event) => {
    const radio = event.target.closest("input[type=radio][data-q]");
    if (radio) {
      state.answers[radio.dataset.q] = radio.value;
      save();
      updateAll();
      return;
    }
    const select = event.target.closest("[data-select-q]");
    if (select) {
      const id = select.dataset.selectQ;
      if (select.value) state.answers[id] = select.value;
      else delete state.answers[id];
      save();
      refreshProgress();
    }
  });

  document.addEventListener("input", (event) => {
    const text = event.target.closest("textarea[data-text]");
    if (text) updateText(text.dataset.text, text.value);
  });

  document.addEventListener("click", (event) => {
    const answerLink = event.target.closest('a[href="#answerSheet"]');
    if (answerLink) {
      event.preventDefault();
      const rail = document.getElementById("railAnswers");
      if (rail) {
        rail.open = true;
        rail.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    const goto = event.target.closest("[data-goto]");
    if (goto) {
      const target = document.getElementById(goto.dataset.goto);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        target.classList.add("is-flash");
        window.setTimeout(() => target.classList.remove("is-flash"), 900);
      }
      return;
    }
    if (event.target.closest("[data-submit]")) { openSubmit(); return; }
    if (event.target.closest("[data-close-modal]")) { closeSubmit(); return; }
    if (event.target.closest("[data-confirm-submit]")) { submit(); return; }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !$("#submitModal").hidden) closeSubmit();
  });

  $("#submitModal").addEventListener("click", (event) => {
    if (event.target === $("#submitModal")) closeSubmit();
  });

  render();
  setupRailAnswers();
})();
