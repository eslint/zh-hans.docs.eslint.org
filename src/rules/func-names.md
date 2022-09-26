---
title: func-names
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/func-names.md
rule_type: suggestion
further_reading:
- https://web.archive.org/web/20201112040809/http://markdaggett.com/blog/2013/02/15/functions-explained/
- https://2ality.com/2015/09/function-names-es6.html
---

一个越来越常见的模式是给函数表达式命名，以帮助调试。比如说：

```js
Foo.prototype.bar = function bar() {};
```

在上面的例子中，添加第二个 `bar` 是可选的。如果你不写函数名，那么当函数抛出异常时，你可能会在堆栈跟踪中得到类似于 `anonymous function` 的东西。如果你为一个函数表达式提供了选项名称，那么你将在堆栈跟踪中得到函数表达式的名称。

## 规则细节

这个规则可以强制或不允许使用命名的函数表达式。

## 选项

此规则选项为字符串：

* `"always"`（默认值）要求函数表达式有一个名字。
* `"as-needed"`要求函数表达式有一个名字，如果名字没有按照 ECMAScript 规范自动分配的话。
* `"never"` 不允许命名的函数表达式，除非在递归函数中，需要一个名字。

此规则选项为对象：

* `"generators": "always" | "as-needed" | "never"`
    * `"always"` 要求命名的生成器
    * `"as-needed"` 如果名字没有按照 ECMAScript 规范自动分配，则需要命名的生成器。
    * `"never"` 在可能的情况下不允许命名生成器。

当没有提供 `generators` 值时，生成器函数的行为就会回到基本选项。

请注意，`"always"` 和 `"as-needed"` 要求函数表达式和  `export default` 声明中的函数声明必须有名字。

### always

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-names: ["error", "always"]*/

Foo.prototype.bar = function() {};

const cat = {
  meow: function() {}
}

(function() {
    // ...
}())

export default function() {}
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint func-names: ["error", "always"]*/

Foo.prototype.bar = function bar() {};

const cat = {
  meow() {}
}

(function bar() {
    // ...
}())

export default function foo() {}
```

:::

### as-needed

ECMAScript 6 在所有函数上引入了 `name` 属性。`name` 的值是通过评估函数周围的代码来确定的，看是否可以推断出一个名字。例如，分配给一个变量的函数将自动拥有一个等于该变量名称的 `name` 属性。然后，`name` 的值被用于堆栈跟踪，以方便调试。

使用此规则与 `"as-needed"` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-names: ["error", "as-needed"]*/

Foo.prototype.bar = function() {};

(function() {
    // ...
}())

export default function() {}
```

:::

使用此规则与 `"as-needed"` 选项的**正确**示例：

::: correct

```js
/*eslint func-names: ["error", "as-needed"]*/

var bar = function() {};

const cat = {
  meow: function() {}
}

class C {
    #bar = function() {};
    baz = function() {};
}

quux ??= function() {};

(function bar() {
    // ...
}())

export default function foo() {}
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-names: ["error", "never"]*/

Foo.prototype.bar = function bar() {};

(function bar() {
    // ...
}())
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint func-names: ["error", "never"]*/

Foo.prototype.bar = function() {};

(function() {
    // ...
}())
```

:::

### generators

使用此规则与 `"always", { "generators": "as-needed" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-names: ["error", "always", { "generators": "as-needed" }]*/

(function*() {
    // ...
}())
```

:::

使用此规则与 `"always", { "generators": "as-needed" }` 选项的**正确**示例：

::: correct

```js
/*eslint func-names: ["error", "always", { "generators": "as-needed" }]*/

var foo = function*() {};
```

:::

使用此规则与 `"always", { "generators": "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-names: ["error", "always", { "generators": "never" }]*/

var foo = bar(function *baz() {});
```

:::

使用此规则与 `"always", { "generators": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint func-names: ["error", "always", { "generators": "never" }]*/

var foo = bar(function *() {});
```

:::

使用此规则与 `"as-needed", { "generators": "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-names: ["error", "as-needed", { "generators": "never" }]*/

var foo = bar(function *baz() {});
```

:::

使用此规则与 `"as-needed", { "generators": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint func-names: ["error", "as-needed", { "generators": "never" }]*/

var foo = bar(function *() {});
```

:::

使用此规则与 `"never", { "generators": "always" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-names: ["error", "never", { "generators": "always" }]*/

var foo = bar(function *() {});
```

:::

使用此规则与 `"never", { "generators": "always" }` 选项的**正确**示例：

::: correct

```js
/*eslint func-names: ["error", "never", { "generators": "always" }]*/

var foo = bar(function *baz() {});
```

:::

## 兼容

* **JSCS**：[requireAnonymousFunctions](https://jscs-dev.github.io/rule/requireAnonymousFunctions)
* **JSCS**：[disallowAnonymousFunctions](https://jscs-dev.github.io/rule/disallowAnonymousFunctions)
