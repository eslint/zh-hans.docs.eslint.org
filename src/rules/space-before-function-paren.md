---
title: space-before-function-paren
layout: doc
rule_type: layout
related_rules:
- space-after-keywords
- space-return-throw-case
---

当格式化一个函数时，在函数名或 `function` 关键字和开头的括号之间允许有空白。命名的函数也需要在 `function` 关键字和函数名之间有一个空格，但匿名函数不需要空格。比如：

```js
function withoutSpace(x) {
    // ...
}

function withSpace (x) {
    // ...
}

var anonymousWithoutSpace = function() {};

var anonymousWithSpace = function () {};
```

风格指南可能要求匿名函数在 `function` 关键字后有一个空格，而其他的则规定没有空格。同样地，函数名称后面的空格可能需要也可能不需要。

## 规则细节

这条规则的目的是在函数括号前执行一致的间距，因此，只要空白处不符合指定的偏好，就会发出警告。

## 选项

该规则有一个字符串选项或一个对象选项：

```js
{
    "space-before-function-paren": ["error", "always"],
    // 或
    "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "always"
    }],
}
```

* `always`（默认值）要求在参数的 `(` 后面有一个空格。
* `never` 不允许在参数的 `(` 后面有任何空格。

为了向后兼容，字符串选项不检查异步箭头函数表达式。

你也可以为每种类型的函数使用一个单独的选项。
以下每个选项都可以被设置为 `"always"`、`"never"`或 "忽略"。默认是 `"always"`。

* `anonymous` 是用于匿名函数表达式（如 `function () {}`）。
* `named` 用于命名函数表达式（如 `function foo () {}`）。
* `asyncArrow`用于异步箭头函数表达式（例如：`async () => {}`）。

### "always"

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-before-function-paren: "error"*/
/*eslint-env es6*/

function foo() {
    // ...
}

var bar = function() {
    // ...
};

var bar = function foo() {
    // ...
};

class Foo {
    constructor() {
        // ...
    }
}

var foo = {
    bar() {
        // ...
    }
};

var foo = async() => 1
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint space-before-function-paren: "error"*/
/*eslint-env es6*/

function foo () {
    // ...
}

var bar = function () {
    // ...
};

var bar = function foo () {
    // ...
};

class Foo {
    constructor () {
        // ...
    }
}

var foo = {
    bar () {
        // ...
    }
};

var foo = async () => 1
```

:::

### "never"

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-before-function-paren: ["error", "never"]*/
/*eslint-env es6*/

function foo () {
    // ...
}

var bar = function () {
    // ...
};

var bar = function foo () {
    // ...
};

class Foo {
    constructor () {
        // ...
    }
}

var foo = {
    bar () {
        // ...
    }
};

var foo = async () => 1
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint space-before-function-paren: ["error", "never"]*/
/*eslint-env es6*/

function foo() {
    // ...
}

var bar = function() {
    // ...
};

var bar = function foo() {
    // ...
};

class Foo {
    constructor() {
        // ...
    }
}

var foo = {
    bar() {
        // ...
    }
};

var foo = async() => 1
```

:::

### `{"anonymous": "always", "named": "never", "asyncArrow": "always"}`

使用此规则与 `{"anonymous": "always", "named": "never", "asyncArrow": "always"}` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-before-function-paren: ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}]*/
/*eslint-env es6*/

function foo () {
    // ...
}

var bar = function() {
    // ...
};

class Foo {
    constructor () {
        // ...
    }
}

var foo = {
    bar () {
        // ...
    }
};

var foo = async(a) => await a
```

:::

使用此规则与 `{"anonymous": "always", "named": "never", "asyncArrow": "always"}` 选项的**正确**示例：

::: correct

```js
/*eslint space-before-function-paren: ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}]*/
/*eslint-env es6*/

function foo() {
    // ...
}

var bar = function () {
    // ...
};

class Foo {
    constructor() {
        // ...
    }
}

var foo = {
    bar() {
        // ...
    }
};

var foo = async (a) => await a
```

:::

### `{"anonymous": "never", "named": "always"}`

使用此规则与 `{"anonymous": "never", "named": "always"}` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-before-function-paren: ["error", { "anonymous": "never", "named": "always" }]*/
/*eslint-env es6*/

function foo() {
    // ...
}

var bar = function () {
    // ...
};

class Foo {
    constructor() {
        // ...
    }
}

var foo = {
    bar() {
        // ...
    }
};
```

:::

使用此规则与 `{"anonymous": "never", "named": "always"}` 选项的**正确**示例：

::: correct

```js
/*eslint space-before-function-paren: ["error", { "anonymous": "never", "named": "always" }]*/
/*eslint-env es6*/

function foo () {
    // ...
}

var bar = function() {
    // ...
};

class Foo {
    constructor () {
        // ...
    }
}

var foo = {
    bar () {
        // ...
    }
};
```

:::

### `{"anonymous": "ignore", "named": "always"}`

使用此规则与 `{"anonymous": "ignore", "named": "always"}` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-before-function-paren: ["error", { "anonymous": "ignore", "named": "always" }]*/
/*eslint-env es6*/

function foo() {
    // ...
}

class Foo {
    constructor() {
        // ...
    }
}

var foo = {
    bar() {
        // ...
    }
};
```

:::

使用此规则与 `{"anonymous": "ignore", "named": "always"}` 选项的**正确**示例：

::: correct

```js
/*eslint space-before-function-paren: ["error", { "anonymous": "ignore", "named": "always" }]*/
/*eslint-env es6*/

var bar = function() {
    // ...
};

var bar = function () {
    // ...
};

function foo () {
    // ...
}

class Foo {
    constructor () {
        // ...
    }
}

var foo = {
    bar () {
        // ...
    }
};
```

:::

## 何时不用

如果你不关心函数括号前间距的一致性，你可以关闭这个规则。
