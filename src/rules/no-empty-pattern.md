---
title: no-empty-pattern
rule_type: problem
---

当使用解构时，有可能创建一个没有效果的模式。当空的大括号被用在嵌入对象的解构模式的右边时，就会发生这种情况，比如说：

```js
// doesn't create any variables
var {a: {}} = foo;
```

在这段代码中，没有创建新的变量，因为 `a` 只是一个位置帮助器，而 `{}` 被期望包含要创建的变量，如：

```js
// creates variable b
var {a: { b }} = foo;
```

在许多情况下，空对象模式是一个错误，作者打算使用一个默认值来代替，例如：

```js
// creates variable a
var {a = {}} = foo;
```

这两种模式之间的区别是微妙的，特别是因为有问题的空模式看起来就像一个对象字面量。

## 规则细节

这条规则旨在标记非结构化对象和数组中的任何空模式，因此，只要遇到一个问题，就会报告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-empty-pattern: "error"*/

var {} = foo;
var [] = foo;
var {a: {}} = foo;
var {a: []} = foo;
function foo({}) {}
function foo([]) {}
function foo({a: {}}) {}
function foo({a: []}) {}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-empty-pattern: "error"*/

var {a = {}} = foo;
var {a = []} = foo;
function foo({a = {}}) {}
function foo({a = []}) {}
```

:::

## 选项

此规则有一个用于例外情况的对象选项：

### allowObjectPatternsAsParameters

默认值为 `false`。将此选项设置为 `true` 允许将空对象模式用作函数参数。

**注意**：该规则不允许将空数组模式用作函数参数。

使用此与 `{"allowObjectPatternsAsParameters": true}` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-empty-pattern: ["error", { "allowObjectPatternsAsParameters": true }]*/

function foo({a: {}}) {}
var foo = function({a: {}}) {};
var foo = ({a: {}}) => {};
var foo = ({} = bar) => {};
var foo = ({} = { bar: 1 }) => {};

function foo([]) {}
```

:::

使用此规则与 `{"allowObjectPatternsAsParameters": true}` 选项的**正确**示例：

::: correct

```js
/*eslint no-empty-pattern: ["error", { "allowObjectPatternsAsParameters": true }]*/

function foo({}) {}
var foo = function({}) {};
var foo = ({}) => {};

function foo({} = {}) {}
```

:::
