---
title: no-arrow-condition

related_rules:
- arrow-parens
- no-confusing-arrow
- no-constant-condition
---

不允许在期望测试条件的地方使用箭头函数。

（已移除）这条规则在 ESLint v2.0 中**移除**，并被 [no-confusing-arrow](no-confusing-arrow) 和 [no-constant-condition](no-constant-condition) 规则组合所取代。

箭头函数（`=>`）在语法上与一些比较运算符（`>`、`<`、`<=` 和 `>=`）相似。这条规则警告说，不要在预期有条件的地方使用箭头函数的语法。即使箭头函数的参数是用圆括号包装的，这条规则仍然警告它。

这里有一个例子，使用 `=>` 很有可能是手抖：

```js
// This is probably a typo
if (a => 1) {}
// And should instead be
if (a >= 1) {}
```

还有一些情况下，`=>` 的用法可能会有歧义，应该改写以更清楚地表明作者的意图。

```js
// The intent is not clear
var x = a => 1 ? 2 : 3
// Did the author mean this
var x = function (a) { return a >= 1 ? 2 : 3 }
// 或 this
var x = a <= 1 ? 2 : 3
```

## 规则细节

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint no-arrow-condition: "error"*/
/*eslint-env es6*/

if (a => 1) {}
while (a => 1) {}
for (var a = 1; a => 10; a++) {}
a => 1 ? 2 : 3
(a => 1) ? 2 : 3
var x = a => 1 ? 2 : 3
var x = (a) => 1 ? 2 : 3
```

:::
