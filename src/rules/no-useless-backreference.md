---
title: no-useless-backreference
layout: doc
rule_type: problem
related_rules:
- no-control-regex
- no-empty-character-class
- no-invalid-regexp
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
---

在 JavaScript 正则表达式中，定义一个属于模式的另一个替代部分的组的回引，一个出现在回引之后的组的回引，一个包含该回引的组的回引，或者一个位于负数查找范围内的组的回引，在语法上都是有效的。然而，根据规范，在任何这些情况下，反向参考最终总是只匹配零长度（空字符串），不管反向参考和组出现在什么情况下。

总是成功匹配零长度而不能匹配任何其他东西的反向引用是无用的。它们基本上被忽略，可以在不改变正则表达式行为的情况下被删除。

```js
var regex = /^(?:(a)|\1b)$/;

regex.test("a"); // true
regex.test("b"); // true!
regex.test("ab"); // false

var equivalentRegex = /^(?:(a)|b)$/;

equivalentRegex.test("a"); // true
equivalentRegex.test("b"); // true
equivalentRegex.test("ab"); // false
```

无用的反向引用是代码中的一个可能的错误。它通常表明正则表达式没有按预期工作。

## 规则细节

本规则旨在检测并禁止正则表达式中的以下反指。

* 反指在另一个备选中的组，如 `/(a)|\1b/`。在这样构建的正则表达式中，预计反向参考将与在该点上被捕获的、非参与的组相匹配。
* 对模式中稍后出现的组的反向引用，如 `/\1(a)/`。这个组还没有捕获任何东西，ECMAScript 不支持前向引用。在向后匹配的 lookbehinds 中，情况正好相反，这条规则不允许反向引用在同一 lookbehind 中出现过的组，如 `/(?<=(a)\1)b/`。
* 从同一组内反向引用一个组，如 `/(\1)/`。与前面类似，该组还没有捕获任何东西，ECMAScript 也不支持嵌套引用。
* 反向引用一个处于负向查找中的组，如果反向引用不在同一个负向查找中，如 `/a(?!(b)).\1/`。一个负向查找（lookahead 或 lookbehind）只有在其模式不能匹配时才会成功，这意味着该组已经失败。

根据 ECMAScript 的规范，上面列出的所有反向引用都是有效的，总是成功地匹配零长度，并且不能匹配其他东西。因此，它们不会产生解析或运行时错误，但也不会影响其正则表达式的行为。它们在语法上是有效的，但却是无用的。

对于来自其他语言的开发者来说，这可能是令人惊讶的，因为在这些语言中，有些反向引用可以被有意义地使用。

```js
// in some other languages, this pattern would successfully match "aab"

/^(?:(a)(?=a)|\1b)+$/.test("aab"); // false
```

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-useless-backreference: "error"*/

/^(?:(a)|\1b)$/; // reference to (a) into another alternative

/^(?:(a)|b(?:c|\1))$/; // reference to (a) into another alternative

/^(?:a|b(?:(c)|\1))$/; // reference to (c) into another alternative

/\1(a)/; // forward reference to (a)

RegExp('(a)\\2(b)'); // forward reference to (b)

/(?:a)(b)\2(c)/; // forward reference to (c)

/\k<foo>(?<foo>a)/; // forward reference to (?<foo>a)

/(?<=(a)\1)b/; // backward reference to (a) from within the same lookbehind

/(?<!(a)\1)b/; // backward reference to (a) from within the same lookbehind

new RegExp('(\\1)'); // nested reference to (\1)

/^((a)\1)$/; // nested reference to ((a)\1)

/a(?<foo>(.)b\1)/; // nested reference to (?<foo>(.)b\1)

/a(?!(b)).\1/; // reference to (b) into a negative lookahead

/(?<!(a))b\1/; // reference to (a) into a negative lookbehind
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-useless-backreference: "error"*/

/^(?:(a)|(b)\2)$/; // reference to (b)

/(a)\1/; // reference to (a)

RegExp('(a)\\1(b)'); // reference to (a)

/(a)(b)\2(c)/; // reference to (b)

/(?<foo>a)\k<foo>/; // reference to (?<foo>a)

/(?<=\1(a))b/; // reference to (a), correctly before the group as they're in the same lookbehind

/(?<=(a))b\1/; // reference to (a), correctly after the group as the backreference isn't in the lookbehind

new RegExp('(.)\\1'); // reference to (.)

/^(?:(a)\1)$/; // reference to (a)

/^((a)\2)$/; // reference to (a)

/a(?<foo>(.)b\2)/; // reference to (.)

/a(?!(b|c)\1)./; // reference to (b|c), correct as it's from within the same negative lookahead

/(?<!\1(a))b/; // reference to (a), correct as it's from within the same negative lookbehind
```

:::

请注意，这条规则的目的不是为了检测和禁止在正则表达式中对反向参考语法的潜在错误使用，比如在字符类中的使用或试图引用一个不存在的组。根据上下文，一个 `\1`...`\9` 序列如果不是语法上有效的反向参考，可能会产生语法错误，或者被解析为其他东西（例如，作为一个传统的八进制转义序列）。

本规则的额外**正确的**代码的例子。

::: correct

```js
/*eslint no-useless-backreference: "error"*/

// comments describe behavior in a browser

/^[\1](a)$/.test("\x01a"); // true. In a character class, \1 is treated as an octal escape sequence.
/^\1$/.test("\x01"); // true. Since the group 1 doesn't exist, \1 is treated as an octal escape sequence.
/^(a)\1\2$/.test("aa\x02"); // true. In this case, \1 is a backreference, \2 is an octal escape sequence.
```

:::
