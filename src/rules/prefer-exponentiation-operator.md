---
title: prefer-exponentiation-operator
layout: doc
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation
- https://bugs.chromium.org/p/v8/issues/detail?id=5848
---

在 ES2016 中引入的 infix 指数运算符 `**` 是标准 `Math.pow` 函数的替代品。

Infix 符号被认为更具可读性，因此比函数符号更可取。

## 规则细节

这条规则不允许调用 `Math.pow`，建议使用 `**` 运算符代替。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-exponentiation-operator: "error"*/

const foo = Math.pow(2, 8);

const bar = Math.pow(a, b);

let baz = Math.pow(a + b, c + d);

let quux = Math.pow(-1, n);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-exponentiation-operator: "error"*/

const foo = 2 ** 8;

const bar = a ** b;

let baz = (a + b) ** (c + d);

let quux = (-1) ** n;
```

:::

## 何时不用

除非你的代码库中支持 ES2016，否则不应使用这一规则。
