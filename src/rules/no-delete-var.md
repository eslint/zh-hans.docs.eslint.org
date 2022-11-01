---
title: no-delete-var
layout: doc
rule_type: suggestion
---

`delete` 操作符的目的是为了从一个对象中删除一个属性。在一个变量上使用 `delete` 操作符可能会导致意外的行为。

## 规则细节

这条规则不允许对变量使用 `delete` 操作符。

如果 ESLint 在严格模式下解析代码，解析器（而不是本规则）会报告错误。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-delete-var: "error"*/

var x;
delete x;
```

:::
