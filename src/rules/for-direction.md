---
title: for-direction
rule_type: problem
---

## 规则细节

一个有停止条件的 `for` 循环永远不会达到，比如一个向错误方向移动的计数器，将无限地运行。虽然在某些情况下会出现无限循环，但惯例是将这种循环构造为 `while` 循环。更典型的是，无限 for 循环是一个错误。

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint for-direction: "error"*/
for (var i = 0; i < 10; i--) {
}

for (var i = 10; i >= 0; i++) {
}

for (var i = 0; i > 10; i++) {
}
```

:::

使用此规则的**正确**示例：

:::correct

```js
/*eslint for-direction: "error"*/
for (var i = 0; i < 10; i++) {
}
```

:::
