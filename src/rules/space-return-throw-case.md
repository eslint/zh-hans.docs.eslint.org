---
title: space-return-throw-case

---

要求在 `return`、`throw` 和 `case` 等关键词后有空格。

（已移除）此规则在 ESLint v2.0 中移除并被 [keyword-spacing](keyword-spacing) 所取代。

（可修复）`--fix` 选项在[命令行](../user-guide/command-line-interface#--fix)中自动修复该规则报告的问题。

要求在 `return`、`throw` 和 `case` 后面有空格。

## 规则细节

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint space-return-throw-case: "error"*/

throw{a:0}

function f(){ return-a; }

switch(a){ case'a': break; }
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint space-return-throw-case: "error"*/

throw {a: 0};

function f(){ return -a; }

switch(a){ case 'a': break; }
```

:::
