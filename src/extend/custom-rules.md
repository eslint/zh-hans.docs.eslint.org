---
title: 自定义规则
eleventyNavigation:
    key: custom rules
    parent: create plugins
    title: 自定义规则
    order: 2
---

你可以创建自定义规则并与 ESLint 一同使用。当[核心规则](../rules/)没有覆盖你的用例时，就可能需要创建自定义规则。

**注意**：本页涵盖了 ESLint >= 3.0.0 的最新规则格式，以及[废弃的规则格式](./custom-rules-deprecated)。

以下是自定义规则的基础格式：

```js
// customRule.js
module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Description of the rule",
        },
        fixable: "code",
        schema: [] // 没有提供选项
    },
    create: function(context) {
        return {
            // 回调函数
        };
    }
};
```

## 规则结构

一个规则的源文件导出一个具有以下属性的对象。自定义规则和核心规则均遵守此格式。

`meta`：（`object`）包含规则的元数据。

* `type`：（`string`）表示规则的类型，是 `"problem"`、`"suggestion"` 或 `"layout"` 其中之一。
    * `"problem"` 意味着该规则正在识别将导致错误或可能导致混乱行为的代码。开发人员应该把它作为一个高度优先事项来解决。
    * `"suggestion"` 意味着该规则确定了一些可以用更好的方式完成的事情，但如果不改变代码，就不会发生错误。
    * `"layout"` 意味着该规则主要关心的是空白、分号、逗号和括号，所有决定代码外观的部分，而不是代码的执行方式。这些规则对代码中没有在 AST 中指定的部分起作用。

