---
title: 自定义规则教程
eleventyNavigation:
    key: custom rule tutorial
    parent: create plugins
    title: 自定义规则教程
    order: 1
---
此教程包括了如何创建一个 ESLint 规则及通过插件形式进行分发。

您你以创建自定义规则来验证你的代码是否满足特定期望，并确定在不满足该期望时要执行的操作。插件可以打包自定义规则和其他配置，使得能够在不同的项目中轻松共享和重用它们。

了解更多关于自定义规则和插件的信息，请查看下列文档：

* [自定义规则](custom-rules)
* [插件](plugins)

## 为什么要创建自定义规则？

在 ESLint [内置规则](../rules/)和社区发布的自定义规则没有满足你的需求时，可以创建自定义规则。你可以创建自定义规则来强制执行公司或项目的最佳实践，防止特定错误再次出现，或确保符合样式指南。

在创建并非仅适用于你公司或项目的自定义规则时，很有必要先调查一下其他发布的插件里的自定义规则也没有解决你的需要。相当有可能该规则已经存在了。

## 先决条件

在开始之前，请确保你的开发环境中已安装以下软件：

* [Node.js](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/)

本教程还假设你对 ESLint 和 ESLint 规则有基本的了解。

## 自定义规则

本教程中的自定义规则要求为所有名为 `foo` 的 `const` 变量赋值字符串文字 `"bar"`。该规则定义在文件 `enforce-foo-bar.js` 中。该规则还建议使用 `"bar"` 替换赋值给 `const foo` 的任何其他值。

例如，假设你拥有下列的 `foo.js` 文件：

```javascript
// foo.js

const foo = "baz123";
```

使用该规则运行 ESLint 会认为 `"baz123"` 不应作为变量 `foo` 的值。如果 ESLint 在自动修复模式下运行，则 ESLint 将修复该文件以包含以下内容：

```javascript
// foo.js

const foo = "bar";
```

## 步骤一：设置项目


首先，给你的自定义规则创建新的项目。创建新的目录，并初始化 npm 项目，并创建新的文件用于自定义规则。

```shell
mkdir eslint-custom-rule-example # create directory
cd eslint-custom-rule-example # enter the directory
npm init -y # init new npm project
touch enforce-foo-bar.js # create file enforce-foo-bar.js
```

## 步骤二：编写规则文件

在 `enforce-foo-bar.js` 文件中，为 `enforce-foo-bar` 自定义规则添加一些脚手架。 另外，再添加 `meta` 对象，其中包含有关规则的一些基本信息。

```javascript
// enforce-foo-bar.js

module.exports = {
    meta: {
       // TODO: add metadata
    },
    create(context) {
        return {
            // TODO: add callback function(s)
        };
    }
};
```

## 步骤三：添加规则元数据

在编写规则之前，向规则对象添加一些元数据。 ESLint 会在运行规则时使用此信息。

首先导出一个具有 `meta` 属性的对象，该属性包含规则的元数据，例如规则类型、文档和可修复性。 在本例中，规则类型是 `"problem"`，描述是“Enforce that a variable named `foo` can only be assigned a value of 'bar'.”。

```javascript
// enforce-foo-bar.js

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Enforce that a variable named `foo` can only be assigned a value of 'bar'.",
        },
        fixable: "code",
        schema: []
    },
    create(context) {
        return {
            // TODO: add callback function(s)
        };
    }
};
```

