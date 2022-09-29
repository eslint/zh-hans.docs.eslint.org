---
title: comma-style
layout: doc
rule_type: layout
related_rules:
- operator-linebreak
further_reading:
- https://gist.github.com/isaacs/357981
---

逗号样式规则强制执行逗号分隔的列表的样式。有两种主要用于 JavaScript 的逗号样式。

* 标准样式，即逗号被放在当前行的末尾
* 逗号优先风格，在这种风格中，逗号被放置在下一行的开始

使用“逗号优先”样式的理由之一：它可以帮助跟踪缺失和尾随的逗号。这些都是有问题的，因为变量声明中逗号缺失可能导致全局变量泄漏，而尾随逗号可能导致老版本 IE 的错误。

## 规则细节

这条规则在数组字面、对象字面和变量声明中执行了一致的逗号风格。

此规则不适用于以下情况：

* 逗号前面和后面有换行符（单独的逗号）
* 单行数组字样、对象字样和变量声明

## 选项

此规则选项为字符串：

* `"last"`（默认值）要求在数组元素、对象属性或变量声明之后并在同一行中使用逗号。
* `"first"` 要求在数组元素、对象属性或变量声明之前和同一行中使用逗号。

这个规则也接受一个额外的 `exceptions` 对象:

* `"exceptions"` 有一些属性，其名称与 JavaScript 代码的抽象语法树（AST）中的节点类型相对应：

    * `"ArrayExpression": true` 忽略数组字面上的逗号风格
    * `"ArrayPattern": true` 忽略去结构化的数组模式中的逗号风格
    * `"ArrowFunctionExpression": true` 忽略箭头函数表达式参数中的逗号样式
    * `"CallExpression": true` 忽略函数调用参数中的逗号样式
    * `"FunctionDeclaration": true`在函数声明的参数中忽略逗号风格
    * `"FunctionExpression": true` 忽略函数表达式参数中的逗号样式
    * `"ImportDeclaration": true` 忽略导入声明中的逗号风格
    * `"ObjectExpression": true` 忽略对象文字中的逗号风格。
    * `"ObjectPattern": true` 忽略去结构化的对象模式中的逗号风格
    * `"VariableDeclaration": true` 忽略变量声明中的逗号风格
    * `"NewExpression": true` 忽略构造函数表达式参数中的逗号风格

确定 [ESTree](https://github.com/estree/estree) 所定义的节点类型的方法是使用 [AST Explorer](https://astexplorer.net/) 与 espree 解析器。

### last

使用此规则与默认的 `"last"` 选项的**错误**示例：

:::incorrect

```js
/*eslint comma-style: ["error", "last"]*/

var foo = 1
,
bar = 2;

var foo = 1
  , bar = 2;

var foo = ["apples"
           , "oranges"];

function bar() {
    return {
        "a": 1
        ,"b:": 2
    };
}
```

:::

使用此规则与默认的 `"last"` 选项的**正确**示例：

:::correct

```js
/*eslint comma-style: ["error", "last"]*/

var foo = 1, bar = 2;

var foo = 1,
    bar = 2;

var foo = ["apples",
           "oranges"];

function bar() {
    return {
        "a": 1,
        "b:": 2
    };
}
```

:::

### first

使用此规则与 `"first"` 选项的**错误**示例：

:::incorrect

```js
/*eslint comma-style: ["error", "first"]*/

var foo = 1,
    bar = 2;

var foo = ["apples",
           "oranges"];

function bar() {
    return {
        "a": 1,
        "b:": 2
    };
}
```

:::

使用此规则与 `"first"` 选项的**正确**示例：

:::correct

```js
/*eslint comma-style: ["error", "first"]*/

var foo = 1, bar = 2;

var foo = 1
    ,bar = 2;

var foo = ["apples"
          ,"oranges"];

function bar() {
    return {
        "a": 1
        ,"b:": 2
    };
}
```

:::

### exceptions

一个用例是**只**在 var 语句中强制执行逗号风格。

使用此规则与演示的 `"first", { "exceptions": { … } }` 选项的**错误**示例：

:::incorrect

```js
/*eslint comma-style: ["error", "first", { "exceptions": { "ArrayExpression": true, "ObjectExpression": true } }]*/

var o = {},
    a = [];
```

:::

使用此规则与演示的 `"first", { "exceptions": { … } }` 选项的**正确**示例：

:::correct

```js
/*eslint comma-style: ["error", "first", { "exceptions": { "ArrayExpression": true, "ObjectExpression": true } }]*/

var o = {fst:1,
         snd: [1,
               2]}
  , a = [];
```

:::

## 何时不用

如果你的项目不关心逗号风格是否一致，可以安全地关闭这一规则。
