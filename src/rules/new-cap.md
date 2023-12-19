---
title: new-cap
rule_type: suggestion
---

JavaScript 中的 `new` 运算符可以创建一个特定类型对象的新实例。该类型的对象由一个构造函数表示。由于构造函数只是普通的函数，唯一的定义特征是 `new` 被作为调用的一部分。原生的 JavaScript 函数以大写字母开始，以区分那些作为构造函数的函数和非构造函数。许多风格指南都建议遵循这种模式，以便更容易地确定哪些函数是作为构造函数使用的。

```js
var friend = new Person();
```

## 规则细节

这条规则要求构造函数名称以大写字母开头。某些内置标识符不受此规则约束。这些标识符是：

* `Array`
* `Boolean`
* `Date`
* `Error`
* `Function`
* `Number`
* `Object`
* `RegExp`
* `String`
* `Symbol`
* `BigInt`

使用此规则的**正确**示例：

::: correct

```js
/*eslint new-cap: "error"*/

function foo(arg) {
    return Boolean(arg);
}
```

:::

## 选项

此规则选项为对象：

* `"newIsCap": true`（默认值）要求使用 `new` 运算符调用大写字母开始的函数。
* `"newIsCap": false` 允许使用 `new` 运算符调用小写字母开始的函数或大写字母开始的函数。
* `"capIsNew": true`（默认值）要求使用 `new` 运算符调用所有大写字母开始的函数。
* `"capIsNew": false` 允许在没有 `new` 运算符的情况下调用大写字母启动的函数。
* `"newIsCapExceptions"` 允许使用 `new` 运算符调用指定的小写启动的函数名称。
* `"newIsCapExceptionPattern"` 允许使用 `new` 运算符调用任何符合指定的 regex 模式的小写字母开始的函数名称。
* `"capIsNewExceptions"` 允许在没有 `new` 运算符的情况下调用指定的大写字母开始的函数名。
* `"capIsNewExceptionPattern"` 允许在没有 `new` 运算符的情况下，调用任何符合指定的 regex 模式的大写字母开始的函数名称。
* `"properties": true`（默认值）允许检查对象的属性。
* `"properties": false` 禁用对对象属性的检查。

### newIsCap

使用此规则与默认的 `{ "newIsCap": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint new-cap: ["error", { "newIsCap": true }]*/

var friend = new person();
```

:::

使用此规则与默认的 `{ "newIsCap": true }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "newIsCap": true }]*/

var friend = new Person();
```

:::

使用此规则与 `{ "newIsCap": false }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "newIsCap": false }]*/

var friend = new person();
```

:::

### capIsNew

使用此规则与默认的 `{ "capIsNew": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint new-cap: ["error", { "capIsNew": true }]*/

var colleague = Person();
```

:::

使用此规则与默认的 `{ "capIsNew": true }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNew": true }]*/

var colleague = new Person();
```

:::

使用此规则与 `{ "capIsNew": false }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNew": false }]*/

var colleague = Person();
```

:::

### newIsCapExceptions

使用此规则与额外的 `{ "newIsCapExceptions": ["events"] }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "newIsCapExceptions": ["events"] }]*/

var events = require('events');

var emitter = new events();
```

:::

### newIsCapExceptionPattern

使用此规则与额外的 `{ "newIsCapExceptionPattern": "^person\\." }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "newIsCapExceptionPattern": "^person\\.." }]*/

var friend = new person.acquaintance();

var bestFriend = new person.friend();
```

:::

使用此规则与额外的 `{ "newIsCapExceptionPattern": "\\.bar$" }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "newIsCapExceptionPattern": "\\.bar$" }]*/

var friend = new person.bar();
```

:::

### capIsNewExceptions

使用此规则与额外的 `{ "capIsNewExceptions": ["Person"] }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptions": ["Person"] }]*/

function foo(arg) {
    return Person(arg);
}
```

:::

### capIsNewExceptionPattern

使用此规则与额外的 `{ "capIsNewExceptionPattern": "^person\\." }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "^person\\.." }]*/

var friend = person.Acquaintance();
var bestFriend = person.Friend();
```

:::

使用此规则与额外的 `{ "capIsNewExceptionPattern": "\\.Bar$" }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "\\.Bar$" }]*/

foo.Bar();
```

:::

使用此规则与额外的 `{ "capIsNewExceptionPattern": "^Foo" }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "^Foo" }]*/

var x = Foo(42);

var y = Foobar(42);

var z = Foo.Bar(42);
```

:::

### properties

使用此规则与默认的 `{ "properties": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint new-cap: ["error", { "properties": true }]*/

var friend = new person.acquaintance();
```

:::

使用此规则与默认的 `{ "properties": true }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "properties": true }]*/

var friend = new person.Acquaintance();
```

:::

使用此规则与 `{ "properties": false }` 选项的**正确**示例：

::: correct

```js
/*eslint new-cap: ["error", { "properties": false }]*/

var friend = new person.acquaintance();
```

:::

## 何时不用

如果你的习惯不要求构造函数使用大写字母，或者不要求大写的函数只能作为构造函数使用，请关闭此规则。
