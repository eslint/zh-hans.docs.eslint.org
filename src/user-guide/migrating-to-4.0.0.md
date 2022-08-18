---
title: 迁移至 v4.0.0
layout: doc
edit_link: https://github.com/eslint/eslint/edit/main/docs/src/user-guide/migrating-to-4.0.0.md

---

ESLint v4.0.0 是第四个主要发行版。此版本有几个破坏性改变，不过问题不大，不需要 ESLint 用户进行大规模修改。而本指南旨在引导你了解这些变化。

下列内容大致按每项变化预计影响的用户数量排序，其中第一项为预计会影响最多的用户的变化。

## 面向用户的破坏性变更

1. [`eslint:recommended` 添加了新的规则](#eslint-recommended-changes)
2. [`indent` 规则更加严格了](#indent-rewrite)
3. [配置文件中存在未识别属性现在将导致致命错误](#config-validation)
4. [.eslintignore 模式限制基于文件位置解析](#eslintignore-patterns)
5. [默认情况下 `padded-blocks` 规则更加严格了](#padded-blocks-defaults)
6. [默认情况下 `space-before-function-paren` 规则更加严格了](#space-before-function-paren-defaults)
7. [默认情况下 `no-multi-spaces` 规则更加严格了](#no-multi-spaces-eol-comments)
8. [在配置文件的范围内引用插件现在需要包含范围](#scoped-plugin-resolution)

## 面向插件/自定义规则开发者的破坏性变更

1. [`RuleTester` 现在可以验证测试案例的属性了](#rule-tester-validation)
2. [AST 节点不再包含注释属性](#comment-attachment)
3. [AST 遍历过程将不再传递 `LineComment` 和 `BlockComment` 事件](#event-comments)
4. [现在注释 API 可以返回 Shebangs 了](#shebangs)

## 面向集成开发者的破坏性变更

1. [不再支持 `linter.verify()` API 中的 `global` 属性](#global-property)
2. [现在报告信息有更加完整的位置范围](#report-locations)
3. [部分暴露的 API 使用了 ES2015 类](#exposed-es2015-classes)

---

## <a name="eslint-recommended-changes"></a> `eslint:recommended` 更改

[`eslint:recommended`](https://eslint.org/docs/user-guide/configuring#using-eslintrecommended) 配置新增了两个规则：

* [`no-compare-neg-zero`](/docs/rules/no-compare-neg-zero) 不允许与 `-0` 比较
* [`no-useless-escape`](/docs/rules/no-useless-escape) 不允许字符串和正则表达式中出现无用的转义字符

**解决方案**：要想维持类似 3.x 的 `eslint:recommended` 行为，你可以在配置文件中禁用这些规则：

```json
{
  "extends": "eslint:recommended",

  "rules": {
    "no-compare-neg-zero": "off",
    "no-useless-escape": "off"
  }
}
```

## <a name="indent-rewrite"></a> 更加严格的 `indent` 规则

之起 [`indent`](/docs/rules/indent) 规则相当于宽松地检查缩进，许多代码模式中的缩进都无法识别。这造成了用户的混乱，他们不小心用了错误的缩进，他们使用 ESLint 自然是希望 ESLint 能够发现这些问题：

在 4.0 中重写 `indent` 规则。新版规则将报告旧版所没有发现的一些缩进错误。另外将默认检查 `MemberExpression` 节点、函数属性和函数参数的缩进（此前为了向后兼容默认忽略。）。

为了让升级过程更加任意，我们引入了 [`indent-legacy`](/docs/rules/indent-legacy) 规则作为 `indent` 3.x 版本规则的快照。如果在你升级 `indent` 规则后出现了问题，你能够使用`indent-legacy` 规则回到 3.x 的行为模式。不过 `indent-legacy` 规则已废弃，所以以后不会再接受漏洞修复和功能改进，最终你还是应该要切换回 `indent` 规则。

**解决方案**：我们建议升级过程中不对 `indent` 配置进行修改，并修复出现在代码库中新出现的缩进错误。不过如果你坚持想要类似 3.x 的 `indent` 规则，你可以更新配置：

```js
{
  rules: {
    indent: "off",
    "indent-legacy": "error" // 替代之前的 `indent` 配置
  }
}
```

## <a name="config-validation"></a> 配置文件中存在未识别属性现在将导致致命错误

创建配置时，用户不可避免地会打错字或搞错配置结构。以前 ESLint 并不会验证配置文件的属性，所以要排查配置中的错别字需要非常繁琐的调试。从 4.0.0 起，如果配置文件由未能识别的属性或类型错误，将引发 ESLint 错误。

**解决方案**：如果你在升级后看到配置验证错误，请验证你的配置不包含任何错字。如果你正在使用一个不被承认的属性，你应该能够从你的配置中删除它以恢复以前的行为。

## <a name="eslintignore-patterns"></a> .eslintignore 模式限制基于文件位置解析

由于一个错误，以前 `.eslintignore` 文件中的 glob 模式是从进程的当前工作目录，而不是`.eslintignore`文件的位置来解析的。4.0 起，`.eslintignore` 文件中的模式将从 `.eslintignore` 文件的位置进行解析。

**解决方案**：如果你使用 `.eslintignore` 文件，并且你经常从项目根目录以外的地方运 行ESLint，有可能模式会被不同的匹配。你应该更新 `.eslintignore` 文件中的模式，确保它们是相对于文件的，而不是工作目录的。

## <a name="padded-blocks-defaults"></a> 默认情况下 `padded-blocks` 规则更加严格了

默认情况下 [`padded-blocks`](/docs/rules/padded-blocks) 规则现在将在类体和开关语句中强制执行填充。之起规则将忽略这些情况，除非用户选择执行它们。

**解决方案**：如果这个变化导致你的代码库中出现更多的提示性错误，你应该修复它们或重新配置规则。

## <a name="space-before-function-paren-defaults"></a> 默认情况下 `space-before-function-paren` 规则更加严格了

默认情况下 [`space-before-function-paren`](/docs/rules/space-before-function-paren) 规则现在将强制执行异步箭头函数的间距。之起规则将忽略这些情况，除非用户选择强制执行它们。

**解决方案**：要想维持类似 3.x 的样子，你可以使用：

```json
{
  "rules": {
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "always",
      "asyncArrow": "ignore"
    }]
  }
}
```

## <a name="no-multi-spaces-eol-comments"></a> 默认情况下 `no-multi-spaces` 规则更加严格了

现在在默认情况下 [`no-multi-spaces`](/docs/rules/no-multi-spaces) 规则不允许在行尾的注释前有多个空格。之前规则没有检查这种情况。

**解决方案**：要想保持类似 3.x 的样子，你可以使用：

```json
{
  "rules": {
    "no-multi-spaces": ["error", {"ignoreEOLComments": true}]
  }
}
```

## <a name="scoped-plugin-resolution"></a> 在配置文件的范围内引用插件现在需要包含范围

3.x 中有个问题，即在配置文件中引用 NPM 范围包作为插件时，规则可以省略范围。例如，在 3.x 中，以下配置是合法的：

```json
{
  "plugins": [
    "@my-organization/foo"
  ],
  "rules": {
    "foo/some-rule": "error"
  }
}
```

换句话说，从一个范围内的插件（如 `foo/some-rule`）引用一个规则，而没有明确说明 `@my-organization` 的范围。这是一个错误，因为如果同时加载了名为 `eslint-plugin-foo` 的非范围包插件，这可能会导致所引用的规则不明确。

为了消除歧义，在 4.0 中，对范围内插件的引用必须包括范围。上面的配置应该被改为：

```json
{
  "plugins": [
    "@my-organization/foo"
  ],
  "rules": {
    "@my-organization/foo/some-rule": "error"
  }
}
```

**解决方案**：如果你在配置文件中将 NPM 范围包作为一个插件来引用，请确保在你引用它的地方包括范围。

---

## <a name="rule-tester-validation"></a> `RuleTester` 现在可以验证测试案例的属性了

4.0 起 `RuleTester` 工具将验证测试用例对象的属性，如果遇到未知的属性，将抛出一个错误。添加这一变化是因为我们发现，开发人员在规则测试中出现错别字是比较常见的，这往往会使测试用例试图做出的断言无效。

**解决方案**：如果你对自定义规则的测试有额外的属性，你应该删除这些属性。

## <a name="comment-attachment"></a> AST 节点不再包含注释属性

4.0 前，ESLint 要求解析器实现注释附件，在这个过程中，AST 节点将获得与它们在源文件中的前导和后导注释相对应的额外属性。这使得用户很难开发自定义解析器，因为他们必须复制 ESLint 所要求的混乱的注释附着语义。

4.0 中，我们摒弃了注释附件的概念，将所有的注释处理逻辑移入 ESLint 本身。这应该使开发自定义解析器更加容易，但这也意味着 AST 节点将不再有 `leadingComments` 和 `trailingComments` 属性。从概念上讲，规则作者现在可以在标记的背景下考虑注释，而不是 AST 节点。

**解决方案**：如果你有一个依赖 AST 节点的 `leadingComments` 或 `trailingComments` 属性的自定义规则，你可以分别用 `sourceCode.getCommentsBefore()` 和 `sourceCode.getCommentsAfter()` 代替它们。

此外，`sourceCode` 对象现在还有 `sourceCode.getCommentsInside()`（返回节点内的所有注释）、`sourceCode.getAllComments()`（返回文件中的所有注释）方法，并允许通过其他各种标记迭代器方法（如`getTokenBefore()` 和 `getTokenAfter()`）搭配 `{ includeComments: true }` 选项访问注释。

对于关注支持 ESLint v3.0 和 v4.0 的规则作者来说，现在两个版本都还可以使用已废弃的 `sourceCode.getComments()`。

最后，请注意以下 `SourceCode` 方法已废弃，并将在未来版本中被删除：

* `getComments()` - 被 `getCommentsBefore()`、`getCommentsAfter()` 和 `getCommentsInside()` 所代替
* `getTokenOrCommentBefore()` - 被 `getTokenBefore()` 搭配 `{ includeComments: true }` 选项所代替
* `getTokenOrCommentAfter()` - 被 `getTokenAfter()` 搭配 `{ includeComments: true }` 选项所代替

## <a name="event-comments"></a> AST 遍历过程将不再传递 `LineComment` 和 `BlockComment` 事件

4.0 起 AST 遍历过程中将不再传递 `LineComment` 和 `BlockComments` 事件。这有两个原因：

* 该行为依赖于在分析器层面上发生的注释附件，为确保考虑了所有注释，将禁止这种情况再次发生。
* 根据 token 上下文中考虑注释相较于根据 AST 节点上下文中考虑注释 token 而已更容易预测和推理

**解决方案**：改用 `sourceCode.getAllComments()` 规则来获取文件中的所有注释，而不是依赖 `LineComment` 和 `BlockComment`。要检查某一特定类型的所有注释，规则可以使用以下模式。

```js
sourceCode.getAllComments().filter(comment => comment.type === "Line");
sourceCode.getAllComments().filter(comment => comment.type === "Block");
```

## <a name="shebangs"></a> 现在注释 API 可以返回 Shebangs 了

4.0 前 `sourceCode.getAllComments()` 和 `sourceCode.getComments()` 输出中不会出现 shebang 注释，但它们会作为行注释出现在 `sourceCode.getTokenOrCommentBefore` 的输出中。不一致的行为造成了规则开发者的困惑。

4.0 中，shebang 注释被视为 `Shebang` 类型的注释 token，并将以 `SourceCode` 方法返回注释。这一变化的目的是使处理 shebang 注释的方式与处理其他标记的方式更加一致。

**解决方案**：如果你的自定义规则对注释进行了操作，可能需要一些额外的逻辑来确保正确处理或过滤掉 shebang 注释：

```js
sourceCode.getAllComments().filter(comment => comment.type !== "Shebang");
```

---

## <a name="global-property"></a> 不再支持 `linter.verify()` API 中的 `global` 属性

之前 `linter.verify()` API 支持作为  `globals` 别名的 `global` 配置选项。但实际上 `global` 选项从未被记录在案，也不被官方支持，在配置文件中也不起作用。它已经在 4.0 中被移除。

**解决方案**：如果你正在使用 `global` 属性，请使用功能一致的 `globals` 属性。

## <a name="report-locations"></a> 现在报告信息有更加完整的位置范围

3.1.0 起，规则可以通过在 `report` 调用中明确指定结束位置，除了开始位置外，还可以指定报告问题的**结束**位置。这对于像编辑器集成这样的工具很有用，它可以使用范围来精确显示报告问题发生的位置。4.0 起，如果报告的是**节点**，而不是位置，那么范围的结束位置将根据节点的结束位置自动推断。因此，更多的报告问题将有终点位置。

它应该不会破坏什么。然而，它可能会导致报告的位置比以前更大。例如，如果一个规则报告 AST 的根节点，报告问题的范围将是整个程序。在某些集成中，这可能导致用户体验不佳（例如，如果整个程序被高亮显示为错误）。

**解决方案**：如果你有一个处理报告问题范围的集成，确保你以一种用户友好的方式处理大的报告范围。

## <a name="exposed-es2015-classes"></a> 部分暴露的 API 使用了 ES2015 类

ESLint 的 Node.js API 中的 `CLIEngine`、`SourceCode` 和 `RuleTester` 模块现在是 ES2015 类。这不会破坏任何以往行为，但确实会有能见的影响（例如，现在 `CLIEngine.prototype` 上的方法不可枚举）。

**解决方案**：如果你依赖枚举 ESLint 的 Node.js API 的方法，也可以使用能访问非枚举属性的函数，如`Object.getOwnPropertyNames`。
