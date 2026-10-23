/* 2021 英语（一）· 真题拆解 — vanilla JS */
(() => {
  "use strict";

  const DATA = window.__EXAM_DATA__;
  const { meta, cloze, reading, partb, partc, writing, sentences, vocab, skills, quiz, plan } = DATA;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const LS_KEY = "dsh-2021-english1-v1";

  const defaultState = () => ({
    sections: new Set(),
    sentences: new Set(),
    words: new Set(),
    plan: new Set(),
    answers: {},
    quiz: {},
    night: false,
  });

  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      const s = defaultState();
      (raw.sections || []).forEach((x) => s.sections.add(x));
      (raw.sentences || []).forEach((x) => s.sentences.add(x));
      (raw.words || []).forEach((x) => s.words.add(x));
      (raw.plan || []).forEach((x) => s.plan.add(x));
      s.answers = raw.answers || {};
      s.quiz = raw.quiz || {};
      s.night = !!raw.night;
      return s;
    } catch (e) {
      return defaultState();
    }
  }

  const state = loadState();

  function saveState() {
    const raw = {
      sections: [...state.sections],
      sentences: [...state.sentences],
      words: [...state.words],
      plan: [...state.plan],
      answers: state.answers,
      quiz: state.quiz,
      night: state.night,
    };
    try { localStorage.setItem(LS_KEY, JSON.stringify(raw)); } catch (e) { /* ignore */ }
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function escAttr(s) { return esc(s).replace(/\n/g, " "); }
  function pad(n) { return String(n).padStart(2, "0"); }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ---------- vocabulary index & highlighting ---------- */

  const vocabById = new Map();
  const vocabByForm = new Map();
  vocab.forEach((v, i) => {
    v._id = i;
    vocabById.set(String(i), v);
    const forms = new Set([v.w, ...(v.forms || [])]);
    forms.forEach((f) => {
      const key = String(f).toLowerCase();
      if (!vocabByForm.has(key)) vocabByForm.set(key, v);
    });
  });

  const forms = [...vocabByForm.keys()].sort((a, b) => b.length - a.length);
  const formPattern = forms.map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  let HI_RE;
  try {
    HI_RE = new RegExp(`(?<![A-Za-z])(${formPattern})(?![A-Za-z])`, "gi");
  } catch (e) {
    HI_RE = new RegExp(`\\b(${formPattern})\\b`, "gi");
  }

  const highlightCache = new Map();

  function highlight(text) {
    if (!text) return "";
    const cacheKey = text;
    if (highlightCache.has(cacheKey)) return highlightCache.get(cacheKey);
    let out = "";
    let last = 0;
    for (const m of text.matchAll(HI_RE)) {
      const hit = m[0];
      const entry = vocabByForm.get(hit.toLowerCase());
      if (!entry) continue;
      out += esc(text.slice(last, m.index));
      out += `<span class="vh" role="button" tabindex="0" data-vid="${entry._id}" title="点击查看：${escAttr(entry.cn)}">${esc(hit)}</span>`;
      last = m.index + hit.length;
    }
    out += esc(text.slice(last));
    highlightCache.set(cacheKey, out);
    return out;
  }

  function richText(text) {
    let out = "";
    let last = 0;
    const re = /\[\[(\d+)\]\]([\s\S]*?)\[\[\/\1\]\]/g;
    for (const m of text.matchAll(re)) {
      out += highlight(text.slice(last, m.index));
      out += `<span class="underlined" role="button" tabindex="0" data-seg="${m[1]}" aria-label="查看第 ${m[1]} 句解析">${highlight(m[2])}<sup>${m[1]}</sup></span>`;
      last = m.index + m[0].length;
    }
    out += highlight(text.slice(last));
    return out.replace(/\{\{(\d+)\}\}/g, (_, n) =>
      `<button type="button" class="blank" data-blank="${n}" aria-label="第 ${n} 空，点击跳到题目">${n}</button>`
    );
  }

  /* ---------- shared components ---------- */

  function markButton(id, label = "标记完成") {
    const done = state.sections.has(id);
    return `<button class="mark-btn ${done ? "done" : ""}" data-mark-section="${id}" type="button">${done ? "已完成" : label}</button>`;
  }

  function headHTML(id, index, kicker, title, topic, mark = true) {
    return `<header class="section-head">
      <div class="section-index">${index}</div>
      <div class="section-title-wrap">
        <p class="section-kicker">${kicker}</p>
        <h2>${title}</h2>
        <p class="section-topic">${topic}</p>
      </div>
      ${mark ? markButton(id) : ""}
    </header>`;
  }

  function paperHead(label, topic, score) {
    return `<header class="paper-head">
      <span class="paper-label">${label}</span>
      <span class="paper-topic">${topic}</span>
      <span class="paper-score">${score}</span>
    </header>`;
  }

  function paraHTML(p, i, prefix) {
    return `<div class="para" data-para="${prefix}-${i}">
      <span class="para-no">P${i}</span>
      <p class="en">${richText(p.en)}</p>
      <button type="button" class="para-toggle" data-para-toggle>译文</button>
      <p class="zh" hidden>${esc(p.zh)}</p>
    </div>`;
  }

  function toolsHTML(kind) {
    return `<div class="paper-tools" data-tools="${kind}">
      <button type="button" class="tool-btn" data-zh-all>显示全部译文</button>
      <button type="button" class="tool-btn" data-hl-toggle>重点词高亮：开</button>
      <button type="button" class="tool-btn" data-size-btn="sm">字小</button>
      <button type="button" class="tool-btn" data-size-btn="md">字中</button>
      <button type="button" class="tool-btn" data-size-btn="lg">字大</button>
    </div>`;
  }

  function qFeedback(q, letters) {
    let optionMeanings = "";
    if (Array.isArray(q.cn)) {
      optionMeanings = `<span class="ev">${q.options.map((o, i) => `${letters[i]} ${esc(o)}：${esc(q.cn[i])}`).join("　")}</span>`;
    }
    return `<b>答案 ${q.answer}</b>　${esc(q.explain)}
      ${q.evidence ? `<span class="ev">证据句：${esc(q.evidence)}</span>` : ""}
      ${q.trap ? `<span class="ev">干扰项：${esc(q.trap)}</span>` : ""}
      ${optionMeanings}`;
  }

  function qCard(q, prefix, letters = "ABCD", lettersOnly = false) {
    const qid = `${prefix}-${q.n}`;
    const selected = state.answers[qid];
    const answered = !!selected;
    const opts = q.options.map((opt, i) => {
      const letter = letters[i];
      let cls = "";
      if (answered) {
        if (letter === q.answer) cls = "correct";
        else if (letter === selected) cls = "wrong";
      }
      return `<button type="button" class="opt ${cls}" data-letter="${letter}" ${answered ? "disabled" : ""}>
        <span class="letter">${letter}</span>${lettersOnly ? "" : `<span>${esc(opt)}</span>`}
      </button>`;
    }).join("");
    return `<article class="q-card ${answered ? "answered" : ""}" id="q-${qid}" data-qid="${qid}" data-answer="${q.answer}" data-letters="${letters}">
      <div class="q-top"><span class="q-no">${pad(q.n)}</span><span class="q-type">${esc(q.type || "选择题")}</span></div>
      <p class="q-stem">${esc(q.stem || `${q.n}. _____`)}</p>
      <div class="options ${lettersOnly ? "letters-only" : ""}">${opts}</div>
      <div class="q-feedback" ${answered ? "" : "hidden"}>${qFeedback(q, letters)}</div>
      <div class="q-tools">
        <button type="button" class="q-reveal" data-reveal>${answered ? "收起解析" : "看解析"}</button>
        <button type="button" class="q-reset" data-reset>重做</button>
      </div>
    </article>`;
  }

  function questionHead(title, note) {
    return `<div class="question-area-head"><h3>${title}</h3><span>${note}</span></div>`;
  }

  /* ---------- render: map ---------- */

  function renderMap() {
    const grid = $("#mapGrid");
    grid.innerHTML = meta.sections.map((s, i) => `<a class="map-card" href="#${s.id}">
      <span class="map-no">${pad(i + 1)}</span>
      <span class="map-score">${s.score}<small style="font-size:11px;color:var(--muted);font-family:var(--sans)"> 分</small></span>
      <span class="map-label">${s.label}</span>
      <span class="map-meta">题号 ${s.range}</span>
      <span class="map-time">建议 ${s.time}</span>
    </a>`).join("");
  }

  /* ---------- render: cloze ---------- */

  function renderCloze() {
    return `<section class="chapter" id="cloze" data-section="cloze">
      ${headHTML("cloze", "01", "Section I · Use of English", "完形填空", `${cloze.topic} · ${cloze.score} 分 · ${cloze.suggest}`)}
      <p class="section-lede">${esc(cloze.intro)}</p>
      <div class="reading-layout">
        <div>
          ${toolsHTML("cloze")}
          <article class="paper" data-paper="cloze" data-size="md">
            ${paperHead("Cloze", "Fluid intelligence & abdominal fat", "10 points")}
            ${cloze.passage.map((p, i) => paraHTML(p, i + 1, "cloze")).join("")}
          </article>
        </div>
        <aside class="reading-aside">
          <div>
            <p class="aside-kicker">完形主线</p>
            <p>流体智力随年龄下降 → 脂肪/肌肉与认知有关 → 男女机制不同 → 生活方式可以干预。</p>
            <p>先通读，暂时不要看选项。空白处先猜“词性 + 方向”，再比对搭配。</p>
          </div>
          <div class="aside-nav">
            <a href="#q-cloze-1"><span>第 1–5 空</span><span>01</span></a>
            <a href="#q-cloze-6"><span>第 6–10 空</span><span>02</span></a>
            <a href="#q-cloze-11"><span>第 11–15 空</span><span>03</span></a>
            <a href="#q-cloze-16"><span>第 16–20 空</span><span>04</span></a>
          </div>
        </aside>
      </div>
      <div class="question-area">
        ${questionHead("20 个空，逐题核对", "先写理由，再看解析")}
        <div class="q-grid">${cloze.questions.map((q) => qCard(q, "cloze", "ABCD")).join("")}</div>
      </div>
    </section>`;
  }

  /* ---------- render: reading ---------- */

  function renderReading(text) {
    const id = text.id;
    const start = text.questions[0].n;
    const end = text.questions[text.questions.length - 1].n;
    return `<section class="chapter" id="${id}" data-section="${id}">
      ${headHTML(id, pad(reading.indexOf(text) + 2), "Section II · Part A", text.title, `${text.cn_title} · ${text.score} 分 · ${text.suggest}`)}
      ${reading.indexOf(text) === 0 ? `<p class="section-directions"><b>Directions:</b> ${esc(meta.parta_directions)}</p>` : ""}
      <p class="section-lede">${esc(text.intro)}</p>
      <div class="reading-layout">
        <div>
          ${toolsHTML(id)}
          <article class="paper" data-paper="${id}" data-size="md">
            ${paperHead(text.title, text.en_title, "10 points")}
            ${text.paragraphs.map((p, i) => paraHTML(p, i + 1, id)).join("")}
          </article>
        </div>
        <aside class="reading-aside">
          <div>
            <p class="aside-kicker">先把这一段读成一句话</p>
            <p>${esc(text.intro)}</p>
            <p>先读题干，圈出不可替换词；回原文找证据句；最后用“主体—范围—方向”排除。</p>
          </div>
          <div class="aside-nav">
            ${text.questions.map((q) => `<a href="#q-${id}-${q.n}"><span>Q${q.n} · ${esc(q.type || "")}</span><span>${pad(q.n)}</span></a>`).join("")}
            <a href="#q-${id}-${start}"><span>从第 ${start} 题开始</span><span>→</span></a>
          </div>
        </aside>
      </div>
      <div class="question-area">
        ${questionHead(`第 ${start}–${end} 题`, "答案 + 证据句 + 干扰项")}
        <div class="q-grid">${text.questions.map((q) => qCard(q, id, "ABCD")).join("")}</div>
      </div>
    </section>`;
  }

  /* ---------- render: part B ---------- */

  function renderPartB() {
    const letters = "ABCDEFG";
    const options = Object.keys(partb.options);
    let pno = 0;
    return `<section class="chapter" id="partb" data-section="partb">
      ${headHTML("partb", "06", "Section II · Part B", "新题型 · 7 选 5", `${partb.cn_title} · ${partb.score} 分 · ${partb.suggest}`)}
      <p class="section-lede">${esc(partb.intro)}</p>
      <div class="paper">
        ${paperHead("Part B", partb.en_title, "10 points")}
        ${partb.blocks.map((b, i) => {
          if (b.type === "heading") {
            return `<h3 style="font-family:var(--serif-cn);font-size:19px;margin:24px 0 8px;padding-left:44px;color:var(--red)">${esc(b.en)} <span style="font-family:var(--sans);font-size:11px;color:var(--muted);font-weight:400">${esc(b.zh)}</span></h3>`;
          }
          pno += 1;
          return `<div class="para" data-para="partb-${i}">
            <span class="para-no">${pad(pno)}</span>
            <p class="en">${richText(b.en)}</p>
            <button type="button" class="para-toggle" data-para-toggle>译文</button>
            <p class="zh" hidden>${esc(b.zh)}</p>
          </div>`;
        }).join("")}
      </div>

      <div class="option-pool">
        ${options.map((k) => {
          const o = partb.options[k];
          return `<div class="pool-item" id="pool-${k}">
            <span class="letter">[${k}]</span>
            <div><p class="pool-en">${esc(o.en)}</p><p class="pool-zh">${esc(o.zh)}</p></div>
          </div>`;
        }).join("")}
      </div>

      <details class="answer-key">
        <summary>衔接逻辑速查（做完再看）</summary>
        <p>41 → G：hiring → résumés → candidates　|　42 → C：marketing → channels → yield best results</p>
        <p>43 → E：insurance → premiums → charge too much / too little　|　44 → B：accuracy → faster and more accurate</p>
        <p>45 → D：predict → needs attention now　|　多余：A（与“不替代员工”相反）、F（语义过泛）</p>
      </details>

      <div class="question-area">
        ${questionHead("第 41–45 题", "先选，再看每个空的“接口证据”")}
        <div class="q-grid">
          ${partb.answers.map((a) => {
            const q = {
              n: a.n,
              answer: a.answer,
              type: "段落衔接",
              stem: `第 ${a.n} 空最合适的一句是：`,
              options: options.map((k) => `[${k}] ${partb.options[k].en}`),
              explain: a.explain,
              evidence: `衔接线索：${a.clue}`,
            };
            return qCard(q, "partb", letters, true);
          }).join("")}
        </div>
      </div>
    </section>`;
  }

  /* ---------- render: part C ---------- */

  function renderPartC() {
    return `<section class="chapter" id="partc" data-section="partc">
      ${headHTML("partc", "07", "Section II · Part C", "翻译", `${partc.cn_title} · ${partc.score} 分 · ${partc.suggest}`)}
      <p class="section-lede">${esc(partc.intro)}</p>
      <div class="paper">
        ${paperHead("Part C", partc.en_title, "10 points")}
        ${partc.paragraphs.map((p, i) => paraHTML(p, i + 1, "partc")).join("")}
      </div>

      <div class="segment-grid">
        ${Object.keys(partc.segments).map((n) => {
          const s = partc.segments[n];
          return `<article class="seg-card" id="seg-${n}" data-seg-card="${n}">
            <div class="seg-head" data-seg-toggle role="button" tabindex="0" aria-label="展开第 ${n} 句解析">
              <span class="seg-no">${n}</span>
              <span style="color:var(--muted);font-size:11px">点击展开：主干 / 结构 / 关键词 / 参考译文</span>
            </div>
            <p class="seg-en">${esc(s.en)}</p>
            <div class="seg-body">
              <p><b>主干</b>　${esc(s.core)}</p>
              <p><b>结构</b>　${esc(s.structure)}</p>
              <p><b>关键词</b>　${esc(s.key)}</p>
              <p><b>参考译文</b></p>
              <div class="seg-quote">${esc(s.translation)}</div>
              <p><b>易错点</b>　${esc(s.pitfall)}</p>
            </div>
          </article>`;
        }).join("")}
      </div>
      <div class="answer-key">
        <h3>翻译总原则</h3>
        <p>先拆句子，再译主干，最后把定语、状语放到中文合适的位置。遇到抽象名词，补出动词；遇到被动，考虑转成主动或无主句。</p>
      </div>
    </section>`;
  }

  /* ---------- render: writing ---------- */

  function pictureSVG() {
    return `<svg viewBox="0 0 720 440" role="img" aria-label="父亲与穿戏服的孩子对话：孩子说同学觉得学唱戏不好玩，父亲说你自己喜欢就够了">
      <g fill="none" stroke="#26312d" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="52" y1="382" x2="666" y2="382" stroke-width="1.6"/>
        <path d="M90 382 C 190 376, 310 386, 420 380 S 600 378, 650 382" stroke-width="1" opacity=".5"/>
        <!-- child -->
        <g transform="translate(0,4)">
          <path d="M214 372 L222 320 M252 372 L244 320" />
          <path d="M226 372 L220 386 M250 372 L257 386" />
          <path d="M207 322 Q 195 282 218 250 Q 242 232 268 252 Q 286 282 270 322 Z" fill="#b23a2f" fill-opacity=".16"/>
          <path d="M218 252 Q 238 268 260 252" />
          <path d="M214 270 Q 196 292 205 310 M264 268 Q 284 288 274 306" />
          <path d="M274 306 L300 296" stroke-width="4"/>
          <path d="M300 296 L338 264" />
          <path d="M338 264 L344 254" stroke-width="4"/>
          <circle cx="241" cy="213" r="26" fill="#f3ecda"/>
          <path d="M218 208 Q 222 192 241 190 Q 260 192 264 208" />
          <path d="M218 204 Q 206 190 214 178 L226 188 M264 204 Q 276 190 268 178 L256 188" />
          <path d="M222 188 Q 241 174 260 188" />
          <path d="M230 178 L228 166 M241 174 L241 160 M252 178 L255 166" />
          <circle cx="232" cy="212" r="1.8" fill="#26312d"/>
          <circle cx="250" cy="212" r="1.8" fill="#26312d"/>
          <path d="M235 222 Q 241 226 247 222" />
          <path d="M222 244 Q 241 252 260 244" stroke="#e4c568" stroke-width="3"/>
        </g>
        <!-- father -->
        <g transform="translate(0,4)">
          <path d="M508 374 L512 290 M548 374 L544 290" />
          <path d="M500 292 Q 494 246 518 224 Q 548 210 568 232 Q 584 258 574 294 Z" fill="#315d72" fill-opacity=".14"/>
          <path d="M516 230 L528 218 L540 230" />
          <path d="M510 246 Q 486 264 486 288 M568 246 Q 596 262 590 286" />
          <path d="M486 288 L466 300 M590 286 L612 296" />
          <circle cx="536" cy="186" r="27" fill="#f3ecda"/>
          <path d="M510 184 Q 512 160 536 158 Q 560 160 562 184" />
          <path d="M512 164 Q 526 150 550 158" />
          <path d="M524 186 Q 528 184 531 186 M542 186 Q 546 184 549 186" />
          <path d="M530 198 Q 537 202 543 198" />
          <path d="M514 218 Q 536 228 558 218" />
          <path d="M596 298 L614 282 L620 288 L602 304 Z" fill="#e4c568" fill-opacity=".5"/>
          <path d="M614 282 L628 270" />
        </g>
        <!-- speech bubbles -->
        <g stroke-width="1.6">
          <path d="M72 62 Q 60 62 60 78 L60 128 Q 60 142 76 142 L192 142 L214 160 L208 142 L286 142 Q 300 142 300 128 L300 78 Q 300 62 284 62 Z" fill="#faf4e5"/>
          <path d="M434 28 Q 420 28 420 44 L420 92 Q 420 106 436 106 L532 106 L554 124 L548 106 L634 106 Q 650 106 650 92 L650 44 Q 650 28 634 28 Z" fill="#faf4e5"/>
        </g>
        <g fill="#26312d" stroke="none" font-family="'Kaiti SC','STKaiti','KaiTi',serif">
          <text x="80" y="88" font-size="16">爸爸，好多同学觉得</text>
          <text x="80" y="116" font-size="16">学唱戏不好玩。</text>
          <text x="438" y="58" font-size="15">你自己不是喜欢吗？</text>
          <text x="438" y="84" font-size="15">那就够了。</text>
        </g>
        <g fill="#ae382d" stroke="none" font-family="'SF Mono',Menlo,monospace" font-size="9">
          <text x="76" y="174" letter-spacing="1">CHILD · 2021</text>
          <text x="438" y="138" letter-spacing="1">FATHER · 2021</text>
        </g>
      </g>
    </svg>`;
  }

  function noteLine(items) {
    return items.map((x) => esc(String(x).replace(/[。；;]+$/, ""))).join("；") + "。";
  }

  function writingLists(part) {
    return `<div class="writing-lists">
      <div class="writing-list"><h4>结构骨架</h4><ol>${part.structure.map(([a, b]) => `<li><b>${esc(a)}</b>：${esc(b)}</li>`).join("")}</ol></div>
      <div class="writing-list"><h4>可替换表达</h4><ul>${part.expressions.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    </div>`;
  }

  function renderWriting() {
    const a = writing.partA;
    const b = writing.partB;
    return `<section class="chapter" id="writing" data-section="writing">
      ${headHTML("writing", "08", "Section III", "写作", `${writing.topic} · ${writing.score} 分 · ${writing.suggest}`)}
      <p class="section-lede">${esc(writing.intro)}</p>

      <div class="writing-part">
        <div class="writing-part-head"><h3>${esc(a.title)}</h3><span>51 · ${esc(a.score)} 分 · ${esc(a.words)}</span></div>
        <div class="writing-grid">
          <div>
            <div class="prompt-box">${esc(a.prompt)}<div class="prompt-zh">${esc(a.prompt_zh)}</div></div>
            <div class="writing-note"><b>任务拆解：</b>称呼 → 说明来意 → 2–3 条具体建议（每条带理由）→ 表示愿意帮忙 → 落款 Li Ming。不要写地址。</div>
            ${writingLists(a)}
          </div>
          <div class="sample-box">
            <h4>参考范文 · 约 110 词</h4>
            <div class="sample-text">${esc(a.sample)}</div>
            <button class="tool-btn" data-sample-zh type="button" style="margin-top:12px">显示译文</button>
            <div class="sample-zh" hidden>${esc(a.sample_zh)}</div>
            <div class="writing-note"><b>注意：</b>${noteLine(a.traps)}</div>
          </div>
        </div>
      </div>

      <div class="writing-part">
        <div class="writing-part-head"><h3>${esc(b.title)}</h3><span>52 · ${esc(b.score)} 分 · ${esc(b.words)}</span></div>
        <div class="writing-grid">
          <div>
            <div class="prompt-box">${esc(b.prompt)}<div class="prompt-zh">${esc(b.prompt_zh)}</div></div>
            <div class="picture-frame">
              ${pictureSVG()}
              <div class="picture-caption"><span>${esc(b.picture.caption)}</span><span>原图为漫画，此处为学习用重绘</span></div>
            </div>
            <div class="writing-note"><b>图意：</b>${esc(b.picture.note)}</div>
            ${writingLists(b)}
          </div>
          <div class="sample-box">
            <h4>参考范文 · 约 175 词</h4>
            <div class="sample-text">${esc(b.sample)}</div>
            <button class="tool-btn" data-sample-zh type="button" style="margin-top:12px">显示译文</button>
            <div class="sample-zh" hidden>${esc(b.sample_zh)}</div>
            <div class="writing-note"><b>注意：</b>${noteLine(b.traps)}</div>
          </div>
        </div>
      </div>
    </section>`;
  }

  /* ---------- render: sentences ---------- */

  const secOrder = ["cloze", "text1", "text2", "text3", "text4", "partb", "partc"];
  const secNames = {
    cloze: "完形", text1: "Text 1", text2: "Text 2", text3: "Text 3",
    text4: "Text 4", partb: "新题型", partc: "翻译",
  };
  const sentenceFilters = { sec: "all", q: "", unmastered: false };

  function renderSentenceFilters() {
    const counts = {};
    sentences.forEach((s) => { counts[s.sec] = (counts[s.sec] || 0) + 1; });
    const chips = [`<button class="chip ${sentenceFilters.sec === "all" ? "active" : ""}" data-sfilter="all">全部 ${sentences.length}</button>`]
      .concat(secOrder.map((k) => `<button class="chip ${sentenceFilters.sec === k ? "active" : ""}" data-sfilter="${k}">${secNames[k] || k} ${counts[k] || 0}</button>`));
    $("#sentenceSecFilters").innerHTML = chips.join("");
  }

  function filteredSentences() {
    return sentences.filter((s) => {
      if (sentenceFilters.sec !== "all" && s.sec !== sentenceFilters.sec) return false;
      if (sentenceFilters.unmastered && state.sentences.has(s.id)) return false;
      if (sentenceFilters.q) {
        const q = sentenceFilters.q.toLowerCase();
        const hay = `${s.en} ${s.zh} ${s.key} ${s.structure} ${s.sec_label}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function renderSentences() {
    renderSentenceFilters();
    const list = filteredSentences();
    $("#sentenceCount").textContent = `当前显示 ${list.length} / ${sentences.length} 句`;
    if (!list.length) {
      $("#sentenceList").innerHTML = `<div class="answer-key"><p>没有匹配的句子。换个关键词，或取消筛选。</p></div>`;
      return;
    }
    $("#sentenceList").innerHTML = list.map((s) => {
      const done = state.sentences.has(s.id);
      const level = [1, 2, 3].map((n) => `<i class="${n <= s.level ? "on" : ""}"></i>`).join("");
      return `<article class="s-card ${done ? "mastered" : ""}" id="sent-${s.id}" data-sid="${s.id}">
        <div class="s-head" data-stoggle role="button" tabindex="0" aria-label="展开 ${s.id} 解析">
          <span class="s-id">${s.id}</span>
          <span class="s-sec">${esc(s.sec_label)}</span>
          <span class="s-level" title="难度">${level}</span>
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
            <button type="button" class="speak-btn" data-speak="${escAttr(s.en)}" aria-label="朗读这句">▶</button>
            <button type="button" class="master-btn ${done ? "on" : ""}" data-master-sentence="${s.id}">${done ? "已掌握" : "标记已掌握"}</button>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  /* ---------- render: vocabulary ---------- */

  const vocabFilters = { sec: "all", q: "", unmastered: false };

  function renderVocabFilters() {
    const counts = {};
    vocab.forEach((v) => { counts[v.sec] = (counts[v.sec] || 0) + 1; });
    const keys = ["cloze", "text1", "text2", "text3", "text4", "partb", "partc"];
    const chips = [`<button class="chip ${vocabFilters.sec === "all" ? "active" : ""}" data-vfilter="all">全部 ${vocab.length}</button>`]
      .concat(keys.map((k) => `<button class="chip ${vocabFilters.sec === k ? "active" : ""}" data-vfilter="${k}">${secNames[k] || k} ${counts[k] || 0}</button>`));
    $("#vocabSecFilters").innerHTML = chips.join("");
  }

  function filteredVocab() {
    return vocab.filter((v) => {
      if (vocabFilters.sec !== "all" && v.sec !== vocabFilters.sec) return false;
      if (vocabFilters.unmastered && state.words.has(String(v._id))) return false;
      if (vocabFilters.q) {
        const q = vocabFilters.q.toLowerCase();
        const hay = `${v.w} ${v.cn} ${v.ctx} ${v.note}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function renderVocab() {
    renderVocabFilters();
    const list = filteredVocab();
    $("#vocabCount").textContent = `当前显示 ${list.length} / ${vocab.length} 词 · 点击词条看完整笔记`;
    if (!list.length) {
      $("#vocabList").innerHTML = `<div class="answer-key"><p>没有匹配的词。换个关键词，或取消筛选。</p></div>`;
      return;
    }
    $("#vocabList").innerHTML = list.map((v) => {
      const id = String(v._id);
      const mastered = state.words.has(id);
      return `<div class="v-row ${mastered ? "mastered" : ""}" data-vid="${id}" data-vsec="${v.sec}">
        <button type="button" class="v-star ${mastered ? "on" : ""}" data-master-word="${id}" aria-label="标记 ${escAttr(v.w)} 已掌握">${mastered ? "★" : "☆"}</button>
        <div>
          <div class="v-word"><strong>${esc(v.w)}</strong><span class="v-pos">${esc(v.pos)}</span></div>
          <div class="v-tools"><button type="button" class="speak-btn" data-speak="${escAttr(v.w)}" aria-label="朗读 ${escAttr(v.w)}">▶</button></div>
        </div>
        <div class="v-cn">${esc(v.cn)}<div class="v-ctx">“${esc(v.ctx)}”</div></div>
        <div class="v-note">${esc(v.note)}</div>
      </div>`;
    }).join("");
  }

  /* ---------- render: skills ---------- */

  function skillTable(table) {
    return `<div class="skill-table-wrap"><table class="skill-table">
      <thead><tr>${table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>`;
  }

  function renderSkills() {
    $("#skillList").innerHTML = skills.map((ch, i) => {
      const body = ch.sections.map((sec) => {
        let html = `<div class="skill-section"><h4>${esc(sec.h)}</h4>`;
        if (sec.p) html += sec.p.map((p) => `<p>${esc(p)}</p>`).join("");
        if (sec.p2) html += sec.p2.map((p) => `<p>${esc(p)}</p>`).join("");
        if (sec.bullets) html += `<ul>${sec.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`;
        if (sec.table) html += skillTable(sec.table);
        if (sec.example) {
          const ex = sec.example;
          html += `<div class="skill-example">
            <p class="ex-en">${esc(ex.en)}</p>
            <p class="ex-zh">${esc(ex.zh)}</p>
            <p class="ex-note">${esc(ex.note)}</p>
          </div>`;
        }
        return html + "</div>";
      }).join("");
      return `<details class="skill-chapter" id="skill-${ch.id}" ${i === 0 ? "open" : ""}>
        <summary>
          <span class="skill-num">${ch.num}</span>
          <span><span class="skill-title">${esc(ch.title)}</span><span class="skill-lede">${esc(ch.lede)}</span></span>
          <span class="skill-mark" aria-hidden="true"></span>
        </summary>
        <div class="skill-body">${body}</div>
      </details>`;
    }).join("");
  }

  function renderQuiz() {
    $("#quizList").innerHTML = quiz.map((q, i) => {
      const chosen = state.quiz[i];
      const opts = q.options.map((o, j) => {
        let cls = "";
        if (chosen != null) {
          if (j === q.answer) cls = "correct";
          else if (j === chosen) cls = "wrong";
        }
        return `<button type="button" class="quiz-opt ${cls}" data-quiz="${i}" data-opt="${j}" ${chosen != null ? "disabled" : ""}>${String.fromCharCode(65 + j)}. ${esc(o)}</button>`;
      }).join("");
      const exp = chosen != null ? `<p class="quiz-exp">${chosen === q.answer ? "✓ 正确。" : "✗ 再想想。"} ${esc(q.explain)}</p>` : "";
      return `<div class="quiz-item"><p class="quiz-q">${i + 1}. ${esc(q.q)}</p><div class="quiz-options">${opts}</div>${exp}</div>`;
    }).join("");
    const answered = Object.keys(state.quiz).length;
    const correct = Object.keys(state.quiz).filter((k) => Number(state.quiz[k]) === quiz[Number(k)].answer).length;
    $("#quizScore").textContent = answered ? `已答 ${answered}/${quiz.length} 题，答对 ${correct} 题。` : "选一个答案，立即看解析。";
  }

  /* ---------- render: plan ---------- */

  function renderPlan() {
    $("#planGrid").innerHTML = plan.map((d, i) => {
      const wide = i === plan.length - 1 ? "wide" : "";
      const tasks = d.tasks.map((t, j) => {
        const key = `d${d.day}-${j}`;
        const done = state.plan.has(key);
        return `<li><label><input type="checkbox" data-plan-item="${key}" ${done ? "checked" : ""}><span>${esc(t)}</span></label></li>`;
      }).join("");
      return `<article class="plan-day ${wide}">
        <div class="plan-day-head"><span class="plan-day-no">${pad(d.day)}</span><span class="plan-time">${esc(d.time)}</span></div>
        <h3 class="plan-theme">${esc(d.theme)}</h3>
        <ul class="plan-tasks">${tasks}</ul>
      </article>`;
    }).join("");
  }

  /* ---------- progress ---------- */

  function updateProgress() {
    const examIds = meta.sections.map((s) => s.id);
    const examDone = examIds.filter((id) => state.sections.has(id)).length;
    const sentDone = state.sentences.size;
    const wordDone = state.words.size;
    const total = examIds.length + sentences.length + vocab.length;
    const done = examDone + sentDone + wordDone;
    const pct = total ? Math.round((done / total) * 100) : 0;
    $("#statSections").textContent = `${examDone}/${examIds.length}`;
    $("#statSentences").textContent = `${sentDone}/${sentences.length}`;
    $("#statWords").textContent = `${wordDone}/${vocab.length}`;
    $("#overallPct").textContent = `${pct}%`;
    $("#overallBar").style.width = `${pct}%`;
    $$("[data-mark-section]").forEach((btn) => {
      const id = btn.dataset.markSection;
      const isDone = state.sections.has(id);
      btn.classList.toggle("done", isDone);
      if (btn.textContent.includes("完成")) btn.textContent = isDone ? "已完成" : "标记完成";
    });
  }

  /* ---------- modal / flashcard ---------- */

  const modal = $("#modal");
  const modalBody = $("#modalBody");
  let flash = { list: [], index: 0, revealed: false };

  function openModal(html) {
    modalBody.innerHTML = html;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const close = $("#modalClose");
    if (close) close.focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    modalBody.innerHTML = "";
  }

  function openVocab(v) {
    const mastered = state.words.has(String(v._id));
    openModal(`<div class="vocab-pop">
      <p class="flash-kicker">WORD NOTE · ${esc(v.sec_label)}</p>
      <h3>${esc(v.w)}</h3>
      <span class="pop-pos">${esc(v.pos)}</span>
      <p class="pop-cn">${esc(v.cn)}</p>
      <div class="pop-ctx">“${esc(v.ctx)}”</div>
      <p class="pop-note">${esc(v.note)}</p>
      <div class="pop-actions">
        <button class="tool-btn" type="button" data-speak="${escAttr(v.w)}">朗读</button>
        <button class="tool-btn" type="button" data-master-word="${v._id}">${mastered ? "取消已掌握" : "标记已掌握"}</button>
      </div>
    </div>`);
  }

  function flashMarkup() {
    const v = flash.list[flash.index];
    if (!v) return `<p class="flash-kicker">FLASHCARD</p><h3 class="flash-word">没有卡片</h3><p>当前筛选下没有可复习的词。</p>`;
    return `<p class="flash-kicker">FLASHCARD · ${flash.index + 1}/${flash.list.length}</p>
      <h3 class="flash-word">${esc(v.w)}</h3>
      <span class="flash-pos">${esc(v.pos)}</span>
      <p class="flash-ctx">“${esc(v.ctx)}”</p>
      <div class="flash-answer" ${flash.revealed ? "" : "hidden"}>
        <p class="flash-cn">${esc(v.cn)}</p>
        <p class="flash-note">${esc(v.note)}</p>
      </div>
      <div class="flash-actions">
        <button class="tool-btn" type="button" id="flashReveal">${flash.revealed ? "隐藏释义" : "显示释义"}</button>
        <button class="tool-btn" type="button" data-speak="${escAttr(v.w)}">朗读</button>
        <button class="tool-btn" type="button" id="flashKnow">认识，下一张</button>
        <button class="tool-btn" type="button" id="flashNext">再复习</button>
        <span class="flash-meta">空格：翻面 · →：下一张 · Esc：退出</span>
      </div>`;
  }

  function renderFlash() {
    modalBody.innerHTML = flashMarkup();
  }

  function openFlash() {
    let list = filteredVocab();
    if (!list.length) list = vocab.slice();
    flash = { list: shuffle(list), index: 0, revealed: false };
    if (!flash.list.length) return;
    openModal(flashMarkup());
    bindFlash();
  }

  function bindFlash() {
    const reveal = $("#flashReveal");
    const know = $("#flashKnow");
    const next = $("#flashNext");
    if (reveal) reveal.addEventListener("click", () => { flash.revealed = !flash.revealed; renderFlash(); bindFlash(); });
    if (know) know.addEventListener("click", () => {
      const v = flash.list[flash.index];
      if (v) { state.words.add(String(v._id)); saveState(); updateProgress(); updateVocabDom(v._id); }
      nextFlash();
    });
    if (next) next.addEventListener("click", nextFlash);
  }

  function nextFlash() {
    if (!flash.list.length) return;
    flash.index = (flash.index + 1) % flash.list.length;
    flash.revealed = false;
    renderFlash();
    bindFlash();
  }

  function updateVocabDom(id) {
    const row = $(`.v-row[data-vid="${id}"]`);
    if (!row) return;
    const mastered = state.words.has(String(id));
    row.classList.toggle("mastered", mastered);
    const star = $(".v-star", row);
    if (star) {
      star.classList.toggle("on", mastered);
      star.textContent = mastered ? "★" : "☆";
    }
  }

  /* ---------- TTS ---------- */

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  /* ---------- tooltip ---------- */

  const tip = $("#tip");
  let tipTimer = null;

  function showTip(el) {
    const v = vocabById.get(el.dataset.vid);
    if (!v) return;
    tip.innerHTML = `<strong>${esc(v.w)}</strong> <em>${esc(v.pos)}</em><br>${esc(v.cn)}<br><em>${esc(v.ctx)}</em>`;
    tip.hidden = false;
    const r = el.getBoundingClientRect();
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    let left = r.left + r.width / 2 - tw / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
    let top = r.top - th - 8;
    if (top < 8) top = r.bottom + 8;
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
  }
  function hideTip() { tip.hidden = true; }

  /* ---------- event wiring ---------- */

  function applyNight() {
    document.body.classList.toggle("night", state.night);
    $("#nightBtn").textContent = state.night ? "日间模式" : "夜读模式";
    $("#mobileNight").textContent = state.night ? "日间" : "夜读";
    document.documentElement.style.colorScheme = state.night ? "dark" : "light";
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    $("#menuBtn").setAttribute("aria-expanded", "false");
  }

  function bindGlobal() {
    $("#menuBtn").addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      $("#menuBtn").setAttribute("aria-expanded", open ? "true" : "false");
    });
    $("#railScrim").addEventListener("click", closeNav);
    $("#railNav").addEventListener("click", (e) => { if (e.target.closest("a")) closeNav(); });
    $("#nightBtn").addEventListener("click", () => { state.night = !state.night; saveState(); applyNight(); });
    $("#mobileNight").addEventListener("click", () => { state.night = !state.night; saveState(); applyNight(); });
    $("#printBtn").addEventListener("click", () => window.print());
    $("#resetBtn").addEventListener("click", () => {
      if (confirm("清除全部学习记录（答题、已掌握、计划勾选）？此操作不可撤销。")) {
        localStorage.removeItem(LS_KEY);
        location.reload();
      }
    });
    $("#modalClose").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (!modal.hidden) closeModal();
        closeNav();
      }
      if (!modal.hidden && flash.list.length) {
        if (e.code === "Space") { e.preventDefault(); flash.revealed = !flash.revealed; renderFlash(); bindFlash(); }
        if (e.key === "ArrowRight") { e.preventDefault(); nextFlash(); }
      }
      if (modal.hidden && (e.key === "Enter" || e.key === " ")) {
        const vh = e.target.closest(".vh");
        if (vh) { e.preventDefault(); vh.click(); return; }
        const sHead = e.target.closest("[data-stoggle]");
        if (sHead) { e.preventDefault(); sHead.click(); return; }
        const segHead = e.target.closest("[data-seg-toggle]");
        if (segHead) { e.preventDefault(); segHead.click(); }
      }
    });

    document.addEventListener("click", (e) => {
      const opt = e.target.closest(".opt");
      if (opt) {
        const card = opt.closest(".q-card");
        if (!card || card.classList.contains("answered")) return;
        const letter = opt.dataset.letter;
        const qid = card.dataset.qid;
        state.answers[qid] = letter;
        saveState();
        card.classList.add("answered");
        card.querySelectorAll(".opt").forEach((b) => {
          b.disabled = true;
          if (b.dataset.letter === card.dataset.answer) b.classList.add("correct");
          else if (b.dataset.letter === letter) b.classList.add("wrong");
        });
        const fb = card.querySelector(".q-feedback");
        if (fb) fb.hidden = false;
        const rev = card.querySelector("[data-reveal]");
        if (rev) rev.textContent = "收起解析";
        updateBlankFor(qid, letter);
        return;
      }

      const reveal = e.target.closest("[data-reveal]");
      if (reveal) {
        const card = reveal.closest(".q-card");
        const fb = card && card.querySelector(".q-feedback");
        if (fb) {
          fb.hidden = !fb.hidden;
          reveal.textContent = fb.hidden ? "看解析" : "收起解析";
        }
        return;
      }

      const reset = e.target.closest("[data-reset]");
      if (reset) {
        const card = reset.closest(".q-card");
        if (!card) return;
        const qid = card.dataset.qid;
        delete state.answers[qid];
        saveState();
        card.classList.remove("answered");
        card.querySelectorAll(".opt").forEach((b) => {
          b.disabled = false;
          b.classList.remove("correct", "wrong");
        });
        const fb = card.querySelector(".q-feedback");
        if (fb) fb.hidden = true;
        const rev = card.querySelector("[data-reveal]");
        if (rev) rev.textContent = "看解析";
        clearBlankFor(qid);
        return;
      }

      const blank = e.target.closest(".blank");
      if (blank) {
        const n = blank.dataset.blank;
        const card = document.getElementById(`q-cloze-${n}`);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          card.classList.remove("flash");
          void card.offsetWidth;
          card.classList.add("flash");
        }
        return;
      }

      const paraToggle = e.target.closest("[data-para-toggle]");
      if (paraToggle) {
        const p = paraToggle.closest(".para");
        const zh = p && p.querySelector(".zh");
        if (zh) {
          zh.hidden = !zh.hidden;
          paraToggle.textContent = zh.hidden ? "译文" : "收起译文";
        }
        return;
      }

      const zhAll = e.target.closest("[data-zh-all]");
      if (zhAll) {
        const section = zhAll.closest("section");
        const all = $$(".zh", section);
        const anyHidden = all.some((z) => z.hidden);
        all.forEach((z) => { z.hidden = !anyHidden; });
        $$("[data-para-toggle]", section).forEach((b) => { b.textContent = anyHidden ? "收起译文" : "译文"; });
        zhAll.textContent = anyHidden ? "隐藏全部译文" : "显示全部译文";
        return;
      }

      const hl = e.target.closest("[data-hl-toggle]");
      if (hl) {
        const paper = hl.closest("section").querySelector("[data-paper]");
        if (paper) {
          const hidden = paper.classList.toggle("hide-vocab");
          hl.textContent = hidden ? "重点词高亮：关" : "重点词高亮：开";
        }
        return;
      }

      const sizeBtn = e.target.closest("[data-size-btn]");
      if (sizeBtn) {
        const paper = sizeBtn.closest("section").querySelector("[data-paper]");
        if (paper) paper.dataset.size = sizeBtn.dataset.sizeBtn;
        return;
      }

      const mark = e.target.closest("[data-mark-section]");
      if (mark) {
        const id = mark.dataset.markSection;
        if (state.sections.has(id)) state.sections.delete(id);
        else state.sections.add(id);
        saveState();
        updateProgress();
        return;
      }

      const masterS = e.target.closest("[data-master-sentence]");
      if (masterS) {
        const id = masterS.dataset.masterSentence;
        if (state.sentences.has(id)) state.sentences.delete(id);
        else state.sentences.add(id);
        saveState();
        masterS.classList.toggle("on", state.sentences.has(id));
        masterS.textContent = state.sentences.has(id) ? "已掌握" : "标记已掌握";
        updateProgress();
        return;
      }

      const masterW = e.target.closest("[data-master-word]");
      if (masterW) {
        const id = String(masterW.dataset.masterWord);
        if (state.words.has(id)) state.words.delete(id);
        else state.words.add(id);
        saveState();
        updateVocabDom(id);
        updateProgress();
        if (!modal.hidden) {
          const v = vocabById.get(id);
          if (v) openVocab(v);
        }
        return;
      }

      const sToggle = e.target.closest("[data-stoggle]");
      if (sToggle) {
        const card = sToggle.closest(".s-card");
        if (card) {
          card.classList.toggle("open");
          const btn = $(".s-toggle", card);
          if (btn) btn.textContent = card.classList.contains("open") ? "收起" : "展开";
        }
        return;
      }

      const segToggle = e.target.closest("[data-seg-toggle]");
      if (segToggle) {
        const card = segToggle.closest(".seg-card");
        if (card) card.classList.toggle("open");
        return;
      }

      const vh = e.target.closest(".vh");
      if (vh) {
        const v = vocabById.get(vh.dataset.vid);
        if (v) openVocab(v);
        return;
      }

      const underline = e.target.closest(".underlined");
      if (underline) {
        const card = document.getElementById(`seg-${underline.dataset.seg}`);
        if (card) {
          card.classList.add("open");
          card.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      const sampleZh = e.target.closest("[data-sample-zh]");
      if (sampleZh) {
        const box = sampleZh.closest(".sample-box");
        const zh = box && box.querySelector(".sample-zh");
        if (zh) {
          zh.hidden = !zh.hidden;
          sampleZh.textContent = zh.hidden ? "显示译文" : "隐藏译文";
        }
        return;
      }

      const quizOpt = e.target.closest("[data-quiz]");
      if (quizOpt) {
        const qi = Number(quizOpt.dataset.quiz);
        const oi = Number(quizOpt.dataset.opt);
        if (state.quiz[qi] != null) return;
        state.quiz[qi] = oi;
        saveState();
        renderQuiz();
        return;
      }

      const speakEl = e.target.closest("[data-speak]");
      if (speakEl) { speak(speakEl.dataset.speak); return; }
    });

    document.addEventListener("mouseover", (e) => {
      const vh = e.target.closest(".vh");
      if (vh) { clearTimeout(tipTimer); showTip(vh); }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(".vh")) { tipTimer = setTimeout(hideTip, 80); }
    });
    document.addEventListener("focusin", (e) => {
      const vh = e.target.closest(".vh");
      if (vh) showTip(vh);
    });
    document.addEventListener("focusout", (e) => {
      if (e.target.closest(".vh")) hideTip();
    });
    window.addEventListener("scroll", hideTip, { passive: true });

    $("#sentenceSearch").addEventListener("input", (e) => {
      sentenceFilters.q = e.target.value.trim();
      renderSentences();
    });
    $("#sentenceUnmastered").addEventListener("change", (e) => {
      sentenceFilters.unmastered = e.target.checked;
      renderSentences();
    });
    $("#sentenceSecFilters").addEventListener("click", (e) => {
      const chip = e.target.closest("[data-sfilter]");
      if (!chip) return;
      sentenceFilters.sec = chip.dataset.sfilter;
      renderSentences();
    });
    $("#randomSentence").addEventListener("click", () => {
      const list = filteredSentences();
      if (!list.length) return;
      const pick = list[Math.floor(Math.random() * list.length)];
      const el = document.getElementById(`sent-${pick.id}`);
      if (el) {
        el.classList.add("open");
        const btn = $(".s-toggle", el);
        if (btn) btn.textContent = "收起";
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    $("#vocabSearch").addEventListener("input", (e) => {
      vocabFilters.q = e.target.value.trim();
      renderVocab();
    });
    $("#vocabUnmastered").addEventListener("change", (e) => {
      vocabFilters.unmastered = e.target.checked;
      renderVocab();
    });
    $("#vocabSecFilters").addEventListener("click", (e) => {
      const chip = e.target.closest("[data-vfilter]");
      if (!chip) return;
      vocabFilters.sec = chip.dataset.vfilter;
      renderVocab();
    });
    $("#flashcardBtn").addEventListener("click", openFlash);

    $("#expandSkills").addEventListener("click", () => $$(".skill-chapter").forEach((d) => { d.open = true; }));
    $("#collapseSkills").addEventListener("click", () => $$(".skill-chapter").forEach((d) => { d.open = false; }));

    $("#planGrid").addEventListener("change", (e) => {
      const cb = e.target.closest("[data-plan-item]");
      if (!cb) return;
      if (cb.checked) state.plan.add(cb.dataset.planItem);
      else state.plan.delete(cb.dataset.planItem);
      saveState();
    });
    $("#resetPlan").addEventListener("click", () => {
      if (!confirm("重置 7 日计划的勾选？")) return;
      state.plan.clear();
      saveState();
      renderPlan();
    });
  }

  function updateBlankFor(qid, letter) {
    if (!qid.startsWith("cloze-")) return;
    const n = qid.split("-")[1];
    const b = $(`.blank[data-blank="${n}"]`);
    if (!b) return;
    b.classList.add("answered");
    b.textContent = letter;
  }
  function clearBlankFor(qid) {
    if (!qid.startsWith("cloze-")) return;
    const n = qid.split("-")[1];
    const b = $(`.blank[data-blank="${n}"]`);
    if (!b) return;
    b.classList.remove("answered");
    b.textContent = n;
  }

  /* ---------- scroll / active nav ---------- */

  function bindScroll() {
    const line = $("#scrollLine");
    const sections = $$("[data-section]");
    const navLinks = $$("#railNav a[data-nav]");
    const setActive = (id) => {
      navLinks.forEach((a) => a.classList.toggle("active", a.dataset.nav === id));
    };
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      line.style.width = `${pct}%`;

      // A deterministic "reading line" at 28% viewport height. This works
      // better than IntersectionObserver for very tall chapters.
      const anchor = window.scrollY + window.innerHeight * 0.28;
      let active = "top";
      sections.forEach((s) => {
        const top = s.getBoundingClientRect().top + window.scrollY;
        if (top <= anchor) active = s.id;
      });
      setActive(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* ---------- init ---------- */

  function init() {
    applyNight();
    renderMap();
    $("#examMount").innerHTML = [
      renderCloze(),
      ...reading.map(renderReading),
      renderPartB(),
      renderPartC(),
      renderWriting(),
    ].join("");
    renderSentences();
    renderVocab();
    renderSkills();
    renderQuiz();
    renderPlan();
    updateProgress();
    bindGlobal();
    bindScroll();
  }

  init();
})();
