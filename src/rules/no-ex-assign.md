---
title: no-ex-assign
layout: doc
rule_type: problem
further_reading:
- https://bocoup.com/blog/the-catch-with-try-catch
---

如果 `try` 语句中的 `catch` 子句意外地（或故意地）为异常参数指定了另一个值，那么从那时起就不可能再提到这个错误。
由于 `arguments` 对象没有提供对该数据的替代访问，分配参数绝对是破坏性的。

## 规则细节

这条规则不允许在 `catch` 子句中重新分配异常。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-ex-assign: "error"*/

try {
    // code
} catch (e) {
    e = 10;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-ex-assign: "error"*/

try {
    // code
} catch (e) {
    var foo = 10;
}
```

:::
