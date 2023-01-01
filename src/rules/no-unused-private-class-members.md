---
title: no-unused-private-class-members
rule_type: problem
---

在代码中声明了私有类成员，但没有在任何地方使用，这很可能是由于不完整的重构造成的错误。这样的类成员占用了代码中的空间，会导致读者的混淆。

## 规则细节

本规则报告未使用的私有类成员：

* 如果一个私有字段或方法的值从未被读取，则被认为是未使用的。
* 如果一个私有访问器从未被访问过（读或写），则被认为是未使用的。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unused-private-class-members: "error"*/

class Foo {
    #unusedMember = 5;
}

class Foo {
    #usedOnlyInWrite = 5;
    method() {
        this.#usedOnlyInWrite = 42;
    }
}

class Foo {
    #usedOnlyToUpdateItself = 5;
    method() {
        this.#usedOnlyToUpdateItself++;
    }
}

class Foo {
    #unusedMethod() {}
}

class Foo {
    get #unusedAccessor() {}
    set #unusedAccessor(value) {}
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-unused-private-class-members: "error"*/

class Foo {
    #usedMember = 42;
    method() {
        return this.#usedMember;
    }
}

class Foo {
    #usedMethod() {
        return 42;
    }
    anotherMethod() {
        return this.#usedMethod();
    }
}

class Foo {
    get #usedAccessor() {}
    set #usedAccessor(value) {}
    
    method() {
        this.#usedAccessor = 42;
    }
}
```

:::

## 何时不用

如果你不希望被通知到未使用的私有类成员，你可以安全地关闭这个规则。
