# Context Engineering Kit

一套面向 AI 辅助编程的项目上下文管理工具包。适用于 Claude Code，核心思想可迁移到任何 AI 编程工具。

## 快速安装

```bash
# 方式一：在项目根目录执行
/path/to/context-engineering-kit/install.sh

# 方式二：指定目标项目
/path/to/context-engineering-kit/install.sh /path/to/your-project
```

安装后项目结构：

```
your-project/
├── CLAUDE.md              ← AI 项目说明书（需手动填写）
├── TASKS.md               ← 任务追踪
├── DECISIONS.md           ← 决策日志
├── memory/                ← 短期状态（AI 维护）
│   ├── current_state.md
│   ├── bugs.md
│   ├── experiments.md
│   ├── lessons_learned.md
│   └── daily_log.md
├── prompts/               ← 编码规范（人工定义）
│   ├── coding_rules.md
│   ├── style_guide.md
│   └── review_checklist.md
├── .claude/commands/      ← Claude Code 命令
│   ├── init-context.md
│   ├── start.md
│   └── wrap.md
└── src/                   ← 你的源代码
```

## 三个核心命令

| 命令 | 何时用 | 作用 |
|------|--------|------|
| `/init-context` | 新项目首次 | 分析项目 → 创建完整目录骨架 → 生成文档 |
| `/start` | 每天开始工作 | 读文档 + git 状态 → 恢复上下文 → 等待指令 |
| `/wrap` | 每天结束工作 | 总结今天 → 更新 memory → 写日志 |

## 每日工作流

```
/start → 编码工作 → /wrap
 ↑                    │
 └────────────────────┘  (循环)
```

1. `/start` — AI 读取项目文档和状态，30 秒恢复上下文
2. 编码工作 — 小步 git commit，决策追加 DECISIONS.md
3. `/wrap` — AI 自动更新 memory 文件，为下次会话做准备

## Kit 目录说明

```
context-engineering-kit/
├── install.sh           安装脚本
├── README.md            本文件
├── commands/            Claude Code 命令模板
│   ├── init-context.md  项目初始化
│   ├── start.md         恢复上下文
│   └── wrap.md          下班总结
├── templates/           纯空模板（不含项目内容）
│   ├── TASKS.md
│   ├── DECISIONS.md
│   ├── memory/
│   └── prompts/
└── docs/
    └── context-engineering-guide.md  完整开发指南
```

## 核心理念

> 真正高级的 AI 编程，不是"怎么提问"，而是"怎么管理上下文"。

- **状态外置化**：项目状态写入文件，不依赖 AI 记忆
- **文档驱动**：AI 每次通过文件恢复上下文，不靠对话历史
- **小步提交**：Git 记录演化历史，AI 可读可回溯
- **决策留痕**：记录"为什么"而不只是"做了什么"，防止 AI 推翻已定方案

详细指南见 [docs/context-engineering-guide.md](docs/context-engineering-guide.md)。
