---
title: no-obj-calls
layout: doc
rule_type: problem
further_reading:
- https://es5.github.io/#x15.8
---

ECMAScript 提供了几个全局对象，目的是要按原样使用。其中一些对象由于大写字母的缘故，看起来像是构造函数（如`Math'和`JSON'），但如果你试图将它们作为函数执行，就会出现错误。

[ECMAScript 5 规范](https://es5.github.io/#x15.8) 明确指出，`Math` 和 `JSON` 都不能被调用。

> Math 对象没有 `[[Call]]` 内部属性；不可能将 Math 对象作为一个函数调用。

[ECMAScript 2015 规范](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect-object) 明确指出，`Reflect'不能被调用。

> Reflect 对象也没有 `[[Call]]` 内部方法；不可能作为一个函数调用 Reflect 对象。

而 [ECMAScript 2017 规范](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-atomics-object) 明确指出，`Atomics` 不能被调用。

> Atomics 对象没有 `[[Call]]` 内部方法；不可能将 Atomics 对象作为一个函数来调用。

## 规则细节

这条规则不允许将 `Math`、`JSON`、`Reflect` 和 `Atomics` 对象作为函数调用。

这条规则也不允许用 `new` 运算符将这些对象作为构造器。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-obj-calls: "error"*/
/*eslint-env es2017*/

var math = Math();

var newMath = new Math();

var json = JSON();

var newJSON = new JSON();

var reflect = Reflect();

var newReflect = new Reflect();

var atomics = Atomics();

var newAtomics = new Atomics();
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-obj-calls: "error"*/
/*eslint-env es2017*/

function area(r) {
    return Math.PI * r * r;
}

var object = JSON.parse("{}");

var value = Reflect.get({ x: 1, y: 2 }, "x");

var first = Atomics.load(foo, 0);
```

:::
