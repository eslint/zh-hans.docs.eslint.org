---
title: no-loop-func
layout: doc
rule_type: suggestion
---

在循环中编写函数往往会导致错误，这是因为函数在循环周围创建了一个闭合的方式。比如：

```js
for (var i = 0; i < 10; i++) {
    funcs[i] = function() {
        return i;
    };
}
```

在这种情况下，你会期望在循环中创建的每个函数返回一个不同的数字。实际上，每个函数都返回 10，因为那是作用域中 `i` 的最后一个值。

`let` 或 `const` 可以缓解这个问题。

```js
/*eslint-env es6*/

for (let i = 0; i < 10; i++) {
    funcs[i] = function() {
        return i;
    };
}
```

在这种情况下，在循环中创建的每个函数都会按照预期返回一个不同的数字。

## 规则细节

这个错误的出现是为了强调一段可能无法像你所期望的那样工作的代码，也可能表明对语言工作方式的误解。如果你不修复这个错误，你的代码可能会顺利运行，但在某些情况下，它可能会有意外的表现。

这条规则不允许循环中的任何函数包含不安全的引用（例如对外部作用域的修改变量）。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-loop-func: "error"*/
/*eslint-env es6*/

for (var i=10; i; i--) {
    (function() { return i; })();
}

while(i) {
    var a = function() { return i; };
    a();
}

do {
    function a() { return i; };
    a();
} while (i);

let foo = 0;
for (let i = 0; i < 10; ++i) {
    //Bad, `foo` is not in the loop-block's scope and `foo` is modified in/after the loop
    setTimeout(() => console.log(foo));
    foo += 1;
}

for (let i = 0; i < 10; ++i) {
    //Bad, `foo` is not in the loop-block's scope and `foo` is modified in/after the loop
    setTimeout(() => console.log(foo));
}
foo = 100;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-loop-func: "error"*/
/*eslint-env es6*/

var a = function() {};

for (var i=10; i; i--) {
    a();
}

for (var i=10; i; i--) {
    var a = function() {}; // OK, no references to variables in the outer scopes.
    a();
}

for (let i=10; i; i--) {
    var a = function() { return i; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

var foo = 100;
for (let i=10; i; i--) {
    var a = function() { return foo; }; // OK, all references are referring to never modified variables.
    a();
}
//... no modifications of foo after this loop ...
```

:::
