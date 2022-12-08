---
title: consistent-this
layout: doc
rule_type: suggestion
---

通常有必要捕获当前的执行环境，以使其随后可用。这方面一个突出的例子是 jQuery 的回调。

```js
var that = this;
jQuery('li').click(function (event) {
    // here, "this" is the HTMLElement where the click event occurred
    that.setFoo(42);
});
```

`this` 有许多常用别名，如 `that`、`self` 或 `me`。最好是确保团队同意的别名在整个应用中使用一致。

## 规则细节

这条规则对具有指定别名的 `this` 的变量强制执行了两件事。

* 如果一个有指定名字的变量被声明，它**必须**初始化（在声明中）或被赋值（在与声明相同的范围内）为 `this`。
* 如果一个变量被初始化或被赋值为 `this`，那么该变量的名称*必须*是一个指定的别名。

## 选项

这个规则有一个或多个字符串选项。

* 为 `this` 指定别名（默认为 `"that"`）

使用此规则与默认的 `"that"` 选项的**错误**示例：

::: incorrect

```js
/*eslint consistent-this: ["error", "that"]*/

var that = 42;

var self = this;

that = 42;

self = this;
```

:::

使用此规则与默认的 `"that"` 选项的**正确**示例：

::: correct

```js
/*eslint consistent-this: ["error", "that"]*/

var that = this;

var self = 42;

var self;

that = this;

foo.bar = this;
```

:::

如果变量没有被初始化，使用此规则与默认的 `"that"` 选项的**错误**示例：

::: incorrect

```js
/*eslint consistent-this: ["error", "that"]*/

var that;
function f() {
    that = this;
}
```

:::

如果变量没有被初始化，使用此规则与默认的 `"that"` 选项的**正确**示例：

::: correct

```js
/*eslint consistent-this: ["error", "that"]*/

var that;
that = this;

var foo, that;
foo = 42;
that = this;
```

:::

## 何时不用

如果你需要捕捉嵌套的上下文，`consistent-this` 就会有问题。这种性质的代码通常难以阅读和维护，你应该考虑重构它。
