---
title: no-sparse-arrays
rule_type: problem
further_reading:
- https://www.nczonline.net/blog/2007/09/09/inconsistent-array-literals/
---

稀疏数组包含空槽，最常见的原因是在数组字面中使用了多个逗号，如：

```js
var items = [,,];
```

虽然这个例子中的 `items` 数组的 `length` 为 2，但是实际上 `items[0]` 和 `items[1]` 根本没有任何值。事实上，数组字面是有效的，里面只有逗号，再加上设置了 `length`，而实际的项目中没有设置值，使得稀疏数组让许多开发者感到困惑。请考虑以下情况：

```js
var colors = [ "red",, "blue" ];
```

在这个例子中，`colors` 数组的 `length` 为 3，但开发者是否想让数组中间有一个空点？还是打错了？

以这种方式定义的稀疏数组的混乱程度足以让我们建议避免使用它们，除非你确定它们在你的代码中是有用的。

## 规则细节

这条规则不允许稀疏数组字面有“holes”，即逗号不在元素之前。它不适用于最后一个元素后面的尾部逗号。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-sparse-arrays: "error"*/

var items = [,];
var colors = [ "red",, "blue" ];
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-sparse-arrays: "error"*/

var items = [];
var items = new Array(23);

// trailing comma (after the last element) is not a problem
var colors = [ "red", "blue", ];
```

:::

## 何时不用

如果你想使用稀疏数组，那么禁用这一规则是安全的。
