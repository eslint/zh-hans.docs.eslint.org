---
title: no-nested-ternary
layout: doc
rule_type: suggestion
related_rules:
- no-ternary
- no-unneeded-ternary
---

嵌套三元表达式会使代码更难理解。

```js
var foo = bar ? baz : qux === quxx ? bing : bam;
```

## 规则细节

`no-nested-ternary` 规则不允许使用嵌套的三元表达式。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-nested-ternary: "error"*/

var thing = foo ? bar : baz === qux ? quxx : foobar;

foo ? baz === qux ? quxx() : foobar() : bar();
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-nested-ternary: "error"*/

var thing = foo ? bar : foobar;

var thing;

if (foo) {
  thing = bar;
} else if (baz === qux) {
  thing = quxx;
} else {
  thing = foobar;
}
```

:::
