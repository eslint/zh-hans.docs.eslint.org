---
title: no-ternary
layout: doc
rule_type: suggestion
related_rules:
- no-nested-ternary
- no-unneeded-ternary
---

三元运算符用于有条件地给一个变量赋值。有些人认为，使用三元运算符会导致代码不清晰。

```js
var foo = isBar ? baz : qux;
```

## 规则细节

这条规则不允许三元运算符。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-ternary: "error"*/

var foo = isBar ? baz : qux;

function quux() {
  return foo ? bar() : baz();
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-ternary: "error"*/

var foo;

if (isBar) {
    foo = baz;
} else {
    foo = qux;
}

function quux() {
    if (foo) {
        return bar();
    } else {
        return baz();
    }
}
```

:::
