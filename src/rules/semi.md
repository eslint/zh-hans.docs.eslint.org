---
title: semi
layout: doc
rule_type: layout
related_rules:
- no-extra-semi
- no-unexpected-multiline
- semi-spacing
further_reading:
- https://blog.izs.me/2010/12/an-open-letter-to-javascript-leaders-regarding/
- https://web.archive.org/web/20200420230322/http://inimino.org/~inimino/blog/javascript_semicolons
---

JavaScript 并不要求在每个语句的结尾处都有分号。在许多情况下，JavaScript 引擎可以确定分号应该在某个位置，并会自动添加分号。这个功能被称为**自动分号插入（ASI）**，被认为是 JavaScript 中比较有争议的功能之一。例如，下面这几行都是有效的。

```js
var name = "ESLint"
var website = "eslint.org";
```

在第一行，JavaScript 引擎会自动插入一个分号，所以这不被认为是一个语法错误。JavaScript 引擎仍然知道如何解释这一行，知道行尾表示语句的结束。

在关于 ASI 的辩论中，一般有两派观点。第一派认为，我们应该把 ASI 当作不存在的东西来对待，并且总是手动加入分号。其理由是，总是包括分号比试图记住什么时候需要或不需要分号更容易，从而减少了引入错误的可能性。

然而，ASI 机制有时会让使用分号的人感到棘手。例如，思考这段代码：

```js
return
{
    name: "ESLint"
};
```

这看起来像一个返回对象字面的 `return` 语句，然而，JavaScript 引擎会将这段代码解释为：

```js
return;
{
    name: "ESLint";
}
```

实际上，在 `return` 语句后面插入了一个分号，导致它下面的代码（一个块内的标记字词）无法到达。这个规则和 [no-unreachable](no-unreachable) 规则将保护你的代码不受这种情况的影响。

在争论的另一方，有人说由于分号是自动插入的，所以它们是有选项的，不需要手动插入。然而，对于不使用分号的人来说，ASI 机制也会很棘手。例如，考虑这个代码：

```js
var globalCounter = { }

(function () {
    var n = 0
    globalCounter.increment = function () {
        return ++n
    }
})()
```

在这个例子中，分号将不会在第一行后插入，导致运行时错误（因为一个空对象被当作一个函数来调用）。[no-unexpected-multiline](no-unexpected-multiline) 规则可以保护你的代码不出现这种情况。

尽管 ASI 允许你对你的编码风格有更多的自由，但它也会使你的代码以一种意外的方式表现出来，无论你是否使用分号。因此，最好是知道 ASI 何时发生，何时不发生，并让 ESLint 保护你的代码不受这些潜在的意外情况影响。简而言之，正如 Isaac Schlueter 曾经描述的那样，一个`n'字符总是结束一个语句（就像分号一样），除非以下情况之一是真的。

1. 语句中有一个未封闭的帕伦、数组字头或对象字头，或者以其他一些不适合结束语句的方式结束（例如，以 `.` 或 `,` 结束）
1. 该行是 `--` 或`++`（在这种情况下，它将递减/增加下一个标记）
1. 它是 `for()`, `while()`, `do`, `if()` 或 `else`, 并且没有 `{`
1. 下一行以 `[`, `(`, `+`, `*`, `/`, `-`, `,`, `.` 或其他一些只能在一个表达式的两个标记之间找到的二进制运算符开始

## 规则细节

这条规则执行了分号的一致使用。

## 选项

这个规则有两个选项，一个字符串选项和一个对象选项。

字符串选项：

* `"always"`（默认值）要求在语句的结尾处使用分号。
* `"never"` 不允许将分号作为语句的结尾（除非用于区分以 `[`, `(`, `/`, `+` 或 `-` 开头的语句）。

对象选项（`"always"`时 ）：

* `"omitLastInOneLineBlock": true` 忽略一个块中的最后一个分号，因为它的大括号（以及该块的内容）都在同一行中。

对象选项（`"never"` 时）：

* `"beforeStatementContinuationChars": "any"`（默认值） `[`, `(`, `/`, `+` 或 `-`开头，则忽略语句末尾的分号（或缺少分号）。
* `"beforeStatementContinuationChars": "always"`如果下一行以 `[`, `(`, `/`, `+` 或 `-`开头，则要求在语句的末尾加上分号。
* `"beforeStatementContinuationChars": "never"`不允许将分号作为语句的结尾，如果它不会造成 ASI 危险，即使下一行以 `[`, `(`, `/`, `+` 或 `-`开头。

**注意**：`beforeStatementContinuationChars`不适用于类域，因为类域不是语句。

### always

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint semi: ["error", "always"]*/

var name = "ESLint"

object.method = function() {
    // ...
}

class Foo {
    bar = 1
}
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint semi: "error"*/

var name = "ESLint";

object.method = function() {
    // ...
};

class Foo {
    bar = 1;
}
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint semi: ["error", "never"]*/

var name = "ESLint";

object.method = function() {
    // ...
};

class Foo {
    bar = 1;
}
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint semi: ["error", "never"]*/

var name = "ESLint"

object.method = function() {
    // ...
}

var name = "ESLint"

;(function() {
    // ...
})()

import a from "a"
(function() {
    // ...
})()

import b from "b"
;(function() {
    // ...
})()

class Foo {
    bar = 1
}
```

:::

#### omitLastInOneLineBlock

使用此规则与 `"always", { "omitLastInOneLineBlock": true }` 选项的额外**正确**示例：

::: correct

```js
/*eslint semi: ["error", "always", { "omitLastInOneLineBlock": true}] */

if (foo) { bar() }

if (foo) { bar(); baz() }

function f() { bar(); baz() }

class C {
    foo() { bar(); baz() }

    static { bar(); baz() }
}
```

:::

#### beforeStatementContinuationChars

使用此规则与 `"never", { "beforeStatementContinuationChars": "always" }` 选项的额外**错误**示例：

::: incorrect

```js
/*eslint semi: ["error", "never", { "beforeStatementContinuationChars": "always"}] */
import a from "a"

(function() {
    // ...
})()
```

:::

使用此规则与 `"never", { "beforeStatementContinuationChars": "never" }` 选项的额外**错误**示例：

::: incorrect

```js
/*eslint semi: ["error", "never", { "beforeStatementContinuationChars": "never"}] */
import a from "a"

;(function() {
    // ...
})()
```

:::

## 何时不用

如果你不想以任何特定的方式强制执行分号的使用（或省略），那么你可以关闭这个规则。
