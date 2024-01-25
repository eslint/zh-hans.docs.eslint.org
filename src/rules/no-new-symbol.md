---
title: no-new-symbol
rule_type: problem
handled_by_typescript: true
further_reading:
- https://www.ecma-international.org/ecma-262/6.0/#sec-symbol-objects
---

`Symbol` 不打算与 `new` 运算符一起使用，而是作为一个函数来调用。

```js
var foo = new Symbol("foo");
```

这将抛出一个 `TypeError` 异常。

## 规则细节

这条规则的目的是防止用 `new` 运算符意外地调用 `Symbol`。

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-new-symbol: "error"*/
/*eslint-env es6*/

var foo = new Symbol('foo');
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-new-symbol: "error"*/
/*eslint-env es6*/

var foo = Symbol('foo');

// Ignores shadowed Symbol.
function bar(Symbol) {
    const baz = new Symbol("baz");
}

```

:::

## 何时不用

不应该在 ES3/5 环境中使用此规则。
