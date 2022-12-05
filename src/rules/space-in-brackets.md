---
title: space-in-brackets
layout: doc

related_rules:
- array-bracket-spacing
- object-curly-spacing
- space-in-parens
- computed-property-spacing
---

强制执行对象字样的大括号和数组字样的小括号内的一致间距。

（已移除）此规则在 ESLint v1.0 中移除并被 [object-curly-spacing](object-curly-spacing) 和 [array-bracket-spacing](array-bracket-spacing) 所取代。

虽然格式偏好是非常个人化的，但一些风格指南要求或不允许括号之间有空格。

```js
var obj = { foo: 'bar' };
var arr = [ 'foo', 'bar' ];
foo[ 'bar' ];

var obj = {foo: 'bar'};
var arr = ['foo', 'bar'];
foo['bar'];
```

## 规则细节

这条规则的目的是保持方括号内间距的一致性，要么不允许方括号内的空格在方括号和其他标记之间，要么强制执行空格。用新的一行与相邻值分开的方括号不在此规则之列，因为这是一种常见的模式。 被用作数组中第一个或最后一个元素的对象字面也被忽略了。

## 选项

这个规则有两个选项：

* `"always"` 在对象和数组字面上执行一个空格
* `"never"` 在对象和数组字面上执行零空间（默认）

根据你的编码习惯，你可以通过在配置中指定它来选择任一选项：

```json
"space-in-brackets": ["error", "always"]
```

### "never"

使用此规则与默认的 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint-env es6*/

foo[ 'bar' ];
foo['bar' ];

var arr = [ 'foo', 'bar' ];
var arr = ['foo', 'bar' ];
var arr = [ ['foo'], 'bar'];
var arr = [[ 'foo' ], 'bar'];
var arr = ['foo',
  'bar'
];

var obj = { 'foo': 'bar' };
var obj = {'foo': 'bar' };
var obj = { baz: {'foo': 'qux'}, bar};
var obj = {baz: { 'foo': 'qux' }, bar};
```

:::

使用此规则与默认的 `"never"` 选项的**正确**示例：

::: correct

```js
// When options are ["error", "never"]

foo['bar'];
foo[
  'bar'
];
foo[
  'bar'];

var arr = [];
var arr = ['foo', 'bar', 'baz'];
var arr = [['foo'], 'bar', 'baz'];
var arr = [
  'foo',
  'bar',
  'baz'
];

var arr = [
  'foo',
  'bar'];

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
```

:::

### "always"

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint-env es6*/

foo['bar'];
foo['bar' ];
foo[ 'bar'];

var arr = ['foo', 'bar'];
var arr = ['foo', 'bar' ];
var arr = [ ['foo'], 'bar' ];
var arr = ['foo',
  'bar'
];

var arr = [
  'foo',
  'bar'];

var obj = {'foo': 'bar'};
var obj = {'foo': 'bar' };
var obj = { baz: {'foo': 'qux'}, bar};
var obj = {baz: { 'foo': 'qux' }, bar};
var obj = {'foo': 'bar'
};

var obj = {
  'foo':'bar'};
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
foo[ 'bar' ];
foo[
  'bar'
];

var arr = [];
var arr = [ 'foo', 'bar', 'baz' ];
var arr = [ [ 'foo' ], 'bar', 'baz' ];

var arr = [
  'foo',
  'bar',
  'baz'
];

var obj = {};
var obj = { 'foo': 'bar' };
var obj = { 'foo': { 'bar': 'baz' }, 'qux': 'quxx' };
var obj = {
  'foo': 'bar'
};
```

:::

Note that `"always"` has a special case where `{}` and `[]` are not considered problems.

### Exceptions

一个对象的字面意思可以作为第三个数组项来指定间距异常。这些例外情况在第一个选项的背景下工作。也就是说，如果 `"always"` 被设置为强制执行间距，并且一个例外被设置为 `false`，那么它将不允许与该例外相匹配的情况下的间距。同样地，如果 `"never"` 被设置为不允许间隔，并且一个例外被设置为 `true`，那么它将对符合该例外的情况强制执行间隔。

你可以像这样添加例外情况：

在 `"always"` 选项的情况下，将异常设置为 `false` 来启用它：

