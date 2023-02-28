---
title: 核心概念
eleventyNavigation:
    key: core concepts
    title: 核心概念
    parent: user guide
    order: 2
---

本页包含了 ESLint 的一些核心概念的高层次概述。

## 什么是 ESLint？

ESLint 是一个可配置的 JavaScript 检查器。它可以帮助你发现并修复 JavaScript 代码中的问题。问题可以指潜在的运行时漏洞、未使用最佳实践、风格问题等。

## 规则

规则是 ESLint 的核心构建块。规则会验证 你的代码是否符合预期，以及如果不符合预期该怎么做。规则还可以包含针对该规则的额外配置项。

比如 [`semi`](../rules/semi) 规则会让你指定 JavaScript 语句结尾是否应该要有分号（`;`）。你可以通过设置规则来要求总是语句结尾总是要或绝不要有分号。

ESLint 包括数百个可以使用的内置规则。此外你也可以创建自定义规则或使用别人用[插件](#插件)创建的规则。

更多信息请参见[规则](../rules/)。

## 配置文件

ESLint 配置文件是指项目中存储 ESLint 配置的地方。可以包括内置规则、想要强制执行的内容、具有自定义规则的插件、可共享的配置，你希望规则适用于哪些文件等等。

更多信息请参见[配置文件](./configure/configuration-files)。

## 可共享配置

可共享配置是指通过 npm 分享的 ESLint 配置。

通常可共享配置会被用于通过 ESLint 内置规则强制执行风格指南。比如可共享配置 [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) 就实现了受欢迎的 Airbnb JavaScript 风格指南。

更多信息请参见[使用可共享配置包](./configure/configuration-files#使用可共享配置包)。

## 插件

ESLint 插件是一个包含 ESLint 规则、配置、解析器和环境变量的集合的 npm 模块。通过插件包括自定义规则。插件可以强制使用某个风格指南并支持 JavaScript 扩展（比如 TypeScript）、库（比如 React）和框架（比如 Angular）。

插件的流行用例就是强制执行框架规定的最佳实践。比如 [@angular-eslint/eslint-plugin](https://www.npmjs.com/package/@angular-eslint/eslint-plugin) 包括了使用 Angular 框架的最佳实践。

更多信息请参见[配置插件](./configure/plugins)。

## 解析器

ESLint 解析器将代码转换为 ESLint 可以评估的抽象语法树（AST, abstract syntax tree）。默认情况下，ESLint 使用内置的与标准 JavaScript运行时和版本兼容的 [Espree](https://github.com/eslint/espree) 解析器。

自定义解析器让 ESLint 可以解析非标准的 JavaScript 语法。通常自定义解析器会被包含在可共享配置或插件中，这一你就不需要直接使用它们了。

比如用于让 ESLint 可以解析 TypeScript 代码的 [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) 解析器就被包含在 [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) 项目中。

## 自定义处理器

ESLint 处理器可以从其他类型的文件中提取 JavaScript 代码，然后让 ESLint 对 JavaScript 代码进行检查。另外，你也可以在用 ESLint 解析 JavaScript 代码之前使用处理器先对其进行处理。

例如 [eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown) 就包括一个自定义处理器，让你可以对 Markdown 代码块内的 JavaScript 代码进行检查。

## 格式化工具

ESLint 格式化工具决定了命令行输出的检查结果的样子。

更多信息请参见[格式化工具](./formatters/)。

## 集成

ESLint 相关集成生态是使 ESLint 成为如此有用的工具的原因之一。例如，许多代码编辑器都有 ESLint 扩展，这让工作时，可以即刻在文件中查看相关的代码 ESLint 结果，这样你就不需要使用 ESLint 命令行来查看检查结果。

更多信息请参见[集成](./integrations)。

## 命令行 & Node.js API

ESLint 命令行是一个命令行界面，让你可以在终端进行检查。命令行有各种可以传递给命令的选项。

ESLint 的 Node.js API 让你可以在 Node.js 代码中以编程的方式使用 ESLint。该 API 在开发插件、集成和其他与 ESLint 相关的工具时非常有用。

除非你要以某种方式扩展 ESLint，否则你就应该使用命令行。

更多信息请参见[命令行界面](./command-line-interface)和 [Node.js API](../integrate/nodejs-api)。
