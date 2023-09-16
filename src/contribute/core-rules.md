---
title: 贡献核心规则
eleventyNavigation:
    key: contribute core rule
    parent: contribute to eslint
    title: 贡献核心规则
    order: 10
---

The ESLint core rules are the rules included in the ESLint package.

ESLint 核心规则是指那些包括在 ESLint 包里的规则。

## 规则编写文档

For full reference information on writing rules, refer to [Custom Rules](../extend/custom-rules). Both custom rules and core rules have the same API. The primary difference between core and custom rules are:

全部可供参考的编写规则信息，均已列在[自定义规则](../extend/custom-rules)中。自定义规则和核心规则采用相同的 API。核心规则和自定义规则的主要差别在于：

1. Core rules are included in the `eslint` package.
1. Core rules must adhere to the conventions documented on this page.

1. 核心规则包括在 `eslint` 包中。
1. 核心规则必须遵守此页列出的规范。

## 文件结构

Each core rule in ESLint has three files named with its identifier (for example, `no-extra-semi`).

ESLint 中的每个核心规则均有三个以其标识符命名的文件（比如，`no-extra-semi`）。

* in the `lib/rules` directory: a source file (for example, `no-extra-semi.js`)
* in the `tests/lib/rules` directory: a test file (for example, `no-extra-semi.js`)
* in the `docs/src/rules` directory: a Markdown documentation file (for example, `no-extra-semi.md`)

* 在 `lib/rules` 目录中的源文件（比如，`no-extra-semi.js`）
* 在 `tests/lib/rules` 目录中的测试文件（比如 `no-extra-semi.js`）
* 在 `docs/src/rules` 目录中的 Markdown 文档文件（比如 `no-extra-semi.md`）

**Important:** If you submit a core rule to the ESLint repository, you **must** follow the conventions explained below.

**重要**：如果你向 ESLint 提交了一个核心规则，你**必须**遵守于下方解释的规范。

Here is the basic format of the source file for a rule:

这是一个规则源文件的基础格式：

```js
/**
 * @fileoverview Rule to disallow unnecessary semicolons
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('../shared/types').Rule} */
module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow unnecessary semicolons",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-extra-semi"
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

## 规则单元测试

Each bundled rule for ESLint core must have a set of unit tests submitted with it to be accepted. The test file is named the same as the source file but lives in `tests/lib/`. For example, if the rule source file is `lib/rules/foo.js` then the test file should be `tests/lib/rules/foo.js`.

ESLint 核心中每个捆绑的规则都必须有一个单元测试集，方可被接受。测试文件和源文件名字相同但处于 `tests/lib/` 中。比如，如果规则源文件是 `lib/rules/foo.js`，那么测试文件就应该是 `tests/lib/rules/foo.js`。

ESLint provides the [`RuleTester`](../integrate/nodejs-api#ruletester) utility to make it easy to write tests for rules.

ESLint 提供了 [`RuleTester`](../integrate/nodejs-api#ruletester) 实用工具来简化编写规则测试的难度。

## 性能测试

To keep the linting process efficient and unobtrusive, it is useful to verify the performance impact of new rules or modifications to existing rules.

为了测试检查过程高效且不易察觉，在编写新的规则货修改已有规则时验证性能影响就很有必要。

To learn how to profile the performance of individual rules, refer to [Profile Rule Performance](../extend/custom-rules#profile-rule-performance) in the custom rules documentation.

要学习如何配置验证各规则的性能，可以参考自定义规则文档中的[验证规则性能](../extend/custom-rules#验证规则性能)章节。

When developing in the ESLint core repository, the `npm run perf` command gives a high-level overview of ESLint running time with all core rules enabled.

在 ESLint 核心仓库中开发，`npm run perf` 命令行提供了运行 ESLint 且启用全部核心规则时的高级概览。

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

## 规则命名规范

The rule naming conventions for ESLint are as follows:

ESLint 规则命名规范遵守：

* Use dashes between words.
* If your rule only disallows something, prefix it with `no-` such as `no-eval` for disallowing `eval()` and `no-debugger` for disallowing `debugger`.
* If your rule is enforcing the inclusion of something, use a short name without a special prefix.

* 在两个词中间使用连接号。
* 如果规则仅用于禁用某些特定行为，则以 `no-` 为前缀，如 `no-eval` 用于禁用 `eval()` 以及 `no-debugger` 用于禁用 `debugger`。
* 如果规则强制包括某些特定行为，则使用短且不包括特殊前缀的名称。