```json
"space-in-brackets": ["error", "always", {
  "singleValue": false,
  "objectsInArrays": false,
  "arraysInArrays": false,
  "arraysInObjects": false,
  "objectsInObjects": false,
  "propertyName": false
}]
```

如果是 `"never"` 选项，请将异常设置为 `true` 以启用它：

```json
"space-in-brackets": ["error", "never", {
  "singleValue": true,
  "objectsInArrays": true,
  "arraysInArrays": true,
  "arraysInObjects": true,
  "objectsInObjects": true,
  "propertyName": true
}]
```

有以下例外情况：

* `singleValue` 设置一个数组的方括号内的单个值的间距。
* `objectsInArrays` 设置数组中第一个或最后一个元素的对象字词的大括号和方括号之间的间距。
* `arraysInArrays` 设置作为数组中第一个或最后一个元素的数组字词的方括号之间的间距。
* `arraysInObjects` 设置对象中最后一个元素的数组字词的方括号和大括号之间的间距。
* `objectsInObjects` 设置对象字面的大括号和包含对象的大括号之间的间距，该对象是对象中的最后一个元素。
* `propertyName` 设置计算的成员表达式的方括号中的间距。

在下面的每个例子中，都假定使用 `"always"` 选项。

使用此规则并将 `"singleValue"` 设置为 `false` 的**错误**示例：

::: incorrect

```js
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

使用此规则并将 `"singleValue"` 设置为 `false` 的**正确**示例：

::: correct

```js
var foo = ['foo'];
var foo = [1];
var foo = [[ 1, 1 ]];
var foo = [{ 'foo': 'bar' }];
```

:::

使用此规则并将 `"objectsInArrays"` 设置为 `false` 的**错误**示例：

::: incorrect

```js
var arr = [ { 'foo': 'bar' } ];
var arr = [ {
  'foo': 'bar'
} ]
```

:::

使用此规则并将 `"objectsInArrays"` 设置为 `false` 的**正确**示例：

::: correct

```js
var arr = [{ 'foo': 'bar' }];
var arr = [{
  'foo': 'bar'
}];
```

:::

使用此规则并将 `"arraysInArrays"` 设置为 `false` 的**错误**示例：

::: incorrect

```js
var arr = [ [ 1, 2 ], 2, 3, 4 ];
var arr = [ [ 1, 2 ], 2, [ 3, 4 ] ];
```

:::

使用此规则并将 `"arraysInArrays"` 设置为 `false` 的**正确**示例：

::: correct

```js
var arr = [[ 1, 2 ], 2, 3, 4 ];
var arr = [[ 1, 2 ], 2, [ 3, 4 ]];
```

:::

使用此规则并将 `"arraysInObjects"` 设置为 `false` 的**错误**示例：

::: incorrect

```js
var obj = { "foo": [ 1, 2 ] };
var obj = { "foo": [ "baz", "bar" ] };
```

:::

使用此规则并将 `"arraysInObjects"` 设置为 `false` 的**正确**示例：

::: correct

```js
var obj = { "foo": [ 1, 2 ]};
var obj = { "foo": [ "baz", "bar" ]};
```

:::

使用此规则并将 `"objectsInObjects"` 设置为 `false` 的**错误**示例：

::: incorrect

```js
var obj = { "foo": { "baz": 1, "bar": 2 } };
var obj = { "foo": [ "baz", "bar" ], "qux": { "baz": 1, "bar": 2 } };
```

:::

使用此规则并将 `"objectsInObjects"` 设置为 `false` 的**正确**示例：

::: correct

```js
var obj = { "foo": { "baz": 1, "bar": 2 }};
var obj = { "foo": [ "baz", "bar" ], "qux": { "baz": 1, "bar": 2 }};
```

:::

使用此规则并将 `"propertyName"` 设置为 `false` 的**错误**示例：

::: incorrect

```js
var foo = obj[ 1 ];
var foo = obj[ bar ];
```

:::

使用此规则并将 `"propertyName"` 设置为 `false` 的**正确**示例：

::: correct

```js
var foo = obj[bar];
var foo = obj[0, 1];
```

:::

## 何时不用

如果你不关心括号之间间距的一致性，你可以把这个规则关掉。
