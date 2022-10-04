---
title: func-style
layout: doc
rule_type: suggestion
further_reading:
- https://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
---

在 JavaScript 中，有两种定义函数的方法。`function` 声明和 `function` 表达式。声明中首先包含 `function` 关键字，然后是名称，接着是其参数和函数体，例如：

```js
function doSomething() {
    // ...
}
```

相等的函数表达式以 `var` 关键字开始，后面是名称，然后是函数本身，如：

```js
var doSomething = function() {
    // ...
};
```

`function` 声明和 `function expressions` 之间的主要区别是，声明被*&提升**到定义它们的作用域的顶部，这允许你在声明之前编写使用该函数的代码。比如说：

```js
doSomething();

function doSomething() {
    // ...
}
```

虽然这段代码看起来像个错误，但实际上它工作得很好，因为 JavaScript 引擎将 `function` 声明提升到了作用域的顶端。这意味着这段代码被当作是在调用之前的声明。

对于 `function` 表达式，你必须在使用前定义函数，否则会导致错误。比如：

```js
doSomething();  // error!

var doSomething = function() {
    // ...
};
```

在这种情况下，`doSomething()` 在调用时是未定义的，所以会引起运行时错误。

由于这些不同的行为，通常会有指导原则，说明应该使用哪种风格的函数。这里真的没有正确或不正确的选择，这只是一种偏好。

## 规则细节

这个规则在整个 JavaScript 文件中强制执行一种特定类型的 `function` 风格，要么是声明，要么是表达式。你可以在配置中指定你喜欢哪一种。

## 选项

此规则选项为字符串：

* `"表达式"`（默认值）要求使用函数表达式而不是函数声明。
* `"声明"`要求使用函数声明而不是函数表达式。

此规则有用于例外情况的对象选项：

* `"allowArrowFunctions"`：`true`（默认为 `false`）允许使用箭头函数。这个选项只适用于字符串选项被设置为 `"declaration"` 时（当字符串选项被设置为 `"expression"` 时，总是允许箭头函数，与这个选项无关）。

### expression

使用此规则与默认的 `"expression"` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-style: ["error", "expression"]*/

function foo() {
    // ...
}
```

:::

使用此规则与默认的 `"expression"` 选项的**正确**示例：

::: correct

```js
/*eslint func-style: ["error", "expression"]*/

var foo = function() {
    // ...
};

var foo = () => {};

// allowed as allowArrowFunctions : false is applied only for declaration
```

:::

### declaration

使用此规则与 `"declaration"` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-style: ["error", "declaration"]*/

var foo = function() {
    // ...
};

var foo = () => {};
```

:::

使用此规则与 `"declaration"` 选项的**正确**示例：

::: correct

```js
/*eslint func-style: ["error", "declaration"]*/

function foo() {
    // ...
}

// Methods (functions assigned to objects) are not checked by this rule
SomeObject.foo = function() {
    // ...
};
```

:::

### allowArrowFunctions

使用此规则与额外的 ` "declaration", { "allowArrowFunctions": true }` 选项的**正确**示例:

::: correct

```js
/*eslint func-style: ["error", "declaration", { "allowArrowFunctions": true }]*/

var foo = () => {};
```

:::

## 何时不用

如果你想让开发人员各自决定自己如何编写函数，那么你可以禁用这一规则。
