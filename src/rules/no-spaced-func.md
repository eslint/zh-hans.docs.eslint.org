---
title: no-spaced-func
rule_type: layout
---

此规则在 ESLint v3.3.0 中被**废弃**并被 [func-call-spacing](func-call-spacing) 规则所取代。

虽然函数名与圆括号中的执行部分间可以有空白，但这种情况往往看起来更像是错误。

## 规则细节

这条规则不允许函数标识符和应用存在空袭。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-spaced-func: "error"*/

fn ()

fn
()
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-spaced-func: "error"*/

fn()
```

:::
