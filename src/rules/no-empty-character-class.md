---
title: no-empty-character-class
rule_type: problem
---

正则表达式中的空字符类并不会匹配任何东西，它们很有可能是错别字。

```js
var foo = /^abc[]/;
```

## 规则细节

这条规则不允许正则表达式中的空字符类。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-empty-character-class: "error"*/

/^abc[]/.test("abcdefg"); // false
"abcdefg".match(/^abc[]/); // null

/^abc[[]]/v.test("abcdefg"); // false
"abcdefg".match(/^abc[[]]/v); // null

/^abc[[]--[x]]/v.test("abcdefg"); // false
"abcdefg".match(/^abc[[]--[x]]/v); // null

/^abc[[d]&&[]]/v.test("abcdefg"); // false
"abcdefg".match(/^abc[[d]&&[]]/v); // null

const regex = /^abc[d[]]/v;
regex.test("abcdefg"); // true, the nested `[]` has no effect
"abcdefg".match(regex); // ["abcd"]
regex.test("abcefg"); // false, the nested `[]` has no effect
"abcefg".match(regex); // null
regex.test("abc"); // false, the nested `[]` has no effect
"abc".match(regex); // null
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-empty-character-class: "error"*/

/^abc/.test("abcdefg"); // true
"abcdefg".match(/^abc/); // ["abc"]

/^abc[a-z]/.test("abcdefg"); // true
"abcdefg".match(/^abc[a-z]/); // ["abcd"]

/^abc[^]/.test("abcdefg"); // true
"abcdefg".match(/^abc[^]/); // ["abcd"]
```

:::

## 已知限制

本规则不报告调用 `RegExp` 构造函数的字符串参数中的空字符类。

当此规则报告正确的代码时，有一个 *false negative* 的示例：

```js
/*eslint no-empty-character-class: "error"*/

var abcNeverMatches = new RegExp("^abc[]");
```
