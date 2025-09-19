---
title: wrap-regex
rule_type: layout
---

此规则在此规则在 ESLint v8.53.0 中被**废弃**。请使用 [`@stylistic/eslint-plugin-js`](https://eslint.style/packages/js) 中对应的规则。

当正则表达式在某些情况下被使用时，它可能最终看起来像一个除法运算符。比如：

```js
function a() {
    return /foo/.test("bar");
}
```

## 规则细节

这用于消除斜线运算符的歧义，并有利于提高代码的可读性。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint wrap-regex: "error"*/

function a() {
    return /foo/.test("bar");
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint wrap-regex: "error"*/

function a() {
    return (/foo/).test("bar");
}
```

:::
