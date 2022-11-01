---
title: no-negated-condition
layout: doc
rule_type: suggestion
---

否定条件更难理解。可以通过倒置条件来使代码更易读。

## 规则细节

这条规则不允许以下任何一种情况下的否定条件：

* `if` 语句有一个 `else` 分支
* 三元表达式

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-negated-condition: "error"*/

if (!a) {
    doSomething();
} else {
    doSomethingElse();
}

if (a != b) {
    doSomething();
} else {
    doSomethingElse();
}

if (a !== b) {
    doSomething();
} else {
    doSomethingElse();
}

!a ? c : b
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-negated-condition: "error"*/

if (!a) {
    doSomething();
}

if (!a) {
    doSomething();
} else if (b) {
    doSomething();
}

if (a != b) {
    doSomething();
}

a ? b : c
```

:::
