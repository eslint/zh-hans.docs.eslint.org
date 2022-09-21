---
title: 架构
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/developer-guide/architecture/index.md
eleventyNavigation:
    key: architecture
    parent: developer guide
    title: 架构
    order: 1
---

<center><img alt="dependency graph" src="../../assets/images/architecture/dependency.svg"></center>

在较高层次上看，ESLint 有几个关键部分：

* `bin/eslint.js` - 这是一个实际被执行的命令行工具的文件。它是一个愚蠢的包装器，除了引导 ESLint 之外，没有其他作用，它将命令行参数传递给 `cli`。这是有意为之的，因为不需要大量的测试。
* `lib/api.js` - 这是 `require("eslint")` 的入口点。这个文件暴露了一个对象，包含公共类`Linter`、`ESLint`、 `RuleTester` 和 `SourceCode`。
* `lib/cli.js` - 这是 ESLint CLI 的核心。它接受一个参数数组，然后使用 `eslint` 来执行命令。通过将其作为一个独立的工具，它允许其他人从另一个 Node.js 程序中有效地调用 ESLint，就像在命令行上完成一样。主要的调用是 `cli.execute()`。这也是完成所有文件读取、目录遍历、输入和输出的部分。
* `lib/cli-engine/` - 这个模块是 `CLIEngine` 类，它寻找源代码文件和配置文件，然后用 `Linter` 类进行代码验证。这包括配置文件、分析器、插件和格式化器的加载逻辑。
* `lib/linter/` - 这个模块是核心的`Linter`类，根据配置选项进行代码验证。这个文件不做任何文件 I/O，并且完全不与`console`互动。对于其他有 JavaScript 文本需要验证的 Node.js 程序，他们将能够直接使用这个接口。
* `lib/rule-tester/` - 这个模块是 `RuleTester` 类，它是 Mocha 的一个封装器，这样可以对规则进行单元测试。这个类让我们可以为每一个实现的规则编写格式一致的测试，并确信每一个规则都能工作。RuleTester 接口是以 Mocha 为模型，并与 Mocha 的全局测试方法一起工作。RuleTester 也可以被修改为与其他测试框架一起工作。
* `lib/source-code/` - 这个模块是 `SourceCode` 类，用来表示解析的源代码。它接收源代码和代表代码的 AST 的 Program 节点。
* `lib/rules/` - 这包含验证源代码的内置规则。

## `cli` 对象

`cli` 对象是命令行界面的 API。从字面上看，`bin/eslint.js`文件只是向 `cli` 对象传递参数，然后将 `process.exitCode` 设置为返回的退出代码。

主要方法是 `cli.execute()`，它接受一个代表命令行选项的字符串数组（就像 `process.argv` 被传递而没有前两个参数一样）。如果你想在另一个程序中运行 ESLint，并让它像 CLI 一样运行，那么`cli`就是要使用的对象。

这个对象可以：

* 解释命令行参数
* 从文件系统中读取数据
* 输出到控制台
* 输出到文件系统
* 使用一个格式化器
* 返回正确的退出代码

这个对象不可以：

* 直接调用`process.exit()`
* 执行任何异步操作

## `CLIEngine` 对象

`CLIEngine` 类型代表了 CLI 的核心功能，只是它没有从命令行中读取任何东西，也没有默认输出任何东西。相反，它接受许多（但不是全部）传入 CLI 的参数。它读取配置文件和源文件，并管理传入 `Linter` 对象的环境。

`CLIEngine` 的主要方法是 `executeOnFiles()`，它接受一个文件和目录名称的数组来运行检查器。

这个对象可以：

* 管理 `Linte`r 的执行环境
* 从文件系统中读取信息
* 从配置文件中读取配置信息（包括`.eslintrc` 和 `package.json`）。

这个对象不可以：

* 直接调用`process.exit()`
* 执行任何异步操作
* 输出到控制台
* 使用格式化器

## `Linter` 对象

`Linter` 对象的主要方法是 `verify()`，接受两个参数：要验证的源文本和一个配置对象（给定配置文件的烘烤配置加上命令行选项）。该方法首先用 `espree`（或任何配置的解析器）解析给定的文本并检索 AST。产生的 AST 有行/列和范围位置，分别用于报告问题的位置和检索 AST 节点相关的源文本。

一旦有了 AST，`estraverse` 被用来从上到下遍历 AST。在每个节点上，`Linter` 对象发出一个事件，其名称与节点类型相同（例如 "Identifier"、"WithStatement" 等）。在返回子树的途中，会发出一个与 AST 类型名称相同并以 ":exit" 为后缀的事件，如 "Identifier:exit" ——这允许规则在下行和上行的过程中都采取行动。每个事件都是以适当的 AST 节点发出的。

这个对象可以：

* 检查 JavaScript 代码字符串
* 为代码创建 AST
* 在 AST 上执行规则
* 报告执行的结果

这个对象不可以：

* 直接调用 `process.exit()`
* 执行任何异步操作
* 使用 Node.js 的特定功能
* 访问文件系统
* 调用 `console.log()` 或任何其他类似方法

## 规则

个人规则是 ESLint 架构中最专业的部分。规则能做的很少，它们只是针对提供的 AST 执行的一组指令。他们确实得到了一些上下文信息，但规则的主要责任是检查 AST 并报告警告。

这些对象的职责是：

* 检查 AST 的特定模式
* 当发现某些模式时报告警告

这些对象不可以：

* 直接调用 `process.exit()`
* 执行任何异步操作
* 使用 Node.js 的特定功能
* 访问文件系统
* 调用`console.log()`或任何其他类似方法
