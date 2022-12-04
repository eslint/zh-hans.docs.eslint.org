---
title: no-new-wrappers
layout: doc
rule_type: suggestion
related_rules:
- no-array-constructor
- no-new-object
further_reading:
- https://www.inkling.com/read/javascript-definitive-guide-david-flanagan-6th/chapter-3/wrapper-objects
---

在 JavaScript 中，有三种原始类型的封装对象：字符串、数字和布尔值。它们分别由构造函数 `String`、`Number` 和 `Boolean` 表示。每当读取这些原始值之一时，就会使用原始包装类型，为它们提供类似对象的能力，如方法。在幕后，一个相关包装类型的对象被创建，然后被销毁，这就是为什么你可以调用原始值的方法，比如。

```js
var text = "Hello world".substring(2);
```

在这个例子的背后，一个 `String` 对象被构建。`substring()` 方法存在于 `String.prototype` 中，所以可以被字符串实例访问。

我们也可以手动创建一个新的封装器实例：

```js
var stringObject = new String("Hello world");
var numberObject = new Number(33);
var booleanObject = new Boolean(false);
```

虽然有可能，但没有任何好的理由将这些基元包装器用作构造函数。它们更容易让其他开发者感到困惑，因为它们看起来应该像基元一样行事，但实际上并非如此。比如：

```js
var stringObject = new String("Hello world");
console.log(typeof stringObject);       // "object"

var text = "Hello world";
console.log(typeof text);               // "string"

var booleanObject = new Boolean(false);
if (booleanObject) {    // all objects are truthy!
    console.log("This executes");
}
```

第一个问题是，原始包装对象实际上是对象。这意味着 `typeof` 将返回`"object"`，而不是 `"string"`、`"number"` 或 `"boolean"`。第二个问题来自于布尔型对象。每个对象都是真实的，这意味着 `Boolean` 的一个实例总是被解析为 `true`，即使它的实际值是 `false`。

由于这些原因，避免使用原始包装类型和 `new` 被认为是一种最佳做法。

## 规则细节

这条规则的目的是消除 `String`、`Number` 和 `Boolean` 与 `new` 运算符的使用。因此只要发现 `new String`、`new Number` 或 `new Boolean`，它就会发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-new-wrappers: "error"*/

var stringObject = new String("Hello world");
var numberObject = new Number(33);
var booleanObject = new Boolean(false);

var stringObject = new String;
var numberObject = new Number;
var booleanObject = new Boolean;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-new-wrappers: "error"*/

var text = String(someValue);
var num = Number(someValue);

var object = new MyString();
```

:::

## 何时不用

如果你想允许使用原始的包装对象，你可以安全地禁用此规则。
