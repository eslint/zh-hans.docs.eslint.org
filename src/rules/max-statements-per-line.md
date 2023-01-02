---
title: max-statements-per-line
rule_type: layout
related_rules:
- max-depth
- max-len
- max-lines
- max-lines-per-function
- max-nested-callbacks
- max-params
- max-statements
---

一行代码包含太多语句可能会难以阅读。代码通常是自上而下阅读的，特别是在扫描时，所以限制单行允许的语句数量对可读性和可维护性非常有用。

```js
function foo () { var bar; if (condition) { bar = 1; } else { bar = 2; } return true; } // 太多语句了
```

## 规则细节

这条规则执行了每行允许的最大语句数。

## 选项

### max

`"max"` 对象属性是可选的（默认为 1）。

使用此规则与默认的 `{ "max": 1 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-statements-per-line: ["error", { "max": 1 }]*/

var bar; var baz;
if (condition) { bar = 1; }
for (var i = 0; i < length; ++i) { bar = 1; }
switch (discriminant) { default: break; }
function foo() { bar = 1; }
var foo = function foo() { bar = 1; };
(function foo() { bar = 1; })();
```

:::

使用此规则与默认的 `{ "max": 1 }` 选项的**正确**示例：

::: correct

```js
/*eslint max-statements-per-line: ["error", { "max": 1 }]*/

var bar, baz;
if (condition) bar = 1;
for (var i = 0; i < length; ++i);
switch (discriminant) { default: }
function foo() { }
var foo = function foo() { };
(function foo() { })();
```

:::

使用此规则与 `{ "max": 2 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-statements-per-line: ["error", { "max": 2 }]*/

var bar; var baz; var qux;
if (condition) { bar = 1; } else { baz = 2; }
for (var i = 0; i < length; ++i) { bar = 1; baz = 2; }
switch (discriminant) { case 'test': break; default: break; }
function foo() { bar = 1; baz = 2; }
var foo = function foo() { bar = 1; };
(function foo() { bar = 1; baz = 2; })();
```

:::

使用此规则与 `{ "max": 2 }` 选项的**正确**示例：

::: correct

```js
/*eslint max-statements-per-line: ["error", { "max": 2 }]*/

var bar; var baz;
if (condition) bar = 1; if (condition) baz = 2;
for (var i = 0; i < length; ++i) { bar = 1; }
switch (discriminant) { default: break; }
function foo() { bar = 1; }
var foo = function foo() { bar = 1; };
(function foo() { var bar = 1; })();
```

:::

## 何时不用

如果你不关心每行的语句数，你可以关闭这个规则。
