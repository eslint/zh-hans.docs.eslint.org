---
title: no-invalid-regexp
rule_type: problem
further_reading:
- https://es5.github.io/#x7.8.5
---

正则表达式字面中的无效模式在解析代码时是一个 `SyntaxError`，但 `RegExp` 构造函数中的无效字符串只在执行代码时抛出一个 `SyntaxError`。

## 规则细节

这条规则不允许在 `RegExp` 构造函数中使用无效的正则表达式字符串。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-invalid-regexp: "error"*/

RegExp('[')

RegExp('.', 'z')

new RegExp('\\')
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-invalid-regexp: "error"*/

RegExp('.')

new RegExp

this.RegExp('[')
```

:::

请注意，该规则根据最新的 ECMAScript 规范验证正则表达式，与你的解析器设置无关。

如果你想出于任何原因允许额外的构造函数标志，你可以使用 `allowConstructorFlags` 选项指定它们。然后，这些标志将被规则忽略。

## 选项

这条规则有一个例外情况的对象选项；

* `"allowConstructorFlags"` 是保护标志的一个数组

### allowConstructorFlags

使用此规则与 `{ "allowConstructorFlags": ["a", "z"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-invalid-regexp: ["error", { "allowConstructorFlags": ["a", "z"] }]*/

new RegExp('.', 'a')

new RegExp('.', 'az')
```

:::
