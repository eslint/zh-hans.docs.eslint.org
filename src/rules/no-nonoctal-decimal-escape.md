---
title: no-nonoctal-decimal-escape
rule_type: suggestion
related_rules:
- no-octal-escape
further_reading:
- https://tc39.es/ecma262/#prod-annexB-NonOctalDecimalEscapeSequence
---

虽然直到 ECMAScript 2021 才在语言中明确规定，但大多数 JavaScript 引擎允许在字符串字面中使用 `8` 和 `9` 转义序列，并将其视为“无用”转义：

```js
"\8" === "8"; // true
"\9" === "9"; // true
```

从 ECMAScript 2021 开始，这些转义序列被指定为[非八进制十进制转义序列](https://tc39.es/ecma262/#prod-annexB-NonOctalDecimalEscapeSequence)，保留了相同的行为。

尽管如此，ECMAScript 规范将字符串字面中的 `\8` 和 `\9` 作为一种遗留特性。如果 ECMAScript 的主机不是 Web 浏览器，这种语法是很有必要的。浏览器仍然必须支持它，但只能在非严格模式下支持。

无论你的目标环境如何，在编写新的代码时都不应该使用这些转义序列。

## 规则细节

这条规则不允许在字符串字面中使用 `\8` 和 `\9` 转义序列。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-nonoctal-decimal-escape: "error"*/

"\8";

"\9";

var foo = "w\8less";

var bar = "December 1\9";

var baz = "Don't use \8 and \9 escapes.";

var quux = "\0\8";
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-nonoctal-decimal-escape: "error"*/

"8";

"9";

var foo = "w8less";

var bar = "December 19";

var baz = "Don't use \\8 and \\9 escapes.";

var quux = "\0\u0038";
```

:::
