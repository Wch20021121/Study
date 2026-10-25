(() => {
  "use strict";

  const body = document.body;
  const year = Number(body.dataset.year);
  if (!year) return;

  const KEY = `dse-practice-${year}-v2`;
  const SELF_KEY = `dse-selfscore-${year}-v2`;
  const WORD_KEY = `dse-vocab-${year}-v1`;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const readJSON = (key, fallback) => {
    try {
      const raw = JSON.parse(localStorage.getItem(key) || "null");
      return raw == null ? fallback : raw;
    } catch (e) { return fallback; }
  };

  function showToast(message) {
    let toast = $("#toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
  }

  function answerCount(answers) {
    return Object.values(answers || {}).filter(Boolean).length;
  }

  function exportJSON() {
    const saved = readJSON(KEY, {});
    const answers = saved.answers && typeof saved.answers === "object" ? saved.answers : {};
    const texts = saved.texts && typeof saved.texts === "object" ? saved.texts : {};
    const selfScore = readJSON(SELF_KEY, {});
    const vocabularyMastered = readJSON(WORD_KEY, []);
    const payload = {
      schema: "dse-english-paper/v1",
      year,
      exam: window.__PAPER__?.meta?.exam || $(".bar-context span")?.textContent || "",
      exportedAt: new Date().toISOString(),
      answers,
      texts,
      startedAt: Number(saved.startedAt) || null,
      submittedAt: saved.submittedAt || null,
      duration: Number(saved.duration) || 0,
      selfScore: {
        partc: Number(selfScore.partc) || 0,
        writing: Number(selfScore.writing) || 0,
      },
      vocabularyMastered: Array.isArray(vocabularyMastered) ? vocabularyMastered : [],
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${year}-english-answers.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 5000);
    showToast(`已暂存 ${year} 年作答 · JSON（${answerCount(answers)} 道客观题）`);
  }

  async function importJSON(file) {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!data || Number(data.year) !== year) {
        throw new Error(`这个文件属于 ${data && data.year ? data.year : "未知"} 年，不是 ${year} 年`);
      }
      if (!data.answers || typeof data.answers !== "object") {
        throw new Error("文件里没有 answers 对象");
      }
      const normalise = (obj) => {
        const out = {};
        Object.entries(obj || {}).forEach(([key, value]) => {
          if (typeof value === "string" && value) out[key] = value;
        });
        return out;
      };
      const payload = {
        answers: normalise(data.answers),
        texts: normalise(data.texts),
        startedAt: Number(data.startedAt) || Date.now(),
        submittedAt: typeof data.submittedAt === "string" ? data.submittedAt : null,
        duration: Number(data.duration) || 0,
      };
      localStorage.setItem(KEY, JSON.stringify(payload));
      if (data.selfScore && typeof data.selfScore === "object") {
        localStorage.setItem(SELF_KEY, JSON.stringify({
          partc: Number(data.selfScore.partc) || 0,
          writing: Number(data.selfScore.writing) || 0,
        }));
      }
      if (Array.isArray(data.vocabularyMastered)) {
        localStorage.setItem(WORD_KEY, JSON.stringify(data.vocabularyMastered.filter((x) => typeof x === "string")));
      }
      showToast(`已导入 ${answerCount(payload.answers)} 道作答，正在刷新…`);
      window.setTimeout(() => location.reload(), 500);
    } catch (error) {
      showToast(`导入失败：${error.message || "JSON 格式不正确"}`);
    }
  }

  function injectClearDialog() {
    if ($("#yearClearDialog")) return;
    const dialog = document.createElement("div");
    dialog.className = "year-dialog";
    dialog.id = "yearClearDialog";
    dialog.hidden = true;
    dialog.innerHTML = `
      <div class="year-dialog-card" role="dialog" aria-modal="true" aria-labelledby="yearClearTitle">
        <button class="modal-close" type="button" data-clear-cancel aria-label="关闭">×</button>
        <p class="modal-kicker">CLEAR / 清空</p>
        <h2 id="yearClearTitle">清空 ${year} 年的全部作答？</h2>
        <p class="modal-lede">会删除这套卷子的作答、计时、交卷记录和主观题自评，并回到“真题”页。这个词表里的“已掌握”标记会保留。</p>
        <div class="year-dialog-note">这一步不能撤销。如果还想保留一份记录，先点“暂存 JSON”。</div>
        <div class="modal-actions">
          <button class="btn btn-ghost" type="button" data-clear-cancel>保留作答</button>
          <button class="btn btn-red" type="button" data-clear-confirm>一键清空</button>
        </div>
      </div>`;
    body.appendChild(dialog);
  }

  function openClear() {
    injectClearDialog();
    const dialog = $("#yearClearDialog");
    if (!dialog) return;
    dialog.hidden = false;
    body.style.overflow = "hidden";
    $("[data-clear-confirm]", dialog)?.focus();
  }

  function closeClear() {
    const dialog = $("#yearClearDialog");
    if (!dialog) return;
    dialog.hidden = true;
    body.style.overflow = "";
  }

  function clearYear() {
    localStorage.removeItem(KEY);
    localStorage.removeItem(`dse-practice-${year}-v1`);
    localStorage.removeItem(SELF_KEY);
    closeClear();
    showToast("已清空，正在回到真题…");
    const practice = $('a[data-view="paper"]');
    window.setTimeout(() => {
      location.href = practice ? practice.href : location.pathname;
    }, 450);
  }

  injectClearDialog();

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-export-json]")) {
      exportJSON();
      return;
    }
    if (event.target.closest("[data-import-json]")) {
      $("#yearJsonInput")?.click();
      return;
    }
    if (event.target.closest("[data-clear-year]")) {
      openClear();
      return;
    }
    if (event.target.closest("[data-clear-cancel]")) {
      closeClear();
      return;
    }
    if (event.target.closest("[data-clear-confirm]")) {
      clearYear();
      return;
    }
    if (event.target.matches("#yearClearDialog")) closeClear();
  });

  document.addEventListener("change", (event) => {
    if (event.target.id === "yearJsonInput") {
      const file = event.target.files && event.target.files[0];
      event.target.value = "";
      importJSON(file);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !$("#yearClearDialog")?.hidden) closeClear();
  });

  // The tab bar should always describe the current paper, even if a legacy
  // bookmark drops the visitor into a deep analysis anchor.
  $$('a[data-view="paper"]').forEach((link) => link.setAttribute("title", `${year} 年真题`));
})();
