---
title: no-unsafe-negation
rule_type: problem
handled_by_typescript: true
---

就像开发者可能会输入 `-a + b`，而他们的意思是 `-(a + b)` 表示一个和的负数，他们可能会错误地输入 `！key in object`，而他们几乎肯定是指 `!(key in object)` 来测试一个键不在一个对象中。`!obj instanceof Ctor` 是类似的。

## 规则细节

这条规则不允许否定以下关系运算符的左边操作数。

* [`in` 运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in).
* [`instanceof` 运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof).

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unsafe-negation: "error"*/

if (!key in object) {
    // operator precedence makes it equivalent to (!key) in object
    // and type conversion makes it equivalent to (key ? "false" : "true") in object
}

if (!obj instanceof Ctor) {
    // operator precedence makes it equivalent to (!obj) instanceof Ctor
    // and it equivalent to always false since boolean values are not objects.
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-unsafe-negation: "error"*/

if (!(key in object)) {
    // key is not in object
}

if (!(obj instanceof Ctor)) {
    // obj is not an instance of Ctor
}
```

:::

### Exception

对于极少数打算否定左边操作数的情况，本规则允许有例外。
如果整个否定被明确地包裹在括号中，本规则将不会报告问题。

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-unsafe-negation: "error"*/

if ((!foo) in object) {
    // allowed, because the negation is explicitly wrapped in parentheses
    // it is equivalent to (foo ? "false" : "true") in object
    // this is allowed as an exception for rare situations when that is the intended meaning
}

if(("" + !foo) in object) {
    // you can also make the intention more explicit, with type conversion
}
```

:::

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unsafe-negation: "error"*/

if (!(foo) in object) {
    // this is not an allowed exception
}
```

:::

## 选项

此规则选项为对象：

* `"enforceForOrderingRelations": false`（默认值）允许否定排序关系运算符的左侧（`<`, `>`, `<=`, `>=`）。
* `"enforceForOrderingRelations": true` 不允许对排序关系运算符的左侧进行否定。

### enforceForOrderingRelations

如果该选项设置为 `true`，该规则将单独强制执行：

* `<` operator.
* `>` operator.
* `<=` operator.
* `>=` operator.

其目的是为了避免诸如 `!a < b`（相当于 `(a ? 0 : 1) < b`）的表达，而真正的目的是 `!(a < b)`。

使用此规则与 `{ "enforceForOrderingRelations": true }` 选项的额外**错误**示例：

::: incorrect

```js
/*eslint no-unsafe-negation: ["error", { "enforceForOrderingRelations": true }]*/

if (! a < b) {}

while (! a > b) {}

foo = ! a <= b;

foo = ! a >= b;
```

:::

## 何时不用

如果你不想通知不安全的逻辑否定句，那么你可以安全地禁用此规则。
