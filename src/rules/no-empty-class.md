---
title: no-empty-class

---

不允许正则表达式中出现空字符类。

（已移除）此规则在 ESLint v1.0 中移除并被 [no-empty-character-class](no-empty-character-class) 所取代。

正则表达式中的空字符类不匹配任何东西，可能导致代码不能按预期工作。

```js
var foo = /^abc[]/;
```

## 规则细节

这条规则旨在强调正则表达式中可能出现的输入错误和意外行为，这可能是由于使用了空字符类。

使用此规则的**错误**示例：

::: incorrect

```js
var foo = /^abc[]/;

/^abc[]/.test(foo);

bar.match(/^abc[]/);
```

:::

使用此规则的**正确**示例：

::: correct

```js
var foo = /^abc/;

var foo = /^abc[a-z]/;

var bar = new RegExp("^abc[]");
```

:::
