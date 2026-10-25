(() => {
  "use strict";

  const YEARS = window.__YEARS__ || [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const readState = (year) => {
    try {
      const raw = JSON.parse(localStorage.getItem(`dse-practice-${year}-v2`) || "{}");
      const answers = raw.answers && typeof raw.answers === "object" ? raw.answers : {};
      return {
        submittedAt: raw.submittedAt || null,
        answered: Object.values(answers).filter(Boolean).length,
      };
    } catch (e) {
      return { submittedAt: null, answered: 0 };
    }
  };

  const cards = YEARS.map((y) => {
    const s = readState(y.year);
    const done = Boolean(s.submittedAt);
    return { ...y, done, answered: s.answered, submittedAt: s.submittedAt };
  });

  function cardHtml(y) {
    const status = y.done ? "已交卷" : (y.answered ? `进行中 ${y.answered}/${y.objectiveCount}` : "未开始");
    const topics = (y.topics || []).join(" · ");
    return `<article class="year-card" data-year="${y.year}" data-status="${y.done ? "done" : "todo"}">
      <div class="year-card-main">
        <div class="year-card-year"><b>${y.year}</b><span>英语（一）</span></div>
        <p class="year-card-topics">${esc(topics)}</p>
        <div class="year-card-meta"><span>${y.full ? "全卷" : "阅读部分"}</span><span>${y.objectiveCount} 道客观题</span><span>${y.vocabCount} 个重点词</span><span>${y.sentenceCount} 句长难句</span></div>
      </div>
      <span class="year-status ${y.done ? "is-done" : ""}">${status}</span>
      <div class="year-actions">
        <a class="btn btn-ink" href="practice/${y.year}.html">${y.answered && !y.done ? "继续做题" : "开始做题"} <span>→</span></a>
        <a class="btn btn-ghost" href="analysis/${y.year}.html">看解析</a>
      </div>
      <div class="year-card-score">${y.done ? "客观题阅卷结果在解析页顶部" : y.answered ? "进度已保存在本机" : "建议限时 180 分钟"}</div>
    </article>`;
  }

  function render(filter = "all") {
    const list = cards.filter((y) => filter === "all" || (filter === "done" ? y.done : !y.done));
    $("#yearGrid").innerHTML = list.length ? list.map(cardHtml).join("") : '<div class="vocab-empty">这个筛选下暂时没有卷子。</div>';
    const done = cards.filter((y) => y.done).length;
    $("#archiveNote").textContent = `${done} 套已交卷 · ${cards.length - done} 套未交卷 · 数据只保存在本机浏览器`;
  }

  const back408 = document.querySelector("[data-408-link]");
  if (back408 && location.hostname) {
    back408.href = location.protocol + "//" + location.hostname + ":40810/";
  }

  $$("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-filter]").forEach((b) => b.classList.toggle("is-active", b === button));
      render(button.dataset.filter);
    });
  });

  render("all");
})();
