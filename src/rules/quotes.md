---
title: quotes
layout: doc
rule_type: layout
---

JavaScript 允许你用三种方式之一来定义字符串：双引号、单引号和反斜线（从 ECMAScript 6 开始）。比如：

```js
/*eslint-env es6*/

var double = "double";
var single = 'single';
var backtick = `backtick`;    // ES6 only
```

每一行都会创建一个字符串，在某些情况下，可以互换使用。在代码库中选择如何定义字符串是模板字面以外的一种风格（它允许对表达式的嵌入进行解释）。

许多代码库要求以一种一致的方式定义字符串。

## 规则细节

这条规则强制要求统一使用反斜线、双引号或单引号。

## 选项

这个规则有两个选项，一个字符串选项和一个对象选项：

字符串选项：

* `"double"`（默认值）要求尽可能使用双引号。
* `"single"` 要求尽可能使用单引号。
* `"backtick"` 要求尽可能使用反斜线。

对象选项：

* `"avoidEscape": true` 允许字符串使用单引号或双引号，只要该字符串包含一个必须转义的引号即可
* `"allowTemplateLiterals": true` 允许字符串使用反符号

**已废弃**：对象属性 `avoid-escape` 已被废弃；请使用对象属性 `avoidEscape` 代替。

### double

使用此规则与默认的 `"double"` 选项的**错误**示例：

::: incorrect

```js
/*eslint quotes: ["error", "double"]*/

var single = 'single';
var unescaped = 'a string containing "double" quotes';
var backtick = `back\ntick`; // you can use \n in single or double quoted strings
```

:::

使用此规则与默认的 `"double"` 选项的**正确**示例：

::: correct

```js
/*eslint quotes: ["error", "double"]*/
/*eslint-env es6*/

var double = "double";
var backtick = `back
tick`;  // backticks are allowed due to newline
var backtick = tag`backtick`; // backticks are allowed due to tag
```

:::

### single

使用此规则与 `"single"` 选项的**错误**示例：

::: incorrect

```js
/*eslint quotes: ["error", "single"]*/

var double = "double";
var unescaped = "a string containing 'single' quotes";
```

:::

使用此规则与 `"single"` 选项的**正确**示例：

::: correct

```js
/*eslint quotes: ["error", "single"]*/
/*eslint-env es6*/

var single = 'single';
var backtick = `back${x}tick`; // backticks are allowed due to substitution
```

:::

### backticks

使用此规则与 `"backtick"` 选项的**错误**示例：

::: incorrect

```js
/*eslint quotes: ["error", "backtick"]*/

var single = 'single';
var double = "double";
var unescaped = 'a string containing `backticks`';
```

:::

使用此规则与 `"backtick"` 选项的**正确**示例：

::: correct

```js
/*eslint quotes: ["error", "backtick"]*/
/*eslint-env es6*/

var backtick = `backtick`;
```

:::

### avoidEscape

使用此规则与 `"double", { "avoidEscape": true }` 的额外**正确**示例：
::: correct

```js
/*eslint quotes: ["error", "double", { "avoidEscape": true }]*/

var single = 'a string containing "double" quotes';
```

:::

使用此规则与 `"single", { "avoidEscape": true }` 的额外**正确**示例：

::: correct

```js
/*eslint quotes: ["error", "single", { "avoidEscape": true }]*/

var double = "a string containing 'single' quotes";
```

:::

使用此规则与 `"backtick", { "avoidEscape": true }` 的额外**正确**示例：

::: correct

```js
/*eslint quotes: ["error", "backtick", { "avoidEscape": true }]*/

var double = "a string containing `backtick` quotes"
```

:::

### allowTemplateLiterals

使用此规则与 `"double", { "allowTemplateLiterals": true }` 的额外**正确**示例：

::: correct

```js
/*eslint quotes: ["error", "double", { "allowTemplateLiterals": true }]*/

var double = "double";
var double = `double`;
```

:::

使用此规则与 `"single", { "allowTemplateLiterals": true }` 的额外**正确**示例：

::: correct

```js
/*eslint quotes: ["error", "single", { "allowTemplateLiterals": true }]*/

var single = 'single';
var single = `single`;
```

:::

`{ "allowTemplateLiterals": false }` 不会禁止使用所有模板字面量。如果你想禁止模板字面量的任何实例，请使用 [no-restricted-syntax](no-restricted-syntax) 并针对 `TemplateLiteral` 选择器。

## 何时不用

如果你不需要你的字符串样式的一致性，你可以安全地停用这个规则。
