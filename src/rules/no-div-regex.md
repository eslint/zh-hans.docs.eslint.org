---
title: no-div-regex
rule_type: suggestion
related_rules:
- no-control-regex
- no-regex-spaces
---

正则表达式文字开头的字符 `/=` 可能与除法赋值运算符混淆。

```js
function bar() { return /=foo/; }
```

## 规则细节

该规则禁止在正则表达式文字开头的斜线（`/`）后使用等号（`=`），因为字符 `/=` 可能与除法赋值运算符相混淆。

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
