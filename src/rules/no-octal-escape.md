---
title: no-octal-escape
rule_type: suggestion
---

从 ECMAScript 5 规范开始，字符串中的八进制转义序列已被废弃，不应使用。应该使用 Unicode 转义序列。

```js
var foo = "Copyright \251";
```

## 规则细节

这条规则不允许在字符串字面中使用八进制转义序列。

如果 ESLint 在严格模式下解析代码，解析器（而不是本规则）会报告错误。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-octal-escape: "error"*/

var foo = "Copyright \251";
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-octal-escape: "error"*/

var foo = "Copyright \u00A9";   // unicode

var foo = "Copyright \xA9";     // hexadecimal
```

:::
