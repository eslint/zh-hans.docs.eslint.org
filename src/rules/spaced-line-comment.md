---
title: spaced-line-comment
layout: doc

related_rules:
- spaced-comment
---

在行注释中的 `//` 之后执行一致的间距。

（已移除）此规则在 ESLint v1.0 中移除并被 [spaced-comment](spaced-comment) 所取代。

一些风格指南要求或不允许在一行注释的最初的 `//` 之后有一个空白。
在 `//` 之后留白可以使注释中的文字更容易被阅读。
另一方面，如果不在 `//` 后面加一个空白，注释代码就会更容易。

## 规则细节

这条规则将强制执行行注释`//`开始后的间距的一致性。

这条规则需要两个参数。如果第一个参数是 `"always"`，那么 `//` 后面必须至少有一个空格。
如果是 `"never"`，那么后面就不应该有空格。
默认是 `"always"`。

第二个参数是一个对象，有一个键，`"exceptions"`。
该值是一个字符串模式的数组，被认为是规则的例外情况。
值得注意的是，如果第一个参数是 `"never"`，那么例外情况将被忽略。
例外不能混合使用。

使用此规则的**错误**示例：

::: incorrect

```js
// When ["never"]
// This is a comment with a whitespace at the beginning
```

:::

::: incorrect

```js
//When ["always"]
//This is a comment with no whitespace at the beginning
var foo = 5;
```

:::

::: incorrect

```js
// When ["always",{"exceptions":["-","+"]}]
//------++++++++
// Comment block
//------++++++++
```

:::

使用此规则的**正确**示例：

::: correct

```js
// When ["always"]
// This is a comment with a whitespace at the beginning
var foo = 5;
```

:::

::: correct

```js
//When ["never"]
//This is a comment with no whitespace at the beginning
var foo = 5;
```

:::

::: correct

```js
// When ["always",{"exceptions":["-"]}]
//--------------
// Comment block
//--------------
```

:::

::: correct

```js
// When ["always",{"exceptions":["-+"]}]
//-+-+-+-+-+-+-+
// Comment block
//-+-+-+-+-+-+-+
```

:::
