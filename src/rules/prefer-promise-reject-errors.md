---
title: prefer-promise-reject-errors
rule_type: suggestion
related_rules:
- no-throw-literal
further_reading:
- http://bluebirdjs.com/docs/warning-explanations.html#warning-a-promise-was-rejected-with-a-non-error
---

对于 Promises 中的用户定义的错误，只将内置的 `Error` 对象实例传递给 `reject()` 函数，这被认为是一个好的做法。`Error` 对象会自动存储一个堆栈跟踪，这可以通过确定错误的来源来调试错误。如果一个 Promise 被拒绝了，而且是一个非 `Error` 值，那么就很难确定拒绝是在哪里发生的。

## 规则细节

这条规则的目的是确保只拒绝带有 `Error` 对象的 Promise。

## 选项

这个规则需要一个可选的对象参数。

* `allowEmptyReject: true`（默认为 `false`) 允许调用 `Promise.reject()`，没有参数。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-promise-reject-errors: "error"*/

Promise.reject("something bad happened");

Promise.reject(5);

Promise.reject();

new Promise(function(resolve, reject) {
  reject("something bad happened");
});

new Promise(function(resolve, reject) {
  reject();
});

```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-promise-reject-errors: "error"*/

Promise.reject(new Error("something bad happened"));

Promise.reject(new TypeError("something bad happened"));

new Promise(function(resolve, reject) {
  reject(new Error("something bad happened"));
});

var foo = getUnknownValue();
Promise.reject(foo);
```

:::

使用此规则与 `allowEmptyReject: true` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}]*/

Promise.reject();

new Promise(function(resolve, reject) {
  reject();
});
```

:::

## 已知限制

由于静态分析的局限性，本规则不能保证你只拒绝带有 `Error` 对象的许诺。虽然该规则会报告那些可以保证拒绝原因显然不是 `Error` 的情况，但它不会报告那些不确定给定原因是否是 `Error` 的情况。关于这个注意事项的更多信息，请参见 `no-throw-literal` 规则中的[类似限制](no-throw-literal#known-limitations)。

为了避免规则之间的冲突，本规则不报告异步函数中 `throw` 语句中使用的非错误值，即使这些值会导致 Promise 拒绝。要对这些情况进行提示，请使用[`no-throw-literal`](no-throw-literal)规则。

## 何时不用

如果你使用自定义的非错误值作为诺言拒绝的理由，你可以关闭这个规则。
