---
title: no-multi-str
layout: doc
rule_type: suggestion
---

在 JavaScript 中，可以通过在换行前使用斜线来创建多行字符串，如：

```js
var x = "Line 1 \
         Line 2";
```

有些人认为这是一种不好的做法，因为它是 JavaScript 的一个没有记录的特性，后来才正式确定下来。

## 规则细节

这条规则的目的是防止使用多行字符串。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-multi-str: "error"*/

var x = "some very \
long text";
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-multi-str: "error"*/

var x = "some very long text";

var x = "some very " +
        "long text";
```

:::
