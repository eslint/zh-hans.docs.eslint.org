---
title: no-mixed-operators
layout: doc
rule_type: suggestion
related_rules:
- no-extra-parens
---

用小括号将复杂的表达式括起来，可以澄清开发者的意图，从而使代码更易读。
当在一个表达式中连续使用不同的运算符而没有括号时，这条规则会发出警告。

```js
var foo = a && b || c || d;    /*BAD: Unexpected mix of '&&' and '||'.*/
var foo = (a && b) || c || d;  /*GOOD*/
var foo = a && (b || c || d);  /*GOOD*/
```

**注意**：
预计该规则会对一对混合运算符发出一个错误。因此，对于每两个连续使用的混合运算符，将显示一个不同的错误，指出哪里使用了违反规则的特定运算符。

```js
var foo = a && b || c || d;
```

will generate

```shell
1:13  Unexpected mix of '&&' and '||'. (no-mixed-operators)
1:18  Unexpected mix of '&&' and '||'. (no-mixed-operators)
```

## 规则细节

该规则检查 `BinaryExpression`、`LogicalExpression` 和 `ConditionalExpression`。

此规则可能与 [no-extra-parens](no-extra-parens) 规则冲突。
如果你同时使用这条规则和 [no-extra-parens](no-extra-parens) 规则，你需要使用 [no-extra-parens](no-extra-parens) 规则的 `nestedBinaryExpressions` 选项。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-mixed-operators: "error"*/

var foo = a && b < 0 || c > 0 || d + 1 === 0;
var foo = a + b * c;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-mixed-operators: "error"*/

var foo = a || b || c;
var foo = a && b && c;
var foo = (a && b < 0) || c > 0 || d + 1 === 0;
var foo = a && (b < 0 || c > 0 || d + 1 === 0);
var foo = a + (b * c);
var foo = (a + b) * c;
```

:::

## 选项

```json
{
    "no-mixed-operators": [
        "error",
        {
            "groups": [
                ["+", "-", "*", "/", "%", "**"],
                ["&", "|", "^", "~", "<<", ">>", ">>>"],
                ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                ["&&", "||"],
                ["in", "instanceof"]
            ],
            "allowSamePrecedence": true
        }
    ]
}
```

This rule has 2 options.

* `groups`（`string[][]`）- 指定要检查的运算符组。`groups` 选项是一个组的列表，一个组是一个二进制运算符的列表。默认的运算符组被定义为算术、比特、比较、逻辑和关系运算符。注意：三元运算符 (?:) 可以是任何组的一部分，默认情况下，允许与其他运算符混合。

* `allowSamePrecedence` (`boolean`) - 指定是否允许混合运算符具有相同的优先级。默认为 `true`。

### groups

下列运算符可用于 `groups` 选项：

* 算术运算符：`"+"`, `"-"`, `"*"`, `"/"`, `"%"`, `"**"`
* 位运算符：`"&"`, `"|"`, `"^"`, `"~"`, `"<<"`, `">>"`, `">>>"`
* 比较运算符：`"=="`, `"!="`, `"==="`, `"!=="`, `">"`, `">="`, `"<"`, `"<="`
* 逻辑运算符：`"&&"`, `"||"`
* 合并运算符：`"??"`
* 关系运算符：`"in"`, `"instanceof"`
* 三元运算符：`?:`

现在，考虑以下组的配置：`{"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}`。
在这个配置中，有 2 个组被指定：位运算符和逻辑运算符。
这条规则只检查运算符是否属于同一组。
在这种情况下，本规则检查位运算符和逻辑运算符是否混合，但忽略所有其他运算符。

使用此规则并使用 `{"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-mixed-operators: ["error", {"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}]*/

var foo = a && b < 0 || c > 0 || d + 1 === 0;
var foo = a & b | c;
```

:::

::: incorrect

```js
/*eslint no-mixed-operators: ["error", {"groups": [["&&", "||", "?:"]]}]*/

var foo = a || b ? c : d;

var bar = a ? b || c : d;

var baz = a ? b : c || d;
```

:::

Examples of **correct** code for this rule with `{"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}` option:

::: correct

```js
/*eslint no-mixed-operators: ["error", {"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}]*/

var foo = a || b > 0 || c + 1 === 0;
var foo = a && b > 0 && c + 1 === 0;
var foo = (a && b < 0) || c > 0 || d + 1 === 0;
var foo = a && (b < 0 ||  c > 0 || d + 1 === 0);
var foo = (a & b) | c;
var foo = a & (b | c);
var foo = a + b * c;
var foo = a + (b * c);
var foo = (a + b) * c;
```

:::

::: correct

```js
/*eslint no-mixed-operators: ["error", {"groups": [["&&", "||", "?:"]]}]*/

var foo = (a || b) ? c : d;
var foo = a || (b ? c : d);

var bar = a ? (b || c) : d;

var baz = a ? b : (c || d);
var baz = (a ? b : c) || d;
```

:::

### allowSamePrecedence

使用此规则与 `{"allowSamePrecedence": true}` 选项的**正确**示例：

::: correct

```js
/*eslint no-mixed-operators: ["error", {"allowSamePrecedence": true}]*/

// + and - have the same precedence.
var foo = a + b - c;
```

:::

Examples of **incorrect** code for this rule with `{"allowSamePrecedence": false}` option:

::: incorrect

```js
/*eslint no-mixed-operators: ["error", {"allowSamePrecedence": false}]*/

// + and - have the same precedence.
var foo = a + b - c;
```

:::

Examples of **correct** code for this rule with `{"allowSamePrecedence": false}` option:

::: correct

```js
/*eslint no-mixed-operators: ["error", {"allowSamePrecedence": false}]*/

// + and - have the same precedence.
var foo = (a + b) - c;
```

:::

## 何时不用

如果你不关心混合运算符，你可以安全地禁用此规则。
