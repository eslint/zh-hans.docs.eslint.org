---
title: no-undefined
layout: doc
rule_type: suggestion
related_rules:
- no-undef-init
- no-void
- no-shadow-restricted-names
- no-global-assign
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
- https://javascriptweblog.wordpress.com/2010/08/16/understanding-undefined-and-preventing-referenceerrors/
- https://es5.github.io/#x15.1.1.3
---

JavaScript 中的 `undefined` 变量实际上是全局对象的一个属性。因此，在 ECMAScript 3 中，可以覆盖 `undefined` 的值。虽然 ECMAScript 5 不允许覆盖 `undefined`，但仍有可能对 `undefined` 进行影射，例如：

```js
function doSomething(data) {
    var undefined = "hi";

    // doesn't do what you think it does
    if (data === undefined) {
        // ...
    }

}
```

因为 `undefined` 可以被覆盖或阴影，读取 `undefined` 可以得到一个意外的值（而 `null` 则不然，它是一个总是产生相同值的关键字）。为了防止这种情况，你可以避免所有 `undefined` 的使用，这是一些风格指南所建议的，也是本规则所执行的。这些风格指南还建议。

* 应该是 `undefined` 的变量被简单地保持未初始化（所有未初始化的变量在 JavaScript 中自动获得 `undefined` 的值）。
* 检查一个值是否是 `undefined` 应该用 `typeof` 来完成。
* 必要时使用 `void` 运算符来生成 `undefined` 的值。

作为替代，你可以使用 [no-global-assign](no-global-assign) 和 [no-shadow-restricted-names](no-shadow-restricted-names) 规则来防止 `undefined` 被阴影化或分配不同的值。这确保了 `undefined` 将始终保持其原始的、预期的值。

## 规则细节

这条规则旨在消除 `undefined` 的使用，因此只要使用它就会产生一个警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-undefined: "error"*/

var foo = undefined;

var undefined = "foo";

if (foo === undefined) {
    // ...
}

function foo(undefined) {
    // ...
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-undefined: "error"*/

var foo = void 0;

var Undefined = "foo";

if (typeof foo === "undefined") {
    // ...
}

global.undefined = "foo";
```

:::

## 何时不用

如果你想允许在你的代码中使用 `undefined`，那么你可以安全地关闭这个规则。
