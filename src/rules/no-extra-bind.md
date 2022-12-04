---
title: no-extra-bind
layout: doc
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
- https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
---

`bind()` 方法用于创建具有特定 `this` 值的函数，另外，将参数与特定值绑定。当用于指定 `this` 的值时，重要的是该函数在其函数体中实际使用 `this`。比如：

```js
var boundGetName = (function getName() {
    return this.name;
}).bind({ name: "ESLint" });

console.log(boundGetName());      // "ESLint"
```

这段代码是一个很好的使用 `bind()` 的例子，用于设置 `this` 的值。

有时在代码维护过程中，`this` 的值被从函数体中删除。在这种情况下，你可能会出现对 `bind()` 的调用，但却没有任何结果。

```js
// useless bind
var boundGetName = (function getName() {
    return "ESLint";
}).bind({ name: "ESLint" });

console.log(boundGetName());      // "ESLint"
```

在这段代码中，已经删除 `this` 的引用，但 `bind()` 仍然被使用。在这种情况下，`bind()` 是不必要的开销（和性能上的打击），可以安全地删除。

## 规则细节

这条规则的目的是避免不必要地使用 `bind()`，因此当一个立即调用的函数表达式（IIFE）使用 `bind()` 并且没有适当的 `this` 值时，将发出警告。这条规则不会标记包括函数参数绑定在内的 `bind()` 的用法。

**注意**：箭头函数不能使用 `bind()` 来设置其 `this` 值。这条规则将所有使用箭头函数的 `bind()` 标记为一个问题。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-extra-bind: "error"*/
/*eslint-env es6*/

var x = function () {
    foo();
}.bind(bar);

var x = (() => {
    foo();
}).bind(bar);

var x = (() => {
    this.foo();
}).bind(bar);

var x = function () {
    (function () {
      this.foo();
    }());
}.bind(bar);

var x = function () {
    function foo() {
      this.bar();
    }
}.bind(baz);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-extra-bind: "error"*/

var x = function () {
    this.foo();
}.bind(bar);

var x = function (a) {
    return a + 1;
}.bind(foo, bar);
```

:::

## 何时不用

如果你不关心对 `bind()` 的不必要的调用，你可以安全地禁用这个规则。
