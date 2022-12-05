---
title: require-yield
layout: doc
rule_type: suggestion
related_rules:
- require-await
---

## 规则细节

该规则对没有 `yield` 关键字的生成器函数产生警告。

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint require-yield: "error"*/
/*eslint-env es6*/

function* foo() {
  return 10;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint require-yield: "error"*/
/*eslint-env es6*/

function* foo() {
  yield 5;
  return 10;
}

function foo() {
  return 10;
}

// This rule does not warn on empty generator functions.
function* foo() { }
```

:::

## 何时不用

如果你不想通知没有 `yield` 表达的生成器函数，你可以安全地禁用此规则。
