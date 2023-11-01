---
title: no-magic-numbers
rule_type: suggestion
---

“魔数“是在代码中多次出现的数字，没有明确的含义。
它们最好被命名的常量所取代。

```js
var now = Date.now(),
    inOneHour = now + (60 * 60 * 1000);
```

## 规则细节

`no-magic-numbers` 规则的目的是通过确保特殊数字
被声明为常量，使其含义明确。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-magic-numbers: "error"*/

var dutyFreePrice = 100,
    finalPrice = dutyFreePrice + (dutyFreePrice * 0.25);
```

:::

::: incorrect

```js
/*eslint no-magic-numbers: "error"*/

var data = ['foo', 'bar', 'baz'];

var dataLast = data[2];
```

:::

::: incorrect

```js
/*eslint no-magic-numbers: "error"*/

var SECONDS;

SECONDS = 60;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-magic-numbers: "error"*/

var TAX = 0.25;

var dutyFreePrice = 100,
    finalPrice = dutyFreePrice + (dutyFreePrice * TAX);
```

:::

## 选项

### ignore

一个要忽略的数字数组。默认情况下，它被设置为 `[]`。
如果提供，它必须是一个 `Array`。

该数组可以包含 `number` 和 `string` 类型的值。
如果它是一个字符串，文本必须被解析为 `bigint` 字面量（如 `"100n"`）。

使用示例的 `{ "ignore": [1] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignore": [1] }]*/

var data = ['foo', 'bar', 'baz'];
var dataLast = data.length && data[data.length - 1];
```

:::

使用示例的 `{ "ignore": ["1n"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignore": ["1n"] }]*/

foo(1n);
```

:::

### ignoreArrayIndexes

布尔值，用于指定在数组索引范围内使用的数字（如 `data[2]`）是否被认为是好的。默认为 `false`。

该选项只允许有效的数组索引：数字将被强制为 `"0"`、`"1"`、`"2"`、...、`"4294967294"` 之一。

数组是对象，所以它们可以有诸如 `"-1"` 或 `"2.5"` 这样的属性名称。然而，这些只是“普通”的对象属性，并不代表数组元素。它们不影响数组的 `length`，而且它们会被像 `.map` 或 `.forEach` 这样的数组方法忽略。

此外，由于最大[数组长度](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 为 2<sup>32</sup> - 1，所有高于 2<sup>32</sup> - 2 的值也仅代表普通属性名称，因此不被视为数组索引。

使用 `{ "ignoreArrayIndexes": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignoreArrayIndexes": true }]*/

var item = data[2];

data[100] = a;

f(data[0]);

a = data[-0]; // same as data[0], -0 will be coerced to "0"

a = data[0xAB];

a = data[5.6e1];

a = data[10n]; // same as data[10], 10n will be coerced to "10"

a = data[4294967294]; // max array index
```

:::

使用 `{ "ignoreArrayIndexes": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-magic-numbers: ["error", { "ignoreArrayIndexes": true }]*/

f(2); // not used as array index

a = data[-1];

a = data[2.5];

a = data[5.67e1];

a = data[-10n];

a = data[4294967295]; // above the max array index

a = data[1e500]; // same as data["Infinity"]
```

:::

### ignoreDefaultValues

布尔值，默认为 `false`。用于指定在默认值分配中使用的数字是否被认为可行。

使用 `{ "ignoreDefaultValues": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignoreDefaultValues": true }]*/

const { tax = 0.25 } = accountancy;

function mapParallel(concurrency = 3) { /***/ }
```

:::

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignoreDefaultValues": true }]*/

let head;
[head = 100] = []
```

:::

### ignoreClassFieldInitialValues

布尔值，默认为 `false`。用于指定作为类字段初始值的数字是否被认为合适。

使用 `{ "ignoreClassFieldInitialValues": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignoreClassFieldInitialValues": true }]*/
class C {
    foo = 2;
    bar = -3;
    #baz = 4;
    static qux = 5;
}
```

:::

使用 `{ "ignoreClassFieldInitialValues": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-magic-numbers: ["error", { "ignoreClassFieldInitialValues": true }]*/
class C {
    foo = 2 + 3;
}
class D {
    2;
}
```

:::

### enforceConst

布尔值，默认为 `false`。指定我们是否应该在数字的变量声明中检查 const 关键字。

使用 `{ "enforceConst": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-magic-numbers: ["error", { "enforceConst": true }]*/

var TAX = 0.25;

var dutyFreePrice = 100,
    finalPrice = dutyFreePrice + (dutyFreePrice * TAX);
```

:::

### detectObjects

布尔值，默认为 `false`。例如指定我们在设置对象属性时是否应该检测数字。

使用 `{ "detectObjects": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-magic-numbers: ["error", { "detectObjects": true }]*/

var magic = {
  tax: 0.25
};

var dutyFreePrice = 100,
    finalPrice = dutyFreePrice + (dutyFreePrice * magic.tax);
```

:::

使用 `{ "detectObjects": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "detectObjects": true }]*/

var TAX = 0.25;

var magic = {
  tax: TAX
};

var dutyFreePrice = 100,
    finalPrice = dutyFreePrice + (dutyFreePrice * magic.tax);
```

:::
