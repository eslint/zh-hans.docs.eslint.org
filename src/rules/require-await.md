---
title: require-await
layout: doc
rule_type: suggestion
related_rules:
- require-yield
---

JavaScript 中的异步函数在两个重要方面与其他函数的行为不同。

1. 返回值总是一个 `Promise`。
2. 你可以在其中使用 `await` 运算符。

使用异步函数的主要原因通常是为了使用 `await` 运算符，比如：

```js
async function fetchData(processDataItem) {
    const response = await fetch(DATA_URL);
    const data = await response.json();

    return data.map(processDataItem);
}
```

不使用 `await` 的异步函数可能不需要成为异步函数，可能是重构的无意结果。

注意：这条规则忽略了异步生成器函数。这是因为生成器产生而不是返回一个值，异步生成器可能会产生另一个异步生成器的所有值，而实际上不需要使用 await。

## 规则细节

这条规则警告那些没有 `await` 表达式的异步函数。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint require-await: "error"*/

async function foo() {
    doSomething();
}

bar(async () => {
    doSomething();
});
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint require-await: "error"*/

async function foo() {
    await doSomething();
}

bar(async () => {
    await doSomething();
});

function foo() {
    doSomething();
}

bar(() => {
    doSomething();
});

// Allow empty functions.
async function noop() {}
```

:::

## 何时不用

异步函数被设计成与承诺一起工作，这样，抛出一个错误将导致一个承诺的拒绝处理程序（比如`catch()`）被调用。比如：

```js
async function fail() {
    throw new Error("Failure!");
}

fail().catch(error => {
    console.log(error.message);
});
```

在这种情况下，`fail()` 函数抛出一个错误，打算由后面分配的 `catch()` 处理程序捕获。将 `fail()` 函数转换为同步函数需要重构对 `fail()` 的调用，使用 `try-catch` 语句而不是承诺。

如果你是为了这个目的在异步函数内部抛出错误，那么你可能想禁用这个规则。
