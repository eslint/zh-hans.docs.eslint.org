---
title: no-space-before-semi
layout: doc

related_rules:
- semi
- no-extra-semi
---

不允许分号前有空格。

（已移除）此规则在 ESLint v1.0 中移除并被 [semi-spacing](semi-spacing) 所取代。

JavaScript 允许在表达式和结束分号之间放置不必要的空格。

空间问题也会导致代码看起来不一致，更难阅读。

```js
var thing = function () {
  var test = 12 ;
}  ;
```

## 规则细节

这条规则防止在表达式中使用分号前的空格。

使用此规则的**错误**示例：

::: incorrect

```js
var foo = "bar" ;

var foo = function() {} ;

var foo = function() {
} ;

var foo = 1 + 2 ;
```

:::

使用此规则的**正确**示例：

::: correct

```js
;(function(){}());

var foo = "bar";
```

:::
