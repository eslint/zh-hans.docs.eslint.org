---
title: no-process-exit
rule_type: suggestion
---

此规则于 ESLint v7.0.0 中废弃，请使用 [`eslint-plugin-node`](https://github.com/mysticatea/eslint-plugin-node) 中的对应规则代替。

Node.js 中的 `process.exit()` 方法被用来立即停止 Node.js 进程并退出。这是一个危险的操作，因为它可以在任何时间点的任何方法中发生，当错误发生时，有可能完全停止 Node.js 应用程序。比如：

```js
if (somethingBadHappened) {
    console.error("Something bad happened!");
    process.exit(1);
}
```

这段代码可以出现在任何模块中，当 `somethingBadHappened` 为真时，将停止整个应用程序。这没有给应用程序任何机会来回应错误。通常更好的做法是抛出一个错误，让应用程序适当地处理它。

```js
if (somethingBadHappened) {
    throw new Error("Something bad happened!");
}
```

通过这种方式抛出一个错误，应用程序的其他部分有机会处理这个错误，而不是完全停止应用程序。如果错误一路冒泡，没有得到处理，那么该进程将退出，并返回一个非零的退出代码，所以最终的结果是一样的。

如果你只使用 `process.exit()` 来指定退出代码，你可以设置 [`process.exitCode`](https://nodejs.org/api/process.html#process_process_exitcode)（在 Node.js 0.11.8 引入）来代替。

## 规则细节

本规则旨在防止在 Node.js JavaScript 中使用 `process.exit()`。因此，只要在代码中发现 `process.exit()`，它就会发出警告

.

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-process-exit: "error"*/

process.exit(1);
process.exit(0);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-process-exit: "error"*/

Process.exit();
var exit = process.exit;
```

:::

## 何时不用

在 Node.js 应用程序中，可能有一部分负责确定退出时要返回的正确退出代码。在这种情况下，你应该关闭这个规则，以允许正确处理退出代码。
