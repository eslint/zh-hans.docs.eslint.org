---
title: no-lone-blocks
rule_type: suggestion
---

在 JavaScript 中，在 ES6 之前，由大括号限定的独立代码块不会创建一个新的作用域，也没有任何用途。例如，这些大括号对 `foo` 没有任何作用。

```js
{
    var foo = bar();
}
```

在 ES6 中，如果存在块级绑定（`let` 和 `const`）、类声明或函数声明（在严格模式下），代码块可以创建一个新的作用域。在这些情况下，一个块不被认为是多余的。

## 规则细节

这一规则旨在消除脚本顶层或其他区块内不必要的、可能引起混淆的区块。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-lone-blocks: "error"*/

{}

if (foo) {
    bar();
    {
        baz();
    }
}

function bar() {
    {
        baz();
    }
}

{
    function foo() {}
}

{
    aLabel: {
    }
}

class C {
    static {
        {
            foo();
        }
    }
}
```

:::

在 ES6 环境下，此规则的**正确的代码示例：

::: correct

```js
/*eslint no-lone-blocks: "error"*/
/*eslint-env es6*/

while (foo) {
    bar();
}

if (foo) {
    if (bar) {
        baz();
    }
}

function bar() {
    baz();
}

{
    let x = 1;
}

{
    const y = 1;
}

{
    class Foo {}
}

aLabel: {
}

class C {
    static {
        lbl: {
            if (something) {
                break lbl;
            }

            foo();
        }
    }
}
```

:::

在 ES6 环境和严格模式下，在 ESLint 配置中编写 `"parserOptions": { "sourceType": "module" }` 在在代码中使用 `"use strict"` 指令的**正确**示例：

::: correct

```js
/*eslint no-lone-blocks: "error"*/
/*eslint-env es6*/

"use strict";

{
    function foo() {}
}
```

:::
