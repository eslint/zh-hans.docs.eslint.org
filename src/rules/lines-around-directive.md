---
title: lines-around-directive
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/lines-around-directive.md
rule_type: layout
related_rules:
- lines-around-comment
- padded-blocks
---

此规则在 ESLint v4.0.0 中被 [padding-line-between-statements](padding-line-between-statements) 规则所取代，并被**废弃**。

在 JavaScript 中，指令被用来向执行环境表明一个脚本希望选择 `"strict mode"` 这样的特性。指令被分组在文件或函数块顶部的 [directive prologue](https://www.ecma-international.org/ecma-262/7.0/#directive-prologue) 中，并被应用到它们出现的范围中。

```js
// Strict mode is invoked for the entire script
"use strict";

var foo;

function bar() {
  var baz;
}
```

```js
var foo;

function bar() {
  // Strict mode is only invoked within this function
  "use strict";

  var baz;
}
```

## 规则细节

这条规则要求或不允许在指令的序言部分使用空白换行。这条规则并不强制执行关于各个指令之间的空白换行的任何约定。此外，它也不要求指令序言前的空白换行，除非它们前面有注释。如果你想执行这种风格，请使用 [padded-blocks](padded-blocks) 规则。

## 选项

这个规则有一个选项。它可以是一个字符串，也可以是一个对象：

* `"always"`（默认值）执行指令周围的空白换行。
* `"never"`不允许指令周围有空白的新行。

或

```js
{
  "before": "always" or "never"
  "after": "always" or "never",
}
```

### always

这是默认的选项。

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/* eslint lines-around-directive: ["error", "always"] */

/* Top of file */
"use strict";
var foo;

/* Top of file */
// comment
"use strict";
"use asm";
var foo;

function foo() {
  "use strict";
  "use asm";
  var bar;
}

function foo() {
  // comment
  "use strict";
  var bar;
}
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/* eslint lines-around-directive: ["error", "always"] */

/* Top of file */
"use strict";

var foo;

/* Top of file */
// comment

"use strict";
"use asm";

var foo;

function foo() {
  "use strict";
  "use asm";

  var bar;
}

function foo() {
  // comment

  "use strict";

  var bar;
}
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/* eslint lines-around-directive: ["error", "never"] */

/* Top of file */

"use strict";

var foo;

/* Top of file */
// comment

"use strict";
"use asm";

var foo;

function foo() {
  "use strict";
  "use asm";

  var bar;
}

function foo() {
  // comment

  "use strict";

  var bar;
}
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/* eslint lines-around-directive: ["error", "never"] */

/* Top of file */
"use strict";
var foo;

/* Top of file */
// comment
"use strict";
"use asm";
var foo;

function foo() {
  "use strict";
  "use asm";
  var bar;
}

function foo() {
  // comment
  "use strict";
  var bar;
}
```

:::

### before & after

使用此规则与 `{ "before": "never", "after": "always" }` 选项的**错误**示例：

::: incorrect

```js
/* eslint lines-around-directive: ["error", { "before": "never", "after": "always" }] */

/* Top of file */

"use strict";
var foo;

/* Top of file */
// comment

"use strict";
"use asm";
var foo;

function foo() {
  "use strict";
  "use asm";
  var bar;
}

function foo() {
  // comment

  "use strict";
  var bar;
}
```

:::

使用此规则与 `{ "before": "never", "after": "always" }`  选项的**正确**示例：

::: correct

```js
/* eslint lines-around-directive: ["error", { "before": "never", "after": "always" }] */

/* Top of file */
"use strict";

var foo;

/* Top of file */
// comment
"use strict";
"use asm";

var foo;

function foo() {
  "use strict";
  "use asm";

  var bar;
}

function foo() {
  // comment
  "use strict";

  var bar;
}
```

:::

使用此规则与 `{ "before": "always", "after": "never" }` 选项的**错误**示例：

::: incorrect

```js
/* eslint lines-around-directive: ["error", { "before": "always", "after": "never" }] */

/* Top of file */
"use strict";

var foo;

/* Top of file */
// comment
"use strict";
"use asm";

var foo;

function foo() {
  "use strict";
  "use asm";

  var bar;
}

function foo() {
  // comment
  "use strict";

  var bar;
}
```

:::

使用此规则与 `{ "before": "always", "after": "never" }` 选项的**正确**示例：

::: correct

```js
/* eslint lines-around-directive: ["error", { "before": "always", "after": "never" }] */

/* Top of file */
"use strict";
var foo;

/* Top of file */
// comment

"use strict";
"use asm";
var foo;

function foo() {
  "use strict";
  "use asm";
  var bar;
}

function foo() {
  // comment

  "use strict";
  var bar;
}
```

:::

## 何时不用

如果你对指令性序言前后是否应该有空白换行没有任何严格的约定，你可以安全地禁用这一规则。

## 兼容

* **JSCS**：[requirePaddingNewLinesAfterUseStrict](https://jscs-dev.github.io/rule/requirePaddingNewLinesAfterUseStrict)
* **JSCS**：[disallowPaddingNewLinesAfterUseStrict](https://jscs-dev.github.io/rule/disallowPaddingNewLinesAfterUseStrict)
