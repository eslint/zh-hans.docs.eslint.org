---
title: no-regex-spaces
rule_type: suggestion
related_rules:
- no-div-regex
- no-control-regex
---

正则表达式可能非常复杂且难以理解，这就是为什么为了避免错误而尽可能保持其简单的原因。在正则表达式中，一个比较容易出错的地方是使用一个以上的空格，如：

```js
var re = /foo   bar/;
```

在这个正则表达式中，很难说出有多少个空格要被匹配。最好是只使用一个空格，然后指定预计有多少个空格，例如：

```js
var re = /foo {3}bar/;
```

现在非常清楚的是，有三个空间预计将被匹配。

## 规则细节

这条规则不允许在正则表达式字面上有多个空格。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-regex-spaces: "error"*/

var re = /foo   bar/;
var re = new RegExp("foo   bar");
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-regex-spaces: "error"*/

var re = /foo {3}bar/;
var re = new RegExp("foo {3}bar");
```

:::

## 何时不用

如果你想在正则表达式中允许多个空格，那么你可以安全地关闭这个规则。
