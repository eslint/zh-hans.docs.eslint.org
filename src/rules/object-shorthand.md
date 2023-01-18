---
title: object-shorthand
rule_type: suggestion
related_rules:
- no-useless-rename
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
---

ECMAScript 6 为定义对象字面方法和属性提供了一种简洁的形式。这种
语法可以使复杂的对象字面的定义更加简洁。

下面是几个使用 ES5 语法的常见例子。

```js
// properties
var foo = {
    x: x,
    y: y,
    z: z,
};

// methods
var foo = {
    a: function() {},
    b: function() {}
};
```

现在这里是 ES6 的等价物。

```js
/*eslint-env es6*/

// properties
var foo = {x, y, z};

// methods
var foo = {
    a() {},
    b() {}
};
```

## 规则细节

该规则强制使用速记语法。这适用于 适用于在对象字面中定义的所有方法（包括生成器）和任何属性，其中的键名与分配的变量名相匹配。

以下每个属性都会被警告：

```js
/*eslint object-shorthand: "error"*/
/*eslint-env es6*/

var foo = {
    w: function() {},
    x: function *() {},
    [y]: function() {},
    z: z
};
```

在这种情况下，预期的语法应该是：

```js
/*eslint object-shorthand: "error"*/
/*eslint-env es6*/

var foo = {
    w() {},
    *x() {},
    [y]() {},
    z
};
```

这条规则并不标记对象字面内的箭头函数。
以下情况将*不*警告。

```js
/*eslint object-shorthand: "error"*/
/*eslint-env es6*/

var foo = {
    x: (y) => y
};
```

## 选项

规则需要一个选项，指定它应该何时被应用。它可以被设置为以下值之一。

* `"always"`（默认值）希望尽可能使用该速记。
* `"methods"` 确保使用方法速记（也适用于生成器）。
* `"properties"` 确保使用属性速记（当键和变量名匹配时）。
* `"never"` 确保在任何对象字面中不使用属性或方法速记。
* `"consistent"` 确保在一个对象字面中使用所有速记方法或所有长式方法。
* `"consistent-as-needed"` 确保在一个对象字面中使用所有速记或所有长式，但尽可能确保使用所有速记。

你可以像这样在配置中设置该选项：

```json
{
    "object-shorthand": ["error", "always"]
}
```

此外，规则需要一个选项对象配置：

* `"avoidQuotes": true` 表示当对象键是一个字符串字面时，首选长式语法（默认为 `false`）。注意，只有当字符串选项被设置为 `"always"`、`"methods"` 或 `"properties"` 时，该选项才能被启用。
* `"ignoreConstructors": true`可以用来防止规则报告构造函数的错误。（默认情况下，规则对构造函数的处理与其他函数相同。) 注意，只有当字符串选项被设置为 `"always"` 或 `"methods"` 时，这个选项才能被启用。
* `"methodsIgnorePattern"`（`string`）对于名称与此重码模式匹配的方法，将不执行方法速记。注意，这个选项只能在字符串选项被设置为 `"always"` 或 `"methods"` 时使用。
* `"avoidExplicitReturnArrows": true` 表示方法优先于函数属性的明确返回箭头函数（默认情况下，规则允许这两种情况) 。注意，只有当字符串选项被设置为 `"always"` 或 `"methods"` 时，这个选项才能被启用。

### `avoidQuotes`

```json
{
    "object-shorthand": ["error", "always", { "avoidQuotes": true }]
}
```

使用此规则与 `"always", { "avoidQuotes": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-shorthand: ["error", "always", { "avoidQuotes": true }]*/
/*eslint-env es6*/

var foo = {
    "bar-baz"() {}
};
```

:::

使用此规则与 `"always", { "avoidQuotes": true }` 选项的**正确**示例：

::: correct

```js
/*eslint object-shorthand: ["error", "always", { "avoidQuotes": true }]*/
/*eslint-env es6*/

var foo = {
    "bar-baz": function() {},
    "qux": qux
};
```

:::

### `ignoreConstructors`

```json
{
    "object-shorthand": ["error", "always", { "ignoreConstructors": true }]
}
```

使用此规则与 `"always", { "ignoreConstructors": true }` 选项的**正确**示例：

::: correct

```js
/*eslint object-shorthand: ["error", "always", { "ignoreConstructors": true }]*/
/*eslint-env es6*/

var foo = {
    ConstructorFunction: function() {}
};
```

:::

### `methodsIgnorePattern`

使用此规则与 `"always", { "methodsIgnorePattern": "^bar$" }` 选项的**正确**示例：

::: correct

```js
/*eslint object-shorthand: ["error", "always", { "methodsIgnorePattern": "^bar$" }]*/
var foo = {
    bar: function() {}
};
```

:::

### `avoidExplicitReturnArrows`

```json
{
    "object-shorthand": ["error", "always", { "avoidExplicitReturnArrows": true }]
}
```

使用此规则与 `"always", { "avoidExplicitReturnArrows": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-shorthand: ["error", "always", { "avoidExplicitReturnArrows": true }]*/
/*eslint-env es6*/

var foo = {
  foo: (bar, baz) => {
    return bar + baz;
  },

  qux: (foobar) => {
    return foobar * 2;
  }
};
```

:::

使用此规则与 `"always", { "avoidExplicitReturnArrows": true }` 选项的**正确**示例：

::: correct

```js
/*eslint object-shorthand: ["error", "always", { "avoidExplicitReturnArrows": true }]*/
/*eslint-env es6*/

var foo = {
  foo(bar, baz) {
    return bar + baz;
  },

  qux: foobar => foobar * 2
};
```

:::

使用此规则与 `"consistent"` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-shorthand: [2, "consistent"]*/
/*eslint-env es6*/

var foo = {
    a,
    b: "foo",
};
```

:::

使用此规则与 `"consistent"` 选项的**正确**示例：

::: correct

```js
/*eslint object-shorthand: [2, "consistent"]*/
/*eslint-env es6*/

var foo = {
    a: a,
    b: "foo"
};

var bar = {
    a,
    b,
};
```

:::

使用与 `"consistent"` 非常相似的 `"consistent-as-needed"` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-shorthand: [2, "consistent-as-needed"]*/
/*eslint-env es6*/

var foo = {
    a: a,
    b: b,
};
```

:::

## 何时不用

任何还没有进入 ES6 环境的人都不会想应用这个规则。其他人可能会发现速记的简洁性 语法更难读，可能不想用这个规则来鼓励它。
