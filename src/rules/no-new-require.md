---
title: no-new-require
rule_type: suggestion
---

此规则于 ESLint v7.0.0 中废弃，请使用 [`eslint-plugin-node`](https://github.com/mysticatea/eslint-plugin-node) 中的对应规则代替。

`require` 函数用于包含存在于独立文件中的模块，例如：

```js
var appHeader = require('app-header');
```

Some modules return a constructor which can potentially lead to code such as:

```js
var appHeader = new require('app-header');
```

不幸的是，这引入了一个很高的混淆可能性，因为代码作者很可能是想写。

```js
var appHeader = new (require('app-header'));
```

出于这个原因，通常最好是不允许这种特殊的表达方式。

## 规则细节

这条规则的目的是消除对 `new require` 表达式的使用。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-new-require: "error"*/

var appHeader = new require('app-header');
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-new-require: "error"*/

var AppHeader = require('app-header');
var appHeader = new AppHeader();
```

:::

## 何时不用

如果你正在使用 `require` 的自定义实现，并且你的代码永远不会被用于期望使用标准 `require` 的项目中（CommonJS、Node.js、AMD），你可以安全地关闭这个规则。
