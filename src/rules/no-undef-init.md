---
title: no-undef-init
layout: doc
rule_type: suggestion
related_rules:
- no-undefined
- no-void
---

在 JavaScript 中，一个被声明但没有被初始化的变量会自动得到  `undefined` 的值。比如：

```js
var foo;

console.log(foo === undefined);     // true
```

因此，没有必要将一个变量初始化为 `undefined`，例如：

```js
var foo = undefined;
```

一般要避免将变量初始化为 `undefined`。

## 规则细节

该规则旨在消除初始化为 `undefined` 的 `var` 和 `let` 变量声明。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-undef-init: "error"*/

var foo = undefined;
let bar = undefined;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-undef-init: "error"*/

var foo;
let bar;
```

:::

请注意，这条规则不检查 `const` 声明、解构模式、函数参数和类字段。

使用此规则的额外**正确**示例：

::: correct

```js
/*eslint no-undef-init: "error"*/

const foo = undefined;

let { bar = undefined } = baz;

[quux = undefined] = quuux;

(foo = undefined) => {};

class Foo {
    bar = undefined;
}
```

:::

## 何时不用

有一种情况下，初始化为 `undefined` 的行为与省略初始化的行为不同，那就是当 `var` 声明发生在一个循环中。比如：

使用此规则的**错误**示例：

::: incorrect

```js
for (i = 0; i < 10; i++) {
    var x = undefined;
    console.log(x);
    x = i;
}
```

:::

在这种情况下，`var x` 被吊出了循环，有效地创造了：

```js
var x;

for (i = 0; i < 10; i++) {
    x = undefined;
    console.log(x);
    x = i;
}
```

如果你要删除初始化，那么循环的行为就会改变：

```js
for (i = 0; i < 10; i++) {
    var x;
    console.log(x);
    x = i;
}
```

这个代码相当于：

```js
var x;

for (i = 0; i < 10; i++) {
    console.log(x);
    x = i;
}
```

这与在循环中定义 `var x = undefined` 产生不同的结果，因为 `x` 不再在每次循环中被重置为 `undefined`。

如果你在循环中使用这样的初始化，那么你应该禁用这个规则。

使用此规则的**正确**示例，因为它在特定的行上被禁用。

::: correct

```js
/*eslint no-undef-init: "error"*/

for (i = 0; i < 10; i++) {
    var x = undefined; // eslint-disable-line no-undef-init
    console.log(x);
    x = i;
}
```

:::
