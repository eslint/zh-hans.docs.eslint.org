---
title: 创建规则
layout: doc
eleventyNavigation:
    key: working with rules
    parent: developer guide
    title: 创建规则
    order: 4

---

**注意**：本页涵盖了 ESLint >= 3.0.0 的最新规则格式。还有一个[废弃的规则格式](./working-with-rules-deprecated)。

ESLint 中的每个规则都有三个以其标识符命名的文件（如 `no-extra-semi`）。

* 在 `lib/rules` 目录下：源文件（如 `no-extra-semi.js`）。
* 在 `tests/lib/rules` 目录下：测试文件（如 `no-extra-semi.js`）。
* 在 `docs/src/rules` 目录下：Markdown 文档文件（如 `no-extra-semi.md`)

**重点**：如果你向 ESLint 仓库提交**核心**规则，则必须**遵循下面解释的一些约定。

以下是一个规则的源文件的基本格式：

```js
/**
 * @fileoverview Rule to disallow unnecessary semicolons
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow unnecessary semicolons",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-extra-semi"
        },
        fixable: "code",
        schema: [] // no options
    },
    create: function(context) {
        return {
            // callback functions
        };
    }
};
```

## 规则基础

一个规则的源文件导出一个具有以下属性的对象。

`meta`（对象） 包含规则的元数据。

* `type`（字符串） 表示规则的类型，是 `"problem"`、`"suggestion"` 或 `"layout"` 之一。
    * `"problem"`意味着该规则正在识别将导致错误或可能导致混乱行为的代码。开发人员应该把它作为一个高度优先事项来解决。
    * `"suggestion"`意味着该规则确定了一些可以用更好的方式完成的事情，但如果不改变代码，就不会发生错误。
    * `"layout"`意味着该规则主要关心的是空白、分号、逗号和括号，所有决定代码外观的部分，而不是代码的执行方式。这些规则对代码中没有在 AST 中指定的部分起作用。

