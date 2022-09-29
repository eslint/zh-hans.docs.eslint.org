---
title: arrow-parens
layout: doc
rule_type: layout
further_reading:
- https://github.com/airbnb/javascript#arrows--one-arg-parens
---

当箭头函数正好有一个参数时可以省略括号。在所有其他情况下，参数必须都必须用括号包起来。这条规则加强了箭头函数中括号的一致使用。

## 规则细节

这条规则在箭头函数参数周围强制使用小括号，而不考虑数位。比如：

```js
/*eslint-env es6*/

// 坏
a => {}

// 好
(a) => {}
```

遵循这种风格可以帮助你找到箭头函数（`=>`），它可能被错误地包含在一个条件中，而其目的是进行比较，如 `>=`。

```js
/*eslint-env es6*/

// 坏
if (a => 2) {
}

// 好
if (a >= 2) {
}
```

该规则还可以被配置为在不需要时不鼓励使用括号：

```js
/*eslint-env es6*/

// 坏
(a) => {}

// 好
a => {}
```

## 选项

这个规则有一个字符串选项和一个对象选项：

字符串选项是：

* `"always"`（默认值）要求在所有情况下都在参数周围加圆括号。
* `"as-needed"` 强制要求在可以省略的地方不使用圆括号。

`"as-needed"` 选项的变体的对象属性。

* `"requireForBlockBody": true` 修改了 as-needed 规则，以便在函数体处于指令块中（由大括号包围）时要求使用小括号。

### always

使用此规则与默认 `"always"` 选项的**错误**示例：

:::incorrect

```js
/*eslint arrow-parens: ["error", "always"]*/
/*eslint-env es6*/

a => {};
a => a;
a => {'\n'};
a.then(foo => {});
a.then(foo => a);
a(foo => { if (true) {} });
```

:::

使用此规则与默认 `"always"` 选项的**正确**示例：

:::correct

```js
/*eslint arrow-parens: ["error", "always"]*/
/*eslint-env es6*/

() => {};
(a) => {};
(a) => a;
(a) => {'\n'}
a.then((foo) => {});
a.then((foo) => { if (true) {} });
```

:::

#### If 语句

这个选项的好处之一是，它可以防止在条件语句中错误地使用箭头函数：

```js
/*eslint-env es6*/

var a = 1;
var b = 2;
// ...
if (a => b) {
 console.log('bigger');
} else {
 console.log('smaller');
}
// outputs 'bigger', not smaller as expected
```

`if` 语句的内容是一个箭头函数，而不是一个比较。

如果箭头函数是故意的，应该用圆括号包起来，以消除歧义。

```js
/*eslint-env es6*/

var a = 1;
var b = 0;
// ...
if ((a) => b) {
 console.log('truthy value returned');
} else {
 console.log('falsey value returned');
}
// outputs 'truthy value returned'
```

下面是这种行为的另一个例子：

```js
/*eslint-env es6*/

var a = 1, b = 2, c = 3, d = 4;
var f = a => b ? c: d;
// f = ?
```

`f` 是一个箭头函数，`a` 是参数，返回 `b ? c: d` 的结果。

这应该被改写成这样：

```js
/*eslint-env es6*/

var a = 1, b = 2, c = 3, d = 4;
var f = (a) => b ? c: d;
```

### as-needed

使用此规则与 `"as-needed"` 选项的**错误**示例：

:::incorrect

```js
/*eslint arrow-parens: ["error", "as-needed"]*/
/*eslint-env es6*/

(a) => {};
(a) => a;
(a) => {'\n'};
a.then((foo) => {});
a.then((foo) => a);
a((foo) => { if (true) {} });
const f = /** @type {number} */(a) => a + a;
const g = /* comment */ (a) => a + a;
const h = (a) /* comment */ => a + a;
```

:::

使用此规则与 `"as-needed"` 选项的**正确**示例：

:::correct

```js
/*eslint arrow-parens: ["error", "as-needed"]*/
/*eslint-env es6*/

() => {};
a => {};
a => a;
a => {'\n'};
a.then(foo => {});
a.then(foo => { if (true) {} });
(a, b, c) => a;
(a = 10) => a;
([a, b]) => a;
({a, b}) => a;
const f = (/** @type {number} */a) => a + a;
const g = (/* comment */ a) => a + a;
const h = (a /* comment */) => a + a;
```

:::

### requireForBlockBody

使用 `{ "requireForBlockBody": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint arrow-parens: [2, "as-needed", { "requireForBlockBody": true }]*/
/*eslint-env es6*/

(a) => a;
a => {};
a => {'\n'};
a.map((x) => x * x);
a.map(x => {
  return x * x;
});
a.then(foo => {});
```

:::

使用 `{ "requireForBlockBody": true }` 选项的**正确**示例：

:::correct

```js
/*eslint arrow-parens: [2, "as-needed", { "requireForBlockBody": true }]*/
/*eslint-env es6*/

(a) => {};
(a) => {'\n'};
a => ({});
() => {};
a => a;
a.then((foo) => {});
a.then((foo) => { if (true) {} });
a((foo) => { if (true) {} });
(a, b, c) => a;
(a = 10) => a;
([a, b]) => a;
({a, b}) => a;
```

:::
