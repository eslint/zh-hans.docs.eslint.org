---
title: no-throw-literal
layout: doc
rule_type: suggestion
---

我们认为良好的做法是只抛出 `Error` 对象本身或使用 `Error` 对象作为用户定义的异常的基础对象。
`Error` 对象的基本好处是，它们会自动跟踪它们的建立和来源地。

这个规则限制了什么可以作为异常被抛出。当它第一次被创建时，它只防止字面量被抛出（因此而得名），但现在它已被扩展到只允许有可能成为 `Error` 对象的表达式。

## 规则细节

这条规则的目的是在抛出异常时保持一致性，不允许抛出不可能是 `Error` 对象的字面和其他表达式。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-throw-literal: "error"*/
/*eslint-env es6*/

throw "error";

throw 0;

throw undefined;

throw null;

var err = new Error();
throw "an " + err;
// err is recast to a string literal

var err = new Error();
throw `${err}`

```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-throw-literal: "error"*/

throw new Error();

throw new Error("error");

var e = new Error("error");
throw e;

try {
    throw new Error("error");
} catch (e) {
    throw e;
}
```

:::

## 已知限制

由于静态分析的局限性，本规则不能保证你只抛出 `Error` 对象。

使用此规则但没有抛出 `Error` 对象的**正确**示例：

::: correct

```js
/*eslint no-throw-literal: "error"*/

var err = "error";
throw err;

function foo(bar) {
    console.log(bar);
}
throw foo("error");

throw new String("error");

var foo = {
    bar: "error"
};
throw foo.bar;
```

:::
