(() => {
  "use strict";

  const DATA = window.__PAPER__;
  const { meta, cloze, reading, partb, partc, writing, sentences = [], vocab = [] } = DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const KEY = `dse-practice-${meta.year}-v2`;
  const SELF_KEY = `dse-selfscore-${meta.year}-v2`;
  const WORD_KEY = `dse-vocab-${meta.year}-v1`;

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const nl2br = (s) => esc(s).replace(/\n/g, "<br>");
  const qid = (section, n) => `${section}-${n}`;
  const pad = (n) => String(n).padStart(2, "0");

  const practice = (() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
      return {
        answers: raw.answers && typeof raw.answers === "object" ? raw.answers : {},
        texts: raw.texts && typeof raw.texts === "object" ? raw.texts : {},
        submittedAt: raw.submittedAt || null,
        duration: Number(raw.duration) || 0,
      };
    } catch (e) { return { answers: {}, texts: {}, submittedAt: null, duration: 0 }; }
  })();

  const selfScore = (() => {
    try {
      const raw = JSON.parse(localStorage.getItem(SELF_KEY) || "{}");
      return { partc: Number(raw.partc) || 0, writing: Number(raw.writing) || 0 };
    } catch (e) { return { partc: 0, writing: 0 }; }
  })();

  const mastered = (() => {
    try { return new Set(JSON.parse(localStorage.getItem(WORD_KEY) || "[]")); }
    catch (e) { return new Set(); }
  })();
  const saveMastered = () => {
    try { localStorage.setItem(WORD_KEY, JSON.stringify([...mastered])); } catch (e) { /* ignore */ }
  };

  const objectives = [];
  const addQ = (section, q, weight) => objectives.push({
    id: qid(section, q.n),
    n: q.n,
    section,
    answer: q.answer,
    weight,
    user: practice.answers[qid(section, q.n)] || "",
  });
  if (cloze) cloze.questions.forEach((q) => addQ("cloze", q, 10 / cloze.questions.length));
  reading.forEach((t) => t.questions.forEach((q) => addQ(t.id, q, 2)));
  if (partb) (partb.answers || []).forEach((a) => addQ("partb", a, 2));

  const objectiveTotal = objectives.reduce((sum, q) => sum + q.weight, 0);
  const corrects = objectives.filter((q) => q.user && q.user === q.answer);
  const wrongs = objectives.filter((q) => q.user && q.user !== q.answer);
  const unanswered = objectives.filter((q) => !q.user);
  const objectiveScore = corrects.reduce((sum, q) => sum + q.weight, 0);
  const objectiveSectionIds = [...new Set(objectives.map((q) => q.section))];
  const sectionStats = sections().filter((s) => objectiveSectionIds.includes(s.id)).map((s) => {
    const list = objectives.filter((q) => q.section === s.id);
    const right = list.filter((q) => q.user && q.user === q.answer).length;
    return { ...s, total: list.length, right, weight: list.reduce((a, q) => a + q.weight, 0), score: list.filter((q) => q.user === q.answer).reduce((a, q) => a + q.weight, 0) };
  });

  function sections() {
    const list = [];
    if (cloze) list.push({ id: "cloze", no: "01", label: "完形填空", score: 10 });
    reading.forEach((t, i) => list.push({ id: t.id, no: pad(i + 2), label: t.title || `Text ${i + 1}`, score: 10 }));
    if (partb) list.push({ id: "partb", no: pad(list.length + 1), label: "新题型", score: 10 });
    if (partc) list.push({ id: "partc", no: pad(list.length + 1), label: "翻译", score: 10 });
    if (writing) list.push({ id: "writing", no: pad(list.length + 1), label: "写作", score: 30 });
    list.push({ id: "sentences", no: pad(list.length + 1), label: "长难句", score: null });
    list.push({ id: "vocab", no: pad(list.length + 1), label: "全卷词汇", score: null });
    return list;
  }

  function fmtScore(n) {
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
  }

  function fmtDuration(sec) {
    const s = Math.max(0, Number(sec) || 0);
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
    return `${pad(h)}:${pad(m)}:${pad(r)}`;
  }

  function statusOf(q) {
    if (!practice.submittedAt) return "";
    if (!q.user) return "is-wrong";
    return q.user === q.answer ? "is-right" : "is-wrong";
  }

  function answerCard(q, body, open = false) {
    const status = statusOf(q);
    const user = q.user ? `你选 ${esc(q.user)}` : "未作答";
    return `<details class="answer-card ${status}" id="ans-${q.id}"${open ? " open" : ""}>
      <summary><span class="a-no">${q.n}</span><span class="a-stem">${esc(q.stem || `第 ${q.n} 题`)}</span><span class="a-key">答案 ${esc(q.answer)} · ${user}</span></summary>
      <div class="answer-body">${body}</div>
    </details>`;
  }

  function choiceBody(q) {
    const opts = q.options.map((o, i) => {
      const l = String.fromCharCode(65 + i);
      const cls = l === q.answer ? " is-correct" : (q.user === l && q.user !== q.answer ? " is-user-wrong" : "");
      const meaning = Array.isArray(q.cn) && q.cn[i] ? ` <span class="muted">${esc(q.cn[i])}</span>` : "";
      return `<div class="answer-option${cls}"><span class="answer-label">${l}</span>${esc(o)}${meaning}</div>`;
    }).join("");
    return `<div class="answer-options">${opts}</div>
      <p>${nl2br(q.explain || "")}</p>
      ${q.evidence ? `<div class="answer-evidence"><b>证据句　</b>${esc(q.evidence)}</div>` : ""}
      ${q.trap ? `<p class="answer-trap"><b>干扰项　</b>${nl2br(q.trap)}</p>` : ""}`;
  }

  function partbBody(a) {
    const opt = a.answer && partb.options && partb.options[a.answer] ? partb.options[a.answer].en : "";
    return `${opt ? `<div class="answer-evidence"><b>${esc(a.answer)}　</b>${esc(opt)}</div>` : ""}
      <p>${nl2br(a.explain || "")}</p>
      ${a.clue ? `<p class="answer-trap"><b>衔接线索　</b>${esc(a.clue)}</p>` : ""}`;
  }

  function renderReport() {
    const submitted = Boolean(practice.submittedAt);
    $("#objectiveScore").textContent = submitted ? fmtScore(objectiveScore) : "—";
    $("#objectiveTotal").textContent = `/ ${fmtScore(objectiveTotal)}`;
    $("#reportLede").textContent = submitted
      ? `客观题 ${fmtScore(objectiveScore)} / ${fmtScore(objectiveTotal)}，答对 ${corrects.length} 题，错 ${wrongs.length} 题，未答 ${unanswered.length} 题。主观题请结合参考译文、范文自评。`
      : "还没有这套卷子的交卷记录。先去“真题”完成并交卷，这里会自动生成成绩单；下面的完整解析仍然可以阅读。";

    if (!submitted) {
      $("#reportMount").innerHTML = `<div class="analysis-banner"><b>先做，再看。</b> 打开 <a class="text-link" href="../practice/${meta.year}.html">${meta.year} 真题</a>，交卷后回到这里看自动阅卷和错题定位。当前页面不会出现你的作答痕迹。</div>`;
      return;
    }

    const bars = sectionStats.map((s) => `<div class="report-bar"><span>${esc(s.label)}</span><i><b style="width:${s.total ? Math.round(s.right / s.total * 100) : 0}%"></b></i><em>${s.right}/${s.total} 题 · ${fmtScore(s.score)}/${fmtScore(s.weight)} 分</em></div>`).join("");
    const wrongList = wrongs.length
      ? wrongs.sort((a, b) => a.n - b.n).map((q) => `<a href="#ans-${q.id}">${q.n} 你选 ${q.user} → ${q.answer}</a>`).join("") + (unanswered.length ? `<span>另有 ${unanswered.length} 题未作答（见上方统计）</span>` : "")
      : `<span>没有错题。${unanswered.length ? `还有 ${unanswered.length} 题未作答。` : "下一步：主观题自评 + 本卷词汇 + 长难句。"}</span>`;

    $("#reportMount").innerHTML = `<div class="report-body">
      <div class="report-panel">
        <div class="report-panel-head"><h2>客观题阅卷</h2><span>用时 ${fmtDuration(practice.duration)} · 交卷 ${esc(new Date(practice.submittedAt).toLocaleString("zh-CN"))}</span></div>
        <div class="report-stats">
          <div><span>正确</span><b>${corrects.length}</b></div>
          <div><span>错误</span><b>${wrongs.length}</b></div>
          <div><span>未答</span><b>${unanswered.length}</b></div>
          <div><span>客观分</span><b>${fmtScore(objectiveScore)}</b></div>
        </div>
        <div class="report-bars">${bars}</div>
      </div>
      <div class="report-panel">
        <div class="report-panel-head"><h2>错题定位</h2><span>点击题号跳到该题解析</span></div>
        <div class="wrong-list">${wrongList}</div>
      </div>
      <div class="report-panel">
        <div class="report-panel-head"><h2>主观题自评</h2><span>系统只自动阅客观题；翻译、写作为参考自评</span></div>
        <div class="self-score">
          <label>翻译 46–50 自评 <input type="number" min="0" max="10" step="1" value="${selfScore.partc}" data-self="partc"> / 10</label>
          <label>写作 51–52 自评 <input type="number" min="0" max="30" step="1" value="${selfScore.writing}" data-self="writing"> / 30</label>
        </div>
        <div class="total-line"><span>自评总分（客观 + 主观）</span><span><b id="totalScore">${fmtScore(objectiveScore + selfScore.partc + selfScore.writing)}</b> / 100</span></div>
      </div>
    </div>`;
    updateTotal();
  }

  function updateTotal() {
    const total = Math.min(100, objectiveScore + selfScore.partc + selfScore.writing);
    const el = $("#totalScore");
    if (el) el.textContent = fmtScore(total);
    try { localStorage.setItem(SELF_KEY, JSON.stringify(selfScore)); } catch (e) { /* ignore */ }
  }

  function renderNav() {
    $("#analysisNav").innerHTML = sections().map((s) => `<a href="#${s.id}"><span>${s.no}</span>${esc(s.label)}<em>${s.score == null ? (s.id === "vocab" ? `${vocab.length}词` : `${sentences.length}句`) : `${s.score}分`}</em></a>`).join("");
  }

  function sectionHead(sec, kicker, title, metaText) {
    return `<header class="analysis-section-head">
      <span class="exam-section-index">${sec.no}</span>
      <div><p class="section-kicker">${esc(kicker)}</p><h2>${esc(title)}</h2><p>${esc(metaText)}</p></div>
      <span>${sec.score == null ? "" : sec.score + " points"}</span>
    </header>`;
  }

  function passageHtml(text, showTranslation = true) {
    return `<article class="analysis-paper analysis-passage">
      ${text.title ? `<h3 class="passage-title">${esc(text.title)}</h3>` : ""}
      ${text.paragraphs.map((p, i) => `<div class="para"><span class="para-no">P${i + 1}</span><div><p class="para-en">${esc(p.en)}</p>${showTranslation && p.zh ? `<button class="translation-toggle" type="button" data-zh-toggle>译文</button><p class="analysis-zh" hidden>${esc(p.zh)}</p>` : ""}</div></div>`).join("")}
    </article>`;
  }

  function renderCloze() {
    if (!cloze) return "";
    const sec = sections().find((s) => s.id === "cloze");
    return `<section class="analysis-section" id="cloze">${sectionHead(sec, "Section I · Use of English", "完形填空 · 答案与逻辑", `20 题 · ${cloze.score} 分`)}
      <div class="analysis-banner"><b>先看主线：</b>${esc(cloze.intro || "")}</div>
      <article class="analysis-paper analysis-passage">
        <div class="passage">${cloze.passage.map((p, i) => `<div class="para"><span class="para-no">P${i + 1}</span><div><p class="para-en">${answerBlank(p.en)}</p><p class="analysis-zh">${esc(p.zh || "")}</p></div></div>`).join("")}</div>
      </article>
      ${cloze.questions.map((q) => {
        const obj = objectives.find((x) => x.id === qid("cloze", q.n));
        return answerCard({ ...q, id: obj.id, user: obj.user, stem: `第 ${q.n} 空` }, choiceBody({ ...q, user: obj.user }), Boolean(practice.submittedAt && obj.user && obj.user !== obj.answer));
      }).join("")}
    </section>`;
  }

  function answerBlank(text) {
    return esc(text || "").replace(/\{\{(\d+)\}\}/g, (_, n) => {
      const obj = objectives.find((q) => q.n === Number(n) && q.section === "cloze");
      return `<span class="blank-token is-done">${n} ${obj ? obj.answer : ""}</span>`;
    });
  }

  function renderReading() {
    return reading.map((t, i) => {
      const sec = sections().find((s) => s.id === t.id);
      return `<section class="analysis-section" id="${t.id}">
        ${sectionHead(sec, "Section II · Part A", `${t.title || `Text ${i + 1}`} · 答案与证据`, `${t.questions[0].n}–${t.questions[t.questions.length - 1].n} 题 · 10 分`)}
        ${t.intro ? `<div class="analysis-banner">${esc(t.intro)}</div>` : ""}
        ${passageHtml(t)}
        ${t.questions.map((q) => {
          const obj = objectives.find((x) => x.id === qid(t.id, q.n));
          return answerCard({ ...q, id: obj.id, user: obj.user, stem: `第 ${q.n} 空` }, choiceBody({ ...q, user: obj.user }), Boolean(practice.submittedAt && obj.user && obj.user !== obj.answer));
        }).join("")}
      </section>`;
    }).join("");
  }

  function partbContent() {
    if (!partb) return "";
    if (partb.type === "ordering") {
      return `<article class="analysis-paper analysis-passage">${Object.entries(partb.paragraphs || {}).map(([l, p]) => `<div class="para"><span class="para-no">${l}</span><div><p class="para-en">${esc(p.en)}</p><p class="analysis-zh">${esc(p.zh || "")}</p></div></div>`).join("")}</article>`;
    }
    if (partb.type === "matching") {
      return `<article class="analysis-paper">${(partb.blocks || []).map((b) => `<div class="para"><span class="para-no">${esc((b.label || "").split("·")[0].trim())}</span><div><p class="para-en"><b>${esc(b.label || "")}</b> ${esc(b.en)}</p><p class="analysis-zh">${esc(b.zh || "")}</p></div></div>`).join("")}</article>
        <div class="option-pool">${Object.entries(partb.options || {}).map(([l, o]) => `<div class="pool-item"><span class="pool-letter">${l}</span><p class="pool-en">${esc(o.en)}</p><p class="pool-zh">${esc(o.zh || "")}</p></div>`).join("")}</div>`;
    }
    return `<article class="analysis-paper">${(partb.blocks || []).map((b, i) => `<div class="para"><span class="para-no">${pad(i + 1)}</span><div><p class="para-en">${analysisBlank(b.en)}</p><p class="analysis-zh">${esc(b.zh || "")}</p></div></div>`).join("")}</article>
      <div class="option-pool">${Object.entries(partb.options || {}).map(([l, o]) => `<div class="pool-item"><span class="pool-letter">${l}</span><p class="pool-en">${esc(o.en)}</p><p class="pool-zh">${esc(o.zh || "")}</p></div>`).join("")}</div>`;
  }

  function analysisBlank(text) {
    return esc(text || "").replace(/\{\{(\d+)\}\}/g, (_, n) => {
      const obj = objectives.find((q) => q.n === Number(n) && q.section === "partb");
      return `<span class="blank-token is-done">${n} ${obj ? obj.answer : ""}</span>`;
    });
  }

  function renderPartB() {
    if (!partb) return "";
    const sec = sections().find((s) => s.id === "partb");
    const answers = partb.answers || [];
    const grid = answers.map((a) => {
      const obj = objectives.find((x) => x.id === qid("partb", a.n));
      const cls = practice.submittedAt && obj.user && obj.user !== a.answer ? "style=\"border-color:var(--red)\"" : "";
      return `<span ${cls}>${a.n} → <b>${esc(a.answer)}</b>${obj.user ? `（你 ${esc(obj.user)}）` : ""}</span>`;
    }).join("");
    return `<section class="analysis-section" id="partb">${sectionHead(sec, "Section II · Part B", `${partb.title} · 答案与衔接`, `${partb.cn_title || ""} · 10 分`)}
      <div class="analysis-banner"><b>题型：</b>${esc(partb.directions || "")}<br><b>答案：</b>${grid}</div>
      ${partbContent()}
      ${answers.map((a) => {
        const obj = objectives.find((x) => x.id === qid("partb", a.n));
        return `<details class="answer-card ${statusOf(obj)}"${practice.submittedAt && obj.user && obj.user !== a.answer ? " open" : ""} id="ans-partb-${a.n}"><summary><span class="a-no">${a.n}</span><span class="a-stem">第 ${a.n} 空</span><span class="a-key">答案 ${esc(a.answer)} · ${obj.user ? `你选 ${esc(obj.user)}` : "未作答"}</span></summary><div class="answer-body">${partbBody(a)}</div></details>`;
      }).join("")}
      ${partb.fixed_note ? `<div class="analysis-banner"><b>多余选项 / 固定位置：</b>${esc(partb.fixed_note)}</div>` : ""}
    </section>`;
  }

  function renderPartC() {
    if (!partc) return "";
    const sec = sections().find((s) => s.id === "partc");
    const segs = Object.entries(partc.segments || {});
    return `<section class="analysis-section" id="partc">${sectionHead(sec, "Section II · Part C", "翻译 · 参考译文与拆句", `${partc.cn_title || ""} · 10 分`)}
      <div class="analysis-banner">${esc(partc.intro || "")}</div>
      <article class="analysis-paper analysis-passage">${partc.paragraphs.map((p, i) => `<div class="para"><span class="para-no">P${i + 1}</span><div><p class="para-en">${esc(p.en).replace(/\[\[(\d+)\]\]([\s\S]*?)\[\[\/\1\]\]/g, (_, n, txt) => `<span class="segment-mark">${esc(txt)}</span><sup class="q-no">${n}</sup>`)}</p><p class="analysis-zh">${esc(p.zh || "")}</p></div></div>`).join("")}</article>
      ${segs.map(([n, s]) => {
        const user = practice.texts[`partc-${n}`] || "";
        return `<article class="segment-card"><div class="segment-card-head"><b>${n}</b><span>参考译文 / 结构 / 易错点</span></div>
          <p class="segment-card-en">${esc(s.en)}</p>
          <div class="segment-card-grid">
            <p><b>主干</b>${esc(s.core || "")}</p>
            <p><b>结构</b>${esc(s.structure || "")}</p>
            <p><b>关键词</b>${esc(s.key || "")}</p>
            <p><b>参考译文</b>${esc(s.translation || "")}</p>
            <p><b>易错点</b>${esc(s.pitfall || "")}</p>
          </div>
          <div class="segment-user">${user ? esc(user) : "你的译文：（未作答）"}</div>
        </article>`;
      }).join("")}
    </section>`;
  }

  function renderWriting() {
    if (!writing) return "";
    const sec = sections().find((s) => s.id === "writing");
    const part = (key, label) => {
      const p = writing[key];
      const user = practice.texts[`writing-${key === "partA" ? "A" : "B"}`] || "";
      const pic = p.picture || {};
      const picture = pic.src
        ? `<figure class="writing-picture"><div><img src="${esc(pic.src)}" alt="${esc(pic.caption || "作文图片")}" loading="lazy"><p class="picture-caption">${esc(pic.caption || "")}</p></div></figure>`
        : (pic.child || pic.father ? `<div class="picture-dialogue"><p>孩子：${esc(pic.child || "")}</p><p>父亲：${esc(pic.father || "")}</p><p class="picture-caption">${esc(pic.caption || "")}</p></div>` : "");
      return `<article class="sample-box">
        <div class="writing-head"><h3>${esc(label)} · ${esc(p.title || "")}</h3><span>${esc(p.score)} 分 · ${esc(p.words)}</span></div>
        <p class="prompt-en">${esc(p.prompt || "")}</p>
        <p class="prompt-zh">${esc(p.prompt_zh || "")}</p>
        ${picture}
        <h3>参考范文</h3>
        <p class="sample-text">${esc(p.sample || "")}</p>
        <button class="translation-toggle" type="button" data-sample-zh>参考译文</button>
        <p class="sample-zh" hidden>${esc(p.sample_zh || "")}</p>
        <div><b>结构骨架</b><ul class="analysis-list">${(p.structure || []).map(([a, b]) => `<li><b>${esc(a)}</b>：${esc(b)}</li>`).join("")}</ul></div>
        <div><b>可替换表达</b><ul class="analysis-list">${(p.expressions || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="analysis-banner"><b>写作提醒：</b>${(p.traps || []).map((x) => esc(x)).join("；")}</div>
        <div class="segment-user">${user ? esc(user) : "你的作文：（未作答）"}</div>
      </article>`;
    };
    return `<section class="analysis-section" id="writing">${sectionHead(sec, "Section III · Writing", "写作 · 范文与可迁移表达", "Part A 10 分 + Part B 20 分")}
      ${part("partA", "Part A")}
      ${part("partB", "Part B")}
    </section>`;
  }

  function renderSentences() {
    const sec = sections().find((s) => s.id === "sentences");
    if (!sentences.length) return "";
    return `<section class="analysis-section" id="sentences">${sectionHead(sec, "Sentence X-Ray", "长难句 · 主干与修饰", `${sentences.length} 句 · 点击展开`)}
      <div class="sentence-tools"><input type="search" id="sentenceSearch" placeholder="搜索英文、中文或语法关键词"><span class="vocab-count" id="sentenceCount"></span></div>
      <div class="sentence-list" id="sentenceList">${sentences.map((s) => `<details class="sentence-card" data-sentence="${esc((s.en + " " + s.zh + " " + (s.key || "") + " " + (s.structure || "")).toLowerCase())}"><summary><span class="s-id">${esc(s.id)}</span><span class="s-sec">${esc(s.sec_label || "")}</span><span class="s-en">${esc(s.en)}</span></summary><div class="sentence-body"><p><b>主干</b>${esc(s.core || "")}</p><p><b>结构</b>${esc(s.structure || "")}</p><p><b>关键词</b>${esc(s.key || "")}</p><p><b>翻译</b>${esc(s.zh || "")}</p><p><b>提醒</b>${esc(s.tip || "")}</p></div></details>`).join("")}</div>
    </section>`;
  }

  function vocabListHtml(list) {
    if (!list.length) return '<div class="vocab-empty">没有匹配的词汇。</div>';
    return `<div class="vocab-list">${list.map((v) => {
      const id = String(v._id ?? vocab.indexOf(v));
      const on = mastered.has(id);
      return `<div class="vocab-row${on ? " is-mastered" : ""}" data-vrow="${id}" data-vsec="${esc(v.sec || "")}" data-vlabel="${esc(v.sec_label || "")}" data-vsearch="${esc((v.w + " " + v.cn + " " + (v.ctx || "") + " " + (v.note || "")).toLowerCase())}">
        <button class="vocab-star${on ? " is-on" : ""}" type="button" data-vstar="${id}" aria-label="标记 ${esc(v.w)} 已掌握">${on ? "★" : "☆"}</button>
        <div><div class="vocab-word">${esc(v.w)}<span class="vocab-pos">${esc(v.pos || "")}</span></div><div class="vocab-ctx">${esc(v.sec_label || "")}</div></div>
        <div class="vocab-cn">${esc(v.cn)}<div class="vocab-ctx">“${esc(v.ctx || "")}”</div></div>
        <div class="vocab-note">${esc(v.note || "")}</div>
      </div>`;
    }).join("")}</div>`;
  }

  function renderVocab() {
    const sec = sections().find((s) => s.id === "vocab");
    if (!vocab.length) return "";
    const groups = [...new Set(vocab.map((v) => v.sec_label).filter(Boolean))];
    return `<section class="analysis-section" id="vocab">${sectionHead(sec, "Word Bank", "全卷词汇 · 这一年的重难点词", `${vocab.length} 词 · 按出现板块筛选`)}
      <div class="analysis-banner"><b>范围：</b>不是只收阅读生词，而是把完形、阅读、新题型、翻译里出现的重难点词全部放进这一页。先看语境，再看释义和辨析。</div>
      <div class="vocab-tools">
        <input class="vocab-search" id="vocabSearch" type="search" placeholder="搜索单词、中文释义或语境">
        <div class="vocab-filter" id="vocabFilters"><button class="is-active" type="button" data-vfilter="all">全部 ${vocab.length}</button>${groups.map((g) => `<button type="button" data-vfilter="${esc(g)}">${esc(g)}</button>`).join("")}</div>
        <label class="vocab-count"><input type="checkbox" id="vocabUnmastered"> 只看未掌握</label>
        <span class="vocab-count" id="vocabCount">${vocab.length} / ${vocab.length} 词</span>
      </div>
      ${vocabListHtml(vocab.map((v, i) => ({ ...v, _id: i })))}
    </section>`;
  }

  function renderAll() {
    $("#analysisMount").innerHTML = renderCloze() + renderReading() + renderPartB() + renderPartC() + renderWriting() + renderSentences() + renderVocab();
    renderNav();
  }

  // ---------- events ----------
  document.addEventListener("click", (event) => {
    const zh = event.target.closest("[data-zh-toggle]");
    if (zh) {
      const p = zh.parentElement;
      const target = p && p.querySelector(".analysis-zh");
      if (target) { target.hidden = !target.hidden; zh.textContent = target.hidden ? "译文" : "收起译文"; }
      return;
    }
    const sample = event.target.closest("[data-sample-zh]");
    if (sample) {
      const box = sample.closest(".sample-box");
      const target = box && box.querySelector(".sample-zh");
      if (target) { target.hidden = !target.hidden; sample.textContent = target.hidden ? "参考译文" : "收起译文"; }
      return;
    }
    const star = event.target.closest("[data-vstar]");
    if (star) {
      const id = star.dataset.vstar;
      if (mastered.has(id)) mastered.delete(id); else mastered.add(id);
      saveMastered();
      const row = star.closest(".vocab-row");
      if (row) row.classList.toggle("is-mastered", mastered.has(id));
      star.classList.toggle("is-on", mastered.has(id));
      star.textContent = mastered.has(id) ? "★" : "☆";
      filterVocab();
    }
    const filter = event.target.closest("[data-vfilter]");
    if (filter) {
      $$("[data-vfilter]").forEach((b) => b.classList.toggle("is-active", b === filter));
      filterVocab();
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-self]")) {
      const key = event.target.dataset.self;
      const max = key === "partc" ? 10 : 30;
      selfScore[key] = Math.max(0, Math.min(max, Number(event.target.value) || 0));
      updateTotal();
    }
    if (event.target.id === "vocabSearch" || event.target.id === "vocabUnmastered") filterVocab();
    if (event.target.id === "sentenceSearch") filterSentences();
  });

  function filterVocab() {
    const q = ($("#vocabSearch")?.value || "").trim().toLowerCase();
    const onlyUn = Boolean($("#vocabUnmastered")?.checked);
    const active = $("[data-vfilter].is-active")?.dataset.vfilter || "all";
    const rows = $$(".vocab-row");
    let shown = 0;
    rows.forEach((row) => {
      const id = row.dataset.vrow;
      const ok = (!q || row.dataset.vsearch.includes(q)) && (active === "all" || row.dataset.vlabel === active) && (!onlyUn || !mastered.has(id));
      row.style.display = ok ? "" : "none";
      if (ok) shown += 1;
    });
    const count = $("#vocabCount");
    if (count) count.textContent = `${shown} / ${rows.length} 词`;
  }

  function filterSentences() {
    const q = ($("#sentenceSearch")?.value || "").trim().toLowerCase();
    const cards = $$(".sentence-card");
    let shown = 0;
    cards.forEach((card) => {
      const ok = !q || card.dataset.sentence.includes(q);
      card.style.display = ok ? "" : "none";
      if (ok) shown += 1;
    });
    const count = $("#sentenceCount");
    if (count) count.textContent = `${shown} / ${cards.length} 句`;
  }

  $("#printPage")?.addEventListener("click", () => {
    $$("details").forEach((d) => { d.open = true; });
    window.print();
  });

  if (new URLSearchParams(location.search).get("submitted")) {
    const toast = $("#toast");
    if (toast) {
      toast.textContent = "交卷完成，已生成本卷成绩单";
      toast.classList.add("is-visible");
      window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
    }
  }

  renderReport();
  renderAll();
  filterVocab();
  filterSentences();
  updateTotal();
})();
