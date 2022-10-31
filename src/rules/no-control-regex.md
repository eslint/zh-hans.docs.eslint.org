---
title: no-control-regex
layout: doc
rule_type: problem
related_rules:
- no-div-regex
- no-regex-spaces
---

控制字符是 ASCII 范围内 0-31 的特殊、不可见的字符。这些字符在 JavaScript 字符串中很少使用，所以一个包含明确匹配这些字符的元素的正则表达式很可能是一个错误。

## 规则细节

这条规则不允许使用控制字符和一些转义序列与正则表达式中的控制字符匹配。

正则表达式模式中的以下元素被认为是可能的输入错误，因此本规则不允许使用。

* 十六进制字符转义，从 `x00` 到 `x1F`。
* Unicode 字符转义从 `u0000` 到 `u001F`。
* 从`u{0}` 到 `u{1F}` 的 Unicode 代码点转义。
* 未转义的原始字符从 U+0000 到 U+001F。

本规则允许控制转义，如 `t` 和 `n`。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-control-regex: "error"*/

var pattern1 = /\x00/;
var pattern2 = /\x0C/;
var pattern3 = /\x1F/;
var pattern4 = /\u000C/;
var pattern5 = /\u{C}/u;
var pattern6 = new RegExp("\x0C"); // raw U+000C character in the pattern
var pattern7 = new RegExp("\\x0C"); // \x0C pattern
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-control-regex: "error"*/

var pattern1 = /\x20/;
var pattern2 = /\u0020/;
var pattern3 = /\u{20}/u;
var pattern4 = /\t/;
var pattern5 = /\n/;
var pattern6 = new RegExp("\x20");
var pattern7 = new RegExp("\\t");
var pattern8 = new RegExp("\\n");
```

:::

## 已知限制

当检查 `RegExp` 构造函数调用时，这条规则会检查评估的正则表达式模式。因此，尽管这条规则打算允许诸如 `\t` 这样的语法，但它不允许 `new RegExp("\t")`，因为被评估的模式（`"\t"` 的字符串值）包含一个原始控制字符（TAB 字符）。

```js
/*eslint no-control-regex: "error"*/

new RegExp("\t"); // disallowed since the pattern is: <TAB>

new RegExp("\\t"); // allowed since the pattern is: \t
```

`new RegExp("\t")` 和 `new RegExp("\\t")` 之间的行为没有区别，在两种情况下，匹配 TAB 字符的意图都很明显。就本规则而言，它们同样有效，但它只允许使用 `new RegExp("\\t")`。

## 何时不用

如果你需要使用控制字符模式匹配，那么你应该关闭这个规则。
