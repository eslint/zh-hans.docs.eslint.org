---
title: 拉取请求
layout: doc

---

如果你想为 ESLint 仓库做贡献，请使用 GitHub pull request。这是我们评估你的代码并将其合并到代码库的最快方式。请不要用代码片断来提交问题。这样做意味着我们需要手动合并这些变化，并更新任何适当的测试。这降低了你的代码被及时纳入的可能性。请使用拉动请求。

## 开始工作

如果你想在拉动请求上工作，而你以前从未提交过代码，请遵循以下步骤。

1. 建立[开发环境](../development-environment)。
1. 如果你想实现一个突破性的改变或对核心的改变，确保有一个描述你正在做什么的问题，并且该问题已经被接受。你可以创建一个新的议题，或者只是表明你在[处理一个现有的议题](working-on-issues)。错误修复、文档修改和其他拉动请求不需要一个议题。

在这之后，你就可以开始处理代码了。

## 使用代码工作

提交拉动请求的过程是相当直接的，一般来说每次都遵循相同的模式：

1. [创建新分支](#step1)
2. [进行修改](#step2)
3. [变基到上游](#step3)
4. [运行测试](#step4)
5. [二次检查提交](#step5)
6. [推送更改](#step6)
7. [发布拉动请求](#step7)

关于每个步骤的细节见下文。

### 第一步：创建新分支<a name="step1"></a>

发送拉动请求的第一步是在你的 ESLint 分叉中创建一个新的分支。给这个分支起一个描述性的名字，描述你要修复的内容，比如说“

```shell
git checkout -b issue1234
```

你应该在这个分支中完成所有问题的开发。

**注意**：不要将多个问题的修复合并到一个分支中。每个正在处理的问题都要有一个独立的分支。

### 第二步：进行修改<a name="step2"></a>

对代码和测试进行修改，在修改过程中遵循 [代码约定](../code-conventions)。完成后，将修改提交到你的分支。

```shell
git add -A
git commit
```

所有 ESLint 项目的提交信息都遵循 [Conventional Commits](https://www.conventionalcommits.org/)。下面是一个提交信息的例子。

```txt
tag: Short description of what you did

Longer description here if necessary

Fixes #1234
```

提交信息的第一行（摘要）必须有一个特定的格式。这个格式是由我们的构建工具检查的。

`tag` 是以下其中之一：

* `fix` - 表示漏洞修复。
* `feat` - 用于向后兼容的增强，或用于增加报告问题的规则修改。
* `fix!` - 用于一个向后不兼容的错误修复。
* `feat!` - 用于向后兼容的增强或功能。
* `docs` - 只对文档进行修改。
* `chore` - 用于非面向用户的修改。
* `build` - 只对构建过程进行修改。
* `refactor` - 不影响 API 或用户体验的修改。
* `test` - 只是对测试文件的修改。
* `ci` - 对我们的 CI 配置文件和脚本的修改。
* `perf` - 修改代码以提高性能。

使用[你正在处理的问题的标签](working-on-issues#issue-labels)来确定最佳标签。

消息摘要应该是对修改的一句话描述，长度必须是 72 个字符或更短。如果拉动请求解决了一个问题，那么在提交信息的正文中应该提到问题编号，格式为 `Fixes #1234`。如果提交的内容没有完全解决该问题，那么就用 `Refs #1234` 代替 `Fixes #1234`。

下面是一些好的提交信息摘要例子。

```txt
build: Update Travis to only test Node 0.10
fix: Semi rule incorrectly flagging extra semicolon
chore: Upgrade Esprima to 1.2, switch to using comment attachment
```

提交信息的格式很重要，因为这些信息被用来为每个版本创建一个更新日志。标签和议题编号有助于创建更加一致和有用的更新日志。

### 第三步：变基到上游<a name="step3"></a>

在你发送拉动请求之前，一定要重新建立上游源代码。这可以确保你的代码是在最新的可用代码上运行。

```shell
git fetch upstream
git rebase upstream/main
```

### 第四步：运行测试<a name="step4"></a>

重新发布后，请确保再次运行所有的测试，以确保没有任何损坏。

```shell
npm test
```

如果有任何失败的测试，更新你的代码，直到所有测试都通过。

### 第五步：再次检查提交<a name="step5"></a>

当你的代码准备好了，这是一个很好的时间来仔细检查你的提交，以确保它遵循我们的惯例。以下是需要检查的事项：

* 确保你的提交格式正确。
* 拉动请求必须有一个描述。说明应该解释你做了什么，以及如何看到其效果。
* 提交消息的格式要正确。
* 该改动没有引入功能上的退步。在提交拉动请求之前，一定要运行`npm test`来验证你的改动。
* 为不相关的改动提出单独的拉动请求。有多个不相关变化的大型拉动请求可能会被关闭而不被合并。
* 所有的修改都必须有测试，即使你正在做的功能以前没有测试。
* 所有面向用户的修改必须有适当的文档。
* 遵循[代码约定](../code-conventions)。

### 第六步：提交更改<a name="step6"></a>

接下来，把你的改动推送到你的克隆中：

```shell
git push origin issue1234
```

If you are unable to push because some references are old, do a forced push instead:

```shell
git push -f origin issue1234
```

### 第七步：发布拉取请求<a name="step7"></a>

现在你已经准备好发送拉动请求了。进入你的 ESLint 分叉，然后按照 [GitHub 文档](https://help.github.com/articles/creating-a-pull-request)中的方法发送拉动请求。

为了向 ESLint 项目提交代码或文档，当你发送第一个拉动请求时，你会被要求签署我们的 CLA（阅读更多关于 Open JS 基金会 CLA 程序的信息，请访问<https://cla.openjsf.org/>)。

## 后续行动

一旦你的拉动请求被发送，就到了团队审查的时候了。因此，请确保：

1. 监控你的拉动请求的 Travis CI 构建的状态。如果它失败了，请调查原因。我们不能合并因任何原因导致 Travis 失败的拉动请求。
1. 回应团队成员对拉动请求的评论。记住，我们想帮助你完成你的代码，所以请接受我们的反馈。
1. 我们可能会要求你进行修改，重新设置，或者压制你的提交。

### 更新提交信息

如果你的提交信息的格式不正确，你会被要求更新它。你可以通过以下方式进行。

```shell
git commit --amend
```

This will open up your editor so you can make changes. After that, you'll need to do a forced push to your branch:

```shell
git push origin issue1234 -f
```

### 更新代码

如果我们要求你修改代码，不需要关闭拉动请求并创建一个新的请求。只要回到你的分叉上的分支，做你的修改。然后，当你准备好了，你就可以把你的修改添加到该分支。

```shell
git add -A
git commit
git push origin issue1234
```

在更新代码时，通常最好在你的分支上添加额外的提交，而不是修改原始提交，因为评审员很容易分辨出哪些修改是针对某个特定的评审而做的。当我们合并拉动请求时，我们会把你的分支的所有提交都压缩到 `main` 分支上的一个提交。

后续提交的提交信息不需要采用任何特定的格式，因为这些提交不会出现在更新日志中。

### 变基

如果你的代码已经过期，我们可能会要求你重新发布。这意味着我们希望你在最新的上游代码基础上应用你的修改。请确保你已经建立了一个 [开发环境](../development-environment)，然后你就可以使用这些命令重新发布。

```shell
git fetch upstream
git rebase upstream/main
```

你可能会发现，当你试图重新建立分支时，存在着合并冲突。请[解决冲突](https://help.github.com/articles/resolving-merge-conflicts-after-a-git-rebase/)，然后强制推送到你的分支：

```shell
git push origin issue1234 -f
```
