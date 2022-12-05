---
title: radix
layout: doc
rule_type: suggestion
further_reading:
- https://davidwalsh.name/parseint-radix
---

当使用 `parseInt()` 函数时，通常会省略第二个参数，即弧度，而让函数尝试从第一个参数中确定它是什么类型的数字。默认情况下，`parseInt()` 会自动检测十进制和十六进制（通过 `0x` 前缀）。在 ECMAScript 5 之前，`parseInt()` 也会自动检测八进制字样，这就造成了问题，因为许多开发者认为前导的 `0` 会被忽略。

这种混淆导致了一个建议，即你总是使用 `parseInt()` 的弧度参数来消除意外的后果。所以不要这样做：

```js
var num = parseInt("071");      // 57
```

要这样：

```js
var num = parseInt("071", 10);  // 71
```

ECMAScript 5 改变了 `parseInt()` 的行为，使其不再自动检测八进制字样，而是将其视为十进制字样。然而，第一个参数的十六进制和十进制解释之间的差异导致许多开发人员继续使用 radix 参数，以确保字符串以预期的方式被解释。

另一方面，如果代码只针对 ES5 兼容的环境，传递弧度 `10` 可能是多余的。在这种情况下，你可能希望不允许使用这样的小数。

## 规则细节

这条规则的目的是防止意外地将一个字符串转换为与预期不同的基数，或者如果只针对现代环境，则防止多余的 `10` 小数。

## 选项

这个规则有两个选项。

* `"always"` 强制提供一个小数点（默认）
* `"as-needed"` 不允许提供 `10` 小数

### always

使用默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint radix: "error"*/

var num = parseInt("071");

var num = parseInt(someValue);

var num = parseInt("071", "abc");

var num = parseInt("071", 37);

var num = parseInt();
```

:::

使用默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint radix: "error"*/

var num = parseInt("071", 10);

var num = parseInt("071", 8);

var num = parseFloat(someValue);
```

:::

### as-needed

使用 `"as-needed"` 选项的**错误**示例：

::: incorrect

```js
/*eslint radix: ["error", "as-needed"]*/

var num = parseInt("071", 10);

var num = parseInt("071", "abc");

var num = parseInt();
```

:::

使用 `"as-needed"` 选项的**正确**示例：

::: correct

```js
/*eslint radix: ["error", "as-needed"]*/

var num = parseInt("071");

var num = parseInt("071", 8);

var num = parseFloat(someValue);
```

:::

## 何时不用

如果你不想强制执行 `10` 小数点的存在或遗漏，你可以关闭这个规则。
