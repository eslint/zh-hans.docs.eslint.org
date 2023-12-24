---
title: no-invalid-this
rule_type: suggestion
handled_by_typescript: true
extra_typescript_info: 注意从技术上讲 TypeScript 只会在启用了 `strict` 或 `noImplicitThis` 标志时才会捕获这种情况。大多数 TypeScript 项目都启用了这些标志，因为它被认为是最佳实践。
---

在严格模式下，类或类状对象之外的 `this` 关键字可能是 `undefined`，并引发 `TypeError`。

## 规则细节

这条规则的目的是在 `this` 的值为 `undefined` 的情况下标记 `this` 关键字的使用。

脚本中的顶级 `this` 总是被认为是有效的，因为它指的是全局对象，与严格模式无关。

ECMAScript 模块中的顶级 `this` 总是被认为是无效的，因为它的值是 `undefined`。

对于函数中的 `this`，这个规则基本上是检查包含 `this` 关键字的函数是否是构造函数或方法。请注意，箭头函数有词法 `this`，因此本规则会检查其包围的上下文。

这条规则从以下条件判断该函数是否是构造函数。

* 函数的名称以大写字母开头。
* 该函数被分配给一个以大写字母开头的变量。
* 该函数是 ES2015 类的一个构造函数。

本规则从以下条件判断该函数是否是一个方法：

* 该函数是在一个对象字面上。
* 该函数被分配给一个属性。
* 该函数是 ES2015 类的一个方法/获取器/设置器。

这条规则允许在下面的函数中使用 `this` 关键字。

* 该函数的 `call/apply/bind` 方法被直接调用。
* 如果给定了 `thisArg`，该函数是数组方法的回调（例如 `.forEach()`）。
* 该函数在其 JSDoc 注释中有 `@this` 标签。

而这一规则在以下情况下总是允许 `this` 关键字：

* 在脚本的顶层
* 在类的字段初始化器中
* 在类的静态块中

否则将被视为有问题。

这条规则只适用于**在严格模式**下。
在 ESLint 中配置 `"parserOptions": { "sourceType": "module" }`，即使没有 `"use strict"` 指令，你的代码也处于严格模式下。

在严格模式下使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-invalid-this: "error"*/
/*eslint-env es6*/

"use strict";

(function() {
    this.a = 0;
    baz(() => this);
})();

function foo() {
    this.a = 0;
    baz(() => this);
}

var foo = function() {
    this.a = 0;
    baz(() => this);
};

foo(function() {
    this.a = 0;
    baz(() => this);
});

var obj = {
    aaa: function() {
        return function foo() {
            // There is in a method `aaa`, but `foo` is not a method.
            this.a = 0;
            baz(() => this);
        };
    }
};

foo.forEach(function() {
    this.a = 0;
    baz(() => this);
});
```

:::

在严格模式下，使用此规则的**正确**示例：

::: correct

```js
/*eslint no-invalid-this: "error"*/
/*eslint-env es6*/

"use strict";

this.a = 0;
baz(() => this);

function Foo() {
    // OK, this is in a legacy style constructor.
    this.a = 0;
    baz(() => this);
}

class Foo {
    constructor() {
        // OK, this is in a constructor.
        this.a = 0;
        baz(() => this);
    }
}

var obj = {
    foo: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }
};

var obj = {
    foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }
};

var obj = {
    get foo() {
        // OK, this is in a method (this function is on object literal).
        return this.a;
    }
};

var obj = Object.create(null, {
    foo: {value: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }}
});

Object.defineProperty(obj, "foo", {
    value: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }
});

Object.defineProperties(obj, {
    foo: {value: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }}
});

function Foo() {
    this.foo = function foo() {
        // OK, this is in a method (this function assigns to a property).
        this.a = 0;
        baz(() => this);
    };
}

obj.foo = function foo() {
    // OK, this is in a method (this function assigns to a property).
    this.a = 0;
};

Foo.prototype.foo = function foo() {
    // OK, this is in a method (this function assigns to a property).
    this.a = 0;
};

class Foo {

    // OK, this is in a class field initializer.
    a = this.b;

    // OK, static initializers also have valid this.
    static a = this.b;

    foo() {
        // OK, this is in a method.
        this.a = 0;
        baz(() => this);
    }

    static foo() {
        // OK, this is in a method (static methods also have valid this).
        this.a = 0;
        baz(() => this);
    }

    static {
        // OK, static blocks also have valid this.
        this.a = 0;
        baz(() => this);
    }
}

var foo = (function foo() {
    // OK, the `bind` method of this function is called directly.
    this.a = 0;
}).bind(obj);

foo.forEach(function() {
    // OK, `thisArg` of `.forEach()` is given.
    this.a = 0;
    baz(() => this);
}, thisArg);

/** @this Foo */
function foo() {
    // OK, this function has a `@this` tag in its JSDoc comment.
    this.a = 0;
}
```

:::

## 选项

这个规则有一个对象选项：

* `"capIsConstructor": false`（默认为 `true`）禁止假设名称以大写字母开头的函数是一个构造函数。

### capIsConstructor

默认情况下，这条规则总是允许在名称以大写字母开头的函数和被分配到名称以大写字母开头的变量的匿名函数中使用 `this`，假设这些函数是作为构造函数使用。

如果你希望这些函数被当作“普通”函数，请将 `capIsConstructor` 设置为 `false`。

使用此规则并将 `capIsConstructor` 选项设置为 `false` 时的**错误**示例：

::: incorrect

```js
/*eslint no-invalid-this: ["error", { "capIsConstructor": false }]*/

"use strict";

function Foo() {
    this.a = 0;
}

var bar = function Foo() {
    this.a = 0;
}

var Bar = function() {
    this.a = 0;
};

Baz = function() {
    this.a = 0;
};
```

:::

使用此规则并将 `"capIsConstructor"` 选项设置为 `false` 时的**正确**示例：

::: correct

```js
/*eslint no-invalid-this: ["error", { "capIsConstructor": false }]*/

"use strict";

obj.Foo = function Foo() {
    // OK, this is in a method.
    this.a = 0;
};
```

:::

## 何时不用

如果你不希望被通知在类或类似类的对象之外使用 `this` 关键字，你可以安全地禁用这个规则。
