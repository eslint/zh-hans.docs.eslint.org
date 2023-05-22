---
title: 扩展 ESLint
eleventyNavigation:
    key: extend eslint
    title: 扩展 ESLint
    order: 2
---

本指南是为那些希望扩展 ESLint 功能的人准备的：

为了扩展 ESLint，我们建议：

* 懂得 JavaScript，因为 ESLint 是用 JavaScript 写的。
* 基本熟悉 Node.js，因为 ESLint 在它上面运行。
* 熟悉命令行程序。

如果这听起来像你，那么继续阅读就可以开始了。

## [创建插件](plugins)

你已经为 ESLint 开发了特定库规则且想与社区分享它们。你可以在 npm 上发布 ESLint 插件。

## [自定义规则](custom-rules)

此章节解释了如何创建和修改 ESLint 规则。

## [自定义格式化工具](custom-formatters)

此章节解释了如何创建自定义自定义格式化工具来控制 ESLint 输出结果。

## [自定义解析器](custom-parsers)

如果你不打算使用 ESLint 的默认解析器，此章节解释了如何创建自定义解析器。

## [自定义处理器](custom-processors)

此章节解释了如何使用自定义解析器来让 ESlint 处理 JavaScript 以外的文件。

## 【共享配置](shareable-configs)

此章节解释了如何在 JavaScript 包中捆绑和分享 ESLint 配置。

## [Node.js API 参考](../integrate/nodejs-api)

如果你有兴趣编写一个使用 ESLint 的工具，那么你可以使用 Node.js API 来获得程序化功能。
