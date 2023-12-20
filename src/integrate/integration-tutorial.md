---
title: 集成 Node.js API 教程
eleventyNavigation:
    key: integrate with the node.js api tutorial
    parent: integrate eslint
    title: 集成 Node.js API 教程
    order: 1
---

这个指南将引导你集成 `ESLint` 类，以便对文件进行代码检查并检索结果，这对于创建与其他项目的集成非常有用。

## 为什么创建集成？

如果你正在创建开发者工具，比如以下情况，你可能希望创建一个 ESLint 集成：

* **代码编辑器和集成开发环境（IDE）**：将 ESLint 与代码编辑器和 IDE 集成可以在你输入代码时提供实时反馈，自动突出显示潜在问题。许多编辑器已经有了可用的 ESLint 插件，但如果现有插件不满足你的特定需求，你可能需要创建一个定制的集成。

* **自定义代码检查工具**：如果你正在构建一个结合多个代码检查工具或添加特定功能的自定义代码检查工具，你可能希望将 ESLint 集成到你的工具中，以提供 JavaScript 代码检查的功能。

* **代码审查工具**：将 ESLint 与代码审查工具集成可以帮助自动化识别代码库中的潜在问题的流程。

* **学习平台**：如果你正在开发一个学习平台或编程教程，集成 ESLint 可以为用户提供实时反馈，帮助他们在学习 JavaScript 的过程中改进编码技能并学习最佳实践。

* **开发者工具集成**：如果你正在创建或扩展开发者工具，比如打包工具或测试框架，你可能希望集成 ESLint 以提供代码检查功能。你可以将 ESLint 直接集成到工具中，也可以将其作为插件使用。

## 你将构建什么

在本指南中，你将创建一个简单的 Node.js 项目，使用 `ESLint` 类对文件进行代码检查并检索结果。

## 要求

本教程假设你熟悉 JavaScript 和 Node.js。

为了按照本教程操作，你需要具备以下条件：

* Node.js（v12.22.0 或更高版本）
* npm
* 一个文本编辑器

## 步骤 1：设置

首先，创建一个新的项目目录：

```shell
mkdir eslint-integration
cd eslint-integration
```

Initialize the project with a `package.json` file:

```shell
npm init -y
```

Install the `eslint` package as a dependency (**not** as a dev dependency):

```shell
npm install eslint
```

Create a new file called `example-eslint-integration.js` in the project root:

```shell
touch example-eslint-integration.js
```

## 步骤 2：导入并配置 `ESLint` 实例

从 `eslint` 包中导入 `ESLint` 类并创建一个新实例。

你可以通过向 `ESLint` 构造函数传递一个选项对象来自定义 ESLint 配置：

```javascript
// example-eslint-integration.js

const { ESLint } = require("eslint");

// Create an instance of ESLint with the configuration passed to the function
function createESLintInstance(overrideConfig){
  return new ESLint({ useEslintrc: false, overrideConfig: overrideConfig, fix: true });
}
```

## 步骤 3：对文件进行代码检查和修复

要对文件进行代码检查，使用 `ESLint` 实例的 `lintFiles` 方法。传递给 `ESLint#lintFiles()` 的 `filePaths` 参数可以是一个字符串或一个字符串数组，表示你要检查的文件路径。文件路径可以是通配符或文件名。

静态方法 `ESLint.outputFixes()` 获取调用 `ESLint#lintFiles()` 的代码检查结果，然后将修复后的代码写回源文件。

```javascript
// example-eslint-integration.js

// ... previous step's code to instantiate the ESLint instance

// Lint the specified files and return the results
async function lintAndFix(eslint, filePaths) {
  const results = await eslint.lintFiles(filePaths);

  // Apply automatic fixes and output fixed code
  await ESLint.outputFixes(results);

  return results;
}
```

## 步骤 4：输出结果

定义一个函数，将代码检查的结果输出到控制台。这应该根据你的集成需求进行定制。例如，你可以将代码检查结果报告给用户界面。

在这个例子中，我们将简单地将结果记录到控制台：

```javascript
// example-eslint-integration.js

// ... previous step's code to instantiate the ESLint instance
// and get linting results.

// Log results to console if there are any problems
function outputLintingResults(results) {
  // Identify the number of problems found
  const problems = results.reduce((acc, result) => acc + result.errorCount + result.warningCount, 0);

  if (problems > 0) {
    console.log("Linting errors found!");
    console.log(results);
  } else {
    console.log("No linting errors found.");
  }
  return results;
}
```

## 步骤 5：将所有步骤整合

将上述函数放在一个名为 `lintFiles` 的新函数中。这个函数将是你集成的主要入口点：

```javascript
// example-eslint-integration.js

// Put previous functions all together
async function lintFiles(filePaths) {

    // The ESLint configuration. Alternatively, you could load the configuration
    // from a .eslintrc file or just use the default config.
    const overrideConfig = {
        env: {
            es6: true,
            node: true,
        },
        parserOptions: {
            ecmaVersion: 2018,
        },
        rules: {
            "no-console": "error",
            "no-unused-vars": "warn",
        },
    };

    const eslint = createESLintInstance(overrideConfig);
    const results = await lintAndFix(eslint, filePaths);
    return outputLintingResults(results);
}

// Export integration
module.exports = { lintFiles }
```

以下是 `example-eslint-integration.js` 的完整代码示例：

```javascript
const { ESLint } = require("eslint");

// Create an instance of ESLint with the configuration passed to the function
function createESLintInstance(overrideConfig){
  return new ESLint({ useEslintrc: false, overrideConfig: overrideConfig, fix: true });
}

// Lint the specified files and return the results
async function lintAndFix(eslint, filePaths) {
  const results = await eslint.lintFiles(filePaths);

  // Apply automatic fixes and output fixed code
  await ESLint.outputFixes(results);

  return results;
}

// Log results to console if there are any problems
function outputLintingResults(results) {
  // Identify the number of problems found
  const problems = results.reduce((acc, result) => acc + result.errorCount + result.warningCount, 0);

  if (problems > 0) {
    console.log("Linting errors found!");
    console.log(results);
  } else {
    console.log("No linting errors found.");
  }
  return results;
}

// Put previous functions all together
async function lintFiles(filePaths) {

    // The ESLint configuration. Alternatively, you could load the configuration
    // from a .eslintrc file or just use the default config.
    const overrideConfig = {
        env: {
            es6: true,
            node: true,
        },
        parserOptions: {
            ecmaVersion: 2018,
        },
        rules: {
            "no-console": "error",
            "no-unused-vars": "warn",
        },
    };

    const eslint = createESLintInstance(overrideConfig);
    const results = await lintAndFix(eslint, filePaths);
    return outputLintingResults(results);
}

// Export integration
module.exports = { lintFiles }
```

## 结论

在本教程中，我们介绍了如何使用 `ESLint` 类在项目中对文件进行代码检查并获取结果的基本知识。这些知识可以应用于创建自定义集成，例如代码编辑器插件，以提供代码质量的实时反馈。

## 查看教程代码

你可以在[这里](https://github.com/eslint/eslint/tree/main/docs/_examples/integration-tutorial-code)查看教程的带有注释的源代码。
