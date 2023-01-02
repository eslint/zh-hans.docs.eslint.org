---
title: one-var
rule_type: suggestion
---

变量可以在 JavaScript 代码中的任何地方使用 `var`、`let` 或 `const` 进行声明。有许多与变量声明有关的风格和偏好，其中之一是决定一个函数中应该允许多少个变量声明。

在这方面有两派观点。

1. 对于函数中的所有变量，应该只有一个变量声明。这个声明通常出现在函数的顶部。
1. 你应该为你想定义的每个变量使用一个变量声明。

比如说：

```js
// one variable declaration per function
function foo() {
    var bar, baz;
}

// multiple variable declarations per function
function foo() {
    var bar;
    var baz;
}
```

单一声明学派是基于 ECMAScript 6 之前的行为，当时没有块范围，只有函数范围。由于所有的 `var` 语句都被提升到了函数的顶部，有些人认为在函数顶部的单一声明中声明所有的变量可以消除范围规则方面的混乱。

## 规则细节

这条规则强制要求变量在每个函数（对于 `var`）或块（对于 `let` 和 `const`）范围内一起或分别声明。

## 选项

这个规则有一个选项，可以是一个字符串选项，也可以是一个对象选项。

字符串选项：

* `"always"`（默认值）要求每个作用域有一个变量声明
* `"never"` 要求每个作用域有多个变量声明
* `"consecutive"` 允许每个作用域有多个变量声明，但要求将连续的变量声明合并为一个声明。

对象选项：

* `"var": "always"`要求每个函数有一个 `var` 声明
* `"var": "never"` 要求每个函数有多个 `var` 声明
* `"var": "consecutive"` 要求连续的 `var` 声明为一个声明
* `"let": "always"` 要求每个块有一个 `let` 声明
* `"let": "never"` 要求每个区块有多个 `let` 声明
* `"let": "consecutive"` 要求连续的 `let` 声明是一个单一的声明
* `"const": "always"` 要求每个区块有一个 `const` 声明
* `"const": "never"` 要求每个区块有多个 `const` 声明
* `"const": "consecutive"` 要求连续的 `const` 声明为一个声明
* `"separateRequires": true` 强制要求 `requires` 与声明分开。

替代对象选项：

* `"initialized": "always"` 要求每个作用域的初始化变量有一个变量声明。
* `"initialized": "never"` 要求每个作用域的初始化变量有多个变量声明。
* `"initialized": "consecutive"` 要求连续的初始化变量声明是一个单一的声明。
* `"uninitialized": "always"` 要求每个作用域对未初始化的变量进行一次变量声明。
* `"uninitialized": "never"`要求每个作用域为未被初始化的变量做多个变量声明
* `"uninitialized": "consecutive"` 要求为未被初始化的变量进行连续的变量声明，使之成为一个单一的声明。

### always

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", "always"]*/

function foo() {
    var bar;
    var baz;
    let qux;
    let norf;
}

function foo(){
    const bar = false;
    const baz = true;
    let qux;
    let norf;
}

function foo() {
    var bar;

    if (baz) {
        var qux = true;
    }
}

class C {
    static {
        var foo;
        var bar;
    }

    static {
        var foo;
        if (bar) {
            var baz = true;
        }
    }

    static {
        let foo;
        let bar;
    }
}
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", "always"]*/

function foo() {
    var bar,
        baz;
    let qux,
        norf;
}

function foo(){
    const bar = true,
        baz = false;
    let qux,
        norf;
}

function foo() {
    var bar,
        qux;

    if (baz) {
        qux = true;
    }
}

function foo(){
    let bar;

    if (baz) {
        let qux;
    }
}

class C {
    static {
        var foo, bar;
    }

    static {
        var foo, baz;
        if (bar) {
            baz = true;
        }
    }

    static {
        let foo, bar;
    }

    static {
        let foo;
        if (bar) {
            let baz;
        }
    }
}
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", "never"]*/

function foo() {
    var bar,
        baz;
    const bar = true,
        baz = false;
}

function foo() {
    var bar,
        qux;

    if (baz) {
        qux = true;
    }
}

function foo(){
    let bar = true,
        baz = false;
}

class C {
    static {
        var foo, bar;
        let baz, qux;
    }
}
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", "never"]*/

function foo() {
    var bar;
    var baz;
}

function foo() {
    var bar;

    if (baz) {
        var qux = true;
    }
}

function foo() {
    let bar;

    if (baz) {
        let qux = true;
    }
}

class C {
    static {
        var foo;
        var bar;
        let baz;
        let qux;
    }
}

// declarations with multiple variables are allowed in for-loop initializers
for (var i = 0, len = arr.length; i < len; i++) {
    doSomething(arr[i]);
}
```

:::

### consecutive

使用此规则与 `"consecutive"` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", "consecutive"]*/

function foo() {
    var bar;
    var baz;
}

function foo(){
    var bar = 1;
    var baz = 2;

    qux();

    var qux = 3;
    var quux;
}

class C {
    static {
        var foo;
        var bar;
        let baz;
        let qux;
    }
}
```

:::

使用此规则与 `"consecutive"` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", "consecutive"]*/

function foo() {
    var bar,
        baz;
}

function foo(){
    var bar = 1,
        baz = 2;

    qux();

    var qux = 3,
        quux;
}

