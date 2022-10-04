---
title: max-depth
layout: doc
rule_type: suggestion
related_rules:
- complexity
- max-len
- max-lines
- max-lines-per-function
- max-nested-callbacks
- max-params
- max-statements
---

许多开发者认为，如果块的嵌套超过一定的深度，代码就难以阅读。

## 规则细节

这个规则强制规定了块可以嵌套的最大深度，以减少代码的复杂性。

## 选项

这条规则有一个数字或对象选项：

* `"max"`（默认为 `4`）规定了块可以嵌套的最大深度。

**废弃**：对象属性 `maximum` 已被废弃，请使用对象属性 `max` 代替。

### max

使用此规则与默认的 `{ "max": 4 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-depth: ["error", 4]*/

function foo() {
    for (;;) { // Nested 1 deep
        while (true) { // Nested 2 deep
            if (true) { // Nested 3 deep
                if (true) { // Nested 4 deep
                    if (true) { // Nested 5 deep
                    }
                }
            }
        }
    }
}
```

:::

使用此规则与默认的 `{ "max": 4 }` 选项的**正确**示例：

::: correct

```js
/*eslint max-depth: ["error", 4]*/

function foo() {
    for (;;) { // Nested 1 deep
        while (true) { // Nested 2 deep
            if (true) { // Nested 3 deep
                if (true) { // Nested 4 deep
                }
            }
        }
    }
}
```

:::

请注意，类的静态块不算是嵌套块，而且其中的深度是与包围的上下文分开计算的。

使用此规则与 `{ "max": 2 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-depth: ["error", 2]*/

function foo() {
    if (true) { // Nested 1 deep
        class C {
            static {
                if (true) { // Nested 1 deep
                    if (true) { // Nested 2 deep
                        if (true) { // Nested 3 deep
                        }
                    }
                }
            }
        }
    }
}
```

:::

使用此规则与 `{ "max": 2 }` 选项的**正确**示例：

::: correct

```js
/*eslint max-depth: ["error", 2]*/

function foo() {
    if (true) { // Nested 1 deep
        class C {
            static {
                if (true) { // Nested 1 deep
                    if (true) { // Nested 2 deep
                    }
                }
            }
        }
    }
}
```

:::
