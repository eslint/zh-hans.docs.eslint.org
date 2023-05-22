---
title: 迁移至 v8.0.0
eleventyNavigation:
    key: migrate to v8
    parent: use eslint
    title: 迁移至 v8.x
    order: 7
---

ESLint v8.0.0 是 ESLint 主要发行版。在此版本中有一些破坏性变更，而本指南旨在引导你了解这些变化。

下列内容大致按每项变化预计影响的用户数量排序，其中第一项为预计会影响最多的用户的变化。

## 目录

### 面向用户的破坏性变更

* [不再支持 Node.js 10、13 和 15](#drop-old-node)
* [移除格式化工具 `codeframe` 和 `table`](#removed-formatters)
* [更严格的 `comma-dangle` 规则模型](#comma-dangle)
* [现在可以修复未使用的禁用指令了](#directives)
* [更新了 `eslint:recommended`](#eslint-recommended)

### 面向插件开发者的破坏性变更

* [不再支持 Node.js 10、13 和 15](#drop-old-node)
* [规则需要使用 `meta.hasSuggestions` 以提供建议](#suggestions)
* [规则需要使用 `meta.fixable` 以提供修复](#fixes)
* [在 `RuleTester` 中使用 `SourceCode#getComments()` 失败](#get-comments)
* [修改 AST 格式简写属性](#ast-format)

### 面向集成开发者的破坏性变更

* [不再支持 Node.js 10、13 和 15](#drop-old-node)
* [移除 `CLIEngine` 类](#remove-cliengine)
* [移除 `linter` 对象](#remove-linter)
* [移除 `/lib` 入口](#remove-lib)

---

## <a name="drop-old-node"></a> 不再支持 Node.js 10、13 和 15

Node.js 10、13 和 15 都在 2020 年或 2021 年初到达了生命的终点。ESLint 将在 ESLint v8.0.0 起正式放弃支持这些 Node.js 版本。现在 ESLint 仅支持下列 Node.js 版本：

* Node.js 12.22 以上
* Node.js 14 以上
* Node.js 16 以上

**解决方案**：在使用 ESLint v8.0.0 前，请确保至少升级到 Node.js `12.22.0`。如果你使用 ESLint 编辑扩展那么要复查所用编辑器所支持的 Node.js 版本。我们推荐在能够升级 Node.js 版本前，继续使用 ESLint 7。

**相关议题**：[#14023](https://github.com/eslint/eslint/issues/14023)

## <a name="removed-formatters"></a> 移除格式化工具 `codeframe` 和 `table`

ESLint v8.0.0 从核心中移除了 `codeframe` 和 `table` 格式化工具。ESLint 其他部分不会复用这些格式化工具依赖，删除它们可以压缩 ESLint 大小，并获得更快的安装速度。

**解决方案**：如果你正在使用 `codeframe` 或 `table` 格式化工具，你需要分别安装 [`eslint-formatter-codeframe`](https://github.com/fregante/eslint-formatter-codeframe) 或[`eslint-formatter-table`](https://github.com/fregante/eslint-formatter-table) 独立分包以在 ESLint v8.0.0 中使用它们。

**相关议题**：[#14277](https://github.com/eslint/eslint/issues/14277)、[#14316](https://github.com/eslint/eslint/pull/14316)

## <a name="comma-dangle"></a> 更严格的 `comma-dangle` 规则模型

在 ESLint v7.0.0 中，这样配置 `comma-dangle` 规则不会有问题：

```json
{
    "rules": {
        "comma-dangle": ["error", "never", { "arrays": "always" }]
    }
}
```

在此配置下，规则会忽略数组中的第三个元素，因为只读取第二个元素。而在 ESLint v8.0.0 中，此配置会导致 ESLint 抛出错误。

**解决方案**：将你的规则配置修改成数组中仅有两个元素，且第二个元素是字符串或对象，比如：

```json
{
    "comma-dangle": ["error", "never"],
}
```

或

```json
{
    "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "never",
        "imports": "never",
        "exports": "never",
        "functions": "never"
    }]
}
```

**相关议题**：[#13739](https://github.com/eslint/eslint/issues/13739)

## <a name="directives"></a> 现在可以修复未使用的禁用指令了

在 ESLint v7.0.0 中，同时在命令行中使用 `--report-unused-disable-directives` 和 `--fix` 只会修复规则但却保留未使用的禁用指令。在 ESLint v8.0.0 中，这种命令行选项组合将删除删除未使用的禁用指令。

**解决方案**：如果你正在命令行中同时使用 `--report-unused-disable-directives` 和 `--fix` 命令行，且不想删除未使用的禁用指令，请添加 `--fix-type problem,suggestion,layout` 命令行选项。

**相关议题**：[#11815](https://github.com/eslint/eslint/issues/11815)

## <a name="eslint-recommended"></a> 更新了 `eslint:recommended`

`eslint:recommended` 预设启用了四个新的规则：

* [`no-loss-of-precision`](../rules/no-loss-of-precision)
* [`no-nonoctal-decimal-escape`](../rules/no-nonoctal-decimal-escape)
* [`no-unsafe-optional-chaining`](../rules/no-unsafe-optional-chaining)
* [`no-useless-backreference`](../rules/no-useless-backreference)

**解决方案**：修复错误或禁用这些规则。

**相关议题**：[#14673](https://github.com/eslint/eslint/issues/14673)

## <a name="suggestions"></a> 规则需要使用 `meta.hasSuggestions` 以提供建议

在 ESLint v7.0.0 中，规则[提供建议](../extend/custom-rules#providing-suggestions)不需要让 ESLint 知道。在 v8.0.0 中，规则提供建议需要将 `meta.hasSuggestions` 设置为 `true`。这会告诉 ESLint 规则打算提供建议，如果没有这个属性，任何试图提供建议的行为都会导致错误。

**解决方案**：如果你的规则提供了建议，请像这样添加 `meta.hasSuggestions` 对象：

```js
module.exports = {
    meta: {
        hasSuggestions: true
    },
    create(context) {
        // 你的规则
    }
};
```

[eslint-plugin/require-meta-has-suggestions](https://github.com/not-an-aardvark/eslint-plugin-eslint-plugin/blob/master/docs/rules/require-meta-has-suggestions.md) 规则可以自动修复并强制指定规则的 `meta.hasSuggestions`。

**相关议题**：[#14312](https://github.com/eslint/eslint/issues/14312)

## <a name="fixes"></a> 规则需要使用 `meta.fixable` 以提供修复

在 ESLint v7.0.0 中，写成函数（而非对象）的规则能提供修复。在 ESLint v8.0.0 中，只有写成对象的规则才允许提供修复，且必须将 `meta.fixable` 属性设置为 `"code"` 或 `"whitespace"`。

**解决方案**：如果你的规则可以进行修复并写为函数，比如：

```js
module.exports = function(context) {
    // 你的规则
};
```

则你需要将规则用这个格式重写：

```js
module.exports = {
    meta: {
        fixable: "code" // 或 "whitespace"
    },
    create(context) {
        // 你的规则
    }
};
```

[eslint-plugin/require-meta-fixable](https://github.com/not-an-aardvark/eslint-plugin-eslint-plugin/blob/master/docs/rules/require-meta-fixable.md)规则可以自动修复并强制指定规则的 `meta.fixable`。

[eslint-plugin/prefer-object-rule](https://github.com/not-an-aardvark/eslint-plugin-eslint-plugin/blob/master/docs/rules/prefer-object-rule.md)规则可以自动修复并强制使用对象格式重写已废弃的函数格式规则。

参见[规则文档](../extend/custom-rules)获取更多关于编写规则的信息。

**相关议题**：[#13349](https://github.com/eslint/eslint/issues/13349)

## <a name="get-comments"></a> 在 `RuleTester` 中使用 `SourceCode#getComments()` 失败

在 ESLint v4.0.0 中，我们废弃了 `SourceCode#getComments()`，但忘记了删除它。在 v8.0.0 中也没有完全删除它，而是采取了中间步骤，更新了 `RuleTester`，使其在规则中使用 `SourceCode#getComments()` 时会失败。因此，所有现有的规则将继续工作，但当开发者对规则进行测试时，将会出现失败。

将在 v9.0.0 中移除 `SourceCode#getComments()` 方法。

**解决方案**：如果你的规则使用了 `SourceCode#getComments()`，请改用 [`SourceCode#getCommentsBefore()`、`SourceCode#getCommentsAfter()` 或 `SourceCode#getCommentsInside()`](../extend/custom-rules#sourcecodegetcommentsbefore-sourcecodegetcommentsafter-and-sourcecodegetcommentsinside)。

**相关议题**：[#14744](https://github.com/eslint/eslint/issues/14744)

## <a name="ast-format"></a> 修改 AST 格式简写属性

ESLint v8.0.0 升级到了 Espree v8.0.0 以支持新语法。此次 Espree 升级又包含了 Acorn v8.0.0 升级，其中对 AST 中的简写属性进行了修改。这里是个示例：

```js
const version = 8;
const x = {
    version
};
```

此代码创建了看起来像是这样的属性节点：

```json
{
    "type": "Property",
    "method": false,
    "shorthand": true,
    "computed": false,
    "key": {
        "type": "Identifier",
        "name": "version"
    },
    "kind": "init",
    "value": {
        "type": "Identifier",
        "name": "version"
    }
}
```

注意 `key` 和 `value` 属性都包含相同的信息。在 Acorn v8.0.0 前（也就是 ESLint v8.0.0 前），这两个节点由同一个对象表示，所有你可以使用 `===` 以确保它们是否代表同一节点，比如：

```js
// 在 ESLint v7.x 中为 true，在 ESLint v8.0.0 中为 false
if (propertyNode.key === propertyNode.value) {
    // 做点什么
}
```

在 ESLint v8.0.0（使用 Acorn v8.0.0）中键和值现在是单独的两个对象，因此二者不再等同。

**解决方案**：如果你的规则用比较简写对象字面量属性的键和值的方法，来确定它们是否是同一个节点，你将代码改为以下任一一种：

1. 使用 `propertyNode.shorthand` 来判断该属性是否为简写属性节点。
2. 使用每个节点的 `range` 属性来判断键和值是否在同一个位置。

**相关议题**：[#14591](https://github.com/eslint/eslint/pull/14591#issuecomment-887733070)

## <a name="remove-cliengine"></a> 移除 `CLIEngine` 类

移除 `CLIEngine` 类，以 [`ESLint` 类](../integrate/nodejs-api#eslint-class)替换之。

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
| `static getFormatter(name)`                  | (移除※1)                      |
| `addPlugin(pluginId, definition)`            | `plugins` 构造函数选项   |
| `getRules()`                                 | (移除※2)                      |
| `resolveFileGlobPatterns()`                  | (移除※3)                      |

* ※1 `engine.getFormatter()` 方法目前按原样返回加载的包的对象，由于向后兼容的原因，这使得很难向格式化工具添加新功能。新的 `eslint.loadFormatter()` 方法返回适配器对象，该对象包装了加载的包的对象，以简化添加新特性的过程。此外，适配器对象可以访问 `ESLint` 实例来计算默认数据（例如，使用加载的插件规则来制作 `rulesMeta`）。因此，`ESLint` 类只实现了 `loadFormatter()` 方法的实例版本。
* ※2 `CLIEngine#getRules()` 方法有副作用，所以被删除。如果你使用 `CLIEngine#getRules()` 来检索基于检查结果的规则元信息，请使用 `ESLint#getRulesMetaForResults()` 代替。如果你使用 `CLIEngine#getRules()` 检索所有内置规则，请从 `eslint/use-at-your-own-risk` 导入 `builtinRules`，以访问内部规则并获得不支持的 API。
* ※3 从 ESLint v6.0.0 起，ESLint 就使用 `resolveFileGlobPatterns()` 方法的不同逻辑来迭代文件，这个方法已经过时了。

**相关议题**：[RFC80](https://github.com/eslint/rfcs/tree/main/designs/2021-package-exports)、[#14716](https://github.com/eslint/eslint/pull/14716)、[#13654](https://github.com/eslint/eslint/issues/13654)

## <a name="remove-linter"></a> 移除 `linter` 对象

在 v8.0.0 将废弃的 `linter` 对象从 ESLint 包中移除。

**解决方案**：如果你正在使用 `linter` 对象，比如：

```js
const { linter } = require("eslint");
```

将你的代码改成这样：

```js
const { Linter } = require("eslint");
const linter = new Linter();
```

**相关议题**：[RFC80](https://github.com/eslint/rfcs/tree/main/designs/2021-package-exports)、[#14716](https://github.com/eslint/eslint/pull/14716)、[#13654](https://github.com/eslint/eslint/issues/13654)

## <a name="remove-lib"></a> 移除 `/lib` 入口

从 v8.0.0 起，ESLint 严格定义了其公共 API。此前你可以使用 `require("eslint/lib/rules/semi")` 获取个人文件，这不再允许。现在可以通过 `/use-at-your-own-risk` 入口获取有限的现有 API，以便向后兼容，但这些 API 没有得到正式支持并随时可能中断或消失。

**解决方案**：如果你直接使用 `/lib` 入口访问规则，比如：

```js
const rule = require("eslint/lib/rules/semi");
```

将你的代码改成：

```js
const { builtinRules } = require("eslint/use-at-your-own-risk");
const rule = builtinRules.get("semi");
```

如果你直接使用 `/lib` 入口访问 `FileEnumerator`，比如：

```js
const { FileEnumerator } = require("eslint/lib/cli-engine/file-enumerator");
```

将你的代码改成：

```js
const { FileEnumerator } = require("eslint/use-at-your-own-risk");
```

**相关议题**：[RFC80](https://github.com/eslint/rfcs/tree/main/designs/2021-package-exports)、[#14716](https://github.com/eslint/eslint/pull/14716)、[#13654](https://github.com/eslint/eslint/issues/13654)
