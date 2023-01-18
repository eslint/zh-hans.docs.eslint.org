---
title: space-unary-word-ops

---

要求在单数词运算符后有空格。

（已移除）此规则在 ESLint v0.10.0 中移除并被 [space-unary-ops](space-unary-ops) 所取代。

要求在单数词运算符后有空格。

## 规则细节

使用此规则的**错误**示例：

::: incorrect

```js
typeof!a
```

:::

::: incorrect

```js
void{a:0}
```

:::

::: incorrect

```js
new[a][0]
```

:::

::: incorrect

```js
delete(a.b)
```

:::

使用此规则的**正确**示例：

::: correct

```js
delete a.b
```

:::

::: correct

```js
new C
```

:::

::: correct

```js
void 0
```

:::
