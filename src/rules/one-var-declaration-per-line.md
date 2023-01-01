---
title: one-var-declaration-per-line
rule_type: suggestion
related_rules:
- one-var
---

有些开发者在同一行中声明多个 var 语句。

```js
var foo, bar, baz;
```

其他人更喜欢每行声明一个 var。

```js
var foo,
    bar,
    baz;
```

在一个项目的代码库中保持这些风格之一，有助于保持代码的一致性。

## 规则细节

这条规则强制要求变量声明周围有一致的换行线。这条规则忽略了 `for` 循环条件中的变量声明。

## 选项

这条规则有一个字符串选项：

* `"initializations"`（默认值）在变量初始化时强制使用换行
* `"always"` 在变量声明中强制使用换行

### initializations

使用此规则与默认的 `"initializations"` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var-declaration-per-line: ["error", "initializations"]*/
/*eslint-env es6*/

var a, b, c = 0;

let a,
    b = 0, c;
```

:::

使用此规则与默认的 `"initializations"` 选项的**正确**示例：

::: correct

```js
/*eslint one-var-declaration-per-line: ["error", "initializations"]*/
/*eslint-env es6*/

var a, b;

let a,
    b;

let a,
    b = 0;
```

:::

### always

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint one-var-declaration-per-line: ["error", "always"]*/
/*eslint-env es6*/

var a, b;

let a, b = 0;

const a = 0, b = 0;
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint one-var-declaration-per-line: ["error", "always"]*/
/*eslint-env es6*/

var a,
    b;

let a,
    b = 0;
```

:::
