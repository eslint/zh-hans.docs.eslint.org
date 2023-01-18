---
title: no-underscore-dangle
rule_type: suggestion
---

就标识符的命名规则而言，悬空的下划线可能是 JavaScript 中最有争议的。悬空的下划线是指在标识符的开头或结尾处的下划线，例如：

```js
var _foo;
```

实际上，在 JavaScript 中使用悬空的下划线来表示对象的“私有”成员已经有很长的历史了（尽管 JavaScript 没有真正的私有成员，但这种惯例起到了警示作用）。这始于 SpiderMonkey 添加的非标准方法，如 `__defineGetter__()`。使用下划线的目的是为了让人知道这个方法在某些方面是特殊的。从那时起，使用单一的下划线前缀作为表示对象的“私有”成员的方式变得流行起来。

你是否选择在标识符中允许悬空的下划线纯粹是一种惯例，对性能、可读性或复杂性没有影响。这纯粹是一种偏好。

## 规则细节

这条规则不允许在标识符中使用悬空的下划线。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-underscore-dangle: "error"*/

var foo_;
var __proto__ = {};
foo._bar();
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-underscore-dangle: "error"*/

var _ = require('underscore');
var obj = _.contains(items, item);
obj.__proto__ = {};
var file = __filename;
function foo(_bar) {};
const foo = { onClick(_bar) {} };
const foo = (_bar) => {};
```

:::

## 选项

此规则选项为对象：

* `"allow"` 允许指定的标识符有悬空的下划线。
* `"allowAfterThis": false`（默认值）不允许在 `this` 对象的成员中使用悬空的下划线。
* `"allowAfterSuper": false`（默认值）不允许在 `super` 对象的成员中使用悬空的下划线。
* `"allowAfterThisConstructor": false`（默认值）不允许在 `this.constructor` 对象的成员中使用悬空的下划线。
* `"enforceInMethodNames": false`（默认值）允许在方法名称中使用悬空的下划线。
* `"enforceInClassFields": false`（默认值）允许在 es2022 类字段名中使用悬空的下划线。
* `"allowFunctionParams": true`（默认值）允许在函数参数名称中使用悬空的下划线。

### allow

使用此规则与 `{ "allow": ["foo_", "_bar"] }` 选项的额外**正确**示例：

::: correct

```js
/*eslint no-underscore-dangle: ["error", { "allow": ["foo_", "_bar"] }]*/

var foo_;
foo._bar();
```

:::

### allowAfterThis

使用此规则与 `{ "allowAfterThis": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-underscore-dangle: ["error", { "allowAfterThis": true }]*/

var a = this.foo_;
this._bar();
```

:::

### allowAfterSuper

使用此规则与 `{ "allowAfterSuper": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-underscore-dangle: ["error", { "allowAfterSuper": true }]*/

var a = super.foo_;
super._bar();
```

:::

### allowAfterThisConstructor

使用此规则与 `{ "allowAfterThisConstructor": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-underscore-dangle: ["error", { "allowAfterThisConstructor": true }]*/

var a = this.constructor.foo_;
this.constructor._bar();
```

:::

### enforceInMethodNames

使用此规则与 `{ "enforceInMethodNames": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-underscore-dangle: ["error", { "enforceInMethodNames": true }]*/

class Foo {
  _bar() {}
}

class Foo {
  bar_() {}
}

const o = {
  _bar() {}
};

const o = {
  bar_() = {}
};
```

:::

### enforceInClassFields

使用此规则与 `{ "enforceInClassFields": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-underscore-dangle: ["error", { "enforceInClassFields": true }]*/

class Foo {
    _bar;
}

class Foo {
    _bar = () => {};
}

class Foo {
    bar_;
}

class Foo {
    #_bar;
}

class Foo {
    #bar_;
}
```

:::

### allowFunctionParams

使用此规则与 `{ "allowFunctionParams": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-underscore-dangle: ["error", { "allowFunctionParams": false }]*/

function foo (_bar) {}
function foo (_bar = 0) {}
function foo (..._bar) {}

const foo = function onClick (_bar) {}
const foo = function onClick (_bar = 0) {}
const foo = function onClick (..._bar) {}

const foo = (_bar) => {};
const foo = (_bar = 0) => {};
const foo = (..._bar) => {};
```

:::

## 何时不用

如果你想在标识符中允许悬空的下划线，那么你可以安全地关闭这个规则。
