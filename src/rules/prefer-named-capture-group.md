---
title: prefer-named-capture-group
layout: doc
rule_type: suggestion
related_rules:
- no-invalid-regexp
---

## 规则细节

随着 ECMAScript 2018 的登陆，命名的捕获组可以在正则表达式中使用，这可以提高其可读性。
本规则的目的是在正则表达式中使用命名的捕获组而不是编号的捕获组。

```js
const regex = /(?<year>[0-9]{4})/;
```

另外，如果你的目的不是要捕捉_结果，而只是表达另一种选择，那么就使用一个非捕捉组。

```js
const regex = /(?:cauli|sun)flower/;
```

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-named-capture-group: "error"*/

const foo = /(ba[rz])/;
const bar = new RegExp('(ba[rz])');
const baz = RegExp('(ba[rz])');

foo.exec('bar')[1]; // Retrieve the group result.
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-named-capture-group: "error"*/

const foo = /(?<id>ba[rz])/;
const bar = new RegExp('(?<id>ba[rz])');
const baz = RegExp('(?<id>ba[rz])');
const xyz = /xyz(?:zy|abc)/;

foo.exec('bar').groups.id; // Retrieve the group result.
```

:::

## 何时不用

如果你的目标是 ECMAScript 2017 和/或更早的环境，你不应该使用这个规则，因为这个 ECMAScript 功能只在 ECMAScript 2018 和/或更新的环境中被支持。
