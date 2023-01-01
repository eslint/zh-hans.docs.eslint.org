---
title: global-strict

---

要求或不允许全局范围内的严格模式指令。

（已移除）此规则在 ESLint v1.0 中移除并被 [strict](strict) 规则。新规则中的 `"global"`选项与被移除的最相似。

严格模式是通过在你的代码中使用以下 pragma 来启用的：

```js
"use strict";
```

当全局使用时，如本例中，严格模式 pragma 适用于单个文件中的所有代码。如果你在向浏览器提供脚本之前将它们串联在一起，这可能是很危险的。例如，如果你有一个在严格模式下运行的文件，而你把这个文件和 jQuery 串联起来，那么严格模式现在也适用于 jQuery，并可能导致错误。

然而，如果你使用的是 Node.js，你可能想在全球范围内打开严格模式。在 Node.js 项目中，文件通常不会被串联在一起，因此，意外应用严格模式的风险是最小的。此外，由于 Node.js 中的每个文件都有自己的范围，全局严格模式只影响它所在的单个文件。

## 规则细节

这条规则要求或不允许在全局范围内由 `"use strict"` pragma 调用的全局严格模式。

以下模式在全局范围内处于严格模式下，使用 `"always"` 选项被认为是有效的，使用 `"never"` 选项则是警告。

```js
"use strict";

function foo() {
    return true;
}
```

以下模式仅适用于函数的严格模式，因此在 `"never"` 选项下有效，但在 `"always"` 选项下就有问题。

```js
function foo() {
    "use strict";

    return true;
}

(function() {
    "use strict";

    // other code
}());
```

## 选项

```json
"global-strict": ["error", "always"]
```

要求每个文件都有一个顶级的 `"use strict"` 语句。

```json
"global-strict": ["error", "never"]
```

当在全局范围内使用 `"use strict"` 时发出警告，因为它可能污染连接的文件。

## 何时不用

当一个项目可能同时使用非严格模式的代码和严格模式的代码，并且文件没有串联时，可以根据个人情况决定是否使用全局严格模式，从而使这一规则成为不必要的。
