---
title: id-length
layout: doc
rule_type: suggestion
related_rules:
- max-len
- new-cap
- func-names
- camelcase
---

像 `e`, `x`, `_t` 这样非常短的标识符名称或像  `hashGeneratorResultOutputContainerObject` 这样非常长的标识符名称会使代码更难读，并可能降低可维护性。为了防止这种情况，我们可以强制执行一个最小和/或最大的标识符长度。

```js
var x = 5; // too short; difficult to understand its purpose without context
```

## 规则细节

这条规则强制执行最小和/或最大标识符长度公约。

## 选项

使用此规则与默认选项的**错误**示例：

::: incorrect

```js
/*eslint id-length: "error"*/     // default is minimum 2-chars ({ "min": 2 })
/*eslint-env es6*/

var x = 5;
obj.e = document.body;
var foo = function (e) { };
try {
    dangerousStuff();
} catch (e) {
    // ignore as many do
}
var myObj = { a: 1 };
(a) => { a * a };
class x { }
class Foo { x() {} }
class Foo { #x() {} }
class Foo { x = 1 }
class Foo { #x = 1 }
function foo(...x) { }
function foo([x]) { }
var [x] = arr;
var { prop: [x]} = {};
function foo({x}) { }
var { x } = {};
var { prop: a} = {};
({ prop: obj.x } = {});
```

:::

使用此规则与默认选项的**正确**示例：

::: correct

```js
/*eslint id-length: "error"*/     // default is minimum 2-chars ({ "min": 2 })
/*eslint-env es6*/

var num = 5;
function _f() { return 42; }
function _func() { return 42; }
obj.el = document.body;
var foo = function (evt) { /* do stuff */ };
try {
    dangerousStuff();
} catch (error) {
    // ignore as many do
}
var myObj = { apple: 1 };
(num) => { num * num };
function foo(num = 0) { }
class MyClass { }
class Foo { method() {} }
class Foo { #method() {} }
class Foo { field = 1 }
class Foo { #field = 1 }
function foo(...args) { }
function foo([longName]) { }
var { prop } = {};
var { prop: [longName] } = {};
var [longName] = arr;
function foo({ prop }) { }
function foo({ a: prop }) { }
var { prop } = {};
var { a: prop } = {};
({ prop: obj.longName } = {});
var data = { "x": 1 };  // excused because of quotes
data["y"] = 3;  // excused because of calculated property access
```

:::

此规则选项为对象：

* `"min"` （默认值：2) 执行最小标识符长度
* `"max"`（默认值：无穷大）执行最大标识符长度
* `"properties": always`（默认值）执行属性名称的标识符长度约定
* `"properties": never` 忽略属性名的标识符长度约定
* `"exceptions"` 允许一个指定标识符名称的数组
* `"exceptionPatterns"` 代表正则表达式模式的字符串数组，允许匹配任何模式的标识符

### min

使用此规则与 `{ "min": 4 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint id-length: ["error", { "min": 4 }]*/
/*eslint-env es6*/

var val = 5;
obj.e = document.body;
function foo (e) { };
try {
    dangerousStuff();
} catch (e) {
    // ignore as many do
}
var myObj = { a: 1 };
(val) => { val * val };
class x { }
class Foo { x() {} }
function foo(...x) { }
var { x } = {};
var { prop: a} = {};
var [x] = arr;
var { prop: [x]} = {};
({ prop: obj.x } = {});
```

:::

使用此规则与 `{ "min": 4 }` 选项的**正确**示例：

::: correct

```js
/*eslint id-length: ["error", { "min": 4 }]*/
/*eslint-env es6*/

var value = 5;
function func() { return 42; }
obj.element = document.body;
var foobar = function (event) { /* do stuff */ };
try {
    dangerousStuff();
} catch (error) {
    // ignore as many do
}
var myObj = { apple: 1 };
(value) => { value * value };
function foobar(value = 0) { }
class MyClass { }
class Foobar { method() {} }
function foobar(...args) { }
var { prop } = {};
var [longName] = foo;
var { a: [prop] } = {};
var { a: longName } = {};
({ prop: obj.name } = {});
var data = { "x": 1 };  // excused because of quotes
data["y"] = 3;  // excused because of calculated property access
```

:::

### max

使用此规则与 `{ "max": 10 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint id-length: ["error", { "max": 10 }]*/
/*eslint-env es6*/

var reallyLongVarName = 5;
function reallyLongFuncName() { return 42; }
obj.reallyLongPropName = document.body;
var foo = function (reallyLongArgName) { /* do stuff */ };
try {
    dangerousStuff();
} catch (reallyLongErrorName) {
    // ignore as many do
}
(reallyLongArgName) => { return !reallyLongArgName; };
var [reallyLongFirstElementName] = arr;
```

:::

使用此规则与 `{ "max": 10 }` 选项的**正确**示例：

::: correct

```js
/*eslint id-length: ["error", { "max": 10 }]*/
/*eslint-env es6*/

var varName = 5;
function funcName() { return 42; }
obj.propName = document.body;
var foo = function (arg) { /* do stuff */ };
try {
    dangerousStuff();
} catch (error) {
    // ignore as many do
}
(arg) => { return !arg; };
var [first] = arr;
```

:::

### properties

使用此规则与 `{ "properties": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint id-length: ["error", { "properties": "never" }]*/
/*eslint-env es6*/

var myObj = { a: 1 };
({ a: obj.x.y.z } = {});
({ prop: obj.i } = {});
```

:::

### exceptions

适宜此规则与额外的`{ "exceptions": ["x"] }` 选项的**正确**示例：

::: correct

```js
/*eslint id-length: ["error", { "exceptions": ["x"] }]*/
/*eslint-env es6*/

var x = 5;
function x() { return 42; }
obj.x = document.body;
var foo = function (x) { /* do stuff */ };
try {
    dangerousStuff();
} catch (x) {
    // ignore as many do
}
(x) => { return x * x; };
var [x] = arr;
const { x } = foo;
const { a: x } = foo;
```

:::

### exceptionPatterns

使用此规则与额外的 `{ "exceptionPatterns": ["E|S", "[x-z]"] }` 选项的**正确**示例：

::: correct

```js
/*eslint id-length: ["error", { "exceptionPatterns": ["E|S", "[x-z]"] }]*/
/*eslint-env es6*/

var E = 5;
function S() { return 42; }
obj.x = document.body;
var foo = function (x) { /* do stuff */ };
try {
    dangerousStuff();
} catch (x) {
    // ignore as many do
}
(y) => {return  y * y};
var [E] = arr;
const { y } = foo;
const { a: z } = foo;
```

:::
