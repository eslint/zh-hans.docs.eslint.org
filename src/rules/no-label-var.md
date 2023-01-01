---
title: no-label-var
rule_type: suggestion
related_rules:
- no-extra-label
- no-labels
- no-unused-labels
---

## 规则细节

这条规则旨在创建更清晰的代码，不允许创建一个与范围内的变量同名的标签的坏做法。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-label-var: "error"*/

var x = foo;
function bar() {
x:
  for (;;) {
    break x;
  }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-label-var: "error"*/

// The variable that has the same name as the label is not in scope.

function foo() {
  var q = t;
}

function bar() {
q:
  for(;;) {
    break q;
  }
}
```

:::

## 何时不用

如果你不希望被通知标签的使用情况，你可以安全地禁用此规则。
