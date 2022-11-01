---
title: no-return-await
layout: doc
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
- https://jakearchibald.com/2017/await-vs-return-vs-return-await/
---

在 `async function` 中使用 `return await` 可以使当前函数保持在调用堆栈中，直到被等待的 Promise 被解决，代价是在解决外部 Promise 之前有一个额外的微任务。`return await` 也可以在 try/catch 语句中使用，以捕捉来自另一个返回 Promise 的函数的错误。

你可以通过不等待返回值来避免额外的微任务，但代价是如果错误从返回的 Promise 异步抛出，该函数将不再是堆栈跟踪的一部分。这可能会使调试更加困难。

## 规则细节

这条规则旨在防止由于缺乏对 `async function` 语义的理解而可能产生的常见性能危险。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-return-await: "error"*/

async function foo() {
    return await bar();
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-return-await: "error"*/

async function foo() {
    return bar();
}

async function foo() {
    await bar();
    return;
}

// This is essentially the same as `return await bar();`, but the rule checks only `await` in `return` statements
async function foo() {
    const x = await bar();
    return x;
}

// In this example the `await` is necessary to be able to catch errors thrown from `bar()`
async function foo() {
    try {
        return await bar();
    } catch (error) {}
}
```

:::

## 何时不用

有几个原因你可能想关闭这个规则：

* 如果你想用 `await` 来表示一个值，而这个值是一个可执行的值
* 如果你不想要避免 `return await`带 来的性能优势
* 如果你想让函数显示在堆栈跟踪中（对调试有用）
