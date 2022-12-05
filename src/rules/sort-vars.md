---
title: sort-vars
layout: doc
rule_type: suggestion
related_rules:
- sort-keys
- sort-imports
---

当在同一区块内声明多个变量时，一些开发者喜欢按字母顺序对变量名称进行排序，以便以后能够更容易找到所需的变量。其他人则认为这增加了复杂性，成为维护的负担。

## 规则细节

该规则检查所有的变量声明块，并验证所有的变量是否按字母顺序排序。
该规则的默认配置是大小写敏感的。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint sort-vars: "error"*/

var b, a;

var a, B, c;

var a, A;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint sort-vars: "error"*/

var a, b, c, d;

var _a = 10;
var _b = 20;

var A, a;

var B, a, c;
```

:::

按字母顺序列表，从第一个变量开始，排除任何被认为有问题的变量。所以下面的代码将产生两个问题。

```js
/*eslint sort-vars: "error"*/

var c, d, a, b;
```

但这个人，只会产生一个。

```js
/*eslint sort-vars: "error"*/

var c, d, a, e;
```

## 选项

此规则选项为对象：

* `"ignoreCase": true`（默认为 `false`）忽略了变量顺序的大小写敏感性。

### ignoreCase

使用此规则与 `{ "ignoreCase": true }` 选项的**正确**示例：

::: correct

```js
/*eslint sort-vars: ["error", { "ignoreCase": true }]*/

var a, A;

var a, B, c;
```

:::

## 何时不用

这条规则是一种格式化的偏好，不遵循它不会对你的代码质量产生负面影响。如果你将变量按字母顺序排列不是你的编码标准的一部分，那么你可以不遵守这一规则。
