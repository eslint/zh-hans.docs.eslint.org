---
title: no-script-url
layout: doc
rule_type: suggestion
further_reading:
- https://stackoverflow.com/questions/13497971/what-is-the-matter-with-script-targeted-urls
---

一些人认为 `javascript:` 链接是 `eval` 的一种形式。在 `javascript:` 链接中传递的代码必须由浏览器以处理 `eval` 的相同方式进行解析和评估。

## 规则细节

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-script-url: "error"*/

location.href = "javascript:void(0)";

location.href = `javascript:void(0)`;
```

:::

## 兼容

**JSHint**：此规则对应于 JSHint 的 `scripturl` 规则。
