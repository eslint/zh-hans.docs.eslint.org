---
title: indent
layout: doc
rule_type: layout
---

有几个常见的准则要求嵌套块和语句的具体缩进，如：

```js
function hello(indentSize, type) {
    if (indentSize === 4 && type !== 'tab') {
        console.log('Each next indentation will increase on 4 spaces');
    }
}
```

这些是不同风格指南中推荐的最常见的情况。

* 两个空格，非制表符：Google, npm, Node.js, Idiomatic, Felix
* 制表符：jQuery
* 四个空格：Crockford

## 规则细节

这条规则强制执行一致的缩进风格。默认风格是 `4 spaces`。

## 选项

This rule has a mixed option:

For example, for 2-space indentation:

```json
{
    "indent": ["error", 2]
}
```

Or for tabbed indentation:

```json
{
    "indent": ["error", "tab"]
}
```

使用此规则与默认选项的**错误**示例：

::: incorrect

```js
/*eslint indent: "error"*/

if (a) {
  b=c;
  function foo(d) {
    e=f;
  }
}
```

:::

使用此规则与默认选项的**正确**示例：

::: correct

```js
/*eslint indent: "error"*/

if (a) {
    b=c;
    function foo(d) {
        e=f;
    }
}
```

:::

此规则选项为对象：

* `"ignoredNodes"`可以用来禁用任何 AST 节点的缩进检查。它接受[选择器](/docs/developer-guide/selectors)数组。如果一个 AST 节点被任何一个选择器匹配，作为该节点的直接子节点的缩进将被忽略。如果你不同意它对某一特定句法模式的缩进，这可以作为放宽规则的跳板。
* `"SwitchCase"`（默认为 0) 对 `switch` 语句中的 `case` 子句执行缩进。
* `"VariableDeclarator"`（默认为 1) 对 `var` 声明者执行缩进级别；也可以采用一个对象来定义 `var`、`let` 和 `const` 声明的单独规则。它也可以是 `"first"`，表示所有的声明者应该与第一个声明者对齐。
* `"outerIIFEBody"`（默认为 1）强制执行文件级 IIFE 的缩进级别。这也可以设置为 `"off"`，以禁止对文件级 IIFEs 的检查。
* `"MemberExpression"`（默认为 1) 强制执行多行属性链的缩进级别。这也可以被设置为 `"off"`，以禁止检查 MemberExpression 的缩进。
* `"FunctionDeclaration"` 需要一个对象来定义函数声明的规则。
    * `parameters`（默认为 1) 强制执行函数声明中参数的缩进程度。这可以是一个表示缩进程度的数字，也可以是字符串 `"first"` 表示声明中的所有参数必须与第一个参数对齐。这也可以设置为 `"off"`，以禁止检查 FunctionDeclaration 的参数。
    * `body`（默认为 1) 强制执行函数声明主体的缩进级别。
* `"FunctionExpression"` 需要一个对象来定义函数表达式的规则。
    * `parameters`（默认为 1) 强制执行函数表达式中参数的缩进级别。这可以是一个表示缩进程度的数字，也可以是字符串`"first"`表示表达式的所有参数必须与第一个参数对齐。这也可以设置为 `"off"`，以禁止检查 FunctionExpression 的参数。
    * `body`（默认为 1）强制执行函数表达式主体的缩进级别。
* `"StaticBlock"`需要一个对象来定义类静态块的规则。
    * `body`（默认为 1) 为类静态块的主体执行缩进级别。
* `"CallExpression"`需要一个对象来定义函数调用表达式的规则。
    * `arguments`（默认为 1) 强制执行调用表达式中参数的缩进级别。这可以是一个表示缩进程度的数字，也可以是字符串`"first"` 表示表达式的所有参数必须与第一个参数对齐。这也可以设置为 `"off"` 来禁止对 CallExpression 参数的检查。
* `"ArrayExpression"`（默认为 1) 强制执行数组中元素的缩进级别。它也可以被设置为字符串 `"first"`，表示数组中的所有元素都应该与第一个元素对齐。也可以设置为 `"off"` 来禁止对数组元素的检查。
* `"ObjectExpression"`（默认为 1) 强制执行对象中的属性缩进级别。它可以被设置为字符串 `"first"`，表示对象中的所有属性都应该与第一个属性对齐。这也可以设置为 `"off"`，以禁止检查对象的属性。
* `"ImportDeclaration"`（默认为 1) 强制执行导入语句的缩进水平。它可以被设置为字符串 `"first"`，表示所有从一个模块导入的成员应该与列表中的第一个成员对齐。这也可以设置为 `"off"`，以禁止对导入的模块成员进行检查。
* `"flatTernaryExpressions": true`（默认为 `false`) 要求嵌套在其他三元表达式中的三元表达式不缩进。
* `"offsetTernaryExpressions": true`（默认为 `false`) 要求对三元表达式的值进行缩进。
* `"ignoreComments"`（默认为 `false`）可以在注释不需要与前一行或下一行的节点对齐时使用。

