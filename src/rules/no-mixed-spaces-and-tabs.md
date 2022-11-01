---
title: no-mixed-spaces-and-tabs
layout: doc
rule_type: layout
further_reading:
- https://www.emacswiki.org/emacs/SmartTabs
---

大多数代码惯例要求缩进时使用制表符或空格。因此，如果一行代码同时使用制表符和空格缩进，通常是一个错误。

## 规则细节

这条规则不允许在缩进时混合使用空格和制表符。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-mixed-spaces-and-tabs: "error"*/

function add(x, y) {
// --->..return x + y;

      return x + y;
}

function main() {
// --->var x = 5,
// --->....y = 7;

    var x = 5,
        y = 7;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-mixed-spaces-and-tabs: "error"*/

function add(x, y) {
// --->return x + y;
    return x + y;
}
```

:::

## 选项

这个规则有一个字符串选项。

* `"smart-tabs"`当空格用于对齐时，允许混合制表符和空格。

### smart-tabs

使用此规则与 `"smart-tabs"` 选项的**正确**示例：

::: correct

```js
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

function main() {
// --->var x = 5,
// --->....y = 7;

    var x = 5,
        y = 7;
}
```

:::
