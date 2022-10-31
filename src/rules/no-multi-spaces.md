---
title: no-multi-spaces
layout: doc
rule_type: layout
related_rules:
- key-spacing
- space-infix-ops
- space-in-brackets
- space-in-parens
- space-after-keywords
- space-unary-ops
- space-return-throw-case
---

一行中的多个空格不用于缩进，通常是错误的。比如：

```js

if(foo  === "bar") {}

```

很难说，但在 `foo` 和 `===` 之间有两个空格。一般来说，像这样的多个空格是不允许的，而应该是单个空格。

```js

if(foo === "bar") {}

```

## 规则细节

这条规则的目的是不允许在逻辑表达式、条件表达式、声明、数组元素、对象属性、序列和函数参数周围有多个空格。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-multi-spaces: "error"*/

var a =  1;

if(foo   === "bar") {}

a <<  b

var arr = [1,  2];

a ?  b: c
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-multi-spaces: "error"*/

var a = 1;

if(foo === "bar") {}

a << b

var arr = [1, 2];

a ? b: c
```

:::

## 选项

这个规则的配置由一个具有以下属性的对象组成：

* `"ignoreEOLComments": true`（默认为 `false`) 忽略行末出现的注释前的多个空格
* `"exceptions": { "Property": true }`（`"Property"` 是默认指定的唯一节点）指定要忽略的节点

### ignoreEOLComments

使用此规则与 `{ "ignoreEOLComments": false }`（默认值）选项的**错误**示例：

::: incorrect

```js
/*eslint no-multi-spaces: ["error", { ignoreEOLComments: false }]*/

var x = 5;      // comment
var x = 5;      /* multiline
 * comment
 */
```

:::

使用此规则与 `{ "ignoreEOLComments": false }`（默认值）选项的**正确**示例：

::: correct

```js
/*eslint no-multi-spaces: ["error", { ignoreEOLComments: false }]*/

var x = 5; // comment
var x = 5; /* multiline
 * comment
 */
```

:::

使用此规则与 `{ "ignoreEOLComments": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-multi-spaces: ["error", { ignoreEOLComments: true }]*/

var x = 5; // comment
var x = 5;      // comment
var x = 5; /* multiline
 * comment
 */
var x = 5;      /* multiline
 * comment
 */
```

:::

### exceptions

为了避免与其他需要多个空格的规则相矛盾，该规则有一个`例外'选项来忽略某些节点。

这个选项是一个期望属性名是 AST 节点类型的对象，由 [ESTree](https://github.com/estree/estree) 定义。确定 `exceptions` 的节点类型的最简单方法是使用 [AST Explorer](https://astexplorer.net/) 和 espree 解析器。

只有 `Property` 节点类型在默认情况下被忽略，因为对于 [key-spacing](key-spacing) 规则，一些对齐选项需要在对象字面的属性中使用多个空格。

使用默认的 `"exceptions": { "Property": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-multi-spaces: "error"*/
/*eslint key-spacing: ["error", { align: "value" }]*/

var obj = {
    first:  "first",
    second: "second"
};
```

:::

使用 `"exceptions": { "Property": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-multi-spaces: ["error", { exceptions: { "Property": false } }]*/
/*eslint key-spacing: ["error", { align: "value" }]*/

var obj = {
    first:  "first",
    second: "second"
};
```

:::

使用 `"exceptions": { "BinaryExpression": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-multi-spaces: ["error", { exceptions: { "BinaryExpression": true } }]*/

var a = 1  *  2;
```

:::

使用 `"exceptions": { "VariableDeclarator": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }]*/

var someVar      = 'foo';
var someOtherVar = 'barBaz';
```

:::

使用 `"exceptions": { "ImportDeclaration": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-multi-spaces: ["error", { exceptions: { "ImportDeclaration": true } }]*/

import mod          from 'mod';
import someOtherMod from 'some-other-mod';
```

:::

## 何时不用

如果你不想检查和不允许有多个空格，那么你应该把这个规则关掉。
