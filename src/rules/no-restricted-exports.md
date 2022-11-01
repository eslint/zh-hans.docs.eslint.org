---
title: no-restricted-exports
layout: doc
rule_type: suggestion
---

在一个项目中，由于各种原因，某些名称可能不允许作为导出的名称使用。

## 规则细节

这条规则不允许指定的名称被用作出口的名称。

## 选项

默认情况下，这个规则不禁止任何名字。只有你在配置中指定的名字才会被禁止。

此规则选项为对象：

* `"restrictedNamedExports"` 是一个字符串数组，每个字符串是一个要限制的名称。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", {
    "restrictedNamedExports": ["foo", "bar", "Baz", "a", "b", "c", "d", "e", "👍"]
}]*/

export const foo = 1;

export function bar() {}

export class Baz {}

const a = {};
export { a };

function someFunction() {}
export { someFunction as b };

export { c } from "some_module";

export { "d" } from "some_module";

export { something as e } from "some_module";

export { "👍" } from "some_module";
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-restricted-exports: ["error", {
    "restrictedNamedExports": ["foo", "bar", "Baz", "a", "b", "c", "d", "e", "👍"]
}]*/

export const quux = 1;

export function myFunction() {}

export class MyClass {}

const a = {};
export { a as myObject };

function someFunction() {}
export { someFunction };

export { c as someName } from "some_module";

export { "d" as " d " } from "some_module";

export { something } from "some_module";

export { "👍" as thumbsUp } from "some_module";
```

:::

### Default exports

根据设计，这条规则并不禁止 `export default` 声明。如果你将 `"default"` 配置为限制性名称，该限制将仅适用于命名的导出声明。

使用此规则的额外**正确**示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictedNamedExports": ["default"] }]*/

function foo() {}

export { foo as default };
```

:::

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictedNamedExports": ["default"] }]*/

export { default } from "some_module";
```

:::

使用此规则的额外**正确**示例：

::: correct

```js
/*eslint no-restricted-exports: ["error", { "restrictedNamedExports": ["default", "foo"] }]*/

export default function foo() {}
```

:::

## 已知限制

这条规则并不检查再出口声明中的源模块内容。特别是，如果你从另一个模块的导出中重新导出所有内容，该导出可能包括一个受限的名称。本规则无法检测到这种情况。

```js

//----- some_module.js -----
export function foo() {}

//----- my_module.js -----
/*eslint no-restricted-exports: ["error", { "restrictedNamedExports": ["foo"] }]*/

export * from "some_module"; // allowed, although this declaration exports "foo" from my_module
```
