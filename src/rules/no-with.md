---
title: no-with
layout: doc
rule_type: suggestion
further_reading:
- https://web.archive.org/web/20200717110117/https://yuiblog.com/blog/2006/04/11/with-statement-considered-harmful/
---

`with` 语句存在潜在问题，因为它将一个对象的成员加入到当前的作用域中，使得我们无法分辨块中的变量究竟指的是什么。

## 规则细节

使用此规则禁用 `with` 语句。

如果 ESLint 以严格模式解析代码，解析器（而不是本规则）会报告错误。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-with: "error"*/

with (point) {
    r = Math.sqrt(x * x + y * y); // is r a member of point?
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-with: "error"*/
/*eslint-env es6*/

const r = ({x, y}) => Math.sqrt(x * x + y * y);
```

:::

## 何时不用

如果你故意使用 `with` 语句，那么你可以禁用这个规则。
