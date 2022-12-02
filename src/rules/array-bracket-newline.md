---
title: array-bracket-newline
layout: doc
rule_type: layout
related_rules:
- array-bracket-spacing
---

一些风格指南要求或不允许在数组括号内换行。

## 规则细节

这条规则在数组括号的开头和结尾之前都会执行换行。

## 选项

这条规则有一个字符串选项：

* `"always"` 需要括号内的换行符
* `"never"` 不允许在括号内换行。
* `"consistent"` 需要对每一对方括号一致使用换行符。如果一对括号中的一个括号内有换行符，而另一个括号内没有，则报错。

或一个对象选项（如果满足任何属性，则需要换行。否则，不允许换行）。

* `"multiline": true`（默认值）如果元素内部或元素之间有换行，则需要换行。如果是假的，这个条件就被禁用。
* `"minItems": null`（默认值）如果元素的数量至少是给定的整数，则需要换行。如果是 0，这个条件与选项 `"always"` 的作用相同。如果是 `null`（默认），这个条件将被禁用。

### always

使用此规则与 `"always"` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", "always"]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1,
    2];
var e = [function foo() {
    dosomething();
}];
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", "always"]*/

var a = [
];
var b = [
    1
];
var c = [
    1, 2
];
var d = [
    1,
    2
];
var e = [
    function foo() {
        dosomething();
    }
];
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", "never"]*/

var a = [
];
var b = [
    1
];
var c = [
    1, 2
];
var d = [
    1,
    2
];
var e = [
    function foo() {
        dosomething();
    }
];
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", "never"]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1,
    2];
var e = [function foo() {
    dosomething();
}];
```

:::

### consistent

使用此规则与 `"consistent"` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", "consistent"]*/

var a = [1
];
var b = [
    1];
var c = [function foo() {
    dosomething();
}
]
var d = [
    function foo() {
        dosomething();
    }]
```

:::

使用此规则与 `"consistent"` 选项的**正确**示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", "consistent"]*/

var a = [];
var b = [
];
var c = [1];
var d = [
    1
];
var e = [function foo() {
    dosomething();
}];
var f = [
    function foo() {
        dosomething();
    }
];
```

:::

### multiline

使用此规则与默认 `{ "multiline": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", { "multiline": true }]*/

var a = [
];
var b = [
    1
];
var c = [
    1, 2
];
var d = [1,
    2];
var e = [function foo() {
    dosomething();
}];
```

:::

使用此规则与默认 `{ "multiline": true }` 选项的**正确**示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", { "multiline": true }]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [
    1,
    2
];
var e = [
    function foo() {
        dosomething();
    }
];
```

:::

### minItems

使用此规则与 `{ "minItems": 2 }` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", { "minItems": 2 }]*/

var a = [
];
var b = [
    1
];
var c = [1, 2];
var d = [1,
    2];
var e = [
  function foo() {
    dosomething();
  }
];
```

:::

使用此规则与 `{ "minItems": 2 }` 选项的**正确**示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", { "minItems": 2 }]*/

var a = [];
var b = [1];
var c = [
    1, 2
];
var d = [
    1,
    2
];
var e = [function foo() {
    dosomething();
}];
```

:::

### multiline and minItems

使用此规则与 `{ "multiline": true, "minItems": 2 }` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", { "multiline": true, "minItems": 2 }]*/

var a = [
];
var b = [
    1
];
var c = [1, 2];
var d = [1,
    2];
var e = [function foo() {
    dosomething();
}];
```

:::

使用此规则与 `{ "multiline": true, "minItems": 2 }` 选项的**正确**示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", { "multiline": true, "minItems": 2 }]*/

var a = [];
var b = [1];
var c = [
    1, 2
];
var d = [
    1,
    2
];
var e = [
    function foo() {
        dosomething();
    }
];
```

:::

## 何时不用

如果你不想在打开数组括号后和关闭数组括号前执行换行，就不要启用这个规则。

## 兼容

* **JSCS**：[validateNewlineAfterArrayElements](https://jscs-dev.github.io/rule/validateNewlineAfterArrayElements)
