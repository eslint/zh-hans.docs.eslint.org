---
title: operator-assignment
layout: doc
rule_type: suggestion
---

JavaScript 提供了速记运算符，将变量赋值和一些简单的数学运算结合起来。例如，`x = x + 4` 可以简化为 `x += 4`。支持的速记形式如下：

```text
 Shorthand | Separate
-----------|------------
 x += y    | x = x + y
 x -= y    | x = x - y
 x *= y    | x = x * y
 x /= y    | x = x / y
 x %= y    | x = x % y
 x **= y   | x = x ** y
 x <<= y   | x = x << y
 x >>= y   | x = x >> y
 x >>>= y  | x = x >>> y
 x &= y    | x = x & y
 x ^= y    | x = x ^ y
 x |= y    | x = x | y
```

## 规则细节

本规则要求或不允许在可能的情况下使用赋值运算符速记。

该规则适用于上表中列出的运算符。它不报告逻辑赋值运算符 `&&=`、`||=` 和 `??=`，因为它们的短路行为与其他赋值运算符不同。

## 选项

这个规则有一个字符串选项：

* `"always"`（默认值）。要求在可能的情况下使用赋值运算符速记
* `"never"` 不允许使用赋值运算符速记

### always

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint operator-assignment: ["error", "always"]*/

x = x + y;
x = y * x;
x[0] = x[0] / y;
x.y = x.y << z;
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint operator-assignment: ["error", "always"]*/

x = y;
x += y;
x = y * z;
x = (x * y) * z;
x[0] /= y;
x[foo()] = x[foo()] % 2;
x = y + x; // `+` is not always commutative (e.g. x = "abc")
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint operator-assignment: ["error", "never"]*/

x *= y;
x ^= (y + z) / foo();
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint operator-assignment: ["error", "never"]*/

x = x + y;
x.y = x.y / a.b;
```

:::

## 何时不用

使用运算符赋值速记是一种风格上的选择。关闭这一规则将允许开发人员根据具体情况选择哪种风格更易读。
