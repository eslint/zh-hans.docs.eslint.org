---
title: constructor-super
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/constructor-super.md
rule_type: problem
---

派生类的构造者必须调用 `super()`。
非派生类的构造器不得调用` super()`。
如果不遵守这一点，JavaScript 引擎将引发一个运行时错误。

这条规则检查是否有一个有效的`super()`调用。

## 规则细节

这条规则旨在标记无效的/缺失的`super()`调用。

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint constructor-super: "error"*/
/*eslint-env es6*/

class A {
    constructor() {
        super();  // This is a SyntaxError.
    }
}

class A extends B {
    constructor() { }  // Would throw a ReferenceError.
}

// Classes which inherits from a non constructor are always problems.
class A extends null {
    constructor() {
        super();  // Would throw a TypeError.
    }
}

class A extends null {
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

class A extends B {
    constructor() {
        super();
    }
}
```

:::

## 何时不用

如果你不想被通知构造函数中无效/缺失的 `super()` 调用，你可以安全地禁用这一规则。
