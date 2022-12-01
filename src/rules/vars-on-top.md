---
title: vars-on-top
layout: doc
rule_type: suggestion
further_reading:
- https://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting
- https://danhough.com/blog/single-var-pattern-rant/
- https://benalman.com/news/2012/05/multiple-var-statements-javascript/
---

当变量声明没有在函数范围的顶部或程序的顶部连续使用时，`vars-on-top` 规则会产生警告。
默认情况下，变量声明总是被 JavaScript 解释器隐蔽地移动（“提升”）到其包含的作用域顶部。
这条规则迫使程序员通过手动将变量声明移到其包含的作用域的顶部来表示这一行为。

## 规则细节

这条规则的目的是将所有的变量声明保持在前面的一系列语句中。
允许多个声明有助于促进可维护性，因此是允许的。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint vars-on-top: "error"*/

// Variable declaration in a nested block, and a variable declaration after other statements:
function doSomething() {
    if (true) {
        var first = true;
    }
    var second;
}

// Variable declaration in for initializer:
function doSomething() {
    for (var i=0; i<10; i++) {}
}
```

:::

::: incorrect

```js
/*eslint vars-on-top: "error"*/

// Variable declaration after other statements:
f();
var a;
```

:::

::: incorrect

```js
/*eslint vars-on-top: "error"*/

// Variables in class static blocks should be at the top of the static blocks.

class C {

    // Variable declaration in a nested block:
    static {
        if (something) {
            var a = true;
        }
    }

    // Variable declaration after other statements:
    static {
        f();
        var a;
    }

}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint vars-on-top: "error"*/

function doSomething() {
    var first;
    var second; //multiple declarations are allowed at the top
    if (true) {
        first = true;
    }
}

function doSomething() {
    var i;
    for (i=0; i<10; i++) {}
}
```

:::

::: correct

```js
/*eslint vars-on-top: "error"*/

var a;
f();
```

:::

::: correct

```js
/*eslint vars-on-top: "error"*/

class C {

    static {
        var a;
        if (something) {
            a = true;
        }
    }

    static {
        var a;
        f();
    }

}
```

:::

::: correct

```js
/*eslint vars-on-top: "error"*/

// Directives may precede variable declarations.
"use strict";
var a;
f();

// Comments can describe variables.
function doSomething() {
    // this is the first var.
    var first;
    // this is the second var.
    var second
}
```

:::
