---
title: no-restricted-properties
rule_type: suggestion
related_rules:
- no-restricted-globals
- no-restricted-syntax
---

在代码库中，对象上的某些属性可能是不允许的。这对于废除一个 API 或者限制一个模块的方法的使用非常有用。例如，你可能想在使用 Mocha 时不允许使用 `describe.only`，或者告诉人们使用 `Object.assign` 而不是 `_.extend`。

## 规则细节

该规则查找访问给定对象名称上的给定属性键，无论是在读取属性的值还是作为函数调用它时。你可以指定一个选项信息来表明替代的 API 或限制的原因。

### 选项

这个规则接受一个对象的列表，其中指定了对象的名称和属性名称：

```json
{
    "rules": {
        "no-restricted-properties": [2, {
            "object": "disallowedObjectName",
            "property": "disallowedPropertyName"
        }]
    }
}
```

可以不允许多个对象/属性值，并且可以指定可选消息：

```json
{
    "rules": {
        "no-restricted-properties": [2, {
            "object": "disallowedObjectName",
            "property": "disallowedPropertyName"
        }, {
            "object": "disallowedObjectName",
            "property": "anotherDisallowedPropertyName",
            "message": "Please use allowedObjectName.allowedPropertyName."
        }]
    }
}
```

如果省略了对象名称，则所有对象都不允许存在该属性：

```json
{
    "rules": {
        "no-restricted-properties": [2, {
            "property": "__defineGetter__",
            "message": "Please use Object.defineProperty instead."
        }]
    }
}
```

如果省略了属性名称，则不允许访问给定对象的任何属性：

```json
{
    "rules": {
        "no-restricted-properties": [2, {
            "object": "require",
            "message": "Please call require() directly."
        }]
    }
}
```

使用此规则的**错误**示例：

::: incorrect

```js
/* eslint no-restricted-properties: [2, {
    "object": "disallowedObjectName",
    "property": "disallowedPropertyName"
}] */

var example = disallowedObjectName.disallowedPropertyName; /*error Disallowed object property: disallowedObjectName.disallowedPropertyName.*/

disallowedObjectName.disallowedPropertyName(); /*error Disallowed object property: disallowedObjectName.disallowedPropertyName.*/
```

:::

::: incorrect

```js
/* eslint no-restricted-properties: [2, {
    "property": "__defineGetter__"
}] */

foo.__defineGetter__(bar, baz);
```

:::

::: incorrect

```js
/* eslint no-restricted-properties: [2, {
    "object": "require"
}] */

require.resolve('foo');
```

:::

使用此规则的**正确**示例：

::: correct

```js
/* eslint no-restricted-properties: [2, {
    "object": "disallowedObjectName",
    "property": "disallowedPropertyName"
}] */

var example = disallowedObjectName.somePropertyName;

allowedObjectName.disallowedPropertyName();
```

:::

::: correct

```js
/* eslint no-restricted-properties: [2, {
    "object": "require"
}] */

require('foo');
```

:::

## 何时不用

如果你没有任何要限制的对象/属性组合，你不应该使用这个规则。
