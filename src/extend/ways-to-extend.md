---
title: 扩展 ESLint 的方法
eleventyNavigation:
    key: ways to extend
    parent: extend eslint
    title: 扩展 ESLint 的方法
    order: 1
---

ESlint 高度插件化且可配置。这里有几种可以扩展 ESLint 功能的方法。

此页解释了扩展 ESLint 的方法以及这些扩展是如何相互配合的。

## 插件

插件可以在项目中添加属于你自己的 ESLint 自定义规则和自定义处理器。你可以将插件发布为 npm 模块。

插件非常有用，因为你的项目看你需要一些不包括在 `eslint` 核心包里的 ESLint 配置。比如你正在使用像是 React 这样的 JavaScript 库或像 Vue 这样的框架，这些工具的一些功能需要不在 ESLint 核心范围内的规则。

通常情况下，插件会与 ESLint 配置搭配使用，将插件的一系列功能应用到项目中，也可以在插件中包含配置。

例如，ESLint 插件 [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react) 包含专门针对 React 项目的规则。这些规则包括强制一致使用 React 组件生命周期方法，以及要求在呈现动态列表时使用关键道具等。

要了解更多创建可以包括在插件中的扩展的信息，请参见下列文档：

* [自定义规则](custom-rules)
* [自定义处理器](custom-processors)
* [插件中的规则](plugins#插件中的配置)

要了解更多关于将这些扩展制成插件的信息，请参见[插件](plugins)。

## 可共享配置

ESLint 可共享配置是对 ESLint 配置的预定义，可以在自己的项目中使用。它们将规则和其他配置捆绑在一个 npm 包中。任何可以放在配置文件中的配置都可以放在可共享配置中。

你可以单独发布可共享配置也可以作为插件的一部分发布。

例如，流行的可共享配置 [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)，其中除了一些[解析器选项](../use/configure/language-options#指定解析器选项)外，还包含各种规则。这是 ESLint 的一套规则，旨在与 [Airbnb JavaScript 风格指南](https://github.com/airbnb/javascript) 所使用的风格指南相匹配。通过使用 `eslint-config-airbnb` 可共享配置，你可以在项目中自动执行 Airbnb 风格指南，而无需手动配置每条规则。

要了解更多关于创建可共享配置的信息，请参见[共享配置](shareable-configs)。

## 自定义格式化工具

自定义格式化工具让 ESLint 检查结果并以你定义的格式输出结果。自定义格式器能让你以最适合自己需要的格式显示检查结果，无论是特定的文件格式、特定的显示风格，还是为特定工具优化的格式。只有在[内置格式器](../use/formatters/)无法满足你的使用需求时，你才需要创建自定义格式器

比如自定义格式化工具 [eslint-formatter-gitlab](https://www.npmjs.com/package/eslint-formatter-gitlab) 可以用于在 GitLab 代码质量报告中显示 ESLint 检查结果。

要了解更多关于创建自定义格式化工具的信息，请参见[自定义格式化工具](custom-formatters)。

## 自定义解析器

ESLint 自定义解析器是让 ESLint 支持检查新的语言特性或代码中自定义格式的方法。解析器负责将代码转换为 ESLint 可以对其进行分析和检查的抽象语法树 (AST)。

ESLint 内置有 JavaScript 解析器（Espree），当一些自定义解析器可以检查其他语言或者可以扩展内置解析器的检查能力。

比如自定义解析器 [@typescript-eslint/parser](https://typescript-eslint.io/architecture/parser/) 扩展了 ESLint 检查 TypeScript 代码的功能。

自定义解析器不像其他扩展类型一样，它**不能**包括在插件中。

要了解更多关于创建自定义解析器的信息，请参见[自定义解析器](custom-parsers)。
