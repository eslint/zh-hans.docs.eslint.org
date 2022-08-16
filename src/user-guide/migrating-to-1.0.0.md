---
title: 迁移至 v1.0.0
layout: doc
edit_link: https://github.com/eslint/eslint/edit/main/docs/src/user-guide/migrating-to-1.0.0.md

---

ESLint v1.0.0 是首个主要发行版。因此，ESLint 0.x 时的工作方式与未来的工作方式之间有一些重大变化。这些变化都是参考 ESLint 社区用户反馈后产生的，并非没有考虑升级问题。我们相信这些变化能使 ESLint 变得更好，且希望升级并不困难，虽然在升级前需要做些处理，但相信你一定会看到升级带来的好处。

## 默认关闭所有规则

在 v1.0.0 中最重要的变化就是所有的规则在默认情况下都是关闭的了。在众人要求关闭默认规则后我们做了这个改变。你可以在默认关闭所有规则后在配置文件中使用 `extends` 重新启用它们。因此我们删除 `--reset` 命令行选项，并将其作为默认行为。

当使用 `--init` 时，自动生成的配置文件中会包括这一行：

```json
{
    "extends": "eslint:recommended"
}
```

添加该设置部分行为将与 0.x 中的部分默认行为类似。如果不想使用任何推荐的规则，可以删除这一行。

