(() => {
  "use strict";

  const STORE_KEY = "politics-reader-page-v1";
  const PAGES_URL = new URL("pages.json", document.baseURI);
  const BASE_TITLE = "一页纸 · 2027 考研政治知识点手册";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const els = {
    image: document.getElementById("pageImage"),
    paper: document.getElementById("paper"),
    stage: document.getElementById("stage"),
    loader: document.getElementById("loader"),
    loaderText: document.getElementById("loaderText"),
    retry: document.getElementById("retry"),
    chapter: document.getElementById("chapterName"),
    pageNow: document.getElementById("pageNow"),
    pageAll: document.getElementById("pageAll"),
    progress: document.getElementById("progressFill"),
    pageStatus: document.getElementById("pageStatus"),
    prevEdge: document.getElementById("prevEdge"),
    nextEdge: document.getElementById("nextEdge"),
    prevButton: document.getElementById("prevButton"),
    nextButton: document.getElementById("nextButton"),
    counter: document.getElementById("counter"),
    tocOpen: document.getElementById("tocOpen"),
    tocDialog: document.getElementById("tocDialog"),
    tocClose: document.getElementById("tocClose"),
    tocNav: document.getElementById("tocNav"),
    tocGrid: document.getElementById("tocGrid"),
    tocMeta: document.querySelector(".toc-pages-head span"),
    fullscreen: document.getElementById("fullscreenToggle"),
  };

  const state = {
    pages: [],
    sections: [],
    index: -1,
    initialized: false,
    loadSeq: 0,
    loadTimer: 0,
    preloaded: new Set(),
    touchStart: null,
  };

  const pad = (n) => String(n).padStart(2, "0");

  function currentPage() {
    return state.pages[state.index] || null;
  }

  function clampPage(n) {
    const value = Number.parseInt(n, 10);
    if (!Number.isFinite(value)) return 1;
    return Math.min(Math.max(value, 1), state.pages.length);
  }

  function safeStorageGet() {
    try {
      return window.localStorage.getItem(STORE_KEY);
    } catch (error) {
      return null;
    }
  }

  function safeStorageSet(value) {
    try {
      window.localStorage.setItem(STORE_KEY, String(value));
    } catch (error) {
      /* 阅读位置保存失败不影响翻页 */
    }
  }

  function readHashPage() {
    const match = window.location.hash.match(/^#p=(\d+)$/);
    return match ? Number.parseInt(match[1], 10) : null;
  }

  function writeHashPage(n) {
    if (window.location.hash === `#p=${n}`) return;
    try {
      window.history.replaceState(null, "", `#p=${n}`);
    } catch (error) {
      /* file:// 等环境忽略 */
    }
  }

  function setLoading(show) {
    els.loader.hidden = !show;
  }

  function showLoadError() {
    window.clearTimeout(state.loadTimer);
    els.loader.hidden = false;
    els.loader.classList.add("is-error");
    els.loaderText.textContent = "这一页载入失败";
    els.retry.hidden = false;
  }

  function showBootError() {
    els.loader.hidden = false;
    els.loader.classList.add("is-error");
    els.loaderText.textContent = "目录载入失败，请刷新重试";
    els.retry.hidden = false;
  }

  function setFullscreenUi(active) {
    els.fullscreen.setAttribute("aria-pressed", String(active));
    els.fullscreen.setAttribute("aria-label", active ? "退出全屏" : "进入全屏");
    els.fullscreen.title = active ? "退出全屏（F）" : "全屏（F）";
    document.body.classList.toggle("is-fullscreen", active);
  }

  async function toggleFullscreen() {
    if (!document.fullscreenEnabled) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      /* iOS Safari 等不支持时静默忽略 */
    }
  }

  function updateTocState() {
    const page = currentPage();
    if (!page) return;

    for (const button of els.tocNav.children) {
      const start = Number(button.dataset.start);
      const end = Number(button.dataset.end);
      const active = page.n >= start && page.n <= end;
      button.classList.toggle("is-active", active);
      if (active) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    }

    for (const button of els.tocGrid.children) {
      const active = Number(button.dataset.page) === page.n;
      button.classList.toggle("is-current", active);
      if (active) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    }
  }

  function syncChrome(page) {
    const total = state.pages.length;
    els.pageNow.textContent = pad(page.n);
    els.pageAll.textContent = String(total);
    els.chapter.textContent = page.section;
    els.progress.style.transform = `scaleX(${page.n / total})`;

    const atStart = page.n <= 1;
    const atEnd = page.n >= total;
    els.prevButton.disabled = atStart;
    els.nextButton.disabled = atEnd;
    els.prevEdge.disabled = atStart;
    els.nextEdge.disabled = atEnd;

    els.counter.setAttribute(
      "aria-label",
      `第 ${page.n} 页，共 ${total} 页，当前 ${page.section}，打开目录`
    );
    els.pageStatus.textContent = `第 ${page.n} 页，共 ${total} 页，${page.section}`;
    document.title = page.n === 1 ? BASE_TITLE : `${pad(page.n)} · ${page.section} — 一页纸`;
    updateTocState();
  }

  function animatePage(direction) {
    if (!direction || reduceMotion || typeof els.image.animate !== "function") return;
    els.image.animate(
      [
        { opacity: 0.25, transform: `translateX(${direction * 16}px)` },
        { opacity: 1, transform: "translateX(0)" },
      ],
      {
        duration: 230,
        easing: "cubic-bezier(0.22, 0.75, 0.25, 1)",
      }
    );
  }

  function preloadAround(page) {
    for (const offset of [1, -1, 2]) {
      const target = state.pages[page.n - 1 + offset];
      if (!target || state.preloaded.has(target.src)) continue;
      state.preloaded.add(target.src);
      const image = new Image();
      image.decoding = "async";
      image.src = target.src;
    }
  }

  function renderPage(page, direction) {
    const seq = ++state.loadSeq;
    window.clearTimeout(state.loadTimer);
    els.loader.classList.remove("is-error");
    els.retry.hidden = true;

    if (!state.initialized) {
      setLoading(true);
      els.loaderText.textContent = "正在翻开…";
    } else {
      state.loadTimer = window.setTimeout(() => {
        if (seq !== state.loadSeq) return;
        setLoading(true);
        els.loaderText.textContent = "正在翻开…";
      }, 160);
    }

    const preload = new Image();
    preload.decoding = "async";

    preload.onload = () => {
      if (seq !== state.loadSeq) return;
      window.clearTimeout(state.loadTimer);

      els.image.src = page.src;
      els.image.alt = `第 ${page.n} 页，${page.section}`;

      const finish = () => {
        if (seq !== state.loadSeq) return;
        setLoading(false);
        els.paper.classList.add("is-ready");
        animatePage(direction);
        preloadAround(page);
      };

      if (typeof els.image.decode === "function") {
        els.image.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    };

    preload.onerror = () => {
      if (seq !== state.loadSeq) return;
      showLoadError();
    };

    preload.src = page.src;
  }

  function showPage(number, options = {}) {
    if (!state.pages.length) return;
    const target = clampPage(number);
    if (state.initialized && target === state.index + 1 && !options.force) {
      syncChrome(currentPage());
      return;
    }

    const previous = state.index;
    const direction = previous < 0 ? 0 : target >= previous + 1 ? 1 : -1;

    state.index = target - 1;
    const page = currentPage();
    state.initialized = true;

    syncChrome(page);
    renderPage(page, direction);

    if (!options.skipUrl) writeHashPage(target);
    safeStorageSet(target);
  }

  function go(delta) {
    if (!state.pages.length) return;
    const target = state.index + 1 + delta;
    if (target < 1 || target > state.pages.length) return;
    showPage(target);
  }

  function goTo(number) {
    showPage(number);
  }

  function buildToc() {
    const navFragment = document.createDocumentFragment();
    state.sections = [];

    for (const page of state.pages) {
      const last = state.sections[state.sections.length - 1];
      if (!last || last.name !== page.section) {
        state.sections.push({ name: page.section, start: page.n, end: page.n });
      } else {
        last.end = page.n;
      }
    }

    for (const section of state.sections) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "toc-section";
      button.dataset.start = String(section.start);
      button.dataset.end = String(section.end);

      const name = document.createElement("span");
      name.textContent = section.name;
      const range = document.createElement("small");
      range.textContent =
        section.start === section.end
          ? pad(section.start)
          : `${pad(section.start)}–${pad(section.end)}`;

      button.append(name, range);
      button.addEventListener("click", () => {
        goTo(section.start);
        closeToc();
      });
      navFragment.append(button);
    }

    els.tocNav.replaceChildren(navFragment);

    const gridFragment = document.createDocumentFragment();
    for (const page of state.pages) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "toc-page";
      button.dataset.page = String(page.n);
      button.textContent = pad(page.n);
      button.title = `第 ${page.n} 页 · ${page.section}`;
      button.setAttribute("aria-label", `第 ${page.n} 页，${page.section}`);
      button.addEventListener("click", () => {
        goTo(page.n);
        closeToc();
      });
      gridFragment.append(button);
    }

    els.tocGrid.replaceChildren(gridFragment);
    els.tocMeta.textContent = `${state.pages.length} 页`;
  }

  function openToc() {
    if (!state.pages.length) return;
    updateTocState();
    if (!els.tocDialog.open) els.tocDialog.showModal();
    window.requestAnimationFrame(() => {
      const activeSection = els.tocNav.querySelector(".is-active");
      if (activeSection) {
        activeSection.scrollIntoView({ block: "nearest", inline: "center" });
      }
      const current = els.tocGrid.querySelector(".is-current");
      if (current) {
        current.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    });
  }

  function closeToc() {
    if (els.tocDialog.open) els.tocDialog.close();
  }

  function bindEvents() {
    els.prevButton.addEventListener("click", () => go(-1));
    els.nextButton.addEventListener("click", () => go(1));
    els.prevEdge.addEventListener("click", () => go(-1));
    els.nextEdge.addEventListener("click", () => go(1));

    els.counter.addEventListener("click", openToc);
    els.tocOpen.addEventListener("click", openToc);
    els.tocClose.addEventListener("click", closeToc);
    els.tocDialog.addEventListener("click", (event) => {
      if (event.target === els.tocDialog) closeToc();
    });

    els.retry.addEventListener("click", () => {
      if (!state.pages.length) {
        window.location.reload();
        return;
      }
      const page = currentPage();
      if (page) renderPage(page, 0);
    });

    els.fullscreen.addEventListener("click", toggleFullscreen);
    document.addEventListener("fullscreenchange", () => {
      setFullscreenUi(Boolean(document.fullscreenElement));
    });

    document.addEventListener("keydown", (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;

      const target = event.target;
      const inField =
        target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if (inField) return;

      if (event.key === "m" || event.key === "M") {
        event.preventDefault();
        if (els.tocDialog.open) closeToc();
        else openToc();
        return;
      }

      if (event.key === "f" || event.key === "F") {
        if (document.fullscreenEnabled) {
          event.preventDefault();
          toggleFullscreen();
        }
        return;
      }

      if (els.tocDialog.open) return;

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        go(1);
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(-1);
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        showPage(1);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        showPage(state.pages.length);
        return;
      }

      if (event.key === " " || event.code === "Space") {
        const interactive =
          target instanceof HTMLElement &&
          (target.closest("button, a, input, textarea, select") !== null);
        if (interactive) return;
        event.preventDefault();
        go(1);
      }
    });

    els.stage.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length !== 1) {
          state.touchStart = null;
          return;
        }
        const touch = event.touches[0];
        state.touchStart = { x: touch.clientX, y: touch.clientY, at: Date.now() };
      },
      { passive: true }
    );

    els.stage.addEventListener(
      "touchend",
      (event) => {
        const start = state.touchStart;
        state.touchStart = null;
        if (!start || event.changedTouches.length !== 1) return;

        const touch = event.changedTouches[0];
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;
        const elapsed = Date.now() - start.at;

        if (elapsed > 800) return;
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
        go(dx < 0 ? 1 : -1);
      },
      { passive: true }
    );

    window.addEventListener("hashchange", () => {
      const page = readHashPage();
      if (page && page !== state.index + 1) showPage(page, { skipUrl: true });
    });
  }

  async function loadPages() {
    const response = await fetch(PAGES_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error("empty pages");

    return data.map((page, index) => ({
      n: index + 1,
      src: page.src,
      section: page.section || "正文",
    }));
  }

  async function init() {
    bindEvents();

    if (!document.fullscreenEnabled) {
      els.fullscreen.hidden = true;
    }

    try {
      state.pages = await loadPages();
    } catch (error) {
      showBootError();
      return;
    }

    buildToc();

    const hashPage = readHashPage();
    const savedPage = Number.parseInt(safeStorageGet() || "", 10);
    const start = hashPage || (Number.isFinite(savedPage) ? savedPage : 1);
    showPage(start, { skipUrl: false });
  }

  init();
})();
