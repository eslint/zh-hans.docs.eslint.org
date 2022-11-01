---
title: no-shadow
layout: doc
rule_type: suggestion
related_rules:
- no-shadow-restricted-names
further_reading:
- https://en.wikipedia.org/wiki/Variable_shadowing
---

阴影是指一个局部变量与它所包含的作用域中的变量共享相同的名字的过程。比如说：

```js
var a = 3;
function b() {
    var a = 10;
}
```

在这种情况下，`b()` 内的变量 `a` 在全局范围内对变量 `a` 有阴影。这在阅读代码的时候会造成混乱，而且不可能访问全局变量。

## 规则细节

这条规则旨在消除阴影变量的声明。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-shadow: "error"*/
/*eslint-env es6*/

var a = 3;
function b() {
    var a = 10;
}

var b = function () {
    var a = 10;
}

function b(a) {
    a = 10;
}
b(a);

if (true) {
    let a = 5;
}
```

:::

## 选项

这个规则需要一个选项，即一个对象，其属性为 `"builtinGlobals"`、`"hoist"`、`"allow"` 和 `"ignoreOnInitialization"`。

```json
{
    "no-shadow": ["error", { "builtinGlobals": false, "hoist": "functions", "allow": [], "ignoreOnInitialization": false }]
}
```

### builtinGlobals

`builtinGlobals` 选项默认为 `false`。
如果它是 `true`，该规则会阻止内置全局变量的阴影：`Object`、`Array`、`Number` 等。

使用 `{ "builtinGlobals": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-shadow: ["error", { "builtinGlobals": true }]*/

function foo() {
    var Object = 0;
}
```

:::

### hoist

`hoist` 选项有三个设置：

* `functions`（默认） - 在外部函数被定义之前报告阴影。
* `all` - 在定义外部变量/函数之前报告所有的阴影。
* `never` - 在定义外部变量/函数之前从不报告阴影。

#### hoist: functions

使用默认的 `{ "hoist": "functions" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-shadow: ["error", { "hoist": "functions" }]*/
/*eslint-env es6*/

if (true) {
    let b = 6;
}

function b() {}
```

:::

虽然 `if` 语句中的 `let b` 在外层作用域的**函数**声明之前，但这是不正确的。

使用默认的 `{ "hoist": "functions" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-shadow: ["error", { "hoist": "functions" }]*/
/*eslint-env es6*/

if (true) {
    let a = 3;
}

let a = 5;
```

:::

因为 `if` 语句中的 `let a` 在外层作用域的**变量**声明之前，所以它是正确的。

#### hoist: all

使用 `{ "hoist": "all" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-shadow: ["error", { "hoist": "all" }]*/
/*eslint-env es6*/

if (true) {
    let a = 3;
    let b = 6;
}

let a = 5;
function b() {}
```

:::

#### hoist: never

使用 `{ "hoist": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-shadow: ["error", { "hoist": "never" }]*/
/*eslint-env es6*/

if (true) {
    let a = 3;
    let b = 6;
}

let a = 5;
function b() {}
```

:::

因为 `if` 语句中的 `let a` 和 `let b` 在外层作用域的声明之前，所以它们是正确的。

### allow

`allow` 选项是一个允许使用的阴影标识符名称的数组。例如，`"resolve"`、`"reject"`、`"done"`、`"cb"`。

使用 `{ "allow": ["done"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-shadow: ["error", { "allow": ["done"] }]*/
/*eslint-env es6*/

import async from 'async';

function foo(done) {
  async.map([1, 2], function (e, done) {
    done(null, e * 2)
  }, done);
}

foo(function (err, result) {
  console.log({ err, result });
});
```

:::

### ignoreOnInitialization

`ignoreOnInitialization` 选项默认为 `false`。如果它是 `true`，它可以防止在变量的初始化过程中报告变量的阴影，因为被阴影的变量可能仍未被初始化。

被影子的变量必须在左边。阴影变量必须在右边，并在回调函数或 IIFE 中声明。

使用 `{ "ignoreOnInitialization": "true" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-shadow: ["error", { "ignoreOnInitialization": true }]*/

var x = x => x;
```

:::

因为影射变量 `x`将影射已经初始化的影射变量 `x`。

使用 `{ "ignoreOnInitialization": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-shadow: ["error", { "ignoreOnInitialization": true }]*/

var x = foo(x => x)

var y = (y => y)()
```

:::

回调函数的理由是假设它们将在初始化过程中被调用，因此在使用阴影变量的时候，被阴影变量还没有被初始化。
