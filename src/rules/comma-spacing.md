---
title: comma-spacing
layout: doc
rule_type: layout
related_rules:
- array-bracket-spacing
- comma-style
- object-curly-spacing
- space-in-brackets
- space-in-parens
- space-infix-ops
- space-after-keywords
- space-unary-ops
- space-return-throw-case
further_reading:
- https://www.crockford.com/code.html
- https://dojotoolkit.org/reference-guide/1.9/developer/styleguide.html
---

逗号周围的间距可以提高项目列表的可读性。尽管大多数语言的风格指南都规定在逗号后而不是在逗号前添加空格，但这是由项目的偏好所决定的。

```js
var foo = 1, bar = 2;
var foo = 1 ,bar = 2;
```

## 规则细节

这条规则使变量声明、数组字面、对象字面、函数参数和序列中逗号前后的间距一致。

此规则不适用于以下情况：

* 在两个逗号之间
* 开头括号和逗号的 `[` 之间，以避免与 [`array-bracket-spacing`](array-bracket-spacing)规则冲突
* 逗号和结尾括号的 `]` 之间，以避免与 [`array-bracket-spacing`](array-bracket-spacing) 规则相冲突
* 在逗号和结尾大括号的 `}` 之间，以避免与 [`object-curly-spacing`](object-curly-spacing) 规则相冲突
* 逗号和括号的 `)` 之间，以避免与 [`space-in-parens`](space-in-parens) 规则相冲突

## 选项

此规则选项为对象：

* `"before": false`（默认值）不允许在逗号前有空格
* `"before": true` 要求在逗号前有一个或多个空格
* `"after": true`（默认值）要求在逗号后有一个或多个空格
* `"after": false`不允许在逗号后有空格

### after

使用此规则与默认的 `{ "before": false, "after": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint comma-spacing: ["error", { "before": false, "after": true }]*/

var foo = 1 ,bar = 2;
var arr = [1 , 2];
var obj = {"foo": "bar" ,"baz": "qur"};
foo(a ,b);
new Foo(a ,b);
function foo(a ,b){}
a ,b
```

:::

使用此规则与默认的 `{ "before": false, "after": true }` 选项的**正确**示例：

:::correct

```js
/*eslint comma-spacing: ["error", { "before": false, "after": true }]*/

var foo = 1, bar = 2
    , baz = 3;
var arr = [1, 2];
var arr = [1,, 3]
var obj = {"foo": "bar", "baz": "qur"};
foo(a, b);
new Foo(a, b);
function foo(a, b){}
a, b
```

:::

Additional 使用此规则与默认的 `{ "before": false, "after": true }` 选项的**正确**示例：

:::correct

```js
/*eslint comma-spacing: ["error", { "before": false, "after": true }]*/

// this rule does not enforce spacing between two commas
var arr = [
    ,,
    , ,
];

// this rule does not enforce spacing after `[` and before `]`
var arr = [,];
var arr = [ , ];
var arr = [a, b,];
[,] = arr;
[ , ] = arr;
[a, b,] = arr;

// this rule does not enforce spacing before `}`
var obj = {x, y,};
var {z, q,} = obj;
import {foo, bar,} from "mod";

// this rule does not enforce spacing before `)`
foo(a, b,)
```

:::

### before

使用此规则与 `{ "before": true, "after": false }` 选项的**错误**示例：

:::incorrect

```js
/*eslint comma-spacing: ["error", { "before": true, "after": false }]*/

var foo = 1, bar = 2;
var arr = [1 , 2];
var obj = {"foo": "bar", "baz": "qur"};
new Foo(a,b);
function foo(a,b){}
a, b
```

:::

使用此规则与 `{ "before": true, "after": false }` 选项的**正确**示例：

:::correct

```js
/*eslint comma-spacing: ["error", { "before": true, "after": false }]*/

var foo = 1 ,bar = 2 ,
    baz = true;
var arr = [1 ,2];
var arr = [1 ,,3]
var obj = {"foo": "bar" ,"baz": "qur"};
foo(a ,b);
new Foo(a ,b);
function foo(a ,b){}
a ,b
```

:::

## 何时不用

如果你的项目将不遵循一致的逗号间距模式，请关闭此规则。
