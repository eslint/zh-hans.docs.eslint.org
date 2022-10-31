---
title: no-inner-declarations
layout: doc
rule_type: problem
---

在 JavaScript 中，在 ES6 之前，函数声明只允许出现在程序的第一层或另一个函数的主体中，尽管解析器有时[错误地在其他地方接受它们](https://code.google.com/p/esprima/issues/detail?id=422)。这只适用于函数声明；命名或匿名的函数表达式可以出现在允许表达式的任何地方。

```js
// Good
function doSomething() { }

// Bad
if (test) {
    function doSomethingElse () { }
}

function anotherThing() {
    var fn;

    if (test) {

        // Good
        fn = function expression() { };

        // Bad
        function declaration() { }
    }
}
```

变量声明可以出现在语句的任何地方，甚至可以深深嵌套在其他块中。这通常是不可取的，因为变量的悬挂，将声明移到程序或函数体的根部可以提高清晰度。请注意，[块绑定](https://leanpub.com/understandinges6/read#leanpub-auto-block-bindings) (`let`, `const`) 并不是 hoisted 的，因此它们不受此规则影响。

```js
/*eslint-env es6*/

// Good
var foo = 42;

// Good
if (foo) {
    let bar1;
}

// Bad
while (test) {
    var bar2;
}

function doSomething() {
    // Good
    var baz = true;

    // Bad
    if (baz) {
        var quux;
    }
}
```

## 规则细节

这条规则要求函数声明和可选的变量声明必须在程序的根部，或在函数主体的根部，或在类静态块的主体根部。

## 选项

此规则选项为字符串：

* `"function"`（默认值）不允许在嵌套块中声明 `function`
* `"both"` 不允许在嵌套块中声明 `function` 和 `var`

### functions

使用此规则与默认的 `"functions"` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-inner-declarations: "error"*/

if (test) {
    function doSomething() { }
}

function doSomethingElse() {
    if (test) {
        function doAnotherThing() { }
    }
}

if (foo) function f(){}

class C {
    static {
        if (test) {
            function doSomething() { }
        }
    }
}
```

:::

使用此规则与默认的 `"functions"` 选项的**正确**示例：

::: correct

```js
/*eslint no-inner-declarations: "error"*/

function doSomething() { }

function doSomethingElse() {
    function doAnotherThing() { }
}

class C {
    static {
        function doSomething() { }
    }
}

if (test) {
    asyncCall(id, function (err, data) { });
}

var fn;
if (test) {
    fn = function fnExpression() { };
}

if (foo) var a;
```

:::

### both

使用此规则与 `"both"` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-inner-declarations: ["error", "both"]*/

if (test) {
    var foo = 42;
}

function doAnotherThing() {
    if (test) {
        var bar = 81;
    }
}

if (foo) var a;

if (foo) function f(){}

class C {
    static {
        if (test) {
            var something;
        }
    }
}
```

:::

使用此规则与 `"both"` 选项的**正确**示例：

::: correct

```js
/*eslint no-inner-declarations: ["error", "both"]*/

var bar = 42;

if (test) {
    let baz = 43;
}

function doAnotherThing() {
    var baz = 81;
}

class C {
    static {
        var something;
    }
}
```

:::

## 何时不用

当 [block-scoped functions](https://bugzilla.mozilla.org/show_bug.cgi?id=585536) 登陆 ES6 时，函数声明部分规则将被淘汰，但在那之前，它应该被打开以强制执行有效的结构。当使用 [block-scoped-var](block-scoped-var) 或在嵌套块中声明变量是可以接受的，尽管有 hoisting 时，禁用检查变量的声明。
