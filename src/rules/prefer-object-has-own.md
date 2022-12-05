---
title: prefer-object-has-own
layout: doc
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
---

这样写的代码很常见：

```js
if (Object.prototype.hasOwnProperty.call(object, "foo")) {
  console.log("has property foo");
}
```

这是一种常见的做法，因为 `Object.prototype` 上的方法有时会不可用或被重新定义（参见 [no-prototype-builtins](no-prototype-builtins) 规则）。

在 ES2022 中引入的 `Object.hasOwn()` 是 `Object.prototype.hasOwnProperty.call()` 的一个更简短的替代方法。

```js
if (Object.hasOwn(object, "foo")) {
  console.log("has property foo")
}
```

## 规则细节

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-object-has-own: "error"*/

Object.prototype.hasOwnProperty.call(obj, "a");

Object.hasOwnProperty.call(obj, "a");

({}).hasOwnProperty.call(obj, "a");

const hasProperty = Object.prototype.hasOwnProperty.call(object, property);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-object-has-own: "error"*/

Object.hasOwn(obj, "a");

const hasProperty = Object.hasOwn(object, property);
```

:::

## 何时不用

除非你的代码库中支持 ES2022，否则不应使用这一规则。
