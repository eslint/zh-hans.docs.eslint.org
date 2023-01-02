---
title: default-param-last
rule_type: suggestion
---

将默认参数放在最后，允许函数调用省略可选的尾部参数。

```js
// Correct: optional argument can be omitted
function createUser(id, isAdmin = false) {}
createUser("tabby")

// Incorrect: optional argument can **not** be omitted
function createUser(isAdmin = false, id) {}
createUser(undefined, "tabby")
```

## 规则细节

这条规则强制规定默认参数为参数的最后一个。

使用此规则的**错误**示例：

::: incorrect

```js
/* eslint default-param-last: ["error"] */

function f(a = 0, b) {}

function f(a, b = 0, c) {}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/* eslint default-param-last: ["error"] */

function f(a, b = 0) {}
```

:::
