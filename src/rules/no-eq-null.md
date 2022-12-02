---
title: no-eq-null
layout: doc
rule_type: suggestion
---

在没有类型检查运算符（`==` 或 `!=`）的情况下与 `null` 比较，可能会产生意想不到的结果，因为在与 `null` 和 `undefined` 的值比较时，比较结果将为真。

```js
if (foo == null) {
  bar();
}
```

## 规则细节

`no-eq-null` 规则旨在通过确保对 `null` 的比较只匹配 `null`，而不匹配 `undefined` 来减少潜在错误和不需要的行为。因此，当使用 `==` 和 `!=` 时，它将标记对 null 的比较。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-eq-null: "error"*/

if (foo == null) {
  bar();
}

while (qux != null) {
  baz();
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-eq-null: "error"*/

if (foo === null) {
  bar();
}

while (qux !== null) {
  baz();
}
```

:::

## 何时不用

如果你想在一般情况下执行类型检查操作，请使用更强大的 [eqeqeq](./eqeqeq) 代替。

## 兼容

**JSHint**：该规则对应于 JSHint 的 `eqnull` 规则。
