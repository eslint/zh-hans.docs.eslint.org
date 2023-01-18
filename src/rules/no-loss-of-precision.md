---
title: no-loss-of-precision
rule_type: problem
---

这条规则将不允许使用在运行时由于 64 位浮点四舍五入而在转换为 JS `Number` 时失去精度的数字字面。

## 规则细节

在 JS 中，根据 [IEEE 754 标准](https://en.wikipedia.org/wiki/IEEE_754)，`Number` 被存储为双精度浮点数字。正因为如此，数字只能保持一定数量的精度。如果程序员输入额外的数字，这些数字将在转换为 `Number` 类型的过程中丢失，并会导致意外行为。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-loss-of-precision: "error"*/

const x = 9007199254740993
const x = 5123000000000000000000000000001
const x = 1230000000000000000000000.0
const x = .1230000000000000000000000
const x = 0X20000000000001
const x = 0X2_000000000_0001;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-loss-of-precision: "error"*/

const x = 12345
const x = 123.456
const x = 123e34
const x = 12300000000000000000000000
const x = 0x1FFFFFFFFFFFFF
const x = 9007199254740991
const x = 9007_1992547409_91
```

:::
