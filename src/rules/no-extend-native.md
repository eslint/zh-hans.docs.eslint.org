---
title: no-extend-native
layout: doc
rule_type: suggestion
related_rules:
- no-global-assign
---

在 JavaScript 中，你可以扩展任何对象，包括内置或“原生”对象。有时，人们会改变这些本地对象的行为，从而打破代码中其他部分对它们的假设。

例如，在这里我们重写了一个内置方法，这将影响到所有的对象，甚至是其他内置对象。

```js
// seems harmless
Object.prototype.extra = 55;

// loop through some userIds
var users = {
    "123": "Stan",
    "456": "David"
};

// not what you'd expect
for (var id in users) {
    console.log(id); // "123", "456", "extra"
}
```

为了避免这个问题，一个常见的建议是用 `users.hasOwnProperty(id)` 来包裹 `for` 循环的内部。然而，如果这一规则在你的代码库中被严格执行，你就不需要采取这一步骤。

## 规则细节

不允许直接修改内置对象的原型。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-extend-native: "error"*/

Object.prototype.a = "a";
Object.defineProperty(Array.prototype, "times", { value: 999 });
```

:::

## 选项

这条规则接受一个 `exceptions` 选项，可以用来指定一个允许扩展的内置程序列表。

### exceptions

使用示例的 `{ "exceptions": ["Object"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/

Object.prototype.a = "a";
```

:::

## 已知限制

这条规则*不*报告任何以下不太明显的修改内置对象原型的方法。

```js
var x = Object;
x.prototype.thing = a;

eval("Array.prototype.forEach = 'muhahaha'");

with(Array) {
    prototype.thing = 'thing';
};

window.Function.prototype.bind = 'tight';
```

## 何时不用

在使用 polyfills 时，你可能想禁用这个规则，因为它试图用最新的规范来修补旧版本的 JavaScript，比如那些可能以对未来友好的方式修补 `Function.prototype.bind` 或 `Array.prototype.forEach`。
