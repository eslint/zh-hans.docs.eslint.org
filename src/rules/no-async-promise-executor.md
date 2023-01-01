---
title: no-async-promise-executor
rule_type: problem
---

`new Promise` 构造器接接收**执行器**函数参数，它有 `resolve` 和 `reject` 参数，可以用来控制创建的 Promise 的状态。比如：

```js
const result = new Promise(function executor(resolve, reject) {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});
```

执行函数也可以是一个 `async function`。然而，这通常是一个错误，有几个原因：

* 若异步执行函数抛出错误，这个错误会丢失，不会导致拒绝新构建的 `Promise`。这可能会使调试和处理一些错误变得困难。
* 若 Promise 执行函数使用了 `await`，这通常表明实际上没有必要使用 `new Promise` 构造函数，或者 `new Promise` 构造函数的范围可以缩小。

## 规则细节

这条规则的目的是禁止异步 Promise 执行器函数。

使用此规则的**错误**示例：

::: incorrect

```js
const foo = new Promise(async (resolve, reject) => {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = new Promise(async (resolve, reject) => {
  resolve(await foo);
});
```

:::

使用此规则的**正确**示例：

::: correct

```js
const foo = new Promise((resolve, reject) => {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = Promise.resolve(foo);
```

:::

## 何时不用

如果你的代码库不支持异步函数语法，就没有必要启用这个规则。
