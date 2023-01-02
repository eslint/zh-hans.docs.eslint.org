---
title: no-octal
rule_type: suggestion
---

八进制字是指以前导零开头的数字，如：

```js
var num = 071;      // 57
```

由于标识八进制字头的零在 JavaScript 代码中一直是混乱和错误的来源，ECMAScript 5 取消了对八进制数字字头的使用。

## 规则细节

这条规则不允许八进制字头。

如果 ESLint 在严格模式下解析代码，解析器（而不是这个规则）会报告错误。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-octal: "error"*/

var num = 071;
var result = 5 + 07;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-octal: "error"*/

var num  = "071";
```

:::

## 兼容

* **JSHint**：W115
