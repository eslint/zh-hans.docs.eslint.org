---
title: space-before-keywords

related_rules:
- space-after-keywords
- block-spacing
- space-return-throw-case
- space-unary-ops
- space-infix-ops
---

强化关键词前的一致间距。

（已移除）此规则在 ESLint v2.0 中移除并被 [keyword-spacing](keyword-spacing) 所取代。

（可修复）`--fix` 选项在[命令行](../user-guide/command-line-interface#--fix)上自动修复该规则报告的问题。

关键词是 JavaScript 的语法元素，如 `function` 和 `if`。这些标识符对语言有特殊的意义，所以在代码编辑器中经常以不同的颜色出现。作为语言的一个重要部分，风格指南经常提到关键词周围应该使用的间距。例如，你可能有一个风格指南，说关键词前面应该总是有空格，这意味着 `if-else` 语句必须看起来像这样。

```js
if (foo) {
    // ...
} else {
    // ...
}
```

当然，你也可以有一个风格指南，不允许在关键词前有空格。

## 规则细节

这条规则将强制执行关键字前的间距的一致性。

`if`、`else`、`for`、`while`、`do`、`switch`、`throw`、`try`、`catch`、`finally`、`with`、`break`、`continue`、`return`、`function`、`yield`、`class`、变量声明（`let`、`const`、`var`）和标签语句。

这个规则需要一个参数：`"always"` 或 `"never"`。如果是 `"always"`，那么关键字前面必须至少有一个空格。如果 `"never"`，那么在关键字 `else`、`while`（do...while）、`finally` 和 `catch` 前不允许有空格。默认值是 `"always"`。

这个规则允许关键词前面有一个大括号（`{`）。如果你想改变
这个行为，请考虑使用 [block-spacing](block-spacing) 规则。

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-before-keywords: ["error", "always"]*/
/*eslint-env es6*/

if (foo) {
    // ...
}else {}

const foo = 'bar';let baz = 'qux';

var foo =function bar () {}

function bar() {
    if (foo) {return; }
}
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint space-before-keywords: ["error", "always"]*/
/*eslint-env es6*/

if (foo) {
    // ...
} else {}

(function() {})()

<Foo onClick={function bar() {}} />

for (let foo of ['bar', 'baz', 'qux']) {}
```

:::

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-before-keywords: ["error", "never"]*/

if (foo) {
    // ...
} else {}

do {

}
while (foo)

try {} finally {}

try {} catch(e) {}
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint space-before-keywords: ["error", "never"]*/

if (foo) {
    // ...
}else {}

do {}while (foo)

try {}finally {}

try{}catch(e) {}
```

:::

## 何时不用

如果你不希望在关键词间距上执行一致性。
