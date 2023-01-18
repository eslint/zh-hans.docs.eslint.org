---
title: no-duplicate-imports
rule_type: problem
---

每个模块使用一个 `import` 语句会使代码更清晰，因为你可以在一行中看到从该模块导入的所有内容。

在下面的例子中，第 1 行的 `module` 导入在第 3 行重复。可以把它们合在一起，使导入的列表更简洁。

```js
import { merge } from 'module';
import something from 'another-module';
import { find } from 'module';
```

## 规则细节

这条规则要求所有可以合并的单个模块的导入都在于一个 `import` 语句中。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-duplicate-imports: "error"*/

import { merge } from 'module';
import something from 'another-module';
import { find } from 'module';
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-duplicate-imports: "error"*/

import { merge, find } from 'module';
import something from 'another-module';
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-duplicate-imports: "error"*/

// not mergeable
import { merge } from 'module';
import * as something from 'module';
```

:::

## 选项

这条规则有一个可选参数和一个只有一个键的对象，`includeExports` 值为 `boolean`，默认值是 `false`。

如果从一个导入的模块重新导出，你应该在 `import` 语句中添加导入，并直接导出，而不是使用 `export ... from`。

使用此规则与 `{ "includeExports": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-duplicate-imports: ["error", { "includeExports": true }]*/

import { merge } from 'module';

export { find } from 'module';
```

:::

使用此规则与 `{ "includeExports": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-duplicate-imports: ["error", { "includeExports": true }]*/

import { merge, find } from 'module';

export { find };
```

:::

使用此规则与 `{ "includeExports": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-duplicate-imports: ["error", { "includeExports": true }]*/

import { merge, find } from 'module';

// cannot be merged with the above import
export * as something from 'module';

// cannot be written differently
export * from 'module';
```

:::
