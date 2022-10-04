---
title: no-array-constructor
layout: doc
rule_type: suggestion
related_rules:
- no-new-object
- no-new-wrappers
---

一般不鼓励使用 `Array` 构造函数来构造新数组，而是使用数组字面符号，因为存在单参数的隐患，而且 `Array` 全局变量可能会被重新定义。除非当 Array 构造函数被用来创建指定大小的稀疏数组时，只需给构造函数一个数字参数。

## 规则细节

此规则不允许 `Array` 构造函数。

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint no-array-constructor: "error"*/

Array(0, 1, 2)

new Array(0, 1, 2)
```

:::

使用此规则的**正确**示例：

:::correct

```js
/*eslint no-array-constructor: "error"*/

Array(500)

new Array(someOtherArray.length)

[0, 1, 2]
```

:::

## 何时不用

此规则执行了近乎普遍的风格偏好。这就是说，如果更喜欢构造函数风格，可以被禁用此规则。
