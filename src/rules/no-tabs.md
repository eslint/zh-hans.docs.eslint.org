---
title: no-tabs
rule_type: layout
---

有些风格指南根本不允许使用制表符，包括在注释中。

## 规则细节

该规则寻找文件内的任何地方的标签：代码、注释或其他东西。

使用此规则的**错误**示例：

::: incorrect

```js
var a \t= 2;

/**
* \t\t it's a test function
*/
function test(){}

var x = 1; // \t test
```

:::

使用此规则的**正确**示例：

::: correct

```js
var a = 2;

/**
* it's a test function
*/
function test(){}

var x = 1; // test
```

:::

### 选项

这个规则有一个可选的对象选项，其属性如下：

* `allowIndentationTabs`（默认为 false）：如果设置为 true，那么该规则将不报告用于缩进的标签。

#### allowIndentationTabs

使用此规则与 `allowIndentationTabs: true` 选项的**正确**示例：

::: correct

```js
/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */

function test() {
\tdoSomething();
}

\t// comment with leading indentation tab
```

:::

## 何时不用

如果你已经建立了一个可以使用 tab 的标准，那么你可以禁用这个规则。

## 兼容

* **JSCS**：[disallowTabs](https://jscs-dev.github.io/rule/disallowTabs)