* `docs`：（`object`）核心规则必须存在此字段，而自定义规则则可自行选择与否。核心规则在 `docs` 中有特定的条目，而自定义规则可以包含任何需要的属性。以下属性仅适用于核心规则。

    * `description`：（`string`）在[规则页面](../rules/)中提供规则的简短描述。
    * `recommended`：（`boolean`）表示在[配置文件](../use/configure/configuration-files#扩展配置文件) 中是否使用 `"extends": "eslint:recommended"` 属性启用该规则。
    * `url`：（`string`）指定可以访问完整文档的链接（使代码编辑器能够在突出显示的规则违反上提供一个有用的链接）

    在自定义规则或插件中，你可以省略 `docs` 或在其中包含你需要的任何属性。

* `fixable`：（`string`）是 `"code"` 或 `"whitespace"`，如果[命令行](../use/command-line-interface#-fix)上的 `--fix` 选项自动修复规则报告的问题

    **重点**：`fixable` 属性对于可修复规则是强制性的。如果没有指定这个属性，ESLint 将在规则试图产生一个修复时抛出一个错误。如果规则不是可修复的，则省略 `fixable` 属性。

* `hasSuggestions`：（`boolean`）指定规则是否可以返回建议（如果省略，默认为 `false`）。

    **重点**：`hasSuggestions` 属性对于提供建议的规则来说是强制性的。如果这个属性没有设置为 `true`，ESLint 将在规则试图产生建议时抛出一个错误。如果规则不提供建议，省略 `hasSuggestions` 属性。

* `schema`：（`object | array`）指定了 [options](#选项模式)，所以 ESLint 可以防止无效的[规则配置](../use/configure/rules)

* `deprecated`：（`boolean`）表示该规则是否已经被废弃。如果规则没有被废除，你可以省略 `deprecated` 属性。

* `replacedBy`：（`array`）如果是被废弃的规则，指定替代规则。

`create()`：返回一个对象，该对象具有 ESLint 调用的方法，在遍历 JavaScript 代码的抽象语法树（由 [ESTree](https://github.com/estree/estree) 定义的 AST）时 `visit"` 节点。

* 如果键是节点类型或[选择器](./selectors)，ESLint 在 **down tree** 时调用该 **visitor**函数。
* 如果键是节点类型或[选择器](./selectors)加 `:exit`，ESLint 在 **up tree** 时调用该 **visitor** 函数。
* 如果一个键是一个事件名称，ESLint 调用该 **handler** 函数进行[代码链路分析](./code-path-analysis)。

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

在定义规则的 `create` 方法仅有唯一的参数 `context` 对象。例如：

```js
// customRule.js

module.exports = {
    meta: { ... },
    // `context` object is the argument
    create(context) {
       // ...
    }
};
```

顾名思义，`context` 对象包含与规则上下文相关的信息。

`context` 对象有下列属性：

* `id`：（`string`）规则 ID。
* `filename`：（`string`）与源文件相关的文件名。
* `physicalFilename`：（`string`）在检测文件时，它会提供文件在磁盘上的完整路径，但不包含任何代码块信息。如果是文本，则提供传递给 `-stdin-filename` 的值，如果未指定，则提供 `<text>`。
* `cwd`：（`string`）传递给 [Linter](../integrate/nodejs-api#linter) 的 `cwd` 选项。它是指向目录的路径，该目录应被视为当前工作目录。
* `options`：（`array`）此规则[配置选项](../use/configure/rules)的数组。次数组不包括规则的严重程度。更多信息，请参阅[这里](#访问传递给规则的选项)。
* `sourceCode`：（`object`）`SourceCode` 对象，可以用它来处理传递给 ESLint 的源代码（请参阅[访问源代码](#访问源代码)）。
* `settings`：（`object`）配置中的[共享设置](../use/configure/configuration-files#添加共享设置)。
* `parserPath`：（`string`）配置中的 `parser` 的名称。
* `parserServices`：（**废弃**：使用 `SourceCode#parserServices` 代替）包含解析器提供的规则服务的对象。默认的解析器不提供任何服务。然而，如果一个规则打算与一个自定义的解析器一起使用，它可以使用 `parserServices` 来访问该解析器提供的任何服务（例如，TypeScript 解析器可以提供获取特定节点的计算类型的能力）。
* `parserOptions` - 为本次运行配置的解析器选项（[了解详情](../use/configure/language-options#指定解析器选项)）。

此外，`context` 对象有以下方法。

* `getAncestors()`：返回当前遍历的节点的祖先数组，从 AST 的根开始，一直到当前节点的直接父节点。这个数组不包括当前遍历的节点本身。
* `getCwd()`：（**废弃**：使用 `context.cwd` 替代）返回传递给 [Linter](../integrate/nodejs-api#linter) 的 `cwd`。它是一个目录的路径，应该被视为当前工作目录。
* `getDeclaredVariables(node)`：返回由给定节点声明的[变量](./scope-manager-interface#variable-接口)的列表。这个信息可以用来跟踪对变量的引用。
    * 如果该节点是 `VariableDeclaration`，则返回声明中的所有变量。
    * 如果该节点是 `VariableDeclarator`，将返回所有在声明器中声明的变量。
    * 如果该节点是 `FunctionDeclaration` 或 `FunctionExpression`，除了函数参数的变量外，还将返回函数名称的变量。
    * 如果该节点是 `ArrowFunctionExpression`，将返回参数的变量。
    * 如果该节点是 `ClassDeclaration` 或 `ClassExpression`，将返回类名的变量。
    * 如果该节点是 `CatchClause`，将返回异常的变量。
    * 如果该节点是 `ImportDeclaration`，将返回其所有的指定变量。
    * 如果该节点是 `ImportSpecifier`、`ImportDefaultSpecifier` 或 `ImportNamespaceSpecifier`，则返回声明的变量。
    * 否则，如果该节点没有声明任何变量，将返回一个空数组。
* `getFilename()`：（**废弃**：使用 `context.filename` 代替）返回与源相关的文件名。
* `getPhysicalFilename()`：当给文件加注时，它返回磁盘上文件的完整路径，没有任何代码块信息。当对文本着色时，它返回传递给 `—stdin-filename` 的值，如果没有指定则返回 `<text>`。
* `getScope()`：（**废弃**：使用 `SourceCode#getScope(node)` 代替）返回当前遍历的节点的[范围](./scope-manager-interface#scope-接口)。这个信息可以用来跟踪对变量的引用。
* `getSourceCode()`：（**废弃**：使用 `context.sourceCode` 代替）返回 `SourceCode` 对象，你可以用它来处理传递给 ESLint 的源代码。（查看[访问源代码](#访问源代码)）
* `markVariableAsUsed(name)`：（**废弃**：使用 `SourceCode#markVariableAsUsed(name, node)` 代替）将当前范围内给定名称的变量标记为已使用。这影响到 [no-unused-vars](../rules/no-unused-vars) 规则。如果找到给定名称的变量并标记为已使用，则返回 `true`，否则返回 `false`。
* `report(descriptor)`：报告代码中的问题（见[专用部分](#报告问题)）。

**注意**：早期版本的 ESLint 支持对 `context` 对象的额外方法。这些方法在新的格式中被删除，不应该被依赖。

### 报告问题

在编写自定义规则时将使用的主要方法是 `context.report()`，它发布一个警告或错误（取决于正在使用的配置）。这个方法接受一个参数，它是一个包含以下属性的对象：

* `message`：（`string`）问题信息。
* `node`：（可选的 `object`）与问题有关的 AST 节点。如果存在并且没有指定 `loc`，那么该节点的起始位置将作为问题的位置。
* `loc`：（可选的 `object`）一个指定问题位置的对象。如果同时指定了 `loc` 和 `node`，那么将使用 `loc` 而不是 `node` 的位置。
    * `start`：一个起始位置的对象。
        * `line`：（`number`）从 1 开始计算的发生问题的行号。
        * `column`：（`number`）从 0 开始计算的发生问题的列号。
    * `end`：一个结束位置的对象。
        * `line`：（`number`）从 1 开始计算的发生问题的行号。
        * `column`：（`number`）从 0 开始计算的发生问题的列号。
* `data`: (可选的 `object`）[placeholder](#使用信息占位符) `message` 的数据。
* `fix(fixer)`：（可选的 `function`）一个应用[修复](#应用修复)的函数，以解决这个问题。

请注意，至少需要 `node` 或 `loc` 中的一个。

最简单的例子是只使用 `node` 和 `message`。

```js
context.report({
    node: node,
    message: "Unexpected identifier"
});
```

该节点包含了所有必要的信息，以计算出违规文本的行数和列数，以及代表该节点的源文本。

#### 使用信息占位符

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

#### `messageId`s

在 `context.report()` 调用和你的测试中，你可以使用 `messageId` 来代替打出信息。

这使你可以避免重复错别字信息。它还可以防止在你的规则的不同部分报告的错误有过时的信息。

规则文件：

```js
{% raw %}
// avoid-name.js
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
{% endraw %}
```

文件检查：

```js
// someFile.js
var foo = 2;
//  ^ error: Avoid using variables named 'foo'
```

在测试中：

```js
var rule = require("../../../lib/rules/my-rule");
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("avoid-name", rule, {
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
```

#### 应用修复

如果你想让 ESLint 尝试修复你报告的问题，你可以在使用 `context.report()` 时指定 `fix` 函数来实现。`fix` 函数接收一个参数，即 `fixer` 对象，你可以用它来应用修复。比如说：

```js
context.report({
    node: node,
    message: "Missing semicolon",
    fix(fixer) {
        return fixer.insertTextAfter(node, ";");
    }
});
```

此处 `fix()` 函数被用来在节点后面插入一个分号。请注意，修复并不是立即应用的，如果与其他修复有冲突，可能根本就不会应用。在应用修复后，ESLint 将在修复的代码上再次运行所有启用的规则，可能会应用更多的修复。这个过程最多重复 10 次，或者直到没有发现更多可修复的问题。之后，任何剩余的问题都会像往常一样被报告。

**重点**：`meta.fixable` 属性对于可修复规则是必须的。如果一个实现 `fix` 功能的规则没有[导出](#规则结构) `meta.fixable` 属性，ESLint 将抛出一个错误。

`fixer` 对象有以下方法：

* `insertTextAfter(nodeOrToken, text)`：在给定的节点或标记后插入文本。
* `insertTextAfterRange(range, text)`：在给定的范围后插入文本。
* `insertTextBefore(nodeOrToken, text)`：在给定的节点或标记之前插入文本。
* `insertTextBeforeRange(range, text)`：在给定范围之前插入文本。
* `remove(nodeOrToken)`：删除指定的节点或标记。
* `removeRange(range)`：移除给定范围内的文本。
* `replaceText(nodeOrToken, text)`：替换给定节点或标记中的文本
* `replaceTextRange(range, text)`：替换给定范围内的文本。

`range` 数组仅有两项，包含源代码中的字符索引。第一项是范围的开始（包括），第二项是范围的结束（不包括）。每个节点和标记都有一个 `range` 属性，以确定它们所代表的源代码范围。

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

    * 这个修复器可以随便选择一个报价类型。如果它猜错了，产生的代码将被自动报告并由 [`quotes`](../rules/quotes) 规则修复。

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

#### 提供建议

在某些情况下，修正不适合自动应用，例如，如果一个修正可能会改变功能，或者根据实现意图，有多种有效的方法来修正一个规则（见上面列出的[应用修复](#应用修复) 的最佳实践）。在这些情况下，在 `context.report()` 上有一个替代的 `suggest` 选项，允许其他工具，如编辑器，为用户手动应用建议暴露出帮助器。

在报告参数中使用 `suggest` 键和建议对象的数组，可以提供建议。建议对象代表可以应用的单个建议，需要一个 `desc` 键字符串，描述应用建议的作用或 `messageId` 键（见[下文](#建议性-messageid)），以及 `fix` 键，这是一个定义建议结果的函数。这个 `fix` 函数遵循与常规 fix 相同的 API（在上面的[应用修复](#应用修复)中描述）。

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

**重点**：`meta.hasSuggestions` 属性对于提供建议的规则来说是强制性的。如果一个规则试图产生一个建议，但没有[导出](#规则结构)这个属性，ESLint 将抛出一个错误。

注意：建议将作为一个独立的变化被应用，而不会触发多通道修复。每个建议都应该关注代码中的单一变化，不应该试图符合用户定义的风格。例如，如果一个建议是在代码库中添加一个新的语句，它不应该试图匹配正确的缩进，或符合用户对分号的存在/不存在的偏好。所有这些都可以通过用户触发的多通道自动修正来进行修正。

建议的最佳做法：

1. 不要试图做得太多，建议大型重构，因为这可能会引入很多破坏性的变化。
1. 如上所述，不要试图符合用户定义的风格。

建议的目的是为了提供修复。如果建议的 `fix` 函数返回 `null` 或空数组/序列，ESLint 将自动从 linting 输出中删除整个建议。

#### 建议性 `messageId`

可以用 `messageId` 代替建议的 `desc` 键。这与 `messageId` 对整个错误的作用相同（见 [messageIds](#messageids)）。下面是一个如何在规则中使用建议性 `messageId` 的例子：

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
                    messageId: "removeEscape", // 建议性 messageId
                    fix: function(fixer) {
                        return fixer.removeRange(range);
                    }
                },
                {
                    messageId: "escapeBackslash", // 建议性 messageId
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

你也可以在建议信息中使用占位符。这与整体错误的占位符的工作方式相同（见[使用消息占位符](#使用信息占位符)）。

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

### 访问传递给规则的选项

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

### 访问源代码

`SourceCode` 对象是获取更多关于被提示的源代码信息的主要对象。你可以在任何时候通过使用 `context.sourceCode` 属性来检索 `SourceCode` 对象。

```js
module.exports = {
    create: function(context) {
        var sourceCode = context.sourceCode;

        // ...
    }
};
```

**废弃**：`context.getSourceCode()` 方法已废弃；请确保使用 `context.sourceCode` 属性代替。

当有 `SourceCode` 实例后，你可以使用它的下列方法来处理这些代码：

* `getText(node)`：返回指定节点的源代码。省略 `node` 以获得整个源代码。（查看[专用章节](#访问源文本))
* `getAllComments()`：返回源代码中所有评论的数组。（查看[专用章节](#访问注释))
* `getCommentsBefore(nodeOrToken)`：返回直接出现在给定节点或标记之前的注释标记数组。（查看[专用章节](#访问注释))
* `getCommentsAfter(nodeOrToken)`：返回直接发生在给定节点或标记之后的注释标记数组。（查看[专用章节](#访问注释))
* `getCommentsInside(node)`：返回给定节点内所有评论标记的数组。（查看[专用章节](#访问注释))
* `isSpaceBetween(nodeOrToken, nodeOrToken)` - 如果两个标记之间有一个空白字符，则返回真，如果给定的是一个节点，则返回第一个节点的最后一个标记和第二个节点的第一个标记。
* `getFirstToken(node, skipOptions)`：返回代表给定节点的第一个标记。
* `getFirstTokens(node, countOptions)`：返回代表给定节点的第一个`count` 标记。
* `getLastToken(node, skipOptions)`：返回代表给定节点的最后一个标记。
* `getLastTokens(node, countOptions)`：返回代表给定节点的最后的 `count` 标记。
* `getTokenAfter(nodeOrToken, skipOptions)`：返回给定节点或标记后的第一个标记。
* `getTokensAfter(nodeOrToken, countOptions)`：返回给定节点或标记后的 `count` 标记。
* `getTokenBefore(nodeOrToken, skipOptions)`：返回给定节点或标记之前的第一个标记。
* `getTokensBefore(nodeOrToken, countOptions)`：返回给定节点或标记前的 `count` 标记。
* `getFirstTokenBetween(nodeOrToken1, nodeOrToken2, skipOptions)`：返回两个节点或标记之间的第一个标记。
* `getFirstTokensBetween(nodeOrToken1, nodeOrToken2, countOptions)`：返回两个节点或标记之间的第一个 `count` 标记。
* `getLastTokenBetween(nodeOrToken1, nodeOrToken2, skipOptions)`：返回两个节点或标记之间的最后一个标记。
* `getLastTokensBetween(nodeOrToken1, nodeOrToken2, countOptions)`：返回两个节点或标记之间的最后 `count` 标记。
* `getTokens(node)`：返回给定节点的所有标记。
* `getTokensBetween(nodeOrToken1, nodeOrToken2)`：返回两个节点之间的所有标记。
* `getTokenByRangeStart(index, rangeOptions)`：返回范围从源中给定索引开始的标记。
* `getNodeByRangeIndex(index)`：返回 AST 中包含指定源索引的最深节点。
* `getLocFromIndex(index)`：返回一个具有 `line` 和 `column` 属性的对象，对应于给定源索引的位置。`line` 是基于 1 的，`column` 是基于 0 的。
* `getIndexFromLoc(loc)`：返回源代码中给定位置的索引，其中 `loc` 是一个对象，有一个基于 1 的 `line` 键和一个基于 0 的 `column` 键。
* `commentsExistBetween(nodeOrToken1, nodeOrToken2)`：如果两个节点之间存在注释，则返回 `true`。

`skipOptions` 是一个有 3 个属性的对象；`skip`、`includeComments` 和 `filter`。默认是 `{skip: 0, includeComments: false, filter: null}`。

* `skip`：（`number`）正整数，即跳过的标记的数量。如果同时给了 `filter` 选项，它不会将过滤的标记算作跳过的标记。
* `includeComments`：（`boolean`）将注释标记纳入结果的标志。
* `filter(token)`：使用 token 作为第一个参数的函数，如果该函数返回 `false`，那么结果将排除该标记。

`countOptions` 是一个有 3 个属性的对象；`count`, `includeComments` 和 `filter`. 默认是 `{count: 0, includeComments: false, filter: null}`。

* `count`：（`number`）正整数，返回标记的最大数量。
* `includeComments`：（`boolean`是将评论标记纳入结果的标志。
* `filter(token)`：使用 token 作为第一个参数的函数，如果该函数返回 `false`，则结果不包括该标记。

`rangeOptions` 对象包含 `includeComments` 属性，默认为 `{includeComments: false}`。

* `includeComments`：（`boolean`）将注释标记纳入结果的标志。

还有一些你可以访问的属性：

* `hasBOM`：（`boolean`）表示源代码是否有 Unicode BOM 的标志。
* `text`：（`string`）被提示的代码的全文。Unicode BOM 已经从这个文本中被剥离。
* `ast`：（`object`）被提示的代码的 AST 的 `Program` 节点。
* `scopeManager`：代码的 [ScopeManager](./scope-manager-interface#scopemanager-interface) 对象。
* `visitorKeys`：（`object`）用于遍历这个 AST 的访问者键。
* `parserServices`: (`object`) 包含规则所需的由解析器提供的服务。默认解析器不提供任何服务。然而，如果一个规则旨在与自定义解析器一起使用，它可以使用 `parserServices` 来访问由该解析器提供的任何内容（例如，TypeScript 解析器提供的获取给定节点的计算类型的能力）。
* `lines`：（`array`）各行的数组，根据规范中的换行定义进行分割。

当你需要获得更多关于被提示的代码的信息时，你应该使用 `SourceCode` 对象。

#### 访问源文本

如果你的规则需要获得实际的 JavaScript 源代码来工作，那么使用 `sourceCode.getText()` 方法。这个方法的工作原理如下：

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

虽然注释在技术上不是 AST 的一部分，但 ESLint 提供了 `sourceCode.getAllComments()`、`sourceCode.getCommentsBefore()`、`sourceCode.getCommentsAfter()` 和 `sourceCode.getCommentsInside()` 来访问它们。

`sourceCode.getCommentsBefore()`、`sourceCode.getCommentsAfter()` 和 `sourceCode.getCommentsInside()` 对于需要检查与给定节点或令牌相关的注释的规则非常有用。

请记住，这个方法的结果是按需计算的。

你也可以通过 `includeComments` 使用许多 `sourceCode` 方法访问注释

#### 标记遍历方法

最后，评论可以通过许多 `sourceCode` 的方法使用 `includeComments` 选项来访问。

#### 废弃

请注意，以下方法已被废弃，并将在 ESLint 的未来版本中被删除。

* `getComments()` - 由 `getCommentsBefore()`, `getCommentsAfter()` 和 `getCommentsInside()` 取代。
* `getTokenOrCommentBefore()` - 由 `getTokenBefore()` 和 `{ includeComments: true }` 选项取代
* `getTokenOrCommentAfter()` - 由 `getTokenAfter()` 取代，并加入 `{ includeComments: true }` 选项。
* `isSpaceBetweenTokens()` - 由 `isSpaceBetween()` 代替。
* `getJSDocComment()` - 由 `isSpaceBetween()` 代替。

### 选项模式

规则可以指定 `schema` 属性，它是规则选项使用 [JSON Schema](https://json-schema.org/) 格式进行的描述，ESLint 将使用它来验证配置选项，并在它们被传递到规则的 `context.options` 之前防止无效或意外输入。

注意：在 ESLint v9.0.0 之前，没有模式的规则直接从配置中传递其选项，没有进行任何验证。在 ESLint v9.0.0 及更高版本中，没有模式的规则在传递选项时将引发错误。有关更多详细信息，请参阅 [Require schemas and object-style rules](https://github.com/eslint/rfcs/blob/main/designs/2021-schema-object-rules/README.md) RFC。

在验证规则的配置时，有五个步骤：

1. 如果规则配置不是数组，则该值将包装成数组（例如，`"off"` 变为 `["off"]`）；如果规则配置是数组，则直接使用。
2. ESLint 将规则配置数组的第一个元素验证为严重性（`"off"`，`"warn"`，`"error"`，`0`，`1`，`2`）。
3. 如果严重性是 `off` 或 `0`，则规则被禁用，并且验证停止，忽略规则配置数组中的任何其他元素。
4. 如果规则已启用，则将严重性后的数组中的任何元素复制到 `context.options` 数组中（例如，`["warn", "never", { someOption: 5 }]` 配置的结果为 `context.options = ["never", { someOption: 5 }]`）。
5. 对 `context.options` 数组运行规则的模式验证。

注意：这意味着规则模式无法验证严重性。规则模式仅验证规则配置中严重性后的数组元素。规则无法知道其配置的严重性。

规则的 `schema` 有两种格式：

* 一组 JSON Schema 对象
  * 每个元素将与 `context.options` 数组中的相同位置进行比较。
  * 如果 `context.options` 数组的元素少于模式的元素，则未匹配的模式将被忽略。
  * 如果 `context.options` 数组的元素多于模式的元素，则验证失败。
  * 使用此格式有两个重要的后果：
    * 用户始终可以提供没有任何选项的规则配置（除了严重性），这是_始终有效的_。
    * 如果指定一个空数组，则对于用户提供规则配置中的任何选项（除了严重性）都_始终是一个错误的_。
* 完整的 JSON Schema 对象，将验证 `context.options` 数组
  * 模式应该假定一个选项数组，即使你的规则只接受一个选项。
  * 模式可以是任意复杂的，因此你可以通过 `oneOf`、`anyOf` 等验证完全不同的潜在选项集。
  * JSON Schema 的支持版本是 [Draft-04](http://json-schema.org/draft-04/schema)，因此一些较新的功能，如 `if` 或 `$data`，不可用。
    * 目前，明确计划不更新模式支持超出此级别，因为存在生态系统兼容性问题。有关进一步上下文，请参阅[此评论](https://github.com/eslint/eslint/issues/13888#issuecomment-872591875)。

例如，`yoda` 规则接受 `"always"` 或 `"never"` 的主要模式参数，以及可选属性 `"exceptRange"` 的额外选项对象：

```js
// Valid configuration:
// "yoda": "warn"
// "yoda": ["error"]
// "yoda": ["error", "always"]
// "yoda": ["error", "never", { "exceptRange": true }]
// Invalid configuration:
// "yoda": ["warn", "never", { "exceptRange": true }, 5]
// "yoda": ["error", { "exceptRange": true }, "never"]
module.exports = {
    meta: {
        schema: [
            {
                enum: ["always", "never"]
            },
            {
                type: "object",
                properties: {
                    exceptRange: { type: "boolean" }
                },
                additionalProperties: false
            }
        ]
    }
};
```

这是等效的基于对象的模式：

```js
// Valid configuration:
// "yoda": "warn"
// "yoda": ["error"]
// "yoda": ["error", "always"]
// "yoda": ["error", "never", { "exceptRange": true }]
// Invalid configuration:
// "yoda": ["warn", "never", { "exceptRange": true }, 5]
// "yoda": ["error", { "exceptRange": true }, "never"]
module.exports = {
    meta: {
        schema: {
            type: "array",
            minItems: 0,
            maxItems: 2,
            items: [
                {
                    enum: ["always", "never"]
                },
                {
                    type: "object",
                    properties: {
                        exceptRange: { type: "boolean" }
                    },
                    additionalProperties: false
                }
            ]
        }
    }
};
```

对象模式可以更精确和限制允许的内容。例如，下面的模式始终要求指定第一个选项（介于 0 和 10 之间的数字），但第二个选项是可选的，可以是显式设置了一些选项的对象，也可以是 `"off"` 或 `"strict"`。

```js
// Valid configuration:
// "someRule": ["error", 6]
// "someRule": ["error", 5, "strict"]
// "someRule": ["warn", 10, { someNonOptionalProperty: true }]
// Invalid configuration:
// "someRule": "warn"
// "someRule": ["error"]
// "someRule": ["warn", 15]
// "someRule": ["warn", 7, { }]
// "someRule": ["error", 3, "on"]
// "someRule": ["warn", 7, { someOtherProperty: 5 }]
// "someRule": ["warn", 7, { someNonOptionalProperty: false, someOtherProperty: 5 }]
module.exports = {
    meta: {
        schema: {
            type: "array",
            minItems: 1, // Can't specify only severity!
            maxItems: 2,
            items: [
                {
                    type: "number",
                    minimum: 0,
                    maximum: 10
                },
                {
                    anyOf: [
                        {
                            type: "object",
                            properties: {
                                someNonOptionalProperty: { type: "boolean" }
                            },
                            required: ["someNonOptionalProperty"],
                            additionalProperties: false
                        },
                        {
                            enum: ["off", "strict"]
                        }
                    ]
                }
            ]
        }
    }
}
```

记住，规则选项始终是一个数组，因此要小心不要在顶层为非数组类型指定模式。如果你的模式在顶层没有指定数组，用户永远无法启用你的规则，因为启用规则时他们的配置将始终是无效的。
以下是一个始终无法通过验证的示例模式：

```js
// Possibly trying to validate ["error", { someOptionalProperty: true }]
// but when the rule is enabled, config will always fail validation because the options are an array which doesn't match "object"
module.exports = {
    meta: {
        schema: {
            type: "object",
            properties: {
                someOptionalProperty: {
                    type: "boolean"
                }
            },
            additionalProperties: false
        }
    }
}
```

**注意**：如果你的规则架构使用 JSON Schema 的 [`$ref`](https://json-schema.org/understanding-json-schema/structuring.html#ref) 属性，则必须使用完整的 JSON Schema 对象而不是位置属性模式数组。这是因为 ESLint 将数组简写转换为单个模式，而不更新导致它们不正确的引用（它们被忽略）。

要了解更多关于 JSON 模式的信息，我们建议从[网站](https://json-schema.org/learn/)中的一些例子开始，也可以阅读[了解 JSON Schema](https://json-schema.org/understanding-json-schema/)（免费电子书）。

### 访问 Shebangs

[Shebangs (#!)](https://en.wikipedia.org/wiki/Shebang_(Unix)) 由专属 `"Shebang"` 类型的 token 表示的。它们被视为注释，可以通过 [访问注释](#访问注释) 章节中的方法访问，比如 `sourceCode.getAllComments()`。

### 访问变量作用域

`SourceCode#getScope(node)` 方法返回给定节点的作用域。它通常用于查找给定作用域内变量的信息及其在其他作用域内的使用情况。

#### 作用域类型

下表列出了 AST 节点类型和与之对应的作用域类型。了解更多关于作用域类型的信息，请参见 [`Scope` 对象文档](./scope-manager-interface#scope-接口).

| AST 节点类型               | 作用域类型   |
|:--------------------------|:-----------|
| `Program`                 | `global`   |
| `FunctionDeclaration`     | `function` |
| `FunctionExpression`      | `function` |
| `ArrowFunctionExpression` | `function` |
| `ClassDeclaration`        | `class`    |
| `ClassExpression`         | `class`    |
| `BlockStatement` ※1       | `block`    |
| `SwitchStatement` ※1      | `switch`   |
| `ForStatement` ※2         | `for`      |
| `ForInStatement` ※2       | `for`      |
| `ForOfStatement` ※2       | `for`      |
| `WithStatement`           | `with`     |
| `CatchClause`             | `catch`    |
| 其他                      | ※3         |

**※1** 仅当配置的解析器提供了块级作用域功能时才有效。如果 `parserOptions.ecmaVersion` 不小于 `6`，默认解析器将提供块级作用域功能。
**※2** 仅当 `for` 语句将迭代变量定义为块级作用域变量时才有效（例如，`for (let i = 0;;) {}`）。
**※3** 最接近的祖先节点的作用域，该节点具有自己的作用域。如果最接近的祖先节点具有多个作用域，则选择最内层的作用域（例如，如果 `Program#sourceType` 为 `"module"`，`Program` 节点具有 `global` 作用域和 `module` 作用域。最内层的作用域是 `module` 作用域）。

#### 作用域变量

`Scope#variables` 属性包括一个包含 [`Variable` 对象](./scope-manager-interface#variable-接口) 的数组。这些时在当前作用域声明的变量。你可以使用这些 `Variable` 对象来跟踪变量在整个模块中的引用情况。

在每个 `Variable` 内部，`Variable#references` 属性包括一个包含 [`Reference` 对象](./scope-manager-interface#reference-接口)的数组。`Reference` 数组包括所有变量在模块源码中被引用的位置。

同样的在每个 `Variable` 内部，`Variable#defs` 属性包括一个包含 [`Definition` 对象](./scope-manager-interface#definition-接口)的数组。你可以使用 `Definitions` 来寻找变量被定义的位置。

全局变量有以下额外属性：

* `Variable#writeable`（`boolean | undefined`） ... 如果 `true`，这个全局变量可以被分配任意的值。如果 `false`，这个全局变量是只读的。
* `Variable#eslintExplicitGlobal`（`boolean | undefined`） ... 如果 `true`，这个全局变量是由源代码文件中的 `/* globals */` 指令注释定义的。
* `Variable#eslintExplicitGlobalComments`（`Comment[] | undefined`） ... 在源代码文件中定义该全局变量的 `/* globals */` 指令性注释的数组。如果没有 `/* globals */` 指令注释，这个属性就是 `undefined`。
* `Variable#eslintImplicitGlobalSetting`（`"readonly" | "writable" | undefined`） ... 配置文件中的配置值。如果有 `/* globals */` 指令注释，这可能与 `variable.writeable` 不同。

关于使用 `SourceCode#getScope()` 来跟踪变量的例子，请参考以下内置规则的源代码：

* [no-shadow](https://github.com/eslint/eslint/blob/main/lib/rules/no-shadow.js)：在全局作用域调用 `sourceCode.getScope()` 并解析所有子作用域以确保变量名没有在更低作用域中被再次使用（[no-shadow](../rules/no-shadow) 文档）。
* [no-redeclare](https://github.com/eslint/eslint/blob/main/lib/rules/no-redeclare.js)：在每个作用域调用 `sourceCode.getScope()` 以确保变量没有在此作用域中多次声明（[no-redeclare](../rules/no-redeclare) 文档）。

### 标记变量已使用

**废弃**：`context.markVariableAsUsed()` 方法已弃用，并由 `sourceCode.markVariableAsUsed()` 所取代。

某些 ESLint 规则，例如 [`no-unused-vars`](../rules/no-unused-vars)，会检查变量是否已被使用ESLint 本身只知道变量访问的标准规则，因此访问变量的自定义方式可能不会注册为“已使用”。

为了帮助解决这个问题，你可以使用 `sourceCode.markVariableAsUsed()` 方法。此方法采用两个参数：要标记为已使用的变量的名称和指示正在工作的范围的选项引用节点。这有一个例子：

```js
module.exports = {
    create: function(context) {
        var sourceCode = context.sourceCode;

        return {
            ReturnStatement(node) {

                // look in the scope of the function for myCustomVar and mark as used
                sourceCode.markVariableAsUsed("myCustomVar", node);

                // or: look in the global scope for myCustomVar and mark as used
                sourceCode.markVariableAsUsed("myCustomVar");
            }
        }
        // ...
    }
};
```

这里的 `myCustomVar` 变量被标记为相对于 `ReturnStatement` 节点使用，这意味着 ESLint 将从最接近该节点的范围开始搜索。如果省略第二个参数，则使用顶级作用域（ESM 文件中顶级作用域是模块作用域；CommonJS 文件中顶级作用域是第一个函数作用域）。

### 访问代码路径

ESLint 在遍历 AST 时分析了代码路径。你可以通过五个与代码路径有关的事件访问该代码路径对象。有关详细信息，请参阅[代码路径分析](code-path-analysis)。

### 废弃的 `SourceCode` 方法

请注意，以下 `SourceCode` 方法已被弃用，并将在 ESLint 的未来版本中删除：

* `getComments()`：由 `SourceCode#getCommentsBefore()`、`SourceCode#getCommentsAfter()` 和 `SourceCode#getCommentsInside()` 取代。
* `getTokenOrCommentBefore()`：由使用 `{ includeComments: true }` 选项的 `SourceCode#getTokenBefore()` 取代。
* `getTokenOrCommentAfter()`：由使用 `{ includeComments: true }` 选项的 `SourceCode#getTokenAfter()` 取代。
* `isSpaceBetweenTokens()`: 由 `SourceCode#isSpaceBetween()` 取代
* `getJSDocComment()`

## 规则单元测试

ESLint 提供了 [`RuleTester`](../integrate/nodejs-api#ruletester) 实用工具，以方便为规则编写测试。

## 规则命名约定

虽然你可以随便给自定义规则取你喜欢的名字，但如果自定义规则也采用与核心规则的相同命名规范那会更加清晰。要了解更多信息，请参见[核心规则命名规范](../contribute/core-rules#规则命名规范)文档。

## 运行时规则

可以在运行时中定义自定义规则，使得 ESLint 与其他检查器不同。这非常适合用在特定于项目或公司的规则，因为这不会同 ESLint 或插件一起分发。

运行时规则使用与其他规则一致的格式编写。像创建其他规则一样创建你的规则，并同样遵循以下步骤：

1. 将所有运行时规则放在相同的目录下（如 `eslint_rules`）。
2. 创建[配置文件](../use/configure/)并在 `rules` 键下指定你的规则 ID 和错误等级。如果配置文件中没有指定 `"warn"` 或 `"error"` 值的话就不会运行。
3. 在运行[命令行界面](../use/command-line-interface)时，应使用 `--rulesdir` 选项指定运行时规则所处位置。

## 验证规则性能

ESLint 有一个内置的方法来跟踪单个规则的性能。设置 `TIMING` 环境变量将触发显示，在检查完成后，显示10个运行时间最长的规则，以及它们的单独运行时间（规则创建+规则执行）和相对性能影响占总规则处理时间（规则创建 + 规则执行）的百分比。

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
