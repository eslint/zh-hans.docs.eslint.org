---
title: no-catch-shadow
layout: doc
rule_type: suggestion
---

此规则在 ESLint v5.1.0 中被**废弃**。

在 IE 8 和更早的版本中，如果外层作用域中的变量与 catch clause 参数的名称相同，catch clause 参数可以覆盖该变量的值。

```js
var err = "x";

try {
    throw "problem";
} catch (err) {

}

console.log(err)    // err is 'problem', not 'x'
```

## 规则细节

这条规则的目的是防止在你的程序中出现意想不到的行为，这些行为可能是由 IE 8 和更早的版本中的一个错误引起的，在这个错误中，catch 子句的参数可以泄漏到外层作用域中。只要遇到与外层作用域中的变量同名的 catch 子句参数，本规则就会发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-catch-shadow: "error"*/

var err = "x";

try {
    throw "problem";
} catch (err) {

}

function err() {
    // ...
};

try {
    throw "problem";
} catch (err) {

}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-catch-shadow: "error"*/

var err = "x";

try {
    throw "problem";
} catch (e) {

}

function err() {
    // ...
};

try {
    throw "problem";
} catch (e) {

}
```

:::

## 何时不用

如果你不需要支持 IE 8 和更早的版本，你应该把这个规则关掉。
