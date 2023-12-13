---
title: 迁移至 v5.0.0

---

ESLint v5.0.0 是第五个主要发行版。此版本有几个破坏性变更，不过问题不大，不需要 ESLint 用户进行大规修改。而本指南旨在引导你了解这些变化。

下列内容大致按每项变化预计影响的用户数量排序，其中第一项为预计会影响最多的用户的变化。

## 面向用户的破坏性变更

1. [不再支持 Node.js 4](#drop-node-4)
1. [`eslint:recommended` 添加了新规则](#eslint-recommended-changes)
1. [废弃 `experimentalObjectRestSpread` 选项](#experimental-object-rest-spread)
1. [使用命令行检查不存在的文件将导致致命错误](#nonexistent-files)
1. [修改部分规则的默认选项](#rule-default-changes)
1. [移除 `node`、`browser` 和 `jest` 环境中废弃的全局变量](#deprecated-globals)
1. [现在将对空文件进行检查](#empty-files)
1. [现在可以解析配置中的范围包插件了](#scoped-plugins)
1. [多行 `eslint-disable-line` 指令将视作问题](#multiline-directives)

## 面向插件/自定义规则开发者的破坏性变更

1. [现在在开始运行规则时就添加 AST 节点 `parent` 属性](#parent-before-rules)
1. [现在当使用默认解析器时，展开运算符有 `SpreadElement` 类型了](#spread-operators)
1. [当使用默认解析器时，剩余运算符具有 `RestElement` 类型了](#rest-operators)
1. [当使默认解析器时，JJSX元素中的文本节点现在有 `JSXText` 类型](#jsx-text-nodes)
1. [现在 `context.getScope()` 方法会返回更合适的作用域](#context-get-scope)
1. [删除规则上下文对象 `_linter ` 属性](#no-context-linter)
1. [`RuleTester` 在其断言中使用了更严格的等值检查](#rule-tester-equality)
1. [规则需要和报告一起提供信息](#required-report-messages)

## 面向集成开发者的破坏性变更

1. [个别提示消息不再使用 `source` 属性](#source-property)
1. [现在致命错误的退出代码是 2](#exit-code-two)
1. [现在不可枚举 `eslint.linter` 属性](#non-enumerable-linter)

---

## <a name="drop-node-4"></a> 不再支持 Node.js 4
Node.js 3 在 2018 年 4 月到达了生命的终点，将不再获得安全更新。我们在 ESLint v6 中正式放弃了对它的支持。ESLint 现在支持以下版本 Node.js：

* Node.js 6（6.14.0 以上）
* Node.js 8（8.10.0 以上）
* Node.js 9.10.0 以上

**解决方案**：在使用 ESLint v5 前，请确保你至少升级到 Node.js 6。如果你无法升级，我们推荐在能够升级 Node.js 版本前，继续使用 ESLint v4.x。

## <a name="eslint-recommended-changes"/> 修改 `eslint:recommended`

[`eslint:recommended`](../use/configure#using-eslintrecommended) 配置添加了两个新规则：

* [`for-direction`](../rules/for-direction) 执行 `for` 循环更新子句，计数器将逐渐增大。
* [`getter-return`](../rules/getter-return) 强制要求属性获取器中有 `return` 语句。

**解决方案**：为了使用类似于 4.x 版本的 `eslint:recommended` 行为，你可以在配置文件中禁用这些规则：

```json
{
  "extends": "eslint:recommended",

  "rules": {
    "for-direction": "off",
    "getter-return": "off"
  }
}
```

## <a name="experimental-object-rest-spread"></a> 废弃 `experimentalObjectRestSpread` 选项

之前在使用默认解析器时可以使用 `experimentalObjectRestSpread` 选项启用[剩余/展开属性属性](https://developers.google.com/web/updates/2017/06/object-rest-spread)支持，如下：

```json
{
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  }
}
```

剩余/展开对象现在是 JavaScript 语言组成部分，所以对它的支持不再是实验性的了。在 ESLint v4 和 ESLint v5 中，可以通过 `"ecmaVersion": 2018` 选项启用剩余/展开属性：

```json
{
  "parserOptions": {
    "ecmaVersion": 2018
  }
}
```

请注意，也可以启用 ES2018 解析其他特性，如[异步迭代](https://github.com/tc39/proposal-async-iteration)。当使用 ESLint v5 的默认解析器时，不再使用其他特性来切换剩余/展开对象的语法支持。

为了兼容，ESLint v5 会把配置文件中的 `ecmaFeatures: { experimentalObjectRestSpread: true }` 视作 `ecmaVersion: 2018` 的别名。因此，如果要使用剩余/展开对象，仍可以用 ESLint v5 的配置。不过要注意，ESLint v6 将删除该别名。

**解决方案**：如果使用 `experimentalObjectRestSpread` 选项，则升级时无需改变任何配置，但出现废弃警告。要解决这个警告，就需要在配置文件中使用 `ecmaVersion: 2018` 代替 `ecmaFeatures: { experimentalObjectRestSpread: true }`。如果想禁用其他 ES2018 特性，可以考虑使用诸如 [`no-restricted-syntax`](../rules/no-restricted-syntax) 等规则。

## <a name="nonexistent-files"></a> 在命令行中检查不存在的文件会导致致命错误

以前版本的 ESLint 静默地忽略了命令行上提供的任何不存在的文件和 globs。

```bash
eslint nonexistent-file.js 'nonexistent-folder/**/*.js' # 在 ESLint v4 中不会导致错误退出
```

许多用户发现这种行为令人困惑，因为如果他们在文件名中打错了字，ESLint 会出现对该文件成功的提示，而实际上却没有提示任何东西。

ESLint v5 在满足以下任一条件时将报告致命错误：

* 在命令行中提供的文件不存在
* 命令行中提供的 glob 或文件夹与任何可检查文件不匹配。

注意，这也会影响到 [`CLIEngine.executeOnFiles()`](../integrate/nodejs-api#cliengineexecuteonfiles) API。

**解决方案**：如果你在升级到 ESLint v5 后遇到关于丢失文件的错误，你可能要仔细检查你提供给 ESLint 的路径中是否有错字。为了使错误消失，你可以简单地从命令行上提供给 ESLint 的参数列表中删除给定的文件或 globs。

如果你使用依赖此行为的模板生成器（例如，在任何测试文件实际存在之前，在新项目中生成运行 `eslint tests/` 的脚本），你可以通过添加一个符合给定模式的假文件（例如空的 `tests/index.js` 文件）来解决这个问题。

## <a name="rule-default-changes"></a> 修改了部分规则的默认选项

* [`object-curly-newline`](../rules/object-curly-newline) 规则的默认选项从 `{ multiline: true }` 改为 `{ consistent: true }`。
* [`no-self-assign`](../rules/no-self-assign) 规则的默认选项对象已从 `{ props: false }` 改为 `{ props: true }`。

**解决方法**：要使用类似于 ESLint v4 的规则行为，你可以更新配置文件以包括以前的选项：

```json
{
  "rules": {
    "object-curly-newline": ["error", { "multiline": true }],
    "no-self-assign": ["error", { "props": false }]
  }
}
```

## <a name="deprecated-globals"></a> 删除 `node`、`browser` 和 `jest` 环境中的废弃全局变量

对于在 Node.js、浏览器和 Jest 中运行的代码，一些全局变量已被废弃或删除（例如，浏览器曾经向 JavaScript 代码暴露了 `SVGAltGlyphElement` 全局变量，但这个全局变量已经从网络标准中删除，并且不再出现在浏览器中）。因此，我们已经从相应的 `eslint` 环境中删除了这些全局变量，所以在使用诸如 [`no-undef`](../rules/no-undef) 这样的规则时，使用这些全局变量会触发一个错误。

**解决方案**：如果你在 `node`、`browser` 或 `jest` 环境中使用已废弃的 globals，你可以在配置中添加 `globals` 部分来重新启用任何你需要的 globals。比如说：

```json
{
  "env": {
    "browser": true
  },
  "globals": {
    "SVGAltGlyphElement": false
  }
}
```

## <a name="empty-files"></a> 检查空文件

ESLint v4 在对只包含空格的文件进行检查时有一个特殊的行为：它将跳过运行解析器和规则，并且总是返回零错误。这给用户和规则作者带来了一些困惑，特别是在为规则编写测试时（当编写一个文体规则时，规则作者偶尔会写一个测试，其中源代码只包含空格，以确保在没有找到适用的代码时规则的行为是正确的。然而，这样的测试实际上根本不会运行该规则，所以该规则的一个方面最终没有得到测试）。

ESLint v5 对待纯白文件的方式与所有其他文件相同：它解析它们，并根据情况对它们运行启用的规则。如果你用了自定义规则以报告空文件错误，这可能会导致额外的提示问题。

**解决方法**：如果你的项目中有空文件，且不想对其检查，可以考虑把它添加到 [`.eslintignore` 文件](configure/ignore)中。

如果你有一个自定义规则，你应该确保它适当地处理空文件（在大多数情况下，没有必要进行修改）。

## <a name="scoped-plugins"></a> 可以解析配置中的范围包插件了

当 ESLint v5 遇到配置中以 `@` 开头的插件名称时，会将该插件解析为 [npm 范围包](https://docs.npmjs.com/misc/scope)。假使配置包含 `"plugins": ["@foo"]`，ESLint v5 将尝试加载 `@foo/eslint-plugin` 包（而 ESLint v4 则会尝试加载 `eslint-plugin-@foo` 包）。用户可能之前用这种方式解析 `node_modules/eslint-plugin-@foo`。不过考虑到大多用户不会这样干，发布到 npm 的包也不能在中间包含 `@` 字符，所以我们就做出了这个破坏性变更。

**解决方案**：如果你像加载像 `eslint-config-@foo` 这样的包，考虑把包名改一下：

## <a name="multiline-directives"></a> 多行 `eslint-disable-line` 指令将视作问题

`eslint-disable-line` 和 `eslint-disable-next-line` 指令注释只允许跨一行。例如，下面的指令注释是无效的。

```js
alert('foo'); /* eslint-disable-line
   no-alert */ alert('bar');

// (which line is the rule disabled on?)
```

以前，ESLint 会忽略这些错误的指令注释。ESLint v5 发现就会报错，这样就可以更容易地纠正这个问题了。

**解决方案**：如果你因为这个变化而看到新的报告错误，请确保你的 `eslint-disable-line` 指令只跨了一行。注意，指令仍可以使用块级注释（以 `/* */` 为界），前提是块状注释不包含换行符。

---

## <a name="parent-before-rules"></a> 现在在开始运行规则时就添加 AST 节点 `parent` 属性

以前，ESLint 在运行每个 AST 节点的规则监听器之前，会立即设置该节点的 `parent` 属性。这给规则制定者带来了一些困惑，因为 `parent` 属性最初不会出现在任何节点上，有时有必要使规则的结构复杂化，以确保特定节点的 `parent` 属性在需要时可用。

在 ESLint v5 中，在任何规则访问 AST 之前，`parent` 属性被设置在所有 AST 节点上。这使得编写一些规则变得更容易，因为 `parent` 属性总是可用的，而不是在幕后被改变。然而固定的 `parent` 属性也带来一些副作用，AST 对象在规则第一次看到它时会进行循环（此前只在调用第一个规则监听器后进行循环）。因此，现在自定义规则要是为了遍历 AST 而列举一个节点的所有属性，且没有正确检查循环的话，可能会永远处于循环或耗尽内存。

**解决方案**：如果你的自定义规则列举 AST 节点所有属性，考虑排除 `parent` 属性或实现循环检测，以确保你获得正确的结果。

## <a name="spread-operators"></a> 现在当使用默认解析器时，展开运算符有 `SpreadElement` 类型了

以前，当解析像是 `const foo = {...data}` 的 JS 代码，并同时启用了 `experimentalObjectRestSpread` 选项时，默认解析器将为 `...data` 展开元素生成 `ExperimentalSpreadProperty` 节点类型。

在 ESLint v5 中，默认解析器现在总是给 `...data` AST 节点提供 `SpreadElement` 类型，即使启用了（现已废弃）[`experimentalObjectRestSpread`](#experimental-object-rest-spread) 选项。这使得 AST 符合当前的 ESTree 规范。

**解决方案**：如果你编写的自定义规则依赖于具有 `ExperimentalSpreadProperty` 类型的传播运算符，你应该更新它，使其也能与具有 `SpreadElement`类 型的传播运算符一起工作。

## <a name="rest-operators"></a> 当使用默认解析器时，剩余运算符具有 `RestElement` 类型了

以前，当解析像是 `const {foo, ...rest}` 的 JS 代码，并同时启用了 `experimentalObjectRestSpread` 选项时，默认解析器会为 `.data` 剩余元素生成 `ExperimentalRestProperty` 节点类型。

在 ESLint v5 中，默认解析器现在总是给 `...data` AST 节点添加 `RestElement` 类型，即使启用了（现已经废弃的）[`experimentalObjectRestSpread`](#experimental-object-rest-spread) 选项。这使得 AST 符合当前的 ESTree 规范。

**解决方案**：如果你写的自定义规则依赖于具有 `ExperimentalRestProperty` 类型的休息运算符，你应该更新它，使其也能与具有 `RestElement` 类型的休息运算符一起工作。

## <a name="jsx-text-nodes"></a> 当使默认解析器时，JJSX元素中的文本节点现在有 `JSXText` 类型

当解析像 `<a>foo</a>` 这样的 JSX 代码时，默认解析器现在将给 `foo` AST 节点提供 `JSXText` 类型，而不是 `Literal`类型。这让 AST 符合最新的 JSX 规范。

**解决方案**：如果你的自定义规则依赖 JSX 元素中的文本节点具有 `Literal` 类型，你应该更新它，使其也能与具有 `JSXText` 类型的节点一起工作。

## <a name="context-get-scope"></a> 现在 `context.getScope()` 方法会返回更合适的作用域

以前 `context.getScope()` 方法会根据 `parserOptions.ecmaVersion` 属性改变其行为。然而，当使用不支持 `ecmaVersion` 选项的解析器时，例 `babel-eslint` 这就可能会导致混乱。

此外，`context.getScope()` 返回了不合适的 `CatchClause`（ES5）、`ForStatement`（≧ES2015）、`ForInStatement`（≧ES2015）、`ForOfStatement` 和 `WithStatement` 节点父范围。

在 ESLint v5 中，无论 `parserOptions.ecmaVersion` 如何，`context.getScope()` 方法都有同样的行为，并返回适当的范围。参见[文档](../extend/scope-manager-interface)以了解更多关于返回作用域的细节。

**解决方案**：如果你的自定义规则，在节点处理程序中使用了 `context.getScope()` 方法，你可能需要更新它以说明修改后的范围信息。

## <a name="no-context-linter"></a> 删除规则上下文对象 `_linter` 属性

以前，规则上下文对象有一个没有记录的 `_linter` 属性，在 ESLint 内部用来处理规则的报告。一些规则使用这个属性来实现规则本来不可能实现的功能。例如，一些插件使用规则中的 `_linter` 属性来监控其他规则的报告，目的是检查未使用的 `/* eslint-disable */` 指令注释。虽然这个功能对用户来说很有用，但它也可能给使用 ESLint 的项目带来稳定性问题。例如，插件中规则升级可能意外地导致另一个插件中的规则开始报错。

ESLint v5.0 中移除了 `_linter` 属性，所以不能再用这个功能实现规则。不过[`--report-unused-disable-directives`](command-line-interface#--report-unused-disable-directives) CLI 标志可以用来标记未使用的指令注释。

## <a name="rule-tester-equality"></a> `RuleTester` now uses strict equality checks in its assertions

以前，`RuleTester` 在部分断言中使用了较为松散的比较判断。例如若一条规则由于自动修正而产生了字符串 `"7"`，`RuleTester` 将允许在 `output` 断言中使用数字 `7`，而不是字符串 `"7"`。在 ESLint v5 中，`RuleTester` 的比较将使用严格的等值判断，所以像这样的断言将不再通过。

**解决方案**：如果你再自定义规则中使用 `RuleTester` 则编写测试，请确保你的断言中的预期值与实际值是严格相等的。

## <a name="required-report-messages"></a> 规则需要和报告一起提供信息

以前，规则有可能报告 AST 节点而不提供报告信息。这不是预期的行为，因此，如果一个规则省略了消息，默认的格式化将崩溃。但当使用非默认格式时，则有可能避免崩溃，例如 `json`。

在 ESLint v5 中，在没有提供信息的情况下报告问题总是导致错误。

**解决方法**：如果你的自定义规则中报告了问题但没有提供消息，请更新以便在报告中提供消息。

---

## <a name="source-property"></a> 个别提示消息不再使用 `source` 属性

正如 [2016 年 10 月](/blog/2016/10/eslint-v3.8.0-released#additional-property-on linting-results) 所宣布的，`source` 属性已从单个检查消息对象中移除。

**解决方法**：如果你的格式化工具或集成依赖于在单个检查消息上使用 `source` 属性，你应该更新它以在文件结果对象上使用 `source` 属性。

## <a name="exit-code-two"></a> 现在致命错误的退出代码是 2

当使用 ESLint v4 时，在命令行上运行 ESLint 时，以下两种情况都导致退出代码 1：

* 检查成功完成，但查出一些问题
* 由于致命错误而导致检查失败（如无效的配置文件）

因此，集成很难区分这两种情况，以确定它是否应该尝试从输出中提取检查结果。

在 ESLint v5 中，由于致命错误导致的不成功的检查运行将使用退出代码 2，而不再是 1。

**解决方案**：如果你的集成用判断退出代码是否等于 1 来检测所有关于检查运行的问题，请用判断退出代码是否为非零来代替。

## <a name="non-enumerable-linter"></a> 现在不可枚举 `eslint.linter` 属性

当使用 ESLint 的 Node.js API 时，现在不可以枚举 [`linter`](../integrate/nodejs-api#linter-1) 属性了。请注意，ESLint v4 弃用 `linter` 属性，请改用 [`Linter`](../integrate/nodejs-api#linter) 属性。

**解决方案**：如果你依赖于枚举 `eslint` 对象的所有属性，可以使用类似 `Object.getOwnPropertyNames` 的东西来确保捕获非枚举的键。
