---
title: no-redeclare
rule_type: suggestion
handled_by_typescript: true
extra_typescript_info: 注意尽管 TypeScript 会捕获 `let` 和 `const` 的重新声明，但不会捕获 `var` 的重新声明。因此，如果你在 TypeScript 代码库中使用传统的 `var` 关键字，这个规则仍然会提供一些价值。
related_rules:
- no-shadow
---

在 JavaScript 中，有可能使用 `var` 重新声明相同的变量名。这可能会导致混淆，不知道变量到底是在哪里声明和初始化的。

## 规则细节

这条规则的目的是消除在同一范围内有多个声明的变量。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-redeclare: "error"*/

var a = 3;
var a = 10;

class C {
    foo() {
        var b = 3;
        var b = 10;
    }

    static {
        var c = 3;
        var c = 10;
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-redeclare: "error"*/

var a = 3;
a = 10;

class C {
    foo() {
        var b = 3;
        b = 10;
    }

    static {
        var c = 3;
        c = 10;
    }
}

```

:::

## 选项

这条规则有一个可选的参数，一个带有布尔属性 `"builtinGlobals"` 的对象。它的默认值是 `true`。
如果设置为 `true`，该规则也会检查对内置球的重新声明，例如 `Object`、`Array`、`Number`...

### builtinGlobals

`"builtinGlobals"` 选项将检查全局范围内的内置球状物的重新声明。

使用 `{ "builtinGlobals": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-redeclare: ["error", { "builtinGlobals": true }]*/

var Object = 0;
```

:::

使用 `{ "builtinGlobals": true }` 选项和 `browser` 环境的**错误**示例：

::: incorrect

```js
/*eslint no-redeclare: ["error", { "builtinGlobals": true }]*/
/*eslint-env browser*/

var top = 0;
```

:::

`browser` 环境有许多内置的全局变量（例如：`top`）。一些内置的全局变量不能被重新声明。

注意，当使用 `node` 或 `commonjs` 环境（或 `ecmaFeatures.globalReturn`，如果使用默认解析器）时，程序的顶部范围实际上不是全局范围，而是“模块”范围。在这种情况下，声明一个以内置全局命名的变量并不是重新声明，而是对全局变量进行影射。在这种情况下，应该使用 [`no-shadow`](no-shadow) 规则和 `"builtinGlobals"` 选项。
