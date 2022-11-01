---
title: no-trailing-spaces
layout: doc
rule_type: layout
---

有时在编辑文件的过程中，你可能会在行尾出现额外的空格。这些空格的差异可能会被源码控制系统发现，并被标记为差异，给开发者带来挫折感。虽然这些额外的空格不会引起任何功能问题，但许多代码惯例要求在签入前删除尾随空格。

## 规则细节

这条规则不允许在行末有尾随空格（空格、制表符和其他 Unicode 空白字符）。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-trailing-spaces: "error"*/

var foo = 0;//•••••
var baz = 5;//••
//•••••
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-trailing-spaces: "error"*/

var foo = 0;
var baz = 5;
```

:::

## 选项

此规则选项为对象：

* `"skipBlankLines": false`（默认值）不允许在空行上有尾随空格。
* `"skipBlankLines": true` 允许在空行上有尾随空格。
* `"ignoreComments": false`（默认值）不允许在注释块中留有尾随空格。
* `"ignoreComments": true` 允许在注释区有尾随空格。

### skipBlankLines

使用此规则与 `{ "skipBlankLines": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-trailing-spaces: ["error", { "skipBlankLines": true }]*/

var foo = 0;
var baz = 5;
//•••••
```

:::

### ignoreComments

使用此规则与 `{ "ignoreComments": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-trailing-spaces: ["error", { "ignoreComments": true }]*/

//foo•
//•••••
/**
 *•baz
 *••
 *•bar
 */
```

:::
