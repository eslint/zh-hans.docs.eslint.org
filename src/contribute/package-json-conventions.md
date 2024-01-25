---
title: Package.json 约定
eleventyNavigation:
    key: package.json conventions
    parent: contribute to eslint
    title: Package.json Conventions
    order: 8
---

以下内容适用于 `package.json` 文件中的 `scripts` 部分。

## 名称

npm 脚本名称必须仅包含小写字母，使用 `:` 分隔部分，使用 `-` 分隔单词，使用 `+` 分隔文件扩展名。每个部分的名称应该是一个完整的英文单词（例如，使用 `coverage` 而不是 `cov`），或者是一个所有字母小写的常见缩写（例如，`wasm`）。

下面是 ABNF 中提出的这一约定的摘要。

```abnf
name         = life-cycle / main target? option* ":watch"?
life-cycle   = "prepare" / "preinstall" / "install" / "postinstall" / "prepublish" / "preprepare" / "prepare" / "postprepare" / "prepack" / "postpack" / "prepublishOnly"
main         = "build" / "lint" ":fix"? / "release" / "start" / "test" / "fetch"
target       = ":" word ("-" word)* / extension ("+" extension)*
option       = ":" word ("-" word)*
word         = ALPHA +
extension    = ( ALPHA / DIGIT )+
```

## 顺序

脚本名必须以字母顺序出现在 package.json 文件中。本文档中提到的其他约定可确保字母顺序与逻辑分组一致。

## 主要脚本名

除了 [npm 生命周期脚本](https://docs.npmjs.com/cli/v8/using-npm/scripts#life-cycle-scripts) 外，所有脚本名称必须以以下名称之一开头。

### Build

生成一组文件，这些文件是从源代码和/或数据生成的，脚本的名称必须以 `build` 开头。

如果一个包包含任何 `build:*` 脚本，那么可能会有一个名为 `build` 的脚本。如果有，它应该生成与单独运行每个 `build` 脚本相同的输出。它必须生成从运行这些脚本中的每一个脚本生成的输出的子集。

### Fetch

生成数据或资源来自外部文件的脚本，必须以 `fetch` 开头命名。

如果一个包含任何 `fetch:*` 脚本，可能会有一个名为 `fetch` 的脚本。如果有的话，它应该产生与单独运行每个 `fetch` 脚本相同的输出。它必须产生运行这些脚本时输出的一个子集。

### Release

具有公共副作用（发布网站、提交到 Git 等）的脚本名称必须以 `release` 开头。

### Lint

静态分析文件的脚本（主要是运行 `eslint` 本身）的名称必须以 `lint` 开头。

如果一个包包含任何 `lint:*` 脚本，那么应该有一个名为 `lint` 的脚本，它必须运行如果每个 `lint:*` 脚本分别调用将运行的所有检查。

如果修复是可用的，除非脚本包含 `:fix` 修饰符（参见下文），否则擦除必须不应用修复。

### Start

`start` 脚本用于启动服务器。截至本文写作时，没有 ESLint 包有多个 `start` 脚本，因此 `start` 不需要任何修饰符。

### Test

执行代码以确保实际行为与预期行为匹配的脚本必须以 `test` 开头。

如果一个包包含任何 `test:*` 脚本，那么应该有一个名为 `test` 的脚本，它必须运行如果每个 `test:*` 脚本分别调用将运行的所有测试。

测试脚本不应包括代码检查。

测试脚本在可能的情况下应报告测试覆盖率。

## 修饰符

可以在上述标准脚本名称之后添加一个或多个以下修饰符。如果目标具有修饰符，它们必须按下面出现的顺序（例如，`lint:fix:js:watch`，而不是 `lint:watch:js:fix`）。

### Fix

如果代码检查工具有能力修复它找到的问题，请在脚本名称的末尾添加 `:fix` 修饰符，以执行修复操作。

### Target

正在运行的操作的目标名称。对于 `build` 脚本，应该标识生成的构建工件，例如“javascript”、“css”或“website”。对于 `lint` 或 `test` 脚本，应该标识正在进行代码检查或测试的项目。对于 `start` 脚本，应该标识要启动的服务器。

目标可以引用一系列受影响的文件扩展名（例如 `cjs` 或 `less`），用 `+` 分隔。如果有多个扩展名，列表应该按字母顺序排列。当文件扩展名有变体时（例如 CommonJS 的 `cjs` 和 ESM 的 `mjs`），可以使用扩展名的共同部分，而不是明确列出所有变体（例如 `js`，而不是 `cjs+jsx+mjs`）。

目标不应该引用执行操作的工具的名称（例如 `eleventy`、`webpack` 等）。

### Options

添加不适合其他修饰符的附加选项。

### Watch

如果脚本监视文件系统并响应更改，请在脚本名称中添加 `:watch`。