要了解更多关于规则元数据的信息，请参见[规则结构](custom-rules#规则结构)。

## 步骤四：添加规则访问者方法

定义规则的 `create` 函数，该函数接受一个 `context` 对象，并返回一个对象，其中包含要处理的每种语法节点类型的属性。在这种情况下，你想要处理 `VariableDeclarator` 节点。

你可以选择任何 [ESTree 节点类型](https://github.com/estree/estree)或[选择器](selectors)。

在 `VariableDeclarator` 访问方法内，检查节点是否表示 `const` 变量声明，它的名称是否为 `foo`，以及它是否未被赋值为字符串 `"bar"`。你可以通过评估传递给 `VariableDeclaration` 方法的 `node` 来完成这个操作。

如果 `const foo` 声明被赋值为 `"bar"`，则规则什么也不做。如果 `const foo` **未**赋值为 `"bar"`，则 `context.report()` 向 ESLint 报告错误。错误报告包括有关错误的信息以及如何修复它。

```javascript
// enforce-foo-bar.js
{% raw %}
module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Enforce that a variable named `foo` can only be assigned a value of 'bar'."
        },
        fixable: "code",
        schema: []
    },
    create(context) {
        return {

            // Performs action in the function on every variable declarator
            VariableDeclarator(node) {

                // Check if a `const` variable declaration
                if (node.parent.kind === "const") {

                    // Check if variable name is `foo`
                    if (node.id.type === "Identifier" && node.id.name === "foo") {

                        // Check if value of variable is "bar"
                        if (node.init && node.init.type === "Literal" && node.init.value !== "bar") {

                            /*
                             * Report error to ESLint. Error message uses
                             * a message placeholder to include the incorrect value
                             * in the error message.
                             * Also includes a `fix(fixer)` function that replaces
                             * any values assigned to `const foo` with "bar".
                             */
                            context.report({
                                node,
                                message: 'Value other than "bar" assigned to `const foo`. Unexpected value: {{ notBar }}.',
                                data: {
                                    notBar: node.init.value
                                },
                                fix(fixer) {
                                    return fixer.replaceText(node.init, '"bar"');
                                }
                            });
                        }
                    }
                }
            }
        };
    }
};
{% endraw %}
```

## 步骤五：设置测试

规则编写完成后，你可以测试以确保其按预期工作。

ESLint 提供了内置的 [`RuleTester`](../integrate/nodejs-api#ruletester) 类来测试规则。你不需要使用第三方测试库来测试 ESLint 规则，但 `RuleTester` 可以与诸如 Mocha 和 Jest 等工具无缝配合。

接下来，创建测试文件 `enforce-foo-bar.test.js`：

```shell
touch enforce-foo-bar.test.js
```

在测试文件中，你将使用 `eslint` 包。将其安装为开发依赖：

```shell
npm install eslint --save-dev
```

并在你的 `package.json` 文件中添加测试脚本来运行测试：

```javascript
// package.json
{
    // ...other configuration
    "scripts": {
        "test": "node enforce-foo-bar.test.js"
    },
    // ...other configuration
}
```

## 步骤六：编写测试

为了使用 `RuleTester` 编写测试，需要在 `enforce-foo-bar.test.js` 文件中导入该类和你的自定义规则。

`RuleTester#run()` 方法针对有效和无效的测试用例测试规则。如果规则未能通过任何测试场景，此方法将抛出错误。`RuleTester` 要求至少有一个有效和一个无效的测试场景。

```javascript
// enforce-foo-bar.test.js
const {RuleTester} = require("eslint");
const fooBarRule = require("./enforce-foo-bar");

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  parserOptions: { ecmaVersion: 2015 }
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  "enforce-foo-bar", // rule name
  fooBarRule, // rule code
  { // checks
    // 'valid' checks cases that should pass
    valid: [{
      code: "const foo = 'bar';",
    }],
    // 'invalid' checks cases that should not pass
    invalid: [{
      code: "const foo = 'baz';",
      output: 'const foo = "bar";',
      errors: 1,
    }],
  }
);

console.log("All tests passed!");
```

运行以下命令来执行测试：

```shell
npm test
```

如果测试通过，你应该在控制台看到如下信息：

```shell
All tests passed!
```

## 步骤七：在插件中捆绑自定义规则

现在你已经编写了自定义规则并验证了其工作原理，你可以将其包含在一个插件中。使用插件，你可以将规则分享在一个 npm 包中，以便在其他项目中使用。

创建插件文件：

```shell
touch eslint-plugin-example.js
```

现在编写插件代码。插件只是导出的 JavaScript 对象。要在插件中包含规则，请将其包含在插件的 `rules` 对象中，该对象包含规则名称和其源代码的键值对。

要了解有关创建插件的更多信息，请参阅[创建插件](plugins)。

```javascript
// eslint-plugin-example.js

const fooBarRule = require("./enforce-foo-bar");
const plugin = { rules: { "enforce-foo-bar": fooBarRule } };
module.exports = plugin;
```

## 步骤八：在本地使用插件

可以使用本地定义的插件在项目中执行自定义规则。要使用本地插件，请在 ESLint 配置文件的 `plugins` 属性中指定插件的路径。

在以下情况下，你可能想使用本地定义的插件之一：

- 你想在将其发布到 npm 之前测试插件。
- 你想使用插件，但不想将其发布到 npm。

在将插件添加到项目之前，使用[平面配置文件](../use/configure/configuration-files-new)创建一个名为 `eslint.config.js` 的 ESLint 项目配置：

```shell
touch eslint.config.js
```

然后，在 `eslint.config.js` 文件中添加以下代码：

```javascript
// eslint.config.js
"use strict";

// Import the ESLint plugin locally
const eslintPluginExample = require("./eslint-plugin-example");

module.exports = [
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            ecmaVersion: "latest",
        },
        // Using the eslint-plugin-example plugin defined locally
        plugins: {"example": eslintPluginExample},
        rules: {
            "example/enforce-foo-bar": "error",
        },
    }
]
```

在测试规则之前，你必须创建一个要在其上测试规则的文件。

创建一个名为 `example.js` 的文件：

```shell
touch example.js
```

Add the following code to `example.js`:

```javascript
// example.js

function correctFooBar() {
  const foo = "bar";
}

function incorrectFoo(){
  const foo = "baz"; // Problem!
}
```

现在，你可以使用本地定义的插件测试自定义规则。

就 `example.js` 运行 ESLint：

```shell
npx eslint example.js
```

这将在终端产生以下输出：

```text
/<path-to-directory>/eslint-custom-rule-example/example.js
  8:11  error  Value other than "bar" assigned to `const foo`. Unexpected value: baz  example/enforce-foo-bar

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

## 步骤九：发布插件

要将包含规则的插件发布到 npm，你需要配置 `package.json`。在相应字段中添加以下内容：

1. `"name"`: 包的唯一名称。在 npm 上，没有其他包可以具有相同的名称。
2. `"main"`: 插件文件的相对路径。按照这个例子，路径是 `"eslint-plugin-example.js"`。
3. `"description"`: 在 npm 上可见的包的描述。
4. `"peerDependencies"`: 将 `"eslint": ">=8.0.0"` 添加为对等依赖。为了使用该插件，需要大于或等于这个版本的 `eslint`。声明 `eslint` 作为对等依赖要求用户将包单独添加到项目中，而不是插件。
5. `"keywords"`: 包含标准关键字 `["eslint", "eslintplugin", "eslint-plugin"]`，以便使包易于找到。你也可以添加其他与插件相关的关键字。

一个插件的 `package.json` 文件的完整注释示例：

```javascript
// package.json
{
  // Name npm package.
  // Add your own package name. eslint-plugin-example is taken!
  "name": "eslint-plugin-example",
  "version": "1.0.0",
  "description": "ESLint plugin for enforce-foo-bar rule.",
  "main": "eslint-plugin-example.js", // plugin entry point
  "scripts": {
    "test": "node enforce-foo-bar.test.js"
  },
  // Add eslint>=8.0.0 as a peer dependency.
  "peerDependencies": {
    "eslint": ">=8.0.0"
  },
  // Add these standard keywords to make plugin easy to find!
  "keywords": [
    "eslint",
    "eslintplugin",
    "eslint-plugin"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "eslint": "^8.36.0"
  }
}
```

要发布包，运行 `npm publish` 并按照 CLI 提示进行操作。

你应该在 npm 上看到该包已上线！

## 步骤十：使用发布的自定义规则

接下来，你可以使用已发布的插件。

在你的项目中运行以下命令以下载该包：

```shell
npm install --save-dev eslint-plugin-example # Add your package name here
```

更新 `eslint.config.js` 以使用打包版本的插件：

```javascript
// eslint.config.js
"use strict";

// Import the plugin downloaded from npm
const eslintPluginExample = require("eslint-plugin-example");

// ... rest of configuration
```

现在你已经准备好测试自定义规则。

在 `example.js` 文件上运行 ESLint，现在使用已下载的插件：

```shell
npx eslint example.js
```

这将在终端产生以下输出：

```text
/<path-to-directory>/eslint-custom-rule-example/example.js
  8:11  error  Value other than "bar" assigned to `const foo`. Unexpected value: baz  example/enforce-foo-bar

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

如上所示，你实际上可以使用 `--fix` 标志修复问题，将变量赋值为 `"bar"`。

再次运行 ESLint，使用 `--fix` 标志：

```shell
npx eslint example.js --fix
```

在运行此命令时，终端中没有错误输出，但是你可以在 `example.js` 中看到修复已应用。你应该看到以下内容：

```javascript
// example.js

// ... rest of file

function incorrectFoo(){
  const foo = "bar"; // Fixed!
}
```

## 总结

在本教程中，你创建了一个自定义规则，要求所有命名为 `foo` 的 `const` 变量都被赋值为字符串 `"bar"`，并建议将 `const foo` 赋给其他值替换为 `"bar"`。你还将该规则添加到一个插件中，并将插件发布到了 npm。

通过完成这些步骤，你学到了以下实践方法，可以应用于创建其他自定义规则和插件：

1. 创建自定义 ESLint 规则
2. 测试自定义规则
3. 将规则捆绑到插件中
4. 发布插件
5. 从插件中使用规则

## 查看教程代码

你可以在[这里](https://github.com/eslint/eslint/tree/main/docs/_examples/custom-rule-tutorial-code)查看教程的带有注释的源代码。
