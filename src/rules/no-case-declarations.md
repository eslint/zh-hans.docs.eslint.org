---
title: no-case-declarations
rule_type: suggestion
related_rules:
- no-fallthrough
---

这条规则不允许在 `case`/`default` 子句中进行 lexical 声明（`let`、`const`、`function` 和 `class`）。因为 lexical 声明在整个开关块中是可见的。但只有在被分配时才会被初始化，而这只有在达到它被定义的情况下才会发生。

为了确保词法声明只适用于当前的 case 子句，应将你的子句包裹在块中。

## 规则细节

这条规则的目的是防止访问未初始化的词性绑定，以及访问跨例句的悬挂函数。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-case-declarations: "error"*/
/*eslint-env es6*/

switch (foo) {
    case 1:
        let x = 1;
        break;
    case 2:
        const y = 2;
        break;
    case 3:
        function f() {}
        break;
    default:
        class C {}
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-case-declarations: "error"*/
/*eslint-env es6*/

// Declarations outside switch-statements are valid
const a = 0;

switch (foo) {
    // The following case clauses are wrapped into blocks using brackets
    case 1: {
        let x = 1;
        break;
    }
    case 2: {
        const y = 2;
        break;
    }
    case 3: {
        function f() {}
        break;
    }
    case 4:
        // Declarations using var without brackets are valid due to function-scope hoisting
        var z = 4;
        break;
    default: {
        class C {}
    }
}
```

:::

## 何时不用

如果你依赖跌落行为，并希望访问案例块中引入的绑定。
