---
title: no-constructor-return
layout: doc
rule_type: problem
---

在 JavaScript 中，在类的构造函数中返回一个值可能是一个错误。禁止这种模式可以防止因不熟悉语言或复制粘贴错误而导致的错误。

## 规则细节

在类的构造函数中，使用此规则禁用 return 语句。注意，允许在流控制下不返回任何东西。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-constructor-return: "error"*/

class A {
    constructor(a) {
        this.a = a;
        return a;
    }
}

class B {
    constructor(f) {
        if (!f) {
            return 'falsy';
        }
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-constructor-return: "error"*/

class C {
    constructor(c) {
        this.c = c;
    }
}

class D {
    constructor(f) {
        if (!f) {
            return;  // Flow control.
        }

        f();
    }
}
```

:::
