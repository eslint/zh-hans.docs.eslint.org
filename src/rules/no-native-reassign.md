---
title: no-native-reassign
rule_type: suggestion
related_rules:
- no-extend-native
- no-redeclare
- no-shadow
---

此规则在 ESLint v3.3.0 中废弃并被 [no-global-assign](no-global-assign) 规则所取代。

JavaScript 环境包含一些内置的全局变量，例如浏览器中的 `window` 和 Node.js 中的 `process`。几乎在所有情况下，你都不想给这些全局变量赋值，因为这样做可能会导致失去对重要功能的访问。例如，你可能不希望在浏览器代码中这样做。

```js
window = {};
```

虽然像 `window` 这样的例子是显而易见的，但通常有数百个由 JavaScript 环境提供的内置全局对象。要知道你是否在向一个全局变量赋值是很难的。

## 规则细节

这条规则不允许修改只读的全局变量。

ESLint 有能力将全局变量配置为只读。

* [指定环境](../use/configure#specifying-environments)
* [指定全局变量](../use/configure#specifying-globals)

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-native-reassign: "error"*/

Object = null
undefined = 1
```

:::

::: incorrect

```js
/*eslint no-native-reassign: "error"*/
/*eslint-env browser*/

window = {}
length = 1
top = 1
```

:::

::: incorrect

```js
/*eslint no-native-reassign: "error"*/
/*global a:readonly*/

a = 1
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-native-reassign: "error"*/

a = 1
var b = 1
b = 2
```

:::

::: correct

```js
/*eslint no-native-reassign: "error"*/
/*eslint-env browser*/

onload = function() {}
```

:::

::: correct

```js
/*eslint no-native-reassign: "error"*/
/*global a:writable*/

a = 1
```

:::

## 选项

这条规则接受一个 `exceptions` 选项，可以用来指定一个允许重新分配的内置程序的列表。

```json
{
    "rules": {
        "no-native-reassign": ["error", {"exceptions": ["Object"]}]
    }
}
```

## 何时不用

如果你试图覆盖其中一个本地对象。
