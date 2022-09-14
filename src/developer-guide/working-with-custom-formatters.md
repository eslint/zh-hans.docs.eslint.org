---
title: 使用自定义格式化工具
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/developer-guide/working-with-custom-formatters.md
eleventyNavigation:
    key: working with custom formatters
    parent: developer guide
    title: 使用自定义格式化工具
    order: 6

---

虽然 ESLint 有一些内置的格式化工具可用于格式化品管结果，但也有可能创建和发布你自己的自定义格式化工具。你可以在你的项目中直接包含自定义格式化工具，或者创建 npm 包来单独分发它们。

每个格式化工具都只是一个函数，接收 `results` 对象和 `context` 并返回字符串。例如，下面是`json`内置格式化工具的实现方式。

```js
//my-awesome-formatter.js
module.exports = function(results, context) {
    return JSON.stringify(results, null, 2);
};
```

格式化工具也可以是一个异步函数（从 ESLint v8.4.0 起），下面是个简单示例：

```js
//my-awesome-formatter.js
module.exports = async function(results) {
    const formatted = await asyncTask();
    return formatted;
};
```

要用这个格式化工具运行ESLint，你可以使用`-f`（或`--format`）命令行标志。

```bash
eslint -f ./my-awesome-formatter.js src/
```

为了使用本地文件作为自定义格式化工具，你必须以点开始文件名（如`./my-awesome-formatter.js`或`./formatters/my-awesome-formatter.js`）。

## 包装自定义格式化工具

自定义格式化工具也可以通过 npm 包发布。要做到这一点，需要创建名为 `eslint-formatter-*` 的 npm 包，其中 `*` 是你的格式化工具的名称（如 `eslint-formatter-awesome`）。然后在项目中安装这个包，并可以用 `-f`（或 `--format`）标志来使用自定义的格式化工具，像这样。

```bash
eslint -f awesome src/
```

因为ESLint知道当指定的格式化工具不以点开头时，会寻找以 `eslint-formatter-` 开头的包，所以当使用一个打包的自定义格式化工具时，不需要输入 `eslint-formatter-`。

`package.json` 的提示：

* `main` 条目应该是实现你的自定义格式化的JavaScript文件。
* 添加这些 `keywords` 以帮助用户找到你的格式化工具。
    * `"eslint"`
    * `"eslint-formatter"`.
    [...] 

