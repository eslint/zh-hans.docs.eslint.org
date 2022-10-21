---
title: no-caller
layout: doc
rule_type: suggestion
---

使用 `arguments.caller` 和 `arguments.callee` 会使一些代码无法优化。在未来的 JavaScript 版本中，它们已经被废弃，在 ECMAScript 5 中，可以使用严格模式下禁用它们。

```js
function foo() {
    var callee = arguments.callee;
}
```

## 规则细节

本规则旨在通过禁止使用 `arguments.caller` 和 `arguments.callee` 来阻止使用废弃的和次优的代码。因此，当使用 `arguments.caller` 和 `arguments.callee` 时，它将发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-caller: "error"*/

function foo(n) {
    if (n <= 0) {
        return;
    }

    arguments.callee(n - 1);
}

[1,2,3,4,5].map(function(n) {
    return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-caller: "error"*/

function foo(n) {
    if (n <= 0) {
        return;
    }

    foo(n - 1);
}

[1,2,3,4,5].map(function factorial(n) {
    return !(n > 1) ? 1 : factorial(n - 1) * n;
});
```

:::
