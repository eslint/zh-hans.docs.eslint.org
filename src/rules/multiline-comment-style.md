---
title: multiline-comment-style
layout: doc
rule_type: suggestion
---

许多风格指南要求对跨越多行的注释采用特定的风格。例如，一些风格指南倾向于对多行注释使用单一的块状注释，而其他风格指南则倾向于连续的行注释。

## 规则细节

这条规则的目的是为多行注释强制执行一种特定的风格。

### 选项

这个规则有一个字符串选项，它可以是以下任一值：

* `"starred-block"`（默认）：不允许连续的行注释，支持块注释。此外，要求块状注释在每行之前有一个对齐的 `*` 字符。
* `"bare-block"`：不允许连续的行注释而支持块注释，并且不允许块注释在每行前有一个 `"*"` 字符。
* `"separate-lines"`：不允许使用块状注释而使用连续的行状注释。

该规则总是忽略指令性注释，如 `/* eslint-disable */`。此外，除非模式是 `"starred-block"`，否则该规则会忽略 JSDoc 注释。

使用此规则与默认的 `"starred-block"` 选项的**错误**示例：

::: incorrect

```js

/* eslint multiline-comment-style: ["error", "starred-block"] */

// this line
// calls foo()
foo();

/* this line
calls foo() */
foo();

/* this comment
 * is missing a newline after /*
 */

/*
 * this comment
 * is missing a newline at the end */

/*
* the star in this line should have a space before it
 */

/*
 * the star on the following line should have a space before it
*/

```

:::

使用此规则与默认的 `"starred-block"` 选项的**正确**示例：

::: correct

```js
/* eslint multiline-comment-style: ["error", "starred-block"] */

/*
 * this line
 * calls foo()
 */
foo();

// single-line comment
```

:::

使用此规则与 `"bare-block"` 选项的**错误**示例：

::: incorrect

```js
/* eslint multiline-comment-style: ["error", "bare-block"] */

// this line
// calls foo()
foo();

/*
 * this line
 * calls foo()
 */
foo();
```

:::

使用此规则与 `"bare-block"` 选项的**正确**示例：

::: correct

```js
/* eslint multiline-comment-style: ["error", "bare-block"] */

/* this line
   calls foo() */
foo();
```

:::

使用此规则与 `"separate-lines"` 选项的**错误**示例：

::: incorrect

```js

/* eslint multiline-comment-style: ["error", "separate-lines"] */

/* This line
calls foo() */
foo();

/*
 * This line
 * calls foo()
 */
foo();

```

:::

使用此规则与 `"separate-lines"` 选项的**正确**示例：

::: correct

```js
/* eslint multiline-comment-style: ["error", "separate-lines"] */

// This line
// calls foo()
foo();

```

:::

## 何时不用

如果你不想为多行注释强制执行一个特定的风格，你可以禁用该规则。