**解决方案**：如果你正在使用 `--reset`，那么除停止传递 `--reset` 选项外不用做别的了。如果你没使用 `--reset，那么你需要对配置文件进行审核并确定默认启用哪些规则。你可以在配置文件中加入以下内容来恢复部分默认行为：

`"eslint:recommended"` 配置包括了许多与 0.x 默认规则一样的规则。但它们不再默认启用了，所以你一个审查你的配置并确认它们仍符合你的预期：

* [no-alert](https://eslint.org/docs/rules/no-alert)
* [no-array-constructor](https://eslint.org/docs/rules/no-array-constructor)
* [no-caller](https://eslint.org/docs/rules/no-caller)
* [no-catch-shadow](https://eslint.org/docs/rules/no-catch-shadow)
* [no-empty-label](https://eslint.org/docs/rules/no-empty-label)
* [no-eval](https://eslint.org/docs/rules/no-eval)
* [no-extend-native](https://eslint.org/docs/rules/no-extend-native)
* [no-extra-bind](https://eslint.org/docs/rules/no-extra-bind)
* [no-extra-strict](https://eslint.org/docs/rules/no-extra-strict)
* [no-implied-eval](https://eslint.org/docs/rules/no-implied-eval)
* [no-iterator](https://eslint.org/docs/rules/no-iterator)
* [no-label-var](https://eslint.org/docs/rules/no-label-var)
* [no-labels](https://eslint.org/docs/rules/no-labels)
* [no-lone-blocks](https://eslint.org/docs/rules/no-lone-blocks)
* [no-loop-func](https://eslint.org/docs/rules/no-loop-func)
* [no-multi-spaces](https://eslint.org/docs/rules/no-multi-spaces)
* [no-multi-str](https://eslint.org/docs/rules/no-multi-str)
* [no-native-reassign](https://eslint.org/docs/rules/no-native-reassign)
* [no-new](https://eslint.org/docs/rules/no-new)
* [no-new-func](https://eslint.org/docs/rules/no-new-func)
* [no-new-object](https://eslint.org/docs/rules/no-new-object)
* [no-new-wrappers](https://eslint.org/docs/rules/no-new-wrappers)
* [no-octal-escape](https://eslint.org/docs/rules/no-octal-escape)
* [no-process-exit](https://eslint.org/docs/rules/no-process-exit)
* [no-proto](https://eslint.org/docs/rules/no-proto)
* [no-return-assign](https://eslint.org/docs/rules/no-return-assign)
* [no-script-url](https://eslint.org/docs/rules/no-script-url)
* [no-sequences](https://eslint.org/docs/rules/no-sequences)
* [no-shadow](https://eslint.org/docs/rules/no-shadow)
* [no-shadow-restricted-names](https://eslint.org/docs/rules/no-shadow-restricted-names)
* [no-spaced-func](https://eslint.org/docs/rules/no-spaced-func)
* [no-trailing-spaces](https://eslint.org/docs/rules/no-trailing-spaces)
* [no-undef-init](https://eslint.org/docs/rules/no-undef-init)
* [no-underscore-dangle](https://eslint.org/docs/rules/no-underscore-dangle)
* [no-unused-expressions](https://eslint.org/docs/rules/no-unused-expressions)
* [no-use-before-define](https://eslint.org/docs/rules/no-use-before-define)
* [no-with](https://eslint.org/docs/rules/no-with)
* [no-wrap-func](https://eslint.org/docs/rules/no-wrap-func)
* [camelcase](https://eslint.org/docs/rules/camelcase)
* [comma-spacing](https://eslint.org/docs/rules/comma-spacing)
* [consistent-return](https://eslint.org/docs/rules/consistent-return)
* [curly](https://eslint.org/docs/rules/curly)
* [dot-notation](https://eslint.org/docs/rules/dot-notation)
* [eol-last](https://eslint.org/docs/rules/eol-last)
* [eqeqeq](https://eslint.org/docs/rules/eqeqeq)
* [key-spacing](https://eslint.org/docs/rules/key-spacing)
* [new-cap](https://eslint.org/docs/rules/new-cap)
* [new-parens](https://eslint.org/docs/rules/new-parens)
* [quotes](https://eslint.org/docs/rules/quotes)
* [semi](https://eslint.org/docs/rules/semi)
* [semi-spacing](https://eslint.org/docs/rules/semi-spacing)
* [space-infix-ops](https://eslint.org/docs/rules/space-infix-ops)
* [space-return-throw-case](https://eslint.org/docs/rules/space-return-throw-case)
* [space-unary-ops](https://eslint.org/docs/rules/space-unary-ops)
* [strict](https://eslint.org/docs/rules/strict)
* [yoda](https://eslint.org/docs/rules/yoda)

另见：关于默认行为变更的[全部差异](https://github.com/eslint/eslint/commit/e3e9dbd9876daf4bdeb4e15f8a76a9d5e6e03e39#diff-b01a5cfd9361ca9280a460fd6bb8edbbL1)

这里有一个与旧的默认值最为接近的配置文件：

```json
{
    "extends": "eslint:recommended",
    "rules": {
        "no-alert": 2,
        "no-array-constructor": 2,
        "no-caller": 2,
        "no-catch-shadow": 2,
        "no-empty-label": 2,
        "no-eval": 2,
        "no-extend-native": 2,
        "no-extra-bind": 2,
        "no-implied-eval": 2,
        "no-iterator": 2,
        "no-label-var": 2,
        "no-labels": 2,
        "no-lone-blocks": 2,
        "no-loop-func": 2,
        "no-multi-spaces": 2,
        "no-multi-str": 2,
        "no-native-reassign": 2,
        "no-new": 2,
        "no-new-func": 2,
        "no-new-object": 2,
        "no-new-wrappers": 2,
        "no-octal-escape": 2,
        "no-process-exit": 2,
        "no-proto": 2,
        "no-return-assign": 2,
        "no-script-url": 2,
        "no-sequences": 2,
        "no-shadow": 2,
        "no-shadow-restricted-names": 2,
        "no-spaced-func": 2,
        "no-trailing-spaces": 2,
        "no-undef-init": 2,
        "no-underscore-dangle": 2,
        "no-unused-expressions": 2,
        "no-use-before-define": 2,
        "no-with": 2,
        "camelcase": 2,
        "comma-spacing": 2,
        "consistent-return": 2,
        "curly": [2, "all"],
        "dot-notation": [2, { "allowKeywords": true }],
        "eol-last": 2,
        "no-extra-parens": [2, "functions"],
        "eqeqeq": 2,
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "new-cap": 2,
        "new-parens": 2,
        "quotes": [2, "double"],
        "semi": 2,
        "semi-spacing": [2, {"before": false, "after": true}],
        "space-infix-ops": 2,
        "space-return-throw-case": 2,
        "space-unary-ops": [2, { "words": true, "nonwords": false }],
        "strict": [2, "function"],
        "yoda": [2, "never"]
    }
}
```

## 移除规则

在过去的几个版本中，我们废止了一些规则并引入新的规则来取代它们。以下列出了删除的规则以及其替代物：

* [generator-star](https://eslint.org/docs/rules/generator-star) 被 [generator-star-spacing](https://eslint.org/docs/rules/generator-star-spacing) 所取代
* [global-strict](https://eslint.org/docs/rules/global-strict) 被 [strict](https://eslint.org/docs/rules/strict) 所取代
* [no-comma-dangle](https://eslint.org/docs/rules/no-comma-dangle) 被 [comma-dangle](https://eslint.org/docs/rules/comma-dangle) 所取代
* [no-empty-class](https://eslint.org/docs/rules/no-empty-class) 被 [no-empty-character-class](https://eslint.org/docs/rules/no-empty-character-class) 所取代
* [no-extra-strict](https://eslint.org/docs/rules/no-extra-strict) 被 [strict](https://eslint.org/docs/rules/strict) 所取代
* [no-reserved-keys](https://eslint.org/docs/rules/no-reserved-keys) 被 [quote-props](https://eslint.org/docs/rules/quote-props) 所取代
* [no-space-before-semi](https://eslint.org/docs/rules/no-space-before-semi) 被 [semi-spacing](https://eslint.org/docs/rules/semi-spacing) 所取代
* [no-wrap-func](https://eslint.org/docs/rules/no-wrap-func) 被 [no-extra-parens](https://eslint.org/docs/rules/no-extra-parens) 所取代
* [space-after-function-name](https://eslint.org/docs/rules/space-after-function-name) 被 [space-before-function-paren](https://eslint.org/docs/rules/space-before-function-paren) 所取代
* [space-before-function-parentheses](https://eslint.org/docs/rules/space-before-function-parentheses) 被 [space-before-function-paren](https://eslint.org/docs/rules/space-before-function-paren) 所取代
* [space-in-brackets](https://eslint.org/docs/rules/space-in-brackets) 被 [object-curly-spacing](https://eslint.org/docs/rules/object-curly-spacing ) 和 [array-bracket-spacing](https://eslint.org/docs/rules/array-bracket-spacing) 所取代
* [space-unary-word-ops](https://eslint.org/docs/rules/space-unary-word-ops) 被 [space-unary-ops](https://eslint.org/docs/rules/space-unary-ops) 所取代
* [spaced-line-comment](https://eslint.org/docs/rules/spaced-line-comment) 被 [spaced-comment](https://eslint.org/docs/rules/spaced-comment) 所取代

**解决方案**：你需要更新规则配置并使用新的规则。如果你正在使用被移除的规则 ESLint v1.0.0 会发出警告并建议相关的替代规则。希望借此减少升级过程中遇到的问题。

## 列号是以 1 开始

刚开始由 Esprima 和之后的 Espree 所报告的错误都是从零开始的。然而大多数根据和编辑器都在使用从一开始的列号，这使得 ESLint 与它们见的整合变得十分棘手。在 v1.0.0 版本中，我们转用以 1 开始的列号报告错误，一边与开发者日常使用的工具保持一致。

**解决方案**：如果你创建了编辑器集成或工具来修正列号，那么你需要把它交还给 ESLint。除此之外什么都不用做。

## 不再导出 cli

在 0.x 版本中，导出了 `cli` 对象以供外部工具使用。后来它被弃用了并改用`CLIEngine`。在 v1.0.0 版本中，我们不再导出 `cli`，因为外部工具不应该使用它。这将破坏使用它的现有工具。

**解决方案**：如果你正在使用导出的`cli` 对象，可以切换到 `CLIEngine` 代替它.

## 废弃 eslint-tester

`eslint-tester` 模块长期以来一直是 ESLint 规则的主要测试器，现在移动到了 `eslint` 模块中。这是由于这两个模块之间的复杂关系造成了循环依赖，并在规则测试中造成了很多问题。将测试器移到 `eslint` 模块解决了很多问题。

替换 `eslint-tester` 模块叫做 `RuleTester`。它是 `eslint-tester` 的简化版本，旨在与任何测试框架一起使用。该对象是由包暴露的。

**解决方案**：所有规则测试都转用 `RuleTester`。如果你想用 `ESLintTester` 的话：

```js
var eslint = require("../../../lib/eslint"),
    ESLintTester = require("eslint-tester");

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/your-rule", {
    valid: [],
    invalid: []
});
```

然后你可以改成：

```js
var rule = require("../../../lib/rules/your-rule"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("your-rule", rule, {
    valid: [],
    invalid: []
});
```
