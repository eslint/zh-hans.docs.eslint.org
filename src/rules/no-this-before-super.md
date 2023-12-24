---
title: no-this-before-super
rule_type: problem
handled_by_typescript: true
---

在派生类的构造函数中，如果 `this`/`super` 在 `super()` 调用之前被使用，会引发引用错误。

本规则检查构造函数中的 `this`/`super` 关键字，然后报告那些在 `super()` 之前的关键字。

## 规则细节

这条规则的目的是在调用 `super()` 之前标记 `this`/`super` 关键字。

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-this-before-super: "error"*/
/*eslint-env es6*/

class A extends B {
    constructor() {
        this.a = 0;
        super();
    }
}

class A extends B {
    constructor() {
        this.foo();
        super();
    }
}

class A extends B {
    constructor() {
        super.foo();
        super();
    }
}

class A extends B {
    constructor() {
        super(this.foo());
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-this-before-super: "error"*/
/*eslint-env es6*/

class A {
    constructor() {
        this.a = 0; // OK, this class doesn't have an `extends` clause.
    }
}

class A extends B {
    constructor() {
        super();
        this.a = 0; // OK, this is after `super()`.
    }
}

class A extends B {
    foo() {
        this.a = 0; // OK. this is not in a constructor.
    }
}
```

:::

## 何时不用

如果你不想被通知在构造函数的 `super()` 前使用 `this`/`super`，你可以安全地禁用这一规则。
