(() => {
  "use strict";

  const VERSION = window.__DRILL_VERSION__ || "1";
  const INDEX_URL = `../assets/drill/index.json?v=${VERSION}`;
  const HISTORY_KEY = "dse-drill-history-v1";
  const SEEN_KEY = "dse-drill-seen-v1";
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const pad = (n) => String(n).padStart(2, "0");
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;

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

  function renderModes(index) {
    const mount = $("#drillModes");
    if (!mount) return;
    mount.innerHTML = (index.modes || []).map((m) => `<article class="drill-mode-card" data-mode="${esc(m.id)}">
      <div class="drill-mode-head"><span>${esc(m.tag)}</span><b>${m.count}</b></div>
      <h3>${esc(m.label)}</h3>
      <p>${esc(m.desc)}</p>
      <a class="drill-mode-link" href="play.html?mode=${encodeURIComponent(m.id)}">开始 <span>→</span></a>
    </article>`).join("");
  }

  function renderStats() {
    const history = readJSON(HISTORY_KEY, []);
    const done = history.length;
    const correct = history.filter((x) => x.correct).length;
    let streak = 0;
    for (let i = history.length - 1; i >= 0; i -= 1) {
      if (!history[i].correct) break;
      streak += 1;
    }
    const doneEl = $("#statDone");
    const rateEl = $("#statRate");
    const streakEl = $("#statStreak");
    if (doneEl) doneEl.textContent = done;
    if (rateEl) rateEl.textContent = done ? `${pct(correct, done)}%` : "—";
    if (streakEl) streakEl.textContent = streak;
  }

  function renderRecent() {
    const mount = $("#drillRecent");
    if (!mount) return;
    const history = readJSON(HISTORY_KEY, []).slice(-6).reverse();
    if (!history.length) {
      mount.innerHTML = '<div class="drill-empty">还没有练习记录。从上面选一个模式开始。</div>';
      return;
    }
    mount.innerHTML = history.map((x) => {
      const status = x.correct ? "答对" : "答错";
      const cls = x.correct ? "is-correct" : "is-wrong";
      const date = x.at ? new Date(x.at).toLocaleString("zh-CN", {
        month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit",
      }) : "";
      return `<a class="drill-recent-row ${cls}" href="play.html?mode=${encodeURIComponent(x.mode || "all")}&id=${encodeURIComponent(x.id)}">
        <span class="drill-recent-no">${esc(x.label || x.id)}</span>
        <span>${esc(x.modeLabel || modeLabel(x.mode))}</span>
        <b>${status}</b>
        <em>${esc(date)}</em>
      </a>`;
    }).join("");
  }

  async function init() {
    renderStats();
    renderRecent();
    try {
      const response = await fetch(INDEX_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`题库请求失败（${response.status}）`);
      const index = await response.json();
      renderModes(index);
    } catch (error) {
      $("#drillModes").innerHTML = `<div class="drill-error">题库读取失败：${esc(error.message)}。请确认页面通过 HTTP 打开。</div>`;
    }
  }

  $("#clearDrillHistory")?.addEventListener("click", () => {
    if (!window.confirm("清空本机的随机练记录和“已练过”记录？这不会影响真题作答。")) return;
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(SEEN_KEY);
    localStorage.removeItem("dse-drill-seen-sets-v1");
    renderStats();
    renderRecent();
    showToast("练习记录已清空");
  });

  init();
})();
