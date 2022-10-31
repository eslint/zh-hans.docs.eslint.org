---
title: no-new-func
layout: doc
rule_type: suggestion
---

在 JavaScript 中，可以在运行时使用 `Function` 构造函数从字符串中创建函数，例如：

```js
var x = new Function("a", "b", "return a + b");
var x = Function("a", "b", "return a + b");
var x = Function.call(null, "a", "b", "return a + b");
var x = Function.apply(null, ["a", "b", "return a + b"]);
var x = Function.bind(null, "a", "b", "return a + b")();
```

这被许多人认为是一种不好的做法，因为很难调试和阅读这些类型的函数。此外，内容安全政策（CSP）指令可能不允许使用 eval() 和类似的方法来从字符串中创建代码。

## 规则细节

提出这个错误是为了强调使用了一个不好的做法。通过向 Function 构造函数传递一个字符串，你要求引擎以调用 `eval` 函数的方式来解析这个字符串。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-new-func: "error"*/

var x = new Function("a", "b", "return a + b");
var x = Function("a", "b", "return a + b");
var x = Function.call(null, "a", "b", "return a + b");
var x = Function.apply(null, ["a", "b", "return a + b"]);
var x = Function.bind(null, "a", "b", "return a + b")();
var f = Function.bind(null, "a", "b", "return a + b"); // assuming that the result of Function.bind(...) will be eventually called.
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-new-func: "error"*/

var x = function (a, b) {
    return a + b;
};
```

:::

## 何时不用

在更高级的情况下，你确实需要使用 `Function` 构造函数。
