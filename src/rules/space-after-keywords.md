---
title: space-after-keywords
layout: doc

---

强制执行关键词后的一致间距。

（移除）这条规则在 ESLint v2.0 中被**移除，被 [keyword-spacing](keyword-spacing)规则取代。

（可修复）[命令行](../user-guide/command-line-interface#-fix) 上的 `--fix` 选项会自动修复此规则所报告的问题。

一些风格指南会要求或不允许在某些关键词后面有空格。

```js
if (condition) {
    doSomething();
} else {
    doSomethingElse();
}

if(condition) {
    doSomething();
}else{
    doSomethingElse();
}
```

## 规则细节

这条规则将强制执行关键字 `if`、`else`、`for`、`while`、`do`、`switch`、`try`、`catch`、`finally` 和 `with` 后面间距的一致性。

这个规则需要一个参数。如果是 `"always"`，那么关键词后面必须有至少一个空格。如果是 `"never"` 的话，则后面不应该有空格。默认是 `"always"`。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint space-after-keywords: "error"*/

if(a) {}

if (a) {} else{}

do{} while (a);
```

:::

::: incorrect

```js
/*eslint space-after-keywords: ["error", "never"]*/

if (a) {}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint space-after-keywords: "error"*/

if (a) {}

if (a) {} else {}
```

:::

::: correct

```js
/*eslint space-after-keywords: ["error", "never"]*/

if(a) {}
```

:::
