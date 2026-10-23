(() => {
  "use strict";
  const DATA = window.__YEAR_DATA__;
  const { meta, reading, sentences, vocab, cloze, partb, partc, writing } = DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const LS_KEY = `dsh-reader-${meta.year}-v1`;

  const state = (() => {
    try {
      const raw = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      return {
        sentences: new Set(raw.sentences || []),
        words: new Set(raw.words || []),
      };
    } catch (e) {
      return { sentences: new Set(), words: new Set() };
    }
  })();
  const save = () => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ sentences: [...state.sentences], words: [...state.words] }));
    } catch (e) { /* ignore */ }
  };

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const escAttr = (s) => esc(s).replace(/\n/g, " ");
  const pad = (n) => String(n).padStart(2, "0");

  // ---------- vocabulary index / highlight ----------
  const vocabById = new Map();
  const vocabByForm = new Map();
  vocab.forEach((v, i) => {
    v._id = i;
    vocabById.set(String(i), v);
    new Set([v.w, ...(v.forms || [])]).forEach((f) => {
      const k = String(f).toLowerCase();
      if (!vocabByForm.has(k)) vocabByForm.set(k, v);
    });
  });
  const forms = [...vocabByForm.keys()].sort((a, b) => b.length - a.length);
  const pattern = forms.map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  let HI;
  try { HI = new RegExp(`(?<![A-Za-z])(${pattern})(?![A-Za-z])`, "gi"); }
  catch (e) { HI = new RegExp(`\\b(${pattern})\\b`, "gi"); }
  const cache = new Map();
  function highlight(text) {
    if (!text) return "";
    if (cache.has(text)) return cache.get(text);
    let out = "", last = 0;
    for (const m of text.matchAll(HI)) {
      const hit = m[0], entry = vocabByForm.get(hit.toLowerCase());
      if (!entry) continue;
      out += esc(text.slice(last, m.index));
      out += `<span class="vh" role="button" tabindex="0" data-vid="${entry._id}" title="点击查看：${escAttr(entry.cn)}">${esc(hit)}</span>`;
      last = m.index + hit.length;
    }
    out += esc(text.slice(last));
    cache.set(text, out);
    return out;
  }
  function richText(text) {
    let out = "", last = 0;
    const re = /\[\[(\d+)\]\]([\s\S]*?)\[\[\/\1\]\]/g;
    for (const m of text.matchAll(re)) {
      out += highlight(text.slice(last, m.index));
      out += `<span class="underlined" role="button" tabindex="0" data-seg="${m[1]}">${highlight(m[2])}<sup>${m[1]}</sup></span>`;
      last = m.index + m[0].length;
    }
    out += highlight(text.slice(last));
    return out.replace(/\{\{(\d+)\}\}/g, (_, n) => `<button type="button" class="blank" data-blank="${n}">${n}</button>`);
  }

  // ---------- rendering ----------
  function headHTML(id, index, kicker, title, topic) {
    return `<header class="section-head">
      <div class="section-index">${index}</div>
      <div class="section-title-wrap">
        <p class="section-kicker">${esc(kicker)}</p>
        <h2>${esc(title)}</h2>
        <p class="section-topic">${esc(topic)}</p>
      </div>
    </header>`;
  }

  function paperHead(label, topic, score) {
    return `<header class="paper-head"><span class="paper-label">${esc(label)}</span><span class="paper-topic">${esc(topic)}</span><span class="paper-score">${esc(score)}</span></header>`;
  }

  function paraHTML(p, i, prefix) {
    return `<div class="para">
      <span class="para-no">P${i}</span>
      <p class="en">${richText(p.en)}</p>
      <button type="button" class="para-toggle" data-para-toggle>译文</button>
      <p class="zh" hidden>${esc(p.zh)}</p>
    </div>`;
  }

  function qFeedback(q, letters) {
    return `<b>答案 ${q.answer}</b>　${esc(q.explain || "").replace(/\n/g, "<br>")}
      ${q.evidence ? `<span class="ev">原文定位：${esc(q.evidence)}</span>` : ""}
      ${q.trap ? `<span class="ev">干扰项：${esc(q.trap)}</span>` : ""}`;
  }

  function qCard(q, prefix, letters = "ABCD") {
    const qid = `${prefix}-${q.n}`;
    const selected = null; // reader page is practice-only; state not persisted per question
    const opts = q.options.map((opt, i) => {
      const letter = letters[i];
      return `<button type="button" class="opt" data-letter="${letter}">
        <span class="letter">${letter}</span><span>${esc(opt)}</span>
      </button>`;
    }).join("");
    return `<article class="q-card" id="q-${qid}" data-qid="${qid}" data-answer="${q.answer}">
      <div class="q-top"><span class="q-no">${pad(q.n)}</span><span class="q-type">${esc(q.type || "选择题")}</span></div>
      <p class="q-stem">${esc(q.stem)}</p>
      <div class="options">${opts}</div>
      <div class="q-feedback" hidden>${qFeedback(q, letters)}</div>
      <div class="q-tools">
        <button type="button" class="q-reveal" data-reveal>看解析</button>
        <button type="button" class="q-reset" data-reset>重做</button>
      </div>
    </article>`;
  }

  function renderReading(offset = 0) {
    const mount = $("#readingMount");
    mount.innerHTML = reading.map((t, idx) => {
      const start = t.questions[0].n;
      const end = t.questions[t.questions.length - 1].n;
      return `<section class="chapter" id="${t.id}" data-section="${t.id}">
        ${headHTML(t.id, pad(offset + idx + 1), "Section II · Part A", t.title, `${t.cn_title} · ${t.score} 分 · ${t.suggest}`)}
        <p class="section-lede">${esc(t.intro)}</p>
        <div class="paper-tools">
          <button type="button" class="tool-btn" data-zh-all>显示全部译文</button>
          <button type="button" class="tool-btn" data-hl-toggle>重点词高亮：开</button>
          <button type="button" class="tool-btn" data-size-btn="sm">字小</button>
          <button type="button" class="tool-btn" data-size-btn="md">字中</button>
          <button type="button" class="tool-btn" data-size-btn="lg">字大</button>
        </div>
        <article class="paper" data-paper="${t.id}" data-size="md">
          <header class="paper-head">
            <span class="paper-label">${t.title}</span>
            <span class="paper-topic">${esc(t.cn_title)}</span>
            <span class="paper-score">10 points</span>
          </header>
          ${t.paragraphs.map((p, i) => paraHTML(p, i + 1, t.id)).join("")}
        </article>
        <div class="question-area">
          <div class="question-area-head"><h3>第 ${start}–${end} 题</h3><span>答案 + 原文定位 + 选项辨析</span></div>
          <div class="q-grid">${t.questions.map((q) => qCard(q, t.id)).join("")}</div>
        </div>
      </section>`;
    }).join("");
  }

  // ---------- cloze ----------
  function renderCloze() {
    if (!cloze) return;
    const mount = $("#clozeMount");
    mount.innerHTML = `<section class="chapter" id="cloze" data-section="cloze">
      ${headHTML("cloze", "01", "Section I · Use of English", "完形填空", `${cloze.topic} · ${cloze.score} 分 · ${cloze.suggest}`)}
      <p class="section-lede">${esc(cloze.intro)}</p>
      <div class="paper-tools">
        <button type="button" class="tool-btn" data-zh-all>显示全部译文</button>
        <button type="button" class="tool-btn" data-hl-toggle>重点词高亮：开</button>
      </div>
      <article class="paper" data-paper="cloze" data-size="md">
        <header class="paper-head"><span class="paper-label">Cloze</span><span class="paper-topic">${esc(cloze.topic)}</span><span class="paper-score">10 points</span></header>
        ${cloze.passage.map((p, i) => paraHTML(p, i + 1, "cloze")).join("")}
      </article>
      <div class="question-area">
        <div class="question-area-head"><h3>20 个空，逐题核对</h3><span>先写理由，再看解析</span></div>
        <div class="q-grid">${cloze.questions.map((q) => qCard(q, "cloze", "ABCD")).join("")}</div>
      </div>
    </section>`;
  }

  // ---------- part B ----------
  function answerTable() {
    return `<details class="answer-key">
      <summary>答案与衔接（做完再看）</summary>
      ${partb.answers.map((a) => `<p><b>${a.n} → ${a.answer}</b>　${esc(a.explain)}${a.clue ? `　<span style="color:var(--muted)">线索：${esc(a.clue)}</span>` : ""}</p>`).join("")}
      ${partb.fixed_note ? `<p>${esc(partb.fixed_note)}</p>` : ""}
    </details>`;
  }

  function renderPartB() {
    if (!partb) return;
    const mount = $("#partbMount");
    const no = cloze ? "06" : "05";
    let body = "";
    if (partb.type === "ordering") {
      const paras = Object.entries(partb.paragraphs || {}).map(([k, v]) => `<div class="para">
        <span class="para-no">${k}</span>
        <p class="en">${richText(v.en)}</p>
        <button type="button" class="para-toggle" data-para-toggle>译文</button>
        <p class="zh" hidden>${esc(v.zh)}</p>
      </div>`).join("");
      body = `<article class="paper">${paperHead("Part B", partb.cn_title, "10 points")}${paras}</article>${answerTable()}`;
    } else {
      const blocks = (partb.blocks || []).map((b, i) => {
        if (b.type === "heading") return `<h3 style="font-family:var(--serif-cn);font-size:19px;margin:24px 0 8px;padding-left:44px;color:var(--red)">${esc(b.en)} <span style="font-family:var(--sans);font-size:11px;color:var(--muted)">${esc(b.zh)}</span></h3>`;
        return `<div class="para"><span class="para-no">${pad(i + 1)}</span><p class="en">${b.label ? `<b class="match-label">${esc(b.label)}</b>` : ""}${richText(b.en)}</p><button type="button" class="para-toggle" data-para-toggle>译文</button><p class="zh" hidden>${esc(b.zh)}</p></div>`;
      }).join("");
      const opts = Object.entries(partb.options || {}).map(([k, o]) => `<div class="pool-item"><span class="letter">[${k}]</span><div><p class="pool-en">${esc(o.en)}</p><p class="pool-zh">${esc(o.zh)}</p></div></div>`).join("");
      body = `<article class="paper">${paperHead("Part B", partb.cn_title, "10 points")}${blocks}</article><div class="option-pool">${opts}</div>${answerTable()}`;
    }
    mount.innerHTML = `<section class="chapter" id="partb" data-section="partb">
      ${headHTML("partb", no, "Section II · Part B", partb.title, `${partb.cn_title} · ${partb.score} 分 · ${partb.suggest}`)}
      <p class="section-lede">${esc(partb.intro)}</p>
      <div class="reader-banner" style="margin:0 0 16px"><b>题型：</b>${esc(partb.directions)}</div>
      ${body}
    </section>`;
  }

  // ---------- part C ----------
  function renderPartC() {
    if (!partc) return;
    const mount = $("#partcMount");
    const no = cloze ? "07" : "06";
    const segs = Object.entries(partc.segments || {}).map(([n, s]) => `<article class="seg-card" id="seg-${n}" data-seg-card="${n}">
      <div class="seg-head" data-seg-toggle role="button" tabindex="0"><span class="seg-no">${n}</span><span style="color:var(--muted);font-size:11px">点击展开：主干 / 结构 / 关键词 / 参考译文</span></div>
      <p class="seg-en">${esc(s.en)}</p>
      <div class="seg-body">
        <p><b>主干</b>　${esc(s.core)}</p>
        <p><b>结构</b>　${esc(s.structure)}</p>
        <p><b>关键词</b>　${esc(s.key)}</p>
        <p><b>参考译文</b></p><div class="seg-quote">${esc(s.translation)}</div>
        <p><b>易错点</b>　${esc(s.pitfall)}</p>
      </div></article>`).join("");
    mount.innerHTML = `<section class="chapter" id="partc" data-section="partc">
      ${headHTML("partc", no, "Section II · Part C", "翻译", `${partc.cn_title} · ${partc.score} 分 · ${partc.suggest}`)}
      <p class="section-lede">${esc(partc.intro)}</p>
      <div class="paper"><header class="paper-head"><span class="paper-label">Part C</span><span class="paper-topic">${esc(partc.en_title)}</span><span class="paper-score">10 points</span></header>
        ${partc.paragraphs.map((p, i) => paraHTML(p, i + 1, "partc")).join("")}
      </div>
      <div class="segment-grid">${segs}</div>
    </section>`;
  }

  // ---------- writing ----------
  function noteLine(items) {
    return (items || []).map((x) => esc(String(x).replace(/[。；;]+$/, ""))).join("；") + "。";
  }
  function writingLists(part) {
    return `<div class="writing-lists">
      <div class="writing-list"><h4>结构骨架</h4><ol>${(part.structure || []).map(([a, b]) => `<li><b>${esc(a)}</b>：${esc(b)}</li>`).join("")}</ol></div>
      <div class="writing-list"><h4>可替换表达</h4><ul>${(part.expressions || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    </div>`;
  }
  function renderWriting() {
    if (!writing) return;
    const mount = $("#writingMount");
    const no = cloze ? "08" : "07";
    const a = writing.partA, b = writing.partB;
    const pic = b.picture && b.picture.src
      ? `<div class="picture-frame"><img src="${escAttr(b.picture.src)}" alt="${escAttr(b.picture.caption || "作文图画")}"><div class="picture-caption"><span>${esc(b.picture.caption || "")}</span><span>原图</span></div></div>`
      : "";
    mount.innerHTML = `<section class="chapter" id="writing" data-section="writing">
      ${headHTML("writing", no, "Section III", "写作", `${writing.topic} · ${writing.score} 分 · ${writing.suggest}`)}
      <p class="section-lede">${esc(writing.intro)}</p>
      <div class="writing-part">
        <div class="writing-part-head"><h3>${esc(a.title)}</h3><span>51 · ${esc(a.score)} 分 · ${esc(a.words)}</span></div>
        <div class="writing-grid"><div>
          <div class="prompt-box">${esc(a.prompt)}<div class="prompt-zh">${esc(a.prompt_zh)}</div></div>
          <div class="writing-note"><b>注意：</b>${noteLine(a.traps)}</div>
          ${writingLists(a)}
        </div><div class="sample-box"><h4>参考范文</h4><div class="sample-text">${esc(a.sample)}</div>
          <button class="tool-btn" data-sample-zh type="button" style="margin-top:12px">显示译文</button>
          <div class="sample-zh" hidden>${esc(a.sample_zh)}</div>
        </div></div>
      </div>
      <div class="writing-part">
        <div class="writing-part-head"><h3>${esc(b.title)}</h3><span>52 · ${esc(b.score)} 分 · ${esc(b.words)}</span></div>
        <div class="writing-grid"><div>
          <div class="prompt-box">${esc(b.prompt)}<div class="prompt-zh">${esc(b.prompt_zh)}</div></div>
          ${pic}
          ${b.picture ? `<div class="writing-note"><b>图意：</b>${esc(b.picture.note || "")}</div>` : ""}
          <div class="writing-note"><b>注意：</b>${noteLine(b.traps)}</div>
          ${writingLists(b)}
        </div><div class="sample-box"><h4>参考范文</h4><div class="sample-text">${esc(b.sample)}</div>
          <button class="tool-btn" data-sample-zh type="button" style="margin-top:12px">显示译文</button>
          <div class="sample-zh" hidden>${esc(b.sample_zh)}</div>
        </div></div>
      </div>
    </section>`;
  }

  // ---------- sentences ----------
  const sentenceFilters = { sec: "all", q: "", unmastered: false };
  const secNames = { text1: "Text 1", text2: "Text 2", text3: "Text 3", text4: "Text 4" };
  function filteredSentences() {
    return sentences.filter((s) => {
      if (sentenceFilters.sec !== "all" && s.sec !== sentenceFilters.sec) return false;
      if (sentenceFilters.unmastered && state.sentences.has(s.id)) return false;
      if (sentenceFilters.q) {
        const q = sentenceFilters.q.toLowerCase();
        if (!`${s.en} ${s.zh} ${s.key} ${s.structure} ${s.sec_label}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }
  function renderSentenceFilters() {
    const counts = {};
    sentences.forEach((s) => { counts[s.sec] = (counts[s.sec] || 0) + 1; });
    $("#sentenceSecFilters").innerHTML = [`<button class="chip ${sentenceFilters.sec === "all" ? "active" : ""}" data-sfilter="all">全部 ${sentences.length}</button>`]
      .concat(Object.keys(secNames).map((k) => `<button class="chip ${sentenceFilters.sec === k ? "active" : ""}" data-sfilter="${k}">${secNames[k]} ${counts[k] || 0}</button>`)).join("");
  }
  function renderSentences() {
    renderSentenceFilters();
    const list = filteredSentences();
    $("#sentenceCount").textContent = `当前显示 ${list.length} / ${sentences.length} 句`;
    $("#sentenceList").innerHTML = list.map((s) => {
      const done = state.sentences.has(s.id);
      return `<article class="s-card ${done ? "mastered" : ""}" id="sent-${s.id}" data-sid="${s.id}">
        <div class="s-head" data-stoggle role="button" tabindex="0">
          <span class="s-id">${s.id}</span><span class="s-sec">${esc(s.sec_label)}</span>
          <span class="s-level"><i class="on"></i><i class="on"></i><i class="on"></i></span>
          <button type="button" class="s-toggle" tabindex="-1">展开</button>
        </div>
        <p class="s-en">${esc(s.en)}</p>
        <div class="s-xray">
          <div class="xray-row"><span class="xray-label">主干</span><span class="xray-val">${esc(s.core)}</span></div>
          <div class="xray-row"><span class="xray-label">结构</span><span class="xray-val">${esc(s.structure)}</span></div>
          <div class="xray-row"><span class="xray-label">关键词</span><span class="xray-val">${esc(s.key)}</span></div>
          <div class="xray-row"><span class="xray-label">翻译</span><span class="xray-val zh">${esc(s.zh)}</span></div>
          <div class="xray-row"><span class="xray-label">提醒</span><span class="xray-val">${esc(s.tip)}</span></div>
          <div class="s-actions">
            <button type="button" class="speak-btn" data-speak="${escAttr(s.en)}">▶</button>
            <button type="button" class="master-btn ${done ? "on" : ""}" data-master-sentence="${s.id}">${done ? "已掌握" : "标记已掌握"}</button>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  // ---------- vocabulary ----------
  const vocabFilters = { sec: "all", q: "", unmastered: false };
  function filteredVocab() {
    return vocab.filter((v) => {
      if (vocabFilters.sec !== "all" && v.sec !== vocabFilters.sec) return false;
      if (vocabFilters.unmastered && state.words.has(String(v._id))) return false;
      if (vocabFilters.q && !`${v.w} ${v.cn} ${v.ctx} ${v.note}`.toLowerCase().includes(vocabFilters.q.toLowerCase())) return false;
      return true;
    });
  }
  function renderVocabFilters() {
    const counts = {};
    vocab.forEach((v) => { counts[v.sec] = (counts[v.sec] || 0) + 1; });
    $("#vocabSecFilters").innerHTML = [`<button class="chip ${vocabFilters.sec === "all" ? "active" : ""}" data-vfilter="all">全部 ${vocab.length}</button>`]
      .concat(Object.keys(secNames).map((k) => `<button class="chip ${vocabFilters.sec === k ? "active" : ""}" data-vfilter="${k}">${secNames[k]} ${counts[k] || 0}</button>`)).join("");
  }
  function renderVocab() {
    renderVocabFilters();
    const list = filteredVocab();
    $("#vocabCount").textContent = `当前显示 ${list.length} / ${vocab.length} 词 · 点击词条看完整笔记`;
    $("#vocabList").innerHTML = list.map((v) => {
      const id = String(v._id), done = state.words.has(id);
      const noNote = !v.note || v.note === v.cn;
      return `<div class="v-row ${done ? "mastered" : ""} ${noNote ? "no-note" : ""}" data-vid="${id}" data-vsec="${v.sec}">
        <button type="button" class="v-star ${done ? "on" : ""}" data-master-word="${id}">${done ? "★" : "☆"}</button>
        <div><div class="v-word"><strong>${esc(v.w)}</strong><span class="v-pos">${esc(v.pos)}</span></div>
          <div class="v-tools"><button type="button" class="speak-btn" data-speak="${escAttr(v.w)}">▶</button></div></div>
        <div class="v-cn">${esc(v.cn)}<div class="v-ctx">“${esc(v.ctx)}”</div></div>
        ${noNote ? "" : `<div class="v-note">${esc(v.note)}</div>`}
      </div>`;
    }).join("");
  }

  // ---------- modal / flashcards ----------
  const modal = $("#modal"), modalBody = $("#modalBody");
  let flash = { list: [], index: 0, revealed: false };
  function openModal(html) {
    modalBody.innerHTML = html;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $("#modalClose").focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    modalBody.innerHTML = "";
  }
  function openVocab(v) {
    const done = state.words.has(String(v._id));
    openModal(`<div class="vocab-pop">
      <p class="flash-kicker">WORD NOTE · ${esc(v.sec_label)}</p>
      <h3>${esc(v.w)}</h3><span class="pop-pos">${esc(v.pos)}</span>
      <p class="pop-cn">${esc(v.cn)}</p>
      <div class="pop-ctx">“${esc(v.ctx)}”</div>
      ${v.note && v.note !== v.cn ? `<p class="pop-note">${esc(v.note)}</p>` : ""}
      <div class="pop-actions">
        <button class="tool-btn" type="button" data-speak="${escAttr(v.w)}">朗读</button>
        <button class="tool-btn" type="button" data-master-word="${v._id}">${done ? "取消已掌握" : "标记已掌握"}</button>
      </div></div>`);
  }
  function flashMarkup() {
    const v = flash.list[flash.index];
    if (!v) return "<p class='flash-kicker'>FLASHCARD</p><h3 class='flash-word'>没有卡片</h3>";
    return `<p class="flash-kicker">FLASHCARD · ${flash.index + 1}/${flash.list.length}</p>
      <h3 class="flash-word">${esc(v.w)}</h3><span class="flash-pos">${esc(v.pos)}</span>
      <p class="flash-ctx">“${esc(v.ctx)}”</p>
      <div class="flash-answer" ${flash.revealed ? "" : "hidden"}><p class="flash-cn">${esc(v.cn)}</p><p class="flash-note">${esc(v.note)}</p></div>
      <div class="flash-actions">
        <button class="tool-btn" type="button" id="flashReveal">${flash.revealed ? "隐藏释义" : "显示释义"}</button>
        <button class="tool-btn" type="button" data-speak="${escAttr(v.w)}">朗读</button>
        <button class="tool-btn" type="button" id="flashKnow">认识，下一张</button>
        <button class="tool-btn" type="button" id="flashNext">再复习</button>
        <span class="flash-meta">空格翻面 · → 下一张 · Esc 退出</span>
      </div>`;
  }
  function bindFlash() {
    const r = $("#flashReveal"), k = $("#flashKnow"), n = $("#flashNext");
    if (r) r.addEventListener("click", () => { flash.revealed = !flash.revealed; modalBody.innerHTML = flashMarkup(); bindFlash(); });
    if (k) k.addEventListener("click", () => {
      const v = flash.list[flash.index];
      if (v) { state.words.add(String(v._id)); save(); updateWordDom(v._id); }
      nextFlash();
    });
    if (n) n.addEventListener("click", nextFlash);
  }
  function nextFlash() {
    if (!flash.list.length) return;
    flash.index = (flash.index + 1) % flash.list.length;
    flash.revealed = false;
    modalBody.innerHTML = flashMarkup();
    bindFlash();
  }
  function openFlash() {
    let list = filteredVocab();
    if (!list.length) list = vocab.slice();
    if (!list.length) return;
    // shuffle
    list = list.slice().sort(() => Math.random() - 0.5);
    flash = { list, index: 0, revealed: false };
    openModal(flashMarkup());
    bindFlash();
  }
  function updateWordDom(id) {
    const row = $(`.v-row[data-vid="${id}"]`);
    if (!row) return;
    const done = state.words.has(String(id));
    row.classList.toggle("mastered", done);
    const star = $(".v-star", row);
    if (star) { star.classList.toggle("on", done); star.textContent = done ? "★" : "☆"; }
  }

  // ---------- tooltip / speech ----------
  const tip = $("#tip");
  function showTip(el) {
    const v = vocabById.get(el.dataset.vid);
    if (!v) return;
    tip.innerHTML = `<strong>${esc(v.w)}</strong> <em>${esc(v.pos)}</em><br>${esc(v.cn)}<br><em>${esc(v.ctx)}</em>`;
    tip.hidden = false;
    const r = el.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
    let left = Math.max(8, Math.min(r.left + r.width / 2 - tw / 2, innerWidth - tw - 8));
    let top = r.top - th - 8;
    if (top < 8) top = r.bottom + 8;
    tip.style.left = `${left}px`; tip.style.top = `${top}px`;
  }
  function hideTip() { tip.hidden = true; }
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 0.9; speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  // ---------- events ----------
  function bind() {
    document.addEventListener("click", (e) => {
      const opt = e.target.closest(".opt");
      if (opt) {
        const card = opt.closest(".q-card");
        if (!card || card.classList.contains("answered")) return;
        const letter = opt.dataset.letter, answer = card.dataset.answer;
        card.classList.add("answered");
        card.querySelectorAll(".opt").forEach((b) => {
          b.disabled = true;
          if (b.dataset.letter === answer) b.classList.add("correct");
          else if (b.dataset.letter === letter) b.classList.add("wrong");
        });
        const fb = card.querySelector(".q-feedback");
        if (fb) fb.hidden = false;
        const rev = card.querySelector("[data-reveal]");
        if (rev) rev.textContent = "收起解析";
        return;
      }
      const reveal = e.target.closest("[data-reveal]");
      if (reveal) {
        const fb = reveal.closest(".q-card")?.querySelector(".q-feedback");
        if (fb) { fb.hidden = !fb.hidden; reveal.textContent = fb.hidden ? "看解析" : "收起解析"; }
        return;
      }
      const reset = e.target.closest("[data-reset]");
      if (reset) {
        const card = reset.closest(".q-card");
        if (!card) return;
        card.classList.remove("answered");
        card.querySelectorAll(".opt").forEach((b) => { b.disabled = false; b.classList.remove("correct", "wrong"); });
        const fb = card.querySelector(".q-feedback"); if (fb) fb.hidden = true;
        const rev = card.querySelector("[data-reveal]"); if (rev) rev.textContent = "看解析";
        return;
      }
      const blank = e.target.closest(".blank");
      if (blank) {
        const card = document.getElementById(`q-cloze-${blank.dataset.blank}`);
        if (card) { card.scrollIntoView({ behavior: "smooth", block: "center" }); card.classList.add("flash"); setTimeout(() => card.classList.remove("flash"), 900); }
        return;
      }
      const segToggle = e.target.closest("[data-seg-toggle]");
      if (segToggle) {
        const card = segToggle.closest(".seg-card");
        if (card) card.classList.toggle("open");
        return;
      }
      const underline = e.target.closest(".underlined");
      if (underline) {
        const card = document.getElementById(`seg-${underline.dataset.seg}`);
        if (card) { card.classList.add("open"); card.scrollIntoView({ behavior: "smooth", block: "center" }); }
        return;
      }
      const sampleZh = e.target.closest("[data-sample-zh]");
      if (sampleZh) {
        const zh = sampleZh.closest(".sample-box")?.querySelector(".sample-zh");
        if (zh) { zh.hidden = !zh.hidden; sampleZh.textContent = zh.hidden ? "显示译文" : "隐藏译文"; }
        return;
      }
      const pt = e.target.closest("[data-para-toggle]");
      if (pt) {
        const zh = pt.closest(".para")?.querySelector(".zh");
        if (zh) { zh.hidden = !zh.hidden; pt.textContent = zh.hidden ? "译文" : "收起译文"; }
        return;
      }
      const zha = e.target.closest("[data-zh-all]");
      if (zha) {
        const sec = zha.closest("section");
        const all = $$(".zh", sec), any = all.some((z) => z.hidden);
        all.forEach((z) => { z.hidden = !any; });
        $$("[data-para-toggle]", sec).forEach((b) => { b.textContent = any ? "收起译文" : "译文"; });
        zha.textContent = any ? "隐藏全部译文" : "显示全部译文";
        return;
      }
      const hl = e.target.closest("[data-hl-toggle]");
      if (hl) {
        const paper = hl.closest("section").querySelector("[data-paper]");
        if (paper) { const hidden = paper.classList.toggle("hide-vocab"); hl.textContent = hidden ? "重点词高亮：关" : "重点词高亮：开"; }
        return;
      }
      const sb = e.target.closest("[data-size-btn]");
      if (sb) {
        const paper = sb.closest("section").querySelector("[data-paper]");
        if (paper) paper.dataset.size = sb.dataset.sizeBtn;
        return;
      }
      const st = e.target.closest("[data-stoggle]");
      if (st) {
        const card = st.closest(".s-card");
        if (card) { card.classList.toggle("open"); const b = $(".s-toggle", card); if (b) b.textContent = card.classList.contains("open") ? "收起" : "展开"; }
        return;
      }
      const ms = e.target.closest("[data-master-sentence]");
      if (ms) {
        const id = ms.dataset.masterSentence;
        if (state.sentences.has(id)) state.sentences.delete(id); else state.sentences.add(id);
        save();
        ms.classList.toggle("on", state.sentences.has(id));
        ms.textContent = state.sentences.has(id) ? "已掌握" : "标记已掌握";
        return;
      }
      const mw = e.target.closest("[data-master-word]");
      if (mw) {
        const id = String(mw.dataset.masterWord);
        if (state.words.has(id)) state.words.delete(id); else state.words.add(id);
        save(); updateWordDom(id);
        if (!modal.hidden) { const v = vocabById.get(id); if (v) openVocab(v); }
        return;
      }
      const vh = e.target.closest(".vh");
      if (vh) { const v = vocabById.get(vh.dataset.vid); if (v) openVocab(v); return; }
      const speakEl = e.target.closest("[data-speak]");
      if (speakEl) { speak(speakEl.dataset.speak); return; }
    });

    document.addEventListener("mouseover", (e) => { const vh = e.target.closest(".vh"); if (vh) showTip(vh); });
    document.addEventListener("mouseout", (e) => { if (e.target.closest(".vh")) hideTip(); });
    document.addEventListener("focusin", (e) => { const vh = e.target.closest(".vh"); if (vh) showTip(vh); });
    document.addEventListener("focusout", (e) => { if (e.target.closest(".vh")) hideTip(); });
    window.addEventListener("scroll", hideTip, { passive: true });

    $("#sentenceSearch").addEventListener("input", (e) => { sentenceFilters.q = e.target.value.trim(); renderSentences(); });
    $("#sentenceUnmastered").addEventListener("change", (e) => { sentenceFilters.unmastered = e.target.checked; renderSentences(); });
    $("#sentenceSecFilters").addEventListener("click", (e) => { const c = e.target.closest("[data-sfilter]"); if (c) { sentenceFilters.sec = c.dataset.sfilter; renderSentences(); } });
    $("#vocabSearch").addEventListener("input", (e) => { vocabFilters.q = e.target.value.trim(); renderVocab(); });
    $("#vocabUnmastered").addEventListener("change", (e) => { vocabFilters.unmastered = e.target.checked; renderVocab(); });
    $("#vocabSecFilters").addEventListener("click", (e) => { const c = e.target.closest("[data-vfilter]"); if (c) { vocabFilters.sec = c.dataset.vfilter; renderVocab(); } });
    $("#flashcardBtn").addEventListener("click", openFlash);
    $("#modalClose").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
      if (!modal.hidden && flash.list.length) {
        if (e.code === "Space") { e.preventDefault(); flash.revealed = !flash.revealed; modalBody.innerHTML = flashMarkup(); bindFlash(); }
        if (e.key === "ArrowRight") { e.preventDefault(); nextFlash(); }
      }
      if ((e.key === "Enter" || e.key === " ") && e.target.closest(".vh")) {
        e.preventDefault(); e.target.closest(".vh").click();
      }
    });
    // active jump link
    const links = $$("#readerJump a");
    const sections = $$("main [data-section]");
    const onScroll = () => {
      const y = scrollY + innerHeight * 0.25;
      let id = sections.length ? sections[0].id : "text1";
      sections.forEach((s) => { if (s.getBoundingClientRect().top + scrollY <= y) id = s.id; });
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  renderCloze();
  renderReading(cloze ? 1 : 0);
  renderPartB();
  renderPartC();
  renderWriting();
  renderSentences();
  renderVocab();
  bind();
})();
