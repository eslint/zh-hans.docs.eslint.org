---
title: no-useless-rename
layout: doc
rule_type: suggestion
related_rules:
- object-shorthand
---

ES2015 允许在导入和导出语句中重命名引用，以及重构赋值。这给了程序员一个简洁的语法来执行这些操作，同时重命名这些引用。

```js
import { foo as bar } from "baz";
export { foo as bar };
let { foo: bar } = baz;
```

通过这种语法，有可能对同名的引用进行重命名。这是一个完全多余的操作，因为这和不重命名是一样的。例如这样：

```js
import { foo as foo } from "bar";
export { foo as foo };
let { foo: foo } = bar;
```

也可是这样：

```js
import { foo } from "bar";
export { foo };
let { foo } = bar;
```

## 规则细节

这条规则不允许将导入、导出和解构操作重命名为同一名称。

## 选项

这条规则允许对以下选项进行更细化的控制：

* `ignoreImport`：当设置为 `true` 时，该规则不检查倒入。
* `ignoreExport`：当设置为 `true` 时，该规则不检查导出。
* `ignoreDestructuring`：当设置为 `true` 时，该规则不检查解构操作。

默认情况下，所有选项都被设置为 `false`：

```json
"no-useless-rename": ["error", {
    "ignoreDestructuring": false,
    "ignoreImport": false,
    "ignoreExport": false
}]
```

默认情况下，使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-useless-rename: "error"*/

import { foo as foo } from "bar";
import { "foo" as foo } from "bar";
export { foo as foo };
export { foo as "foo" };
export { foo as foo } from "bar";
export { "foo" as "foo" } from "bar";
let { foo: foo } = bar;
let { 'foo': foo } = bar;
function foo({ bar: bar }) {}
({ foo: foo }) => {}
```

:::

默认情况下，使用此规则的**正确**示例：

::: correct

```js
/*eslint no-useless-rename: "error"*/

import * as foo from "foo";
import { foo } from "bar";
import { foo as bar } from "baz";
import { "foo" as bar } from "baz";

export { foo };
export { foo as bar };
export { foo as "bar" };
export { foo as bar } from "foo";
export { "foo" as "bar" } from "foo";

let { foo } = bar;
let { foo: bar } = baz;
let { [foo]: foo } = bar;

function foo({ bar }) {}
function foo({ bar: baz }) {}

({ foo }) => {}
({ foo: bar }) => {}
```

:::

使用此规则与 `{ ignoreImport: true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-useless-rename: ["error", { ignoreImport: true }]*/

import { foo as foo } from "bar";
```

:::

使用此规则与 `{ ignoreExport: true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-useless-rename: ["error", { ignoreExport: true }]*/

export { foo as foo };
export { foo as foo } from "bar";
```

:::

使用此规则与 `{ ignoreDestructuring: true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-useless-rename: ["error", { ignoreDestructuring: true }]*/

let { foo: foo } = bar;
function foo({ bar: bar }) {}
({ foo: foo }) => {}
```

:::

## 何时不用

如果你不关心多余的重命名导入、导出和解构任务，你可以安全地禁用这一规则。

## 兼容

* **JSCS**：[disallowIdenticalDestructuringNames](https://jscs-dev.github.io/rule/disallowIdenticalDestructuringNames)
