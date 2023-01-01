---
title: newline-after-var
rule_type: layout
---

此规则在 ESLint v4.0.0 中**废弃**，并被 [padding-line-between-statements](padding-line-between-statements) 规则取代。

迄今为止，变量声明与代码其他部分的分离并不一致。有些开发者在 var 语句和其他代码之间留有空行，比如：

```js
var foo;

// do something with foo
```

而另一些人则根本不留任何空换行。

```js
var foo;
// do something with foo
```

问题是当这些开发人员在一个项目中一起工作时。这条规则强制执行一种编码风格，即允许或不允许在 `var`、`let` 或 `const` 语句后有空换行。它可以帮助代码在整个项目中看起来一致。

## 规则细节

这条规则强制执行一种编码风格，即在 `var`、`let` 或 `const` 语句后需要或不允许有空行，以实现整个项目的统一编码风格。

## 选项

此规则选项为字符串：

* `"always"`（默认值）要求在 `var`、`let` 或 `const` 后面有空行。

  在 var 语句后面的注释被视为额外的 var 语句。

* `"never"` 不允许在 `var`、`let` 或 `const` 后面空行。

### always

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint newline-after-var: ["error", "always"]*/
/*eslint-env es6*/

var greet = "hello,",
    name = "world";
console.log(greet, name);

let greet = "hello,",
    name = "world";
console.log(greet, name);

var greet = "hello,";
const NAME = "world";
console.log(greet, NAME);

var greet = "hello,";
var name = "world";
// var name = require("world");
console.log(greet, name);
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint newline-after-var: ["error", "always"]*/
/*eslint-env es6*/

var greet = "hello,",
    name = "world";

console.log(greet, name);

let greet = "hello,",
    name = "world";

console.log(greet, name);

var greet = "hello,";
const NAME = "world";

console.log(greet, NAME);

var greet = "hello,";
var name = "world";
// var name = require("world");

console.log(greet, name);
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint newline-after-var: ["error", "never"]*/
/*eslint-env es6*/

var greet = "hello,",
    name = "world";

console.log(greet, name);

let greet = "hello,",
    name = "world";

console.log(greet, name);

var greet = "hello,";
const NAME = "world";

console.log(greet, NAME);

var greet = "hello,";
var name = "world";
// var name = require("world");

console.log(greet, name);
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint newline-after-var: ["error", "never"]*/
/*eslint-env es6*/

var greet = "hello,",
    name = "world";
console.log(greet, name);

let greet = "hello,",
    name = "world";
console.log(greet, name);

var greet = "hello,";
const NAME = "world";
console.log(greet, NAME);

var greet = "hello,";
var name = "world";
// var name = require("world");
console.log(greet, name);
```

:::
