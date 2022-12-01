---
title: space-infix-ops
layout: doc
rule_type: layout
---

虽然格式上的偏好是非常个人化的，但一些风格指南要求在运算符周围有空格，例如：

```js
var sum = 1 + 2;
```

这一规则的支持者认为，它使代码更容易阅读，可以更容易地突出潜在的错误，如：

```js
var sum = i+++2;
```

虽然这是有效的 JavaScript 语法，但很难确定作者的意图。

## 规则细节

这条规则的目的是确保在英缀运算符周围有空格。

## 选项

该规则接受一个选项参数，其默认值如下：

```json
"space-infix-ops": ["error", { "int32Hint": false }]
```

### `int32Hint`

设置 `int32Hint` 选项为 `true`（默认为是 `false`），以允许写 `a|0` 时不留空格。

```js
var foo = bar|0; // `foo` is forced to be signed 32 bit integer
```

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint space-infix-ops: "error"*/
/*eslint-env es6*/

a+b

a+ b

a +b

a?b:c

const a={b:1};

var {a=0}=bar;

function foo(a=0) { }
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint space-infix-ops: "error"*/
/*eslint-env es6*/

a + b

a       + b

a ? b : c

const a = {b:1};

var {a = 0} = bar;

function foo(a = 0) { }
```

:::

## 何时不用

如果你不关心英缀运算符周围间距的一致性，你可以关闭这个规则。
