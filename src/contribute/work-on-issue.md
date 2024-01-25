---
title: 处理议题
eleventyNavigation:
    key: work on issues
    parent: contribute to eslint
    title: 处理议题
    order: 9
---

我们公开的[议题追踪器](https://github.com/eslint/eslint/issues)列出了所有我们计划去做的事，以及来自社区的建议。在开始着手处理议题前，请确保读完本页面的其余部分。

## 议题标签

我们给议题状态打上标签。[维护 ESLint 文档](../maintain/manage-issues#当有新议题或拉取请求时)中有关于标签最完整的文档，但本页的信息对大多数贡献者足够了。作为贡献者，标签可以回答你最重要的问题有：

1. 我可以就这个议题工作吗？如果你对向 ESLint 贡献没有或者经验不多，那么 [`good first issue`](https://github.com/eslint/eslint/labels/good%20first%20issue) 标签标记的议题就很适合你。否则，你可以选择来自 [`help wanted`](https://github.com/eslint/eslint/labels/help%20wanted) 标签的邀请。如果你有足够的经验，你可以尝试 [`accepted`](https://github.com/eslint/eslint/labels/accepted) 标签。此外，议题如果还没有准备好就会打上 `triage`、`evaluating` 或 `needs bikeshedding` 标签，而由于其他原因目前不能工作的问题，如依赖的错误，则被标记为 `blocked`。
1. 这个问题是关于什么的？描述议题性质的标签包括 `bug`、`enhancement`、`feature`、`question`、`rule`、`documentation`、`core`、`build`、`cli`、`infrastructure`、`breaking` 和 `chore`。这些都在[维护 ESLint 文档](../maintain/manage-issues#分类议题和拉取请求)中有所记载。
1. 先解决哪个议题？因为存在很多议题，因此对议题优先级进行了排序。以下是从高到低的优先级列表：

    1. **漏洞** - 项目的问题正在积极影响用户。我们希望尽可能快地解决这些问题。
    1. **文档** - 文档问题是错误的一种类型，因为它们积极地影响着当前的用户。因此，我们希望尽可能快地解决文档问题。
    1. **功能** - 新的功能将在未来帮助用户。
    1. **增强** - 要求对现有功能进行改进。
    1. **其他** - 其他的东西。

    部分议题会有赏金激励。这些议题被标记为 `bounty`。赏金通过 [BountySource](https://www.bountysource.com/teams/eslint/issues) 进行分配。

## 开始工作

如果你想为某个议题工作，请在该议题上评论说明这一点，并指出你认为你将在什么时候完成它。这将有助于避免重复工作。一些好的评论的示例有：

* "I'll take a look at this over the weekend."（“我打算在这个周末看一下这个议题”）
* "I'm going to do this, give me two weeks."（“我打算完成它，请给我两周时间”）
* "Working on this" (as in, I'm working on it right now)（“正在努力解决”）

如果议题已经被人认领，请尊重那个人完成工作的愿望，除非你确认他们不再有兴趣，否则不要在这个问题上工作。

如果你发现你不能完成这项工作，那么只需添加一个评论，让人们知道，例如：

* "Sorry, it looks like I don't have time to do this."（“抱歉，我可能没有时间完成它了。”）
* "I thought I knew enough to fix this, but it turns out I don't."（“我以为我能解决这个议题，但事实证明我不行。”）

如果你无法完成议题，没有人会责怪你退缩。我们只是想让这个过程尽可能有效地进行下去。