缩进程度表示指定缩进的倍数。示例：

* `VariableDeclarator` 设置为 `2` 时，缩进 4 个空格，多行变量声明将缩进 8 个空格。
* `VariableDeclarator` 设置为 `2` 时，缩进 2 个空格，多行变量声明将缩进 4 个空格。
* `VariableDeclarator` 设置为 `{"var": 2, "let": 2, "const": 3}`时，缩进 2 个空格，在多行变量声明中 `var` 和 `let` 缩进 4 个空格，`const` 语句缩进 6 个空格。
* `VariableDeclarator` 设置为 `2` 时，缩进制表符，使多行变量声明缩进 2 个制表符。
* `SwitchCase` 设置为 `0` 时，缩进 2 个空格，`switch` 中的 `case` 不缩进。
* `SwitchCase` 设置为 `1` 时，缩进 2 个空格，`switch` 中的 `case` 语句缩进 2 个空格。
* `SwitchCase` 设置为 `2` 时，缩进 2 个空格，`switch` 中的 `case` 语句缩进 4 个空格。
* `SwitchCase` 设置为 `2` 时，句缩进 2 个制表符，`switch` 中的 `case` 语句缩进 2 个制表符。
* `MemberExpression` 设置为 `0` 时，缩进 2 个空格，多行属性链的缩进为 0 个空格。
* `MemberExpression` 设置为 `1` 时，缩进 2 个空格，多行属性链缩进 2 个空格。
* `MemberExpression` 设置为 `2` 时，缩进 2 个空格，多行属性链缩进 4 个空格。
* `MemberExpression` 设置为 `0` 时，缩进 4 个空格，多行属性链缩进 0 个空格。
* `MemberExpression` 设置为 `1` 时，缩进 4 个空格，多行属性链缩进 4 个空格。
* `MemberExpression` 设置为 `2` 时，缩进 4 个空格，多行属性链缩进 8 个空格。

### tab

使用此规则与 `"tab"` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", "tab"]*/

if (a) {
     b=c;
function foo(d) {
           e=f;
 }
}
```

:::

使用此规则与 `"tab"` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", "tab"]*/

if (a) {
/*tab*/b=c;
/*tab*/function foo(d) {
/*tab*//*tab*/e=f;
/*tab*/}
}
```

:::

### ignoredNodes

下面的配置忽略了`条件表达式`（"三元表达式"）节点的缩进。

使用此规则与 `4, { "ignoredNodes": ["ConditionalExpression"] }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 4, { "ignoredNodes": ["ConditionalExpression"] }]*/

var a = foo
      ? bar
      : baz;

var a = foo
                ? bar
: baz;
```

:::

以下配置忽略了 IIFEs 正文中的缩进。

使用此规则与 `4, { "ignoredNodes": ["CallExpression > FunctionExpression.callee > BlockStatement.body"] }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 4, { "ignoredNodes": ["CallExpression > FunctionExpression.callee > BlockStatement.body"] }]*/

(function() {

foo();
bar();

})
```

:::

