---
title: no-self-compare
layout: doc
rule_type: problem
---

将一个变量与自身进行比较通常是一个错误，要么是打字错误，要么是重构错误。它让读者感到困惑，并有可能带来运行时的错误。

只有在测试 `NaN` 的时候，你才会将一个变量与它自己进行比较。然而，使用 `typeof x === 'number' && isNaN (x)` 或 [Number.isNaN ES2015 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) 来处理这个用例，比让代码的读者来确定自我比较的意图要合适得多。

## 规则细节

提出这个错误是为了强调一个潜在的混乱和潜在的无意义的代码。几乎没有任何情况下，你会需要将某物与自身进行比较。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-self-compare: "error"*/

var x = 10;
if (x === x) {
    x = 20;
}
```

:::
