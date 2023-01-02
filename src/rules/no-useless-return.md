---
title: no-useless-return
rule_type: suggestion
---

一个后面没有任何内容的 `return;` 语句是多余的，对函数的运行行为没有任何影响。这可能会引起混淆，所以最好是不允许这些多余的语句。

## 规则细节

这条规则的目的是报告多余的 `return` 语句。

使用此规则的**错误**示例：

::: incorrect

```js
/* eslint no-useless-return: "error" */

function foo() { return; }

function foo() {
  doSomething();
  return;
}

function foo() {
  if (condition) {
    bar();
    return;
  } else {
    baz();
  }
}

function foo() {
  switch (bar) {
    case 1:
      doSomething();
    default:
      doSomethingElse();
      return;
  }
}

```

:::

使用此规则的**正确**示例：

::: correct

```js
/* eslint no-useless-return: "error" */

function foo() { return 5; }

function foo() {
  return doSomething();
}

function foo() {
  if (condition) {
    bar();
    return;
  } else {
    baz();
  }
  qux();
}

function foo() {
  switch (bar) {
    case 1:
      doSomething();
      return;
    default:
      doSomethingElse();
  }
}

function foo() {
  for (const foo of bar) {
    return;
  }
}

```

:::

## 何时不用

如果你不关心不允许多余的返回语句，你可以关闭这个规则。
