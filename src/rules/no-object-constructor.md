---
title: no-object-constructor
rule_type: suggestion
related_rules:
- no-array-constructor
- no-new-wrappers
---

通常不建议使用 `Object` 构造函数创建新的空对象，而应采用对象字面量表示法，因为后者更简洁，且全局变量 `Object` 可能被重新定义。
例外情况是，当 `Object` 构造函数用于有意地包装一个作为参数传递的特定值时。

## 规则细节

此规则禁止在不带参数的情况下调用 `Object` 构造函数。

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint no-object-constructor: "error"*/

Object();

new Object();
```

:::

使用此规则的**正确**示例：

:::correct

```js
/*eslint no-object-constructor: "error"*/

Object("foo");

const obj = { a: 1, b: 2 };

const isObject = value => value === Object(value);

const createObject = Object => new Object();
```

:::

## 何时不用

当你希望允许使用 `Object` 构造函数的时候，你可以安全地禁用此规则。