查看所有[npm上的formatter](https://www.npmjs.com/search?q=eslint-formatter)。

## `results` 实参

传递给格式化工具的 `results` 对象是一个包含单个文件检查结果的对象数组。下面是一些输出的例子。

```js
[
    {
        filePath: "/path/to/a/file.js",
        messages: [
            {
                ruleId: "curly",
                severity: 2,
                message: "Expected { after 'if' condition.",
                line: 2,
                column: 1,
                nodeType: "IfStatement"
            },
            {
                ruleId: "no-process-exit",
                severity: 2,
                message: "Don't use process.exit(); throw an error instead.",
                line: 3,
                column: 1,
                nodeType: "CallExpression"
            }
        ],
        errorCount: 2,
        warningCount: 0,
        fixableErrorCount: 0,
        fixableWarningCount: 0,
        source:
            "var err = doStuff();\nif (err) console.log('failed tests: ' + err);\nprocess.exit(1);\n"
    },
    {
        filePath: "/path/to/Gruntfile.js",
        messages: [],
        errorCount: 0,
        warningCount: 0,
        fixableErrorCount: 0,
        fixableWarningCount: 0
    }
]
```

### `result` 对象

<! -- 本节从“Node.js API ：页面复制。对本节的修改应该也要手动添加到该页面。-->

`results` 数组中的每个对象都是 `result` 对象。每个 `results` 对象包含被检查的文件路径和检查出问题的信息。下面是每个 `results` 对象的可用属性：

**filePath**: 被检查文件的绝对路径。
**messages**: `message` 对象的数组。关于 messages 的更多信息请见下文。
**errorCount**: 给定文件的错误数量。
**warningCount**: 给定文件的警告数量。
**source**: 给定文件的源代码。如果该文件没有错误/警告，或者有 `output` 属性，则忽略该属性。
**output**: 给定文件的源代码，并尽可能多地应用修复。如果没有进行修复，则省略此属性。

### `message` 对象

每个 `message` 对象包含关于 ESLint 规则的信息，这个规则是由一些源代码触发的。每个 `message` 对象的可用属性有：

**ruleId**：产生错误或警告的规则的 ID。
**severity**：失败的严重程度，`1` 代表警告，`2` 代表错误
**message**：错误的可读描述
**line**：问题所在的行
**column**：问题所在的列
**nodeType**：[AST](https://github.com/estree/estree/blob/master/spec.md#node-objects) 中节点的类型

## `context` 实参

formatter 函数的第二个实参应为对象。该对象有两个属性：

* `cwd` ... 当前工作目录。这个值来自 [ESLint](nodejs-api#-new-eslintoptions) 类中的 `cwd` 构造器选项。
* `rulesMeta` ... 规则的 `meta` 属性值。关于规则的更多信息，请参见[使用规则](working-with-rules)页面。

例如，如果运行了 `no-extra-semi` 规则，对象会是这样的：

```js
{
    cwd: "/path/to/cwd",
    rulesMeta: {
        "no-extra-semi": {
            type: "suggestion",
            docs: {
                description: "disallow unnecessary semicolons",
                recommended: true,
                url: "https://eslint.org/docs/rules/no-extra-semi"
            },
            fixable: "code",
            schema: [],
            messages: {
                unexpected: "Unnecessary semicolon."
            }
        }
    }
}
```

**注意**：如果由已废弃的 `CLIEngine` 类来执行检查，`context` 实参可能是一个不同的值，因为它由 API 用户所决定。如果你想支持传统环境，请检查 `context` 实参是否与预期相符。

## 示例

### 摘要格式化工具

一个只关心错误和警告总数的格式化工具将看起来像这样：

```javascript
module.exports = function(results, context) {
    // 累计错误和警告数
    var summary = results.reduce(
        function(seq, current) {
            seq.errors += current.errorCount;
            seq.warnings += current.warningCount;
            return seq;
        },
        { errors: 0, warnings: 0 }
    );

    if (summary.errors > 0 || summary.warnings > 0) {
        return (
            "Errors: " +
            summary.errors +
            ", Warnings: " +
            summary.warnings +
            "\n"
        );
    }

    return "";
};
```

用以前的自定义格式化工具运行 `eslint`：

```bash
eslint -f ./my-awesome-formatter.js src/
```

Will produce the following output:

```bash
Errors: 2, Warnings: 4
```

### 详细格式化工具

一份更复杂的报告将看起来像这样：

```javascript
module.exports = function(results, context) {
    var results = results || [];

    var summary = results.reduce(
        function(seq, current) {
            current.messages.forEach(function(msg) {
                var logMessage = {
                    filePath: current.filePath,
                    ruleId: msg.ruleId,
                    ruleUrl: context.rulesMeta[msg.ruleId].docs.url,
                    message: msg.message,
                    line: msg.line,
                    column: msg.column
                };

                if (msg.severity === 1) {
                    logMessage.type = "warning";
                    seq.warnings.push(logMessage);
                }
                if (msg.severity === 2) {
                    logMessage.type = "error";
                    seq.errors.push(logMessage);
                }
            });
            return seq;
        },
        {
            errors: [],
            warnings: []
        }
    );

    if (summary.errors.length > 0 || summary.warnings.length > 0) {
        var lines = summary.errors
            .concat(summary.warnings)
            .map(function(msg) {
                return (
                    "\n" +
                    msg.type +
                    " " +
                    msg.ruleId + (msg.ruleUrl ? " (" + msg.ruleUrl + ")" : "") +
                    "\n  " +
                    msg.filePath +
                    ":" +
                    msg.line +
                    ":" +
                    msg.column
                );
            })
            .join("\n");

        return lines + "\n";
    }
};
```

所以用这个自定义格式化工具运行 `eslint`：

```bash
eslint -f ./my-awesome-formatter.js src/
```

输出将是

```bash
error space-infix-ops (https://eslint.org/docs/rules/space-infix-ops)
  src/configs/bundler.js:6:8
error semi (https://eslint.org/docs/rules/semi)
  src/configs/bundler.js:6:10
warning no-unused-vars (https://eslint.org/docs/rules/no-unused-vars)
  src/configs/bundler.js:5:6
warning no-unused-vars (https://eslint.org/docs/rules/no-unused-vars)
  src/configs/bundler.js:6:6
warning no-shadow (https://eslint.org/docs/rules/no-shadow)
  src/configs/bundler.js:65:32
warning no-unused-vars (https://eslint.org/docs/rules/no-unused-vars)
  src/configs/clean.js:3:6
```

## 将实参传递给格式化工具

虽然格式化函数不接收除结果对象和上下文之外的参数，但可以使用下面描述的方法将额外的数据传递给自定义格式化工具。

## 使用环境变量

自定义格式化程序可以访问环境变量，因此可以根据环境变量数据改变其行为。这里有一个例子，使用 `AF_SKIP_WARNINGS` 环境变量来决定是否在结果中显示警告。

```js
module.exports = function(results) {
    var skipWarnings = process.env.AF_SKIP_WARNINGS === "true"; //af 代表 awesome-formatter

    var results = results || [];
    var summary = results.reduce(
        function(seq, current) {
            current.messages.forEach(function(msg) {
                var logMessage = {
                    filePath: current.filePath,
                    ruleId: msg.ruleId,
                    message: msg.message,
                    line: msg.line,
                    column: msg.column
                };

                if (msg.severity === 1) {
                    logMessage.type = "warning";
                    seq.warnings.push(logMessage);
                }
                if (msg.severity === 2) {
                    logMessage.type = "error";
                    seq.errors.push(logMessage);
                }
            });
            return seq;
        },
        {
            errors: [],
            warnings: []
        }
    );

    if (summary.errors.length > 0 || summary.warnings.length > 0) {
        var warnings = !skipWarnings ? summary.warnings : []; // 在这种情况下，跳过警告

        var lines = summary.errors
            .concat(warnings)
            .map(function(msg) {
                return (
                    "\n" +
                    msg.type +
                    " " +
                    msg.ruleId +
                    "\n  " +
                    msg.filePath +
                    ":" +
                    msg.line +
                    ":" +
                    msg.column
                );
            })
            .join("\n");

        return lines + "\n";
    }
};
```

你可以用这个自定义格式化工具并设置环境变量来运行 ESLint，像是这样：

```bash
AF_SKIP_WARNINGS=true eslint -f ./my-awesome-formatter.js src/
```

输出将是：

```bash
error space-infix-ops
  src/configs/bundler.js:6:8

error semi
  src/configs/bundler.js:6:10
```

### 复杂的实参传递

如果你发现自定义格式化模式没有为你想要格式化 ESLint 结果的方式提供足够的选项，最好的选择是使用 ESLint 内置的 [JSON 格式化工具](https://eslint.org/docs/user-guide/formatters/)，并将把输出传递到第二个程序。比如说：

```bash
eslint -f json src/ | your-program-that-reads-JSON --option
```

在这个例子中，`your-program-that-reads-json` 程序可以接受 ESLint 原始的 JSON 结构，并在输出自己的结果格式前对其进行处理。你可以根据需要向该程序传递尽可能多的命令行参数来定制输出。

## 主义：终端中的格式化

像 [iTerm2](https://www.iterm2.com/) 或 [Guake](http://guake-project.org/) 这样的现代终端希望有一种特定的，在点击文件名时可以自动打开的结果格式。大多数终端都支持这种格式，要实现它可以这样：

```bash
file:line:column
```
