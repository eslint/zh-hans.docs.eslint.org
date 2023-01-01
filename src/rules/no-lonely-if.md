---
title: no-lonely-if
rule_type: suggestion
---

如果 `if` 语句是 `else` 块中唯一的语句，使用 `else if` 形式往往更清楚。

```js
if (foo) {
    // ...
} else {
    if (bar) {
        // ...
    }
}
```

应改写为

```js
if (foo) {
    // ...
} else if (bar) {
    // ...
}
```

## 规则细节

使用此规则禁用 `if` 语句。作为 `else` 块的唯一语句。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-lonely-if: "error"*/

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
}

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    } else {
        // ...
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-lonely-if: "error"*/

if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
}

if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
} else {
    // ...
}

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
    doSomething();
}
```

:::

## 何时不用

如果不需要 `else if` 的形式，代码会更清晰，则禁用此规则。
