---
title: no-div-regex
layout: doc
rule_type: suggestion
related_rules:
- no-control-regex
- no-regex-spaces
---

要求铰链字词转义为除法运算符。

```js
function bar() { return /=foo/; }
```

## 规则细节

这是用来消除除法运算符的歧义，以免混淆用户。

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint no-div-regex: "error"*/

function bar() { return /=foo/; }
```

:::

使用此规则的**正确**示例：

:::correct

```js
/*eslint no-div-regex: "error"*/

function bar() { return /[=]foo/; }
```

:::
