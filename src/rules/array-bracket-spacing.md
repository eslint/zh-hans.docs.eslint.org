---
title: array-bracket-spacing
layout: doc
rule_type: layout
related_rules:
- space-in-parens
- object-curly-spacing
- computed-property-spacing
---

一些风格指南要求或不允许在数组括号和其他标记之间有空格。这条规适用于数组字面量和解构赋值（ECMAScript 6）。

```js
/*eslint-env es6*/

var arr = [ 'foo', 'bar' ];
var [ x, y ] = z;

var arr = ['foo', 'bar'];
var [x,y] = z;
```

## 规则细节

这条规则使数组括号内的间距一致。

## 选项

此规则有个值为字符串的选项：

* `"never"`（默认值）禁止数组括号内的空格
* `"always"` 数组括号内需要一个或多个空格或换行

此规则有一个用于处理例外情况的 `"never"` 选项：

* `"singleValue": true` 单一元素的数组字面量的括号内要有一个或多个空格或换行
* `"objectsInArrays": true` 数组字面量的括号和它们的对象字面元素的括号 `[ {` 或 `} ]` 间要有一个或多个空格或换行。
* `"arraysInArrays": true` 数组字面量的大括号和其数组字面量元素的大括号 `[ [` 或 `] ]` 间要有一个或多个空格或换行 。

此规则有一个用于处理例外情况的 `"always"` 选项：

* `"singleValue": false` 禁止包含单一元素的数组字面量的括号内的空格
* `"objectsInArrays": false` 禁止数组字面量的括号和其对象字面元素的括号 `[{` 或 `}]` 间的空格。
* `"arraysInArrays": false` 禁止数组字面量和其数组字面量元素的括号 `[[` 或 ``]]` 间的空格。

这个规则有内置的例外。

* `"never"`（以及 `"always"` 选项的例外）允许在数组括号内换行，因为这是一个常见的模式。
* `"always"` 不要求空格或换行在空的数组字面量 `[]`。

### never

使用此规则与默认 `"never"` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-bracket-spacing: ["error", "never"]*/
/*eslint-env es6*/

var arr = [ 'foo', 'bar' ];
var arr = ['foo', 'bar' ];
var arr = [ ['foo'], 'bar'];
var arr = [[ 'foo' ], 'bar'];
var arr = [ 'foo',
  'bar'
];
var [ x, y ] = z;
var [ x,y ] = z;
var [ x, ...y ] = z;
var [ ,,x, ] = z;
```

:::

使用此规则与默认 `"never"` 选项的**正确**示例：

:::correct

```js
/*eslint array-bracket-spacing: ["error", "never"]*/
/*eslint-env es6*/

var arr = [];
var arr = ['foo', 'bar', 'baz'];
var arr = [['foo'], 'bar', 'baz'];
var arr = [
  'foo',
  'bar',
  'baz'
];
var arr = ['foo',
  'bar'
];
var arr = [
  'foo',
  'bar'];

var [x, y] = z;
var [x,y] = z;
var [x, ...y] = z;
var [,,x,] = z;
```

:::

### always

使用此规则与 `"always"` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-bracket-spacing: ["error", "always"]*/
/*eslint-env es6*/

var arr = ['foo', 'bar'];
var arr = ['foo', 'bar' ];
var arr = [ ['foo'], 'bar' ];
var arr = ['foo',
  'bar'
];
var arr = [
  'foo',
  'bar'];

var [x, y] = z;
var [x,y] = z;
var [x, ...y] = z;
var [,,x,] = z;
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

:::correct

```js
/*eslint array-bracket-spacing: ["error", "always"]*/
/*eslint-env es6*/

var arr = [];
var arr = [ 'foo', 'bar', 'baz' ];
var arr = [ [ 'foo' ], 'bar', 'baz' ];
var arr = [ 'foo',
  'bar'
];
var arr = [
  'foo',
  'bar' ];
var arr = [
  'foo',
  'bar',
  'baz'
];

var [ x, y ] = z;
var [ x,y ] = z;
var [ x, ...y ] = z;
var [ ,,x, ] = z;
```

:::

### singleValue

使用此规则与 `"always", { "singleValue": false }` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-bracket-spacing: ["error", "always", { "singleValue": false }]*/

var foo = [ 'foo' ];
var foo = [ 'foo'];
var foo = ['foo' ];
var foo = [ 1 ];
var foo = [ 1];
var foo = [1 ];
var foo = [ [ 1, 2 ] ];
var foo = [ { 'foo': 'bar' } ];
```

:::

使用此规则与 `"always", { "singleValue": false }` 选项的**正确**示例：

:::correct

```js
/*eslint array-bracket-spacing: ["error", "always", { "singleValue": false }]*/

var foo = ['foo'];
var foo = [1];
var foo = [[ 1, 1 ]];
var foo = [{ 'foo': 'bar' }];
```

:::

### objectsInArrays

使用此规则与 `"always", { "objectsInArrays": false }` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-bracket-spacing: ["error", "always", { "objectsInArrays": false }]*/

var arr = [ { 'foo': 'bar' } ];
var arr = [ {
  'foo': 'bar'
} ]
```

:::

使用此规则与 `"always", { "objectsInArrays": false }` 选项的**正确**示例：

:::correct

```js
/*eslint array-bracket-spacing: ["error", "always", { "objectsInArrays": false }]*/

var arr = [{ 'foo': 'bar' }];
var arr = [{
  'foo': 'bar'
}];
```

:::

### arraysInArrays

使用此规则与 `"always", { "arraysInArrays": false }` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-bracket-spacing: ["error", "always", { "arraysInArrays": false }]*/

var arr = [ [ 1, 2 ], 2, 3, 4 ];
var arr = [ [ 1, 2 ], 2, [ 3, 4 ] ];
```

:::

使用此规则与 `"always", { "arraysInArrays": false }` 选项的**正确**示例：

:::correct

```js
/*eslint array-bracket-spacing: ["error", "always", { "arraysInArrays": false }]*/

var arr = [[ 1, 2 ], 2, 3, 4 ];
var arr = [[ 1, 2 ], 2, [ 3, 4 ]];
```

:::

## 何时不用

如果你不关心数组括号之间间距是否一致，你可以关闭这个规则。
