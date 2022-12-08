---
title: no-wrap-func
layout: doc

---

不允许在函数表达式周围使用不必要的括号。

（已移除）此规则在 ESLint v1.0 中移除并被 [no-extra-parens](no-extra-parens) 规则所取代。新规则中的 `"functions"` 选项相当于与这个移除的规则。

尽管用小括号包裹函数是可行的，但当代码中还包含立即调用的函数表达式（IIFE）时，这可能会引起混淆，因为小括号经常被用来做这种区分。比如：

```js
var foo = (function() {
    // IIFE
}());

var bar = (function() {
    // not an IIFE
});
```

## 规则细节

当它遇到一个用小括号包裹的函数表达式，而后面没有调用小括号时，这条规则会发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
var a = (function() {/*...*/});
```

:::

使用此规则的**正确**示例：

::: correct

```js
var a = function() {/*...*/};

(function() {/*...*/})();
```

:::
