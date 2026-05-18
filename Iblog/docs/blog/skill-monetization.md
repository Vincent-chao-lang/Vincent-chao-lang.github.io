# Skill 能卖吗？—— 一个尴尬的商业模式

> Skill 的价值在于经验迁移，而经验一旦显性化就很难定价和保护。

---

## 一、卖 Skill 是件奇怪的事

奇怪在两个地方。

### 第一，边际复制成本为零，但定价依据是经验

卖 npm 包卖的是确定性逻辑——你买的是"这个函数跑对了"。价值可以按调用次数、按功能度量。

卖 Skill 卖的是什么？"我踩过这个坑，所以 prompt 里加了这句话"。一旦你看到了 prompt 文件，经验就迁移完了，卖方再也收不回来。这跟卖秘密一样——卖完就不值钱了。

### 第二，Skill 的输出不可承诺

软件卖了可以承诺"输入 x 输出 y"。Skill 卖了，你没法承诺"这个 Skill 一定识别对"。因为它本质是概率性的，受模型版本、上下文长度、输入质量影响。用户付了钱但结果不好，你说不清是 Skill 的问题还是模型的问题。

---

## 二、Skill 落在商业模式的无人区

```
卖软件    → 卖确定性逻辑，可以定价
卖咨询    → 卖经验和判断力，按时间定价
卖 Skill  → 卖……什么？经验的一次性拷贝？
```

它落在软件和咨询之间的一个尴尬位置：

- **比软件不值钱**——因为不可承诺确定性输出
- **比咨询不值钱**——因为交互是零，没有持续的判断力输出
- **比两者都脆弱**——一旦 AI 模型能力提升，很多 Level 1-2 的 Skill 会直接被模型原生能力覆盖，价值归零

---

## 三、市场确实存在，但卖的是什么

### Prompt 市场（成熟）

[PromptBase](https://promptbase.com/) — 27 万+ prompts，主要卖 Midjourney/ChatGPT 的 prompt，据称有人月入 $600。

### Claude Code Skills 市场（刚起步）

- [ClaudeSkills.info](https://claudeskills.info/skills/) — 140+ skills 市场
- [ClaudeMarketplaces.com](https://claudemarketplaces.com/) — 插件和 skills 目录
- [AgentPowers.ai](https://www.facebook.com/groups/vibecodinglife/posts/1967543460500848/) — 付费 skills 市场（建设中）
- Anthropic 官方维护了 [anthropics/skills](https://github.com/anthropics/skills) 仓库

### 已经有人在教怎么卖

- [How to Sell Claude Skills](https://ryandoser.com/sell-claude-skills/) — "打包卖几千美元"
- [Agent37: How to Monetize](https://www.agent37.com/blog/monetize-claude-code-skills) — 不给源码，托管访问
- [Reddit: Monetizing Claude Skills](https://www.reddit.com/r/ClaudeCode/comments/1rs3ezl/anyone_monetizing_their_claude_skills/) — 社区真实反馈

### 但这些市场里卖的大部分是什么

**Level 1 的模板 prompt。**

"用这个 prompt 让 ChatGPT 帮你写商业计划书"——这跟卖菜谱差不多。看一眼就会了，复制成本为零。

真正有价值的 Level 3 Skill（编码了隐性经验的）很难卖，因为：

- 经验深度买家一开始看不出来
- 一旦看到内容就能复制，没有复购
- 模型升级后可能直接贬值

---

## 四、卖铲子给淘金者

目前的市场形态更像是一场淘金热——真正赚钱的可能不是卖 Skill 本身，而是**教别人怎么卖 Skill 的那些教程和课程**。

这几乎成了 AI 领域的固定套路：

```
第一波人：用 AI 做出东西
第二波人：教别人怎么用 AI 做东西
第三波人：教别人怎么教别人用 AI 做东西
```

Skill 市场目前停在第二波。

---

## 五、真正能卖的是什么

如果 Skill 本身很难单独卖，那什么能卖？

| 能卖的 | 本质 | 模式 |
|-------|------|------|
| 持续更新的经验 | 经验不是一次性的，是持续的 | 订阅制 |
| 领域专家的背书 | "十年税务专家调校的" | 品牌溢价 |
| 配套的验证和维护 | 不只是 prompt，还有测试用例和迭代 | 服务制 |
| 围绕 Skill 的解决方案 | Skill + 工具 + 流程 + 支持 | 项目制 |

但这就不再是卖 Skill 了，是**卖服务**。Skill 只是个交付载体。

---

## 六、结论

```
Skill 的价值链：

经验 → 显性化 → Skill 文件 → 交付给用户
  ↑                              ↓
  定价依据：经验深度              实际价值：一次性拷贝
                                  ↓
                              复制成本：零
                              可承诺性：不可承诺
                              贬值风险：模型升级即贬值
```

Skill 的价值在于经验迁移，而经验一旦显性化就很难定价和保护。

能卖的是围绕 Skill 的服务，不是 Skill 本身。Skill 是入口，不是产品。

---

*Sources:*
- [PromptBase](https://promptbase.com/)
- [Anthropic Skills Repo](https://github.com/anthropics/skills)
- [Claude Code Skills Docs](https://code.claude.com/docs/en/skills)
- [Reddit: Monetizing Claude Skills](https://www.reddit.com/r/ClaudeCode/comments/1rs3ezl/anyone_monetizing_their_claude_skills/)
- [How to Sell Claude Skills](https://ryandoser.com/sell-claude-skills/)
- [Agent37: Monetize Guide](https://www.agent37.com/blog/monetize-claude-code-skills)
