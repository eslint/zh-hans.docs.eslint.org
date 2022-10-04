---
title: callback-return
layout: doc
rule_type: suggestion
related_rules:
- handle-callback-err
further_reading:
- https://github.com/maxogden/art-of-node#callbacks
- https://web.archive.org/web/20171224042620/https://docs.nodejitsu.com/articles/errors/what-are-the-error-conventions/
---

此规则于 ESLint v7.0.0 中废弃，请使用 [`eslint-plugin-node`](https://github.com/mysticatea/eslint-plugin-node) 中的对应规则代替。

回调模式是 JavaScript 中大多数 I/O 和事件驱动编程的核心。

```js
function doSomething(err, callback) {
    if (err) {
        return callback(err);
    }
    callback();
}
```

为了防止多次调用回调，重要的是在回调被触发时，在主函数体之外 `return`。触发回调的时候，一定要 `return`。忽视这一点往往会导致重复执行。
例如，在 HTTP 请求的情况下，你可能试图多次发送 HTTP 头信息，导致 Node.js 抛出 `Can't render headers after they are sent to the client.` 错误。

## 规则细节

这条规则的目的是确保在主函数块之外使用的回调总是属于或紧邻在 `return` 语句前。该规则根据被调用函数的名称来决定什么是回调。

## 选项

该规则接受一个选项--可能的回调名称的数组——其中可能包括对象方法。默认的回调名称是 `callback`, `cb`, `next`。

### 默认回调名

使用此规则与默认的 `["callback", "cb", "next"]` 选项的**错误**示例：

:::incorrect

```js
/*eslint callback-return: "error"*/

function foo(err, callback) {
    if (err) {
        callback(err);
    }
    callback();
}
```

:::

使用此规则与默认的 `["callback", "cb", "next"]` 选项的**正确**示例：

:::correct

```js
/*eslint callback-return: "error"*/

function foo(err, callback) {
    if (err) {
        return callback(err);
    }
    callback();
}
```

:::

### 所提供的回调名

使用此规则与 `["done", "send.error", "send.success"]` 选项的**错误**示例：

:::incorrect

```js
/*eslint callback-return: ["error", ["done", "send.error", "send.success"]]*/

function foo(err, done) {
    if (err) {
        done(err);
    }
    done();
}

function bar(err, send) {
    if (err) {
        send.error(err);
    }
    send.success();
}
```

:::

使用此规则与 `["done", "send.error", "send.success"]` 选项的**正确**示例：

:::correct

```js
/*eslint callback-return: ["error", ["done", "send.error", "send.success"]]*/

function foo(err, done) {
    if (err) {
        return done(err);
    }
    done();
}

function bar(err, send) {
    if (err) {
        return send.error(err);
    }
    send.success();
}
```

:::

## 已知限制

因为通过静态分析很难理解程序的含义，所以这个规则有局限性。

* 当此规则报告了正确的代码，但程序调用回调不止一次（这是不对的）会出现 *false negatives*。
* 当此规则报告了不正确的代码，但程序只调用了一次回调（正确行为）会出现 *false positives*。

### 通过引用传递回调

如果回调是函数的参数（如 `setTimeout`），本规则的静态分析不会发现程序调用回调。

当此规则报告正确代码时，会出现 *false negative* 的例子：

```js
/*eslint callback-return: "error"*/

function foo(err, callback) {
    if (err) {
        setTimeout(callback, 0); // 这很糟，不过却没有警告
    }
    callback();
}
```

### 在嵌套函数中触发回调

本规则的静态分析没有检测到程序从嵌套函数或立即调用的函数表达式（IIFE）内调用回调。

当此规则报告正确的代码时，会 *false negative* 的例子：

```js
/*eslint callback-return: "error"*/

function foo(err, callback) {
    if (err) {
        process.nextTick(function() {
            return callback(); // 这很糟，不过却没有警告
        });
    }
    callback();
}
```

### If/else 语句

这条规则的静态分析没有发现程序在 `if` 语句的每个分支中只调用一次回调。

当此规则报告不正确的代码时，会 *false positive* 的例子：

```js
/*eslint callback-return: "error"*/

function foo(err, callback) {
    if (err) {
        callback(err); // 这没问题，就是会得到警告
    } else {
        callback();    // 这没问题，就是会得到警告
    }
}
```

## 何时不用

在有些情况下，你可能想多次调用一个回调函数。在这些情况下，这个规则可能会导致不正确的行为。在这些情况下，你可能想为这些回调保留特殊的名字，并且不包括在触发警告的回调列表中。
