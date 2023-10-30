---
title: guard-for-in
rule_type: suggestion
related_rules:
- prefer-object-has-own
- no-prototype-builtins
further_reading:
- https://javascriptweblog.wordpress.com/2011/01/04/exploring-javascript-for-in-loops/
- https://2ality.com/2012/01/objects-as-maps.html
---

用 `for in` 循环遍历对象将包括通过原型链继承的属性。这种行为会导致你的 for 循环中出现意外的项目。

```js
for (key in foo) {
    doSomething(key);
}
```

对于不支持 ES2022 的代码库，可以使用 `Object.prototype.hasOwnProperty.call(foo, key)` 作为检查属性是否不是继承而来的方式。

而对于支持 ES2022 的代码库，可以使用更简洁的替代方法 `Object.hasOwn(foo, key)`；请参考 [prefer-object-has-own](prefer-object-has-own)。

这两种方法都用于验证一个对象是否拥有特定属性，而不是继承自原型链。使用 `Object.prototype.hasOwnProperty.call(foo, key)` 可以确保属性不是继承自原型链的，而 `Object.hasOwn(foo, key)` 是 ES2022 引入的更简便的语法，用于执行相同的检查。选择使用哪种方式取决于你的代码库是否支持 ES2022 特性。

注意，简单地检查 `foo.hasOwnProperty(key)` 在某些情况下可能会导致错误；见 [no-prototype-builtins](no-prototype-builtins)。

## 规则细节

这条规则的目的是防止因使用 `for in` 循环而不对循环中的结果进行过滤而可能产生的意外行为。因此，当 `for in` 循环没有用 `if` 语句过滤其结果时，它将发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint guard-for-in: "error"*/

for (key in foo) {
    doSomething(key);
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint guard-for-in: "error"*/

for (key in foo) {
    if (Object.hasOwn(foo, key)) {
        doSomething(key);
    }
}

for (key in foo) {
    if (Object.prototype.hasOwnProperty.call(foo, key)) {
        doSomething(key);
    }
}

for (key in foo) {
    if ({}.hasOwnProperty.call(foo, key)) {
        doSomething(key);
    }
}
```

:::
