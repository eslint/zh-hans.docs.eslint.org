---
title: require-atomic-updates
rule_type: problem
---

在编写异步代码时，有可能会产生微妙的竞赛条件错误。考虑一下下面的例子：

```js
let totalLength = 0;

async function addLengthOfSinglePage(pageNum) {
  totalLength += await getPageLength(pageNum);
}

Promise.all([addLengthOfSinglePage(1), addLengthOfSinglePage(2)]).then(() => {
  console.log('The combined length of both pages is', totalLength);
});
```

这段代码看起来会将调用 `getPageLength(1)` 和 `getPageLength(2)` 的结果相加，但实际上 `totalLength` 的最终值只能是两个页面中的一个长度。问题出在语句 `totalLength += await getPageLength(pageNum);`。该语句首先读取 `totalLength` 的初始值，然后调用 `getPageLength(pageNum)` 并等待该 Promise 实现。最后，它将 `totalLength` 的值设置为 `await getPageLength(pageNum)` 和 `totalLength` 的**初始值**之和。如果 `totalLength` 变量在 `getPageLength(pageNum)` 承诺待定期间被单独的函数调用更新，该更新将被丢失，因为新值被覆盖而没有被读取。

解决这个问题的一个方法是确保 `totalLength` 在更新的同时被读取，像这样。

```js
async function addLengthOfSinglePage(pageNum) {
  const lengthOfThisPage = await getPageLength(pageNum);

  totalLength += lengthOfThisPage;
}
```

另一个解决方案是完全避免使用易变的变量引用：

```js
Promise.all([getPageLength(1), getPageLength(2)]).then(pageLengths => {
  const totalLength = pageLengths.reduce((accumulator, length) => accumulator + length, 0);

  console.log('The combined length of both pages is', totalLength);
});
```

## 规则细节

这条规则旨在报告对变量或属性的赋值，在这种情况下，赋值可能是基于过时的值。

### Variables

本规则在检测到生成器或异步函数中的以下执行流程时，报告对变量的赋值。

1. 该变量被读取。
2. 一个 `yield` 或 `await` 暂停了函数。
3. 在函数恢复后，一个值被分配给步骤 1 中的变量。

第 3 步的赋值被报告，因为它可能被错误地解决，因为第 1 步的变量的值可能在第 2 和第 3 步之间发生了变化。特别是，如果该变量可以从其他执行环境中访问（比如它如果不是局部变量，那么其他函数就可以改变它），当函数在第 2 步暂停时，该变量的值可能已经在其他地方改变了。

请注意，在以下任何一种情况下，该规则不报告步骤 3 中的赋值。

* 如果变量在第 2 步和第 3 步之间被再次读取。
* 如果在函数暂停时不能访问该变量（例如，如果它是一个局部变量）。

使用此规则的**错误**示例：

::: incorrect

```js
/* eslint require-atomic-updates: error */

let result;

async function foo() {
    result += await something;
}

async function bar() {
    result = result + await something;
}

async function baz() {
    result = result + doSomething(await somethingElse);
}

async function qux() {
    if (!result) {
        result = await initialize();
    }
}

function* generator() {
    result += yield;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/* eslint require-atomic-updates: error */

let result;

async function foobar() {
    result = await something + result;
}

async function baz() {
    const tmp = doSomething(await somethingElse);
    result += tmp;
}

async function qux() {
    if (!result) {
        const tmp = await initialize();
        if (!result) {
            result = tmp;
        }
    }
}

async function quux() {
    let localVariable = 0;
    localVariable += await something;
}

function* generator() {
    result = (yield) + result;
}
```

:::

### Properties

本规则在检测到生成器或异步函数中的以下执行流程时，报告通过变量对属性的赋值。

1. 变量或对象属性被读取。
2. yield` 或 `await`暂停了该函数。
3. 在函数恢复后，一个值被分配给一个属性。

这个逻辑类似于变量的逻辑，但更严格，因为第 3 步的属性不一定要和第 1 步的属性相同。假设流程取决于整个对象的状态。

使用此规则的**错误**示例：

::: incorrect

```js
/* eslint require-atomic-updates: error */

async function foo(obj) {
    if (!obj.done) {
        obj.something = await getSomething();
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/* eslint require-atomic-updates: error */

async function foo(obj) {
    if (!obj.done) {
        const tmp = await getSomething();
        if (!obj.done) {
            obj.something = tmp;
        }
    }
}
```

:::

## 选项

此规则选项为对象：

* `"allowProperties"`：当设置为 `true` 时，该规则不报告对属性的分配。默认是 `false`。

### allowProperties

使用此规则与 `{ "allowProperties": true }` 选项的**正确**示例：

::: correct

```js
/* eslint require-atomic-updates: ["error", { "allowProperties": true }] */

async function foo(obj) {
    if (!obj.done) {
        obj.something = await getSomething();
    }
}
```

:::

## 何时不用

如果你不使用异步或生成器函数，你不需要启用这个规则。
