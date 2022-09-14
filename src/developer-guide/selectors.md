---
title: 选择器
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/developer-guide/selectors.md

---

一些规则和 API 允许使用选择器来查询 AST。本页的目的是：

1. 解释什么是选择器
1. 描述创建选择器的语法
1. 描述选择器可以用来做什么

## 什么是选择器？

选择器是可以用来匹配抽象语法树（AST）中节点的字符串。这对于描述你的代码中的特定语法模式很有用。

AST 选择器的语法与 [CSS 选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)的语法类似。如果你以前使用过 CSS 选择器，AST 选择器的语法应该很容易理解。

最简单的选择器只有节点类型。一个节点类型选择器将匹配所有具有给定类型的节点。比如思考下面这个程序：

```js
var foo = 1;
bar.baz();
```

选择器 `Identifier` 将匹配程序中所有的 `Identifier` 节点。在这种情况下，选择器将匹配 `foo`、`bar` 和 `baz` 的节点。

选择器并不局限于对单一节点类型的匹配。例如，选择器 `VariableDeclarator > Identifier` 将匹配所有以 `VariableDeclarator` 为直接父节点的 `Identifier` 节点。在上面的程序中，这将匹配 `foo` 的节点，但不匹配 `bar` 和 `baz` 的节点。

## 选择器支持哪些语法？

支持以下选择器：

* AST 节点类型：`ForStatement`
* 通配符（匹配所有节点）：`*`
* 存在属性：`[attr]`
* 属性值：`[attr="foo"]` 或 `[attr=123]`
* 属性正则：`[attr=/foo.*/]` <sub>（有一些[已知问题](#已知问题)）</sub>
* 属性条件：`[attr!="foo"]`、`[attr>2]`、`[attr<3]`、`[attr>=2]` 或 `[attr<=3]`
* 嵌套属性：`[attr.level2="foo”]`
* 字段：`FunctionDeclaration > Identifier.id`
* 第一个或最后一个子项：`:first-child` 或 `:last-child`
* 第 n 个子项（不支持 ax+b）：`:nth-child(2)`
* 最后 n 个子项（不支持 ax+b ）：`:nth-last-child(1)`
* 后裔：`FunctionExpression ReturnStatement`
* 子项：`UnaryExpression > Literal`
* 随同兄弟：`VariableDeclaration ~ VariableDeclaration`
* 相邻兄弟：`ArrayExpression > Literal + SpreadElement`
* 否定：`:not(ForStatement)`
* 任意匹配：`:matches([attr] > :first-child, :last-child)`
* AST 节点类：`:statement`、`:expression`、`:declaration`、`:function` 或 `:pattern`

这种语法非常强大，可以用来在你的代码中精确选择许多语法模式。

<sup>本节中的例子改编自 [esquery](https://github.com/estools/esquery) 文档</sup>

## 选择器可以拿来干嘛？

如果你正在编写自定义的 ESLint 规则，你可能对使用选择器来检查 AST 的特定部分感兴趣。如果你正在为你的代码库配置 ESLint，你可能对用选择器限制特定的语法模式感兴趣。

### 监听规则中的选择器

当编写一个自定义的 ESLint 规则时，你可以在 AST 被遍历时监听符合特定选择器的节点。

```js
module.exports = {
  create(context) {
    // ...

    return {

      // 这个监听器将为所有有块的 IfStatement 节点被调用。
      "IfStatement > BlockStatement": function(blockStatementNode) {
        // ...你的逻辑在此
      },

      // 这个监听器会调用所有有 3个 以上参数的函数声明。
      "FunctionDeclaration[params.length>3]": function(functionDeclarationNode) {
        // ... 你的逻辑在此
      }
    };
  }
};
```

在选择器的末尾添加 `:exit` 将导致监听器在遍历过程中退出匹配节点时被调用，而不是在进入节点时被调用。

如果两个或更多的选择器匹配同一个节点，它们的监听器将按照特定性增加的顺序被调用。AST 选择器的特异性类似于 CSS 选择器的特异性。

* 当比较两个选择器时，包含更多的类选择器、属性选择器和伪类选择器（不包括 `:not()`）的选择器的特异性更高。
* 如果类/属性/伪类数量相同，包含更多节点类型选择器的选择器具有更高的特异性。

如果多个选择器的特异性相同，它们的监听器将按字母顺序对该节点进行调用。

### 用选择器限制语法

通过 [no-restricted-syntax](/docs/rules/no-restricted-syntax) 规则，你可以限制代码中特定语法的使用。例如，你可以使用以下配置来禁止使用没有块状语句作为主体的 `if` 语句：

```json
{
  "rules": {
    "no-restricted-syntax": ["error", "IfStatement > :not(BlockStatement).consequent"]
  }
}
```

...或者你也可以使用下面这种等效的配置：

```json
{
  "rules": {
    "no-restricted-syntax": ["error", "IfStatement[consequent.type!='BlockStatement']"]
  }
}
```

另一个可以禁止调用 `require()` 的示例：

```json
{
  "rules": {
    "no-restricted-syntax": ["error", "CallExpression[callee.name='require']"]
  }
}
```

或者你可以强制要求对 `setTimeout` 的调用总是要有两个参数：

```json
{
  "rules": {
    "no-restricted-syntax": ["error", "CallExpression[callee.name='setTimeout'][arguments.length!=2]"]
  }
}
```

在 `no-restricted-syntax` 规则中使用选择器可以让你对代码库中的问题模式有很大的控制力，而不需要编写自定义规则来检测每个模式。

### 已知问题

由于 [esquery](https://github.com/estools/esquery) 中的一个 [bug](https://github.com/estools/esquery/issues/68)，包含正斜线字符 `/` 的正则表达式不能被正确解析，所以 `[value=/some/path/]` 会出现语法错误。你可以将 `/` 字符替换成其对应的 unicode 字符，像这样 `[value=/some\u002Fpath/]`，来[解决这个问题](https://github.com/estools/esquery/issues/68)。
