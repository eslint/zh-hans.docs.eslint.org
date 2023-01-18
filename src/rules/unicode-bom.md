---
title: unicode-bom
rule_type: layout
---

Unicode 字节顺序标记（Unicode Byte Order Mark, BOM）用于指定代码单元是大字节还是小字节。也就是说，最高有效字节还是最低有效字节在前。UTF-8 不需要 BOM，因为当字符是单个字节时字节顺序无关紧要。由于 UTF-8 是 web 的主要编码，所以将 `"never"` 作为默认选项。

## 规则细节

如果使用 `"always"` 选项，该规则要求文件始终以
用 Unicode BOM 字符 U+FEFF。如果使用 `"never"`，文件就不能以 U+FEFF 开头。

## 选项

此规则选项为字符串：

* `"always"` 文件必须以 Unicode BOM 开始
* `"never"`（默认值）文件不得以 Unicode BOM 开头

### always

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint unicode-bom: ["error", "always"]*/

U+FEFF
var abc;
```

:::

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint unicode-bom: ["error", "always"]*/

var abc;
```

:::

### never

使用此规则与默认的 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint unicode-bom: ["error", "never"]*/

var abc;
```

:::

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint unicode-bom: ["error", "never"]*/

U+FEFF
var abc;
```

:::

## 何时不用

如果你使用一些 UTF-16 或 UTF-32 文件，并且你想允许一个文件有选择地以 Unicode BOM 开头，你应该关闭这个规则。
