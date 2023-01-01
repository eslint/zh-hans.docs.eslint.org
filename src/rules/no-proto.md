---
title: no-proto
rule_type: suggestion
further_reading:
- https://johnresig.com/blog/objectgetprototypeof/
---

`__proto__` 属性在 ECMAScript 3.1 中已经被废弃，不应该在代码中使用。使用 `Object.getPrototypeOf` 和 `Object.setPrototypeOf` 代替。

## 规则细节

当用 `new` 运算符创建一个对象时，`__proto__` 被设置为该对象的构造函数的原始“prototype”属性。`Object.getPrototypeOf` 是获取对象原型的首选方法。要改变一个对象的原型，使用 `Object.setPrototypeOf`。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-proto: "error"*/

var a = obj.__proto__;

var a = obj["__proto__"];

obj.__proto__ = b;

obj["__proto__"] = b;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-proto: "error"*/

var a = Object.getPrototypeOf(obj);

Object.setPrototypeOf(obj, b);

var c = { __proto__: a };
```

:::

## 何时不用

如果你需要支持那些实现了 `__proto__` 属性，而不是 `Object.getPrototypeOf` 或 `Object.setPrototypeOf`。
