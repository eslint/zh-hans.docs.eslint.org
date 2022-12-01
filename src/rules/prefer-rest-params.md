---
title: prefer-rest-params
layout: doc
rule_type: suggestion
related_rules:
- prefer-spread
---

在ES2015中，有休息参数。
我们可以将该功能用于变量函数而不是 `arguments`变量。

`arguments` 没 有`Array.prototype` 的方法，所以有点不方便。

## 规则细节

这条规则的目的是标记 `arguments` 变量的使用。

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-rest-params: "error"*/

function foo() {
    console.log(arguments);
}

function foo(action) {
    var args = Array.prototype.slice.call(arguments, 1);
    action.apply(null, args);
}

function foo(action) {
    var args = [].slice.call(arguments, 1);
    action.apply(null, args);
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-rest-params: "error"*/

function foo(...args) {
    console.log(args);
}

function foo(action, ...args) {
    action.apply(null, args); // or `action(...args)`, related to the `prefer-spread` rule.
}

// Note: the implicit arguments can be overwritten.
function foo(arguments) {
    console.log(arguments); // This is the first argument.
}
function foo() {
    var arguments = 0;
    console.log(arguments); // This is a local variable.
}
```

:::

## 何时不用

不应该在 ES3/5 环境中使用此规则。

在ES2015（ES6）或更高版本中，如果你不希望被通知到 `arguments` 变量，你可以安全地禁用此规则。
