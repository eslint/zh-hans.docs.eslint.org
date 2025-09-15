---
title: no-new-object
rule_type: suggestion
related_rules:
- no-array-constructor
- no-new-wrappers
---

此规则已在 ESLint v8.50.0 中**弃用**，并由 [no-object-constructor](no-object-constructor) 规则取代。新规则能识别更多可使用对象字面量语法的场景，且当 `Object` 构造函数带参数调用时不会报告问题。

`Object` 构造函数用于在 JavaScript 中创建新的通用对象，例如：

```js
var myObject = new Object();
```

然而，这与使用更简洁的对象字面量语法没有区别：

```js
var myObject = {};
```

由于这个原因，许多人喜欢总是使用对象字面的语法，而不使用 `Object` 构造函数。

虽然这两种方法在性能上没有区别，但对象字面形式的字节节省和简洁性使其成为创建新对象的事实方式。

## 规则细节

此规则禁止使用 `new` 调用 `Object` 构造函数。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-new-object: "error"*/

var myObject = new Object();

new Object();

var foo = new Object("foo");
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-new-object: "error"*/

var myObject = new CustomObject();

var myObject = {};

var Object = function Object() {};
new Object();
```

:::

## 何时不用

如果你希望允许使用 `new` 创建 `Object` 构造函数，你可以安全地关闭这个规则。
