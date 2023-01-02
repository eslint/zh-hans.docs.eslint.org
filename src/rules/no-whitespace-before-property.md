---
title: no-whitespace-before-property
rule_type: layout
---

JavaScript 允许在对象和它们的属性之间留出空白。然而，不一致的间距会使代码更难阅读，并可能导致错误。

```js
foo. bar .baz . quz
```

## 规则细节

如果对象的属性在同一行，这条规则不允许在圆点周围或开头的括号前有空白。当对象和属性在不同的行上时，这条规则允许空白，因为在较长的属性链上添加新行是很常见的。

```js
foo
  .bar()
  .baz()
  .qux()
```

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-whitespace-before-property: "error"*/

foo [bar]

foo. bar

foo .bar

foo. bar. baz

foo. bar()
  .baz()

foo
  .bar(). baz()
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-whitespace-before-property: "error"*/

foo.bar

foo[bar]

foo[ bar ]

foo.bar.baz

foo
  .bar().baz()

foo
  .bar()
  .baz()

foo.
  bar().
  baz()
```

:::

## 何时不用

如果你不关心允许在点周围或在对象的属性前的开括号前的空白，如果它们在同一行中，请关闭此规则。
