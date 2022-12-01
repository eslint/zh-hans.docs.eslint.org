---
title: semi-spacing
layout: doc
rule_type: layout
related_rules:
- semi
- no-extra-semi
- comma-spacing
- block-spacing
- space-in-parens
---

JavaScript 允许你在分号之前或之后放置不必要的空格。

不允许或强制执行分号周围的空格可以提高程序的可读性。

```js
var a = "b" ;

var c = "d";var e = "f";
```

## 规则细节

这条规则的目的是强制执行分号周围的间距。这条规则防止在表达式中分号前使用空格。

在以下情况下，本规则不检查间距。

* 如果分号是该行的第一个标记，则分号后的间距。

* 分号之前的间距，如果它是在开口括号（`(` 或 `{`）之后，或者分号之后的间距，如果它是在结束括号（`）` 或 `}`）之前。该间距由`space-in-parens` 或 `block-spacing`检查。

* 在空条件的 for 循环中，分号周围的间距（`for(;;)`）。

## 选项

规则需要一个选项，一个对象，它有两个键 `before` 和 `after`，具有布尔值 `true` 或 `false`。
如果 `before` 是 `true`，则在分号前执行空格，如果是 `false`，则分号前不允许空格。
如果 `after` 是 `true`，则在分号后执行空格，如果是 `false`，则在分号后不允许空格。
`after` 选项只在分号不在行尾时应用。

默认值是 `{"before": false, "after": true}`。

```json
    "semi-spacing": ["error", {"before": false, "after": true}]
```

### `{"before": false, "after": true}`

这是默认的选项。它强制执行分号后的间距，不允许分号前的间距。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint semi-spacing: "error"*/

var foo ;
var foo;var bar;
throw new Error("error") ;
while (a) { break ; }
for (i = 0 ; i < 10 ; i++) {}
for (i = 0;i < 10;i++) {}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint semi-spacing: "error"*/

var foo;
var foo; var bar;
throw new Error("error");
while (a) { break; }
for (i = 0; i < 10; i++) {}
for (;;) {}
if (true) {;}
;foo();
```

:::

### `{"before": true, "after": false}`

该选项在分号前强制执行间距，分号后不允许有间距。

使用此规则与 `{"before": true, "after": false}` 选项的**错误**示例：

::: incorrect

```js
/*eslint semi-spacing: ["error", { "before": true, "after": false }]*/

var foo;
var foo ; var bar;
throw new Error("error");
while (a) { break; }
for (i = 0;i < 10;i++) {}
for (i = 0; i < 10; i++) {}
```

:::

使用此规则与 `{"before": true, "after": false}` 选项的**正确**示例：

::: correct

```js
/*eslint semi-spacing: ["error", { "before": true, "after": false }]*/

var foo ;
var foo ;var bar ;
throw new Error("error") ;
while (a) {break ;}
for (i = 0 ;i < 10 ;i++) {}
```

:::

## 何时不用

如果你不关心分号前后间距的一致性，你可以关闭这个规则。
