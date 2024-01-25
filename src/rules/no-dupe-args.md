---
title: no-dupe-args
rule_type: problem
handled_by_typescript: true
---

如果在一个函数定义中，有一个以上的参数有相同的名称，那么最后出现的参数会“影射”前面的参数。重复的名称可能是笔误。

## 规则细节

这条规则不允许在函数声明或表达式中出现重复的参数名。它不适用于箭头函数或类方法，因为解析器会报告这个错误。

如果 ESLint 以严格模式解析代码，解析器（而不是本规则）会报告错误。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-dupe-args: "error"*/

function foo(a, b, a) {
    console.log("value of the second a:", a);
}

var bar = function (a, b, a) {
    console.log("value of the second a:", a);
};
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-dupe-args: "error"*/

function foo(a, b, c) {
    console.log(a, b, c);
}

var bar = function (a, b, c) {
    console.log(a, b, c);
};
```

:::
