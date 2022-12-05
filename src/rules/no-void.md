---
title: no-void
layout: doc
rule_type: suggestion
related_rules:
- no-undef-init
- no-undefined
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
- https://oreilly.com/javascript/excerpts/javascript-good-parts/bad-parts.html
---

`void` 运算符接收一个操作数并返回 `undefined`：`void expression` 将评估 `expression` 并返回 `undefined`。它可以被用来忽略 `expression` 可能产生的任何副作用。

使用 `void` 运算符的常见情况是获得一个“纯粹的” `undefined` 值，因为在 ES5 之前，`undefined` 变量是可变的。

```js
// will always return undefined
(function(){
    return void 0;
})();

// will return 1 in ES3 and undefined in ES5+
(function(){
    undefined = 1;
    return undefined;
})();

// will throw TypeError in ES5+
(function(){
    'use strict';
    undefined = 1;
})();
```

另一个常见的情况是减少代码，因为 `void 0` 比 `undefined` 短。

```js
foo = void 0;
foo = undefined;
```

当与 IIFE（立即调用的函数表达式）一起使用时，可以使用 `void` 来强制将函数关键字作为表达式而不是声明来处理。

```js
var foo = 1;
void function(){ foo = 1; }() // will assign foo a value of 1
+function(){ foo = 1; }() // same as above
```

```js
function(){ foo = 1; }() // will throw SyntaxError
```

一些代码风格禁止 `void` 运算符，将其标记为不明显且难以阅读。

## 规则细节

这条规则的目的是消除无效运算符的使用。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-void: "error"*/

void foo
void someFunction();

var foo = void bar();
function baz() {
    return void 0;
}
```

:::

## 选项

此规则选项为对象：

* `allowAsStatement` 设置为 `true` 允许 void 运算符被用作语句（默认 `false`）。

### allowAsStatement

当 `allowAsStatement` 被设置为 `true` 时，该规则不会在 void 运算符被用作语句的情况下出错，也就是说，当它没有被用在表达式的位置时，比如在变量赋值或函数返回中。

使用 `{ "allowAsStatement": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-void: ["error", { "allowAsStatement": true }]*/

var foo = void bar();
function baz() {
    return void 0;
}
```

:::

使用 `{ "allowAsStatement": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-void: ["error", { "allowAsStatement": true }]*/

void foo;
void someFunction();
```

:::

## 何时不用

如果你故意使用 `void` 运算符，那么你可以禁用这个规则。
