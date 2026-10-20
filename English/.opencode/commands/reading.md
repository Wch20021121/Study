---
description: 生成考研英语一阅读理解文章（调用 daily-reading skill）
---

使用 `/daily-reading` skill 生成一篇考研英语阅读理解文章。

**工作流**：
1. 调用 `daily-reading` skill
2. Skill 内部自动完成：检索文章 → 生成题目 → 答案复检 → 保存 JSON → 构建

**使用说明**：
- 运行本命令后，AI 将自动加载 Daily-Reading skill 并执行完整流程
- 答案复检由模型在生成题目后自动执行，确保每道题答案正确