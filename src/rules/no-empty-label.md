---
title: no-empty-label

related_rules:
- no-labels
- no-label-var
- no-unused-labels
---

不允许给循环和开关以外的东西贴标签。

（已移除）此规则在 ESLint v2.0 中移除并被 [no-labels](no-labels) 所取代。

标记的语句只与标记的 break 和 continue 语句一起使用。ECMAScript 没有 goto 语句。

## 规则细节

当标签被用来标记一个不是迭代或切换的语句时，会发生这个错误

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-empty-label: "error"*/

labeled:
var x = 10;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-empty-label: "error"*/

labeled:
for (var i=10; i; i--) {
    // ...
}
```

:::

## 何时不用

如果你不希望被通知标签的使用情况，你可以安全地禁用此规则。
