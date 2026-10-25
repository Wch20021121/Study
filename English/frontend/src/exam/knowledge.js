(() => {
  "use strict";

  const DATA = window.__PAPER__;
  if (!DATA) return;
  const { meta = {}, sections = [], reading = [], partb, partc, writing, vocab = [], sentences = [] } = DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const KEY = `dse-practice-${meta.year}-v2`;

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const pad = (n) => String(n).padStart(2, "0");
  const pct = (n, total) => total ? Math.round(n / total * 100) : 0;

  const practice = (() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
      return {
        answers: raw.answers && typeof raw.answers === "object" ? raw.answers : {},
        submittedAt: raw.submittedAt || null,
      };
    } catch (e) { return { answers: {}, submittedAt: null }; }
  })();

  const objectiveSections = [];
  if (sections.some((s) => s.id === "cloze")) {
    objectiveSections.push({
      id: "cloze", label: "完形填空", kind: "Use of English",
      ids: Array.from({ length: sections.find((s) => s.id === "cloze").count || 20 }, (_, i) => `cloze-${i + 1}`),
      score: 10,
    });
  }
  if (reading.length) {
    objectiveSections.push({
      id: "reading", label: "阅读理解", kind: "Part A",
      ids: reading.flatMap((t) => t.questions.map((q) => `${t.id}-${q.n}`)),
      score: 40,
    });
  }
  if (sections.some((s) => s.id === "partb")) {
    objectiveSections.push({
      id: "partb", label: "新题型", kind: "Part B",
      ids: [41, 42, 43, 44, 45].map((n) => `partb-${n}`),
      score: 10,
    });
  }
  const objectiveCount = objectiveSections.reduce((sum, s) => sum + s.ids.length, 0);
  const answeredCount = objectiveSections.reduce(
    (sum, s) => sum + s.ids.filter((id) => Boolean(practice.answers[id])).length, 0
  );
  const totalScore = sections.reduce((sum, s) => sum + (Number(s.score) || 0), 0);
  const knowledgeCount = vocab.length + sentences.length;

  const patternDefs = [
    {
      id: "meaning", label: "词义指代", en: "LEXICAL",
      desc: "先回到词所在的句子，用上下文替换，而不是背词条。",
      test: /\b(means?|refers? to|closest in meaning|the word|the phrase|expression)\b/i,
    },
    {
      id: "attitude", label: "态度语气", en: "ATTITUDE",
      desc: "抓评价形容词和转折，区分作者态度与文中人物态度。",
      test: /\b(attitude|feel about|tone|regard|view)\b/i,
    },
    {
      id: "main", label: "主旨标题", en: "MAIN IDEA",
      desc: "看首末段和反复出现的名词，排除只覆盖一段的选项。",
      test: /\b(best title|mainly|main idea|primarily|purpose|intends? to|subject of the text|focuses? on)\b/i,
    },
    {
      id: "example", label: "例证功能", en: "EXAMPLE",
      desc: "例子本身不是答案，例子证明的观点才是。",
      test: /\b((is |are )?mentioned .* to|mentions? .* to|example .* (is used|mentioned)|citing .* intends?|study .* to)\b/i,
    },
    {
      id: "infer", label: "推断判断", en: "INFERENCE",
      desc: "只推一步；选项必须能在原文找到落点。",
      test: /\b(infer|imply|implies|suggest|suggests|learned?|concluded?)\b/i,
    },
    {
      id: "detail", label: "细节定位", en: "DETAIL",
      desc: "先定位段落，再核对同义替换和修饰范围。",
      test: /\b(according to|it is indicated|which of the following|what can be|because|why|paragraph)\b/i,
    },
  ];

  function classify(stem) {
    const text = String(stem || "");
    return patternDefs.find((p) => p.test.test(text)) || {
      id: "other", label: "其他题干", en: "OTHER",
      desc: "先圈出题干里的主语、限定词和提问对象。",
    };
  }

  const patterns = [];
  reading.forEach((t) => {
    t.questions.forEach((q) => {
      const p = classify(q.stem);
      let row = patterns.find((x) => x.id === p.id);
      if (!row) {
        row = { ...p, items: [] };
        patterns.push(row);
      }
      row.items.push({ n: q.n, section: t.id, stem: q.stem });
    });
  });
  patterns.sort((a, b) => b.items.length - a.items.length);

  const vocabGroups = (() => {
    const order = ["cloze", "text1", "text2", "text3", "text4", "partb", "partc"];
    const groups = [];
    vocab.forEach((v) => {
      const key = v.sec || "other";
      let group = groups.find((g) => g.key === key);
      if (!group) {
        group = { key, label: v.sec_label || (key === "other" ? "其他" : key), items: [] };
        groups.push(group);
      }
      group.items.push(v);
    });
    groups.sort((a, b) => {
      const ai = order.indexOf(a.key);
      const bi = order.indexOf(b.key);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
    return groups;
  })();

  const levels = [5, 4, 3].map((level) => ({
    level,
    count: sentences.filter((s) => Number(s.level) === level).length,
  }));
  const maxLevel = Math.max(1, ...levels.map((x) => x.count));
  const sampleSentences = sentences
    .slice()
    .sort((a, b) => (Number(b.level) || 0) - (Number(a.level) || 0) || String(a.id).localeCompare(String(b.id)))
    .slice(0, 6);

  const writingParts = writing ? [
    { key: "partA", label: "Part A", data: writing.partA || {} },
    { key: "partB", label: "Part B", data: writing.partB || {} },
  ] : [];

  function sectionHead(id, no, kicker, title, lede) {
    return `<header class="knowledge-section-head" id="${id}">
      <span class="knowledge-no">${no}</span>
      <div>
        <p class="section-kicker">${esc(kicker)}</p>
        <h2>${esc(title)}</h2>
        <p>${esc(lede)}</p>
      </div>
      <a class="text-link" href="#top">回到页首 ↑</a>
    </header>`;
  }

  function renderStructure() {
    const rows = sections.map((s) => `<div class="score-row">
      <div><b>${esc(s.label)}</b><small>${esc(s.kind)}</small></div>
      <i aria-hidden="true"><b style="width:${pct(Number(s.score) || 0, totalScore)}%"></b></i>
      <em>${s.score} 分 · ${s.count} 题</em>
    </div>`).join("");
    const focus = sections.map((s, i) => `<div class="review-row">
      <span>${pad(i + 1)}</span>
      <div><b>${esc(s.label)}</b><p>${esc(s.focus)}</p></div>
      <em>${s.count} 题</em>
    </div>`).join("");
    return `<section class="knowledge-section">
      ${sectionHead("structure", "01", "Paper map", "命题结构", `这张卷子一共 ${totalScore} 分：客观题 ${objectiveCount} 道，主观题 ${(partc ? 5 : 0) + (writing ? 2 : 0)} 道。先把分值放回题型，再决定复习顺序。`)}
      <div class="knowledge-grid knowledge-grid-wide">
        <div class="knowledge-panel">
          <div class="panel-head"><h3>分值分布</h3><span>${totalScore} total</span></div>
          <div class="score-map">${rows}</div>
          <div class="score-foot"><span>客观题</span><b>${objectiveCount} 题</b><span>主观题</span><b>${(partc ? 5 : 0) + (writing ? 2 : 0)} 题</b></div>
        </div>
        <div class="knowledge-panel">
          <div class="panel-head"><h3>各板块复习动作</h3><span>what to do</span></div>
          <div class="review-list">${focus}</div>
        </div>
      </div>
    </section>`;
  }

  function renderTopics() {
    const cards = reading.map((t, i) => {
      const topic = (meta.topics || [])[i] || t.title || `Text ${i + 1}`;
      const qs = t.questions.map((q) => q.n);
      return `<article class="topic-card">
        <span>Text ${i + 1} · ${qs[0]}–${qs[qs.length - 1]}</span>
        <h3>${esc(topic)}</h3>
        <p>${esc(t.title || "")}</p>
        <a class="text-link" href="../analysis/${meta.year}.html#${esc(t.id)}">看这一篇的解析 →</a>
      </article>`;
    }).join("");
    return `<section class="knowledge-section">
      ${sectionHead("topics", "02", "Reading map", "四篇阅读在考什么", "先看主题和段落功能，再回到题干。知识页不展示正确选项，只把文章放回它所属的话题。")}
      <div class="topic-grid">${cards}</div>
    </section>`;
  }

  function renderPatterns() {
    const cards = patterns.map((p) => {
      const nums = p.items.slice(0, 8).map((x) => `<a href="../analysis/${meta.year}.html#ans-${esc(x.section)}-${x.n}">${x.n}</a>`).join("");
      const more = p.items.length > 8 ? `<span class="pattern-more">+${p.items.length - 8}</span>` : "";
      return `<article class="pattern-card">
        <div class="pattern-card-head"><span>${esc(p.en)}</span><b>${p.items.length}</b></div>
        <h3>${esc(p.label)}</h3>
        <p>${esc(p.desc)}</p>
        <div class="pattern-questions">${nums}${more}</div>
      </article>`;
    }).join("");
    return `<section class="knowledge-section">
      ${sectionHead("patterns", "03", "Question signals", "题干信号词", "按题干关键词做的复习归类，不是官方题型标签。看到信号词，先知道第一步该做什么。")}
      <div class="pattern-grid">${cards}</div>
      <p class="knowledge-note">题号可以跳到解析页对应题；如果你还没交卷，解析页仍会打开，但本页不会提前显示正确选项。</p>
    </section>`;
  }

  function renderVocab() {
    const max = Math.max(1, ...vocabGroups.map((g) => g.items.length));
    const bars = vocabGroups.map((g) => `<div class="vocab-bar-row">
      <span>${esc(g.label)}</span>
      <i aria-hidden="true"><b style="width:${pct(g.items.length, max)}%"></b></i>
      <em>${g.items.length} 词</em>
    </div>`).join("");
    const picks = [];
    const perGroup = vocabGroups.length <= 4 ? 3 : 2;
    vocabGroups.forEach((g) => g.items.slice(0, perGroup).forEach((v) => picks.push(v)));
    const previewCount = Math.min(12, picks.length);
    const preview = picks.slice(0, previewCount).map((v) => `<div class="word-card">
      <div><b>${esc(v.w)}</b><span>${esc(v.pos || "")}</span></div>
      <p>${esc(v.cn || "")}</p>
      <small>${esc(v.sec_label || "")}</small>
    </div>`).join("");
    return `<section class="knowledge-section">
      ${sectionHead("vocab", "04", "Word bank", "词汇分布", `本卷 ${vocab.length} 个重难点词，不按字母表排，而是按出现板块排。先背你刚读过的那一篇。`)}
      <div class="knowledge-grid">
        <div class="knowledge-panel">
          <div class="panel-head"><h3>按板块看密度</h3><span>${vocab.length} words</span></div>
          <div class="vocab-bars">${bars}</div>
          <a class="text-link knowledge-panel-link" href="../analysis/${meta.year}.html#vocab">打开全卷词汇表，搜索、筛选、标记已掌握 →</a>
        </div>
        <div class="knowledge-panel">
          <div class="panel-head"><h3>先看这 ${previewCount} 个</h3><span>context first</span></div>
          <div class="word-cloud">${preview}</div>
        </div>
      </div>
    </section>`;
  }

  function renderSentences() {
    const levelRows = levels.map((x) => `<div class="level-row">
      <span>Level ${x.level}</span>
      <i aria-hidden="true"><b style="width:${pct(x.count, maxLevel)}%"></b></i>
      <em>${x.count} 句</em>
    </div>`).join("");
    const sample = sampleSentences.map((s) => `<details class="sentence-card knowledge-sentence">
      <summary><span class="s-id">${esc(s.id)}</span><span class="s-sec">${esc(s.sec_label || "")} · L${esc(s.level || "?")}</span><span class="s-en">${esc(s.en)}</span></summary>
      <div class="sentence-body">
        <p><b>主干</b>${esc(s.core || "")}</p>
        <p><b>结构</b>${esc(s.structure || "")}</p>
        <p><b>关键词</b>${esc(s.key || "")}</p>
        <p><b>翻译</b>${esc(s.zh || "")}</p>
        ${s.tip ? `<p><b>提醒</b>${esc(s.tip)}</p>` : ""}
      </div>
    </details>`).join("");
    return `<section class="knowledge-section">
      ${sectionHead("sentences", "05", "Sentence x-ray", "长难句难度", `全卷 ${sentences.length} 句长难句。先练主干，再补修饰；不要一上来逐词翻译。`)}
      <div class="knowledge-grid">
        <div class="knowledge-panel">
          <div class="panel-head"><h3>难度分布</h3><span>${sentences.length} sentences</span></div>
          <div class="level-bars">${levelRows}</div>
          <p class="knowledge-note">Level 越高，修饰层级越多。先能说出主干，再处理从句和插入语。</p>
          <div class="sentence-steps">
            <div><b>01</b><span>先找主句谓语</span></div>
            <div><b>02</b><span>再圈从句与插入语</span></div>
            <div><b>03</b><span>最后按中文语序重排</span></div>
          </div>
          <a class="text-link knowledge-panel-link" href="../analysis/${meta.year}.html#sentences">看全部长难句拆解 →</a>
        </div>
        <div class="knowledge-panel">
          <div class="panel-head"><h3>先拆这 6 句</h3><span>open to reveal</span></div>
          <div class="sentence-list">${sample}</div>
        </div>
      </div>
    </section>`;
  }

  function renderWriting() {
    if (!writingParts.length) return "";
    const cards = writingParts.map(({ label, data }) => {
      const expressions = (data.expressions || []).slice(0, 6);
      const structure = (data.structure || []).slice(0, 5);
      return `<article class="writing-card">
        <div class="writing-card-head"><span>${esc(label)}</span><b>${esc(data.score || "")} 分 · ${esc(data.words || "")}</b></div>
        <h3>${esc(data.title || "写作")}</h3>
        <p class="writing-prompt">${esc(data.prompt_zh || data.prompt || "")}</p>
        <div class="writing-card-cols">
          <div><h4>结构骨架</h4><ul>${structure.map(([a, b]) => `<li><b>${esc(a)}</b>${esc(b)}</li>`).join("")}</ul></div>
          <div><h4>可迁移表达</h4><ul>${expressions.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
        </div>
        ${(data.traps || []).length ? `<p class="writing-trap"><b>易错点：</b>${(data.traps || []).map(esc).join("；")}</p>` : ""}
      </article>`;
    }).join("");
    return `<section class="knowledge-section">
      ${sectionHead("writing", "06", "Writing moves", "写作结构与可迁移表达", "不是背整篇范文，而是把开头、主体、结尾的动作拆出来，换成自己的内容。")}
      <div class="writing-grid">${cards}</div>
      <a class="text-link" href="../analysis/${meta.year}.html#writing">看完整范文与译文 →</a>
    </section>`;
  }

  function renderProgress() {
    const rows = objectiveSections.map((s) => {
      const done = s.ids.filter((id) => Boolean(practice.answers[id])).length;
      return `<div class="progress-row">
        <span>${esc(s.label)}</span>
        <i aria-hidden="true"><b style="width:${pct(done, s.ids.length)}%"></b></i>
        <em>${done} / ${s.ids.length}</em>
      </div>`;
    }).join("");
    const state = practice.submittedAt
      ? `已交卷 · ${new Date(practice.submittedAt).toLocaleString("zh-CN")}`
      : answeredCount ? "进行中 · 作答保存在本机" : "还没有开始作答";
    return `<section class="knowledge-section">
      ${sectionHead("progress", "07", "Your progress", "本卷作答进度", "这里只统计已经作答的题，不判断对错，也不提前展示正确选项。")}
      <div class="knowledge-panel progress-panel">
        <div class="panel-head"><h3>${state}</h3><span>${answeredCount} / ${objectiveCount}</span></div>
        <div class="progress-bars">${rows}</div>
        <div class="progress-actions">
          <a class="btn btn-red" href="../practice/${meta.year}.html">${answeredCount ? "继续做真题" : "开始做真题"}</a>
          <a class="btn btn-ghost" href="../analysis/${meta.year}.html">去真题解析</a>
        </div>
      </div>
    </section>`;
  }

  function renderNav() {
    const items = [
      ["structure", "命题结构"],
      ["topics", "阅读地图"],
      ["patterns", "题干信号"],
      ["vocab", "词汇分布"],
      ["sentences", "长难句"],
      ["writing", "写作表达"],
      ["progress", "作答进度"],
    ];
    $("#knowledgeNav").innerHTML = items.map(([id, label], i) =>
      `<a href="#${id}"><span>${pad(i + 1)}</span>${esc(label)}</a>`
    ).join("");
  }

  function render() {
    $("#knowledgeLede").textContent = `这页把 ${meta.year} 年真题拆成 ${sections.length} 个命题板块、${objectiveCount} 道客观题、${vocab.length} 个词和 ${sentences.length} 个长难句。先看结构，再按板块复习；正确选项只在“真题解析”里出现。`;
    $("#knowledgeStamp").textContent = knowledgeCount;
    $("#knowledgeMount").innerHTML = [
      renderStructure(),
      renderTopics(),
      renderPatterns(),
      renderVocab(),
      renderSentences(),
      renderWriting(),
      renderProgress(),
    ].join("");
    renderNav();
  }

  $("#printPage")?.addEventListener("click", () => {
    $$("details").forEach((d) => { d.open = true; });
    window.print();
  });

  render();
})();
