---
title: no-path-concat
layout: doc
rule_type: suggestion
---

此规则于 ESLint v7.0.0 中废弃，请使用 [`eslint-plugin-node`](https://github.com/mysticatea/eslint-plugin-node) 中的对应规则代替。

在 Node.js 中，`__dirname` 和 `__filename`全局变量分别包含了当前执行的脚本文件的目录路径和文件路径。有时，开发者试图使用这些变量来创建其他文件的路径，例如：

```js
var fullPath = __dirname + "/foo.js";
```

然而，这其中有几个问题。首先，你不能确定脚本是在什么类型的系统上运行。Node.js 可以在任何计算机上运行，包括 Windows，它使用不同的路径分隔符。因此，使用字符串连接和假设 Unix 风格的分隔符，很容易创建一个无效的路径。也有可能出现双重分隔符，或者以其他方式导致无效的路径。

为了避免在如何创建正确的路径方面出现混乱，Node.js 提供了 `path` 模块。这个模块使用系统特定的信息，总是返回正确的值。因此，你可以把前面的例子改写成。

```js
var fullPath = path.join(__dirname, "foo.js");
```

这个例子不需要包括分隔符，因为 `path.join()` 会以最合适的方式完成。另外，你可以使用 `path.resolve()` 来检索完全限定的路径。

```js
var fullPath = path.resolve(__dirname, "foo.js");
```

`path.join()` 和 `path.resolve()` 都适合在创建文件或目录路径时替代字符串连接法。

## 规则细节

本规则旨在防止 Node.js 中目录路径的字符串串联

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-path-concat: "error"*/

var fullPath = __dirname + "/foo.js";

var fullPath = __filename + "/foo.js";

```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-path-concat: "error"*/

var fullPath = dirname + "/foo.js";
```

:::

## 何时不用

如果你想允许路径名称的字符串串联。
