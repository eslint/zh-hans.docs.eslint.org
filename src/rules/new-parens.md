---
title: new-parens
rule_type: layout
---

当通 过`new` 关键字调用一个函数并且构造函数没有参数时，JavaScript 允许省略括号。然而，一些程序员认为，省略小括号与语言的其他部分不一致，从而使代码不那么清晰。

```js
var person = new Person;
```

## 规则细节

当使用 `new` 关键字调用没有参数的构造函数时，这条规则可以强制或不允许使用括号。

## 选项

这个规则有一个选项。

* `"always"` 在一个没有参数的新构造函数后执行小括号（默认）。
* `"never"` 在一个没有参数的新构造函数后，不执行小括号。

### always

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint new-parens: "error"*/

var person = new Person;
var person = new (Person);
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint new-parens: "error"*/

var person = new Person();
var person = new (Person)();
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint new-parens: ["error", "never"]*/

var person = new Person();
var person = new (Person)();
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint new-parens: ["error", "never"]*/

var person = new Person;
var person = (new Person);
var person = new Person("Name");
```

:::
