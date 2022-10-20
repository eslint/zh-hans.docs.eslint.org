---
title: no-bitwise
layout: doc
rule_type: suggestion
---

在 JavaScript 中使用位操作符的情况非常少，通常 `&` 或 `||` 都只是输入 `&&` 或 `||` 时手抖了而已，这将导致意外行为。

```js
var x = y | z;
```

## 规则细节

这条规则不允许使用位操作符。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-bitwise: "error"*/

var x = y | z;

var x = y & z;

var x = y ^ z;

var x = ~ z;

var x = y << z;

var x = y >> z;

var x = y >>> z;

x |= y;

x &= y;

x ^= y;

x <<= y;

x >>= y;

x >>>= y;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-bitwise: "error"*/

var x = y || z;

var x = y && z;

var x = y > z;

var x = y < z;

x += y;
```

:::

## 选项

此规则选项为对象：

* `"allow"`：允许此列表中的位运算符在例外情况下使用。
* `"int32Hint"`: 允许在 `|0` 模式下使用位操作符进行类型转换。

### allow

使用此规则与 `{ "allow": ["~"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-bitwise: ["error", { "allow": ["~"] }] */

~[1,2,3].indexOf(1) === -1;
```

:::

### int32Hint

使用此规则与 `{ "int32Hint": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-bitwise: ["error", { "int32Hint": true }] */

var b = a|0;
```

:::
