(() => {
  "use strict";

  const MODULES = ["politics", "english", "math"];
  const DEFAULT_MODULE = "english";
  const MODULE_TITLES = {
    politics: "政治一页纸 · 考研学习台",
    english: "英语（一）真题档案 · 考研学习台",
    math: "数一易忘易错速记 · 考研学习台",
  };

  const tabs = Array.from(document.querySelectorAll(".hub-tab"));
  const panels = Array.from(document.querySelectorAll(".hub-panel"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tabFor(name) {
    return tabs.find((tab) => tab.dataset.module === name) || tabs[0];
  }

  function scrollTop() {
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  let mathRendered = false;

  function renderMath() {
    const panel = document.getElementById("panel-math");
    if (mathRendered || !panel || typeof window.renderMathInElement !== "function") return;

    window.renderMathInElement(panel, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
      ],
      throwOnError: false,
      strict: false,
    });
    mathRendered = true;
  }

  function activate(name, options = {}) {
    const module = MODULES.includes(name) ? name : DEFAULT_MODULE;

    for (const tab of tabs) {
      const active = tab.dataset.module === module;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    }

    for (const panel of panels) {
      panel.hidden = panel.dataset.panel !== module;
    }

    document.body.dataset.module = module;
    document.title = MODULE_TITLES[module] || MODULE_TITLES[DEFAULT_MODULE];

    if (module === "math") renderMath();
    if (options.focus) tabFor(module).focus();
  }

  function go(name, options = {}) {
    if (!MODULES.includes(name)) name = DEFAULT_MODULE;
    activate(name, { focus: options.focus });

    if (options.updateHash !== false) {
      const nextHash = `#${name}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
      }
    }

    if (options.scroll !== false) scrollTop();
  }

  function route(initial = false) {
    const raw = window.location.hash.replace(/^#/, "");
    const hash = raw ? decodeURIComponent(raw) : "";

    if (!hash) {
      activate(DEFAULT_MODULE);
      return;
    }

    if (MODULES.includes(hash)) {
      activate(hash);
      if (!initial) scrollTop();
      return;
    }

    const target = document.getElementById(hash);
    if (target) {
      const panel = target.closest(".hub-panel");
      const module = panel && MODULES.includes(panel.dataset.panel)
        ? panel.dataset.panel
        : DEFAULT_MODULE;
      activate(module);
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start", behavior: "auto" });
      });
      return;
    }

    activate(DEFAULT_MODULE);
  }

  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      const name = tab.dataset.module;
      if (window.location.hash === `#${name}`) {
        activate(name);
        scrollTop();
      } else {
        go(name, { scroll: true });
      }
    });

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      const current = tabs.indexOf(tab);
      let next = current;
      if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;

      const target = tabs[next];
      go(target.dataset.module, { focus: true });
    });
  }

  window.addEventListener("hashchange", () => route(false));
  window.addEventListener("popstate", () => route(false));

  function updatePoliticsResume() {
    const node = document.getElementById("politicsResume");
    if (!node) return;

    let saved = 0;
    try {
      saved = Number.parseInt(window.localStorage.getItem("politics-reader-page-v1") || "", 10);
    } catch (error) {
      saved = 0;
    }

    if (!Number.isFinite(saved) || saved < 2 || saved > 36) {
      node.textContent = "从封面开始 · 阅读位置会自动记住";
      return;
    }

    const link = document.createElement("a");
    link.href = `politics/index.html#p=${saved}`;
    link.textContent = `上次读到第 ${saved} 页，继续 →`;
    node.replaceChildren(link);
  }

  updatePoliticsResume();
  window.addEventListener("pageshow", updatePoliticsResume);
  route(true);
})();
