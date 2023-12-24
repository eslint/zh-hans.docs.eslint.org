---
title: for-direction
rule_type: problem
---

一个包含永远无法达到的停止条件的 `for` 循环，将会一直运行，比如一个计数器朝着错误的方向变化。虽然有时会有意使用无限循环，但惯例是构建这样的循环时使用 `while` 循环。大多情况下一直运行的 `for` 循环通常其实是一个错误。

## 规则细节

该规则禁止使用计数变量的变化导致停止条件永远不会满足的 `for` 循环。例如，如果计数变量是递增的（即 `i++`），并且停止条件测试计数器是否大于零（`i >= 0`），那么循环将永远不会退出。

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

const n = -2;
for (let i = 0; i < 10; i += n) {
}
```

:::

使用此规则的**正确**示例：

:::correct

```js
/*eslint for-direction: "error"*/
for (var i = 0; i < 10; i++) {
}

for (let i = 10; i >= 0; i += this.step) { // direction unknown
}

for (let i = MIN; i <= MAX; i -= 0) { // not increasing or decreasing
}
```

:::
