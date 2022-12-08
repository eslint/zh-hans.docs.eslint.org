---
title: class-methods-use-this
layout: doc
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
---

如果一个类的方法没有使用 `this`，它有时可以被做成一个静态函数。如果你真的将该方法转化为静态函数，那么调用该方法的类的实例也必须转化为静态调用（`MyClass.callStaticMethod()`)

有可能出现不使用 `this` 的类方法，比如说：

```js
class A {
    constructor() {
        this.a = "hi";
    }

    print() {
        console.log(this.a);
    }

    sayHi() {
        console.log("hi");
    }
}

let a = new A();
a.sayHi(); // => "hi"
```

在上面的例子中，`sayHi` 方法没有使用 `this`，所以我们可以把它改成静态方法。

```js
class A {
    constructor() {
        this.a = "hi";
    }

    print() {
        console.log(this.a);
    }

    static sayHi() {
        console.log("hi");
    }
}

A.sayHi(); // => "hi"
```

在上面的例子中还要注意，如果你把一个方法换成静态方法，那么调用静态方法的类的**实例**（`let a = new A(); a.sayHi();`）必须更新为静态调用（`A.sayHi();`），而不是让类的实例调用这个方法

## 规则细节

这条规则旨在标记不使用 `this` 的类方法。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint class-methods-use-this: "error"*/
/*eslint-env es6*/

class A {
    foo() {
        console.log("Hello World");     /*error Expected 'this' to be used by class method 'foo'.*/
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint class-methods-use-this: "error"*/
/*eslint-env es6*/
class A {
    foo() {
        this.bar = "Hello World"; // OK, this is used
    }
}

class A {
    constructor() {
        // OK. constructor is exempt
    }
}

class A {
    static foo() {
        // OK. static methods aren't expected to use this.
    }

    static {
        // OK. static blocks are exempt.
    }
}
```

:::

## 选项

这个规则有两个选项：

* `"exceptMethods"` 允许指定的方法名被本规则忽略。
* `"enforceForClassFields"` 强制要求作为实例字段初始化器的函数使用 `this`（默认为 `true`）。

### exceptMethods

```js
"class-methods-use-this": [<enabled>, { "exceptMethods": [<...exceptions>] }]
```

`exceptMethods` 选项允许你传递一个数组的方法名称，你希望忽略这些方法的警告。例如，你可能有一个来自外部库的规范，要求你把一个方法作为普通函数（而不是静态方法）覆盖，并且在函数体中不使用 `this`。在这种情况下，你可以在警告中添加该方法来忽略。

使用此规则不使用 `exceptMethods`的**错误**示例：

::: incorrect

```js
/*eslint class-methods-use-this: "error"*/

class A {
    foo() {
    }
}
```

:::

使用此规则与 `exceptMethods` 的**正确**示例：

::: correct

```js
/*eslint class-methods-use-this: ["error", { "exceptMethods": ["foo", "#bar"] }] */

class A {
    foo() {
    }
    #bar() {
    }
}
```

:::

### enforceForClassFields

```js
"class-methods-use-this": [<enabled>, { "enforceForClassFields": true | false }]
```

`enforceForClassFields` 选项强制要求作为实例字段初始化器的箭头函数和函数表达式使用 `this`（默认为 `true`)。

使用此规则与默认的 `{ "enforceForClassFields": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint class-methods-use-this: ["error", { "enforceForClassFields": true }] */

class A {
    foo = () => {}
}
```

:::

使用此规则与默认的 `{ "enforceForClassFields": true }` 选项的**正确**示例：

::: correct

```js
/*eslint class-methods-use-this: ["error", { "enforceForClassFields": true }] */

class A {
    foo = () => {this;}
}
```

:::

使用此规则与 `{ "enforceForClassFields": false }` 选项的**正确**示例：

::: correct

```js
/*eslint class-methods-use-this: ["error", { "enforceForClassFields": false }] */

class A {
    foo = () => {}
}
```

:::
