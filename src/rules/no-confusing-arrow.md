---
title: no-confusing-arrow
rule_type: suggestion
related_rules:
- no-constant-condition
- arrow-parens
---

箭头函数（`=>`）在语法上与一些比较运算符（`>`、`<`、`<=` 和 `>=`）相似。这条规则将在可能与比较运算符相混淆的地方使用箭头函数语法时发出不要这样做的警告。

这里有一个可能会引起混淆的 `=>` 的用法示例：

```js
// The intent is not clear
var x = a => 1 ? 2 : 3;
// Did the author mean this
var x = function (a) {
    return 1 ? 2 : 3;
};
// Or this
var x = a <= 1 ? 2 : 3;
```

## 规则细节

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-confusing-arrow: "error"*/
/*eslint-env es6*/

var x = a => 1 ? 2 : 3;
var x = (a) => 1 ? 2 : 3;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-confusing-arrow: "error"*/
/*eslint-env es6*/
var x = a => (1 ? 2 : 3);
var x = (a) => (1 ? 2 : 3);
var x = (a) => {
    return 1 ? 2 : 3;
};
var x = a => { return 1 ? 2 : 3; };
```

:::

## 选项

该规则接受两个选项参数，默认值如下：

```json
{
    "rules": {
        "no-confusing-arrow": [
            "error",
            { "allowParens": true, "onlyOneSimpleParam": false }
        ]
    }
}
```

`allowParens` 设置项值为布尔值，可以是 `true`（默认）或 `false`：

1. `true` 放宽规则，将小括号内的语法视作有效的“防止混淆”语法
2. `false` 即使表达式被小括号包住也会发出警告

使用此规则与 `{"allowParens": false}` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-confusing-arrow: ["error", {"allowParens": false}]*/
/*eslint-env es6*/
var x = a => (1 ? 2 : 3);
var x = (a) => (1 ? 2 : 3);
```

:::

`onlyOneSimpleParam` 设置值为布尔值，可以是 `true` 或 `false`（默认值)：

1. `true` 放宽规则，如果箭头函数有 0 个或 1 个以上的参数，或者参数不是标识符，则不报告错误。
2. `false` 不管参数如何都会发出警告。

使用此规则与 `{"onlyOneSimpleParam": true}` 选项的**正确**示例：

::: correct

```js
/*eslint no-confusing-arrow: ["error", {"onlyOneSimpleParam": true}]*/
/*eslint-env es6*/
() => 1 ? 2 : 3;
(a, b) => 1 ? 2 : 3;
(a = b) => 1 ? 2 : 3;
({ a }) => 1 ? 2 : 3;
([a]) => 1 ? 2 : 3;
(...a) => 1 ? 2 : 3;
```

:::
