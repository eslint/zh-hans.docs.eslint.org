---
title: no-floating-decimal
rule_type: suggestion
---

JavaScript 中的浮点数包含一个小数点，而且没有要求小数点之前或之后必须有一个数字。例如，下面这些都是有效的 JavaScript 数字：

```js
var num = .5;
var num = 2.;
var num = -.7;
```

虽然不是语法错误，但这种数字格式会使人难以区分真正的小数和点运算符。出于这个原因，有人建议在小数点之前和之后都应该包括一个数字，以明确其意图是创建一个小数。

## 规则细节

这条规则旨在消除浮动的小数点，只要一个数字值有小数点，但在小数点之前或之后缺少一个数字，就会发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-floating-decimal: "error"*/

var num = .5;
var num = 2.;
var num = -.7;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-floating-decimal: "error"*/

var num = 0.5;
var num = 2.0;
var num = -0.7;
```

:::

## 何时不用

如果你不担心误解浮动小数点值，那么你可以安全地关闭这个规则。

## 兼容

* **JSHint**：W008, W047
