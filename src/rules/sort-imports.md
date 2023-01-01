---
title: sort-imports
rule_type: suggestion
related_rules:
- sort-keys
- sort-vars
---

import 语句用于导入从外部模块导出的成员（函数、对象或原始类型）。使用一个特定的成员语法。

```js
// single - Import single member.
import myMember from "my-module.js";
import {myOtherMember} from "my-other-module.js";

// multiple - Import multiple members.
import {foo, bar} from "my-module.js";

// all - Import all members, where myModule contains all the exported bindings.
import * as myModule from "my-module.js";
```

import 语句也可以导入一个没有导出绑定的模块。当模块不输出任何东西，但运行它自己的代码或改变全局上下文对象时使用。

```js
// none - Import module without exported bindings.
import "my-module.js"
```

当声明多个导入时，对导入声明进行分类排序可以使开发者更容易阅读代码，并在以后找到必要的导入。这条规则纯粹是一个风格问题。

## 规则细节

这个规则检查所有的导入声明，并验证所有的导入首先按照使用的成员语法排序，然后按照第一个成员或别名的字母顺序排序。

命令行中的 `--fix` 选项会自动修复本规则报告的一些问题：单行的多个成员会被自动排序（例如，`import { b, a } from 'foo.js'` 被修正为 `import { a, b } from 'foo.js'`），但多行不会被重新排序。

## 选项

该规则接受一个对象，其属性为：

* `ignoreCase`（默认为 `false`)
* `ignoreDeclarationSort`（默认为 `false`)
* `ignoreMemberSort`（默认为 `false`)
* `memberSyntaxSortOrder`（默认为 `["none", "all", "multiple", "single"]`）; 所有 4 项必须出现在数组中，但你可以改变顺序。
    * `none` = 导入没有导出绑定的模块。
    * `all` = 导入由出口绑定提供的所有成员。
    * `multiple` = 导入多个成员。
    * `single` = 导入单个成员。
* `allowSeparatedGroups`（默认为 `false`)

默认的选项设置：

```json
{
    "sort-imports": ["error", {
        "ignoreCase": false,
        "ignoreDeclarationSort": false,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
        "allowSeparatedGroups": false
    }]
}
```

## 示例

### Default settings

使用此规则与默认选项的**正确**示例：
::: correct

```js
/*eslint sort-imports: "error"*/
import 'module-without-export.js';
import * as bar from 'bar.js';
import * as foo from 'foo.js';
import {alpha, beta} from 'alpha.js';
import {delta, gamma} from 'delta.js';
import a from 'baz.js';
import {b} from 'qux.js';

/*eslint sort-imports: "error"*/
import a from 'foo.js';
import b from 'bar.js';
import c from 'baz.js';

/*eslint sort-imports: "error"*/
import 'foo.js'
import * as bar from 'bar.js';
import {a, b} from 'baz.js';
import c from 'qux.js';
import {d} from 'quux.js';

/*eslint sort-imports: "error"*/
import {a, b, c} from 'foo.js'
```

:::

使用此规则与默认选项的**错误**示例：

::: incorrect

```js
/*eslint sort-imports: "error"*/
import b from 'foo.js';
import a from 'bar.js';

/*eslint sort-imports: "error"*/
import a from 'foo.js';
import A from 'bar.js';

/*eslint sort-imports: "error"*/
import {b, c} from 'foo.js';
import {a, b} from 'bar.js';

/*eslint sort-imports: "error"*/
import a from 'foo.js';
import {b, c} from 'bar.js';

/*eslint sort-imports: "error"*/
import {a} from 'foo.js';
import {b, c} from 'bar.js';

/*eslint sort-imports: "error"*/
import a from 'foo.js';
import * as b from 'bar.js';

/*eslint sort-imports: "error"*/
import {b, a, c} from 'foo.js'
```

:::

### `ignoreCase`

当设置成 `true` 时，该规则灰忽略导入的本地名称的大小写敏感性。

使用此规则与 `{ "ignoreCase": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint sort-imports: ["error", { "ignoreCase": true }]*/

import B from 'foo.js';
import a from 'bar.js';
```

:::

使用此规则与 `{ "ignoreCase": true }` 选项的**正确**示例：

::: correct

```js
/*eslint sort-imports: ["error", { "ignoreCase": true }]*/

import a from 'foo.js';
import B from 'bar.js';
import c from 'baz.js';
```

