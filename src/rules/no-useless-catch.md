---
title: no-useless-catch
rule_type: suggestion
---

一个只重新抛出原始错误的 `catch` 子句是多余的，对程序的运行行为没有影响。这些多余的子句可能是混乱和代码膨胀的来源，所以最好不允许这些不必要的 `catch` 子句。

## 规则细节

这条规则报告的 `catch` 子句只 `throw` 被捕获的错误。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-useless-catch: "error"*/

try {
  doSomethingThatMightThrow();
} catch (e) {
  throw e;
}

try {
  doSomethingThatMightThrow();
} catch (e) {
  throw e;
} finally {
  cleanUp();
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-useless-catch: "error"*/

try {
  doSomethingThatMightThrow();
} catch (e) {
  doSomethingBeforeRethrow();
  throw e;
}

try {
  doSomethingThatMightThrow();
} catch (e) {
  handleError(e);
}

try {
  doSomethingThatMightThrow();
} finally {
  cleanUp();
}
```

:::

## 何时不用

如果你不希望被通知到不必要的捕获条款，你可以安全地禁用这个规则。
