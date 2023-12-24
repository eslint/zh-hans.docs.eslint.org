---
title: no-dupe-keys
rule_type: problem
handled_by_typescript: true
---

在对象字面中具有相同键的多个属性会在你的应用程序中引起意外的行为。

```js
var foo = {
    bar: "baz",
    bar: "qux"
};
```

## 规则细节

这条规则不允许在对象字面中出现重复的键。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-dupe-keys: "error"*/

var foo = {
    bar: "baz",
    bar: "qux"
};

var foo = {
    "bar": "baz",
    bar: "qux"
};

var foo = {
    0x1: "baz",
    1: "qux"
};
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-dupe-keys: "error"*/

var foo = {
    bar: "baz",
    quxx: "qux"
};
```

:::
