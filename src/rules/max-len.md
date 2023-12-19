---
title: max-len
rule_type: layout
related_rules:
- complexity
- max-depth
- max-nested-callbacks
- max-params
- max-statements
---

在任何语言中，很长的代码行都很难阅读。为了提高可读性和可维护性，许多程序员已经形成了一种惯例，将代码行限制在 X 个字符（一般是 80 个字符）。

```js
var foo = { "bar": "This is a bar.", "baz": { "qux": "This is a qux" }, "difficult": "to read" }; // very long
```

## 规则细节

此规则限制了一个行的最大长度，以提高代码的可读性和可维护性。一行的长度被定义为该行中 Unicode 字符的数量。

## 选项

该规则可以有最多两个数字作为位置参数（用于 `code` 和 `tabWidth` 选项），然后是一个对象选项（提供的位置参数具有优先级）：

* `"code"`（默认为 `80`）规定了一个最大行长
* `"tabWidth"`（默认为 `4`）指定制表符的字符宽度
* `"comments"` 强制执行注释的最大行长；默认为 `code` 的值
* `"ignorePattern"` 忽略与正则表达式匹配的行；只能匹配单行，并且在 YAML 或 JSON 中写入时需要双转义
* `"ignoreComments": true` 忽略所有的尾部注释和自己行内的注释
* `"ignoreTrailingComments": true` 只忽略尾部的注释
* `"ignoreUrls": true` 忽略包含 URL 的行
* `"ignoreStrings": true` 忽略包含双引号或单引号字符串的行
* `"ignoreTemplateLiterals": true` 忽略包含模板字面的行
* `"ignoreRegExpLiterals": true` 忽略包含正则字样的行

### code

使用此规则与默认的 `{ "code": 80 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-len: ["error", { "code": 80 }]*/

var foo = { "bar": "This is a bar.", "baz": { "qux": "This is a qux" }, "difficult": "to read" };
```

:::

使用此规则与默认的 `{ "code": 80 }` 选项的**正确**示例：

::: correct

```js
/*eslint max-len: ["error", { "code": 80 }]*/

var foo = {
  "bar": "This is a bar.",
  "baz": { "qux": "This is a qux" },
  "easier": "to read"
};
```

:::

### tabWidth

使用此规则与默认的 `{ "tabWidth": 4 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-len: ["error", { "code": 80, "tabWidth": 4 }]*/

\t  \t  var foo = { "bar": "This is a bar.", "baz": { "qux": "This is a qux" } };
```

:::

使用此规则与默认的 `{ "tabWidth": 4 }` 选项的**正确**示例：

::: correct

```js
/*eslint max-len: ["error", { "code": 80, "tabWidth": 4 }]*/

\t  \t  var foo = {
\t  \t  \t  \t  "bar": "This is a bar.",
\t  \t  \t  \t  "baz": { "qux": "This is a qux" }
\t  \t  };
```

:::

### comments

使用此规则与 `{ "comments": 65 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-len: ["error", { "comments": 65 }]*/

/**
 * This is a comment that violates the maximum line length we have specified
**/
```

:::

### ignoreComments

使用此规则与 `{ "ignoreComments": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-len: ["error", { "ignoreComments": true }]*/

/**
 * This is a really really really really really really really really really long comment
**/
```

:::

### ignoreTrailingComments

使用此规则与 `{ "ignoreTrailingComments": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-len: ["error", { "ignoreTrailingComments": true }]*/

var foo = 'bar'; // This is a really really really really really really really long comment
```

:::

### ignoreUrls

使用此规则与 `{ "ignoreUrls": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-len: ["error", { "ignoreUrls": true }]*/

var url = 'https://www.example.com/really/really/really/really/really/really/really/long';
```

:::

### ignoreStrings

使用此规则与 `{ "ignoreStrings": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-len: ["error", { "ignoreStrings": true }]*/

var longString = 'this is a really really really really really long string!';
```

:::

### ignoreTemplateLiterals

使用此规则与 `{ "ignoreTemplateLiterals": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-len: ["error", { "ignoreTemplateLiterals": true }]*/

var longTemplateLiteral = `this is a really really really really really long template literal!`;
```

:::

### ignoreRegExpLiterals

使用此规则与 `{ "ignoreRegExpLiterals": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-len: ["error", { "ignoreRegExpLiterals": true }]*/

var longRegExpLiteral = /this is a really really really really really long regular expression!/;
```

:::

### ignorePattern

使用此规则与 `ignorePattern` 选项的**正确**示例：

::: correct

```js
/*eslint max-len: ["error", { "ignorePattern": "^\\s*var\\s.+=\\s*require\\s*\\(" }]*/

var dep = require('really/really/really/really/really/really/really/really/long/module');
```

:::
