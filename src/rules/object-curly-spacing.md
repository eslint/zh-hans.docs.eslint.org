---
title: object-curly-spacing
layout: doc
rule_type: layout
related_rules:
- array-bracket-spacing
- comma-spacing
- computed-property-spacing
- space-in-parens
---

虽然格式化的偏好是非常个人化的，但一些风格指南要求
或不允许在以下情况下在大括号之间有空格。

```js
// simple object literals
var obj = { foo: "bar" };

// nested object literals
var obj = { foo: { zoo: "bar" } };

// destructuring assignment (EcmaScript 6)
var { x, y } = y;

// import/export declarations (EcmaScript 6)
import { foo } from "bar";
export { foo };
```

## 规则细节

这条规则使对象字面、解构赋值和导入/导出指定器的大括号内的间距一致。

## 选项

这个规则有两个选项，一个字符串选项和一个对象选项：

字符串选项：

* `"never"`（默认值）不允许在大括号内有间隔
* `"always"` 要求在大括号内有间距（除了 `{}`）

对象选项：

* `"arraysInObjects": true` 要求以数组元素开始和/或结束的对象的大括号内有间距（适用于第一个选项被设置为 `never` 的情况下）
* `"arraysInObjects": false` 不允许以数组元素开始和/或结束的对象的大括号内有间距（当第一个选项被设置为 `always` 时适用）
* `"objectsInObjects": true` 要求以对象元素开始和/或结束的对象的大括号内有间距（当第一个选项被设置为 `never` 时适用）
* `"objectsInObjects": false` 不允许以对象元素开始和/或结束的对象的大括号内有间距（当第一个选项被设置为 `always` 时适用）

### never

使用此规则与默认的 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-curly-spacing: ["error", "never"]*/

var obj = { 'foo': 'bar' };
var obj = {'foo': 'bar' };
var obj = { baz: {'foo': 'qux'}, bar};
var obj = {baz: { 'foo': 'qux'}, bar};
var {x } = y;
import { foo } from 'bar';
```

:::

使用此规则与默认的 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-spacing: ["error", "never"]*/

var obj = {'foo': 'bar'};
var obj = {'foo': {'bar': 'baz'}, 'qux': 'quxx'};
var obj = {
  'foo': 'bar'
};
var obj = {'foo': 'bar'
};
var obj = {
  'foo':'bar'};
var obj = {};
var {x} = y;
import {foo} from 'bar';
```

:::

### always

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-curly-spacing: ["error", "always"]*/

var obj = {'foo': 'bar'};
var obj = {'foo': 'bar' };
var obj = { baz: {'foo': 'qux'}, bar};
var obj = {baz: { 'foo': 'qux' }, bar};
var obj = {'foo': 'bar'
};
var obj = {
  'foo':'bar'};
var {x} = y;
import {foo } from 'bar';
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-spacing: ["error", "always"]*/

var obj = {};
var obj = { 'foo': 'bar' };
var obj = { 'foo': { 'bar': 'baz' }, 'qux': 'quxx' };
var obj = {
  'foo': 'bar'
};
var { x } = y;
import { foo } from 'bar';
```

:::

#### arraysInObjects

使用此规则与额外的 `"never", { "arraysInObjects": true }` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-spacing: ["error", "never", { "arraysInObjects": true }]*/

var obj = {"foo": [ 1, 2 ] };
var obj = {"foo": [ "baz", "bar" ] };
```

:::

使用此规则与额外的 `"always", { "arraysInObjects": false }` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-spacing: ["error", "always", { "arraysInObjects": false }]*/

var obj = { "foo": [ 1, 2 ]};
var obj = { "foo": [ "baz", "bar" ]};
```

:::

#### objectsInObjects

使用此规则与额外的 `"never", { "objectsInObjects": true }` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-spacing: ["error", "never", { "objectsInObjects": true }]*/

var obj = {"foo": {"baz": 1, "bar": 2} };
```

:::
使用此规则与额外的 `"always", { "objectsInObjects": false }` 选项的正确示例：

::: correct

```js
/*eslint object-curly-spacing: ["error", "always", { "objectsInObjects": false }]*/

var obj = { "foo": { "baz": 1, "bar": 2 }};
```

:::

## 何时不用

如果你不关心大括号之间间距的一致性，你可以关闭这一规则。
