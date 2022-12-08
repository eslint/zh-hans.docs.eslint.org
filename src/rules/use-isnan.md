---
title: use-isnan
layout: doc
rule_type: problem
---

在 JavaScript 中，`NaN` 是 `Number` 类型的一个特殊值。它被用来表示任何由 IEEE 二进制浮点运算标准规定的双精度 64 位格式所代表的“非数字”值。

因为 `NaN` 在 JavaScript 中是唯一的，它不等于任何东西，包括它自己，所以与 `NaN` 比较的结果是混乱的。

* `NaN === NaN` 或 `NaN == NaN` 评估为假
* `NaN !== NaN` 或 `NaN != NaN` 评估为真。

因此，使用 `Number.isNaN()` 或全局 `isNaN()` 函数来测试一个值是否是 `NaN`。

## 规则细节

这条规则不允许与 `NaN` 进行比较。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint use-isnan: "error"*/

if (foo == NaN) {
    // ...
}

if (foo != NaN) {
    // ...
}

if (foo == Number.NaN) {
    // ...
}

if (foo != Number.NaN) {
    // ...
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint use-isnan: "error"*/

if (isNaN(foo)) {
    // ...
}

if (!isNaN(foo)) {
    // ...
}
```

:::

## 选项

这个规则有一个对象选项，有两个选项：

* `"enforceForSwitchCase": true`（默认值）另外不允许在 `switch` 语句中使用 `case NaN` 和 `switch(NaN)`。
* `"enforceForIndexOf": true` 另外禁止使用 `indexOf` 和 `lastIndexOf` 方法与 `NaN`。默认为 `false`，意味着该规则默认不会对 `indexOf(NaN)` 或 `lastIndexOf(NaN)` 方法的调用发出警告。

### enforceForSwitchCase

`switch` 语句在内部使用 `===` 比较，将表达式的值与 case 子句相匹配。
因此，它永远无法匹配 `case NaN`。同时，`switch(NaN)` 也不能匹配 case 子句。

使用此规则与默认的 `"enforceForSwitchCase"`选项设置为 `true` 选项的**错误**示例：

::: incorrect

```js
/*eslint use-isnan: ["error", {"enforceForSwitchCase": true}]*/

switch (foo) {
    case NaN:
        bar();
        break;
    case 1:
        baz();
        break;
    // ...
}

switch (NaN) {
    case a:
        bar();
        break;
    case b:
        baz();
        break;
    // ...
}

switch (foo) {
    case Number.NaN:
        bar();
        break;
    case 1:
        baz();
        break;
    // ...
}

switch (Number.NaN) {
    case a:
        bar();
        break;
    case b:
        baz();
        break;
    // ...
}
```

:::

使用此规则的例子，默认的 `"enforSwitchCase"`选项设置为 `true` 选项**正确。

::: correct

```js
/*eslint use-isnan: ["error", {"enforceForSwitchCase": true}]*/

if (Number.isNaN(foo)) {
    bar();
} else {
    switch (foo) {
        case 1:
            baz();
            break;
        // ...
    }
}

if (Number.isNaN(a)) {
    bar();
} else if (Number.isNaN(b)) {
    baz();
} // ...
```

:::

在 `"enforceForSwitchCase"` 选项设置为 `false` 的情况下，此规则的**正确的代码示例：

::: correct

```js
/*eslint use-isnan: ["error", {"enforceForSwitchCase": false}]*/

switch (foo) {
    case NaN:
        bar();
        break;
    case 1:
        baz();
        break;
    // ...
}

switch (NaN) {
    case a:
        bar();
        break;
    case b:
        baz();
        break;
    // ...
}

switch (foo) {
    case Number.NaN:
        bar();
        break;
    case 1:
        baz();
        break;
    // ...
}

switch (Number.NaN) {
    case a:
        bar();
        break;
    case b:
        baz();
        break;
    // ...
}
```

:::

### enforceForIndexOf

以下方法在内部使用 `===`比较法来匹配给定值和数组元素。

* [`Array.prototype.indexOf`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.indexof)
* [`Array.prototype.lastIndexOf`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.lastindexof)

因此，对于任何数组`foo`，`foo.indexOf(NaN)` 和 `foo.lastIndexOf(NaN)`总是返回`1`。

如果你想让这个规则报告 `indexOf(NaN)` 和 `lastIndexOf(NaN)`方法的调用，请将 `"enforexOf"` 设置为 `true`。

使用此规则并将 `"enforceForIndexOf"` 选项设置为 `true` 的**错误**示例：

::: incorrect

```js
/*eslint use-isnan: ["error", {"enforceForIndexOf": true}]*/

var hasNaN = myArray.indexOf(NaN) >= 0;

var firstIndex = myArray.indexOf(NaN);

var lastIndex = myArray.lastIndexOf(NaN);
```

:::

使用此规则并将 `"enforceForIndexOf"` 选项设置为 `true` 的**正确**示例：

::: correct

```js
/*eslint use-isnan: ["error", {"enforceForIndexOf": true}]*/

function myIsNaN(val) {
    return typeof val === "number" && isNaN(val);
}

function indexOfNaN(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (myIsNaN(arr[i])) {
            return i;
        }
    }
    return -1;
}

function lastIndexOfNaN(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (myIsNaN(arr[i])) {
            return i;
        }
    }
    return -1;
}

var hasNaN = myArray.some(myIsNaN);

var hasNaN = indexOfNaN(myArray) >= 0;

var firstIndex = indexOfNaN(myArray);

var lastIndex = lastIndexOfNaN(myArray);

// ES2015
var hasNaN = myArray.some(Number.isNaN);

// ES2015
var firstIndex = myArray.findIndex(Number.isNaN);

// ES2016
var hasNaN = myArray.includes(NaN);
```

:::

#### 已知限制

这个选项检查给定名称的方法，**即使**拥有该方法的对象**不是数组**。
