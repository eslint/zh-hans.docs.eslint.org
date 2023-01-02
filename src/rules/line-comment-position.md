---
title: line-comment-position
rule_type: layout
---

行注释可以放在代码上方或旁边。这一规则有助于团队保持一致的风格。

```js
// above comment
var foo = "bar";  // beside comment
```

## 规则细节

这条规则使行注释的位置一致。块状注释不受此规则的影响。默认情况下，这条规则忽略了以下列词语开头的注释。`eslint`、`jshint`、`jslint`、`istanbul`、`global`、`exported`、`jscs`、`falls through`。

## 选项

这个规则需要一个参数，可以是一个字符串，也可以是一个对象。字符串的设置与 `position` 属性的设置相同（解释如下）。对象选项有以下属性。

### position

`position` 选项有两个设置项：

* `above`（默认值）只在代码上方，在它自己的行中执行行注释。
* `beside` 仅在代码行的末尾执行行注释。

#### position: above

使用 `{ "position": "above" }` 选项的**正确**示例：

::: correct

```js
/*eslint line-comment-position: ["error", { "position": "above" }]*/
// valid comment
1 + 1;
```

:::

使用 `{ "position": "above" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint line-comment-position: ["error", { "position": "above" }]*/
1 + 1; // invalid comment
```

:::

#### position: beside

使用 `{ "position": "beside" }` 选项的**正确**示例：

::: correct

```js
/*eslint line-comment-position: ["error", { "position": "beside" }]*/
1 + 1; // valid comment
```

:::

使用 `{ "position": "beside" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint line-comment-position: ["error", { "position": "beside" }]*/
// invalid comment
1 + 1;
```

:::

### ignorePattern

默认情况下，该规则忽略了以下列词语开头的注释。`eslint`, `jshint`, `jslint`, `istanbul`, `global`, `exported`, `jscs`, `falls through`. 可以提供一个替代的正则表达式。

使用 `ignorePattern` 选项的**正确**示例：

::: correct

```js
/*eslint line-comment-position: ["error", { "ignorePattern": "pragma" }]*/
1 + 1; // pragma valid comment
```

:::

使用 `ignorePattern` 选项的**错误**示例：

::: incorrect

```js
/*eslint line-comment-position: ["error", { "ignorePattern": "pragma" }]*/
1 + 1; // invalid comment
```

:::

### applyDefaultIgnorePatterns

即使提供了 `ignorePattern`，也会应用默认的忽略模式。如果你想省略默认模式，将此选项设置为 `false`。

使用 `{ "applyDefaultIgnorePatterns": false }` 选项的**正确**示例：

::: correct

```js
/*eslint line-comment-position: ["error", { "ignorePattern": "pragma", "applyDefaultIgnorePatterns": false }]*/
1 + 1; // pragma valid comment
```

:::

使用 `{ "applyDefaultIgnorePatterns": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint line-comment-position: ["error", { "ignorePattern": "pragma", "applyDefaultIgnorePatterns": false }]*/
1 + 1; // falls through
```

:::

**废弃**：对象属性 `applyDefaultPatterns` 已被废弃。请使用 `applyDefaultIgnorePatterns` 属性代替。

## 何时不用

如果你不担心有不同的行注释风格，那么你可以关闭这个规则。

## 兼容

**JSCS**: [validateCommentPosition](https://jscs-dev.github.io/rule/validateCommentPosition)