:::

Default is `false`.

### `ignoreDeclarationSort`

忽略导入声明语句的排序。

使用此规则与默认的 `{ "ignoreDeclarationSort": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint sort-imports: ["error", { "ignoreDeclarationSort": false }]*/
import b from 'foo.js'
import a from 'bar.js'
```

:::

使用此规则与 `{ "ignoreDeclarationSort": true }` 选项的**正确**示例：

::: correct

```js
/*eslint sort-imports: ["error", { "ignoreDeclarationSort": true }]*/
import a from 'foo.js'
import b from 'bar.js'
```

:::

::: correct

```js
/*eslint sort-imports: ["error", { "ignoreDeclarationSort": true }]*/
import b from 'foo.js'
import a from 'bar.js'
```

:::

Default is `false`.

### `ignoreMemberSort`

忽略 `multiple` 成员导入声明中的成员排序。

使用此规则与默认的 `{ "ignoreMemberSort": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint sort-imports: ["error", { "ignoreMemberSort": false }]*/
import {b, a, c} from 'foo.js'
```

:::

使用此规则与 `{ "ignoreMemberSort": true }` 选项的**正确**示例：

::: correct

```js
/*eslint sort-imports: ["error", { "ignoreMemberSort": true }]*/
import {b, a, c} from 'foo.js'
```

:::

Default is `false`.

### `memberSyntaxSortOrder`

有四种不同的风格，默认的成员语法排序顺序是。

* `none` - 导入没有导出绑定的模块。
* `all` - 导入由导出的绑定提供的所有成员。
* `multiple` - 导入多个成员。
* `single` - 导入单个成员。

所有四个选项都必须在数组中指定，但你可以自定义它们的顺序。

使用此规则与默认的 `{ "memberSyntaxSortOrder": ["none", "all", "multiple", "single"] }` 选项的**错误**示例：

::: incorrect

```js
/*eslint sort-imports: "error"*/
import a from 'foo.js';
import * as b from 'bar.js';
```

:::

使用此规则与 `{ "memberSyntaxSortOrder": ['single', 'all', 'multiple', 'none'] }` 选项的**正确**示例：

::: correct

```js
/*eslint sort-imports: ["error", { "memberSyntaxSortOrder": ['single', 'all', 'multiple', 'none'] }]*/

import a from 'foo.js';
import * as b from 'bar.js';
```

:::

使用此规则与 `{ "memberSyntaxSortOrder": ['all', 'single', 'multiple', 'none'] }` 选项的**正确**示例：

::: correct

```js
/*eslint sort-imports: ["error", { "memberSyntaxSortOrder": ['all', 'single', 'multiple', 'none'] }]*/

import * as foo from 'foo.js';
import z from 'zoo.js';
import {a, b} from 'foo.js';
```

:::

Default is `["none", "all", "multiple", "single"]`.

### `allowSeparatedGroups`

当设置为 `true` 时，该规则只检查那些出现在连续行中的导入声明语句的排序情况。

换句话说，在导入声明语句之后的空行、注释行或带有任何其他语句的行，将重置导入声明语句的排序。

使用此规则与 `{ "allowSeparatedGroups": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint sort-imports: ["error", { "allowSeparatedGroups": true }]*/

import b from 'foo.js';
import c from 'bar.js';
import a from 'baz.js';
```

:::

使用此规则与 `{ "allowSeparatedGroups": true }` 选项的**正确**示例：

::: correct

```js
/*eslint sort-imports: ["error", { "allowSeparatedGroups": true }]*/

import b from 'foo.js';
import c from 'bar.js';

import a from 'baz.js';
```

:::

::: correct

```js
/*eslint sort-imports: ["error", { "allowSeparatedGroups": true }]*/

import b from 'foo.js';
import c from 'bar.js';
// comment
import a from 'baz.js';
```

:::

::: correct

```js
/*eslint sort-imports: ["error", { "allowSeparatedGroups": true }]*/

import b from 'foo.js';
import c from 'bar.js';
quux();
import a from 'baz.js';
```

:::

Default is `false`.

## 何时不用

这条规则是一种格式化的偏好，不遵循它不会对你的代码质量产生负面影响。如果按字母顺序排列导入不是你的编码标准的一部分，那么你可以不遵守这个规则。
