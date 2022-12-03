---
title: no-var
layout: doc
rule_type: suggestion
---

ECMAScript 6 允许程序员使用 `let` 和 `const` 关键字在块范围内创建变量而不是函数范围。块范围在许多其他编程语言中很常见，可以帮助程序员避免以下错误，例如：

```js
var count = people.length;
var enoughFood = count > sandwiches.length;

if (enoughFood) {
    var count = sandwiches.length; // accidentally overriding the count variable
    console.log("We have " + count + " sandwiches for everyone. Plenty for all!");
}

// our count variable is no longer accurate
console.log("We have " + count + " people and " + sandwiches.length + " sandwiches!");
```

## 规则细节

这条规则的目的是不鼓励使用 `var`，鼓励使用 `const` 或 `let` 代替。

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-var: "error"*/

var x = "y";
var CONFIG = {};
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-var: "error"*/
/*eslint-env es6*/

let x = "y";
const CONFIG = {};
```

:::

## 何时不用

除了非 ES6 环境外，现有的 JavaScript 项目如果开始切换到 ES6 时，如果从 `var` 迁移到 `let` 的成本太高，可能不想应用这个规则。
