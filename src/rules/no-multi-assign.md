---
title: no-multi-assign
layout: doc
rule_type: suggestion
related_rules:
- max-statements-per-line
---

对变量进行链式赋值会导致意想不到的结果，而且难以阅读。

```js
(function() {
    const foo = bar = 0; // Did you mean `foo = bar == 0`?
    bar = 1;             // This will not fail since `bar` is not constant.
})();
console.log(bar);        // This will output 1 since `bar` is not scoped.
```

## 规则细节

这条规则不允许在一条语句中使用多个赋值。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-multi-assign: "error"*/

var a = b = c = 5;

const foo = bar = "baz";

let a =
    b =
    c;

class Foo {
    a = b = 10;
}

a = b = "quux";
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-multi-assign: "error"*/

var a = 5;
var b = 5;
var c = 5;

const foo = "baz";
const bar = "baz";

let a = c;
let b = c;

class Foo {
    a = 10;
    b = 10;
}

a = "quux";
b = "quux";
```

:::

## 选项

此规则选项为对象：

* `"ignoreNonDeclaration"`。当设置为 `true` 时，该规则允许不包括在声明中初始化变量或初始化类字段的链。默认是 `false`。

### ignoreNonDeclaration

使用 `{ "ignoreNonDeclaration": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-multi-assign: ["error", { "ignoreNonDeclaration": true }]*/

let a;
let b;
a = b = "baz";

const x = {};
const y = {};
x.one = y.one = 1;
```

:::

使用 `{ "ignoreNonDeclaration": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-multi-assign: ["error", { "ignoreNonDeclaration": true }]*/

let a = b = "baz";

const foo = bar = 1;

class Foo {
    a = b = 10;
}
```

:::
