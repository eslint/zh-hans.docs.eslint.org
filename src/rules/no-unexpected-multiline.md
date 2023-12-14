---
title: no-unexpected-multiline
rule_type: problem
related_rules:
- func-call-spacing
- semi
- space-unary-ops
---

JavaScript 中的分号有无可供喜欢选择，因为有自动分号插入（ASI）。你可以用 [semi](./semi) 规则来强制使用或不适应分号。

ASI 规则相对来说是比较简单的。正如 Isaac Schlueter 曾经描述的那样，换行符总是结束一个语句，就像分号一样，**除**以下情况外：

* 语句中有一个未封闭的 parent，数组字头，或对象字头，或以其他一些不是结束语句的有效方式结束（例如，以 `.` 或 `,` 结束）。
* 该行是 `--` 或　`++`（在这种情况下，它将递减/增加下一个标记）
* 它是一个 `for()`、`while()`、`do`、`if()` 或 `else`, 并且没有 `{`
* 下一行以 `[`、`(`、`+`、`*`、`/`、`-`、`,`、`.` 或其他一些只能在一个表达式的两个标记之间找到的二进制运算符开始。

在换行但**并不**结束语句的例外情况下，省略分号的输入错误会导致两个不相关的连续行被解释为一个表达式。特别是对于没有分号的编码风格，读者可能会忽略这个错误。虽然语法上是正确的，但代码在执行时可能会出现异常。

## 规则细节

这条规则不允许出现混乱的多行表达式，即换行看起来像是在结束一个语句，但实际上不是。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unexpected-multiline: "error"*/

var foo = bar
(1 || 2).baz();

var hello = 'world'
[1, 2, 3].forEach(addNumber);

let x = function() {}
`hello`

let x = function() {}
x
`hello`

let x = foo
/regex/g.test(bar)
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-unexpected-multiline: "error"*/

var foo = bar;
(1 || 2).baz();

var foo = bar
;(1 || 2).baz()

var hello = 'world';
[1, 2, 3].forEach(addNumber);

var hello = 'world'
void [1, 2, 3].forEach(addNumber);

let x = function() {};
`hello`

let tag = function() {}
tag `hello`
```

:::

## 何时不用

如果你确信你不会意外地引入这样的代码，你可以把这个规则关掉。

请注意，有问题的模式**不会**被 [semi](semi) 规则标记的。
