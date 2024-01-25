---
title: no-func-assign
rule_type: problem
handled_by_typescript: true
---

JavaScript 函数可以被写成 FunctionDeclaration `function foo() { ... }` 或 FunctionExpression `var foo = function() { ... };`. 虽然 JavaScript 解释器可能会容忍它，但覆盖/重新分配一个写成 FunctionDeclaration 的函数，往往表明有错误或问题。

```js
function foo() {}
foo = bar;
```

## 规则细节

这条规则不允许重新分配 `function` 的声明。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-func-assign: "error"*/

function foo() {}
foo = bar;

function foo() {
    foo = bar;
}

var a = function hello() {
  hello = 123;
};
```

:::

使用此规则的**错误**示例，与 JSHint 中的相应规则不同：

::: incorrect

```js
/*eslint no-func-assign: "error"*/

foo = bar;
function foo() {}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-func-assign: "error"*/

var foo = function () {}
foo = bar;

function foo(foo) { // `foo` is shadowed.
    foo = bar;
}

function foo() {
    var foo = bar;  // `foo` is shadowed.
}
```

:::
