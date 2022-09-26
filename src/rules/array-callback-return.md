---
title: array-callback-return
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/array-callback-return.md
rule_type: problem
---

`Array` 有几种过滤、映射和折叠的方法。
如果我们忘记在这些回调中写上 `return` 语句，那可能是个错误。如果你不想使用返回，或者不需要返回的结果，可以考虑使用 [.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 代替。

```js
// 示例：convert ['a', 'b', 'c'] --> {a: 0, b: 1, c: 2}
var indexMap = myArray.reduce(function(memo, item, index) {
  memo[item] = index;
}, {}); // Error: cannot set property 'b' of undefined
```

## 规则细节

本规则强制要求在数组方法的回调中使用 `return` 语句。
此外，它也可以通过使用 `checkForEach` 选项来强制 `forEach` 数组方法回调**没有**返回值。

本规则找到以下方法的回调函数，然后检查 `return` 语句的用法。

* [`Array.from`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.from)
* [`Array.prototype.every`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.every)
* [`Array.prototype.filter`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.filter)
* [`Array.prototype.find`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.find)
* [`Array.prototype.findIndex`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.findindex)
* [`Array.prototype.flatMap`](https://www.ecma-international.org/ecma-262/10.0/#sec-array.prototype.flatmap)
* [`Array.prototype.forEach`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.foreach) (optional, based on `checkForEach` parameter)
* [`Array.prototype.map`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.map)
* [`Array.prototype.reduce`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.reduce)
* [`Array.prototype.reduceRight`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.reduceright)
* [`Array.prototype.some`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.some)
* [`Array.prototype.sort`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort)
* And above of typed arrays.

此规则的**错误**示例：

:::incorrect

```js
/*eslint array-callback-return: "error"*/

var indexMap = myArray.reduce(function(memo, item, index) {
    memo[item] = index;
}, {});

var foo = Array.from(nodes, function(node) {
    if (node.tagName === "DIV") {
        return true;
    }
});

var bar = foo.filter(function(x) {
    if (x) {
        return true;
    } else {
        return;
    }
});
```

:::

此规则的**正确**示例：

:::correct

```js
/*eslint array-callback-return: "error"*/

var indexMap = myArray.reduce(function(memo, item, index) {
    memo[item] = index;
    return memo;
}, {});

var foo = Array.from(nodes, function(node) {
    if (node.tagName === "DIV") {
        return true;
    }
    return false;
});

var bar = foo.map(node => node.getAttribute("id"));
```

:::

## 选项

该规则接受一个有两个选项的配置对象：

* 当将 `"allowImplicit": false`（默认值）设置为 `true` 是, 允许需要返回值的方法的回调隐含地返回 `undefined`，其 `return` 语句不包含表达式。
* 当将 `"checkForEach": false`（默认值）设置为 `true` 时, 规则也将报告返回一个值的 `forEach` 回调。

### allowImplicit

使用 `{ "allowImplicit": true }` 选项的**正确**示例：

:::correct

```js
/*eslint array-callback-return: ["error", { allowImplicit: true }]*/
var undefAllTheThings = myArray.map(function(item) {
    return;
});
```

:::

### checkForEach

使用 `{ "checkForEach": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint array-callback-return: ["error", { checkForEach: true }]*/

myArray.forEach(function(item) {
    return handleItem(item)
});

myArray.forEach(function(item) {
    if (item < 0) {
        return x;
    }
    handleItem(item);
});

myArray.forEach(item => handleItem(item));

myArray.forEach(item => {
    return handleItem(item);
});
```

:::

使用 `{ "checkForEach": true }` 选项的**正确**示例：

:::correct

```js
/*eslint array-callback-return: ["error", { checkForEach: true }]*/

myArray.forEach(function(item) {
    handleItem(item)
});

myArray.forEach(function(item) {
    if (item < 0) {
        return;
    }
    handleItem(item);
});

myArray.forEach(function(item) {
    handleItem(item);
    return;
});

myArray.forEach(item => {
    handleItem(item);
});
```

:::

## 已知限制

这条规则检查给定名称的方法的回调函数，**即使**拥有该方法的对象**不是**数组。

## 何时不用

如果你不想 警告在数组方法的回调中使用 `return` 语句。，禁用此规则毫无风险。
