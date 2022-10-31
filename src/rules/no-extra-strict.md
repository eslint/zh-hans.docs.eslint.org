---
title: no-extra-strict
layout: doc

further_reading:
- https://es5.github.io/#C
---

Disallows strict mode directives when already in strict mode.

（已移除）此规则在 ESLint v1.0 中移除并被 [strict](strict) 规则。新规则中的 `"global"` 或 `"function"` 选项类似于被移除的所取代。

`"use strict";` 指令适用于它出现的作用域和包含在该作用域中的所有内部作用域。因此，在这些内部作用域中使用 `"use strict";` 指令是不必要的。

```js
"use strict";

(function () {
    "use strict";
    var foo = true;
}());
```

## 规则细节

这条规则的目的是防止不必要的 `"use strict";` 指令。因此，当它遇到已经处于严格模式的 `"use strict";` 指令时，会发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
"use strict";

(function () {
    "use strict";
    var foo = true;
}());
```

:::

使用此规则的**正确**示例：

::: correct

```js
"use strict";

(function () {
    var foo = true;
}());
```

:::

::: correct

```js
(function () {
    "use strict";
    var foo = true;
}());
```

:::
