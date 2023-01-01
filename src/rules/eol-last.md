---
title: eol-last
rule_type: layout
---

在非空文件中拖动换行是一个常见的 UNIX 习惯做法。拖动新行的好处是 的好处包括能够连接或追加到文件以及 以及在不影响 shell 提示的情况下向终端输出文件。

## 规则细节

这条规则要求在非空文件的末尾至少有一个换行（或没有换行）。
的末尾至少有一个换行。

在 v0.16.0 之前，这条规则还强制要求在文件末尾只有一行 文件的结尾只有一行。如果你仍然想要这种行为，可以考虑启用 [no-multiple-empty-lines](no-multiple-empty-lines) 搭配 `maxEOF` 选项和 [no-trailing-spaces](no-trailing-spaces)。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint eol-last: ["error", "always"]*/

function doSomething() {
  var foo = 2;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint eol-last: ["error", "always"]*/

function doSomething() {
  var foo = 2;
}\n
```

:::

## 选项

此规则选项为字符串：

* `"always"`（默认值）强制要求文件以换行结束（LF）。
* `"never"` 强制要求文件不以换行结尾。
* `"unix"`（已废弃）与 `"always"` 相同。
* `"windows"`（已废弃）与 `"always"` 相同，但在自动修复时将使用 CRLF 字符。

**废弃**：选项 `"unix"` 和 `"windows"` 已被废弃。如果你需要强制执行特定的换行符样式，请将此规则与 `linebreak-style` 一起使用。
