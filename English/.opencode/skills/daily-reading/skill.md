---
name: daily-reading
description: 生成考研英语一阅读理解文章（包含答案复检）
---

# Daily-Reading Skill

生成符合考研英语一难度的阅读理解文章，包含完整的题目、答案解析和重难点单词。

## 核心原则

1. **文章生成以 AI 知识为核心**——不依赖实时网络爬取（网络不稳定），使用 AI 内部知识生成高质量学术文章
2. **可调用辅助技能**：使用 `tavily-research` 做深度研究（可选），使用 `web-scraping` 辅助背景调研（谨慎）
3. **所有变更只能通过 JSON 文件**，严禁直接修改 `article.js` 或 `words.js`
4. **答案复检是强制步骤**，不可跳过

---

## 写作风格指南（参考 scientific-writing 技能）

### 考研阅读文章的特征

考研阅读文章属于**学术说明文/议论文**，语言特征如下：

| 特征 | 含义 | 示例 |
|------|------|------|
| 客观陈述 | 第三人称视角，避免 "I think" | "It is argued that..." |
| 学术模糊词 | may/might/suggest/appear/indicate | "These findings may suggest..." |
| 被动语态 | 施动者不明确时使用 | "It has been found that..." |
| 复杂句式 | 从句、插入语、倒装混合 | "Although..., ..." |
| 专家引述 | experts say / researchers suggest（无真实姓名）| "Experts suggest that..." |

**语言等级**：考研文章 = 学术期刊入门水平，词汇量、句式复杂度均高于四六级

**示范段落（可直接模仿结构）**：

```
Artificial intelligence systems have increasingly been deployed across consequential domains, from criminal sentencing to medical diagnosis, yet concerns persist regarding the transparency of the decision-making processes underlying these applications. It has been argued that the opacity of machine learning models constitutes what researchers term an "accountability gap," whereby the individuals adversely affected by algorithmic decisions are unable to ascertain the reasoning underlying those determinations. Empirical studies suggest that such opacity may exacerbate existing social inequities, particularly in contexts where historical data reflects patterns of systemic discrimination. For instance, a 2023 analysis of automated hiring systems found that algorithmic screening procedures disproportionately disadvantaged applicants from certain demographic backgrounds, raising questions about the equity implications of technological deployment in high-stakes decision-making contexts. Nevertheless, the precise mechanisms through which algorithmic bias manifests remain incompletely understood, and researchers have cautioned against premature regulatory interventions in the absence of comprehensive empirical grounding.
```

---

## 工作流程

### 阶段一：读取当前日期

**必须首先执行**：

```bash
date "+%m-%d" && date "+%B" | tr '[:upper:]' '[:lower:]'
```

输出示例：`05-10` 和 `may`

根据输出确定：
- **文件名**：`{月}-{日}.json`（如 `5-10.json`，日期**不补零**）
- 存储目录：`READ/data/{月份英文小写}/`（如 `READ/data/may/`）
- JSON 字段：`"date": "{月}/{日}"`，`"month": {数字}`，`"day": {数字}`

**检查重复**：
1. 检查 `READ/data/{月份}/` 目录下是否已存在当天的 JSON 文件
2. 确认当天文件不存在后才能继续

### 阶段二：生成文章（可选用辅助技能）

**推荐方式**：直接使用 AI 知识生成文章（快速、稳定）

**可选方式**：使用 tavily-research 做深度研究，获取更多事实和数据

```bash
tvly research "算法偏见 AI bias 学术研究 数据" --model mini
```

**不推荐**：web-scraping（因网络不稳定，曾多次失败）

---

## 主题选择

从以下高频主题中选择**一个**（确保与已有文章主题不重复）：

| 类别 | 可选主题 |
|------|----------|
| 科技与人工智能 | AI伦理、算法偏见、数字鸿沟、数据隐私、社交媒体影响 |
| 全球经济 | 供应链重构、贸易格局、就业市场转型、自动化替代 |
| 教育与社会 | 高等教育不平等、职业教育、技能培训、教育成本 |
| 环境与气候 | 碳中和路径、气候变化、可再生能源、生物多样性 |
| 心理与认知 | 行为经济学、决策偏差、幸福研究、心理健康 |
| 法律与伦理 | 科技监管、数据权利、知识产权、隐私保护 |
| 文化与传播 | 虚假信息、媒体素养、数字极化、新闻业危机 |

---

## 文章结构要求

**段落数量**：3-5段，**无固定模板**，根据内容自然分段

**论证逻辑**（可参考但非固定）：
1. 引入问题/现象
2. 阐述原因或背景
3. 提供证据（数据/研究/专家观点）
4. 分析影响或讨论
5. 总结或展望

