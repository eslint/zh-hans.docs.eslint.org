---
title: no-unreachable
rule_type: problem
handled_by_typescript: true
---

因为 `return`、`throw`、`break` 和 `continue` 语句无条件地退出一个代码块，它们之后的任何语句都不能被执行。不会用到的语句通常是一个错误。

```js
function fn() {
    x = 1;
    return x;
    x = 3; // this will never execute
}
```

另一种错误是在子类中定义实例字段，其构造函数没有调用 `super()`。子类的实例字段只有在 `super()` 之后才会被添加到实例中。如果没有 `super()` 的调用，它们的定义就永远不会被应用，因此是不可达的代码。

```js
class C extends B {
    #x; // this will never be added to instances

    constructor() {
        return {};
    }
}
```

## 规则细节

使用此规则禁用 `return`、`throw`、`continue` 和 `break` 后的不可达代码。此规则还标记了子类中实例字段的定义，其构造函数没有 `super()` 调用。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unreachable: "error"*/

function foo() {
    return true;
    console.log("done");
}

function bar() {
    throw new Error("Oops!");
    console.log("done");
}

while(value) {
    break;
    console.log("done");
}

throw new Error("Oops!");
console.log("done");

function baz() {
    if (Math.random() < 0.5) {
        return;
    } else {
        throw new Error();
    }
    console.log("done");
}

for (;;) {}
console.log("done");
```

:::

因为 JavaScript 函数和变量的提升，导致的此规则的**正确**示例：

::: correct

```js
/*eslint no-unreachable: "error"*/

function foo() {
    return bar();
    function bar() {
        return 1;
    }
}

function bar() {
    return x;
    var x;
}

switch (foo) {
    case 1:
        break;
        var x;
}
```

:::

此规则的额外**错误**示例：

::: incorrect

```js
/*eslint no-unreachable: "error"*/

class C extends B {
    #x; // unreachable
    #y = 1; // unreachable
    a; // unreachable
    b = 1; // unreachable

    constructor() {
        return {};
    }
}
```

:::

此规则的额外**正确**示例：

::: correct

```js
/*eslint no-unreachable: "error"*/

class D extends B {
    #x;
    #y = 1;
    a;
    b = 1;

    constructor() {
        super();
    }
}

class E extends B {
    #x;
    #y = 1;
    a;
    b = 1;

    // implicit constructor always calls `super()`
}

class F extends B {
    static #x;
    static #y = 1;
    static a;
    static b = 1;

    constructor() {
        return {};
    }
}
```

:::
