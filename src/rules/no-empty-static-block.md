---
title: no-empty-static-block
layout: doc
rule_type: suggestion
related_rules:
- no-empty
- no-empty-function
further_reading:
- https://github.com/tc39/proposal-class-static-block
---

虽然在技术上讲空的静态块并不是问题，但这通常是由于未完成的重构而导致的。它们会使阅读代码时引起混乱。

## 规则细节

此规则将禁止使用空静态块，但会忽略包含注释的静态块的情况。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-empty-static-block: "error"*/

class Foo {
    static {}
}
```

:::

使用此规则的**正确**示例：

:::correct

```js
/*eslint no-empty-static-block: "error"*/

class Foo {
    static {
        bar();
    }
}

class Foo {
    static {
        // comment
    }
}
```

:::

## 何时不用

此规则不应该在 ES2022 前的环境中使用。
