---
title: strict
rule_type: suggestion
---

严格模式指令是指在脚本或函数体的开头有一个 `use strict` 字样。它开启了严格模式。

当指令出现在全局范围时，严格模式适用于整个脚本。

```js
"use strict";

// strict mode

function foo() {
    // strict mode
}
```

当指令出现在一个函数体的开头，严格模式只适用于该函数，包括所有包含的函数。

```js
function foo() {
    "use strict";
    // strict mode
}

function foo2() {
    // not strict mode
};

(function() {
    "use strict";
    function bar() {
        // strict mode
    }
}());
```

在 **CommonJS** 模块系统中，一个隐藏的函数包装了每个模块，并限制了 `global` 严格模式指令的范围。

在 **ECMAScript** 模块中，总是有严格模式的语义，这些指令是不必要的。

## 规则细节

这条规则要求或不允许严格模式指令。

如果 ESLint 配置中指定了以下任何一个[解析器选项](../user-guide/configuring/language-options#specifying-parser-options)，则无论哪个选项被指定，本规则都不允许严格模式指令。

* `"sourceType": "module"` 也就是说，文件是 **ECMAScript** 模块
* `"impliedStrict": true` 属性在 `ecmaFeatures` 对象中。

这条规则不允许在带有非简单参数列表的函数中使用严格模式指令，无论指定哪个选项（例如，带有默认参数值的参数列表），因为这在 **ECMAScript 2016** 及以后版本中是一个语法错误。参见 [function](#function) 选项的例子。

这条规则不适用于类静态块，无论指定哪个选项，因为类静态块没有指令。因此，类静态块中的 `"use strict"` 语句不是指令，将被 [no-unused-expressions](no-unused-expressions) 规则所报告。

命令行中的 `"fix"` 选项不会插入新的 `"use strict"` 语句，而只是删除不需要的语句。

## 选项

此规则选项为字符串：

* `"safe"`（默认值）对应于以下任一选项:
    * `"global"` 如果 ESLint 认为一个文件是 **CommonJS** 模块的话
    * `"function"` 否则
* `"global"` 要求在全局范围内有一个严格模式指令（并且不允许任何其他严格模式指令）
* `"function"` 要求在每个顶层函数声明或表达式中使用一个严格模式指令（并且不允许任何其他严格模式指令）
* `"never"` 不允许使用严格模式的指令

### safe

如果 ESLint 认为一个文件是 **Node.js** 或 **CommonJS** 模块，因为配置中指定了以下任何一项，那么 `"safe"` 选项对应于 `"global"` 选项。

* `node` 或 `commonjs` [环境](../user-guide/configuring/language-options#specifying-environments)
* [解析器选项](../user-guide/configuring/language-options#specifying-parser-options)的 `ecmaFeatures` 对象中的 `"globalReturn": true` 属性

否则 `"safe"` 选项将与 `"function"` 选项相对应。注意，如果在配置中明确指定了 `"globalReturn": false`，那么 `"safe"` 选项将对应于`"function"` 选项，而不考虑指定环境。

### global

使用此规则与 `"global"` 选项的**错误**示例：

::: incorrect

```js
/*eslint strict: ["error", "global"]*/

function foo() {
}
```

:::

::: incorrect

```js
/*eslint strict: ["error", "global"]*/

function foo() {
    "use strict";
}
```

:::

::: incorrect

```js
/*eslint strict: ["error", "global"]*/

"use strict";

function foo() {
    "use strict";
}
```

:::

使用此规则与 `"global"` 选项的**正确**示例：

::: correct

```js
/*eslint strict: ["error", "global"]*/

"use strict";

function foo() {
}
```

:::

### function

这个选项确保所有的函数体都是严格模式代码，而全局代码则不是。特别是当一个构建步骤串联了多个脚本时，一个脚本的全局代码中的严格模式指令可能会无意中启用另一个脚本中的严格模式，而这个脚本并不打算成为严格代码。

使用此规则与 `"function"` 选项的**错误**示例：

::: incorrect

```js
/*eslint strict: ["error", "function"]*/

"use strict";

function foo() {
}
```

:::

::: incorrect

```js
/*eslint strict: ["error", "function"]*/

function foo() {
}

(function() {
    function bar() {
        "use strict";
    }
}());
```

:::

::: incorrect

```js
/*eslint strict: ["error", "function"]*/
/*eslint-env es6*/

// Illegal "use strict" directive in function with non-simple parameter list.
// This is a syntax error since ES2016.
function foo(a = 1) {
    "use strict";
}

// We cannot write "use strict" directive in this function.
// So we have to wrap this function with a function with "use strict" directive.
function foo(a = 1) {
}
```

:::

使用此规则与 `"function"` 选项的**正确**示例：

::: correct

```js
/*eslint strict: ["error", "function"]*/

function foo() {
    "use strict";
}

(function() {
    "use strict";

    function bar() {
    }

    function baz(a = 1) {
    }
}());

var foo = (function() {
    "use strict";

    return function foo(a = 1) {
    };
}());
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint strict: ["error", "never"]*/

"use strict";

function foo() {
}
```

:::

::: incorrect

```js
/*eslint strict: ["error", "never"]*/

function foo() {
    "use strict";
}
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint strict: ["error", "never"]*/

function foo() {
}
```

:::

### earlier default (removed)

（删除）该规则的默认选项（即没有指定字符串选项）在 ESLint v1.0 中被**删除**。`"function"` 选项与被删除的选项最为相似。

这个选项确保所有的函数都在严格模式下执行。严格模式指令必须出现在全局代码或每个顶级函数声明或表达式中。它不关心嵌套函数中不必要的严格模式指令，因为嵌套函数已经是严格的了，也不关心同一层次的多个严格模式指令。

使用此规则与早期已删除的默认选项的**错误**示例：

::: incorrect

```js
// "strict": "error"

function foo() {
}
```

:::

::: incorrect

```js
// "strict": "error"

(function() {
    function bar() {
        "use strict";
    }
}());
```

:::

使用此规则与早期已删除的默认选项的**正确**示例：

::: correct

```js
// "strict": "error"

"use strict";

function foo() {
}
```

:::

::: correct

```js
// "strict": "error"

function foo() {
    "use strict";
}
```

:::

::: correct

```js
// "strict": "error"

(function() {
    "use strict";
    function bar() {
        "use strict";
    }
}());
```

:::

## 何时不用

在一个既有严格代码又有非严格代码的代码库中，要么关闭这个规则，要么在必要时[选择性地禁用它](../user-guide/configuring/rules#disabling-rules)。例如，引用 `arguments.callee` 的函数在严格模式下是无效的。MDN 上有一份[严格模式差异的完整列表](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode#Differences_from_non-strict_to_strict)。
