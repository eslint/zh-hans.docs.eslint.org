---
title: no-unneeded-ternary
layout: doc
rule_type: suggestion
related_rules:
- no-ternary
- no-nested-ternary
---

在 JavaScript 中，使用条件表达式在两个布尔值之间进行选择，而不使用 ! 将测试转换为布尔值，是一个常见错误。
这里有一些例子：

```js
// Bad
var isYes = answer === 1 ? true : false;

// Good
var isYes = answer === 1;

// Bad
var isNo = answer === 1 ? false : true;

// Good
var isNo = answer !== 1;
```

另一个常见的错误是使用一个单一的变量作为条件测试和结果。在这种情况下，可以使用逻辑 `OR` 来提供同样的功能。
下面是一个例子：

```js
// Bad
foo(bar ? bar : 1);

// Good
foo(bar || 1);
```

## 规则细节

当存在更简单的选择时，这条规则不允许三元运算符。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unneeded-ternary: "error"*/

var a = x === 2 ? true : false;

var a = x ? true : false;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-unneeded-ternary: "error"*/

var a = x === 2 ? "Yes" : "No";

var a = x !== false;

var a = x ? "Yes" : "No";

var a = x ? y : x;

f(x ? x : 1); // default assignment - would be disallowed if defaultAssignment option set to false. See option details below.
```

:::

## 选项

此规则选项为对象：

* `"defaultAssignment": true`（默认值）允许将条件表达式作为默认赋值模式
* `"defaultAssignment": false` 不允许将条件表达式作为默认赋值模式

### defaultAssignment

当默认为 `true` 时，defaultAssignment 选项允许 `x ? x : expr` 形式的表达式（其中 `x` 是任意标识符，`expr` 是任意表达式）。

使用此规则与 `{ "defaultAssignment": false }` 选项的额外**错误**示例，：

::: incorrect

```js
/*eslint no-unneeded-ternary: ["error", { "defaultAssignment": false }]*/

var a = x ? x : 1;

f(x ? x : 1);
```

:::

请注意，`defaultAssignment: false` 仍然允许形式为 `x ? expr : x` 的表达式（其中标识符位于三元组的右侧）。

## 何时不用

如果你不关心条件表达式中不必要的复杂性，你可以把这个规则关掉。
