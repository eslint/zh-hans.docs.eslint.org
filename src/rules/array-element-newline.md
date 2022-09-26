---
title: array-element-newline
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/array-element-newline.md
rule_type: layout
related_rules:
- array-bracket-spacing
- array-bracket-newline
- object-property-newline
- object-curly-spacing
- object-curly-newline
- max-statements-per-line
- block-spacing
- brace-style
---

一些风格指南要求或不允许在数组元素之间换行。

## 规则细节

这条规则在数组元素之间实行换行。

## 选项

该规则有一个字符串选项：

* `"always"`（默认值）要求在数组元素之间换行
* `"never"` 不允许在数组元素之间换行
* `"consistent"` 要求在数组元素之间一致使用换行符

或者一个对象选项（如果满足其中任何一个属性，则需要换行。否则，不允许换行）。

* `"multiline": <boolean>` 如果元素内部有换行符，需要换行。如果是假的，这个条件被禁用。
* `"minItems": <number>` 如果元素的数量至少是给定的整数，则需要换行。如果是 0，这个条件的作用与选项 `"always"` 相同。如果是 `null`（默认），这个条件将被禁用。

另外，可以为数组表达式和数组模式指定不同的配置。

```json
{
    "array-element-newline": ["error", {
        "ArrayExpression": "consistent",
        "ArrayPattern": { "minItems": 3 },
    }]
}
```

* `"ArrayExpression"` 配置为数组表达式（如果没有指定，本规则将不适用于数组表达式）。
* `"ArrayPattern"` 配置用于解构赋值的数组模式（如果没有指定，本规则将不适用于数组模式）。

### always

使用此规则与默认 `"always"` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", "always"]*/

var c = [1, 2];
var d = [1, 2, 3];
var e = [1, 2, 3
];
var f = [
  1, 2, 3
];
var g = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];
```

:::

使用此规则与默认 `"always"` 选项的**正确**示例：

:::correct

```js
/*eslint array-element-newline: ["error", "always"]*/

var a = [];
var b = [1];
var c = [1,
    2];
var d = [1,
    2,
    3];
var d = [
  1, 
  2, 
  3
];
var e = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", "never"]*/

var c = [
    1,
    2
];
var d = [
    1,
    2,
    3
];
var e = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

:::correct

```js
/*eslint array-element-newline: ["error", "never"]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1, 2, 3];
var e = [
    1, 2, 3];
var f = [
  1, 2, 3
];
var g = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];
```

:::

### consistent

使用此规则与 `"consistent"` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", "consistent"]*/

var a = [
    1, 2,
    3
];
var b = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    },
    function baz() {
        dosomething();
    }
];
```

:::

使用此规则与 `"consistent"` 选项的**正确**示例：

:::correct

```js
/*eslint array-element-newline: ["error", "consistent"]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1, 2, 3];
var e = [
    1,
    2
];
var f = [
    1,
    2,
    3
];
var g = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }, function baz() {
        dosomething();
    }
];
var h = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    },
    function baz() {
        dosomething();
    }
];
```

:::

### multiline

使用此规则与 `{ "multiline": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", { "multiline": true }]*/

var d = [1,
    2, 3];
var e = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];
```

:::

使用此规则与 `{ "multiline": true }` 选项的**正确**示例：

:::correct

```js
/*eslint array-element-newline: ["error", { "multiline": true }]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1, 2, 3];
var e = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];
```

:::

### minItems

使用此规则与 `{ "minItems": 3 }` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", { "minItems": 3 }]*/

var c = [1,
    2];
var d = [1, 2, 3];
var e = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];
```

:::

使用此规则与 `{ "minItems": 3 }` 选项的**正确**示例：

:::correct

```js
/*eslint array-element-newline: ["error", { "minItems": 3 }]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1,
    2,
    3];
var e = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];
```

:::

### multiline and minItems

使用此规则与 `{ "multiline": true, "minItems": 3 }` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", { "multiline": true, "minItems": 3 }]*/

var c = [1,
2];
var d = [1, 2, 3];
var e = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];
```

:::

使用此规则与 `{ "multiline": true, "minItems": 3 }` 选项的**正确**示例：

:::correct

```js
/*eslint array-element-newline: ["error", { "multiline": true, "minItems": 3 }]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1,
    2,
    3];
var e = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];
```

:::

### ArrayExpression 和 ArrayPattern

使用此规则与 `{ "ArrayExpression": "always", "ArrayPattern": "never" }` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", { "ArrayExpression": "always", "ArrayPattern": "never" }]*/

var a = [1, 2];
var b = [1, 2, 3];
var c = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];

var [d,
    e] = arr;
var [f,
    g,
    h] = arr;
var [i = function foo() {
  dosomething()
},
j = function bar() {
  dosomething()
}] = arr
```

:::

使用此规则与 `{ "ArrayExpression": "always", "ArrayPattern": "never" }` 选项的**正确**示例：

:::correct

```js
/*eslint array-element-newline: ["error", { "ArrayExpression": "always", "ArrayPattern": "never" }]*/

var a = [1,
    2];
var b = [1,
    2,
    3];
var c = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];

var [d, e] = arr
var [f, g, h] = arr
var [i = function foo() {
    dosomething()
}, j = function bar() {
    dosomething()
}] = arr
```

:::

## 何时不用

如果你不想在数组元素之间执行换行，就不要启用这个规则。

## 兼容

* **JSCS**：[validateNewlineAfterArrayElements](https://jscs-dev.github.io/rule/validateNewlineAfterArrayElements)
