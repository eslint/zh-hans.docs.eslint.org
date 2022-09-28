---
title: handle-callback-err
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/handle-callback-err.md
rule_type: suggestion
further_reading:
- https://github.com/maxogden/art-of-node#callbacks
- https://web.archive.org/web/20171224042620/https://docs.nodejitsu.com/articles/errors/what-are-the-error-conventions/
---

此规则于 ESLint v7.0.0 中废弃，请使用 [`eslint-plugin-node`](https://github.com/mysticatea/eslint-plugin-node) 中的对应规则代替。

在 Node.js 中，处理异步行为的一个常见模式被称为回调模式。
这种模式期望一个 `Error` 对象或 `null` 作为回调的第一个参数。
忘记处理这些错误会导致你的应用程序中出现一些非常奇怪的行为。

```js
function loadData (err, data) {
    doSomething(); // forgot to handle error
}
```

## 规则细节

这条规则期望当你在 Node.js 中使用回调模式时，你会处理这个错误。

## 选项

该规则采用一个字符串选项：错误参数的名称。默认是 `"err"`。

此规则的**错误**代码的例子，默认为 `"err"`参数名。

::: incorrect

```js
/*eslint handle-callback-err: "error"*/

function loadData (err, data) {
    doSomething();
}

```

:::

此规则的**正确**代码的例子，默认的 `"err"` 参数名称。

::: correct

```js
/*eslint handle-callback-err: "error"*/

function loadData (err, data) {
    if (err) {
        console.log(err.stack);
    }
    doSomething();
}

function generateError (err) {
    if (err) {}
}
```

:::

使用此规则与 `"error"` 参数名的**正确**示例：

::: correct

```js
/*eslint handle-callback-err: ["error", "error"]*/

function loadData (error, data) {
    if (error) {
       console.log(error.stack);
    }
    doSomething();
}
```

:::

### regular expression

有时（特别是在大项目中）错误变量的名称在整个项目中不一致。
所以你需要一个更灵活的配置来确保规则报告所有未处理的错误。

如果配置的错误变量名称以 `^` 开头，则被认为是一个 regexp 模式。

* 如果选项是 `"^(err|error|anySpecificError)$"`，规则报告未处理的错误，其中参数名称可以是 `err`、`error` 或 `anySpecificError`。
* 如果选项是`"^.+Error$"`，该规则报告参数名称以`Error`结尾的未处理错误（例如，`connectionError`或`validationError`将匹配）。
* 如果选项是 `"^.*(e|E)rr"`，该规则报告参数名称与任何包含 `err` 或 `Err` 的字符串相匹配的未处理错误（如匹配 `err`、`error`、`anyError`、`some_err`）。

## 何时不用

在有些情况下，对你的应用程序来说，忽略错误是安全的，但是只有在你确信其他形式的监控可以帮助你发现问题的情况下，才能忽略错误。相信其他形式的监控会帮助你发现问题。
