---
title: prefer-regex-literals
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
---

有两种方法可以创建正则表达式：

* 正则表达式字面，例如 `/abc/u`。
* `RegExp` 构造函数，例如 `new RegExp("abc", "u")` 或 `RegExp("abc", "u")`。

当你想动态地生成模式时，构造函数特别有用，因为它支持字符串参数。

当对字符串字面意义使用构造函数时，别忘了字符串转义规则仍然适用。
如果你想在模式中放一个反斜杠，你需要在字符串字面中转义它。
因此，下面这些是等价的：

```js
new RegExp("^\\d\\.$");

/^\d\.$/;

// matches "0.", "1.", "2." ... "9."
```

在上面的例子中，正则表达式的字面意思更容易阅读和推理。
另外，在字符串字面中省略多余的 `\` 是一个常见的错误，这将产生一个完全不同的正则表达式。

```js
new RegExp("^\d\.$");

// equivalent to /^d.$/, matches "d1", "d2", "da", "db" ...
```

当事先知道正则表达式时，避免在正则表达式之上使用字符串字面符号被认为是最佳做法，并使用正则表达式字面符号而不是构造函数。

## 规则细节

这条规则不允许使用 `RegExp` 构造函数，其参数为字符串字面。

这条规则也不允许使用 `RegExp` 构造函数来处理没有表达式的模板字词
和 `String.raw` 标记的无表达式的模板字词。

这条规则并不禁止所有 `RegExp` 构造函数的使用。它仍然应该被用于
动态生成的正则表达式。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-regex-literals: "error"*/

new RegExp("abc");

new RegExp("abc", "u");

RegExp("abc");

RegExp("abc", "u");

new RegExp("\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d");

RegExp(`^\\d\\.$`);

new RegExp(String.raw`^\d\.$`);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-regex-literals: "error"*/

/abc/;

/abc/u;

/\d\d\.\d\d\.\d\d\d\d/;

/^\d\.$/;

// RegExp constructor is allowed for dynamically generated regular expressions

new RegExp(pattern);

RegExp("abc", flags);

new RegExp(prefix + "abc");

RegExp(`${prefix}abc`);

new RegExp(String.raw`^\d\. ${suffix}`);
```

:::

## 选项

此规则选项为对象：

* `disallowRedundantWrapping` 设置为 `true` 时，会额外检查是否有不必要包裹的重词字头（默认为 `false`）。

### `disallowRedundantWrapping`

默认情况下，这个规则不回检查当 regex 字面量被不必要地包裹在 `RegExp` 构造函数调用中的情况。但当选项 `disallowRedundantWrapping` 被设置为 `true` 时，该规则也将禁止这种不必要的模式。

`{ "disallowRedundantWrapping": true }` 的 `incorrect` 代码示例：

```js
/*eslint prefer-regex-literals: ["error", {"disallowRedundantWrapping": true}]*/

new RegExp(/abc/);

new RegExp(/abc/, 'u');
```

`{ "disallowRedundantWrapping": true }` 的 `correct` 代码示例：

```js
/*eslint prefer-regex-literals: ["error", {"disallowRedundantWrapping": true}]*/

/abc/;

/abc/u;

new RegExp(/abc/, flags);
```
