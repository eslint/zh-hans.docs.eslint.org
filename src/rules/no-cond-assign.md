---
title: no-cond-assign
rule_type: problem
related_rules:
- no-extra-parens
---

在条件语句中，很容易把比较运算符（如 `==`）误打成赋值运算符（如 `=`）。比如：

```js
// Check the user's job title
if (user.jobTitle = "manager") {
    // user.jobTitle is now incorrect
}
```

在条件语句中使用赋值运算符是有理由的。然而，要想知道一个特定赋值是不是故意的就很难。

## 规则细节

使用此规则禁用 `if`、`for`、`while` 和 `do...while` 测试条件中的模糊赋值运算符。

## 选项

此规则选项为字符串：

* `"except-parens"`（默认值）只有当它们被括号括住时才允许测试条件中的赋值（例如，允许在 `while` 或 `do...while` 循环测试中重新赋值变量）。
* `"always"` 不允许在测试条件中进行任意赋值

### except-parens

使用此规则与默认的 `"except-parens"` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-cond-assign: "error"*/

// Unintentional assignment
var x;
if (x = 0) {
    var b = 1;
}

// Practical example that is similar to an error
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while (someNode = someNode.parentNode);
}
```

:::

使用此规则与默认的 `"except-parens"` 选项的**正确**示例：

::: correct

```js
/*eslint no-cond-assign: "error"*/

// Assignment replaced by comparison
var x;
if (x === 0) {
    var b = 1;
}

// Practical example that wraps the assignment in parentheses
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode));
}

// Practical example that wraps the assignment and tests for 'null'
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode) !== null);
}
```

:::

### always

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-cond-assign: ["error", "always"]*/

// Unintentional assignment
var x;
if (x = 0) {
    var b = 1;
}

// Practical example that is similar to an error
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while (someNode = someNode.parentNode);
}

// Practical example that wraps the assignment in parentheses
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode));
}

// Practical example that wraps the assignment and tests for 'null'
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode) !== null);
}
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint no-cond-assign: ["error", "always"]*/

// Assignment replaced by comparison
var x;
if (x === 0) {
    var b = 1;
}
```

:::
