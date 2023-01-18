---
title: no-self-assign
rule_type: problem
---

自我赋值没有效果，所以可能那些是由于不完整的重构而产生的错误。
这些表明你应该做的事情仍然存在。

```js
foo = foo;
[bar, baz] = [bar, qiz];
```

## 规则细节

这条规则的目的是消除自我分配。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-self-assign: "error"*/

foo = foo;

[a, b] = [a, b];

[a, ...b] = [x, ...b];

({a, b} = {a, x});

foo &&= foo;
foo ||= foo;
foo ??= foo;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-self-assign: "error"*/

foo = bar;
[a, b] = [b, a];

// This pattern is warned by the `no-use-before-define` rule.
let foo = foo;

// The default values have an effect.
[foo = 1] = [foo];

// non-self-assignments with properties.
obj.a = obj.b;
obj.a.b = obj.c.b;
obj.a.b = obj.a.c;
obj[a] = obj["a"];

// This ignores if there is a function call.
obj.a().b = obj.a().b;
a().b = a().b;

// `&=` and `|=` have an effect on non-integers.
foo &= foo;
foo |= foo;

// Known limitation: this does not support computed properties except single literal or single identifier.
obj[a + b] = obj[a + b];
obj["a" + "b"] = obj["a" + "b"];
```

:::

## 选项

这个规则也有检查属性的选项。

```json
{
    "no-self-assign": ["error", {"props": true}]
}
```

* `props` - 如果这是 `true`，`no-self-assign` 规则会警告属性的自我分配。默认为 `true`。

### props

使用 `{ "props": false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-self-assign: ["error", {"props": false}]*/

// self-assignments with properties.
obj.a = obj.a;
obj.a.b = obj.a.b;
obj["a"] = obj["a"];
obj[a] = obj[a];
```

:::

## 何时不用

如果你不想通知自己的任务，你可以安全地禁用这个规则。
