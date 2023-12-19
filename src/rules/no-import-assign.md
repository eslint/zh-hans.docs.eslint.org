---
title: no-import-assign
rule_type: problem
---

ES 模块对导入的绑定的更新会导致运行时错误。

## 规则细节

这条规则对导入的绑定的分配、增量和减量发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-import-assign: "error"*/

import mod, { named } from "./mod.mjs"
import * as mod_ns from "./mod.mjs"

mod = 1          // ERROR: 'mod' is readonly.
named = 2        // ERROR: 'named' is readonly.
mod_ns.named = 3 // ERROR: The members of 'mod_ns' are readonly.
mod_ns = {}   // ERROR: 'mod_ns' is readonly.
// Can't extend 'mod_ns'
Object.assign(mod_ns, { foo: "foo" }) // ERROR: The members of 'mod_ns' are readonly.
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-import-assign: "error"*/

import mod, { named } from "./mod.mjs"
import * as mod_ns from "./mod.mjs"

mod.prop = 1
named.prop = 2
mod_ns.named.prop = 3

// Known Limitation
function test(obj) {
    obj.named = 4 // Not errored because 'obj' is not namespace objects.
}
test(mod_ns) // Not errored because it doesn't know that 'test' updates the member of the argument.
```

:::

## 何时不用

如果你不希望被通知修改导入的绑定，你可以禁用这个规则。
