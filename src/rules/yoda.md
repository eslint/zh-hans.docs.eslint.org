---
title: yoda
layout: doc
rule_type: suggestion
further_reading:
- https://en.wikipedia.org/wiki/Yoda_conditions
- http://thomas.tuerke.net/on/design/?with=1249091668#msg1146181680
---

尤达条件之所以被命名为尤达，是因为条件的字面量值在前，而变量在后。例如，下面就是一个尤达条件：

```js
if ("red" === color) {
    // ...
}
```

这被称为尤达条件，因为它的读法是：“如果红色等于颜色”，与另一种安排操作数的方式相比，类似于《星球大战》中人物尤达的说话方式。

```js
if (color === "red") {
    // ...
}
```

这通常读作：“如果颜色等于红色”，可以说这是一种更自然的描述比较的方式。

尤达条件的支持者强调，不可能错误地使用 `=` 而非 `==`，因为你不能赋值给一个字面值。这样做会导致语法错误，你会在早期就被告知这个错误。因此，这种做法在早期编程中非常普遍，因为当时还没有工具。

尤达条件的反对者指出，工具化使我们成为更好的程序员，因为工具会捕捉到错误地使用 `=` 而不是 `==` 的情况（ESLint 会帮你捕捉到）。因此，他们认为，该模式的效用并没有超过使用 尤达条件时代码的可读性所受到的冲击。

## 规则细节

这条规则的目的是强制执行一致的条件风格，将一个变量与一个字面值进行比较。

## 选项

这个规则可以采取一个字符串选项：

* 如果是默认的 `"never"`，那么比较决不能是尤达条件。
* 如果是 `"always"`，那么字面量值必须总是排在前面。

默认的 `"never"` 选项在对象字面中可以有异常选项。

* 如果 `"exceptRange"` 属性为 `true`，该规则**允许**在范围比较中使用小括号直接包裹的 尤达条件，包括 `if` 或 `while` 条件的小括号。默认值是 `false`。一个**范围**比较测试一个变量是在两个字面值之间的范围之内还是之外。
* 如果 `"onlyEquality"` 属性为 `true`，该规则只报告平等运算符 `==` 和 `===` 的尤达条件。默认值是 `false`。

`onlyEquality` 选项允许 `exceptRange` 所允许的例外的超集，因此这两个选项在一起没有用。

### never

使用默认的 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint yoda: "error"*/

if ("red" === color) {
    // ...
}

if (`red` === color) {
    // ...
}

if (`red` === `${color}`) {
    // ...
}

if (true == flag) {
    // ...
}

if (5 > count) {
    // ...
}

if (-1 < str.indexOf(substr)) {
    // ...
}

if (0 <= x && x < 1) {
    // ...
}
```

:::

使用默认的 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint yoda: "error"*/

if (5 & value) {
    // ...
}

if (value === "red") {
    // ...
}

if (value === `red`) {
    // ...
}

if (`${value}` === `red`) {

}
```

:::

### exceptRange

使用 `"never", { "exceptRange": true }` 选项的**正确**示例：

::: correct

```js
/*eslint yoda: ["error", "never", { "exceptRange": true }]*/

function isReddish(color) {
    return (color.hue < 60 || 300 < color.hue);
}

if (x < -1 || 1 < x) {
    // ...
}

if (count < 10 && (0 <= rand && rand < 1)) {
    // ...
}

if (`blue` < x && x < `green`) {
    // ...
}

function howLong(arr) {
    return (0 <= arr.length && arr.length < 10) ? "short" : "long";
}
```

:::

### onlyEquality

使用 `"never", { "onlyEquality": true }` 选项的**正确**示例：

::: correct

```js
/*eslint yoda: ["error", "never", { "onlyEquality": true }]*/

if (x < -1 || 9 < x) {
}

if (x !== 'foo' && 'bar' != x) {
}

if (x !== `foo` && `bar` != x) {
}
```

:::

### always

使用 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint yoda: ["error", "always"]*/

if (color == "blue") {
    // ...
}

if (color == `blue`) {
    // ...
}
```

:::

使用 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint yoda: ["error", "always"]*/

if ("blue" == value) {
    // ...
}

if (`blue` == value) {
    // ...
}

if (`blue` == `${value}`) {
    // ...
}

if (-1 < str.indexOf(substr)) {
    // ...
}
```

:::
