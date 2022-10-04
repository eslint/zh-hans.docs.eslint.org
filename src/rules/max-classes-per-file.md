---
title: max-classes-per-file
layout: doc
rule_type: suggestion
---

包含多个类的文件往往会导致代码库的可操作性降低 和结构不良的代码库。最佳做法是将每个文件 只限于一个功能。

## 规则细节

此规则规定，每个文件只能包含特定数量类，而不能有更多的。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint max-classes-per-file: "error"*/

class Foo {}
class Bar {}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint max-classes-per-file: "error"*/

class Foo {}
```

:::

## 选项

这个规则可以用一个对象或一个数字来配置。

如果选项是一个对象，它可以包含以下一个或两个。

* `ignoreExpressions`：一个布尔选项（默认为`false`），用于忽略类的表达。
* `max`：一个数字选项（默认为 1），用于指定类的最大数量。

例如：

```json
{
    "max-classes-per-file": ["error", 1]
}
```

```json
{
    "max-classes-per-file": [
        "error",
        { "ignoreExpressions": true, "max": 2 }
    ]
}
```

使用该规则与将 `max` 选项设置为 `2` 的**正确**示例：

::: correct

```js
/* eslint max-classes-per-file: ["error", 2] */

class Foo {}
class Bar {}
```

:::

使用此规则与将 `ignoreExpressions` 选项设置为 `true` 的**正确**示例：

::: correct

```js
/* eslint max-classes-per-file: ["error", { ignoreExpressions: true }] */

class VisitorFactory {
    forDescriptor(descriptor) {
        return class {
            visit(node) {
                return `Visiting ${descriptor}.`;
            }
        };
    }
}
```

:::
