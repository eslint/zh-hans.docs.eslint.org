---
title: padding-line-between-statements
layout: doc
rule_type: layout
---

这条规则要求或不允许在给定的 2 种语句之间有空行。
适当的空行有助于开发人员理解代码。

例如，下面的配置要求在变量声明和 `return` 语句之间有一个空行。

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "var", next: "return" }
]*/

function foo() {
    var a = 1;

    return a;
}
```

## 规则细节

如果没有提供配置，该规则不做任何事情。

一个配置是一个对象，它有 3 个属性；`blankLine`、`prev` 和 `next`。例如 `{ blankLine: "always", prev: "var", next: "return" }` 意味着“在变量声明和 `return` 语句之间需要一个或多个空行”。
你可以提供任何数量的配置。如果一个语句对匹配多个配置，将使用最后匹配的配置。

```json
{
    "padding-line-between-statements": [
        "error",
        { "blankLine": LINEBREAK_TYPE, "prev": STATEMENT_TYPE, "next": STATEMENT_TYPE },
        ...
    ]
}
```

* `LINEBREAK_TYPE` 是以下的一种。
    * `"any"` 只是忽略了语句对。
    * `"never"` 不允许有空行。
    * `"always"`需要一个或多个空行。注意它不把存在注释的行算作空行。

* `STATEMENT_TYPE` 是下列之一，或者是下列的一个数组。
    * `"*"` 是通配符。这可以匹配任何语句。
    * `"block"` 是孤独的块。
    * `"block-like"` 是类似于 block 的语句。匹配最后一个符号是块的收尾括号的语句；例如：`{ }`、`if (a) { }`和`while (a) { }`。也可以匹配立即调用的函数表达式语句。
    * `"break"` 是 `break` 的语句。
    * `"case"` 是 `switch` 语句中的 `case` 子句。
    * `"cjs-export"` 是 CommonJS 的 `export` 语句；例如，`module.exports = 0`、`module.exports.foo = 1` 和 `exports.foo = 2`。这是赋值的一种特殊情况。
    * `"cjs-import"` 是 CommonJS 的 `import` 语句；例如，`const foo = require("foo")`。这是变量声明的一种特殊情况。
    * `"class"` 是 `class` 声明。
    * `"const"` 是 `const` 变量的声明，包括单行和多行。
    * `"continue"` 是 `continue` 语句。
    * `"debugger"` 是 `debugger` 语句。
    * `"default"` 是 `switch`中的 `default` 条款 语句。
    * `"directive"` 是指令性声明。这与指令相匹配；例如， `"use strict"`。
    * `"do"` 是 `do-while` 语句。这匹配所有第一个标记是 `do` 关键字的语句。
    * `"empty"` 是空语句。
    * `"export"` 是 `export` 声明。
    * `"expression"` 是表达式语句。
    * `"for"` 是 `for` 循环。这匹配所有第一个标记是 `for` 关键字的语句。
    * `"function"` 是函数声明。
    * `"if"` 是 `if` 语句。
    * `"iife"` 是立即调用的函数表达式语句。这与对函数表达式的调用相匹配，可以选择以单数运算符为前缀。
    * `"import"` 是 `import` 声明。
    * `"let"` 是 `let` 变量声明，包括单行和多行。
    * `"multilin-block-like"` 是类似于块的语句。这与`block-like` 类型相同，但只有当块是多行的时候。
    * `"multiline-const"` 是多行 `const` 变量声明。
    * `"multiline-expression"` 是表达式语句。这与 `expression` 类型相同，但只有当语句是多行的时候。
    * `"multiline-let"` 是多行`let` 变量声明。
    * `"multiline-var"` 是多行的 `var` 变量声明。
    * `"return"` 是 `return` 语句。
    * `"singleline-const"` 是单行的 `const` 变量声明。
    * `"singleline-let"` 是单行的 `let`变量声明。
    * `"singleline-var"` 是单行的 `var` 变量声明。
    * `"switch"` 是 `switch` 语句。
    * `"throw"` 是 `throw` 语句。
    * `"try"` 是 `try` 语句。
    * `"var"` 是 `var` 变量声明，包括单行和多行。
    * `"while"` 是 `while` 循环语句。
    * `"with"` 是 `with` 语句。

## 示例

这种配置需要在所有的 `return` 语句前留出空行，就像 [newline-before-return](newline-before-return) 规则。

使用此规则与 `[{ blankLine: "always", prev: "*", next: "return" }]` 配置的**错误**示例：

::: incorrect

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "*", next: "return" }
]*/

function foo() {
    bar();
    return;
}
```

