---
title: no-param-reassign
layout: doc
rule_type: suggestion
further_reading:
- https://spin.atomicobject.com/2011/04/10/javascript-don-t-reassign-your-function-arguments/
---

对作为函数参数声明的变量进行赋值可能会产生误导并导致混乱的行为，因为修改函数参数也会改变 `arguments` 对象。通常情况下，对函数参数的赋值是无意的，表明了一个错误或程序员的错误。

这条规则也可以被配置为在修改函数参数时失败。参数的副作用会导致反直觉的执行流程，使错误难以追踪。

## 规则细节

这条规则的目的是防止因修改或重新分配函数参数而引起的非预期行为。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-param-reassign: "error"*/

function foo(bar) {
    bar = 13;
}

function foo(bar) {
    bar++;
}

function foo(bar) {
    for (bar in baz) {}
}

function foo(bar) {
    for (bar of baz) {}
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-param-reassign: "error"*/

function foo(bar) {
    var baz = bar;
}
```

:::

## 选项

这个规则有一个选项，是一个对象，有一个布尔属性 `"props"` 和数组 `"ignorePropertyModificationsFor"` 和 `"ignorePropertyModificationsForRegex"`。`"props"` 默认为 `false`。如果 `"props"` 设置为 `true`，本规则警告不要修改参数属性，除非它们被包含在 `"ignorePropertyModificationsFor"` 或 `"ignorePropertyModificationsForRegex"` 中，默认为空数组。

### props

使用默认的 `{ "props": false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-param-reassign: ["error", { "props": false }]*/

function foo(bar) {
    bar.prop = "value";
}

function foo(bar) {
    delete bar.aaa;
}

function foo(bar) {
    bar.aaa++;
}

function foo(bar) {
    for (bar.aaa in baz) {}
}

function foo(bar) {
    for (bar.aaa of baz) {}
}
```

:::

使用 `{ "props": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-param-reassign: ["error", { "props": true }]*/

function foo(bar) {
    bar.prop = "value";
}

function foo(bar) {
    delete bar.aaa;
}

function foo(bar) {
    bar.aaa++;
}

function foo(bar) {
    for (bar.aaa in baz) {}
}

function foo(bar) {
    for (bar.aaa of baz) {}
}
```

:::

设置了 `"ignorePropertyModificationsFor"` 的 `{ "props": true }` 选项的**正确的代码示例。

::: correct

```js
/*eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["bar"] }]*/

function foo(bar) {
    bar.prop = "value";
}

function foo(bar) {
    delete bar.aaa;
}

function foo(bar) {
    bar.aaa++;
}

function foo(bar) {
    for (bar.aaa in baz) {}
}

function foo(bar) {
    for (bar.aaa of baz) {}
}
```

:::

设置了 `"ignorePropertyModificationsForRegex"`  的 `{ "props": true }` 选项的**正确的代码示例。

::: correct

```js
/*eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsForRegex": ["^bar"] }]*/

function foo(barVar) {
    barVar.prop = "value";
}

function foo(barrito) {
    delete barrito.aaa;
}

function foo(bar_) {
    bar_.aaa++;
}

function foo(barBaz) {
    for (barBaz.aaa in baz) {}
}

function foo(barBaz) {
    for (barBaz.aaa of baz) {}
}
```

:::

## 何时不用

如果你想允许对函数参数进行赋值，你可以安全地禁用此规则。
