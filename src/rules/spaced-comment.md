---
title: spaced-comment
rule_type: suggestion
related_rules:
- spaced-line-comment
---

一些风格指南要求或不允许在评论的最初的 `//` 或 `/*` 后面有空白。
在 `//` 或 `/*` 后面的空白使评论中的文本更容易阅读。
另一方面，如果不在 `//` 或 `/*` 后面加上空白，注释代码也会更容易。

## 规则细节

这条规则将强制执行注释 `//` 或 `/*` 开始后的间距的一致性。它还为各种文档风格提供了一些例外情况。

## 选项

规则需要两个选项。

* 第一个是一个字符串，可以是 `"always"` 或 `"never"`。默认是 `"always"`。

    * 如果 `"always"`，那么 `//` 或 `/*` 后面必须有至少一个空格。

    * 如果 `"never"`，那么后面就不应该有空白。

* 这个规则也可以接受第 2 个选项，一个具有以下任何键的对象。`"exceptions"` 和 `"markers"`。

    * `"exceptions"` 值是一个字符串模式的数组，被认为是规则的例外情况。当模式从注释的开头开始并重复到行尾时，规则将不会发出警告，如果注释是单行注释，则是 `*/`。
    请注意，如果第一个参数是 `"never"`，例外情况将被忽略。

    ```js
    "spaced-comment": ["error", "always", { "exceptions": ["-", "+"] }]
    ```

    * `"markers"` 值是一个字符串模式的数组，被认为是 docblock 风格注释的标记。
    例如附加的 `/`，用于表示由 doxygen、vsdoc 等读取的文档，必须有附加的字符。
    无论第一个参数的值是多少，`"markers"` 数组都将适用，例如，`"always"` 或 `"never"`。

    ```js
    "spaced-comment": ["error", "always", { "markers": ["/"] }]
    ```

标记和异常的区别在于，标记只出现在注释的开头，而
异常可以出现在注释字符串中的任何地方。

你也可以为块和行注释定义单独的异常和标记。`block` 对象可以有一个额外的键 `"balanced"`，这是一个布尔值，用于指定内联块注释是否应该有平衡的行距。默认值是 `false`。

* 如果 `"balanced": true` 和 `"always"`，那么 `/*` 后面必须有至少一个空格，而 `*/` 前面必须有至少一个空格。

* 如果 `"balanced": false` 和 `"never"`，那么 `/*` 后面和 `*/` 前面都不应该有空格。

* 如果 `"balanced": false`，则不执行平衡空白。

```json
"spaced-comment": ["error", "always", {
    "line": {
        "markers": ["/"],
        "exceptions": ["-", "+"]
    },
    "block": {
        "markers": ["!"],
        "exceptions": ["*"],
        "balanced": true
    }
}]
```

### always

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint spaced-comment: ["error", "always"]*/

//This is a comment with no whitespace at the beginning

/*This is a comment with no whitespace at the beginning */
```

:::

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "block": { "balanced": true } }] */
/* This is a comment with whitespace at the beginning but not the end*/
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/* eslint spaced-comment: ["error", "always"] */

// This is a comment with a whitespace at the beginning

/* This is a comment with a whitespace at the beginning */

/*
 * This is a comment with a whitespace at the beginning
 */

/*
This comment has a newline
*/
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always"] */

/**
* I am jsdoc
*/
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint spaced-comment: ["error", "never"]*/

// This is a comment with a whitespace at the beginning

/* This is a comment with a whitespace at the beginning */

/* \nThis is a comment with a whitespace at the beginning */
```

:::

::: incorrect

```js
/*eslint spaced-comment: ["error", "never", { "block": { "balanced": true } }]*/
/*This is a comment with whitespace at the end */
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint spaced-comment: ["error", "never"]*/

/*This is a comment with no whitespace at the beginning */
```

:::

::: correct

```js
/*eslint spaced-comment: ["error", "never"]*/

/**
* I am jsdoc
*/
```

:::

### exceptions

使用此规则与 `"always"` 选项及 `"exceptions"` 的**错误**示例：

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "block": { "exceptions": ["-"] } }] */

//--------------
// Comment block
//--------------
```

:::

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "exceptions": ["-", "+"] }] */

//------++++++++
// Comment block
//------++++++++
```

:::

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "exceptions": ["-", "+"] }] */

/*------++++++++*/
/* Comment block */
/*------++++++++*/
```

:::

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "line": { "exceptions": ["-+"] } }] */

/*-+-+-+-+-+-+-+*/
// Comment block
/*-+-+-+-+-+-+-+*/
```

:::

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "block": { "exceptions": ["*"] } }] */

/******** COMMENT *******/
```

:::

使用此规则与 `"always"` 选项及 `"exceptions"` 的**正确**示例：

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "exceptions": ["-"] }] */

//--------------
// Comment block
//--------------
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "line": { "exceptions": ["-"] } }] */

//--------------
// Comment block
//--------------
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "exceptions": ["*"] }] */

/****************
 * Comment block
 ****************/
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "exceptions": ["-+"] }] */

//-+-+-+-+-+-+-+
// Comment block
//-+-+-+-+-+-+-+

/*-+-+-+-+-+-+-+*/
// Comment block
/*-+-+-+-+-+-+-+*/
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "block": { "exceptions": ["-+"] } }] */

/*-+-+-+-+-+-+-+*/
// Comment block
/*-+-+-+-+-+-+-+*/
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "block": { "exceptions": ["*"] } }] */

/***************/

/********
COMMENT
*******/
```

:::

### markers

使用此规则与 `"always"` 选项及 `"markers"` 的**错误**示例：

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "markers": ["/"] }] */

///This is a comment with a marker but without whitespace
```

:::

::: incorrect

```js
/*eslint spaced-comment: ["error", "always", { "block": { "markers": ["!"], "balanced": true } }]*/
/*! This is a comment with a marker but without whitespace at the end*/
```

:::

::: incorrect

```js
/*eslint spaced-comment: ["error", "never", { "block": { "markers": ["!"], "balanced": true } }]*/
/*!This is a comment with a marker but with whitespace at the end */
```

:::

使用此规则与 `"always"` 选项及 `"markers"` 的**正确**示例：

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "markers": ["/"] }] */

/// This is a comment with a marker
```

:::

::: correct

```js
/*eslint spaced-comment: ["error", "never", { "markers": ["!<"] }]*/

//!<This is a line comment with a marker

/*!<this is a block comment with a marker
subsequent lines are ignored
*/
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "markers": ["global"] }] */

/*global ABC*/
```

:::
