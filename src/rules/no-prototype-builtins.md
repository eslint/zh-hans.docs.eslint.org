---
title: no-prototype-builtins
layout: doc
rule_type: problem
---

在 ECMAScript 5.1 中，添加了 `Object.create`，它可以创建具有指定`[[Prototype]]` 的对象。`Object.create(null)` 是一种常用的模式，用于创建将被用作 Map 的对象。当假定对象将具有来自`Object.prototype` 的属性时，这可能导致错误。这条规则阻止了从一个对象中直接调用一些 `Object.prototype` 方法。

此外，对象可以拥有影射 `Object.prototype` 上的内置属性，可能会导致非预期的行为或拒绝服务的安全漏洞。例如，网络服务器解析来自客户端的 JSON 输入，并直接在结果对象上调用 `hasOwnProperty` 是不安全的，因为恶意的客户端可以发送一个 JSON 值，如 `{"hasOwnProperty": 1}` 并导致服务器崩溃。

为了避免像这样微妙的错误，最好总是从 `Object.prototype` 调用这些方法。例如，`foo.hasOwnProperty("bar")` 应该被替换为 `Object.prototype.hasOwnProperty.call(foo, "bar")`。

## 规则细节

这条规则不允许在对象实例上直接调用一些 `Object.prototype` 方法。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-prototype-builtins: "error"*/

var hasBarProperty = foo.hasOwnProperty("bar");

var isPrototypeOfBar = foo.isPrototypeOf(bar);

var barIsEnumerable = foo.propertyIsEnumerable("bar");
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-prototype-builtins: "error"*/

var hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");

var isPrototypeOfBar = Object.prototype.isPrototypeOf.call(foo, bar);

var barIsEnumerable = {}.propertyIsEnumerable.call(foo, "bar");
```

:::

## 何时不用

如果你的代码只触及有硬编码键的对象，并且你永远不会使用影射 `Object.prototype` 方法的对象或不继承于 `Object.prototype` 的对象，你可能想关闭这个规则。
