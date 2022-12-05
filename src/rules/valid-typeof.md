---
title: valid-typeof
layout: doc
rule_type: problem
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
---

在绝大多数情况下，`typeof` 运算符的结果是以下字符串字面的一个：`"undefined"`, `"object"`, `"boolean"`, `"number"`, `"string"`, `"function"`, `"symbol"`, and `"bigint"`。将 `typeof` 运算符的结果与其他字符串字面量进行比较，通常是一个打字错误。

## 规则细节

这条规则强制将 `typeof` 表达式与有效的字符串字面进行比较。

## 选项

此规则选项为对象：

* `"requireStringLiterals": true` 要求 `typeof` 表达式只能与字符串字面或其他 `typeof` 表达式进行比较，不允许与任何其他值进行比较。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint valid-typeof: "error"*/

typeof foo === "strnig"
typeof foo == "undefimed"
typeof bar != "nunber"
typeof bar !== "fucntion"
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint valid-typeof: "error"*/

typeof foo === "string"
typeof bar == "undefined"
typeof foo === baz
typeof bar === typeof qux
```

:::

使用 `{ "requireStringLiterals": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint valid-typeof: ["error", { "requireStringLiterals": true }]*/

typeof foo === undefined
typeof bar == Object
typeof baz === "strnig"
typeof qux === "some invalid type"
typeof baz === anotherVariable
typeof foo == 5
```

:::

使用 `{ "requireStringLiterals": true }` 选项的**正确**示例：

::: correct

```js
/*eslint valid-typeof: ["error", { "requireStringLiterals": true }]*/

typeof foo === "undefined"
typeof bar == "object"
typeof baz === "string"
typeof bar === typeof qux
```

:::

## 何时不用

如果你将在主机对象上使用 `typeof` 运算符，你可能想关闭这个规则。
