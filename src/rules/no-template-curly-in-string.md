---
title: no-template-curly-in-string
layout: doc
rule_type: problem
---

ECMAScript 6 允许程序员使用模板字面来创建包含变量或表达式的字符串，而不是字符串连接，方法是在两个反斜线引号（`${variable}`）之间写表达式。当想使用模板字面时，很容易使用错误的引号，写成 `"${variable}"`，最后得到的是字面值 `"${variable}"`，而不是包含注入的表达式的值的字符串。

## 规则细节

这条规则的目的是当一个普通的字符串包含看起来像模板字面的占位符时发出警告。当它发现一个包含模板字面占位符（`${something}`）的字符串，并且使用 `"` 或 `'` 作为引号时，它将发出警告。

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-template-curly-in-string: "error"*/
"Hello ${name}!";
'Hello ${name}!';
"Time: ${12 * 60 * 60 * 1000}";
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-template-curly-in-string: "error"*/
`Hello ${name}!`;
`Time: ${12 * 60 * 60 * 1000}`;

templateFunction`Hello ${name}`;
```

:::

## 何时不用

不应该在 ES3/5 环境中使用此规则。
