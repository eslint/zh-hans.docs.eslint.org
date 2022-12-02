---
title: dot-notation
layout: doc
rule_type: suggestion
---

在 JavaScript 中，我们可以使用点符号（`foo.bar`）或方括号符号（`foo["bar"]`）访问属性。然而，点符号通常是首选，因为它更容易阅读，不那么冗长，而且与积极的 JavaScript 最小化器配合得更好。

```js
foo["bar"];
```

## 规则细节

这条规则的目的是通过鼓励尽可能地使用点符号风格来保持代码的一致性和提高代码的可读性。因此，当它遇到不必要地使用方括号符号时，会发出警告。

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint dot-notation: "error"*/

var x = foo["bar"];
```

:::

使用此规则的**正确**示例：

:::correct

```js
/*eslint dot-notation: "error"*/

var x = foo.bar;

var x = foo[bar];    // Property name is a variable, square-bracket notation required
```

:::

## 选项

这个规则接受一个选项参数：

* 将 `allowKeywords` 选项设置为 `false`（默认为是 `true`），以遵循 ECMAScript 第三版的兼容风格，避免对保留字属性使用点符号。
* 将 `allowPattern` 选项设置为正则表达式字符串，以允许对符合模式的属性名称使用括号符号（默认情况下，不测试模式）。

### allowKeywords

使用 `{ "allowKeywords": false }` 选项的**正确**示例：

:::correct

```js
/*eslint dot-notation: ["error", { "allowKeywords": false }]*/

var foo = { "class": "CS 101" }
var x = foo["class"]; // Property name is a reserved word, square-bracket notation required
```

:::

使用 `{ "allowKeywords": false }` 选项的又一**正确**示例：

:::correct

```js
/*eslint dot-notation: ["error", { "allowKeywords": false }]*/

class C {
    #in;
    foo() {
        this.#in; // Dot notation is required for private identifiers
    }
}
```

:::

### allowPattern

例如，当准备将数据发送到外部 API 时，经常需要使用包括下划线的属性名称。如果 `camelcase` 规则生效，则不允许这些 [snake case](https://en.wikipedia.org/wiki/Snake_case) 属性。通过为 `dot-notation` 规则提供 `allowPattern`，可以通过括号符号来访问这些蛇形大小写的属性。

使用演示的 `{ "allowPattern": "^[a-z]+(_[a-z]+)+$" }` 选项的**正确**示例：

:::correct

```js
/*eslint camelcase: "error"*/
/*eslint dot-notation: ["error", { "allowPattern": "^[a-z]+(_[a-z]+)+$" }]*/

var data = {};
data.foo_bar = 42;

var data = {};
data["fooBar"] = 42;

var data = {};
data["foo_bar"] = 42; // 无警告
```

:::
