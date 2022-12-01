---
title: prefer-object-spread
layout: doc
rule_type: suggestion
---

当 Object.assign 被调用时，使用一个对象字头作为第一个参数，这条规则要求使用对象传播语法来代替。这条规则还警告说，如果 `Object.assign` 的调用使用一个单一的参数是一个对象字面，在这种情况下，`Object.assign` 的调用是不需要的。

在 ES2018 中引入的 object spread 是一种声明式的替代方法，它可能比更动态的、命令式的 `Object.assign` 表现得更好。

## 规则细节

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-object-spread: "error"*/

Object.assign({}, foo);

Object.assign({}, {foo: 'bar'});

Object.assign({ foo: 'bar'}, baz);

Object.assign({}, baz, { foo: 'bar' });

Object.assign({}, { ...baz });

// Object.assign with a single argument that is an object literal
Object.assign({});

Object.assign({ foo: bar });
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-object-spread: "error"*/

({ ...foo });

({ ...baz, foo: 'bar' });

// Any Object.assign call without an object literal as the first argument
Object.assign(foo, { bar: baz });

Object.assign(foo, bar);

Object.assign(foo, { bar, baz });

Object.assign(foo, { ...baz });
```

:::

## 何时不用

除非你的代码库中支持 ES2018，否则不应使用这一规则。
