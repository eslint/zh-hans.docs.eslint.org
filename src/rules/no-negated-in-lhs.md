---
title: no-negated-in-lhs
rule_type: problem
---

此规则在 ESLint v3.3.0 中废弃并被 [no-unsafe-negation](no-unsafe-negation) 规则所取代。

就像开发者可能会输入 `-a + b`，而他们的意思是 `-(a + b)` 表示一个和的负数，他们可能会错误地输入 `!key in object`，而他们几乎肯定是指 `!(key in object)` 来测试一个键不在一个对象中。

## 规则细节

这条规则不允许在 `in` 表达式中否定左边的操作数。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-negated-in-lhs: "error"*/

if(!key in object) {
    // operator precedence makes it equivalent to (!key) in object
    // and type conversion makes it equivalent to (key ? "false" : "true") in object
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-negated-in-lhs: "error"*/

if(!(key in object)) {
    // key is not in object
}

if(('' + !key) in object) {
    // make operator precedence and type conversion explicit
    // in a rare situation when that is the intended meaning
}
```

:::

## 何时不用

绝不要。
