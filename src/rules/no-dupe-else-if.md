---
title: no-dupe-else-if
layout: doc
rule_type: problem
related_rules:
- no-duplicate-case
- no-lonely-if
---

当需要根据某些条件在几个可能的分支中只执行一个分支（或最多一个分支）时，通常使用 `if-else-if` 链。

```js
if (a) {
    foo();
} else if (b) {
    bar();
} else if (c) {
    baz();
}
```

同一链中的两个相同的测试条件几乎总是代码中的一个错误。除非表达式中存在副作用，否则重复的表达式将评估为与链中早期的相同表达式相同的 `true` 或 `false` 值，这意味着其分支永远无法执行。

```js
if (a) {
    foo();
} else if (b) {
    bar();
} else if (b) {
    baz();
}
```

在上面的例子中，永远不可能执行 `baz()`。显然 `baz()` 只有在 `b` 值为 `true` 时才能执行，但在这种情况下会执行 `bar()`，因为它出现在链中更早的位置。

## 规则细节

这条规则不允许在同一个 `if-else-if` 链中出现重复的条件。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-dupe-else-if: "error"*/

if (isSomething(x)) {
    foo();
} else if (isSomething(x)) {
    bar();
}

if (a) {
    foo();
} else if (b) {
    bar();
} else if (c && d) {
    baz();
} else if (c && d) {
    quux();
} else {
    quuux();
}

if (n === 1) {
    foo();
} else if (n === 2) {
    bar();
} else if (n === 3) {
    baz();
} else if (n === 2) {
    quux();
} else if (n === 5) {
    quuux();
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-dupe-else-if: "error"*/

if (isSomething(x)) {
    foo();
} else if (isSomethingElse(x)) {
    bar();
}

if (a) {
    foo();
} else if (b) {
    bar();
} else if (c && d) {
    baz();
} else if (c && e) {
    quux();
} else {
    quuux();
}

if (n === 1) {
    foo();
} else if (n === 2) {
    bar();
} else if (n === 3) {
    baz();
} else if (n === 4) {
    quux();
} else if (n === 5) {
    quuux();
}
```

:::

这条规则还可以检测到一些情况，即条件不一致，但由于 `||` 和 `&&` 运算符的逻辑，分支永远无法执行。

使用此规则的额外**错误**示例：

::: incorrect

```js
/*eslint no-dupe-else-if: "error"*/

if (a || b) {
    foo();
} else if (a) {
    bar();
}

if (a) {
    foo();
} else if (b) {
    bar();
} else if (a || b) {
    baz();
}

if (a) {
    foo();
} else if (a && b) {
    bar();
}

if (a && b) {
    foo();
} else if (a && b && c) {
    bar();
}

if (a || b) {
    foo();
} else if (b && c) {
    bar();
}

if (a) {
    foo();
} else if (b && c) {
    bar();
} else if (d && (c && e && b || a)) {
    baz();
}
```

:::

请注意，这条规则不比较链上的条件和语句中的条件，在以下情况下不会发出警告。

```js
if (a) {
    if (a) {
        foo();
    }
}

if (a) {
    foo();
} else {
    if (a) {
        bar();
    }
}
```

## 何时不用

在极少数情况下，你确实需要在同一链中有相同的测试条件，这必然意味着链中的表达式会引起和依赖副作用，你将不得不关闭这一规则。