所有的 AST 节点类型都可以在 [ESTree](https://github.com/estree/estree) 规范中找到。你可以使用 [AST Explorer](https://astexplorer.net/) 和 espree 解析器来检查代码片断的 AST 树。

### SwitchCase

使用此规则与 `2, { "SwitchCase": 1 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/

switch(a){
case "a":
    break;
case "b":
    break;
}
```

:::

使用此规则与 `2, { "SwitchCase": 1 }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/

switch(a){
  case "a":
    break;
  case "b":
    break;
}
```

:::

### VariableDeclarator

使用此规则与 `2, { "VariableDeclarator": 1 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": 1 }]*/
/*eslint-env es6*/

var a,
    b,
    c;
let a,
    b,
    c;
const a = 1,
    b = 2,
    c = 3;
```

:::

使用此规则与 `2, { "VariableDeclarator": 1 }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": 1 }]*/
/*eslint-env es6*/

var a,
  b,
  c;
let a,
  b,
  c;
const a = 1,
  b = 2,
  c = 3;
```

:::

使用此规则与 `2, { "VariableDeclarator": 2 }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": 2 }]*/
/*eslint-env es6*/

var a,
    b,
    c;
let a,
    b,
    c;
const a = 1,
    b = 2,
    c = 3;
```

:::

使用此规则与 `2, { "VariableDeclarator": "first" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": "first" }]*/
/*eslint-env es6*/

var a,
  b,
  c;
let a,
  b,
  c;
const a = 1,
  b = 2,
  c = 3;
```

:::

使用此规则与 `2, { "VariableDeclarator": "first" }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": "first" }]*/
/*eslint-env es6*/

var a,
    b,
    c;
let a,
    b,
    c;
const a = 1,
      b = 2,
      c = 3;
```

:::

使用此规则与 `2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }]*/
/*eslint-env es6*/

var a,
    b,
    c;
let a,
    b,
    c;
const a = 1,
      b = 2,
      c = 3;
```

:::

### outerIIFEBody

使用此规则和 `2, { "outerIIFEBody": 0 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "outerIIFEBody": 0 }]*/

(function() {

  function foo(x) {
    return x + 1;
  }

})();

if (y) {
console.log('foo');
}
```

:::

使用此规则和 `2, { "outerIIFEBody": 0 }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "outerIIFEBody": 0 }]*/

(function() {

function foo(x) {
  return x + 1;
}

})();

if (y) {
   console.log('foo');
}
```

:::

使用此规则和 `2, { "outerIIFEBody":  "off" }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "outerIIFEBody": "off" }]*/

(function() {

function foo(x) {
  return x + 1;
}

})();

(function() {

  function foo(x) {
    return x + 1;
  }

})();

if (y) {
  console.log('foo');
}
```

:::

### MemberExpression

使用此规则与 `2, { "MemberExpression": 1 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "MemberExpression": 1 }]*/

foo
.bar
.baz()
```

:::

使用此规则与 `2, { "MemberExpression": 1 }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "MemberExpression": 1 }]*/

foo
  .bar
  .baz();
```

:::

### FunctionDeclaration

使用此规则与 `2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }]*/

function foo(bar,
  baz,
  qux) {
    qux();
}
```

:::

使用此规则与 `2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }]*/

function foo(bar,
    baz,
    qux) {
  qux();
}
```

:::

使用此规则与 `2, { "FunctionDeclaration": {"parameters": "first"} }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, {"FunctionDeclaration": {"parameters": "first"}}]*/

function foo(bar, baz,
  qux, boop) {
  qux();
}
```

:::

使用此规则与 `2, { "FunctionDeclaration": {"parameters": "first"} }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, {"FunctionDeclaration": {"parameters": "first"}}]*/

function foo(bar, baz,
             qux, boop) {
  qux();
}
```

:::

### FunctionExpression

使用此规则与 `2, { "FunctionExpression": {"body": 1, "parameters": 2} }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "FunctionExpression": {"body": 1, "parameters": 2} }]*/

var foo = function(bar,
  baz,
  qux) {
    qux();
}
```

:::

使用此规则与 `2, { "FunctionExpression": {"body": 1, "parameters": 2} }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "FunctionExpression": {"body": 1, "parameters": 2} }]*/

var foo = function(bar,
    baz,
    qux) {
  qux();
}
```

:::

使用此规则与 `2, { "FunctionExpression": {"parameters": "first"} }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, {"FunctionExpression": {"parameters": "first"}}]*/

var foo = function(bar, baz,
  qux, boop) {
  qux();
}
```

:::

使用此规则与 `2, { "FunctionExpression": {"parameters": "first"} }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, {"FunctionExpression": {"parameters": "first"}}]*/

var foo = function(bar, baz,
                   qux, boop) {
  qux();
}
```

:::

### StaticBlock

使用此规则与 `2, { "StaticBlock": {"body": 1} }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "StaticBlock": {"body": 1} }]*/

class C {
  static {
      foo();
  }
}
```

:::

使用此规则与 `2, { "StaticBlock": {"body": 1} }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "StaticBlock": {"body": 1} }]*/

class C {
  static {
    foo();
  }
}
```

:::

使用此规则与 `2, { "StaticBlock": {"body": 2} }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "StaticBlock": {"body": 2} }]*/

class C {
  static {
    foo();
  }
}
```

:::

使用此规则与 `2, { "StaticBlock": {"body": 2} }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "StaticBlock": {"body": 2} }]*/

class C {
  static {
      foo();
  }
}
```

:::

### CallExpression

使用此规则与 `2, { "CallExpression": {"arguments": 1} }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "CallExpression": {"arguments": 1} }]*/

foo(bar,
    baz,
      qux
);
```

:::

使用此规则与 `2, { "CallExpression": {"arguments": 1} }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "CallExpression": {"arguments": 1} }]*/

foo(bar,
  baz,
  qux
);
```

:::

使用此规则与 `2, { "CallExpression": {"arguments": "first"} }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, {"CallExpression": {"arguments": "first"}}]*/

foo(bar, baz,
  baz, boop, beep);
```

:::

使用此规则与 `2, { "CallExpression": {"arguments": "first"} }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, {"CallExpression": {"arguments": "first"}}]*/

foo(bar, baz,
    baz, boop, beep);
```

:::

### ArrayExpression

使用此规则与 `2, { "ArrayExpression": 1 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "ArrayExpression": 1 }]*/

var foo = [
    bar,
baz,
      qux
];
```

:::

使用此规则与 `2, { "ArrayExpression": 1 }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "ArrayExpression": 1 }]*/

var foo = [
  bar,
  baz,
  qux
];
```

:::

使用此规则与 `2, { "ArrayExpression": "first" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, {"ArrayExpression": "first"}]*/

var foo = [bar,
  baz,
  qux
];
```

:::

使用此规则与 `2, { "ArrayExpression": "first" }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, {"ArrayExpression": "first"}]*/

var foo = [bar,
           baz,
           qux
];
```

:::

### ObjectExpression

使用此规则与 `2, { "ObjectExpression": 1 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "ObjectExpression": 1 }]*/

var foo = {
    bar: 1,
baz: 2,
      qux: 3
};
```

:::

使用此规则与 `2, { "ObjectExpression": 1 }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "ObjectExpression": 1 }]*/

var foo = {
  bar: 1,
  baz: 2,
  qux: 3
};
```

:::

使用此规则与 `2, { "ObjectExpression": "first" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, {"ObjectExpression": "first"}]*/

var foo = { bar: 1,
  baz: 2 };
```

:::

使用此规则与 `2, { "ObjectExpression": "first" }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, {"ObjectExpression": "first"}]*/

var foo = { bar: 1,
            baz: 2 };
```

:::

### ImportDeclaration

Examples of **correct** code for this rule with `4, { "ImportDeclaration": 1 }` 选项 (the default):

::: correct

```js
/*eslint indent: ["error", 4, { "ImportDeclaration": 1 }]*/

import { foo,
    bar,
    baz,
} from 'qux';

import {
    foo,
    bar,
    baz,
} from 'qux';
```

:::

使用此规则与 `4, { "ImportDeclaration": "first" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 4, { "ImportDeclaration": "first" }]*/

import { foo,
    bar,
    baz,
} from 'qux';
```

:::

使用此规则与 `4, { "ImportDeclaration": "first" }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 4, { "ImportDeclaration": "first" }]*/

import { foo,
         bar,
         baz,
} from 'qux';
```

:::

### flatTernaryExpressions

使用此规则与默认的 `4, { "flatTernaryExpressions": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": false }]*/

var a =
    foo ? bar :
    baz ? qux :
    boop;
```

:::

使用此规则与默认的 `4, { "flatTernaryExpressions": false }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": false }]*/

var a =
    foo ? bar :
        baz ? qux :
            boop;
```

:::

使用此规则与 `4, { "flatTernaryExpressions": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": true }]*/

var a =
    foo ? bar :
        baz ? qux :
            boop;
```

:::

使用此规则与 `4, { "flatTernaryExpressions": true }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": true }]*/

var a =
    foo ? bar :
    baz ? qux :
    boop;
```

:::

### offsetTernaryExpressions

使用此规则与默认的 `2, { "offsetTernaryExpressions": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": false }]*/

condition
  ? () => {
      return true
    }
  : () => {
      false
    }
```

:::

使用此规则与默认的 `2, { "offsetTernaryExpressions": false }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": false }]*/

condition
  ? () => {
    return true
  }
  : condition2
    ? () => {
      return true
    }
    : () => {
      return false
    }
```

:::

使用此规则与 `2, { "offsetTernaryExpressions": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": true }]*/

condition
  ? () => {
    return true
  }
  : condition2
    ? () => {
      return true
    }
    : () => {
      return false
    }
```

:::

使用此规则与 `2, { "offsetTernaryExpressions": true }` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": true }]*/

condition
  ? () => {
      return true
    }
  : condition2
    ? () => {
        return true
      }
    : () => {
        return false
      }
```

:::

### ignoreComments

该规则的额外**正确**代码的例子有：`4, { "ignoreComments": true }` 选项。

::: correct

```js
/*eslint indent: ["error", 4, { "ignoreComments": true }] */

if (foo) {
    doSomething();

// comment intentionally de-indented
    doSomethingElse();
}
```

:::

## 兼容

* **JSHint**：`indent`
* **JSCS**：[validateIndentation](https://jscs-dev.github.io/rule/validateIndentation)
