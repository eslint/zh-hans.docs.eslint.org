---
title: no-implied-eval
rule_type: suggestion
related_rules:
- no-eval
---

在 JavaScript 中避免使用 `eval()` 被认为是一个好的做法。这样做涉及到安全和性能问题，这就是为什么许多 linters（包括 ESLint）建议不允许使用 `eval()`。然而，还有一些传递字符串并将其解释为 JavaScript 代码的方法，也有类似的问题。

第一种是使用 `setTimeout()`, `setInterval()` 或 `execScript()`（仅 Internet Explorer)，所有这些都可以接受一串 JavaScript 代码作为它们的第一个参数。比如：

```js
setTimeout("alert('Hi!');", 100);
```

这被认为是一个隐含的 `eval()`，因为有一串需要解释的 JavaScript 代码被传入。同样可以用 `setInterval()` 和 `execScript()` 来做。两者都在全局范围内解释 JavaScript 代码。对于 `setTimeout()` 和 `setInterval()`，第一个参数也可以是一个函数，这被认为是更安全的，而且性能更强。

```js
setTimeout(function() {
    alert("Hi!");
}, 100);
```

最好的做法是始终使用一个函数作为 `setTimeout()` 和 `setInterval()` 的第一个参数（避免使用 `execScript()`）。

## 规则细节

本规则旨在通过使用 `setTimeout()`、`setInterval()` 或 `execScript()` 消除隐含的 `eval()`。因此，当这两个函数的第一个参数是字符串时，它将发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-implied-eval: "error"*/

setTimeout("alert('Hi!');", 100);

setInterval("alert('Hi!');", 100);

execScript("alert('Hi!')");

window.setTimeout("count = 5", 10);

window.setInterval("foo = bar", 10);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-implied-eval: "error"*/

setTimeout(function() {
    alert("Hi!");
}, 100);

setInterval(function() {
    alert("Hi!");
}, 100);
```

:::

## 何时不用

如果你想允许 `setTimeout()` 和 `setInterval()` 使用字符串参数，你可以安全地禁用这个规则。
