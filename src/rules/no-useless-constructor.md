---
title: no-useless-constructor
rule_type: suggestion
---

如果没有指定，ES2015 提供了一个默认的类构造函数。因此，没有必要提供一个空的构造函数或一个简单地委托给它的父类的构造函数，如下面的例子：

```js
class A {
    constructor () {
    }
}

class B extends A {
    constructor (value) {
      super(value);
    }
}
```

## 规则细节

这条规则标记了可以安全删除的类构造函数，而不改变类的工作方式。

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-useless-constructor: "error"*/
/*eslint-env es6*/

class A {
    constructor () {
    }
}

class B extends A {
    constructor (...args) {
      super(...args);
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-useless-constructor: "error"*/

class A { }

class A {
    constructor () {
        doSomething();
    }
}

class B extends A {
    constructor() {
        super('foo');
    }
}

class B extends A {
    constructor() {
        super();
        doSomething();
    }
}
```

:::

## 何时不用

如果你不希望被通知到不必要的构造函数，你可以安全地禁用这一规则。
