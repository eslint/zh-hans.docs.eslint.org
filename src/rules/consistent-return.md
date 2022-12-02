---
title: consistent-return
layout: doc
rule_type: suggestion
---

与静态类型语言不同的是，静态类型语言强制要求一个函数返回指定类型的值，而 JavaScript 允许一个函数中的不同代码路径返回不同类型的值。

JavaScript 又一个令人困惑的地方，如果以下情况中的任何一项为真，函数就会返回 `undefined`。

* 它在退出前没有执行 `return` 语句
* 它执行的 `return` 没有明确指定一个值
* 它执行了 `return undefined` 语句
* 执行 `return void`，后面有一个表达式（例如，一个函数调用）。
* 执行 `return`，后面跟着任何其他的表达式，这些表达式的值是 `undefined`

如果一个函数中的任何代码路径都明确地返回一个值，但有些代码路径却没有明确地返回一个值，这可能是一个打字错误，特别是在一个大型函数中。在下面的例子中。

* 通过函数的一个代码路径返回一个布尔值 `true`。
* 另一个代码路径没有明确地返回一个值，因此隐含地返回 `undefined`。

```js
function doSomething(condition) {
    if (condition) {
        return true;
    } else {
        return;
    }
}
```

## 规则细节

这条规则要求 `return` 语句总是或从不指定数值。这条规则忽略了名称以大写字母开头的函数定义，因为构造函数（当用 `new` 运算符调用时）如果不明确返回另一个对象，就会隐式返回实例化的对象。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint consistent-return: "error"*/

function doSomething(condition) {
    if (condition) {
        return true;
    } else {
        return;
    }
}

function doSomething(condition) {
    if (condition) {
        return true;
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint consistent-return: "error"*/

function doSomething(condition) {
    if (condition) {
        return true;
    } else {
        return false;
    }
}

function Foo() {
    if (!(this instanceof Foo)) {
        return new Foo();
    }

    this.a = 0;
}
```

:::

## 选项

此规则选项为对象：

* `"treatUndefinedAsUnspecified": false`（默认值）总是要么指定值，要么只隐式返回 `undefined`。
* `"treatUndefinedAsUnspecified": true` 总是要么指定值，要么显式或隐式返回 `undefined`。

### treatUndefinedAsUnspecified

使用此规则与默认的 `{ "treatUndefinedAsUnspecified": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": false }]*/

function foo(callback) {
    if (callback) {
        return void callback();
    }
    // 没有返回语句
}

function bar(condition) {
    if (condition) {
        return undefined;
    }
    // 没有返回语句
}
```

:::

使用此规则与 `{ "treatUndefinedAsUnspecified": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }]*/

function foo(callback) {
    if (callback) {
        return void callback();
    }
    return true;
}

function bar(condition) {
    if (condition) {
        return undefined;
    }
    return true;
}
```

:::

使用此规则与 `{ "treatUndefinedAsUnspecified": true }` 选项的**正确**示例：

::: correct

```js
/*eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }]*/

function foo(callback) {
    if (callback) {
        return void callback();
    }
    // 没有返回语句
}

function bar(condition) {
    if (condition) {
        return undefined;
    }
    // 没有返回语句
}
```

:::

## 何时不用

如果你想允许函数根据代码分支有不同的 `return` 行为，那么禁用此规则是安全的。
