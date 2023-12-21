---
title: 创建规则（废弃）
---

**注意**：本页面涵盖了 ESLint <= 2.13.1 中的已被废弃的规则格式。[这是最新的规则格式](./custom-rules)。

ESLint 中的每个规则都有两个以其标识符命名的文件（如 `no-extra-semi`）。

* 在 `lib/rules` 目录下：源文件（如 `no-extra-semi.js`）
* 在 `tests/lib/rules` 目录下：测试文件（如 `no-extra-semi.js`)

**重点**：如果你向 ESLint 仓库提交**核心**规则，则必须**遵循下面解释的一些约定。

以下是一个规则的源文件的基本格式：

```js
/**
 * @fileoverview Rule to disallow unnecessary semicolons
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// 规则定义
//------------------------------------------------------------------------------

module.exports = function(context) {
    return {
        // 回调函数
    };
};

module.exports.schema = []; // 无选项
```

## 规则基础

`schema`（数组）指定[选项](#选项模式)，这样 ESLint 可以防止无效的[规则配置](../use/configure/rules)

`create`（函数）返回对象，该对象包含 ESLint 调用的方法，在遍历 JavaScript 代码的抽象语法树（AST，由 [ESTree](https://github.com/estree/estree) 定义）时 `"visit"` 节点。

* 如果键是节点类型，ESLint 在 **down tree** 时会调用该 **visitor** 函数
* 如果键是节点类型加 `:exit`，ESLint 在 **up tree** 时会调用该 **visitor** 函数。
* 如果键是一个事件名称，ESLint 调用该**处理程序**函数进行 [代码链路分析](./code-path-analysis)

一个规则可以使用当前节点和它周围的树来报告或修复问题：

下面是 [array-callback-return](../rules/array-callback-return) 规则的方法：

```js
function checkLastSegment (node) {
    // report problem for function if last code path segment is reachable
}

module.exports = function(context) {
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
};
```

## Context 对象

`context` 对象包含额外的功能，有助于规则完成其工作。顾名思义，`context` 对象包含与规则的上下文相关的信息。`context` 对象有以下属性。

* `parserOptions` - 为本次运行配置的解析器选项（[查看更多细节](../use/configure/language-options#specifying-parser-options)）。
* `id` - 规则 ID。
* `options` - 规则选项的数组。
* `settings` - 配置中的 `settings`。
* `parserPath` - 配置中的 `parser` 的完整路径。

此外，`context` 对象有以下方法：

* `getAncestors()` - 返回基于当前遍历的祖先节点的数组。
* `getDeclaredVariables(node)` - 返回给定节点上的声明变量。
* `getFilename()` - 返回与源代码相关的文件名。
* `getScope()` - 返回当前的范围。
* `getSourceCode()` - 返回一个`SourceCode`对象，你可以用它来处理传递给 ESLint 的源。
* `markVariableAsUsed(name)` - 将作用域中的变量标记为已使用。这会影响 [no-unused-vars](../rules/no-unused-vars) 规则。
* `report(descriptor)` - 报告代码问题。

**废弃**：`context` 对象上的下列方法已经废弃。请使用 `SourceCode` 上的相应方法代替。

* `getAllComments()` - 返回源码中所有注释的一个数组。请使用 `sourceCode.getAllComments()` 代替。
* `getComments(node)` - 返回指定节点的前导和后导评论数组。使用 `sourceCode.getComments(node)` 代替。
* `getFirstToken(node)` - 返回代表给定节点的第一个标记。使用 `sourceCode.getFirstToken(node)` 代替。
* `getFirstTokens(node, count)` - 返回代表给定节点的第一个 `count` 标记。使用 `sourceCode.getFirstTokens(node, count)` 代替。
* `getJSDocComment(node)` - 返回给定节点的 JSDoc 注释，如果没有则为 `null`。使用 `sourceCode.getJSDocComment(node)` 代替。
* `getLastToken(node)` - 返回代表给定节点的最后一个令牌。使用 `sourceCode.getLastToken(node)` 代替。
* `getLastTokens(node, count)` - 返回代表给定节点的最后`count` 标记。使用 `sourceCode.getLastTokens(node, count)` 代替。
* `getNodeByRangeIndex(index)` - 返回 AST 中包含给定源索引的最深节点。使用 `sourceCode.getNodeByRangeIndex(index)` 代替。
* `getSource(node)` - 返回指定节点的源代码。省略 `node` 以获得整个源代码。使用 `sourceCode.getText(node)` 代替。
* `getSourceLines()` - 返回整个源代码，分成一个字符串行数组。使用 `sourceCode.lines` 代替。
* `getTokenAfter(nodeOrToken)` - 返回指定节点或标记后的第一个标记。使用 `sourceCode.getTokenAfter(nodeOrToken)` 代替。
* `getTokenBefore(nodeOrToken)` - 返回给定节点或令牌之前的第一个令牌。使用 `sourceCode.getTokenBefore(nodeOrToken)` 代替。
* `getTokenByRangeStart(index)` - 返回范围从源码中给定索引开始的令牌。使用 `sourceCode.getTokenByRangeStart(index)` 代替。
* `getTokens(node)` - 返回指定节点的所有令牌。使用 `sourceCode.getTokens(node)` 代替。
* `getTokensAfter(nodeOrToken, count)` - 返回给定节点或标记后的 `count` 标记。使用 `sourceCode.getTokensAfter(nodeOrToken, count)` 代替。
* `getTokensBefore(nodeOrToken, count)` - 返回指定节点或标记之前的 `count` 标记。使用 `sourceCode.getTokensBefore(nodeOrToken, count)` 代替。
* `getTokensBetween(node1, node2)` - 返回两个节点之间的令牌。使用 `sourceCode.getTokensBetween(node1, node2)` 来代替。
* `report(node, [location], message)` - 报告代码中的一个问题。

### context.report()

你将使用的主要方法是 `context.report()`，它发布一个警告或错误（取决于正在使用的配置）。这个方法接受一个参数，是一个包含以下属性的对象：

* `message` - 问题信息。
* `node` - （可选）与问题有关的 AST 节点。如果存在并且没有指定`loc`，那么该节点的起始位置将作为问题的位置。
* `loc` - （可选）一个指定问题位置的对象。如果同时指定了 `loc` 和 `node`，那么将使用 `loc` 而不是 `node` 的位置。
    * `line` - 从 1 开始计算的发生问题的行号。
    * `column` - 从 0 开始计算的发生问题的列号。
* `data` - （可选） `message` 的占位数据。
* `fix` - （可选）一个应用修复的函数，以解决这个问题。

注意，至少需要 `node` 或 `loc` 中的一个。

最简单的例子是只使用 `node` 和 `message`：

```js
context.report({
    node: node,
    message: "Unexpected identifier"
});
```

该节点包含所有必要的信息，以计算出违规文本的行数和列数，以及代表该节点的源文本。

你也可以在信息中使用占位符，并提供 `data`：

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

### 应用修复

如果你想让 ESLint 尝试修复你报告的问题，你可以在使用 `context.report()` 时指定 `fix` 函数来实现。`fix` 函数接收一个参数，即 `fixer` 对象，你可以用它来应用修复。比如说：

```js
context.report({
    node: node,
    message: "Missing semicolon".
    fix: function(fixer) {
        return fixer.insertTextAfter(node, ";");
    }
});
```

这里，`fix()` 函数被用来在节点后面插入一个分号。请注意，该修复并不是立即应用的，如果与其他修复有冲突，可能根本就不会应用。如果不能应用修复，那么问题信息会照常报告；如果可以应用修复，那么问题信息就不会报告。

`fixer` 对象有以下方法：

* `insertTextAfter(nodeOrToken, text)` - 在给定的节点或标记后插入文本
* `insertTextAfterRange(range, text)` - 在给定的范围后插入文本。
* `insertTextBefore(nodeOrToken, text)` - 在给定的节点或标记之前插入文本。
* `insertTextBeforeRange(range, text)` - 在给定范围之前插入文本。
* `remove(nodeOrToken)` - 删除指定的节点或标记。
* `removeRange(range)` - 移除给定范围内的文本。
* `replaceText(nodeOrToken, text)` - 替换给定节点或标记中的文本
* `replaceTextRange(range, text)` - 替换给定范围内的文本。

修复的最佳实践：

1. 1. 尽可能小地进行修复。任何超过一个字符的修正都是有风险的，可能会妨碍其他更简单的修正。
1. 每条信息只做一个修复。这是强制执行的，因为你必须从 `fix()` 返回修复器操作的结果。
1. 修复不应该引入与其他规则的冲突。你可能会不小心引入一个新的问题，直到 ESLint 再次运行才会被报告。另一个很好的理由是尽可能做一个小的修复。

### context.options

一些规则需要选项才能正常运行。这些选项出现在配置（`.eslintrc`、命令行或注释中）。例如：

```json
{
    "quotes": [2, "double"]
}
```

本例中的 `quotes` 规则有一个选项，`"double"`（`2` 是错误级别）。你可以通过使用 `context.options` 来检索一个规则的选项，它是一个包含该规则所有配置选项的数组。在这个例子中，`context.options[0]` 将包含 `"double"`：

```js
module.exports = function(context) {

    var isDouble = (context.options[0] === "double");

    // ...
}
```

由于 `context.options` 只是一个数组，你可以用它来确定有多少选项被传递，以及检索实际选项本身。请记住，错误级别不是 `context.options` 的一部分，因为错误级别不能从规则内部知道或修改。

当使用选项时，确保你的规则有一些逻辑上的默认值，以防选项没有被提供。

### context.getSourceCode()

`SourceCode` 对象是获得更多关于被提示的源代码信息的主要对象。你可以在任何时候通过使用 `getSourceCode()` 方法来检索 `SourceCode` 对象。

```js
module.exports = function(context) {

    var sourceCode = context.getSourceCode();

    // ...
}
```

一旦你有 `SourceCode` 实例，你可以使用它的方法来处理代码：

* `getAllComments()` - 返回源码中所有评论的一个数组。
* `getComments(node)` - 返回给定节点的前导和后导注释数组。
* `getFirstToken(node)` - 返回代表给定节点的第一个令牌。
* `getFirstTokens(node, count)` - 返回代表给定节点的第一个 `count` 令牌。
* `getJSDocComment(node)` - 返回给定节点的 JSDoc 注释，如果没有则为空。
* `getLastToken(node)` - 返回代表给定节点的最后一个令牌。
* `getLastTokens(node, count)` - 返回代表给定节点的最后 `count` 标记。
* `getNodeByRangeIndex(index)` - 返回 AST 中包含给定源索引的最深节点。
* `isSpaceBetweenTokens(first, second)` - 如果两个标记之间有一个空白字符，则返回 true。
* `getText(node)` - 返回指定节点的源代码。省略`node`以获得整个源代码。
* `getTokenAfter(nodeOrToken)` - 返回给定节点或标记后的第一个标记。
* `getTokenBefore(nodeOrToken)` - 返回给定节点或令牌之前的第一个令牌。
* `getTokenByRangeStart(index)` - 返回范围从源中给定索引开始的令牌。
* `getTokens(node)` - 返回给定节点的所有令牌。
* `getTokensAfter(nodeOrToken, count)` - 返回给定节点或标记后的 `count` 标记。
* `getTokensBefore(nodeOrToken, count)` - 返回给定节点或标记之前的 `count` 标记。
* `getTokensBetween(node1, node2)` - 返回两个节点之间的令牌。

还有一些你可以访问的属性：

* `hasBOM` - 表示源代码是否有 Unicode BOM 的标志。
* `text` - 被提示的代码的全文。Unicode BOM 已经从这个文本中被剥离。
* `ast` - 被提示的代码的 AST 的 `Program` 节点。
* `lines` - 行数组，根据规范中的换行定义进行分割。

当你需要获得更多关于被提示的代码的信息时，你应该使用 `SourceCode` 对象。

### 选项模式

规则可以导出 `schema` 属性，这是规则选项的 [JSON schema](http://json-schema.org/) 格式描述，ESLint 将使用它来验证配置选项，并在它们被传递到规则的 `context.options` 之前防止无效或意外输入。

规则导出的 `schema` 有两种格式。第一种是一个完整的 JSON 模式对象，描述规则接受的所有可能的选项，包括作为第一个参数的规则错误级别和其后的任何可选参数。

然而，为了简化模式的创建，规则也可以为每个可选的位置参数导出一个模式数组，ESLint 将自动首先验证所需的错误级别。例如，`yoda` 规则接受一个主要的模式参数，以及一个带有命名属性的额外选项对象。

```js
// "yoda": [2, "never", { "exceptRange": true }]
module.exports.schema = [
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
];
```

在前面的例子中，错误级别被认为是第一个参数。它的后面是第一个可选参数，一个字符串，可以是 `"always"` 或 `"never"`。最后一个可选参数是一个对象，它可能有一个名为 `exceptRange` 的布尔属性。

要了解更多关于 JSON Schema 的信息，我们建议从一些[例子](http://json-schema.org/examples.html) 开始，也可以阅读[了解 JSON Schema](http://spacetelescope.github.io/understanding-json-schema/)（免费电子书）。

### 获取源代码

如果你的规则需要获得实际的 JavaScript 源代码来工作，那么就使用 `sourceCode.getText()` 方法。这个方法的工作原理如下：

```js

// get all source
var source = sourceCode.getText();

// get source for just this AST node
var nodeSource = sourceCode.getText(node);

// get source for AST node plus previous two characters
var nodeSourceWithPrev = sourceCode.getText(node, 2);

// get source for AST node plus following two characters
var nodeSourceWithFollowing = sourceCode.getText(node, 0, 2);
```

通过这种方式，当 AST 没有提供相应的数据时，你可以在 JavaScript 文本本身中寻找模式（比如逗号、分号、括号的位置等）。

### 访问注释

If you need to access comments for a specific node you can use `sourceCode.getComments(node)`:

```js
// the "comments" variable has a "leading" and "trailing" property containing
// its leading and trailing comments, respectively
var comments = sourceCode.getComments(node);
```

请记住，注释在技术上不是 AST 的一部分，只是在需要时才附加到 AST 上，即当你调用 `getComments()` 时。

**注意**：其中一个库为注释添加了 AST 节点属性--不要使用这些属性。总是使用 `sourceCode.getComments()`，因为这是访问注释的唯一保证的 API（我们以后可能会改变注释的处理方式）。

### 访问代码链路

ESLint 在遍历 AST 时分析了代码链路。
你可以通过五个与代码路径有关的事件来访问该代码路径对象.

[details here](./code-path-analysis)

## 规则单元测试

每条规则必须有一组单元测试与之一起提交才能被接受。测试文件的名称与源文件相同，但住在 `tests/lib/` 中。例如，如果你的规则源文件是 `lib/rules/foo.js`，那么你的测试文件应该是 `tests/lib/rules/foo.js`。

对于你的规则，一定要测试：

1. 所有应该被标记为警告的实例。
1. 至少有一个**不应该**被标记为警告的模式。

规则单元测试文件的基本模式是：

```js
/**
 * @fileoverview Tests for no-with rule.
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-with"),
    RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-with", rule, {
    valid: [
        "foo.bar()"
    ],
    invalid: [
        {
            code: "with(foo) { bar() }",
            errors: [{ message: "Unexpected use of 'with' statement.", type: "WithStatement"}]
        }
    ]
});
```

请确保将 `"no-with"` 的值替换为你的规则的 ID。在 `tests/lib/rules/` 目录下有很多例子。

### 有效代码

每个有效的案例可以是一个字符串或一个对象。当你需要为规则指定额外的全局变量或参数时，可以使用对象形式。例如，下面定义了 `window` 作为全局变量，用于不应该触发被测试规则的代码：

```js
valid: [
    {
        code: "window.alert()",
        globals: [ "window" ]
    }
]
```

你也可以向规则传递选项（如果它接受这些选项的话）。这些参数等同于人们在 `.eslintrc` 文件中配置规则的方式。比如说

```js
valid: [
    {
        code: "var msg = 'Hello';",
        options: [ "single" ]
    }
]
```

`options` 属性必须是一个选项数组。这将被传递给规则中的 `context.options`。

### 无效代码

每个无效的案例必须是一个对象，包含要测试的代码和至少一个由规则产生的消息。`errors` 键指定一个对象数组，每个对象包含一个消息（你的规则可能对同一代码触发多个消息）。你还应该使用 `type` 键指定你期望收到的 AST 节点的类型。AST 节点应该代表代码中存在问题的实际位置。比如说：

```js
invalid: [
    {
        code: "function doSomething() { var f; if (true) { var build = true; } f = build; }",
        errors: [
            { message: "build used outside of binding context.", type: "Identifier" }
        ]
    }
]
```

在这种情况下，信息是特定于正在使用的变量，AST 节点类型是 `Identifier`。

与有效情况类似，你也可以指定 `options` 传递给规则：

```js
invalid: [
    {
        code: "function doSomething() { var f; if (true) { var build = true; } f = build; }",
        options: [ "double" ],
        errors: [
            { message: "build used outside of binding context.", type: "Identifier" }
        ]
    }
]
```

对于比较简单的情况，真正重要的是错误信息，你也可以把任何 `errors` 指定为字符串。如果你愿意，你也可以有一些字符串和一些对象。

```js
invalid: [
    {
        code: "'single quotes'",
        options: ["double"],
        errors: ["Strings must use doublequote."]
    }
]
```

### 指定解析器选项

一些测试要求必须使用某种解析器配置。这可以通过 `parserOptions` 设置在测试规范中指定。

例如，将 `ecmaVersion` 设置为 6（以便使用像 `for ... of` 这样的结构）。

```js
valid: [
    {
        code: "for (x of a) doSomething();",
        parserOptions: { ecmaVersion: 6 }
    }
]
```

如果你正在使用 ES6 模块：

```js
valid: [
    {
        code: "export default function () {};",
        parserOptions: { ecmaVersion: 6, sourceType: "module" }
    }
]
```

对于非版本特定的功能，如 JSX:

```js
valid: [
    {
        code: "var foo = <div>{bar}</div>",
        parserOptions: { ecmaFeatures: { jsx: true } }
    }
]
```

`parserOptions` 的可用选项和预期语法与[配置](../use/configure/language-options#specifying-parser-options)中使用的相同。

### 编写测试

提供尽可能多的单元测试。你的拉动请求永远不会因为提交了太多的测试而被拒绝！

## 性能测试

为了保持刷新过程的高效性和无干扰性，验证新规则或对现有规则的修改对性能的影响是很有用的。

### 整体性能

`npm run perf` 命令给出了默认规则（`eslint:recommended`）启用后 ESLint 运行时的高级概览。

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

### 每个规则的性能

ESLint 有一个内置的方法来跟踪单个规则的性能。设置 `TIMING` 环境变量将触发显示，在检查完成后，显示运行时间最长的 10 条规则，以及它们各自的运行时间和相对性能影响占总规则处理时间的百分比。

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

## 规则命名惯例

ESLint 的规则命名约定是相当简单的。

* 如果你的规则不允许某些东西，就用 `no-`作 为前缀，比如 `no-eval` 表示不允许 `eval()`，`no-debugger` 表示不允许 `debugger`。
* 如果你的规则是强制包含某些东西，使用一个没有特殊前缀的短名称。
* 尽量保持你的规则名称简短，适当时使用缩写，不超过四个字。
* 在单词之间使用破折号。

## 规则接受标准

由于规则是高度个人化的（因此也是非常有争议的），被接受的规则应该是。

* 不是针对某一库的。
* 展示一个可以通过重写代码解决的可能问题。
* 足够普遍，以便适用于大量的开发者。
* 不要与现有的规则相反。
* 不与现有的规则重叠。

## 运行时规则

使得 ESLint 与其他检查器不同的是，它能够在运行时定义自定义规则。这对于那些针对你的项目或公司的规则是完美的，而且 ESLint 在发货时没有意义。有了运行时规则，你不必等待 ESLint 的下一个版本，也不必为你的规则不够通用而失望，只需编写你的规则并在运行时包含它们。

运行时规则的编写格式与所有其他规则相同。像其他规则一样创建你的规则，然后按照以下步骤进行。

1. 把你所有的运行时规则放在同一个目录下（即`eslint_rules`）。
2. 创建[配置文件](../use/configure/) 并在 `rules` 键下指定你的规则 ID 错误等级。你的规则将不会运行，除非它在配置文件中的值为 `1` 或 `2`。
3. 运行[命令行界面](../use/command-line-interface)，使用 `--rulesdir` 选项来指定你的运行规则的位置。
