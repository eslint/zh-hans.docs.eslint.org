---
title: capitalized-comments
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/capitalized-comments.md
rule_type: suggestion
---

注释对于给未来的开发者留下信息是很有用的。为了使这些信息有用而不分散注意力，有时最好让注释遵循一种特定的风格。注释格式风格的一个要素是注释的第一个字应该是大写还是小写。

一般来说，没有任何注释风格比其他风格更好或更烂，但许多开发者都同意一致的风格有助于提高项目的可维护性。

## 规则细节

这条规则的目的是在你的代码库中执行统一的注释风格，特别是通过要求或不允许大写字母作为注释中的第一个字的字符。当使用非大写字母时，本规则不会发出警告。

默认情况下，本规则将要求在注释的开头使用非小写字母。

使用此规则的**错误**示例：

:::incorrect

```js
/* eslint capitalized-comments: ["error"] */

// lowercase comment

```

:::

使用此规则的**正确**示例：

:::correct

```js

// Capitalized comment

// 1. Non-letter at beginning of comment

// 丈 Non-Latin character at beginning of comment

/* eslint semi:off */
/* eslint-env node */
/* eslint-disable */
/* eslint-enable */
/* istanbul ignore next */
/* jscs:enable */
/* jshint asi:true */
/* global foo */
/* globals foo */
/* exported myVar */
// eslint-disable-line
// eslint-disable-next-line
// https://github.com

```

:::

### 选项

这个规则有两个选项：字符串值 `"always"` 或 `"never"`，它决定是否需要或禁止注释的第一个字的大写，还可以选择一个包含该规则更多配置参数的对象。

以下是支持的对象选项。

* `ignorePattern`代表这个规则应该忽略的单词的正则表达式模式的字符串。如果注释的第一个词与该模式匹配，该规则将不报告该注释。
    * 注意以下词语总是被此规则忽略：`["jscs", "jshint", "eslint", "istanbul", "global", "globals", "exported"]`。
* `ignoreInlineComments`：若为 `true`，则规则将不报告代码中间的注释。默认为 `false`。
* `ignoreConsecutiveComments`：若为 `true`，规则将不报告违反规则的注释，只要该注释紧随另一个注释。默认为 `false`。

下面是配置示例：

```json
{
    "capitalized-comments": [
        "error",
        "always",
        {
            "ignorePattern": "pragma|ignored",
            "ignoreInlineComments": true
        }
    ]
}
```

#### `"always"`

使用 `"always"` 选项意味着该规则将报告任何以小写字母开头的注释。这是该规则的默认配置。

请注意，配置注释和以链接开头的注释不会被报告。

使用此规则的**错误**示例：

:::incorrect

```js
/* eslint capitalized-comments: ["error", "always"] */

// lowercase comment

```

:::

使用此规则的**正确**示例：

:::correct

```js
/* eslint capitalized-comments: ["error", "always"] */

// Capitalized comment

// 1. Non-letter at beginning of comment

// 丈 Non-Latin character at beginning of comment

/* eslint semi:off */
/* eslint-env node */
/* eslint-disable */
/* eslint-enable */
/* istanbul ignore next */
/* jscs:enable */
/* jshint asi:true */
/* global foo */
/* globals foo */
/* exported myVar */
// eslint-disable-line
// eslint-disable-next-line
// https://github.com

```

:::

#### `"never"`

使用 `"never"` 选项意味着该规则将报告任何以大写字母开头的注释。

使用 `"never"` 选项的**错误**示例：

:::incorrect

```js
/* eslint capitalized-comments: ["error", "never"] */

// Capitalized comment

```

:::

使用 `"never"` 选项的**正确**示例：

:::correct

```js
/* eslint capitalized-comments: ["error", "never"] */

// 小写注释

// 1. 非字母开头的注释

// 丈 非拉丁字符开头的注释
```

:::

#### `ignorePattern`

`ignorePattern` 对象接收字符串值，作为正则表达式应用于注释的第一个字。

将 `"ignorePattern"` 选项设置为 `"pragma"` 的**正确**示例：

:::correct

```js
/* eslint capitalized-comments: ["error", "always", { "ignorePattern": "pragma" }] */

function foo() {
    /* pragma wrap(true) */
}

```

:::

#### `ignoreInlineComments`

将 `ignoreInlineComments` 选项设置为 `true` 意味着该规则将不会报告代码中间的注释（与注释开头同行的标记和与注释结尾同行的另一个标记）。

将 `"ignoreInlineComments"` 选项设置为 `true` 的**正确**示例：

:::correct

```js
/* eslint capitalized-comments: ["error", "always", { "ignoreInlineComments": true }] */

function foo(/* ignored */ a) {
}

```

:::

#### `ignoreConsecutiveComments`

如果 `ignoreConsecutiveComments` 选项被设置为 `true`，那么将不会报告违反规则的注释，只要它们紧跟在另一个注释之后，那就可以多次应用。

将 `ignoreConsecutiveComments` 选项设置为 `true` 的**正确**示例：

:::correct

```js
/* eslint capitalized-comments: ["error", "always", { "ignoreConsecutiveComments": true }] */

// This comment is valid since it has the correct capitalization.
// this comment is ignored since it follows another comment,
// and this one as well because it follows yet another comment.

/* Here is a block comment which has the correct capitalization, */
/* but this one is ignored due to being consecutive; */
/*
 * in fact, even if any of these are multi-line, that is fine too.
 */
```

:::

将 `ignoreConsecutiveComments` 选项设置为 `true` 的**错误**示例：

:::incorrect

```js
/* eslint capitalized-comments: ["error", "always", { "ignoreConsecutiveComments": true }] */

// this comment is invalid, but only on this line.
// this comment does NOT get reported, since it is a consecutive comment.
```

:::

### 为行和块注释使用不同的选项

如果你希望对行注释和块注释有不同的配置，你可以通过使用两个不同的对象配置来实现（注意，行注释和块注释的大写选项将被一致执行）。

```json
{
    "capitalized-comments": [
        "error",
        "always",
        {
            "line": {
                "ignorePattern": "pragma|ignored",
            },
            "block": {
                "ignoreInlineComments": true,
                "ignorePattern": "ignored"
            }
        }
    ]
}
```

具有不同行和块注释配置的**错误的**代码的例子：

:::incorrect

```js
/* eslint capitalized-comments: ["error", "always", { "block": { "ignorePattern": "blockignore" } }] */

// capitalized line comment, this is incorrect, blockignore does not help here
/* lowercased block comment, this is incorrect too */

```

:::

具有不同行和块注释配置的**正确的**代码的例子：

:::correct

```js
/* eslint capitalized-comments: ["error", "always", { "block": { "ignorePattern": "blockignore" } }] */

// Uppercase line comment, this is correct
/* blockignore lowercase block comment, this is correct due to ignorePattern */

```

:::

## 何时不用

如果你不关心你的代码库中注释的语法风格，可以禁用这一规则。

## 兼容

* **JSCS**：[requireCapitalizedComments](https://jscs-dev.github.io/rule/requireCapitalizedComments)
* **JSCS**：[disallowCapitalizedComments](https://jscs-dev.github.io/rule/disallowCapitalizedComments)
