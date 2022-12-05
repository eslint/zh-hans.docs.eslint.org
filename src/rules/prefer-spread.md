---
title: prefer-spread
layout: doc
rule_type: suggestion
related_rules:
- no-useless-call
---

在 ES2015 之前，人们必须使用 `Function.prototype.apply()` 来调用变量函数。

```js
var args = [1, 2, 3, 4];
Math.max.apply(Math, args);
```

在 ES2015 中，人们可以使用扩展语法来调用 variadic 函数。

```js
/*eslint-env es6*/

var args = [1, 2, 3, 4];
Math.max(...args);
```

## 规则细节

这条规则的目的是在可以使用传播语法的情况下，标记出 `Function.prototype.apply()` 的用法。

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-spread: "error"*/

foo.apply(undefined, args);
foo.apply(null, args);
obj.foo.apply(obj, args);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-spread: "error"*/

// Using spread syntax
foo(...args);
obj.foo(...args);

// The `this` binding is different.
foo.apply(obj, args);
obj.foo.apply(null, args);
obj.foo.apply(otherObj, args);

// The argument list is not variadic.
// Those are warned by the `no-useless-call` rule.
foo.apply(undefined, [1, 2, 3]);
foo.apply(null, [1, 2, 3]);
obj.foo.apply(obj, [1, 2, 3]);
```

:::

已知限制：

这个规则静态地分析代码，检查 `this` 参数是否被改变。因此，如果 `this` 参数是在动态表达式中计算的，本规则不能检测到违规。

```js
/*eslint prefer-spread: "error"*/

// This warns.
a[i++].foo.apply(a[i++], args);

// This does not warn.
a[++i].foo.apply(a[i], args);
```

## 何时不用

不应该在 ES3/5 环境中使用此规则。

在 ES2015（ES6）或更高版本中，如果你不关心调用 `Function.prototype.apply()`，你可以安全地禁用这个规则。
