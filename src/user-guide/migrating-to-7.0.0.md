---
title: 迁移至 v7.0.0

---

ESLint v7.0.0 是 ESLint 主要发行版。在此版本中有一些破坏性变更，而本指南旨在引导你了解这些变化。

下列内容大致按每项变化预计影响的用户数量排序，其中第一项为预计会影响最多的用户的变化。

## 目录

### 面向用户的破坏性变更

* [不再支持 Node.js 8](#drop-node-8)
* [默认检查与 `overrides[].files` 匹配的文件](#additional-lint-targets)
* [修改由 `--config`/`--ignore-path` 选项提供的配置文件的 `overrides` 和 `ignorePatterns` 的基本路径](#base-path-change)
* [更新 ESLint 加载插件的位置](#plugin-loading-change)
* [给 `~/.eslintrc.*` 配置文件添加运行时废弃警告](#runtime-deprecation-on-personal-config-files)
* [修改默认忽略模式](#default-ignore-patterns)
* [指令注释描述](#description-in-directive-comments)
* [废弃 Node.js/CommonJS 规则](#deprecate-node-rules)
* [更新几个规则以覆盖更多的情况](#rules-strict)
* [更新 `eslint:recommended`](#eslint-recommended)

### 面向插件开发者的破坏性变更

* [不再支持 Node.js 8](#drop-node-8)
* [默认检查与 `overrides[].files` 匹配的文件](#additional-lint-targets)
* [更新插件解决方案](#plugin-loading-change)
* [给 `RuleTester` 类添加额外的验证](#rule-tester-strict)

### 面向集成开发者的破坏性变更

* [不再支持 Node.js 8](#drop-node-8)
* [更新插件解决方案](#plugin-loading-change)
* [废弃 `CLIEngine` 类](#deprecate-cliengine)

---

## <a name="drop-node-8"></a> 不再支持 Node.js 8

Node.js 8 在 2019 年 12 月到达了生命的终点，我们在此版本中正式放弃了对它的支持。ESLint 现在支持以下版本 Node.js：

* Node.js 10 (`10.12.0` 以上）
* Node.js 12 以上

**解决方案**：在使用 ESLint v7.0.0 前，请确保你至少升级到 Node.js `10.12.0`。如果你使用 ESLint 编辑扩展那么要复查所用编辑器所支持的 Node.js 版本。我们推荐在能够升级 Node.js 版本前，继续使用 ESLint 6。

**相关议题**：[RFC44](https://github.com/eslint/rfcs/blob/master/designs/2019-drop-node8/README.md)、[#12700](https://github.com/eslint/eslint/pull/12700)

## <a name="additional-lint-targets"></a> 默认检查与 `overrides[].files` 匹配的文件

在 7.0.0 前，如果你指定了像 `eslint src` 这样的目录，ESLint 默认只检查扩展名为 `.js` 的文件。

而再 ESLint v7.0.0 中将额外检查其他扩展名的文件（`.ts`、`.vue` 等），如果该扩展名与 `overrides[].files` 条目明确匹配。用户将可以检查非 `*.js` 扩展的文件，而无需使用 `--ext` 命令行标志，也允许共享配置作者启用这些文件的提示，且不给最终用户带来额外的开销。请注意，以 `*` 结尾的模式不受此行为影响，其行为与之前一样。例如，如果有以下的配置文件：

```yml
# .eslintrc.yml
extends: my-config-js
overrides:
  - files: "*.ts"
    extends: my-config-ts
```

那么运行 `eslint src` 将检查 `src` 目录下的 `*.js` 和 `*.ts` 文件。

**解决方案**：使用 `--ext` CLI 选项将覆盖这个新行为。比如你使用 `--ext .js` 运行 ESLint，就只对有 `.js` 扩展名的文件进行检测。

如果你维护的插件检查的文件扩展名不是 `.js`，这个功能将允许你通过在你的 `recommended` 预设中配置 `overrides` 设置来默认检查这些文件。

**相关议题**：[RFC20](https://github.com/eslint/rfcs/blob/master/designs/2019-additional-lint-targets/README.md)、[#12677](https://github.com/eslint/eslint/pull/12677)

## <a name="base-path-change"></a> 修改由 `--config`/`--ignore-path` 选项提供的配置文件的 `overrides` 和 `ignorePatterns` 的基本路径

到目前为止，ESLint 会解析以下几种相对于配置文件的路径：

* 配置文件（`.eslintrc.*`）。
    * `overrides[].files` 设置中的相对路径
    * `overrides[].excludedFiles` 设置中的相对路径
    * 在 `ignorePatterns` 中设置的以 `/` 开头的路径
* 忽略的文件（`.eslintignore`）。
    * 以 `/` 开头的路径

从 ESLint v7.0.0 起，如果通过 `--config path/to/a-config` 和 `--ignore-path path/to/a-ignore` CLI 标志给 ESLint 传递配置文件和忽略文件，它将基于当前工作目录而非文件位置解析。这使得用户可以共享插件，而无需直接在项目中直接安装这些插件。

**解决方案**：如果你通过 `--config` 或 `--ignore-path` CLI 选项传递配置文件或忽略文件，请更新受影响的路径。

**相关议题**：[RFC37](https://github.com/eslint/rfcs/blob/master/designs/2019-changing-base-path-in-config-files-that-cli-options-specify/README.md)、[#12887](https://github.com/eslint/eslint/pull/12887)

## <a name="plugin-loading-change"></a> 更新插件解决方案

在以前的版本中，ESLint 默认基于当前工作目录解析所有插件。

从 ESLint v7.0.0 起，`plugins` 将相对于配置文件的目录路径进行解析。

这在大多数情况下不会有任何改变。如果子目录下的配置文件定义了 `plugins`，那么插件将从子目录（或者包括当前工作目录在内的祖先目录，如果找不到的话）加载。

这意味着，如果你使用 `--config` 选项使用共享位置的配置文件，配置文件声明的插件将从共享配置文件位置加载。

**解决方案**：确保插件安装在相对于配置文件解析的地方，或使用 `--resolve-plugins-relative-to .` 来覆盖这一变化。

**相关议题**：[RFC47](https://github.com/eslint/rfcs/blob/master/designs/2019-plugin-loading-improvement/README.md)、[#12922](https://github.com/eslint/eslint/pull/12922)

## <a name="runtime-deprecation-on-personal-config-files"></a> 给 `~/.eslintrc.*` 配置文件添加运行时废弃警告

[v6.7.0](https://eslint.org/blog/2019/11/eslint-v6.7.0-released) 起废弃了个人配置文件。而从 ESLint v7.0.0 起会在运行时输出废弃警告。以下几种情况会输出警告：

1. 当项目中没有配置文件时，ESLint 会加载 `~/.eslintrc.*` 配置。
2. 当项目中有配置文件时，而 ESLint 会忽略 `~/.eslintrc.*` 配置文件。当 `$HOME` 目录是项目的祖先目录，且项目的配置文件不包含 `root:true` 时，会出现这种情况。

**解决方案**：删除 `~/.eslintrc.*` 配置文件，并在项目中加入 `.eslintrc.*` 配置文件。或使用 `--config` 选项来使用共享配置文件。

**相关议题**：[RFC32](https://github.com/eslint/rfcs/tree/master/designs/2019-deprecating-personal-config/README.md)、[#12678](https://github.com/eslint/eslint/pull/12678)

## <a name="default-ignore-patterns"></a> 修改默认忽略模式

截止到目前，ESLint 默认忽略了以下文件：

* 点文件（`.*`）
* 当前工作目录下的 `node_modules`（`/node_modules/*`）
* 当前工作目录下的 `bower_components`（`/bower_components/*`）

ESLint v7.0.0 也会忽略子目录的 `node_modules/*`，但不再忽略 `bower_components/*` 和 `.eslintrc.js`。因此新的默认忽略模式是：

* 除了 `.eslintrc.*` 以外的点文件（除 `.eslintrc.*` 外的 `.*`）。
* `node_modules` (`/**/node_modules/*`)

**解决方案**：如果你不想检查 `bower_components/*` 和 `.eslintrc.js`，请修改 `.eslintignore` 或配置文件的 `ignorePatterns` 属性。

**相关议题**：[RFC51](https://github.com/eslint/rfcs/blob/master/designs/2019-update-default-ignore-patterns/README.md)、[#12888](https://github.com/eslint/eslint/pull/12888)

## <a name="description-in-directive-comments"></a> 指令注释描述

在旧版本的 ESLint 中，没有方便的方法来说明为什么要使用这个指令注释，比如要用 `/*eslint-disable*/`。

为了让注释和指令内容能放在一起，ESLint v7.0.0 中的指令注释可以附加任意文本，即忽略 `--` 后由空格包裹的文本。比如：

```js
// eslint-disable-next-line a-rule, another-rule -- those are buggy!!
```

**解决方案**：如果指令注释中的 `--` 周围有空白，请考虑把它移动到配置文件中。

**相关议题**：[RFC33](https://github.com/eslint/rfcs/blob/master/designs/2019-description-in-directive-comments/README.md)、[#12699](https://github.com/eslint/eslint/pull/12699)

## <a name="deprecate-node-rules"></a> 废弃 Node.js/CommonJS 规则

废弃了核心中的十个 Node.js/CommonJS 规则，并移动到 [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) 插件中。

**解决方案**：根据[我们的废弃策略](../user-guide/rule-deprecation)，在可见的未来，这些废弃的规则仍将保留在核心中，并且仍就可用。但我们将不再更新或修复这些规则的错误。建议使用插件中获支持的相应规则来代替。

| 废弃规则                                                             | 替代品                                                                                                                     |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| [callback-return](../rules/callback-return)             | [node/callback-return](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/callback-return.md)             |
| [global-require](../rules/global-require)               | [node/global-require](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/global-require.md)               |
| [handle-callback-err](../rules/handle-callback-err)     | [node/handle-callback-err](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/handle-callback-err.md)     |
| [no-mixed-requires](../rules/no-mixed-requires)         | [node/no-mixed-requires](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-mixed-requires.md)         |
| [no-new-require](../rules/no-new-require)               | [node/no-new-require](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-new-require.md)               |
| [no-path-concat](../rules/no-path-concat)               | [node/no-path-concat](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-path-concat.md)               |
| [no-process-env](../rules/no-process-env)               | [node/no-process-env](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-process-env.md)               |
| [no-process-exit](../rules/no-process-exit)             | [node/no-process-exit](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-process-exit.md)             |
| [no-restricted-modules](../rules/no-restricted-modules) | [node/no-restricted-require](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-restricted-require.md) |
| [no-sync](../rules/no-sync)                             | [node/no-sync](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-sync.md)                             |

**相关议题**：[#12898](https://github.com/eslint/eslint/pull/12898)

## <a name="rules-strict"></a> 更新几个规则以覆盖更多的情况

一些规则得到了加强，现在可以报告更多的错误。

* [accessor-pairs](../rules/accessor-pairs) 规则现在可以默认识别类成员了。
* [array-callback-return](../rules/array-callback-return) 规则现在可以识别 `flatMap` 方法。
* [computed-property-spacing](../rules/computed-property-spacing) 规则现在可以默认识别类的成员。
* [func-names](../rules/func-names) 规则现在可以识别默认导出中的函数声明了。
* [no-extra-parens](../rules/no-extra-parens) 规则现在可以识别赋值目标中的括号了。
* [no-dupe-class-members](../rules/no-dupe-class-members) 规则现在可以识别静态类成员的计算键。
* [no-magic-numbers](../rules/no-magic-numbers) 规则现在可以识别大数字了。
* [radix](../rules/radix) 规则现在可以识别 `parseInt()` 的第二个参数的无效数字。
* [use-isnan](../rules/use-isnan) 规则现在可以默认识别类成员了。
* [yoda](../rules/yoda) 规则现在可以识别大数字了。

**解决方案**：修正错误或禁用这些规则。

**相关议题**：[#12490](https://github.com/eslint/eslint/pull/12490)、[#12608](https://github.com/eslint/eslint/pull/12608)、[#12670](https://github.com/eslint/eslint/pull/12670)、[#12701](https://github.com/eslint/eslint/pull/12701)、[#12765](https://github.com/eslint/eslint/pull/12765)、[#12837](https://github.com/eslint/eslint/pull/12837)、[#12913](https://github.com/eslint/eslint/pull/12913)、[#12915](https://github.com/eslint/eslint/pull/12915)、[#12919](https://github.com/eslint/eslint/pull/12919)

## <a name="eslint-recommended"></a> 更新 `eslint:recommended`

`eslint:recommended` 预设启用了三个新规则：

* [no-dupe-else-if](../rules/no-dupe-else-if)
* [no-import-assign](../rules/no-import-assign)
* [no-setter-return](../rules/no-setter-return)

**解决方案**：修正错误或禁用这些规则。

**相关议题**：[#12920](https://github.com/eslint/eslint/pull/12920)

## <a name="rule-tester-strict"></a> 给 `RuleTester` 类添加额外的验证

`RuleTester` 现在验证以下内容：

* 如果测试的规则使用非标准的 `node.start` 或 `node.end` 属性会测试失败。规则应该使用 `node.range` 代替它们。
* 如果测试的规则提供了自动修复，但测试用例没有 `output` 属性就会测试失败。在测试用例中添加 `output` 属性，以测试规则的自动修复功能。
* 如果在 `errors` 属性的对象中发现任何未知的属性，会导致测试失败。

**解决方案**：如果现有的测试失败了，可以修改规则或测试用例。

**相关议题**：[RFC25](https://github.com/eslint/rfcs/blob/master/designs/2019-rule-tester-improvements/README.md), [#12096](https://github.com/eslint/eslint/pull/12096), [#12955](https://github.com/eslint/eslint/pull/12955)

## <a name="deprecate-cliengine"></a> 废弃 `CLIEngine` 类

废弃 [`CLIEngine` 类](../developer-guide/nodejs-api#cliengine)，并用 [`ESLint` 类](../developer-guide/nodejs-api#eslint-class) 取代。

`CLIEngine` 类提供了同步 API，它阻碍了一些功能的实现，如并行刷新，在可共享的配置/解析器/插件/格式化工具中支持 ES 模块，并增加了可视化显示刷新运行进度的能力。新的 `ESLint` 类提供了一个异步的 API，ESLint 核心将继续使用。`CLIEngine` 在可预见的未来将保留在核心中，但在未来的主要版本中可能会被删除。

**解决方案**：果你正在使用 `CLIEngine`，更新代码以使用新的 `ESLint` 类。下表列出了 `CLIEngine` 方法对应的 `ESLint` 方法：

| `CLIEngine`                                  | `ESLint`                           |
| :------------------------------------------- | :--------------------------------- |
| `executeOnFiles(patterns)`                   | `lintFiles(patterns)`              |
| `executeOnText(text, filePath, warnIgnored)` | `lintText(text, options)`          |
| `getFormatter(name)`                         | `loadFormatter(name)`              |
| `getConfigForFile(filePath)`                 | `calculateConfigForFile(filePath)` |
| `isPathIgnored(filePath)`                    | `isPathIgnored(filePath)`          |
| `static outputFixes(results)`                | `static outputFixes(results)`      |
| `static getErrorResults(results)`            | `static getErrorResults(results)`  |
| `static getFormatter(name)`                  | (移除※1)                           |
| `addPlugin(pluginId, definition)`            | `plugins` 构造函数选项              |
| `getRules()`                                 | (移除※2)                           |
| `resolveFileGlobPatterns()`                  | (移除※3)                           |

* ※1 `engine.getFormatter()` 方法目前按原样返回加载的包的对象，由于向后兼容的原因，这使得很难向格式化工具添加新功能。新的 `eslint.loadFormatter()` 方法返回适配器对象，该对象包装了加载的包的对象，以简化添加新特性的过程。此外，适配器对象可以访问 `ESLint` 实例来计算默认数据（例如，使用加载的插件规则来制作 `rulesMeta`）。因此，`ESLint` 类只实现了 `loadFormatter()` 方法的实例版本。
* ※2 从 ESLint v6.0.0 起，ESLint 就使用 `resolveFileGlobPatterns()` 方法的不同逻辑来迭代文件，这个方法已经过时了。

**相关议题**：[RFC40](https://github.com/eslint/rfcs/blob/master/designs/2019-move-to-async-api/README.md)、[#12939](https://github.com/eslint/eslint/pull/12939)
