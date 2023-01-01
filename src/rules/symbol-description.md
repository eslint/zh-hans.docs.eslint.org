---
title: symbol-description
rule_type: suggestion
further_reading:
- https://www.ecma-international.org/ecma-262/6.0/#sec-symbol-description
---

`Symbol` 函数可以有一个选项描述。

```js
var foo = Symbol("some description");

var someString = "some description";
var bar = Symbol(someString);
```

使用 `description` 可以促进调试工作的进行：当一个符号被记录时，会使用描述。

```js
var foo = Symbol("some description");

> console.log(foo);
// Symbol(some description)
```

当在调试过程中观察到一个符号时，它可能有助于识别该符号。

## 规则细节

本规则要求在创建符号时要有描述。

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint symbol-description: "error"*/
/*eslint-env es6*/

var foo = Symbol();
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint symbol-description: "error"*/
/*eslint-env es6*/

var foo = Symbol("some description");

var someString = "some description";
var bar = Symbol(someString);
```

:::

## 何时不用

不应该在 ES3/5 环境中使用此规则。
此外，如果你不想在创建符号时强制执行 `description` 的存在，可以安全地关闭这一规则。
