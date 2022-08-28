---
title: ESLint 配置
layout: doc
edit_link: https://github.com/eslint/eslint/edit/main/docs/src/user-guide/configuring/index.md
eleventyNavigation:
    key: configuring
    parent: user guide
    title: 配置
    order: 2

---

你可以根据你的情况定制 ESLint，它十分灵活且具可配置性。你可以关闭全部规则，只运行基本的语法验证，或者也可以根据项目需要，一起使用合适的捆绑规则与自定义规则。主要有两个配置 ESLint 的方法：

1. **配置注释** - 在文件中使用 JavaScript 注释直接嵌入配置信息
2. **配置文件** - 使用 JavaScript、JSON 或 YAML 文件指定整个目录及其所有子目录的配置信息。可以是 [`.eslintrc.*`](./configuration-files#配置文件格式) 文件，也可以是 [`package.json`](https://docs.npmjs.com/files/package.json) 文件中的 `eslintConfig` 字段，ESLint 都会自动寻找并读取这两处的配置，或者还可以用[命令行](../command-line-interface)上指定配置文件。

下面列出了一些 ESLint 中可配置的选项：

* [**环境**](./language-options#specifying-environments) - 你的脚本被设计为在哪些环境下运行。每个环境都会附带一组预设的全局变量。
* [**全局变量**](./language-options#specifying-globals) - 脚本在执行过程中需要用到的额外全局变量。
* [**规则**](rules) - 启用了哪些规则，它们又是什么级别错误水平
* [**插件**](plugins) - 第三方插件为 ESLint 定义了额外的规则、环境、配置等。

所有这些选项使得你可以对 ESLint 处理代码的模式进行进准控制。

## 目录

[**配置文件**](configuration-files)

* [配置文件格式](./configuration-files#配置文件格式)
* [使用配置文件](./configuration-files#使用配置文件)
* [添加共享设置](./configuration-files#添加共享设置)
* [级联和层次结构](./configuration-files#级联和层次结构)
* [扩展配置文件](./configuration-files#扩展配置文件)
* [基于 glob 模式的配置](./configuration-files#基于-glob-模式的配置)
* [个人配置文件](./configuration-files#个人配置文件已废弃)

[**语言选项**](language-options)

* [指定环境](./language-options#指定环境)
* [指定全局变量](./language-options#指定全局变量)
* [指定解析器选项](./language-options#指定解析器选项)

[**规则**](rules)

* [规则配置](./rules#规则规则)
* [禁用规则](./rules#禁用规则)

[**插件**](plugins)

* [指定解析器](./plugins#指定解析器)
* [指定处理器](./plugins#指定处理器)
* [配置插件](./plugins#配置插件)

[**忽略代码**](ignoring-code)

* [配置文件中的 `ignorePatterns`](./ignoring-code#配置文件中的-ignorepatterns)
* [`.eslintignore` 文件](./ignoring-code#the-eslintignore-file)
* [使用替代文件](./ignoring-code#使用替代文件)
* [package.json 中的 eslintIgnore](./ignoring-code#packagejson-中的-eslintignore))
* [忽略文件警告](./ignoring-code#忽略文件警告)
