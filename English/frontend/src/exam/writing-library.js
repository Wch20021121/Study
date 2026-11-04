(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const TYPE_MAP = [
    {
      part: "Part A",
      title: "应用文 · 约 100 词",
      note: "先判断对象和目的，再决定称呼、主体和落款。",
      groups: [
        { label: "书信 / 邮件", items: ["建议信", "推荐信", "邀请信", "感谢信", "道歉信", "申请信", "投诉信", "咨询信", "回复邮件"] },
        { label: "通知 / 告示", items: ["活动通知", "招募通知", "告示"] },
        { label: "备忘录", items: ["事项说明", "安排通知"] },
      ],
    },
    {
      part: "Part B",
      title: "短文写作 · 160—200 词",
      note: "先描述，再解释，最后评论；不要只描述不议论。",
      groups: [
        { label: "图画作文", items: ["现象解释", "观点论证", "对比选择", "人生哲理"] },
        { label: "图表 / 表格", items: ["趋势变化", "比例分布"] },
        { label: "混合 / 提纲", items: ["图画 + 图表", "文字提纲 / 情景"] },
      ],
    },
  ];

  const TEMPLATES = [
    {
      id: "letter",
      part: "Part A",
      title: "书信 / 邮件通用模板",
      use: "建议、推荐、邀请、感谢、道歉、申请、投诉、咨询、回复",
      structure: ["称呼", "开篇目的", "主体：背景 + 具体内容", "结尾：期待 / 感谢", "落款"],
      template: `Dear ___,

I am writing to ___ [说明目的：建议/推荐/邀请/感谢/道歉/申请/投诉/咨询/回复].
To begin with, ___ [背景或原因]. In addition, ___ [具体内容一]. More importantly, ___ [具体内容二].

I would appreciate it if you could ___ [期待/请求]. Thank you for your time and consideration.

Yours sincerely,
Li Ming`,
      phrases: [
        ["建议信", "I am writing to offer some suggestions on ...", "It would be advisable for you to ..."],
        ["推荐信", "I am writing to recommend ... for ...", "The main reason is that ..."],
        ["邀请信", "I am writing to invite you to ...", "The event will take place ..."],
        ["感谢信", "I am writing to express my sincere gratitude for ...", "Without your help, I could not have ..."],
        ["道歉信", "I am writing to apologize for ...", "To make up for ..."],
        ["申请信", "I am writing to apply for ...", "I believe I am qualified because ..."],
        ["投诉信", "I am writing to complain about ...", "I would appreciate it if you could ..."],
        ["咨询信", "I am writing to inquire about ...", "I would be grateful if you could ..."],
        ["回复邮件", "I am glad to receive your email about ...", "Here are a few suggestions ..."],
      ],
      tips: [
        "第一句必须让收信人知道你为什么写，不要绕背景。",
        "主体只写 2—3 个具体点，每个点用 First / In addition / More importantly 推进。",
        "Part A 约 100 词，三到五句主体足够，不要写成议论文。",
        "落款统一用 Li Ming；题目另有要求时再改。",
      ],
    },
    {
      id: "notice",
      part: "Part A",
      title: "通知 / 告示模板",
      use: "活动通知、招募通知、告示",
      structure: ["标题 NOTICE", "目的 + 活动", "时间 / 地点 / 对象", "报名方式 / 截止时间", "主办方"],
      template: `NOTICE

To ___ [目的], ___ [活动/事项] will be held from ___ to ___ at ___ [时间/地点].
All ___ [对象] are welcome. Those who are interested should ___ [报名/参与方式] before ___ [截止时间].
For further information, please contact ___ [联系方式].

[Organizer]`,
      phrases: [
        ["活动通知", "___ will be held ...", "All are welcome to ..."],
        ["招募通知", "Volunteers are needed for ...", "Applicants should ..."],
        ["告示", "Please note that ...", "For further information, contact ..."],
      ],
      tips: [
        "通知不写 Dear ...，直接以 NOTICE 为标题。",
        "时间、地点、对象、报名方式四件事至少写全三件。",
        "语气正式、信息具体；不要用过于口语化的表达。",
      ],
    },
    {
      id: "memo",
      part: "Part A",
      title: "备忘录模板",
      use: "校内/公司内部事项说明、安排通知（英语一较少考，作为备用文体）",
      structure: ["标题 MEMORANDUM", "To / From / Date / Subject", "事项说明", "要求 / 截止时间"],
      template: `MEMORANDUM

To: ___
From: ___
Date: ___
Subject: ___

I am writing to inform you that ___ [事项]. Please ___ [要求] by ___ [时间].
If you have any questions, please contact ___ [联系人].`,
      phrases: [
        ["事项说明", "I am writing to inform you that ...", "Please note that ..."],
        ["安排要求", "Please ... by ...", "Those concerned are requested to ..."],
      ],
      tips: [
        "备忘录是内部文体，称呼和落款从简。",
        "Subject 要短而具体，不要写完整句子。",
        "事项、要求、截止时间三件事写清楚。",
      ],
    },
    {
      id: "picture",
      part: "Part B",
      title: "图画作文通用模板",
      use: "现象解释、观点论证、对比选择、人生哲理",
      structure: ["第一段：描述图画 + 点出寓意", "第二段：解释原因 / 论证观点", "第三段：评论 + 建议 / 升华"],
      template: `The picture presents ___. In the picture, ___; by contrast, ___. The caption reads, "___".

The drawing conveys a clear message: ___. To begin with, ___. In addition, ___.

In my view, ___. Only by ___ can we ___.`,
      phrases: [
        ["现象解释", "The picture reflects a common phenomenon: ...", "Several factors may account for this. First, ... Second, ..."],
        ["观点论证", "The drawing conveys a simple truth: ...", "The reasons are twofold. For one thing, ... For another, ..."],
        ["对比选择", "The two panels form a sharp contrast: ...", "Between the two, I would side with ... because ..."],
        ["人生哲理", "What the picture implies is that ...", "This truth is best illustrated by ..."],
      ],
      tips: [
        "描述段只抓 2—3 个关键细节，不要从头到脚报流水账。",
        "寓意段必须回答“这幅画想说明什么”，不能继续描述。",
        "评论段给出自己的判断或建议，避免空喊口号。",
        "Part B 目标 160—200 词；三段比例约为 30% / 50% / 20%。",
      ],
    },
    {
      id: "chart",
      part: "Part B",
      title: "图表 / 表格模板",
      use: "趋势变化、比例分布、表格数据",
      structure: ["第一段：描述总体趋势 + 2—3 个关键数据", "第二段：解释原因", "第三段：结论 / 建议"],
      template: `The chart shows ___. Specifically, ___ rose/fell from ___ to ___, while ___.

Several factors may account for this. First, ___. Second, ___.

In conclusion, ___. It is advisable that ___.`,
      phrases: [
        ["趋势变化", "The chart shows a steady rise/decline in ...", "It climbed from ... to ..."],
        ["比例分布", "A accounts for ___%, followed by B at ___%.", "Only ___% of respondents ..."],
        ["原因分析", "This trend can be attributed to ...", "Another factor is ..."],
      ],
      tips: [
        "先看标题、单位和时间范围，再决定时态。",
        "只引用 2—3 个最有代表性的数字，不要照抄所有数据。",
        "数字之后必须解释“为什么”和“说明什么”。",
        "图表作文不是数据报告，仍然要有观点。",
      ],
    },
    {
      id: "picture-chart",
      part: "Part B",
      title: "图画 + 图表模板",
      use: "图画与图表同时出现（如 2024、2026 一类混合题）",
      structure: ["第一段：图画细节 + 图表数据", "第二段：两者共同说明什么", "第三段：评论 / 建议"],
      template: `The picture shows ___, while the chart presents ___.

Taken together, they reveal ___. The picture reflects ___; the figures confirm ___.

In my view, ___. It is advisable that ___.`,
      phrases: [
        ["连接图与表", "The picture illustrates ..., and the chart provides the data to confirm it.", "Taken together, they point to ..."],
        ["解释关系", "The figures give concrete evidence to ...", "What the picture suggests is borne out by ..."],
      ],
      tips: [
        "不要写成两篇小作文：图画和图表必须共同服务于一个中心。",
        "第一段可以一句图、一句表，再一句合并。",
        "第二段解释“图与表共同说明什么”，这是得分重点。",
      ],
    },
    {
      id: "argument",
      part: "Part B",
      title: "提纲 / 议论文模板",
      use: "文字提纲、观点选择、情景议论文（备用）",
      structure: ["引入话题 + 双方观点", "表明立场 + 两条理由", "让步 / 结论"],
      template: `When it comes to ___, opinions vary. Some believe ___, while others argue ___.

As far as I am concerned, ___. The reasons are twofold. For one thing, ___. For another, ___.

Therefore, ___.`,
      phrases: [
        ["引出争议", "When it comes to ..., opinions vary.", "Views differ sharply on ..."],
        ["表明立场", "As far as I am concerned, ...", "I am inclined to believe that ..."],
        ["让步", "Admittedly, ... However, ...", "It is true that ..., but ..."],
      ],
      tips: [
        "开头不要只写 With the development of society；直接进入争议。",
        "立场必须明确，不要两边都对。",
        "两条理由要具体，最好一条讲个人、一条讲社会。",
      ],
    },
  ];

  const TECHNIQUES = [
    ["01", "审题 3 分钟", "圈出文体、写作对象、目的、要点和字数。Part A 看清是写信、通知还是回复；Part B 看清是图画、图表还是图画+图表。"],
    ["02", "先定三段", "Part A：目的—细节—期待；Part B：描述—解释—评论。段落功能定了，句子才不会乱跑。"],
    ["03", "开头直接", "第一句就交代目的或画面中心。不要用与题目无关的万能背景句拖时间。"],
    ["04", "主体具体", "每个主体段只讲 2—3 个点，每点先给观点再给细节。抽象形容词越多，分数通常越低。"],
    ["05", "衔接显性", "First / In addition / More importantly；However / Therefore / As a result。每段至少一个逻辑连接。"],
    ["06", "句式有变化", "一篇作文里安排一个定语从句、一个非谓语、一个被动或强调句即可，不要每句都堆长难句。"],
    ["07", "词汇替换", "good → beneficial / constructive；bad → harmful / detrimental；important → essential / crucial；many → a growing number of。"],
    ["08", "模板只用骨架", "模板句控制在每段 1—2 句，其余必须来自题目细节。整篇套模板，阅卷人一眼能看出来。"],
    ["09", "时间分配", "Part A 15 分钟，Part B 35 分钟，最后 5 分钟检查主谓一致、时态、单复数和拼写。"],
    ["10", "检查清单", "字数是否达标；要点是否齐全；每段是否有主题句；有没有拼写错误；称呼和落款是否完整。"],
  ];

  function renderTypeMap() {
    const mount = $("#typeMap");
    if (!mount) return;
    mount.innerHTML = TYPE_MAP.map((group) => `<article class="writing-type-group">
      <div class="writing-type-head"><span>${esc(group.part)}</span><h3>${esc(group.title)}</h3><p>${esc(group.note)}</p></div>
      <div class="writing-type-rows">${group.groups.map((row) => `<div class="writing-type-row">
        <b>${esc(row.label)}</b>
        <div>${row.items.map((item) => `<span>${esc(item)}</span>`).join("")}</div>
      </div>`).join("")}</div>
    </article>`).join("");
  }

  function phraseTable(rows) {
    if (!rows || !rows.length) return "";
    return `<div class="template-phrases"><div class="template-phrases-head"><span>题型</span><span>开头句</span><span>主体 / 结尾句</span></div>
      ${rows.map(([type, a, b]) => `<div class="template-phrase"><b>${esc(type)}</b><span>${esc(a)}</span><span>${esc(b)}</span></div>`).join("")}</div>`;
  }

  function renderTemplates() {
    const mount = $("#templateList");
    if (!mount) return;
    mount.innerHTML = TEMPLATES.map((t) => `<article class="template-card" id="${esc(t.id)}">
      <div class="template-card-head">
        <div><p class="section-kicker">${esc(t.part)}</p><h3>${esc(t.title)}</h3></div>
        <button class="template-peek" type="button" data-peek="${esc(t.id)}">显示模板</button>
      </div>
      <p class="template-use">${esc(t.use)}</p>
      <div class="template-body">
        <div class="template-structure">${t.structure.map((x) => `<span>${esc(x)}</span>`).join("")}</div>
        <pre class="template-text">${esc(t.template)}</pre>
        ${phraseTable(t.phrases)}
        <ul class="template-tips">${t.tips.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
    </article>`).join("");
    $$("[data-peek]").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".template-card");
        card.classList.toggle("is-open");
        button.textContent = card.classList.contains("is-open") ? "收起" : "显示模板";
      });
    });
  }

  function renderTechniques() {
    const mount = $("#techniqueList");
    if (!mount) return;
    mount.innerHTML = TECHNIQUES.map(([no, title, text]) => `<article class="technique-card">
      <span class="technique-no">${esc(no)}</span>
      <h3>${esc(title)}</h3>
      <p>${esc(text)}</p>
    </article>`).join("");
  }

  function setupRecite() {
    const button = $("#reciteToggle");
    if (!button) return;
    button.addEventListener("click", () => {
      const on = document.body.classList.toggle("is-reciting");
      button.textContent = on ? "退出背诵模式" : "进入背诵模式";
      $("#reciteHint").textContent = on ? "点击卡片上的“显示模板”逐条核对。" : "背模板时先记段落功能，再记句子。";
      $$(".template-card").forEach((card) => card.classList.remove("is-open"));
      $$(".template-peek").forEach((b) => { b.textContent = "显示模板"; });
    });
  }

  renderTypeMap();
  renderTemplates();
  renderTechniques();
  setupRecite();
})();
