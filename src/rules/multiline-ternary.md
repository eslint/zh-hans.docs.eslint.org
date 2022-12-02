---
title: multiline-ternary
layout: doc
rule_type: layout
related_rules:
- operator-linebreak
---

JavaScript 允许三元表达式的操作数用换行符分隔，这可以提高程序的可读性。

比如：

```js
var foo = bar > baz ? value1 : value2;
```

上述内容可以改写为以下内容，以提高可读性并更清楚地分清运算符：

```js
var foo = bar > baz ?
    value1 :
    value2;
```

## 规则细节

这条规则执行或不允许在三元表达式的操作数之间加换行。
注意：本规则不强制执行操作数的位置。如果你对强制执行运算符本身的位置感兴趣，请参见 [operator-linebreak](operator-linebreak) 规则。

## 选项

此规则选项为字符串：

* `"always"`（默认值）在三元表达式的操作数之间强制使用新行。
* `"always-multiline"` 如果表达式跨越多行，则在三元表达式的操作数之间强制使用新行。
* `"never"` 不允许在三元表达式的操作数之间加新行。

### always

这是默认的选项。

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint multiline-ternary: ["error", "always"]*/

foo > bar ? value1 : value2;

foo > bar ? value :
    value2;

foo > bar ?
    value : value2;
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint multiline-ternary: ["error", "always"]*/

foo > bar ?
    value1 :
    value2;

foo > bar ?
    (baz > qux ?
        value1 :
        value2) :
    value3;
```

:::

### always-multiline

使用此规则与 `"always-multiline"` 选项的**错误**示例：

::: incorrect

```js
/*eslint multiline-ternary: ["error", "always-multiline"]*/

foo > bar ? value1 :
    value2;

foo > bar ?
    value1 : value2;

foo > bar &&
    bar > baz ? value1 : value2;
```

:::

使用此规则与 `"always-multiline"` 选项的**正确**示例：

::: correct

```js
/*eslint multiline-ternary: ["error", "always-multiline"]*/

foo > bar ? value1 : value2;

foo > bar ?
    value1 :
    value2;

foo > bar ?
    (baz > qux ? value1 : value2) :
    value3;

foo > bar ?
    (baz > qux ?
        value1 :
        value2) :
    value3;

foo > bar &&
    bar > baz ?
        value1 :
        value2;
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint multiline-ternary: ["error", "never"]*/

foo > bar ? value :
    value2;

foo > bar ?
    value : value2;

foo >
    bar ?
    value1 :
    value2;
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint multiline-ternary: ["error", "never"]*/

foo > bar ? value1 : value2;

foo > bar ? (baz > qux ? value1 : value2) : value3;

foo > bar ? (
    baz > qux ? value1 : value2
) : value3;
```

:::

## 何时不用

如果你对三元表达式的操作数是否应该用换行符分隔没有任何严格的约定，你可以安全地禁用这条规则。

## 兼容

* **JSCS**：[requireMultiLineTernary](https://jscs-dev.github.io/rule/requireMultiLineTernary)
