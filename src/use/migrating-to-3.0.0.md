---
title: 迁移至 v3.0.0

---

ESLint v3.0.0 是第三个主要发行版。此版本有几个破坏性变更，不过问题不大，不需要 ESLint 用户进行大规模修改。而本指南旨在引导你了解这些变化。

## 放弃支持 Node.js < 4

随着 ESLint v3.0.0 的发布，我们放弃了对 Node.js 4 之前版本的支持。Node.js 0.10 和 0.12 处于[维护模式](https://github.com/nodejs/Release)，而 Node.js 4 则是当前的长期支持（LTS）版。如果老版的 Node.js，我们建议你尽可能升级到至少得是 Node.js 4。如果你无法升级到 Node.js 4 或更高版本，那我们建议你在准备好升级 Node.js 前继续使用 ESLint v2.x。

**重要**：我们将不再更新ESLint v2.x版本。所有的错误修复和功能都将仅限于 ESLint v3.x 版本。

## 运行时需要配置

ESLint v3.0.0 现在需要有配置才能运行。以下几种都属于配置：

1. 无论在项目或主目录的 `.eslintrc.js`、`.eslintrc.json`、`.eslintrc.yml`、`.eslintrc.yaml` 或 `.eslintrc` 文件。
2. 在命令行中使用 `--rule` 传递配置选项（或使用 `rules` 传递给 CLIEngine）。
3. 在命令行中使用 `-c` 传递配置文件（或使用 `configFile` 传递给 CLIEngine）。
4. 使用 `baseConfig` 选项为 CLIEngine 提供一个基本配置。

如果 ESLint 找不到配置，那么它会抛出错误并要求提供配置。

此改变有助于缓解 ESLint 新用户的困惑，ESLint 除了报告解析器错误外，默认情况下什么都不做。我们预计这一变化对大多数老用户几乎没有影响，因为你很可能已经有了配置文件。

**解决方案**：无论什么时候运行 ESLint，你都需要确保用了配置。但你仍然可以在没有配置的情况下运行 ESLint，方法就是在命令行上传递 `--no-eslintrc` 选项或将 `CLIEngine` 的 `useEslintrc` 选项设置为 `false`。

要创建新的配置，请运行 `eslint --init`。

## `"eslint:recommended"` 变更

```json
{
    "extends": "eslint:recommended"
}
```

在 3.0.0 中，`"eslint:recommended"` 新增了下列规则：

* [`no-unsafe-finally`](../rules/no-unsafe-finally)帮助捕获与预期不一致的 `finally` 子句。
* [`no-native-reassign`](../rules/no-native-reassign)以前是 `no-undef` 的一部分，但由于作为另一条规则的一部分没有意义而独立处理。`no-native-reassign` 规则会在你试图覆盖只读的全局变量时发出警告。
* [`require-yield`](../rules/require-yield) 帮助识别没有 `yield` 关键字的生成器函数。

`"eslint:recommended"` 移除了下列规则：

* [`comma-dangle`](../rules/comma-dangle) 曾经被推荐使用，因为 Internet Explorer 8 和更早的版本在发现对象字面属性上的尾随逗号时会报语法错误。然而，[Internet Explorer 8 在 2016 年 1 月结束了声明](https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support)，同时所有其他积极更新的浏览器都允许尾随逗号。因此，我们认为尾随逗号现在是风格问题，而不是错误。

以下规则进行了修改：

* [`complexity`](../rules/complexity) 在 `eslint:recommended` 中曾经被硬编码将默认值改为 11，如果你打开规则而没有指定最大值则使用默认值。现在的默认值是 20。实际上，该规则的默认值就应该是 20，只不过 `eslint:recommended` 错误地覆盖了它。

**解决方案**：如果你想与 `eslint:recommended` 在 v2.x 中的工作方式类似，你可以使用以下方法：

```json
{
    "extends": "eslint:recommended",
    "rules": {
        "no-unsafe-finally": "off",
        "no-native-reassign": "off",
        "complexity": ["off", 11],
        "comma-dangle": "error",
        "require-yield": "error"
    }
}
```

## `CLIEngine#executeOnText()` 变更

`CLIEngine#executeOnText()` 方式修改得更像 `CLIEngine#executeOnFiles()`。在 v2.x 中，`CLIEngine#executeOnText()` 默认对被忽略的文件发出警告，且没有办法选择禁用这些警告，而 `CLIEngine#executeOnFiles()` 默认不对被忽略的文件发出警告，并且允许你选择加入对它们的警告。 `CLIEngine#executeOnText()` 方法现在也默认不对被忽略的文件发出警告，并允许你用一个新的第三个参数（布尔值，`true` 表示对被忽略的文件发出警告，`false` 表示不发出警告）选择加入。

**解决方案**：如果你正在项目中像这样使用 `CLIEngine#executeOnText()`：

```js
var result = engine.executeOnText(text, filename);
```

改用这个能获得一致的行为：

```js
var result = engine.executeOnText(text, filename, true);
```

如果你不想要在控制台中输出忽略文件警告，你可以省略第三个参数或传递 `false`。
