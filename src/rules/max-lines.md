---
title: max-lines
rule_type: suggestion
related_rules:
- complexity
- max-depth
- max-lines-per-function
- max-nested-callbacks
- max-params
- max-statements
further_reading:
- https://web.archive.org/web/20160725154648/http://www.mind2b.com/component/content/article/24-software-module-size-and-file-size
---

有些人认为大文件是一种代码风格。大文件往往会做很多事情，而且会让人很难了解正在发生的事情。虽然在一个文件中没有一个客观的可接受的最大行数，但大多数人都会同意它不应该是成千上万的。建议通常在 100 到 500 行之间。

## 规则细节

这条规则规定了每个文件的最大行数，以帮助维护和减少复杂性。

请注意，如果文件以换行方式结束，大多数编辑器会在最后显示一个额外的空行。这条规则不计算这个额外的行。

## 选项

这个规则有一个数字或对象选项：

* `"max"`（默认为 `300`）执行一个文件的最大行数

* `"skipBlankLines": true` 忽略纯粹由空白构成的行

* `"skipComments": true` 忽略只包含注释的行

### max

使用此规则与最大值 `2` 的**错误**示例：

::: incorrect

```js
/*eslint max-lines: ["error", 2]*/
var a,
    b,
    c;
```

:::

::: incorrect

```js
/*eslint max-lines: ["error", 2]*/

var a,
    b,c;
```

:::

::: incorrect

```js
/*eslint max-lines: ["error", 2]*/
// a comment
var a,
    b,c;
```

:::

使用此规则与最大值 `2` 的**正确**示例：

::: correct

```js
/*eslint max-lines: ["error", 2]*/
var a,
    b, c;
```

:::

::: correct

```js
/*eslint max-lines: ["error", 2]*/

var a, b, c;
```

:::

::: correct

```js
/*eslint max-lines: ["error", 2]*/
// a comment
var a, b, c;
```

:::

### skipBlankLines

使用此规则与 `{ "skipBlankLines": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-lines: ["error", {"max": 2, "skipBlankLines": true}]*/

var a,
    b,
    c;
```

:::

使用此规则与 `{ "skipBlankLines": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-lines: ["error", {"max": 2, "skipBlankLines": true}]*/

var a,
    b, c;
```

:::

### skipComments

使用此规则与 `{ "skipComments": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-lines: ["error", {"max": 2, "skipComments": true}]*/
// a comment
var a,
    b,
    c;
```

:::

使用此规则与 `{ "skipComments": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-lines: ["error", {"max": 2, "skipComments": true}]*/
// a comment
var a,
    b, c;
```

:::

## 何时不用

如果你不关心你的文件行数，你可以把这个规则关掉。

## 兼容

* **JSCS**：[maximumNumberOfLines](https://jscs-dev.github.io/rule/maximumNumberOfLines)
