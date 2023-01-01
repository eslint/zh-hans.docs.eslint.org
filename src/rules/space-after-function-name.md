---
title: space-after-function-name

---

强制执行函数定义中名称后的一致间距。

（已移除）此规则在 ESLint v1.0 中移除并被 [space-before-function-paren](space-before-function-paren) 所取代。

函数名称和参数列表之间的空格是可选的。

```js
function withoutSpace(x) {
    // ...
}

function withSpace (x) {
    // ...
}
```

一些风格指南可能要求函数名的间距一致。

## 规则细节

这条规则的目的是在函数名称后面执行一致的间距。它需要一个参数。如果是 `"always"`，那么所有的函数名后面必须至少有一个空格。如果是 `"never"`，那么函数名和参数列表之间不应该有空格。默认是 `"never"`。

使用此规则的**错误**示例：

::: incorrect

```js
function foo (x) {
    // ...
}

var x = function named (x) {};

// When ["error", "always"]
function bar(x) {
    // ...
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
function foo(x) {
    // ...
}

var x = function named(x) {};

// When ["error", "always"]
function bar (x) {
    // ...
}
```

:::
