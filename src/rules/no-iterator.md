---
title: no-iterator
layout: doc
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
- https://kangax.github.io/es5-compat-table/es6/#Iterators
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features#Object_methods
---

`__iterator__` 属性是 SpiderMonkey 对 JavaScript 的扩展，可以用来创建与 JavaScript 的 `for in` 和 `for each` 结构兼容的自定义迭代器。然而，这个属性现在已经过时了，所以它不应该被使用。下面是一个例子，说明这曾经是如何工作的。

```js
Foo.prototype.__iterator__ = function() {
    return new FooIterator(this);
}
```

你应该使用 ECMAScript 6 迭代器和生成器来代替。

## 规则细节

这条规则的目的是防止因使用 `__iterator__` 属性而可能产生的错误，该属性在一些浏览器中没有实现。因此，只要遇到 `__iterator__` 属性，它就会发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-iterator: "error"*/

Foo.prototype.__iterator__ = function() {
    return new FooIterator(this);
};

foo.__iterator__ = function () {};

foo["__iterator__"] = function () {};

```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-iterator: "error"*/

var __iterator__ = foo; // Not using the `__iterator__` property.
```

:::
