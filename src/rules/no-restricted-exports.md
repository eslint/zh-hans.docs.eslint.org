---
title: no-restricted-exports
rule_type: suggestion
---

在一个项目中，由于各种原因，某些命名可能不允许用作导出命名。

## 规则细节

这条规则不允许指定的命名被用作出口的名称。

## 选项

默认情况下，这个规则不禁止任何命名。只有在配置中指定的命名才会被禁止。

此规则选项为对象：

* `"restrictedNamedExports"` 是一个字符串数组，每个字符串是一个要限制的名称。
* `"restrictDefaultExports"` 是一个带有用于限制某些默认导出声明的布尔值属性的对象选项。此选项仅在 `restrictedNamedExports` 选项不包括 `"default"` 值时使用。可以使用下列属性：
    * `direct`：限制 `export default` 声明。
    * `named`：限制 `export { foo as default };` 声明。
    * `defaultFrom`：限制 `export { default } from 'foo';` 声明。
    * `namedFrom`: 限制 `export { foo as default } from 'foo';` 声明。
    * `namespaceFrom`: 限制 `export * as default from 'foo';` 声明。

### restrictedNamedExports

使用 `"restrictedNamedExports"` 选项的**错误**示例：

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

使用 `"restrictedNamedExports"` 选项的**正确**示例：

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

#### 默认导出

根据设计，`"restrictedNamedExports"` 选项并不禁止 `export default` 声明。如果你将 `"default"` 配置为限制性名称，该限制将仅适用于命名的导出声明。

使用 `"restrictedNamedExports": ["default"]` 选项的额外**错误**示例：

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

使用 `"restrictedNamedExports": ["default"]` 选项的额外**正确**示例：

::: correct

```js
/*eslint no-restricted-exports: ["error", { "restrictedNamedExports": ["default", "foo"] }]*/

export default function foo() {}
```

:::

### restrictDefaultExports

此选项允许限制某些 `default` 声明。此规则仅在 `restrictedNamedExports` 选项不包括 `default` 值时可用。此选项接受下列属性：

#### direct

使用 `"restrictDefaultExports": { "direct": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "direct": true } }]*/
export default foo;
export default 42;
export default function foo() {}
```

:::

#### named

使用 `"restrictDefaultExports": { "named": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "named": true } }]*/
const foo = 123;
export { foo as default };
```

:::

#### defaultFrom

使用 `"restrictDefaultExports": { "defaultFrom": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "defaultFrom": true } }]*/
export { default } from 'foo';
export { default as default } from 'foo';
```

:::

#### namedFrom

使用 `"restrictDefaultExports": { "namedFrom": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "namedFrom": true } }]*/
export { foo as default } from 'foo';
```

:::

#### namespaceFrom

使用 `"restrictDefaultExports": { "namespaceFrom": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "namespaceFrom": true } }]*/
export * as default from 'foo';
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