class C {
    static {
        var foo, bar;
        let baz, qux;
        doSomething();
        let quux;
        var quuux;
    }
}
```

:::

### var, let, and const

使用此规则与 `{ var: "always", let: "never", const: "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", { var: "always", let: "never", const: "never" }]*/
/*eslint-env es6*/

function foo() {
    var bar;
    var baz;
    let qux,
        norf;
}

function foo() {
    const bar = 1,
          baz = 2;
    let qux,
        norf;
}
```

:::

使用此规则与 `{ var: "always", let: "never", const: "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", { var: "always", let: "never", const: "never" }]*/
/*eslint-env es6*/

function foo() {
    var bar,
        baz;
    let qux;
    let norf;
}

function foo() {
    const bar = 1;
    const baz = 2;
    let qux;
    let norf;
}
```

:::

使用此规则与 `{ var: "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", { var: "never" }]*/
/*eslint-env es6*/

function foo() {
    var bar,
        baz;
}
```

:::

使用此规则与 `{ var: "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", { var: "never" }]*/
/*eslint-env es6*/

function foo() {
    var bar,
        baz;
    const bar = 1; // `const` and `let` declarations are ignored if they are not specified
    const baz = 2;
    let qux;
    let norf;
}
```

:::

使用此规则与 `{ separateRequires: true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", { separateRequires: true, var: "always" }]*/
/*eslint-env node*/

var foo = require("foo"),
    bar = "bar";
```

:::

使用此规则与 `{ separateRequires: true }` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", { separateRequires: true, var: "always" }]*/
/*eslint-env node*/

var foo = require("foo");
var bar = "bar";
```

:::

::: correct

```js
var foo = require("foo"),
    bar = require("bar");
```

:::

使用此规则与 `{ var: "never", let: "consecutive", const: "consecutive" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", { var: "never", let: "consecutive", const: "consecutive" }]*/
/*eslint-env es6*/

function foo() {
    let a,
        b;
    let c;

    var d,
        e;
}

function foo() {
    const a = 1,
        b = 2;
    const c = 3;

    var d,
        e;
}
```

:::

使用此规则与 `{ var: "never", let: "consecutive", const: "consecutive" }` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", { var: "never", let: "consecutive", const: "consecutive" }]*/
/*eslint-env es6*/

function foo() {
    let a,
        b;

    var d;
    var e;

    let f;
}

function foo() {
    const a = 1,
          b = 2;

    var c;
    var d;

    const e = 3;
}
```

:::

使用此规则与 `{ var: "consecutive" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", { var: "consecutive" }]*/
/*eslint-env es6*/

function foo() {
    var a;
    var b;
}
```

:::

使用此规则与 `{ var: "consecutive" }` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", { var: "consecutive" }]*/
/*eslint-env es6*/

function foo() {
    var a,
        b;
    const c = 1; // `const` and `let` declarations are ignored if they are not specified
    const d = 2;
    let e;
    let f;
}
```

:::

### initialized and uninitialized

使用此规则与 `{ "initialized": "always", "uninitialized": "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", { "initialized": "always", "uninitialized": "never" }]*/
/*eslint-env es6*/

function foo() {
    var a, b, c;
    var foo = true;
    var bar = false;
}
```

:::

使用此规则与 `{ "initialized": "always", "uninitialized": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", { "initialized": "always", "uninitialized": "never" }]*/

function foo() {
    var a;
    var b;
    var c;
    var foo = true,
        bar = false;
}

for (let z of foo) {
    doSomething(z);
}

let z;
for (z of foo) {
    doSomething(z);
}
```

:::

使用此规则与 `{ "initialized": "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", { "initialized": "never" }]*/
/*eslint-env es6*/

function foo() {
    var foo = true,
        bar = false;
}
```

:::

使用此规则与 `{ "initialized": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", { "initialized": "never" }]*/

function foo() {
    var foo = true;
    var bar = false;
    var a, b, c; // Uninitialized variables are ignored
}
```

:::

使用此规则与 `{ "initialized": "consecutive", "uninitialized": "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", { "initialized": "consecutive", "uninitialized": "never" }]*/

function foo() {
    var a = 1;
    var b = 2;
    var c,
        d;
    var e = 3;
    var f = 4;
}
```

:::

使用此规则与 `{ "initialized": "consecutive", "uninitialized": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", { "initialized": "consecutive", "uninitialized": "never" }]*/

function foo() {
    var a = 1,
        b = 2;
    var c;
    var d;
    var e = 3,
        f = 4;
}
```

:::

使用此规则与 `{ "initialized": "consecutive" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var: ["error", { "initialized": "consecutive" }]*/

function foo() {
    var a = 1;
    var b = 2;

    foo();

    var c = 3;
    var d = 4;
}
```

:::

使用此规则与 `{ "initialized": "consecutive" }` 选项的**正确**示例：

::: correct

```js
/*eslint one-var: ["error", { "initialized": "consecutive" }]*/

function foo() {
    var a = 1,
        b = 2;

    foo();

    var c = 3,
        d = 4;
}
```

:::

## 兼容

**JSHint**：这条规则映射到 JSHint 的 `onevar` 规则，但允许分开配置 `let` 和 `const`。
**JSCS**：这条规则大致上映射到 [disallowMultipleVarDecl](https://jscs-dev.github.io/rule/disallowMultipleVarDecl)。
**JSCS**：此规则选项 `separateRequires` 大致与 [requireMultipleVarDecl](https://jscs-dev.github.io/rule/requireMultipleVarDecl) 对应。
