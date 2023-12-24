---
title: no-obj-calls
rule_type: problem
handled_by_typescript: true
further_reading:
- https://es5.github.io/#x15.8
---

ECMAScript 提供了几个全局对象，目的是要按原样使用。其中一些对象由于大写字母的缘故，看起来像是构造函数（如`Math` 和 `JSON`），但如果你试图将它们作为函数执行，就会出现错误。

[ECMAScript 5 规范](https://es5.github.io/#x15.8) 明确指出不能调用 `Math` 或 `JSON`：

> The Math object does not have a `[[Call]]` internal property; it is not possible to invoke the Math object as a function.
>
> Math 对象没有 `[[Call]]` 内部属性；不可能将 Math 对象作为函数调用。

[ECMAScript 2015 规范](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect-object)明确指出不能调用 `Reflect`：

> > The Reflect object also does not have a `[[Call]]` internal method; it is not possible to invoke the Reflect object as a function.
>
> Reflect 对象也没有 `[[Call]]` 内部方法；不可能将 Reflect 对象作为函数调用。

[ECMAScript 2017 规范](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-atomics-object)明确指出不能调用 `Atomics`：

> > The Atomics object does not have a `[[Call]]` internal method; it is not possible to invoke the Atomics object as a function.
>
> Atomics 对象没有 `[[Call]]` 内部方法；不可能将 Atomics 对象作为函数调用。

而 [ECMAScript 国际化 API 规范](https://tc39.es/ecma402/#intl-object) 明确指出不能调用 `Intl`：

> The Intl object does not have a `[[Call]]` internal method; it is not possible to invoke the Intl object as a function.
>
> Intl 对象没有 `[[Call]]` 内部方法；不可能将 Intl 对象作为函数调用。

## 规则细节

这条规则不允许将 `Math`、`JSON`、`Reflect`、`Atomics` 和 `Intl` 对象作为函数调用。

这条规则也不允许用 `new` 运算符将这些对象作为构造器。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-obj-calls: "error"*/
/*eslint-env es2017, browser */

var math = Math();

var newMath = new Math();

var json = JSON();

var newJSON = new JSON();

var reflect = Reflect();

var newReflect = new Reflect();

var atomics = Atomics();

var newAtomics = new Atomics();

var intl = Intl();

var newIntl = new Intl();
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-obj-calls: "error"*/
/*eslint-env es2017, browser*/

function area(r) {
    return Math.PI * r * r;
}

var object = JSON.parse("{}");

var value = Reflect.get({ x: 1, y: 2 }, "x");

var first = Atomics.load(foo, 0);

var segmenterFr = new Intl.Segmenter("fr", { granularity: "word" });
```

:::
