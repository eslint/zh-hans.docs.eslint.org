---
title: no-shadow-restricted-names
layout: doc
rule_type: suggestion
related_rules:
- no-shadow
further_reading:
- https://es5.github.io/#x15.1.1
- https://es5.github.io/#C
---

ES5 §15.1.1 全局对象的值属性（`NaN`、`Infinity`、`undefined`）以及严格模式的限制性标识符 `eval` 和 `arguments` 被认为是 JavaScript 中的限制性名称。将它们定义为其他含义可能会产生意想不到的后果，并使其他人在阅读代码时感到困惑。例如，没有什么可以阻止你写：

```js
var undefined = "foo";
```

那么在同一范围内使用的任何代码都不会得到全局的 `undefined`，而是具有非常不同含义的本地版本。

## 规则细节

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-shadow-restricted-names: "error"*/

function NaN(){}

!function(Infinity){};

var undefined = 5;

try {} catch(eval){}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-shadow-restricted-names: "error"*/

var Object;

function f(a, b){}

// Exception: `undefined` may be shadowed if the variable is never assigned a value.
var undefined;
```

:::
