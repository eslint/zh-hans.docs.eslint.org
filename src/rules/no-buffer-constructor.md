---
title: no-buffer-constructor
rule_type: problem
further_reading:
- https://nodejs.org/api/buffer.html
- https://github.com/ChALkeR/notes/blob/master/Lets-fix-Buffer-API.md
- https://github.com/nodejs/node/issues/4660
---

此规则于 ESLint v7.0.0 中废弃，请使用 [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n) 中的对应规则代替。

在 Node.js 中，`Buffer` 构造函数的行为根据其参数的类型而不同。在没有验证其类型的情况下，将用户输入的参数传递给 `Buffer()`，会导致安全漏洞，如远程内存泄露和拒绝服务。因此，不应该使用废弃的构造函数 `Buffer` 构造函数。而应该使用 producer 方法 `Buffer.from`、`Buffer.alloc` 和 `Buffer.allocUnsafe` 代替。

## 规则细节

本规则不允许调用和构造 `Buffer()` 构造函数。

使用此规则的**错误**示例：

::: incorrect

```js
new Buffer(5);
new Buffer([1, 2, 3]);

Buffer(5);
Buffer([1, 2, 3]);

new Buffer(res.body.amount);
new Buffer(res.body.values);
```

:::

使用此规则的**正确**示例：

::: correct

```js
Buffer.alloc(5);
Buffer.allocUnsafe(5);
Buffer.from([1, 2, 3]);

Buffer.alloc(res.body.amount);
Buffer.from(res.body.values);
```

:::

## 何时不用

如果你不使用 Node.js，或者你仍然需要支持缺乏 `Buffer.from` 等方法的 Node.js 版本，那么你不应该启用这个规则。
