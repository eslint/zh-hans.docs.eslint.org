---
title: no-empty-function
rule_type: suggestion
related_rules:
- no-empty
---

空函数会降低可读性，因为读者需要猜测它是否是故意的。所以为空函数写一个明确的注释是一个好的做法。

```js
function foo() {
   // 什么也不做。
}
```

特别是，箭头函数的空块可能会使开发人员感到困惑。
这与空对象的字面量非常相似。

```js
list.map(() => {});   // This is a block, would return undefined.
list.map(() => ({})); // This is an empty object.
```

## 规则细节

这条规则的目的是消除空函数。
如果一个函数包含一个注释，则不会被认为是一个问题。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-empty-function: "error"*/
/*eslint-env es6*/

function foo() {}

var foo = function() {};

var foo = () => {};

function* foo() {}

var foo = function*() {};

var obj = {
    foo: function() {},

    foo: function*() {},

    foo() {},

    *foo() {},

    get foo() {},

    set foo(value) {}
};

class A {
    constructor() {}

    foo() {}

    *foo() {}

    get foo() {}

    set foo(value) {}

    static foo() {}

    static *foo() {}

    static get foo() {}

    static set foo(value) {}
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-empty-function: "error"*/
/*eslint-env es6*/

function foo() {
   // 什么也不做。
}

var foo = function() {
    // any clear comments.
};

var foo = () => {
    bar();
};

function* foo() {
   // 什么也不做。
}

var foo = function*() {
   // 什么也不做。
};

var obj = {
    foo: function() {
       // 什么也不做。
    },

    foo: function*() {
       // 什么也不做。
    },

    foo() {
       // 什么也不做。
    },

    *foo() {
       // 什么也不做。
    },

    get foo() {
       // 什么也不做。
    },

    set foo(value) {
       // 什么也不做。
    }
};

class A {
    constructor() {
       // 什么也不做。
    }

    foo() {
       // 什么也不做。
    }

    *foo() {
       // 什么也不做。
    }

    get foo() {
       // 什么也不做。
    }

    set foo(value) {
       // 什么也不做。
    }

    static foo() {
       // 什么也不做。
    }

    static *foo() {
       // 什么也不做。
    }

    static get foo() {
       // 什么也不做。
    }

    static set foo(value) {
       // 什么也不做。
    }
}
```

:::

## 选项

这个规则有一个选项，允许特定种类的函数为空。

* `allow`（`string[]`）- 一个允许空函数的种类列表。列表中的项目是以下一些字符串。默认是空数组（`[]`）。
    * `"functions"` - 普通函数。
    * `"arrowFunctions"` - 箭头函数。
    * `"generatorFunctions"` - 生成器函数。
    * `"methods"` - 类的方法和对象字面的方法缩写。
    * `"generatorMethods"` - 带有生成器的对象字面的类方法和方法速记。
    * `"getters"` - 获取器。
    * `"setters"` - 设置器。
    * `"constructors"` - 类的构造函数。
    * `"asyncFunctions"` - 异步函数。
    * `"asyncMethods"` - 异步类方法和对象字面的方法缩写。

### allow: functions

使用 `{ "allow": ["functions"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["functions"] }]*/

function foo() {}

var foo = function() {};

var obj = {
    foo: function() {}
};
```

:::

### allow: arrowFunctions

使用 `{ "allow": ["arrowFunctions"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["arrowFunctions"] }]*/
/*eslint-env es6*/

var foo = () => {};
```

:::

### allow: generatorFunctions

使用 `{ "allow": ["generatorFunctions"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["generatorFunctions"] }]*/
/*eslint-env es6*/

function* foo() {}

var foo = function*() {};

var obj = {
    foo: function*() {}
};
```

:::

### allow: methods

使用 `{ "allow": ["methods"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["methods"] }]*/
/*eslint-env es6*/

var obj = {
    foo() {}
};

class A {
    foo() {}
    static foo() {}
}
```

:::

### allow: generatorMethods

使用 `{ "allow": ["generatorMethods"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["generatorMethods"] }]*/
/*eslint-env es6*/

var obj = {
    *foo() {}
};

class A {
    *foo() {}
    static *foo() {}
}
```

:::

### allow: getters

使用 `{ "allow": ["getters"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["getters"] }]*/
/*eslint-env es6*/

var obj = {
    get foo() {}
};

class A {
    get foo() {}
    static get foo() {}
}
```

:::

### allow: setters

使用 `{ "allow": ["setters"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["setters"] }]*/
/*eslint-env es6*/

var obj = {
    set foo(value) {}
};

class A {
    set foo(value) {}
    static set foo(value) {}
}
```

:::

### allow: constructors

使用 `{ "allow": ["constructors"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["constructors"] }]*/
/*eslint-env es6*/

class A {
    constructor() {}
}
```

:::

### allow: asyncFunctions

使用 `{ "allow": ["asyncFunctions"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["asyncFunctions"] }]*/
/*eslint-env es2017*/

async function a(){}
```

:::

### allow: asyncMethods

使用 `{ "allow": ["asyncMethods"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["asyncMethods"] }]*/
/*eslint-env es2017*/

var obj = {
    async foo() {}
};

class A {
    async foo() {}
    static async foo() {}
}
```

:::

## 何时不用

如果你不希望被通知有空函数，你可以安全地禁用此规则。
