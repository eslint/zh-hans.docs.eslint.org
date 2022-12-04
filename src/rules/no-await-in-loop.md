---
title: no-await-in-loop
layout: doc
rule_type: problem
---

对迭代器的每个元素进行操作是一项常见的任务。然而，作为每个操作的一部分执行 `await` 表明程序没有充分利用 `async`/`await` 的并行化优势。

通常情况下，代码应该被重构为一次创建所有的 promise，然后使用 `Promise.all()` 获取结果。否则前一个操作完成前，每一个连续操作将不会开始。

具体来说，应该重构下面这个函数，如图所示：

```js
async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Bad: each loop iteration is delayed until the entire asynchronous operation completes
    results.push(await bar(thing));
  }
  return baz(results);
}
```

```js
async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Good: all asynchronous operations are immediately started.
    results.push(bar(thing));
  }
  // Now that all the asynchronous operations are running, here we wait until they all complete.
  return baz(await Promise.all(results));
}
```

## 规则细节

这条规则不允许在循环体中使用 `await`。

## 示例

使用此规则的**正确**示例：

:::correct

```js
/*eslint no-await-in-loop: "error"*/

async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Good: all asynchronous operations are immediately started.
    results.push(bar(thing));
  }
  // Now that all the asynchronous operations are running, here we wait until they all complete.
  return baz(await Promise.all(results));
}
```

:::

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint no-await-in-loop: "error"*/

async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Bad: each loop iteration is delayed until the entire asynchronous operation completes
    results.push(await bar(thing));
  }
  return baz(results);
}
```

:::

## 何时不用

在许多情况下，一个循环的迭代实际上并非相互独立。例如，迭代的输出可能被用来作为另一个迭代的输入。或者，循环可能被用来重试不成功的异步操作。或者，循环可能被用来防止你的代码发送 过多的并行请求。在这种情况下，在循环中使用 `await` 是有意义的，建议通过标准的 ESLint disable 注释来禁用该规则。
