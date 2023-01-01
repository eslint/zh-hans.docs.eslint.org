---
title: eqeqeq
rule_type: suggestion
---

使用类型安全的相等运算符 `===` 和 `!===` 而不是它们的常规运算符 `==` 和 `!=` 被认为是好的做法。

原因是 `==` 和 `!=` 是按照相当晦涩的 [Abstract Equality Comparison Algorithm](https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3) 进行类型强制处理。
例如，下面的语句都被认为是 `true`：

* `[] == false`
* `[] == ![]`
* `3 == "03"`

如果其中一个出现在一个看似无害的语句中，如 `a == b`，实际问题就很难被发现。

## 规则细节

这条规则的目的是消除类型不安全的相等运算符。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint eqeqeq: "error"*/

if (x == 42) { }

if ("" == text) { }

if (obj.getStuff() != undefined) { }
```

:::

命令行中的 `--fix` 选项可以自动修复本规则报告的一些问题。只有当其中一个操作数是 `typeof` 表达式，或者两个操作数都是相同类型的文字时，问题才会被修复。

## 选项

### always

默认的 `"always"` 选项强制在任何情况下使用 `===` 和 `!==`（除非你选择了对 `null` 的更具体处理[见下文]）。

使用 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint eqeqeq: ["error", "always"]*/

a == b
foo == true
bananas != 1
value == undefined
typeof foo == 'undefined'
'hello' != 'world'
0 == 0
true == true
foo == null

```

:::

使用 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint eqeqeq: ["error", "always"]*/

a === b
foo === true
bananas !== 1
value === undefined
typeof foo === 'undefined'
'hello' !== 'world'
0 === 0
true === true
foo === null

```

:::

这个规则可以选择接受第二个参数，它应该是一个具有以下支持的属性的对象：

* `"null"`：自定义该规则如何处理 `null` 字样。可能的值。
    * `always`（默认值）- 总是使用 === 或 !==.
    * `never` - 绝不使用将 === 或 !== 与 `null` 一起使用。
    * `ignore` - `null` 不适用此规则。

### smart

`"smart"` 选项强制使用 `===` 和 `!==`，但这些情况除外：

* 比较两个字面值
* 评估 `typeof` 的值
* 与 `null` 进行比较

使用 `"smart"` 选项的**错误**示例：

::: incorrect

```js
/*eslint eqeqeq: ["error", "smart"]*/

// comparing two variables requires ===
a == b

// only one side is a literal
foo == true
bananas != 1

// comparing to undefined requires ===
value == undefined
```

:::

使用 `"smart"` 选项的**正确**示例：

::: correct

```js
/*eslint eqeqeq: ["error", "smart"]*/

typeof foo == 'undefined'
'hello' != 'world'
0 == 0
true == true
foo == null
```

:::

### allow-null

**废弃**：使用 `"always"` 代替这个选项，并传递一个 `"null"` 选项属性，值为 `"ignore"`。这将告诉 ESLint，除了与 `null` 字面量比较时，总是执行严格的相等判断。

```js
["error", "always", {"null": "ignore"}]
```

## 何时不用

如果你不想强制使用同一风格的相等运算符，你可以安全地禁用此规则。
