---
title: no-compare-neg-zero
rule_type: problem
---

## 规则细节

这条规则应该对试图与 `-0` 比较的代码提出警告，因为这不会像预期的那样工作。也就是说，像 `x === -0` 这样的代码对于 `+0` 和 `-0` 都会通过。作者可能想要的是 `Object.is(x, -0)`。

使用此规则的**错误**示例：

::: incorrect

```js
/* eslint no-compare-neg-zero: "error" */

if (x === -0) {
    // doSomething()...
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/* eslint no-compare-neg-zero: "error" */

if (x === 0) {
    // doSomething()...
}
```

:::

::: correct

```js
/* eslint no-compare-neg-zero: "error" */

if (Object.is(x, -0)) {
    // doSomething()...
}
```

:::
