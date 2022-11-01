---
title: no-empty
layout: doc
rule_type: suggestion
related_rules:
- no-empty-function
---

虽然在技术上空块语句并不是错误，但通常是由于没有完成的重构而发生。它们会在阅读代码时会引起混乱。

## 规则细节

使用此规则禁用空块语句。此规则忽略了包含注释的块语句（例如在 `try` 语句中空的 `catch` 或 `finally` 块，表示无论有无错误都应继续执行）。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-empty: "error"*/

if (foo) {
}

while (foo) {
}

switch(foo) {
}

try {
    doSomething();
} catch(ex) {

} finally {

}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-empty: "error"*/

if (foo) {
    // empty
}

while (foo) {
    /* empty */
}

try {
    doSomething();
} catch (ex) {
    // continue regardless of error
}

try {
    doSomething();
} finally {
    /* continue regardless of error */
}
```

:::

## 选项

这条规则有一个用于处理例外情况的对象选项：

* `"allowEmptyCatch": true` 允许空的 `catch` 子句（即不包含注释）。

### allowEmptyCatch

是呀此规则与 `{ "allowEmptyCatch": true }` 选项的额外**正确**示例：

::: correct

```js
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
try {
    doSomething();
} catch (ex) {}

try {
    doSomething();
}
catch (ex) {}
finally {
    /* continue regardless of error */
}
```

:::

## 何时不用

如果你故意使用空块语句，那么你可以禁用这一规则。
