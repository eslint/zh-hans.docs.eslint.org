---
title: func-call-spacing
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/func-call-spacing.md
rule_type: layout
related_rules:
- no-spaced-func
---

当调用函数时，开发者可以在函数名和调用它的括号之间插入可选的空白。下面这对函数的调用是等价的：

```js
alert('Hello');
alert ('Hello');

console.log(42);
console.log (42);

new Date();
new Date ();
```

## 规则细节

这条规则要求或不允许在函数名和调用它的开头小括号之间有空格。

## 选项

此规则选项为字符串：

* `"never"`（默认值）不允许在函数名和括号开头之间有空格。
* `"always"` 要求在函数名和括号开头之间有空格。

此外，在 `"always"` 模式下，有第二个对象选项可用，它是一个布尔值 `allowNewlines` 属性。

### never

使用此规则与默认的 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-call-spacing: ["error", "never"]*/

fn ();

fn
();
```

:::

使用此规则与默认的 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint func-call-spacing: ["error", "never"]*/

fn();
```

:::

### always

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-call-spacing: ["error", "always"]*/

fn();

fn
();
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint func-call-spacing: ["error", "always"]*/

fn ();
```

:::

#### allowNewlines

默认情况下，`"always"` 不允许换行。要在 `"always"` 模式下允许换行，请将 `allowNewlines` 选项设置为 `true`。不需要新行。

使用此规则与 `allowNewlines` 选项的**正确**代码示例:

::: incorrect

```js
/*eslint func-call-spacing: ["error", "always", { "allowNewlines": true }]*/

fn();
```

:::

使用此规则与 `allowNewlines` 选项的**正确代码示例：

::: correct

```js
/*eslint func-call-spacing: ["error", "always", { "allowNewlines": true }]*/

fn (); // Newlines are never required.

fn
();
```

:::

## 何时不用

如果你的项目不需要在函数调用中使用统一的间距风格，可以安全地关闭这一规则。

## 兼容

* **JSCS**：[disallowSpacesInCallExpression](https://jscs-dev.github.io/rule/disallowSpacesInCallExpression)
* **JSCS**：[requireSpacesInCallExpression](https://jscs-dev.github.io/rule/requireSpacesInCallExpression)