* `docs`（对象）是 ESLint 的核心规则所需要的。

    * `description` (string) 在 [rules index](./rules/) 中提供规则的简短描述。
    * `recommended` (boolean) 表示在[配置文件](./user-guide/configuring/configuration-files#extending-configuration-files) 中是否使用 `"extends": "eslint:recommended"` 属性启用该规则。
    * `url` (string) 指定可以访问完整文档的链接（使代码编辑器能够在突出显示的规则违反上提供一个有用的链接）

    在自定义规则或插件中，你可以省略 `docs` 或在其中包含你需要的任何属性。

* `fixable`（string）是 `"code"` 或 `"whitespace"`，如果[命令行]上的 `--fix` 选项（../user-guide/command-line-interface#-fix）自动修复规则报告的问题

    **重点**：`fixable` 属性对于可修复规则是强制性的。如果没有指定这个属性，ESLint 将在规则试图产生一个修复时抛出一个错误。如果规则不是可修复的，则省略 `fixable` 属性。

* `hasSuggestions` (boolean) 指定规则是否可以返回建议（如果省略，默认为 `false`）。

     **重点**：`hasSuggestions` 属性对于提供建议的规则来说是强制性的。如果这个属性没有设置为 `true`，ESLint 将在规则试图产生建议时抛出一个错误。如果规则不提供建议，省略`hasSuggestions`属性。

* `schema` (array) 指定了 [options](#options-schemas)，所以 ESLint 可以防止无效的 [规则配置](../user-guide/configuring/rules#configuring-rules)

* `deprecated` (boolean) 表示该规则是否已经被废弃。如果规则没有被废除，你可以省略 `deprecated` 属性。

* `replacedBy`（array） 如果是被废弃的规则，指定替代规则。

`create`（function） 返回一个对象，该对象具有 ESLint 调用的方法，在遍历 JavaScript 代码的抽象语法树（由 [ESTree](https://github.com/estree/estree) 定义的 AST）时 "访问 "节点。

* 如果键是节点类型或[选择器](./selectors)，ESLint 在**down tree** 时调用该 **visitor**函数
* 如果键是节点类型或[选择器](./selectors)加 `:exit`，ESLint 在***up tree** 时调用该 **visitor** 函数。
* 如果一个键是一个事件名称，ESLint 调用该 **handler** 函数进行[代码链路分析](./code-path-analysis)

一个规则可以使用当前节点和它周围的树来报告或修复问题。

下面是 [array-callback-return](../rules/array-callback-return) 规则的方法：

```js
function checkLastSegment (node) {
    // report problem for function if last code path segment is reachable
}

module.exports = {
    meta: { ... },
    create: function(context) {
        // declare the state of the rule
        return {
            ReturnStatement: function(node) {
                // at a ReturnStatement node while going down
            },
            // at a function expression node while going up:
            "FunctionExpression:exit": checkLastSegment,
            "ArrowFunctionExpression:exit": checkLastSegment,
            onCodePathStart: function (codePath, node) {
                // at the start of analyzing a code path
            },
            onCodePathEnd: function(codePath, node) {
                // at the end of analyzing a code path
            }
        };
    }
};
```

## 上下文对象

`context` 对象包含了额外的功能，有助于规则完成其工作。顾名思义，`context` 对象包含与规则的上下文相关的信息。`context` 对象有以下属性：

* `parserOptions` - 为本次运行配置的分析器选项（更多细节 [这里](../user-guide/configuring/language-options#specifying-parser-options)）。
* `id` - 规则 ID。
* `options` - 这个规则的[配置选项](/docs/user-guide/configuring/rules#configuring-rules) 的数组。这个数组不包括规则的严重程度。更多信息，请参阅[这里](#contextoptions)。
* `settings` - 配置中的 [共享设置](/docs/user-guide/configuring/configuration-files#adding-shared-settings)。
* `parserPath` - 配置中的 `parser` 的名称。
* `parserServices` - 一个包含解析器提供的规则服务的对象。默认的解析器不提供任何服务。然而，如果一个规则打算与一个自定义的分析器一起使用，它可以使用 `parserServices` 来访问该分析器提供的任何服务（例如，TypeScript 解析器可以提供获取特定节点的计算类型的能力）。

此外，`context`对象有以下方法。

* `getAncestors()` - 返回当前遍历的节点的祖先数组，从 AST 的根开始，一直到当前节点的直接父节点。这个数组不包括当前遍历的节点本身。
* `getCwd()` - 返回传递给 [Linter](./nodejs-api#linter) 的 `cwd`。它是一个目录的路径，应该被视为当前工作目录。
* `getDeclaredVariables(node)` - 返回由给定节点声明的 [变量](./scope-manager-interface#variable-interface) 的列表。这个信息可以用来跟踪对变量的引用。
    * 如果该节点是 `VariableDeclaration`，则返回声明中的所有变量。
    * 如果该节点是 `VariableDeclarator`，将返回所有在声明器中声明的变量。
    * 如果该节点是 `FunctionDeclaration` 或 `FunctionExpression`，除了函数参数的变量外，还将返回函数名称的变量。
    * 如果该节点是 `ArrowFunctionExpression`，将返回参数的变量。
    * 如果该节点是 `ClassDeclaration` 或 `ClassExpression`，将返回类名的变量。
    * 如果该节点是 `CatchClause`，将返回异常的变量。
    * 如果该节点是 `ImportDeclaration`，将返回其所有的指定变量。
    * 如果该节点是 `ImportSpecifier`、`ImportDefaultSpecifier` 或 `ImportNamespaceSpecifier`，则返回声明的变量。
    * 否则，如果该节点没有声明任何变量，将返回一个空数组。
* `getFilename()` - 返回与源相关的文件名。
* `getPhysicalFilename()` - 当给文件加注时，它返回磁盘上文件的完整路径，没有任何代码块信息。当对文本着色时，它返回传递给 `—stdin-filename` 的值，如果没有指定则返回 `<text>`。
* `getScope()` - 返回当前遍历的节点的[范围](./scope-manager-interface#scope-interface)。这个信息可以用来跟踪对变量的引用。
* `getSourceCode()` - 返回 [`SourceCode`](#contextgetsourcecode) 对象，你可以用它来处理传递给 ESLint 的源代码。
* `markVariableAsUsed(name)` - 将当前范围内给定名称的变量标记为已使用。这影响到 [no-unused-vars](../rules/no-unused-vars) 规则。如果找到给定名称的变量并标记为已使用，则返回 `true`，否则返回 `false`。
* `report(descriptor)` - 报告代码中的问题（见[专用部分](#contextreport)）。

**注意**：早期版本的 ESLint 支持对 ` context` 对象的额外方法。这些方法在新的格式中被删除，不应该被依赖。

### context.getScope()

该方法返回具有以下类型的范围：

| AST Node Type             | Scope Type |
|:--------------------------|:-----------|
| `Program`                 | `global`   |
| `FunctionDeclaration`     | `function` |
| `FunctionExpression`      | `function` |
| `ArrowFunctionExpression` | `function` |
| `ClassDeclaration`        | `class`    |
| `ClassExpression`         | `class`    |
| `BlockStatement` ※1      | `block`    |
| `SwitchStatement` ※1     | `switch`   |
| `ForStatement` ※2        | `for`      |
| `ForInStatement` ※2      | `for`      |
| `ForOfStatement` ※2      | `for`      |
| `WithStatement`           | `with`     |
| `CatchClause`             | `catch`    |
| others                    | ※3        |

**※1** Only if the configured parser provided the block-scope feature. The default parser provides the block-scope feature if `parserOptions.ecmaVersion` is not less than `6`.<br>
**※2** Only if the `for` statement defines the iteration variable as a block-scoped variable (E.g., `for (let i = 0;;) {}`).<br>
**※3** The scope of the closest ancestor node which has own scope. If the closest ancestor node has multiple scopes then it chooses the innermost scope (E.g., the `Program` node has a `global` scope and a `module` scope if `Program#sourceType` is `"module"`. The innermost scope is the `module` scope.).

返回值是一个由 `eslint-scope` 包定义的 [`Scope` 对象](scope-manager-interface)。全局变量 的 `Variable` 对象有一些额外的属性。

* `variable.writeable` (`boolean | undefined`) ... 如果 `true`，这个全局变量可以被分配任意的值。如果 `false`，这个全局变量是只读的。
* `variable.eslintExplicitGlobal` (`boolean | undefined`) ... 如果 `true`，这个全局变量是由源代码文件中的 `/* globals */`指令注释定义的。
* `variable.eslintExplicitGlobalComments` (`Comment[] | undefined`) ... 在源代码文件中定义该全局变量的 `/* globals */` 指令性注释的数组。如果没有 `/* globals */` 指令注释，这个属性就是 `undefined`。
* `variable.eslintImplicitGlobalSetting` (`"readonly" | "writable" | undefined`) ... 配置文件中的配置值。如果有 `/* globals */` 指令注释，这可能与`variable.writeable` 不同。

### context.report()

你将使用的主要方法是 `context.report()`，它发布一个警告或错误（取决于正在使用的配置）。这个方法接受一个参数，它是一个包含以下属性的对象：

* `message` - 问题信息。
* `node` - （可选）与问题有关的 AST 节点。如果存在并且没有指定`loc`，那么该节点的起始位置将作为问题的位置。
* `loc` - （可选）一个指定问题位置的对象。如果同时指定了`loc` 和 `node`，那么将使用 `loc` 而不是 `node` 的位置。
    * `start` - 一个起始位置的对象。
        * `line` - 从 1 开始计算的发生问题的行号。
        * `column` - 从 0 开始计算的发生问题的列号。
    * `end` - 一个结束位置的对象。
        * `line` - 从 1 开始计算的发生问题的行号。
        * `column` - 从 0 开始计算的发生问题的列号。
* `data` - （可选）[placeholder](#using-message-placeholders) `message` 的数据。
* `fix` - （可选）一个应用[修复](#应用修复)的函数，以解决这个问题。

请注意，至少需要 `node` 或 `loc` 中的一个。

最简单的例子是只使用 `node` 和 `message`。

```js
context.report({
    node: node,
    message: "Unexpected identifier"
});
```

该节点包含了所有必要的信息，以计算出违规文本的行数和列数，以及代表该节点的源文本。

### 使用信息占位符

你也可以在信息中使用占位符并提供 `data`。

```js
{% raw %}
context.report({
    node: node,
    message: "Unexpected identifier: {{ identifier }}",
    data: {
        identifier: node.name
    }
});
{% endraw %}
```

请注意，消息参数中的前导和尾部的空白是可选的。

该节点包含所有必要的信息，以计算出违规文本的行数和列数，以及代表该节点的源文本。

### `messageId`s

在 `context.report()` 调用和你的测试中，你可以使用 `messageId` 来代替打出信息。

这使你可以避免重复输入错误信息。它还可以防止在你的规则的不同部分报告的错误有过时的信息。

```js
{% raw %}
// in your rule
module.exports = {
    meta: {
        messages: {
            avoidName: "Avoid using variables named '{{ name }}'"
        }
    },
    create(context) {
        return {
            Identifier(node) {
                if (node.name === "foo") {
                    context.report({
                        node,
                        messageId: "avoidName",
                        data: {
                            name: "foo",
                        }
                    });
                }
            }
        };
    }
};

// in the file to lint:

var foo = 2;
//  ^ error: Avoid using variables named 'foo'

// In your tests:
var rule = require("../../../lib/rules/my-rule");
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("my-rule", rule, {
    valid: ["bar", "baz"],
    invalid: [
        {
            code: "foo",
            errors: [
                {
                    messageId: "avoidName"
                }
            ]
        }
    ]
});
{% endraw %}
```

### 应用修复

如果你想让 ESLint 尝试修复你报告的问题，你可以在使用 `context.report()` 时指定 `fix` 函数来实现。`fix` 函数接收一个参数，即 `fixer` 对象，你可以用它来应用修复。比如说：

```js
context.report({
    node: node,
    message: "Missing semicolon",
    fix: function(fixer) {
        return fixer.insertTextAfter(node, ";");
    }
});
```

此处 `fix()` 函数被用来在节点后面插入一个分号。请注意，修复并不是立即应用的，如果与其他修复有冲突，可能根本就不会应用。在应用修复后，ESLint 将在修复的代码上再次运行所有启用的规则，可能会应用更多的修复。这个过程最多重复 10 次，或者直到没有发现更多可修复的问题。之后，任何剩余的问题都会像往常一样被报告。

**重点**：`meta.fixable` 属性对于可修复规则是必须的。如果一个实现 `fix` 功能的规则没有[导出](#规则基础) `meta.fixable` 属性，ESLint 将抛出一个错误。

`fixer` 对象有以下方法：

* `insertTextAfter(nodeOrToken, text)` - 在给定的节点或标记后插入文本。
* `insertTextAfterRange(range, text)` - 在给定的范围后插入文本。
* `insertTextBefore(nodeOrToken, text)` - 在给定的节点或标记之前插入文本。
* `insertTextBeforeRange(range, text)` - 在给定范围之前插入文本。
* `remove(nodeOrToken)` - 删除指定的节点或标记。
* `removeRange(range)` - 移除给定范围内的文本。
* `replaceText(nodeOrToken, text)` - 替换给定节点或标记中的文本
* `replaceTextRange(range, text)` - 替换给定范围内的文本。

范围是一个双项数组，包含源代码中的字符索引。第一项是范围的开始（包括），第二项是范围的结束（不包括）。每个节点和标记都有一个 `range` 属性，以确定它们所代表的源代码范围。

上述方法返回一个 `fixing` 对象。
 `fix()` 函数可以返回以下值：

* 一个 `fixing` 对象。
* 一个包括 `fixing` 对象的数组。
* 一个列举 `fixing` 对象的可迭代对象。特别是，`fix()` 函数可以是一个生成器。

如果你制作的 `fix()` 函数返回多个 `fix` 对象，这些 `fix` 对象不能重叠。

修复的最佳实践：

1. 避免任何可能改变代码运行时行为并导致其停止工作的修复。
1. 使修复尽可能的小。不必要的大型修复可能与其他修复冲突，并阻止它们被应用。
1. 每条信息只做一个修复。这是强制执行的，因为你必须从 `fix()` 返回修复器操作的结果。
1. 由于所有的规则都是在应用了第一轮修复后再次运行的，所以规则没有必要检查一个修复的代码风格是否会导致错误被另一个规则报告。
    * 例如，假设一个修复者想用引号包围一个对象键，但它不确定用户是喜欢单引号还是双引号。

        ```js
        ({ foo : 1 })

        // should get fixed to either

        ({ 'foo': 1 })

        // or

        ({ "foo": 1 })
        ```

    * 这个修复器可以随便选择一个报价类型。如果它猜错了，产生的代码将被自动报告并由 [`quotes`](/docs/rules/quotes) 规则修复。

注意：使修复尽可能小是一种最佳做法，但在某些情况下，扩大修复的范围可能是正确的，以便有意防止其他规则在同一段落中对周围范围进行修复。例如，如果替换文本声明了一个新的变量，那么防止在该变量的范围内发生其他变化可能是有用的，因为它们可能会导致名称冲突。

下面的例子替换了 `node`，同时也确保了在同一过程中，在 `node.parent` 的范围内没有其他修正：

```js
context.report({
    node,
    message,
    *fix(fixer) {
        yield fixer.replaceText(node, replacementText);

        // extend range of the fix to the range of `node.parent`
        yield fixer.insertTextBefore(node.parent, "");
        yield fixer.insertTextAfter(node.parent, "");
    }
});
```

#### 修复冲突

修复冲突是指对源代码的同一个部分应用了不同的修复，没有办法指定使用哪个修复。

例如，如果有两个修复想将字符从 0 改为 5，那么只会使用其中之一。

### 提供建议

在某些情况下，修正不适合自动应用，例如，如果一个修正可能会改变功能，或者根据实现意图，有多种有效的方法来修正一个规则（见上面列出的[应用修复](#应用修复) 的最佳实践）。在这些情况下，在 `context.report()` 上有一个替代的 `suggest` 选项，允许其他工具，如编辑器，为用户手动应用建议暴露出帮助器。

为了提供建议，在报告参数中使用 `suggest` 键和一个建议对象的数组。建议对象代表可以应用的单个建议，需要一个`desc`键字符串，描述应用建议的作用或`messageId`键（见[下文](#suggestion-messageids)），以及 `fix` 键，这是一个定义建议结果的函数。这个`fix` 函数遵循与常规 fix 相同的 API（在上面的[应用修复](#应用修复) 中描述）。

```js
{% raw %}
context.report({
    node: node,
    message: "Unnecessary escape character: \\{{character}}.",
    data: { character },
    suggest: [
        {
            desc: "Remove the `\\`. This maintains the current functionality.",
            fix: function(fixer) {
                return fixer.removeRange(range);
            }
        },
        {
            desc: "Replace the `\\` with `\\\\` to include the actual backslash character.",
            fix: function(fixer) {
                return fixer.insertTextBeforeRange(range, "\\");
            }
        }
    ]
});
{% endraw %}
```

**重点**：`meta.hasSuggestions`属性对于提供建议的规则来说是强制性的。如果一个规则试图产生一个建议，但没有[导出](#rule-basics)这个属性，ESLint 将抛出一个错误。

注意：建议将作为一个独立的变化被应用，而不会触发多通道修复。每个建议都应该关注代码中的单一变化，不应该试图符合用户定义的风格。例如，如果一个建议是在代码库中添加一个新的语句，它不应该试图匹配正确的缩进，或符合用户对分号的存在/不存在的偏好。所有这些都可以通过用户触发的多通道自动修正来进行修正。

建议的最佳做法。

1. 不要试图做得太多，建议大型重构，因为这可能会引入很多破坏性的变化。
1. 如上所述，不要试图符合用户定义的风格。

建议的目的是为了提供修复。如果建议的 "fix "函数返回 "null "或空数组/序列，ESLint 将自动从 linting 输出中删除整个建议。

#### Suggestion `messageId`s

可以用 `messageId` 代替建议的 `desc` 键。这与`messageId` 对整个错误的作用相同（见 [messageIds](#messageids)）。下面是一个如何在规则中使用它的例子。

```js
{% raw %}
module.exports = {
    meta: {
        messages: {
            unnecessaryEscape: "Unnecessary escape character: \\{{character}}.",
            removeEscape: "Remove the `\\`. This maintains the current functionality.",
            escapeBackslash: "Replace the `\\` with `\\\\` to include the actual backslash character."
        },
        hasSuggestions: true
    },
    create: function(context) {
        // ...
        context.report({
            node: node,
            messageId: 'unnecessaryEscape',
            data: { character },
            suggest: [
                {
                    messageId: "removeEscape",
                    fix: function(fixer) {
                        return fixer.removeRange(range);
                    }
                },
                {
                    messageId: "escapeBackslash",
                    fix: function(fixer) {
                        return fixer.insertTextBeforeRange(range, "\\");
                    }
                }
            ]
        });
    }
};
{% endraw %}
```

#### 建议信息中的占位符

你也可以在建议信息中使用占位符。这与整体错误的占位符的工作方式相同（见[使用消息占位符](#using-message-placeholders)）。

请注意，你必须在建议的对象上提供 `data`。建议信息不能使用整个错误的 `data` 的属性。

```js
{% raw %}
module.exports = {
    meta: {
        messages: {
            unnecessaryEscape: "Unnecessary escape character: \\{{character}}.",
            removeEscape: "Remove `\\` before {{character}}.",
        },
        hasSuggestions: true
    },
    create: function(context) {
        // ...
        context.report({
            node: node,
            messageId: "unnecessaryEscape",
            data: { character }, // data for the unnecessaryEscape overall message
            suggest: [
                {
                    messageId: "removeEscape",
                    data: { character }, // data for the removeEscape suggestion message
                    fix: function(fixer) {
                        return fixer.removeRange(range);
                    }
                }
            ]
        });
    }
};
{% endraw %}
```

### context.options

一些规则需要选项才能正确运行。这些选项出现在配置（`.eslintrc`、命令行或注释中）。比如说：

```json
{
    "quotes": ["error", "double"]
}
```

这个例子中的 `quotes` 规则有一个选项，`"double"`（`error` 是错误级别）。你可以通过使用 `context.options` 来检索一个规则的选项，这是一个包含该规则所有配置选项的数组。在这个例子中，`context.options[0]` 将包含 `"double"`。

```js
module.exports = {
    create: function(context) {
        var isDouble = (context.options[0] === "double");

        // ...
    }
};
```

由于 `context.options` 只是一个数组，你可以用它来确定有多少选项被传递，以及检索实际选项本身。请记住，错误级别不是 `context.options` 的一部分，因为错误级别不能从规则内部知道或修改。

当使用选项时，确保你的规则有一些逻辑上的默认值，以防选项没有被提供。

### context.getSourceCode()

`SourceCode` 对象是获取更多关于被提示的源代码信息的主要对象。你可以在任何时候通过使用 `getSourceCode()` 方法来检索 `SourceCode` 对象。

```js
module.exports = {
    create: function(context) {
        var sourceCode = context.getSourceCode();

        // ...
    }
};
```

一旦你有一个 `SourceCode` 的实例，你可以使用它的下列方法来处理这些代码：

* `getText(node)` - 返回指定节点的源代码。省略 `node` 以获得整个源代码。
* `getAllComments()` - 返回源代码中所有评论的数组。
* `getCommentsBefore(nodeOrToken)` - 返回直接出现在给定节点或标记之前的评论标记数组。
* `getCommentsAfter(nodeOrToken)` - 返回直接发生在给定节点或标记之后的评论标记数组。
* `getCommentsInside(node)` - 返回给定节点内所有评论标记的数组。
* `isSpaceBetween(nodeOrToken, nodeOrToken)` - 如果两个标记之间有一个空白字符，则返回真，如果给定的是一个节点，则返回第一个节点的最后一个标记和第二个节点的第一个标记。
* `getFirstToken(node, skipOptions)` - 返回代表给定节点的第一个令牌。
* `getFirstTokens(node, countOptions)` - 返回代表给定节点的第一个`count'tokens。
* `getLastToken(node, skipOptions)` - 返回代表给定节点的最后一个代币。
* `getLastTokens(node, countOptions)` - 返回代表给定节点的最后的 `count'tokens。
* `getTokenAfter(nodeOrToken, skipOptions)` - 返回给定节点或标记后的第一个标记。
* `getTokensAfter(nodeOrToken, countOptions)` - 返回给定节点或标记后的 `计数`标记。
* `getTokenBefore(nodeOrToken, skipOptions)` - 返回给定节点或标记之前的第一个标记。
* `getTokensBefore(nodeOrToken, countOptions)` - 返回给定节点或标记前的 `count` 标记。
* `getFirstTokenBetween(nodeOrToken1, nodeOrToken2, skipOptions)` - 返回两个节点或标记之间的第一个标记。
* `getFirstTokensBetween(nodeOrToken1, nodeOrToken2, countOptions)` - 返回两个节点或令牌之间的第一个`count'令牌。
* `getLastTokenBetween(nodeOrToken1, nodeOrToken2, skipOptions)` - 返回两个节点或代币之间的最后一个代币。
* `getLastTokensBetween(nodeOrToken1, nodeOrToken2, countOptions)` - 返回两个节点或令牌之间的最后 `count` 令牌。
* `getTokens(node)` - 返回给定节点的所有令牌。
* `getTokensBetween(nodeOrToken1, nodeOrToken2)` - 返回两个节点之间的所有代币。
* `getTokenByRangeStart(index, rangeOptions)` - 返回范围从源中给定索引开始的标记。
* `getNodeByRangeIndex(index)` - 返回 AST 中包含指定源索引的最深节点。
* `getLocFromIndex(index)` - 返回一个具有 `line` 和 `column` 属性的对象，对应于给定源索引的位置。`line` 是基于 1 的，`column` 是基于 0 的。
* `getIndexFromLoc(loc)` - 返回源代码中给定位置的索引，其中 `loc` 是一个对象，有一个基于 1 的 `line` 键和一个基于 0 的 `column` 键。
* `commentsExistBetween(nodeOrToken1, nodeOrToken2)` - 如果两个节点之间存在注释，则返回 `true`。

`skipOptions` 是一个有 3 个属性的对象；`skip`、`includeComments` 和 `filter`。默认是 `{skip: 0, includeComments: false, filter: null}`。

* `skip` 是一个正整数，即跳过的标记的数量。如果同时给了  `filter` 选项，它不会将过滤的标记算作跳过的标记。
* `includeComments` 是一个布尔值，是将注释标记纳入结果的标志。
* `filter` 是一个函数，获得一个标记作为第一个参数，如果该函数返回 `false`，那么结果将排除该标记。

`countOptions` 是一个有 3 个属性的对象；`count`, `includeComments` 和 `filter`. 默认是 `{count: 0, includeComments: false, filter: null}`。

* `count` 是一个正整数，是返回标记的最大数量。
* `includeComments` 是一个布尔值，是将评论标记纳入结果的标志。
* `filter` 是一个函数，获得一个标记作为第一个参数，如果该函数返回 `false`，则结果不包括该标记。

`rangeOptions` 是包含`includeComments` 属性的对象。

* `includeComments` 是一个布尔值，是将注释标记纳入结果的标志。

还有一些你可以访问的属性：

* `hasBOM` - 表示源代码是否有 Unicode BOM 的标志。
* `text` - 被提示的代码的全文。Unicode BOM 已经从这个文本中被剥离。
* `ast` - 被提示的代码的 AST 的 `Program` 节点。
* `scopeManager` - 代码的 [ScopeManager](./scope-manager-interface#scopemanager-interface) 对象。
* `visitorKeys` - 用于遍历这个 AST 的访问者键。
* `lines` - 一个行数组，根据规范中的换行定义进行分割。

当你需要获得更多关于被提示的代码的信息时，你应该使用 `SourceCode` 对象。

####  废弃

请注意，以下方法已被废弃，并将在 ESLint 的未来版本中被删除。

* `getComments()` - 由 `getCommentsBefore()`, `getCommentsAfter()` 和 `getCommentsInside()` 取代。
* `getTokenOrCommentBefore()` - 由 `getTokenBefore()` 和 `{ includeComments: true }` 选项取代
* `getTokenOrCommentAfter()` - 由 `getTokenAfter()` 取代，并加入 `{ includeComments: true }` 选项。
* `isSpaceBetweenTokens()` - 由 `isSpaceBetween()` 代替。
* `getJSDocComment()` - 由 `isSpaceBetween()` 代替。

### 选项模式

规则可以导出一个`schema` 属性，它是规则选项的 [JSON schema](https://json-schema.org/) 格式描述，ESLint 将使用它来验证配置选项，并在它们被传递到规则的 `context.options` 之前防止无效或意外输入。

规则导出的 `schema` 有两种格式。第一种是一个完整的 JSON 模式对象，描述规则接受的所有可能的选项，包括作为第一个参数的规则错误级别和其后的任何可选参数。

然而，为了简化模式的创建，规则也可以为每个可选的位置参数导出一个模式数组，ESLint 将自动首先验证所需的错误级别。例如，`yoda` 规则接受一个主要的模式参数，以及一个带有命名属性的额外选项对象。

```js
// "yoda": [2, "never", { "exceptRange": true }]
module.exports = {
    meta: {
        schema: [
            {
                "enum": ["always", "never"]
            },
            {
                "type": "object",
                "properties": {
                    "exceptRange": {
                        "type": "boolean"
                    }
                },
                "additionalProperties": false
            }
        ]
    },
};
```

在前面的例子中，错误级别被认为是第一个参数。它的后面是第一个可选参数，一个字符串，可以是 `"always"` 或 `"never"`。最后一个可选参数是一个对象，它可能有一个名为 `exceptRange` 的布尔属性。

要了解更多关于 JSON 模式的信息，我们建议从 [网站](https://json-schema.org/learn/) 中的一些例子开始，也可以阅读 [了解 JSON 模式](https://json-schema.org/understanding-json-schema/)（免费电子书）。

**注意**：目前你需要使用完整的 JSON 模式对象而不是数组，如果你的模式有引用（$ref），因为在数组格式的情况下，ESLint 将这个数组转化为一个单一的模式，而不更新引用，这使得它们不正确（它们被忽略）。

### 获取源码

如果你的规则需要获得实际的 JavaScript 源代码来工作，那么使用 `sourceCode.getText()` 方法。这个方法的工作原理如下。

```js

//获得所有的源码
var source = sourceCode.getText();

//只获取这个 AST 节点的源
var nodeSource = sourceCode.getText(node);

//获得 AST 节点的源码，加上之前的两个字符
var nodeSourceWithPrev = sourceCode.getText(node, 2);

//得到 AST 节点的来源，加上后面的两个字符
var nodeSourceWithFollowing = sourceCode.getText(node, 0, 2);
```

通过这种方式，当 AST 没有提供相应的数据时，你可以在 JavaScript 文本本身中寻找模式（比如逗号、分号、括号的位置等）。

### 访问注释

虽然注释在技术上不是 AST 的一部分，但 ESLint 提供了一些方法让规则访问它们。

#### sourceCode.getAllComments()

该方法返回在程序中发现的所有注释的数组。这对需要检查所有评论的规则很有用，无论其位置如何。

#### sourceCode.getCommentsBefore(), sourceCode.getCommentsAfter(), and sourceCode.getCommentsInside()

这些方法分别返回出现在节点正前、正后和内部的评论数组。它们对于需要检查与给定节点或标记有关的注释的规则很有用。

请记住，这个方法的结果是按需计算的。

#### 令牌遍历方法

最后，评论可以通过许多 `sourceCode` 的方法使用 `includeComments` 选项来访问。

### 访问 Shebangs

Shebangs 是由 `"Shebang"` 类型的标记表示的。它们被视为注释，可以通过上述方法访问。

### 访问代码路径

ESLint 在遍历 AST 时分析了代码路径。
你可以通过五个与代码路径有关的事件访问该代码路径对象。

[详情在此](./code-path-analysis)

## 规则单元测试

ESLint core 的每个捆绑规则必须有一组单元测试与之一起提交才能被接受。测试文件的名称与源文件相同，但住在`tests/lib/`中。例如，如果规则的源文件是 `lib/rules/foo.js`，那么测试文件应该是 `tests/lib/rules/foo.js`。

ESLint 提供了 [`RuleTester`](/docs/developer-guide/nodejs-api#ruletester) 工具，以方便为规则编写测试。

## 性能测试

为了保持提示过程的高效性和非侵入性，验证新规则或对现有规则的修改对性能的影响是非常有用的。

### 整体性能

当在 ESLint 核心库中开发时，`npm run perf`命令给出了所有核心规则启用后 ESLint 运行时间的高级概览。

```bash
$ git checkout main
Switched to branch 'main'

$ npm run perf
CPU Speed is 2200 with multiplier 7500000
Performance Run #1:  1394.689313ms
Performance Run #2:  1423.295351ms
Performance Run #3:  1385.09515ms
Performance Run #4:  1382.406982ms
Performance Run #5:  1409.68566ms
Performance budget ok:  1394.689313ms (limit: 3409.090909090909ms)

$ git checkout my-rule-branch
Switched to branch 'my-rule-branch'

$ npm run perf
CPU Speed is 2200 with multiplier 7500000
Performance Run #1:  1443.736547ms
Performance Run #2:  1419.193291ms
Performance Run #3:  1436.018228ms
Performance Run #4:  1473.605485ms
Performance Run #5:  1457.455283ms
Performance budget ok:  1443.736547ms (limit: 3409.090909090909ms)
```

### 每条规则的性能

ESLint 有一个内置的方法来跟踪单个规则的性能。设置`TIMING'环境变量将触发显示，在检查完成后，显示10个运行时间最长的规则，以及它们的单独运行时间（规则创建+规则执行）和相对性能影响占总规则处理时间（规则创建 + 规则执行）的百分比。

```bash
$ TIMING=1 eslint lib
Rule                    | Time (ms) | Relative
:-----------------------|----------:|--------:
no-multi-spaces         |    52.472 |     6.1%
camelcase               |    48.684 |     5.7%
no-irregular-whitespace |    43.847 |     5.1%
valid-jsdoc             |    40.346 |     4.7%
handle-callback-err     |    39.153 |     4.6%
space-infix-ops         |    35.444 |     4.1%
no-undefined            |    25.693 |     3.0%
no-shadow               |    22.759 |     2.7%
no-empty-class          |    21.976 |     2.6%
semi                    |    19.359 |     2.3%
```

要明确测试一个规则，请同时使用 `--no-eslintrc` 和 `--rule` 选项。

```bash
$ TIMING=1 eslint --no-eslintrc --rule "quotes: [2, 'double']" lib
Rule   | Time (ms) | Relative
:------|----------:|--------:
quotes |    18.066 |   100.0%
```

要看到更长的结果列表（超过 10 个），请将环境变量设置为其他值，如 `TIMING=50` 或 `TIMING=all`。

## 规则命名约定

ESLint 的规则命名约定是相当简单的。

* 如果你的规则不允许某些东西，就用 `no-` 作为前缀，比如 `no-eval` 表示不允许 `eval()`，`no-debugger` 表示不允许`debugger`。
* 如果你的规则是强制包含某些东西，使用一个没有特殊前缀的短名称。
* 在单词之间使用破折号。

## 运行时规则

使得 ESLint 与其他 linters 不同的是，它能够在运行时定义自定义规则。这对于那些针对你的项目或公司的规则来说是完美的，因为 ESLint 在发货时是没有意义的。有了运行时规则，你不必等待 ESLint 的下一个版本，也不必为你的规则不足以适用于更大的 JavaScript 社区而感到失望，只需编写你的规则并在运行时将其包括在内。

运行时规则的编写格式与所有其他规则相同。像其他规则一样创建你的规则，然后按照以下步骤进行：

1. 把你所有的运行时规则放在同一个目录下（如 `eslint_rules`）。
2. 创建[配置文件](../user-guide/configuring/) 并在 `rules` 键下指定你的规则 ID 错误级别。你的规则将不会运行，除非它在配置文件中的值是 `"warn"` 或 `"error"`。
3. 运行[命令行界面](../user-guide/command-line-interface)，使用 `--rulesdir`选项来指定你的运行规则的位置。
