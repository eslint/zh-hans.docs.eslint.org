---
title: no-new
rule_type: suggestion
---

在构造函数中使用 `new` 的目的通常是创建一个特定类型的对象，并将该对象存储在一个变量中，例如：

```js
var person = new Person();
```

使用 `new` 而不存储结果的情况比较少见，例如：

```js
new Person();
```

在这种情况下，创建的对象被扔掉了，因为它的引用没有被保存在任何地方，在很多情况下，这意味着构造函数应该被替换成不需要使用 `new` 的函数。

## 规则细节

这条规则的目的是保持一致性和惯例，不允许使用 `new` 关键字的构造函数调用，而不把产生的对象分配给一个变量。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-new: "error"*/

new Thing();
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-new: "error"*/

var thing = new Thing();

Thing();
```

:::
