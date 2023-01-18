---
title: prefer-template
rule_type: suggestion
related_rules:
- no-useless-concat
- quotes
---

在 ES2015（ES6）中，我们可以使用模板字面量，而不是把字符串连接起来。

```js
var str = "Hello, " + name + "!";
```

```js
/*eslint-env es6*/

var str = `Hello, ${name}!`;
```

## 规则细节

这条规则的目的是标明使用 `+` 运算符连接的字符串。

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-template: "error"*/

var str = "Hello, " + name + "!";
var str = "Time: " + (12 * 60 * 60 * 1000);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-template: "error"*/
/*eslint-env es6*/

var str = "Hello World!";
var str = `Hello, ${name}!`;
var str = `Time: ${12 * 60 * 60 * 1000}`;

// This is reported by `no-useless-concat`.
var str = "Hello, " + "World!";
```

:::

## 何时不用

不应该在 ES3/5 环境中使用此规则。

在 ES2015（ES6）或更高版本中，如果你不想得到关于字符串连接的通知，你可以安全地禁用这个规则。