:::

使用此规则与 `[{ blankLine: "always", prev: "*", next: "return" }]` 配置的**正确**示例：

::: correct

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "*", next: "return" }
]*/

function foo() {
    bar();

    return;
}

function foo() {
    return;
}
```

:::

----

这种配置将要求在每一个变量声明序列之后都有空行，就像 [newline-after-var](newline-after-var) 规则一样。

使用此规则与 `[{ blankLine: "always", prev: ["const", "let", "var"], next: "*"}, { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]}]` 配置的**错误**示例：

::: incorrect

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
    { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"]}
]*/

function foo() {
    var a = 0;
    bar();
}

function foo() {
    let a = 0;
    bar();
}

function foo() {
    const a = 0;
    bar();
}

class C {
    static {
        let a = 0;
        bar();
    }
}
```

:::

使用此规则与 `[{ blankLine: "always", prev: ["const", "let", "var"], next: "*"}, { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]}]` 配置的**正确**示例：

::: correct

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
    { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"]}
]*/

function foo() {
    var a = 0;
    var b = 0;

    bar();
}

function foo() {
    let a = 0;
    const b = 0;

    bar();
}

function foo() {
    const a = 0;
    const b = 0;

    bar();
}

class C {
    static {
        let a = 0;
        let b = 0;

        bar();
    }
}
```

:::

----

这种配置会要求在所有指令序言后有空行，就像 [lines-around-directive](lines-around-directive) 规则。

使用此规则与 `[{ blankLine: "always", prev: "directive", next: "*" }, { blankLine: "any", prev: "directive", next: "directive" }]` 配置的**错误**示例：

::: incorrect

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "directive", next: "*" },
    { blankLine: "any",    prev: "directive", next: "directive" }
]*/

"use strict";
foo();
```

:::

使用此规则与 `[{ blankLine: "always", prev: "directive", next: "*" }, { blankLine: "any", prev: "directive", next: "directive" }]` 配置的**正确**示例：

::: correct

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "directive", next: "*" },
    { blankLine: "any",    prev: "directive", next: "directive" }
]*/

"use strict";
"use asm";

foo();
```

:::

----

这种配置需要在`switch` 语句中的子句之间设置空行。

使用此规则与 `[{ blankLine: "always", prev: ["case", "default"], next: "*" }]` 配置的**错误**示例：

::: incorrect

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["case", "default"], next: "*" }
]*/

switch (foo) {
    case 1:
        bar();
        break;
    case 2:
    case 3:
        baz();
        break;
    default:
        quux();
}
```

:::

使用此规则与 `[{ blankLine: "always", prev: ["case", "default"], next: "*" }]` 配置的**正确**示例：

::: correct

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["case", "default"], next: "*" }
]*/

switch (foo) {
    case 1:
        bar();
        break;

    case 2:

    case 3:
        baz();
        break;

    default:
        quux();
}
```

:::

## 何时不用

如果你不关心换行警告，你可以安全地禁用此规则。

## 兼容

* **JSCS**：[requirePaddingNewLineAfterVariableDeclaration](https://jscs-dev.github.io/rule/requirePaddingNewLineAfterVariableDeclaration)
* **JSCS**：[requirePaddingNewLinesAfterBlocks](https://jscs-dev.github.io/rule/requirePaddingNewLinesAfterBlocks)
* **JSCS**：[disallowPaddingNewLinesAfterBlocks](https://jscs-dev.github.io/rule/disallowPaddingNewLinesAfterBlocks)
* **JSCS**：[requirePaddingNewLinesAfterUseStrict](https://jscs-dev.github.io/rule/requirePaddingNewLinesAfterUseStrict)
* **JSCS**：[disallowPaddingNewLinesAfterUseStrict](https://jscs-dev.github.io/rule/disallowPaddingNewLinesAfterUseStrict)
* **JSCS**：[requirePaddingNewLinesBeforeExport](https://jscs-dev.github.io/rule/requirePaddingNewLinesBeforeExport)
* **JSCS**：[disallowPaddingNewLinesBeforeExport](https://jscs-dev.github.io/rule/disallowPaddingNewLinesBeforeExport)
* **JSCS**：[requirePaddingNewlinesBeforeKeywords](https://jscs-dev.github.io/rule/requirePaddingNewlinesBeforeKeywords)
* **JSCS**：[disallowPaddingNewlinesBeforeKeywords](https://jscs-dev.github.io/rule/disallowPaddingNewlinesBeforeKeywords)
