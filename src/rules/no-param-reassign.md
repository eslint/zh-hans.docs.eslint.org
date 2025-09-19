---
title: no-param-reassign
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

var foo = function(bar) {
    bar = 13;
}

var foo = function(bar) {
    bar++;
}

var foo = function(bar) {
    for (bar in baz) {}
}

var foo = function(bar) {
    for (bar of baz) {}
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-param-reassign: "error"*/

var foo = function(bar) {
    var baz = bar;
}
```

:::

## 选项

此规则有一个选项，是对象，其中包括有一个布尔属性 `"props"` 和数组属性 `"ignorePropertyModificationsFor"` 和 `"ignorePropertyModificationsForRegex"`。`"props"` 默认为 `false`。如果 `"props"` 设置为 `true`，本规则警告不要修改参数属性，除非它们被包含在 `"ignorePropertyModificationsFor"` 或 `"ignorePropertyModificationsForRegex"` 中，默认为空数组。

### props

使用默认的 `{ "props": false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-param-reassign: ["error", { "props": false }]*/

var foo = function(bar) {
    bar.prop = "value";
}

var foo = function(bar) {
    delete bar.aaa;
}

var foo = function(bar) {
    bar.aaa++;
}

var foo = function(bar) {
    for (bar.aaa in baz) {}
}

var foo = function(bar) {
    for (bar.aaa of baz) {}
}
```

:::

使用 `{ "props": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-param-reassign: ["error", { "props": true }]*/

var foo = function(bar) {
    bar.prop = "value";
}

var foo = function(bar) {
    delete bar.aaa;
}

var foo = function(bar) {
    bar.aaa++;
}

var foo = function(bar) {
    for (bar.aaa in baz) {}
}

var foo = function(bar) {
    for (bar.aaa of baz) {}
}
```

:::

使用此规则与带有 `"ignorePropertyModificationsFor"` 集合的 `{ "props": true }` 选项的**正确的**示例：

::: correct

```js
/*eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["bar"] }]*/

var foo = function(bar) {
    bar.prop = "value";
}

var foo = function(bar) {
    delete bar.aaa;
}

var foo = function(bar) {
    bar.aaa++;
}

var foo = function(bar) {
    for (bar.aaa in baz) {}
}

var foo = function(bar) {
    for (bar.aaa of baz) {}
}
```

:::

使用此规则与带有 `"ignorePropertyModificationsForRegex"` 集合的 `{ "props": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsForRegex": ["^bar"] }]*/

var foo = function(barVar) {
    barVar.prop = "value";
}

var foo = function(barrito) {
    delete barrito.aaa;
}

var foo = function(bar_) {
    bar_.aaa++;
}

var foo = function(barBaz) {
    for (barBaz.aaa in baz) {}
}

var foo = function(barBaz) {
    for (barBaz.aaa of baz) {}
}
```

:::

## 何时不用

如果你想允许对函数参数进行赋值，你可以安全地禁用此规则。
