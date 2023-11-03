---
title: 自定义格式化工具
eleventyNavigation:
    key: custom formatters
    parent: extend eslint
    title: 自定义格式化工具
    order: 4
---

自定义工具可以使检查结果以符合你需求的方式显示，无论是特定的文件格式、特定的显示风格，还是为特定工具优化的格式。

你也可以使用 ESLint [内置的格式化工具](../use/formatters/)。

可以直接在项目包括自定义格式化工具，也可以创建 npm 包单独分发。

每个格式化工具都只是一个函数，接收 `results` 对象和 `context` 并返回字符串。例如下列展示的内置的 [JSON 格式化](../use/formatters/#json)是如何实现的：

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

想在运行 ESLint 时使用格式化工具，可以使用 [`-f`（或 `--format`）命令行标志](../use/command-line-interface#-f---format)。使用本地定义的格式化工具时路径必须以句号开头（`.`），像 `./my-awesome-formatter.js` 或 `../formatters/my-awesome-formatter.js` 这样。

```bash
eslint -f ./my-awesome-formatter.js src/
```

本节其余部分介绍了如何使用自定义格式化函数的参考信息。

### `results` 实参

传递给格式化工具的 `results` 对象是一个包含单个文件检查结果的对象数组。下面是一些输出的例子：

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

#### `result` 对象

<! -- 本节从“Node.js API”页面复制。对本节的修改应该也要手动添加到该页面。-->

`results` 数组中的每个对象都是 `result` 对象。每个 `results` 对象包含被检查的文件路径和检查出问题的信息。下面是每个 `results` 对象的可用属性：

* **filePath**：被检查文件的绝对路径。
* **messages**：由 [`message`](#message-对象) 对象组成的数组。关于 messages 的更多信息请见下文。
* **errorCount**：给定文件的错误数量。
* **warningCount**：给定文件的警告数量。
* **source**：给定文件的源代码。如果该文件没有错误/警告，或者有 `output` 属性，则忽略该属性。
* **output**：给定文件的源代码，并尽可能多地应用修复。如果没有进行修复，则省略此属性。

#### `message` 对象

每个 `message` 对象包含关于 ESLint 规则的信息，这个规则是由一些源代码触发的。每个 `message` 对象的可用属性有：

**ruleId**：产生错误或警告的规则的 ID。
**severity**：失败的严重程度，`1` 代表警告，`2` 代表错误
**message**：错误的可读描述
**line**：问题所在的行
**column**：问题所在的列
**nodeType**：[AST](https://github.com/estree/estree/blob/master/es5.md#node-objects) 中节点的类型

### `context` 实参

formatter 函数的第二个实参应为 `context` 对象。该对象有以下属性：

* `cwd`：当前工作目录。这个值来自 [ESLint](../integrate/nodejs-api#-new-eslintoptions) 类中的 `cwd` 构造器选项。
* `maxWarningsExceeded`（可选）：如果设置了 `--max-warnings` 且警告数量达到限制，则此对象将包括两个属性
    * `maxWarnings`：值为 `--max-warnings` 选项的值
    * `foundWarnings`：检查出的警告数量的值。
* `rulesMeta` ... 规则的 `meta` 属性值。关于规则的更多信息，请参见[自定义规则](custom-rules)页面。

如果运行了 `no-extra-semi` 规则，对象会是这样的：

```js
{
    cwd: "/path/to/cwd",
    maxWarningsExceeded: {
        maxWarnings: 5,
        foundWarnings: 6
    },
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
},
```

**注意**：如果由已废弃的 `CLIEngine` 类来执行检查，`context` 实参可能是一个不同的值，因为它由 API 用户所决定。如果你想支持传统环境，请检查 `context` 实参是否与预期相符。

### 将实参传递给格式化工具

虽然格式化函数不接收除结果对象和上下文之外的参数，但可以使用下面描述的方法将额外的数据传递给自定义格式化工具。

#### 使用环境变量

Custom formatters have access to environment variables and so can change their behavior based on environment variable data.

Here's an example that uses a `FORMATTER_SKIP_WARNINGS` environment variable to determine whether to show warnings in the results:

一份更复杂的报告将看起来像这样：

```javascript
module.exports = function(results) {
    var skipWarnings = process.env.FORMATTER_SKIP_WARNINGS === "true";
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
        var warnings = !skipWarnings ? summary.warnings : []; // skip the warnings in that case

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
FORMATTER_SKIP_WARNINGS=true eslint -f ./my-awesome-formatter.js src/
```

输出将是：

```bash
error space-infix-ops
  src/configs/bundler.js:6:8

error semi
  src/configs/bundler.js:6:10
```

#### 复杂的实参传递

如果你发现自定义格式化模式没有为你想要格式化 ESLint 结果的方式提供足够的选项，最好的选择是使用 ESLint 内置的 [JSON 格式化工具](../use/formatters/)，并将把输出传递到第二个程序。比如说：

```bash
eslint -f json src/ | your-program-that-reads-JSON --option
```

在这个例子中，`your-program-that-reads-json` 程序可以接受 ESLint 原始的 JSON 结构，并在输出自己的结果格式前对其进行处理。你可以根据需要向该程序传递尽可能多的命令行参数来定制输出。

## 终端中的格式化

像 [iTerm2](https://www.iterm2.com/) 或 [Guake](http://guake-project.org/) 这样的现代终端希望有一种特定的，在点击文件名时可以自动打开的结果格式。大多数终端都支持这种格式，要实现它可以这样：

```bash
file:line:column
```

## 打包自定义格式化工具

可以通过 npm 包分发自定义格式化工具。在此之前，要创建使用 `eslint-formatter-*` 格式的 npm 包，其中 `*` 是你的格式化工具名称（比如 `eslint-formatter-awesome`）。然后项目应该安装这个包，然后使用 [`-f`（或 `--format`）](../use/command-line-interface#-f---format)标志使用自定义格式化工具，像是这样：

```bash
eslint -f awesome src/
```

因为 ESLint 认识以 `eslint-formatter-` 开头的包，所以当使用包里的自定义格式化工具时，如果指定的格式化工具不以句号开头，则不需要输入 `eslint-formatter-`。

关于自定义格式化工具的 `package.json` 文件建议：

* [`main`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#main) 入口点必须是实现自定义格式器的 JavaScript 文件。
* 在 [`keywords`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#keywords) 中添加这些标签好让用户可以找到你的格式化工具：
    * `"eslint"`
    * `"eslint-formatter"`
    * `"eslintformatter"`

查看 [npm 上所有的格式化工具](https://www.npmjs.com/search?q=eslint-formatter)。

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

运行 `eslint` 和上方的自定义格式化工具：

```bash
eslint -f ./my-awesome-formatter.js src/
```

将复现下方输出：

```bash
Errors: 2, Warnings: 4
```

### 详细格式化工具

有更复杂的报告看起来像这样：

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

当使用 ESLint 和此格式化工具：

```bash
eslint -f ./my-awesome-formatter.js src/
```

输出是：

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
