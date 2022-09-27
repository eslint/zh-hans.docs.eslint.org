---
title: linebreak-style
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/linebreak-style.md
rule_type: layout
---

当与很多人一起开发时，他们都有不同的编辑器、VCS 应用程序和操作系统，可能会出现以下情况 不同的行结尾被上述任何一个人写入（特别是在一起使用 SourceTree 的 windows 和 mac 版本时可能会发生）。

在 windows 操作系统中使用的断行符（新行）通常是**回车**（CR），然后是**换行**（LF），使其成为_回车换行_（CRLF）。而 Linux 和 Unix 则使用简单的**换行**（LF）。相应的_控制序列_是 `"\n"`（用于 LF）和 `"\r\n"`（用于 CRLF）。

许多版本系统（如 git 和 subversion）可以自动确保正确的结局。然而为了涵盖所有的意外情况，你可以激活这个规则。

## 规则细节

这条规则使你的代码库中的行尾一致，与操作系统、VCS 或编辑器无关。

### 选项

此规则选项为字符串：

* `"unix"`（默认值）加强了 Unix 行尾的使用。`\n` 代表 LF。
* `"windows"` 强制使用 Windows 的行尾。`r\n` 代表 CRLF。

### unix

使用此规则与默认的 `"unix"` 选项的**错误**示例：

::: incorrect

```js
/*eslint linebreak-style: ["error", "unix"]*/

var a = 'a'; // \r\n

```

:::

使用此规则与默认的 `"unix"` 选项的**正确**示例：

::: correct

```js
/*eslint linebreak-style: ["error", "unix"]*/

var a = 'a', // \n
    b = 'b'; // \n
// \n
function foo(params) { // \n
    // do stuff \n
}// \n
```

:::

### windows

使用此规则与 `"windows"` 选项的**错误**示例：

::: incorrect

```js
/*eslint linebreak-style: ["error", "windows"]*/

var a = 'a'; // \n
```

:::

使用此规则与 `"windows"` 选项的**正确**示例：

::: correct

```js
/*eslint linebreak-style: ["error", "windows"]*/

var a = 'a', // \r\n
    b = 'b'; // \r\n
// \r\n
function foo(params) { // \r\n
    // do stuff \r\n
} // \r\n
```

:::

### 将此规则用于版本控制系统

版本控制系统有时对断行有特殊的行为。为了方便开发者在不同的平台上为你的代码库做贡献，你可能想配置你的 VCS 来适当地处理换行。

例如，Windows 系统上 [git](https://git-scm.com/) 的默认行为是在签出文件时将 LF 换成 CRLF，但在提交修改时将换行存储为 LF。如果配置为 `"unix"`，这将导致 `linebreak-style` 规则报错，因为 ESLint 看到的文件会有 CRLF 换行符。如果你使用 git，你可能想在你的 [`.gitattributes`文件](https://git-scm.com/docs/gitattributes) 中添加一行，以防止 git 在 `.js` 文件中转换行距。

```txt
*.js text eol=lf
```

## 何时不用

如果你不担心在你的代码中出现不同的行尾，那么你可以安全地关闭这个规则。

## 兼容

* **JSCS**：[validateLineBreaks](https://jscs-dev.github.io/rule/validateLineBreaks)