**内容质量标准**：
- 必须包含**具体数据**（如 "23%"、"2019 study"、"approximately 1.5 billion"）
- 必须包含**专家观点**（以 "experts say"、"researchers suggest" 方式，不出现真实姓名）
- 必须包含**研究引用**（如 "A study published in..."、"research indicates..."）
- 论证层次清晰：观点→证据→结论

**字数**：500-550词

---

## 题目设计

### 六种题型（考研全部题型）

| 题型 | 标志词 | 考查重点 |
|------|--------|----------|
| 词义推断题 | "most probably means"、"closest in meaning" | 生词/短语在语境中的精确含义 |
| 细节理解题 | "according to the passage"、"states that" | 原文具体信息的准确理解 |
| 推理判断题 | "it can be inferred"、"the author implies" | 基于原文的合理推断（含隐含信息） |
| 主旨大意题 | "the best title"、"the main idea"、"primarily concerned with" | 文章中心思想 |
| 态度观点题 | "the author's attitude"、"the tone is" | 作者或文中人物的态度 |
| 例证题 | "mentions X in order to"、"the example illustrates" | 例子在论证中的作用 |

**设计要求**：5道题尽量覆盖**不同题型**（至少3种），避免全部为细节题

### 干扰项错误类型（必须明确分类）

| 错误类型 | 特征 | 制造方法 |
|----------|------|----------|
| **无中生有** | 选项内容在原文中完全找不到依据 | 添加原文中未提及的信息（如性别、地区、时间等） |
| **正反颠倒** | 选项态度/方向与原文相反 | 原文说"有益"，选项说"有害"；原文说"增加"，选项说"减少" |
| **范围不当** | 选项范围过大/过小，或程度不符 | 原文说"部分"，选项说"全部"；原文说"可能"，选项说"必然" |
| **偷换概念** | 使用原文词汇但含义改变 | 原文"correlation"，选项变成"causation"；原文"increase"，选项变成"decrease" |
| **过度推断** | 基于原文信息过度推测 | 原文说"有关联"，选项说"必然导致"；原文说"研究显示"，选项说"已经证明" |

### 正确答案特征

- 通常为原文句子的**同义改写**，不直接引用原文
- 使用不同词汇表达相同语义
- 程度、范围与原文一致
- **不使用**"以下全部正确"等过于明显的提示

### 答案分布要求

- A/B/C/D 各至少出现**1次**
- 不能有**3个以上连续相同**的答案
- **答案顺序必须随机化**——不要按照 A→B→C→D 的固定顺序排列答案，也不要按照任何规律性模式（如 ABCDA、BDACA 等）排列
- 设计完答案后，随机打乱排列顺序，确保答案序列无明显规律

### 答案设计原则

生成答案时，不要按顺序填写"A、B、C、D"。正确答案是哪个，就放在那个位置，然后其他三个干扰项随机填充剩余位置。

例如，不要这样设计：
```
答案是B → A:B, B:C, C:D, D:A （固定顺序）
```

而应该随机决定每个正确答案的位置：
```
Q1答案是B → 随机放在第2位
Q2答案是A → 随机放在第1位
Q3答案是C → 随机放在第3位
...
```

最终答案序列示例（如5道题）：B、A、D、B、C（无规律）

### 解析要求

每道题的每个选项都必须有解析，**必须指出错误类型**：

```json
{
  "answer": "B",
  "explanation": {
    "A": "错误。无中生有——原文未提及...，选项说...",
    "B": "正确。同义改写——原文...对应选项...",
    "C": "错误。正反颠倒——原文明确指出...，而选项说...",
    "D": "错误。范围不当——原文说的是...，选项扩大为..."
  }
}
```

---

## 单词筛选

### 格式要求（重要！）

**words 字段必须是包含 word 和 def 的对象数组**，而非字符串数组。每个单词必须自带翻译。

```json
"words": [
  {"word": "proliferation", "def": "激增，扩散"},
  {"word": "misinformation", "def": "错误信息"},
  {"word": "confirmation bias", "def": "确认偏误"}
]
```

**错误格式**（不可使用）：
```json
"words": ["proliferation", "misinformation", "confirmation bias"]
```

### 高质量词汇标准（必须保留）

- 考研的重难点词汇（如 proliferation, misinformation, confirmation bias）
- 考研超纲词汇（如 confabulation, ubiquitous, exacerbate）
- **8字母以上**的学术词汇（如 disaggregation, cardiovascular, epistemological）
- 学科专业术语（如 meta-analysis, longitudinal, correlation, algorithmic）
- 动词名词化、形容词副词化等复杂用法
- 词义推断题考点词

