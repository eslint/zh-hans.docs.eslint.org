---
title: no-restricted-syntax
layout: doc
rule_type: suggestion
related_rules:
- no-alert
- no-console
- no-debugger
- no-restricted-properties
---

JavaScript 有很多语言特性，而不是每个人都喜欢所有的特性。因此，有些项目会选择完全不允许使用某些语言特性。例如，你可能决定不允许使用 `try-catch` 或 `class`，或者你可能决定不允许使用 `in`运算符。

与其为每个你想关闭的语言功能创建单独的规则，这条规则允许你配置你想限制使用的语法元素。这些元素由其 [ESTree](https://github.com/estree/estree) 节点类型表示。例如，函数声明由 `FunctionDeclaration` 表示，`with` 语句由 `WithStatement` 表示。你可以[在 GitHub 上](https://github.com/eslint/eslint-visitor-keys/blob/main/lib/visitor-keys.js)找到你可以使用的 AST 节点名称的完整列表 ，并使用 [AST Explorer](https://astexplorer.net/) 与 espree 解析器来查看你的代码由哪些类型的节点组成。

你也可以指定 [AST 选择器](../developer-guide/selectors) 来限制，允许对语法模式进行更精确的控制。

## 规则细节

这条规则不允许指定的（也就是用户定义的）语法。

## 选项

这个规则接受一个字符串列表，其中每个字符串是一个 AST 选择器：

```json
{
    "rules": {
        "no-restricted-syntax": ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"]
    }
}
```

另外，规则也接受对象，其中指定了选择器和一个自定义信息的选项：

```json
{
    "rules": {
        "no-restricted-syntax": [
            "error",
            {
                "selector": "FunctionExpression",
                "message": "Function expressions are not allowed."
            },
            {
                "selector": "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
                "message": "setTimeout must always be invoked with two arguments."
            }
        ]
    }
}
```

如果用`message` 属性指定了一个自定义信息，ESLint 在报告 `selector` 属性中指定的语法出现时将使用该信息。

字符串和对象格式可以根据需要在配置中自由混合。

使用此规则与 `"FunctionExpression", "WithStatement", BinaryExpression[operator='in']` 选项的**错误**示例：

::: incorrect

```js
/* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

with (me) {
    dontMess();
}

var doSomething = function () {};

foo in bar;
```

:::

使用此规则与 `"FunctionExpression", "WithStatement", BinaryExpression[operator='in']` 选项的**正确**示例：

::: correct

```js
/* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

me.dontMess();

function doSomething() {};

foo instanceof bar;
```

:::

## 何时不用

如果你不想限制你的代码使用任何 JavaScript 特性或语法，你就不应该使用这个规则。
