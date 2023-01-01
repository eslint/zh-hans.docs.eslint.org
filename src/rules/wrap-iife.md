---
title: wrap-iife
rule_type: layout
---

你可以立即调用函数表达式，但不能调用函数声明。创建立即调用的函数表达式（IIFE）的常用技术是用圆括号包裹函数声明。开头的括号使包含的函数被解析为一个表达式，而不是一个声明。

```js
// function expression could be unwrapped
var x = function () { return { y: 1 };}();

// function declaration must be wrapped
function () { /* side effects */ }(); // SyntaxError
```

## 规则细节

这条规则要求所有立即调用的函数表达式都要用圆括号包裹起来。

## 选项

这个规则有两个选项，一个字符串选项和一个对象选项：

字符串选项：

* `"outside"` 强制执行总是包裹 *call* 表达式。默认是 `"outside"`。
* `"inside"` 强制执行总是包裹 *function* 表达式。
* `"any"` 强制执行总是包装，但允许任何一种风格。

对象选项：

* `"functionPrototypeMethods": true` 另外还强制包装使用 `.call` 和 `.apply` 调用的函数表达式。默认是 `false`。

### outside

使用默认的 `"outside"` 选项的**错误**示例：

::: incorrect

```js
/*eslint wrap-iife: ["error", "outside"]*/

var x = function () { return { y: 1 };}(); // unwrapped
var x = (function () { return { y: 1 };})(); // wrapped function expression
```

:::

使用默认的 `"outside"` 选项的**正确**示例：

::: correct

```js
/*eslint wrap-iife: ["error", "outside"]*/

var x = (function () { return { y: 1 };}()); // wrapped call expression
```

:::

### inside

使用 `"inside"` 选项的**错误**示例：

::: incorrect

```js
/*eslint wrap-iife: ["error", "inside"]*/

var x = function () { return { y: 1 };}(); // unwrapped
var x = (function () { return { y: 1 };}()); // wrapped call expression
```

:::

使用 `"inside"` 选项的**正确**示例：

::: correct

```js
/*eslint wrap-iife: ["error", "inside"]*/

var x = (function () { return { y: 1 };})(); // wrapped function expression
```

:::

### any

使用 `"any"` 选项的**错误**示例：

::: incorrect

```js
/*eslint wrap-iife: ["error", "any"]*/

var x = function () { return { y: 1 };}(); // unwrapped
```

:::

使用 `"any"` 选项的**正确**示例：

::: correct

```js
/*eslint wrap-iife: ["error", "any"]*/

var x = (function () { return { y: 1 };}()); // wrapped call expression
var x = (function () { return { y: 1 };})(); // wrapped function expression
```

:::

### functionPrototypeMethods

使用此规则与 `"inside", { "functionPrototypeMethods": true }` 选项的**错误**示例：

::: incorrect

```js
/* eslint wrap-iife: [2, "inside", { functionPrototypeMethods: true }] */

var x = function(){ foo(); }()
var x = (function(){ foo(); }())
var x = function(){ foo(); }.call(bar)
var x = (function(){ foo(); }.call(bar))
```

:::

使用此规则与 `"inside", { "functionPrototypeMethods": true }` 选项的**正确**示例：

::: correct

```js
/* eslint wrap-iife: [2, "inside", { functionPrototypeMethods: true }] */

var x = (function(){ foo(); })()
var x = (function(){ foo(); }).call(bar)
```

:::
