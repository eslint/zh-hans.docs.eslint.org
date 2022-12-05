---
title: no-useless-concat
layout: doc
rule_type: suggestion
---

将两个字符串连接在一起是没有必要的，例如：

```js
var foo = "a" + "b";
```

这段代码可能是重构的结果，其中一个变量被从连接中移除（如 `"a" + b + "b"`）。在这种情况下，串联并不重要，这段代码也可以写作：

```js
var foo = "ab";
```

## 规则细节

这条规则的目的是当两个字面量可以合并成一个字面量的时候，标记出它们的连接。字面量可以是字符串或模板字面量。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-useless-concat: "error"*/
/*eslint-env es6*/

var a = `some` + `string`;

// these are the same as "10"
var a = '1' + '0';
var a = '1' + `0`;
var a = `1` + '0';
var a = `1` + `0`;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-useless-concat: "error"*/

// when a non string is included
var c = a + b;
var c = '1' + a;
var a = 1 + '1';
var c = 1 - 2;
// when the string concatenation is multiline
var c = "foo" +
    "bar";
```

:::

## 何时不用

如果你不希望被通知到不必要的字符串连接，你可以安全地禁用这个规则。
