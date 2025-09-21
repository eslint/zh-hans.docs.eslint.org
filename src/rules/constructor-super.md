---
title: constructor-super
rule_type: problem
---

派生类的构造者必须调用 `super()`。
非派生类的构造器不得调用 `super()`。
如果不遵守这一点，JavaScript 引擎将抛出运行时错误。

此规则检查 `super()` 调用是否有效。

## 规则细节

此规则旨在标记无效/缺失的 `super()` 调用。

以下代码存在语法错误，因为它所在的类没有 `extends` 子句。

```js
class A {
    constructor() {
        super();
    }
}
```

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint constructor-super: "error"*/
/*eslint-env es6*/

class A extends B {
    constructor() { }  // Would throw a ReferenceError.
}

// Classes which inherits from a non constructor are always problems.
class C extends null {
    constructor() {
        super();  // Would throw a TypeError.
    }
}

class D extends null {
    constructor() { }  // Would throw a ReferenceError.
}
```

:::

使用此规则的**正确**示例：

:::correct

```js
/*eslint constructor-super: "error"*/
/*eslint-env es6*/

class A {
    constructor() { }
}

class B extends C {
    constructor() {
        super();
    }
}
```

:::

## 何时不用

如果你不想被告知构造函数中无效/缺失的 `super()` 调用，你可以安全地禁用这一规则。

使用 TypeScript 时，也可以安全地禁用此规则，因为 TypeScript 编译器会执行此检查（`ts(2335) & ts(2377)`）。
