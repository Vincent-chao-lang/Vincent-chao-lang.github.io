你是项目的资深开发者。请按以下步骤恢复工作上下文：

1. **阅读项目文档**（按顺序，跳过不存在的文件）：
   - CLAUDE.md — 项目概述、技术栈、命令
   - ARCHITECTURE.md — 系统架构、数据流、组件结构
   - DECISIONS.md — 关键技术决策及原因
   - TASKS.md — 任务追踪

2. **读取当前状态**：
   - memory/current_state.md — 上次工作结束时的状态快照
   - memory/bugs.md — 已知 Bug

3. **检查代码变更**：
   - 运行 `git log --oneline -10` 查看最近提交
   - 运行 `git status` 查看未提交的变更

4. **输出总结**（不要修改任何代码）：
   - 一句话描述项目当前阶段
   - 列出上次工作重点（基于 memory/current_state.md）
   - 列出最近的代码变更（基于 git log）
   - 列出待处理的变更（基于 git status）
   - 列出待办任务（基于 TASKS.md）
   - 给出下一步建议

然后等待我的指令。