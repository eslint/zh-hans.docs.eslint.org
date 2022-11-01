---
title: no-inline-comments
layout: doc
rule_type: suggestion
---

一些风格指南不允许在代码的同一行有注释。如果注释紧跟在代码后面，代码会变得难以阅读。
另一方面，将注释紧跟在代码后面有时会更快、更明显。

## 规则细节

这条规则不允许与代码在同一行的注释。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-inline-comments: "error"*/

var a = 1; // declaring a to 1

function getRandomNumber(){
    return 4; // chosen by fair dice roll.
              // guaranteed to be random.
}

/* A block comment before code */ var b = 2;

var c = 3; /* A block comment after code */
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-inline-comments: "error"*/

// This is a comment above a line of code
var foo = 5;

var bar = 5;
//This is a comment below a line of code
```

:::

### JSX exception

JSX 中大括号内的注释允许与大括号在同一行，但前提是它们不能与其他代码在同一行，而且大括号不包含实际的表达。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-inline-comments: "error"*/

var foo = <div>{ /* On the same line with other code */ }<h1>Some heading</h1></div>;

var bar = (
    <div>
    {   // These braces are not just for the comment, so it can't be on the same line
        baz
    }
    </div>
);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-inline-comments: "error"*/

var foo = (
    <div>
      {/* These braces are just for this comment and there is nothing else on this line */}
      <h1>Some heading</h1>
    </div>
)

var bar = (
    <div>
    {
        // There is nothing else on this line
        baz
    }
    </div>
);

var quux = (
    <div>
      {/*
        Multiline
        comment
      */}
      <h1>Some heading</h1>
    </div>
)
```

:::

## 选项

### ignorePattern

要使这个规则忽略特定的注释，请将 `ignorePattern` 选项设置为一个字符串模式，该模式将被传递给 [`RegExp` 构造函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp)。

使用 `ignorePattern` 选项的**正确**示例：

::: correct

```js
/*eslint no-inline-comments: ["error", { "ignorePattern": "webpackChunkName:\\s.+" }]*/

import(/* webpackChunkName: "my-chunk-name" */ './locale/en');
```

:::

使用 `ignorePattern` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-inline-comments: ["error", { "ignorePattern": "something" }] */

var foo = 4; // other thing
```

:::
