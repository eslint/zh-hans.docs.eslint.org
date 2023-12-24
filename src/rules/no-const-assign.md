---
title: no-const-assign
rule_type: problem
handled_by_typescript: true
---

我们不能修改使用 `const` 关键字声明的变量。
它将引发运行时错误。

在非 ES2015 环境下，它可能仅仅被忽略。

## 规则细节

这条规则的目的是标记修改使用 `const` 关键字声明的变量。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

const a = 0;
a = 1;
```

:::

::: incorrect

```js
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

const a = 0;
a += 1;
```

:::

::: incorrect

```js
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

const a = 0;
++a;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

const a = 0;
console.log(a);
```

:::

::: correct

```js
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

for (const a in [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
    console.log(a);
}
```

:::

::: correct

```js
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

for (const a of [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
    console.log(a);
}
```

:::

## 何时不用

如果你不关心使用 `const` 关键字声明的变量是否被修改，你可以安全地禁用这个规则。
