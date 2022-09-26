---
title: dot-location
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/dot-location.md
rule_type: layout
related_rules:
- newline-after-var
- dot-notation
---

JavaScript 允许你在成员表达式中的点之前或之后放置换行。

在点之前或之后放置换行的一致性可以大大增加可读性。

```js
var a = universe.
        galaxy;

var b = universe
       .galaxy;
```

## 规则细节

这条规则的目的是在成员表达式中强制执行换行的一致性。这条规则防止在成员表达式中的点周围使用混合换行。

## 选项

此规则选项为字符串：

* 如果是 `"object"`（默认），成员表达式中的点应该与对象部分在同一行。
* 如果是 `"property"`，成员表达式中的点应该和属性部分在同一行。

### object

默认的 `"object"` 选项要求点与对象在同一行。

使用默认的 `"object"` 选项的**错误**示例：

::: incorrect

```js
/*eslint dot-location: ["error", "object"]*/

var foo = object
.property;
```

:::

使用默认的 `"object"` 选项的**正确**示例：

::: correct

```js
/*eslint dot-location: ["error", "object"]*/

var foo = object.
property;

var bar = (
    object
).
property;

var baz = object.property;
```

:::

### property

`"property"` 选项要求点与属性在同一行。

使用 `"property"` 选项的**错误**示例：

::: incorrect

```js
/*eslint dot-location: ["error", "property"]*/

var foo = object.
property;
```

:::

使用 `"property"` 选项的**正确**示例：

::: correct

```js
/*eslint dot-location: ["error", "property"]*/

var foo = object
.property;
var bar = object.property;
```

:::

## 何时不用

如果你不关心成员表达式中点之前或之后的换行符是否一致，你可以关闭这个规则。