### 过滤词汇（禁止出现）

- 基础常见词：text, paragraph, study, research, important, change, problem
- 简单动词：make, get, give, know, think, see, say, use
- 常见形容词：good, new, big, high, small
- 简单副词：very, really, often, always, never, just, also
- 代词/介词/冠词：the, a, an, this, that, they, we

### 翻译要求

每个单词的 `def` 必须是**准确的学术翻译**，不能是直译或错译。
- 优先使用已有词汇的约定俗成翻译
- 避免生造词组或直译英文结构
- 专有名词需注明领域（如"新烟碱类（农药）"）

**提取数量**: 无上限，满足质量要求即可

---

## 答案复检（强制执行）

生成 JSON 后，必须进行以下验证：

### 复检清单

| 检查项 | 要求 | 不通过处理 |
|--------|------|-----------|
| 答案依据 | 正确答案在原文中有**明确句子**支撑 | 修正答案 |
| 干扰项分类 | 每个干扰项能归入五种错误类型之一 | 修正选项 |
| 解析准确性 | 解析能清楚说明为何正确/错误，并指出错误类型 | 修正解析 |
| 答案分布 | A/B/C/D 各≥1次，无3个以上连续相同 | 调整答案 |
| 词汇质量 | ≥20个超纲学术词汇，无基础词混入 | 补充或修正 |
| 题型覆盖 | 至少覆盖3种不同题型 | 调整题目 |
| 字数检查 | text 字段 500-550 词 | 调整内容 |
| **单词翻译** | 所有 words 字段中的单词都能在 WORD_DEF 中查到准确翻译 | 查不到的词需替换为已在字典中的词，或添加到 build.py |

### 复检执行步骤

1. **逐题核对原文**：提取每题正确答案所在原文句子
2. **验证干扰项类型**：确认每个干扰项属于哪种错误类型
3. **检查解析逻辑**：解析是否能区分正确/错误选项
4. **修正并更新**：发现问题立即修正

### 单词翻译核验（强制步骤）

生成 JSON 后，**必须检查** words 字段中的每个单词都有准确的 `def` 翻译。

**处理方式**：
- 如果翻译不准确或缺失 → 修正 `def` 字段的值
- 如果单词属于常见基础词混入 → 删除并替换为其他超纲词汇
- **翻译由 AI 在 JSON 中直接提供**，不再依赖 build.py 字典

---

## 阶段三：保存 JSON 文件

**只写 JSON 文件**，严禁直接修改 `article.js` 或 `words.js`

```json
{
  "date": "5/10",
  "month": 5,
  "day": 10,
  "title": "Article Title",
  "text": "段落1...\n\n段落2...\n段落3...\n\n段落4...\n\n段落5...",
  "questions": [...],
  "words": [
    {"word": "proliferation", "def": "激增，扩散"},
    {"word": "misinformation", "def": "错误信息"}
  ]
}
```

**注意**：words 字段中每个单词必须自带准确翻译，由 AI 在生成时一并提供，而非依赖 build.py 翻译。

---

## 阶段四：执行构建脚本

```bash
python3 temp/build.py
```

构建脚本会：
1. 读取 `READ/data/` 下所有 JSON 文件
2. 合并到 `READ/data/article.js` 和 `READ/data/words.js`

**确认输出**：`✅ 构建完成，所有验证通过！`

---

## 质量达标标准

| 标准 | 最低要求 |
|------|----------|
| 总词数 | 500-550词 |
| 超纲词汇 | ≥20个（>8字母） |
| 复杂句式 | 多重复合句，被动语态，插入语 |
| 数据支撑 | ≥3个数字/年份/百分比 |
| 专家引述 | ≥2处（"experts say"风格，无真实姓名） |
| 题目数量 | 5道（5题5答5解析） |
| 题型覆盖 | ≥3种不同题型 |
| 答案分布 | A/B/C/D 各≥1次 |
| 干扰项分类 | 每题4选项都能归入五种错误类型之一 |

---

## 重要规则

- 🚫 **严禁直接修改** `article.js` 或 `words.js`
- ✅ **只写 JSON 文件**，`article.js` 和 `words.js` 由 `build.py` 自动生成
- ✅ 修改后必须运行 `python3 temp/build.py`
- ✅ 答案复检是**强制步骤**，不可跳过
- ✅ text 字段使用 `\n\n`（非 `\\n\\n`）分段
- ✅ 文章语言需达到考研水平：学术说明文风格，被动语态，模糊词（may, suggest）
- ✅ 专家引述不出现真实姓名，使用 "experts say" / "researchers suggest" 风格