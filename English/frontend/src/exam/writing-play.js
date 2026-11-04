(() => {
  "use strict";

  const VERSION = window.__WRITING_VERSION__ || "1";
  const DATA_URL = `../assets/writing-bank/prompts.json?v=${VERSION}`;
  const DRAFT_KEY = "dse-writing-draft-v1";
  const SCORE_KEY = "dse-writing-score-v1";
  const SEEN_KEY = "dse-writing-seen-v1";
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const nl2br = (s) => esc(s).replace(/\n/g, "<br>");

  const state = {
    data: null,
    mode: "all",
    prompt: null,
    draftTimer: null,
  };

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
      all: "随机作文", partA: "应用文", partB: "短文写作",
      picture: "图画作文", chart: "图表作文", letter: "书信 / 邮件", notice: "通知 / 告示",
    }[id] || "随机作文";
  }

  async function fetchJSON(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`请求失败（${response.status}）`);
    return response.json();
  }

  function matchesMode(prompt, mode) {
    if (mode === "all") return true;
    if (mode === "partA") return prompt.part === "A";
    if (mode === "partB") return prompt.part === "B";
    if (mode === "picture") return prompt.templateId === "picture";
    if (mode === "chart") return ["chart", "picture-chart"].includes(prompt.templateId);
    if (mode === "letter") return prompt.templateId === "letter";
    if (mode === "notice") return prompt.templateId === "notice";
    return true;
  }

  function pickPrompt(data, mode) {
    const candidates = (data.prompts || []).filter((p) => matchesMode(p, mode));
    if (!candidates.length) throw new Error("这个模式暂时没有作文题");
    const seenAll = readJSON(SEEN_KEY, {});
    const seen = new Set(Array.isArray(seenAll[mode]) ? seenAll[mode] : []);
    let pool = candidates.filter((p) => !seen.has(p.id));
    if (!pool.length) {
      pool = candidates;
      delete seenAll[mode];
      localStorage.setItem(SEEN_KEY, JSON.stringify(seenAll));
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function markSeen(prompt, mode) {
    const seenAll = readJSON(SEEN_KEY, {});
    const list = Array.isArray(seenAll[mode]) ? seenAll[mode] : [];
    if (!list.includes(prompt.id)) list.push(prompt.id);
    seenAll[mode] = list;
    localStorage.setItem(SEEN_KEY, JSON.stringify(seenAll));
  }

  function wordCount(text) {
    const words = String(text || "").trim().split(/\s+/).filter(Boolean);
    return words.length;
  }

  function renderPicture(picture) {
    if (!picture) return "";
    if (picture.src) {
      return `<figure class="writing-picture"><div><img src="${esc(picture.src)}" alt="${esc(picture.caption || "作文图片")}" loading="lazy"><figcaption class="writing-figcaption">${esc(picture.caption || "")}</figcaption></div></figure>`;
    }
    if (picture.child || picture.father) {
      return `<div class="writing-dialogue"><p>孩子：${esc(picture.child || "")}</p><p>父亲：${esc(picture.father || "")}</p>${picture.caption ? `<p class="writing-figcaption">${esc(picture.caption)}</p>` : ""}</div>`;
    }
    return "";
  }

  function setMeta(prompt) {
    $("#metaYear").textContent = prompt.year;
    $("#metaPart").textContent = `Part ${prompt.part} · ${prompt.part === "A" ? "应用文" : "短文写作"}`;
    $("#metaType").textContent = prompt.typeLabel || prompt.templateName || "";
    $("#metaScore").textContent = `${prompt.score} 分 · ${prompt.words || ""}`;
    $("#modeYear").textContent = prompt.year;
    $("#modeName").textContent = modeLabel(state.mode);
    $("#promptTitle").textContent = prompt.title || "";
    $("#promptEn").textContent = prompt.prompt || "";
    $("#promptZh").textContent = prompt.prompt_zh || "";
    $("#promptWords").textContent = prompt.words || "";
    $("#targetWords").textContent = prompt.words || "";
    $("#pictureMount").innerHTML = renderPicture(prompt.picture);
    $("#templateLink").href = `index.html#${encodeURIComponent(prompt.templateId || "letter")}`;
    document.title = `随机作文 · ${prompt.year} 英语（一）`;
  }

  function draftFor(id) {
    const drafts = readJSON(DRAFT_KEY, {});
    return typeof drafts[id] === "string" ? drafts[id] : "";
  }

  function saveDraft(id, text) {
    const drafts = readJSON(DRAFT_KEY, {});
    drafts[id] = text;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
  }

  function updateWordCount() {
    const text = $("#writingInput").value;
    $("#wordCount").textContent = `${wordCount(text)} words`;
  }

  function setScore(prompt) {
    const scores = readJSON(SCORE_KEY, {});
    const value = Number(scores[prompt.id]) || 0;
    const input = $("#selfScore");
    if (input) input.value = value;
  }

  function renderReference(prompt) {
    const sample = prompt.sample || "这道题暂时没有参考范文。";
    const structure = (prompt.structure || []).map(([label, text]) => `<li><b>${esc(label)}</b><span>${esc(text)}</span></li>`).join("");
    const expressions = (prompt.expressions || []).map((x) => `<li>${esc(x)}</li>`).join("");
    const traps = (prompt.traps || []).map((x) => `<li>${esc(x)}</li>`).join("");
    const scores = readJSON(SCORE_KEY, {});
    const score = Number(scores[prompt.id]) || 0;
    $("#referenceMount").innerHTML = `<div class="reference-head">
      <div><p class="section-kicker">Model answer</p><h2>标准参考范文</h2><p>${esc(prompt.templateName || "通用模板")} · 按模板拆解</p></div>
      <span class="reference-score">${prompt.score} 分</span>
    </div>
    <div class="reference-sample">${nl2br(sample)}</div>
    <details class="reference-translation"><summary>参考译文</summary><p>${nl2br(prompt.sample_zh || "暂无译文")}</p></details>
    <div class="reference-grid">
      <section><h3>模板拆解</h3><ol class="reference-structure">${structure}</ol></section>
      <section><h3>可替换表达</h3><ul class="reference-list">${expressions}</ul></section>
    </div>
    ${traps ? `<div class="reference-traps"><b>易错点</b><ul class="reference-list">${traps}</ul></div>` : ""}
    <div class="reference-foot">
      <label>自评 <input type="number" min="0" max="${prompt.score}" step="1" id="selfScore" value="${score}"> / ${prompt.score}</label>
      <a class="text-link" href="../analysis/${prompt.year}.html#writing" target="_blank" rel="noopener">看这道题的完整解析 →</a>
    </div>`;
    $("#referenceMount").hidden = false;
    $("#submitWriting").hidden = true;
    $("#nextWriting").hidden = false;
    $("#selfScore")?.addEventListener("input", (event) => {
      const max = prompt.score;
      const value = Math.max(0, Math.min(max, Number(event.target.value) || 0));
      const all = readJSON(SCORE_KEY, {});
      all[prompt.id] = value;
      localStorage.setItem(SCORE_KEY, JSON.stringify(all));
    });
    $("#referenceMount").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderPrompt(prompt) {
    state.prompt = prompt;
    const url = new URL(location.href);
    url.searchParams.set("mode", state.mode);
    url.searchParams.set("id", prompt.id);
    history.replaceState(null, "", url);
    setMeta(prompt);
    const input = $("#writingInput");
    input.value = draftFor(prompt.id);
    updateWordCount();
    setScore(prompt);
    $("#referenceMount").hidden = true;
    $("#referenceMount").innerHTML = "";
    $("#submitWriting").hidden = false;
    $("#nextWriting").hidden = true;
    $("#writingCard").hidden = false;
    $("#writingLoading").hidden = true;
    markSeen(prompt, state.mode);
  }

  function clearDraft() {
    if (!state.prompt) return;
    if (!window.confirm("清空这道题的草稿？")) return;
    const drafts = readJSON(DRAFT_KEY, {});
    delete drafts[state.prompt.id];
    localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
    $("#writingInput").value = "";
    updateWordCount();
    showToast("草稿已清空");
  }

  function submitWriting() {
    if (!state.prompt) return;
    saveDraft(state.prompt.id, $("#writingInput").value);
    const text = $("#writingInput").value.trim();
    if (!text && !window.confirm("还没有写内容，直接查看参考范文？")) return;
    renderReference(state.prompt);
  }

  function nextPrompt() {
    if (!state.data) return;
    if (state.prompt) saveDraft(state.prompt.id, $("#writingInput").value);
    const prompt = pickPrompt(state.data, state.mode);
    const url = new URL(location.href);
    url.searchParams.delete("id");
    url.searchParams.set("mode", state.mode);
    history.replaceState(null, "", url);
    renderPrompt(prompt);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function init() {
    const params = new URLSearchParams(location.search);
    const requested = params.get("mode") || "all";
    const id = params.get("id");
    try {
      const data = await fetchJSON(DATA_URL);
      state.data = data;
      state.mode = (data.modes || []).some((m) => m.id === requested) ? requested : "all";
      let prompt = id ? (data.prompts || []).find((p) => p.id === id) : null;
      if (!prompt) prompt = pickPrompt(data, state.mode);
      renderPrompt(prompt);
    } catch (error) {
      $("#writingLoading").textContent = `作文题读取失败：${error.message}。请确认页面通过 HTTP 打开。`;
    }
  }

  $("#writingInput")?.addEventListener("input", () => {
    updateWordCount();
    if (!state.prompt) return;
    window.clearTimeout(state.draftTimer);
    state.draftTimer = window.setTimeout(() => saveDraft(state.prompt.id, $("#writingInput").value), 400);
  });
  $("#submitWriting")?.addEventListener("click", submitWriting);
  $("#nextWriting")?.addEventListener("click", nextPrompt);
  $("#skipButton")?.addEventListener("click", nextPrompt);
  $("#clearDraft")?.addEventListener("click", clearDraft);

  init();
})();
