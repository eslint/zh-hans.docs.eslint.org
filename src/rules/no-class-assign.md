---
title: no-class-assign
layout: doc
rule_type: problem
---

`ClassDeclaration` 创建了一个可修改的变量。

```js
/*eslint-env es6*/

class A { }
A = 0;
```

但在大多数情况下，这种修改是一个错误。

## 规则细节

这条规则的目的是标记修改类声明的变量。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

class A { }
A = 0;
```

:::

::: incorrect

```js
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

A = 0;
class A { }
```

:::

::: incorrect

```js
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

class A {
    b() {
        A = 0;
    }
}
```

:::

::: incorrect

```js
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

let A = class A {
    b() {
        A = 0;
        // `let A` is shadowed by the class name.
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

let A = class A { }
A = 0; // A is a variable.
```

:::

::: correct

```js
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

let A = class {
    b() {
        A = 0; // A is a variable.
    }
}
```

:::

::: correct

```js
/*eslint no-class-assign: 2*/
/*eslint-env es6*/

class A {
    b(A) {
        A = 0; // A is a parameter.
    }
}
```

:::

## 何时不用

如果你不希望被通知修改类声明的变量，你可以安全地禁用这个规则。
