---
title: no-debugger
layout: doc
rule_type: problem
related_rules:
- no-alert
- no-console
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger
---

`debugger` 语句用于告诉执行的 JavaScript 环境停止执行，并在代码的当前点启动调试器。随着现代调试和开发工具的出现，这已经不再是一个好的做法了。生产代码绝对不能包含 `debugger`，因为它将导致浏览器停止执行代码并打开一个适当的调试器。

## 规则细节

使用此规则禁用 `debugger` 语句。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-debugger: "error"*/

function isTruthy(x) {
    debugger;
    return Boolean(x);
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-debugger: "error"*/

function isTruthy(x) {
    return Boolean(x); // set a breakpoint at this line
}
```

:::

## 何时不用

如果你的代码还在开发中，不想担心要剥离 `debugger` 语句，那么就关闭这个规则。一般来说，在部署前进行测试代码时，你应该要把它重新打开。
