---
title: no-return-assign
layout: doc
rule_type: suggestion
---

JavaScript 的一个有趣的、有时令人困惑的方面是，赋值几乎可以发生在任何地方。正因为如此，一个错误的等号可能会导致赋值，而真正的意图是做一个比较。这在使用 `return` 语句时尤其如此。比如：

```js
function doSomething() {
    return foo = bar + 2;
}
```

很难说清这里的 `return` 语句的意图是什么。有可能该函数的目的是返回 `bar + 2` 的结果，但为什么要将其赋值给 `foo`？也有可能是为了使用一个比较运算符，如 `==`，这段代码是一个错误。

由于这种模糊性，一般不在 `return` 语句中进行赋值。

## 规则细节

这条规则的目的是消除 `return` 语句中的赋值。因此，只要发现有赋值作为 `return` 的一部分，它就会发出警告。

## 选项

规则需要一个选项，即一个字符串，它必须包含以下值之一：

* `except-parens`（默认值）：不允许赋值，除非它们被括在括号内。
* `always`：不允许所有的赋值。

### except-parens

这是默认的选项。
它不允许赋值，除非它们被括在括号中。

使用默认的 `"except-parens"` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-return-assign: "error"*/

function doSomething() {
    return foo = bar + 2;
}

function doSomething() {
    return foo += 2;
}

const foo = (a, b) => a = b

const bar = (a, b, c) => (a = b, c == b)

function doSomething() {
    return foo = bar && foo > 0;
}
```

:::

使用默认的 `"except-parens"` 选项的**正确**示例：

::: correct

```js
/*eslint no-return-assign: "error"*/

function doSomething() {
    return foo == bar + 2;
}

function doSomething() {
    return foo === bar + 2;
}

function doSomething() {
    return (foo = bar + 2);
}

const foo = (a, b) => (a = b)

const bar = (a, b, c) => ((a = b), c == b)

function doSomething() {
    return (foo = bar) && foo > 0;
}
```

:::

### always

这个选项不允许在 `return` 语句中进行任何赋值。
所有的赋值都被当作问题处理。

使用 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-return-assign: ["error", "always"]*/

function doSomething() {
    return foo = bar + 2;
}

function doSomething() {
    return foo += 2;
}

function doSomething() {
    return (foo = bar + 2);
}
```

:::

使用 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint no-return-assign: ["error", "always"]*/

function doSomething() {
    return foo == bar + 2;
}

function doSomething() {
    return foo === bar + 2;
}
```

:::

## 何时不用

如果你想允许在 `return` 语句中使用赋值运算符，你可以安全地禁用此规则。
