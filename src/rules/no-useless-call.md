---
title: no-useless-call
layout: doc
rule_type: suggestion
related_rules:
- prefer-spread
---

函数的调用可以通过 `Function.prototype.call()` 和 `Function.prototype.apply()` 来编写。
但是 `Function.prototype.call()` 和 `Function.prototype.apply()` 比正常的函数调用要慢一些。

## 规则细节

这条规则的目的是标明 `Function.prototype.call()` 和 `Function.prototype.apply()` 的用法，可以用正常的函数调用来代替。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-useless-call: "error"*/

// These are same as `foo(1, 2, 3);`
foo.call(undefined, 1, 2, 3);
foo.apply(undefined, [1, 2, 3]);
foo.call(null, 1, 2, 3);
foo.apply(null, [1, 2, 3]);

// These are same as `obj.foo(1, 2, 3);`
obj.foo.call(obj, 1, 2, 3);
obj.foo.apply(obj, [1, 2, 3]);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-useless-call: "error"*/

// The `this` binding is different.
foo.call(obj, 1, 2, 3);
foo.apply(obj, [1, 2, 3]);
obj.foo.call(null, 1, 2, 3);
obj.foo.apply(null, [1, 2, 3]);
obj.foo.call(otherObj, 1, 2, 3);
obj.foo.apply(otherObj, [1, 2, 3]);

// The argument list is variadic.
// Those are warned by the `prefer-spread` rule.
foo.apply(undefined, args);
foo.apply(null, args);
obj.foo.apply(obj, args);
```

:::

## 已知限制

这个规则以静态方式比较代码，检查 `thisArg` 是否被改变。
所以如果关于 `thisArg` 的代码是一个动态表达式，这个规则就不能正确判断。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-useless-call: "error"*/

a[i++].foo.call(a[i++], 1, 2, 3);
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-useless-call: "error"*/

a[++i].foo.call(a[i], 1, 2, 3);
```

:::

## 何时不用

如果你不想被通知不必要的 `.call()` 和 `.apply()`，你可以安全地禁用这个规则。
