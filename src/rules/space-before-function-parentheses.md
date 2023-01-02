---
title: space-before-function-parentheses

related_rules:
- space-after-keywords
- space-return-throw-case
---

在函数定义中打开小括号之前执行一致的间距。

（已移除）此规则在 ESLint v1.0 中移除并被 [space-before-function-paren](space-before-function-paren) 规则。该规则的名称从“parentheses”改为“paren”，以便与其他所取代的名称一致。

当格式化一个函数时，在函数名或 `function` 关键字和开头的 paren 之间允许有空格。命名的函数也需要在 `function` 关键字和函数名之间有一个空格，但匿名函数不需要空格。比如：

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

这条规则的目的是在函数括号前强制执行一致的间距，因此，只要空白处不符合指定的偏好，就会发出警告。

这条规则需要一个参数。如果它是 `"always"`，即默认的选项，所有命名函数和匿名函数的括号前必须有空格。如果是 `"never"`，那么所有命名的函数和匿名函数的括号前都不能有空格。如果你希望命名函数和匿名函数有不同的间距，你可以传递一个配置对象作为规则参数来单独配置（如 `{"anonymous": "always", "named": "never"}`）。

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
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
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
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
```

:::

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
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
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
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
```

:::

使用此规则与 `{"anonymous": "always", "named": "never"}` 选项的**错误**示例：

::: incorrect

```js
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

使用此规则与 `{"anonymous": "always", "named": "never"}` 选项的**正确**示例：

::: correct

```js
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

使用此规则与 `{"anonymous": "never", "named": "always"}` 选项的**错误**示例：

::: incorrect

```js
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

## 何时不用

如果你不关心函数括号前间距的一致性，你可以关闭这个规则。
