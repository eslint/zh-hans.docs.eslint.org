---
title: no-new-native-nonconstructor
layout: doc
rule_type: problem
related_rules:
- no-obj-calls
further_reading:
- https://tc39.es/ecma262/#sec-symbol-constructor
- https://tc39.es/ecma262/#sec-bigint-constructor
---

在 JavaScript 中，约定俗成大写字母开头的全局变量通常代表可以使用 `new` 操作符进行实例化的类，如 `new Array` 和 `new Map`。但令人困惑的是，JavaScript 还提供了一些以大写字母开头的全局变量，这些变量不能使用 `new` 操作符来调用，如果你试图这样做，就会出现错误。这些通常是与数据类型有关的函数，它们经常性地被误认为是类。请看下面的例子：

```js
// throws a TypeError
let foo = new Symbol("foo");

// throws a TypeError
let result = new BigInt(9007199254740991);
```

由于 `new Symbol` 和 `new BigInt` 都是函数并不是类，所以都抛出了类型错误。将大写字母假定为类就很容易犯这个错误。

## 规则细节

此规则旨在阻止使用 `new` 操作符意外调用原生 JavaScript 全局函数。这些函数是：

* `Symbol`
* `BigInt`

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-new-native-nonconstructor: "error"*/
/*eslint-env es2022*/

var foo = new Symbol('foo');
var bar = new BigInt(9007199254740991);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-new-native-nonconstructor: "error"*/
/*eslint-env es2022*/

var foo = Symbol('foo');
var bar = BigInt(9007199254740991);

// Ignores shadowed Symbol.
function baz(Symbol) {
    const qux = new Symbol("baz");
}
function quux(BigInt) {
    const corge = new BigInt(9007199254740991);
}

```

:::

## 何时不用

此规则不应该在 ES3/5 环境中使用。
