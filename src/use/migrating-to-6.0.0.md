---
title: 迁移至 v6.0.0

---

ESLint v6.0.0 是 ESLint 主要发行版。在此版本中有一些破坏性变更，而本指南旨在引导你了解这些变化。

下列内容大致按每项变化预计影响的用户数量排序，其中第一项为预计会影响最多的用户的变化。

## 面向用户的破坏性变更

1. [不再支持 Node.js 6](#drop-node-6)
1. [更新 `eslint:recommended`](#eslint-recommended-changes)
1. [插件和可共享配置不再受 ESLint 位置影响](#package-loading-simplification)
1. [默认解析器将更严格地验证选项](#espree-validation)
1. [规则配置验证更严格了](#rule-config-validating)
1. [`no-redeclare` 规则的默认值更严格了](#no-redeclare-updates)
1. [`comma-dangle` 规则的默认值更严格了](#comma-dangle-updates)
1. [`no-confusing-arrow` 规则的默认值更宽松了](#no-confusing-arrow-updates)
1. [配置文件中的 `overrides` 将匹配点文件](#overrides-dotfiles)
1. [扩展配置文件中的 `overrides` 现在可以被父级配置文件所覆盖](#overrides-precedence)
1. [现在验证配置的全局变量值](#globals-validation)
1. [移除废弃的 `experimentalObjectRestSpread` 选项](#experimental-object-rest-spread)
1. [规则选项中的正则表达式的 unicode 标志可以解析了](#unicode-regexes)

## 面向插件/自定义规则开发者的破坏性变更

1. [插件作者可能需要更新安装指南](#plugin-documentation)
1. [`RuleTester`  现在可以验证规则模式中无效的  `default` 关键字了](#rule-tester-defaults)
1. [`RuleTester` 的 `parser` 选项需要是相对路径](#rule-tester-parser)
1. [删除 `eslintExplicitGlobalComment` 范围分析属性](#eslintExplicitGlobalComment)

## 面向集成开发者的破坏性变更

1. [插件和可共享配置不再受 ESLint 位置影响](#package-loading-simplification)
1. [`Linter` 不再尝试从文件系统中加载缺少的解析器了](#linter-parsers)

---

## <a name="drop-node-6"></a> 不再支持 Node.js 6

Node.js 6 在 2019 年 4 月到达了生命的终点，将不再获得安全更新。我们在 ESLint v6 中正式放弃了对它的支持。ESLint 现在支持以下版本 Node.js：

* Node.js 8（8.10.0 以上）
* Node.js 10（10.13.0 以上）
* Node.js 11.10.1 以上

**解决方案**：在使用 ESLint v6.0.0 前，请确保你至少升级到 Node.js 8。如果你无法升级，我们推荐在能够升级 Node.js 版本前，继续使用 ESLint v5.x。

**相关议题**：[eslint/eslint#11546](https://github.com/eslint/eslint/issues/11456)

## <a name="eslint-recommended-changes"></a> 更新 `eslint:recommended`

[`eslint:recommended`](../use/configure#using-eslintrecommended) 配置添加了下列规则：

* [`no-async-promise-executor`](../rules/no-async-promise-executor) 不允许使用 `async` 函数作为 `Promise` 构造函数的参数，因为这通常是个漏洞。
* [`no-misleading-character-class`](../rules/no-misleading-character-class) 将报告正则表达式中与预期不符的字符类，
* [`no-prototype-builtins`](../rules/no-prototype-builtins) 将报告调用 `foo.hasOwnProperty("bar")` 等方法（它经常导致漏洞），并推荐使用 `Object.prototype.hasOwnProperty.call(foo, "bar")` 代替之。
* [`no-shadow-restricted-names`](../rules/no-shadow-restricted-names) 不允许使用 `undefined` 这样的阴影变量（例如 `let undefined = 5;`），因为这可能会混淆读者。
* [`no-useless-catch`](../rules/no-useless-catch) 报告多余的 `catch` 语句，可以从代码中删除而不改变其行为。
* [`no-with`](../rules/no-with) 不允许使用 [`with` 语句](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)，这可能使代码难以理解并导致兼容性问题。
* [`require-atomic-updates`](../rules/require-atomic-updates) 报告了在异步函数中重新分配变量时可能出现的竞争条件错误。

此外，`eslint:recommended` 删除了下列规则：

* [`no-console`](../rules/no-console) 不允许调用 `console.log` 等函数。虽然这条规则适用于基本情况（例如避免在生产代码中留下调试语句），但它不像 `eslint:recommended` 中的其他规则那样广泛适用，而且在一些情况下是需要使用 `console.log` 的（例如，在 CLI 应用程序中），这使得它错误地进行了报告。

最后，在 ESLint v5 中，`eslint:recommended` 会明确地禁用所有不被视为“推荐”的核心规则。如果 `eslint:recommended` 在另一个配置之后加载就会出现问题，因为 `eslint:recommended` 会关闭一些规则。而在 ESLint v6 中，`eslint:recommended` 对非推荐的规则没有影响。

**解决方法：**为了模仿 5.x 的 `eslint:recommended` 行为，你可以在配置文件中明确地禁用/启用规则，如下所示：

```json
{
  "extends": "eslint:recommended",

  "rules": {
    "no-async-promise-executor": "off",
    "no-misleading-character-class": "off",
    "no-prototype-builtins": "off",
    "no-shadow-restricted-names": "off",
    "no-useless-catch": "off",
    "no-with": "off",
    "require-atomic-updates": "off",

    "no-console": "error"
  }
}
```

在极少数情况下（如果你依赖以前的行为，即 `eslint:recommended` 会禁用核心规则），你可能需要禁用其他规则来恢复以前的行为。

**相关议题**：[eslint/eslint#10768](https://github.com/eslint/eslint/issues/10768)、[eslint/eslint#10873](https://github.com/eslint/eslint/issues/10873)

## <a name="package-loading-simplification"></a> 插件和可共享配置不再受 ESLint 位置影响

以前 ESLint 基于相对于 ESLint 包本身的位置来加载插件的。因此，我们建议全局安装 ESLint 的用户也应该在全局安装插件，而安装了本地 ESLint 的用户应该在本地安装插件。然而，由于设计错误，这个策略导致 ESLint 在某些情况下随机地不能加载插件和可共享配置，特别是在使用像 [`lerna`](https://github.com/lerna/lerna) 和 [Yarn Plug n' Play](https://yarnpkg.com/lang/en/docs/pnp/) 这样的包管理器时。

经验之谈：在 ESLint v6 中，即使是全局 ESLint，也应该在本地安装插件。更确切地说，ESLint v6 默认将基于用户项目进行解析插件，并且总是相对于配置文件进行解析可共享配置和解析器。

**解决方案**：如果你全局安装了 ESLint （如用 `npm install eslint --global` 安装）以及插件，你应该在运行 ESLint 的项目中安装这些插件。如果配置文件扩展了可共享的配置和解析器，你应该确保配置文件中包含了这些包依赖。

如果你使用了位于非本地项目的配置文件（使用 `--config` 标志），可以考虑将插件作为该配置文件的依赖项来安装，并将 [`--resolve-plugins-relative-to`](./command-line-interface#--resolve-plugins-relative-to) 标志设为该配置文件的位置。

**相关议题**：[eslint/eslint#10125](https://github.com/eslint/eslint/issues/10125)、[eslint/rfcs#7](https://github.com/eslint/rfcs/pull/7)

## <a name="espree-validation"></a> 默认解析器将更严格地验证选项

ESLint 使用的默认解析器 `espree`，现在会因为以下情况下而引发错误：

* `ecmaVersion` 解析器选项被设置为数字以外的东西，例如字符串 `"2015"`（以前会忽略非数字的选项）。
* `sourceType: "module"` 解析器选项被设置，而 `ecmaVersion` 被设置为 `5` 或未被指定（以前设置 `sourceType: "module"` 将隐性导致 `ecmaVersion` 设置为令人不知所以然的最小值 2015）。
* `sourceType` 设置成了 `"script"` 或 `"module"` 以外的值。

**解决方案**：如果配置将 `ecmaVersion` 设置为非数字值，你可以删除 `ecmaVersion` 恢复以前的行为（然而，你可能想仔细检查一下配置是否真的按预期工作）。如果你的配置设置了 `parserOptions: { sourceType: "module" }` 而没有设置。`parserOptions.ecmaVersion`，你应该添加 `parserOptions: { ecmaVersion: 2015 }` 以恢复以前的行为。

**相关议题**：[eslint/eslint#9687](https://github.com/eslint/eslint/issues/9687)、[eslint/espree#384](https://github.com/eslint/espree/issues/384)

## <a name="rule-config-validating"></a> 规则配置验证更严格了

为了更早地发现配置错误，如果你试图配置不存在的规则，ESLint v6 会报告检查错误。

配置 | ESLint v5 | ESLint v6
------------- | ------------- | -------------
`/*eslint-enable foo*/`  | no error | linting error
`/*eslint-disable(-line) foo*/`  | no error | linting error
`/*eslint foo: 0*/` | no error | linting error
`{rules: {foo: 0}}` | no error | no error
`{rules: {foo: 1}` | linting warning | linting error

**解决方案**：你可以在（内联）配置中删除不存在的规则。

**相关议题**：[eslint/eslint#9505](https://github.com/eslint/eslint/issues/9505)

## <a name="no-redeclare-updates"></a> `no-redeclare` 规则的默认值更严格了

[`no-redeclare`](../rules/no-redeclare) 规则的默认选项已经从 `{ builtinGlobals: false }` 改为 `{ builtinGlobals: true }`。此外，对于通过注释启用的全局变量，如 `/* global foo */`，如果这些全局变量已经通过配置启用，那么 `no-redeclare` 规则现在将报告错误。

**解决方案**：

要恢复该规则以前的选项，你可以按以下方式进行配置：

```json
{
  "rules": {
    "no-redeclare": ["error", { "builtinGlobals": false }]
  }
}
```

此外，如果你看到代码中的全局变量注释有新的错误，你应该删除这些注释。

**相关议题**：[eslint/eslint#11370](https://github.com/eslint/eslint/issues/11370)、[eslint/eslint#11405](https://github.com/eslint/eslint/issues/11405)

## <a name="comma-dangle-updates"></a> `comma-dangle` 规则的默认值更严格了

以前，[`comma-dangle`](../rules/comma-dangle) 规则会忽略尾部的函数参数，除非明确配置为检查函数逗号。在 ESLint v6 中，函数逗号的处理方式与其他类型的尾随逗号相同。

**解决方案**：你可以用以下方法将规则恢复成和以前一样的默认行为：

```json
{
  "rules": {
    "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "never",
        "imports": "never",
        "exports": "never",
        "functions": "ignore"
    }]
  }
}
```

要恢复像 `always-multiline` 这样的字符串选项以前的行为，请将上面例子中的 `never` 替换为 `always-multiline`。

**相关议题**：[eslint/eslint#11502](https://github.com/eslint/eslint/issues/11502)

## <a name="no-confusing-arrow-updates"></a> `no-confusing-arrow` 规则的默认值更宽松了

The default options for the [`no-confusing-arrow`](../rules/no-confusing-arrow) rule have changed from `{ allowParens: false }` to `{ allowParens: true }`.

**解决方案**：你可以用以下方法将规则恢复成和以前一样的默认行为：

```json
{
  "rules": {
    "no-confusing-arrow": ["error", { "allowParens": false }]
  }
}
```

**相关议题**：[eslint/eslint#11503](https://github.com/eslint/eslint/issues/11503)

## <a name="overrides-dotfiles"></a> 配置文件中的 `overrides` 将匹配点文件

由于一个错误，在配置文件的 `overrides` 部分的 `files` 列表中的 glob 模式永远不会与 `dotfiles` 相匹配，这使得 overrides 无法应用于以点开始的文件。这个错误已经在 ESLint v6 中被修复。

**解决方案**：如果你不希望 dotfiles 被覆盖匹配，可以考虑在 `overrides`部分添加类似 `excludedFiles: [".*"]` 的内容。更多细节见[文档](../use/configure#configuration-based-on-glob-patterns)。

**相关议题**：[eslint/eslint#11201](https://github.com/eslint/eslint/issues/11201)

## <a name="overrides-precedence"></a> 扩展配置文件中的 `overrides` 现在可以被父级配置文件所覆盖

由于错误，以前可共享配置中 `overrides` 块优先于父配置。例如在下面的配置设置中，`semi` 规则最终会被启用，尽管它在最终用户的配置中被明确禁用。

```js
// .eslintrc.js
module.exports = {
  extends: ["foo"],
  rules: {
    semi: "off"
  }
};
```

```js
// eslint-config-foo/index.js
module.exports = {
  overrides: {
    files: ["*.js"],
    rules: {
      semi: "error"
    }
  }
};
```

在 ESLint v6.0.0 中，父级配置总是优先于扩展配置，即使有 `overrides` 块。

**解决方案**：我们预计这个问题的影响非常小，因为大多数可共享配置不使用 `overrides` 块。然而，如果你使用带有 `overrides` 块的可共享配置，你可能会遇到由于配置中明确指定的内容而导致的行为变化，但直到现在还没有活动。如果你想继承可共享配置的行为，只需从你自己的配置中删除相应的条目（在上面的例子中，可以删除 `.eslintrc.js` 中的 `semi: "off"` 以恢复之前的行为）。

**相关议题**：[eslint/eslint#11510](https://github.com/eslint/eslint/issues/11510)

## <a name="globals-validation"></a> 现在验证配置的全局变量值

以前，当用对象配置一组全局变量时，有可能使用任何东西作为对象的值。未知的值将视作 `"writable"`。

```js
// .eslintrc.js
module.exports = {
  globals: {
    foo: "readonly",
    bar: "writable",
    baz: "hello!" // ???
  }
};
```

有了这个变化，`globals` 对象中的任何未知值都会导致配置验证错误。

**解决方案**：如果你在更新后看到与全局变量有关的配置验证错误，请确保为 globals 配置的所有值都为 `readonly`、`writable` 或 `off`（ESLint 也支持替代性的拼写和变体，以保证兼容性）。

## <a name="experimental-object-rest-spread"></a> 移除废弃的 `experimentalObjectRestSpread` 选项

以前，使用默认的解析器时，配置可以使用 `experimentalObjectRestSpread` 选项来启用对对象剩余展开属性的解析支持。

```json
{
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  }
}
```

从 ESLint v5 开始，`ecmaFeatures: { experimentalObjectRestSpread: true }` 已经等同于 `ecmaVersion: 2018`，并且还发出了废弃警告。在 ESLint v6 中，已经完全无损地删除了`experimentalObjectRestSpread` 功能。如果你的配置是依靠 `experimentalObjectRestSpread` 来启用 ES2018 解析，你可能会开始看到最新的语法的解析错误。

**解决方案**：如果你使用 `experimentalObjectRestSpread` 选项，你应该修改配置来进行替换：

```json
{
  "parserOptions": {
    "ecmaVersion": 2018
  }
}
```

如果你不确定哪个配置文件需要更新，可以尝试运行 ESLint v5 并查看废弃警告中提到的配置文件。

**相关议题**：[eslint/eslint#9990](https://github.com/eslint/eslint/issues/9990)

## <a name="unicode-regexes"></a> 规则选项中的正则表达式的 unicode 标志可以解析了

像 [`max-len`](../rules/max-len) 这样的规则支持字符串选项，它被解释为正则表达式。在 ESLint v6.0.0 中，这些正则表达式被解释为 [unicode 标志](https://mathiasbynens.be/notes/es6-unicode-regex)，在匹配星形符号等字符时，应该表现出更合理的行为。Unicode 正则表达式也比非 unicode 正则表达式更严格地验证转义序列。

**解决方案**：如果你在升级后得到规则选项的验证错误，请确保你的规则选项中的任何正则表达式没有无效的转义序列。

**相关议题**：[eslint/eslint#11423](https://github.com/eslint/eslint/issues/11423)

---

## <a name="plugin-documentation"></a> 插件作者可能需要更新安装指南

如果你维护一个插件并提供安装说明，你应该确保安装说明是最新的[面向用户的插件加载方式的变化](#package-loading-simplification)。特别是，如果你的插件是用 [`generator-eslint`](https://github.com/eslint/generator-eslint) 包生成的，它很可能包含了过时的说明，即如何在全局 ESLint 安装中使用该插件。

**相关议题**：[eslint/rfcs#7](https://github.com/eslint/rfcs/pull/7)

## <a name="rule-tester-defaults"></a> `RuleTester`  现在可以验证规则模式中无效的  `default` 关键字了

在某些情况下，规则模式可以使用 `default` 关键字来自动指定规则选项的默认值。然而，`default` 关键字只在特定的模式位置有效，而在其他地方被忽略，如果规则错误地期望提供默认值作为规则选项，就会由产生错误的风险。在 ESLint v6.0.0 中，如果规则模式中有无效的 `default` 关键字，`RuleTester` 将引发错误。

**解决方案**：如果 `RuleTester` 开始报告关于无效默认值的错误，你可以在你的规则模式中删除指定位置的 `default` 属性，规则将以同样的方式行事（如果发生这种情况，你可能还想验证一下，当该位置没有提供选项值时，该规则的行为是否正确）。

**相关议题**：[eslint/eslint#11473](https://github.com/eslint/eslint/issues/11473)

## <a name="rule-tester-parser"></a> `RuleTester` 的 `parser` 选项需要是相对路径

为了在测试中使用自定义解析器，我们可以使用 `parser` 属性，并给出包名或文件路径。然而，如果给了包名，测试区会搞不清楚应该从哪加载解析器包，因为测试器不知道哪些文件在运行测试器。在 ESLint v6.0.0 中，`RuleTester` 不允许 `parser` 属性带有包名。

**解决方案**：如果你在测试用例中将 `parser` 属性指定为包名，请用 `require.resolve()` 函数更新它，将包名解析为包的绝对路径。

**相关议题**：[eslint/eslint#11728](https://github.com/eslint/eslint/issues/11728)、[eslint/eslint#10125](https://github.com/eslint/eslint/issues/10125)、[eslint/rfcs#7](https://github.com/eslint/rfcs/pull/7)

## <a name="eslintExplicitGlobalComment"></a> 删除 `eslintExplicitGlobalComment` 范围分析属性

以前，ESLint 会在范围分析中为 `Variable`  对象添加 `eslintExplicitGlobalComment` 属性，以表明变量是由于 `/* global */` 注释而引入的。这个属性并没有任何记录，同时 ESLint 团队也无法在 ESLint 核心中找到这个属性的任何用法。该属性在 ESLint v6 中被删除，取而代之的是 `eslintExplicitGlobalComments` 属性，如果变量在声明时有多个注释，该属性可以列出所有 `/* global */` 注释。

**解决方案**：如果你维护的规则使用了 `eslintExplicitGlobalComment` 属性，请使用 `eslintExplicitGlobalComments` 属性替换。

**相关议题**：[eslint/rfcs#17](https://github.com/eslint/rfcs/pull/17)

---

## <a name="linter-parsers"></a> `Linter` 不再尝试从文件系统中加载缺少的解析器了

以前，当用以前没有定义过的解析器检查代码时，`Linter` API 会尝试从文件系统加载解析器。然而，这种行为令人困惑，因为 `Linter` 在其他情况下都不会访问文件系统，而且很难确保从文件系统加载解析器时能找到正确的解析器。

在 ESLint v6 中，`Linter` 将不再执行任何文件系统操作，包括加载解析器。

**解决方案**：如果你使用了 `Linter` 和自定义解析器，请改用 [`Linter#defineParser`](../integrate/nodejs-api#linterdefineparser)，并在检查代码前明确定义解析器。

**相关议题**：[eslint/rfcs#7](https://github.com/eslint/rfcs/pull/7)
