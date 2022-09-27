---
title: indent-legacy
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/indent-legacy.md
rule_type: layout
---

此规则在 ESLint v4.0.0 中被**废弃**。

ESLint 4.0.0 引入了重写 [`indent`](/docs/rules/indent) 规则，现在它比以前的版本报告更多的错误。为了简化迁移到 4.0.0 的过程，`indent-legacy` 规则是作为 ESLint 3.x 的 `indent` 规则的快照而引入的。最终，你应该切换回 `indent` 规则，以便在未来的版本中获得错误修复和改进。

---

有几个常见的准则要求嵌套块和语句的具体缩进，如：

```js
function hello(indentSize, type) {
    if (indentSize === 4 && type !== 'tab') {
        console.log('Each next indentation will increase on 4 spaces');
    }
}
```

这些是不同风格指南中推荐的最常见的情况：

* 两个空格，非制表符：Google, npm, Node.js, Idiomatic, Felix
* 制表符：jQuery
* 四个空格：Crockford

## 规则细节

这条规则强制执行一致的缩进风格。默认风格是 `4 spaces`。

## 选项

这个规则有一个混合选项：

例如 2 个空格缩进：

```json
{
    "indent": ["error", 2]
}
```

或用于 Tab 式缩进：

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

* `"SwitchCase"`（默认为 0) 为 `switch` 中的 `case` 子句执行缩进。
* `"VariableDeclarator"`（默认：1) 对 `var` 声明者执行缩进级别；也可以使用一个对象来定义 `var`、`let` 和 `const` 声明的单独规则。
* `"outerIIFEBody"`（默认为 1) 为文件级 IIFE 执行缩进级别。
* `"MemberExpression"`（默认为关闭）对多行属性链执行缩进级别（变量声明和赋值除外）
* `"FunctionDeclaration"` 需要一个对象来定义函数声明的规则。
    * `parameters`（默认为关闭）对函数声明中的参数执行缩进级别。这可以是一个表示缩进程度的数字，也可以是字符串 "first"，表示声明中的所有参数必须与第一个参数对齐。
    * `body`（默认为 1) 强制执行函数声明正文的缩进级别。
* `"FunctionExpression"` 需要一个对象来定义函数表达式的规则。
    * `parameters`（默认为关闭） 对函数表达式中的参数执行缩进级别。这可以是一个表示缩进程度的数字，也可以是字符串  `"first"`，表示表达式的所有参数必须与第一个参数对齐。
    * `body`（默认为 1）强制执行函数表达式主体的缩进级别。
* `"CallExpression"` 需要一个对象来定义函数调用表达式的规则。
    * `arguments`（默认为关闭）对调用表达式中的参数执行缩进级别。这可以是一个表示缩进程度的数字，或者是字符串 `"first"` 表示表达式的所有参数必须与第一个参数对齐。
* `"ArrayExpression"`（默认为 1）对数组中的元素执行缩进级别。它也可以被设置为字符串 `"first"`，表示数组中的所有元素都应该与第一个元素对齐。
* `"ObjectExpression"`（默认为 1) 强制执行对象中的属性的缩进级别。它可以被设置为字符串 `"first"`，表示对象中的所有属性都应该与第一个属性对齐。

缩进程度表示指定缩进的倍数。比如：

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

if(y) {
console.log('foo');
}
```

:::

使用此规则和 `2, {"outerIIFEBody": 0}` 选项的**正确**示例：

::: correct

```js
/*eslint indent: ["error", 2, { "outerIIFEBody": 0 }]*/

(function() {

function foo(x) {
  return x + 1;
}

})();

if(y) {
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

// Any indentation is permitted in variable declarations and assignments.
var bip = aardvark.badger
                  .coyote;
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

## 兼容

* **JSHint**：`indent`
* **JSCS**：[validateIndentation](https://jscs-dev.github.io/rule/validateIndentation)
