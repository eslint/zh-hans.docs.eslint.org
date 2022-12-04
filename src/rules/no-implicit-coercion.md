---
title: no-implicit-coercion
layout: doc
rule_type: suggestion
---

在 JavaScript 中，有很多不同的方法来转换值的类型。
其中有些可能很难阅读和理解。

比如说：

```js
var b = !!foo;
var b = ~foo.indexOf(".");
var n = +foo;
var n = 1 * foo;
var s = "" + foo;
foo += ``;
```

这些可以用以下代码代替。

```js
var b = Boolean(foo);
var b = foo.indexOf(".") !== -1;
var n = Number(foo);
var s = String(foo);
foo = String(foo);
```

## 规则细节

这条规则的目的是为类型转换标出较短的符号，然后建议一个更容易解释的符号。

## 选项

这个规则有三个主要的选项和一个覆盖选项，以允许一些必要的强制措施。

* `"boolean"`（默认为 `true`) - 当这个选项为 `true` 时，该规则对 `boolean` 类型的短类型转换发出警告。
* `"number"`（默认为 `true`) - 当此规则为 `true` 时，此规则对 `number` 类型的短类型转换发出警告。
* `"string"`（默认为 `true`) - 当此规则为 `true` 时，此规则对 `string` 类型的短类型转换发出警告。
* `"disallowTemplateShorthand"`（默认为 `false`) - 当此规则为 `true` 时，此规则警告使用 `${expression}` 形式的 `string` 类型转换。
* `"allow"`（默认为 `empty`) - 这个数组中的每个条目都允许使用，可以是 `~`、`!`、`+` 或 `*` 之一。

请注意，`allow` 列表中存在运算符 `+` 将允许使用 `+foo`（数字强制）以及 `"" + foo`（字符串强制）。

### boolean

使用默认的 `{ "boolean": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-implicit-coercion: "error"*/

var b = !!foo;
var b = ~foo.indexOf(".");
// bitwise not is incorrect only with `indexOf`/`lastIndexOf` method calling.
```

:::

使用默认的 `{ "boolean": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-implicit-coercion: "error"*/

var b = Boolean(foo);
var b = foo.indexOf(".") !== -1;

var n = ~foo; // This is a just bitwise not.
```

:::

### number

使用默认的 `{ "number": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-implicit-coercion: "error"*/

var n = +foo;
var n = 1 * foo;
```

:::

使用默认的 `{ "number": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-implicit-coercion: "error"*/

var n = Number(foo);
var n = parseFloat(foo);
var n = parseInt(foo, 10);
```

:::

### string

使用默认的 `{ "string": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-implicit-coercion: "error"*/

var s = "" + foo;
var s = `` + foo;
foo += "";
foo += ``;
```

:::

使用默认的 `{ "string": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-implicit-coercion: "error"*/

var s = String(foo);
foo = String(foo);
```

:::

### disallowTemplateShorthand

This option is **not** affected by `string` 选项。

使用 `{ "disallowTemplateShorthand": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-implicit-coercion: ["error", { "disallowTemplateShorthand": true }]*/

var s = `${foo}`;
```

:::

使用 `{ "disallowTemplateShorthand": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-implicit-coercion: ["error", { "disallowTemplateShorthand": true }]*/

var s = String(foo);

var s = `a${foo}`;

var s = `${foo}b`;

var s = `${foo}${bar}`;

var s = tag`${foo}`;
```

:::

使用默认的 `{ "disallowTemplateShorthand": false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-implicit-coercion: ["error", { "disallowTemplateShorthand": false }]*/

var s = `${foo}`;
```

:::

### allow

使用 `allow` 列表，我们可以覆盖和允许特定的运算符。

使用 `{ "allow": ["!!", "~"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-implicit-coercion: [2, { "allow": ["!!", "~"] } ]*/

var b = !!foo;
var b = ~foo.indexOf(".");
```

:::

## 何时不用

如果你不想收到关于类型转换的较短符号的通知，你可以安全地禁用这个规则。
