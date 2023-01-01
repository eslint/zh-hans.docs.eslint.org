---
title: no-mixed-requires
rule_type: suggestion
---

此规则于 ESLint v7.0.0 中废弃，请使用 [`eslint-plugin-node`](https://github.com/mysticatea/eslint-plugin-node) 中的对应规则代替。

在 Node.js 社区，人们通常习惯于将调用 `require` 模块的初始化与其他变量声明分开，有时还按模块的类型分组。这个规则可以帮助你执行这个惯例。

## 规则细节

当这个规则被启用时，每个 `var` 语句必须满足以下条件。

* 没有或所有变量声明必须是 require 声明（默认）。
* 所有的 requirement 声明必须是相同的类型（分组）

这条规则区分了六种变量声明的类型：

* `core`：声明必要的[核心模块][1]
* `file`: 声明必要的[文件模块][2]
* `module`: 声明来自 [node_modules 文件夹][3] 的必要模块
* `computed`: 声明所需的模块，其类型无法确定（要么是因为它是计算出来的，要么是因为 require 的调用没有参数）
* `uninitialized`: 一个没有被初始化的声明
* `other`：任何其他类型的声明。

在本文件中，前四种类型被归纳为 **require 声明**这一术语。

```js
var fs = require('fs'),        // "core"     \
    async = require('async'),  // "module"   |- these are "require declaration"s
    foo = require('./foo'),    // "file"     |
    bar = require(getName()),  // "computed" /
    baz = 42,                  // "other"
    bam;                       // "uninitialized"
```

## 选项

这个规则可以有一个对象字面的选项，其两个属性默认为 `false` 值。

用一个布尔值选项 `true` 来配置这个规则是不可取的。

使用此规则与默认的 `{ "grouping": false, "allowCall": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-mixed-requires: "error"*/

var fs = require('fs'),
    i = 0;

var async = require('async'),
    debug = require('diagnostics').someFunction('my-module'),
    eslint = require('eslint');
```

:::

使用此规则与默认的 `{ "grouping": false, "allowCall": false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-mixed-requires: "error"*/

// only require declarations (grouping off)
var eventEmitter = require('events').EventEmitter,
    myUtils = require('./utils'),
    util = require('util'),
    bar = require(getBarModuleName());

// only non-require declarations
var foo = 42,
    bar = 'baz';

// always valid regardless of grouping because all declarations are of the same type
var foo = require('foo' + VERSION),
    bar = require(getBarModuleName()),
    baz = require();
```

:::

### grouping

使用此规则与 `{ "grouping": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-mixed-requires: ["error", { "grouping": true }]*/

// invalid because of mixed types "core" and "module"
var fs = require('fs'),
    async = require('async');

// invalid because of mixed types "file" and "unknown"
var foo = require('foo'),
    bar = require(getBarModuleName());
```

:::

### allowCall

使用此规则与 `{ "allowCall": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-mixed-requires: ["error", { "allowCall": true }]*/

var async = require('async'),
    debug = require('diagnostics').someFunction('my-module'), /* allowCall doesn't allow calling any function */
    eslint = require('eslint');
```

:::

使用此规则与 `{ "allowCall": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-mixed-requires: ["error", { "allowCall": true }]*/

var async = require('async'),
    debug = require('diagnostics')('my-module'),
    eslint = require('eslint');
```

:::

## 已知限制

* 该实现不知道任何名称为 `require` 的本地函数可能会影射 Node.js 的全局 `require`。

* 在内部，核心模块的列表是通过 `require("rep")._builtinLibs` 检索的。如果你在 ESLint 和你的应用程序中使用不同版本的 Node.js，每个版本的核心模块列表可能是不同的。
  上面提到的 `_builtinLibs` 属性在 0.8 版本中开始使用，对于早期版本，硬编码的模块名称列表被用作后备。如果你的 Node.js 版本早于 0.6，该列表可能是不准确的。

## 何时不用

如果你使用 [UMD][4] 这样的模式，在变量声明中不加载 `require`d 模块，这个规则显然对你毫无帮助。

[1]: https://nodejs.org/api/modules.html#modules_core_modules
[2]: https://nodejs.org/api/modules.html#modules_file_modules
[3]: https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders
[4]: https://github.com/umdjs/umd
