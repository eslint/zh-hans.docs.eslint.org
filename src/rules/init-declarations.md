---
title: init-declarations
rule_type: suggestion
---

在 JavaScript 中，变量可以在声明时被分配，也可以在之后的任何时候使用分配语句。例如，在下面的代码中，`foo` 是在声明时初始化的，而 `bar` 是在之后初始化的。

```js
var foo = 1;
var bar;

if (foo) {
    bar = 1;
} else {
    bar = 2;
}
```

## 规则细节

这个规则的目的是在声明过程中强制或消除变量的初始化。例如，在下面的代码中，`foo` 在声明时被初始化，而 `bar` 没有被初始化。

```js
var foo = 1;
var bar;

bar = 2;
```

这条规则的目的是使变量初始化和声明的一致性。

## 选项

此规则有两个选项：

1. 一个字符串，必须是 `"always"`（默认值），以便在声明时强制初始化，或者是 `"never"`，以便在声明时不允许初始化。这个规则适用于 `var`、`let` 和 `const` 变量，但是 `"never"` 在 `const` 变量中被忽略，因为未分配的 `const` 会产生一个解析错误。
2. 一个可以进一步控制该规则行为的对象。目前，唯一可用的参数是 `ignoreForLoopInit`，它表示当 `"never"` 被设置时，是否允许在 `for` 循环中声明初始化，因为这是一个非常典型的用例。

你可以对该规则进行如下配置：

变量必须在声明时初始化（默认）

```json
{
    "init-declarations": ["error", "always"],
}
```

变量不能在声明时初始化

```json
{
    "init-declarations": ["error", "never"]
}
```

变量不能在声明时初始化，除非在 for 循环中才允许初始化

```json
{
    "init-declarations": ["error", "never", { "ignoreForLoopInit": true }]
}
```

### always

使用默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint init-declarations: ["error", "always"]*/
/*eslint-env es6*/

function foo() {
    var bar;
    let baz;
}
```

:::

使用默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint init-declarations: ["error", "always"]*/
/*eslint-env es6*/

function foo() {
    var bar = 1;
    let baz = 2;
    const qux = 3;
}
```

:::

### never

使用 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint init-declarations: ["error", "never"]*/
/*eslint-env es6*/

function foo() {
    var bar = 1;
    let baz = 2;

    for (var i = 0; i < 1; i++) {}
}
```

:::

使用 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint init-declarations: ["error", "never"]*/
/*eslint-env es6*/

function foo() {
    var bar;
    let baz;
    const buzz = 1;
}
```

:::

`"never"` 选项忽略了`const`变量的初始化。

### ignoreForLoopInit

使用 `"never", { "ignoreForLoopInit": true }` 选项的**正确**示例：

::: correct

```js
/*eslint init-declarations: ["error", "never", { "ignoreForLoopInit": true }]*/
for (var i = 0; i < 1; i++) {}
```

:::

## 何时不用

当你对你的变量如何初始化无动于衷时。
