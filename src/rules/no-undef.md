---
title: no-undef
rule_type: problem
handled_by_typescript: true
related_rules:
- no-global-assign
- no-redeclare
---

这条规则可以帮助你定位潜在的 ReferenceErrors，它是由变量和参数名称的拼写错误或意外的隐含 globals（例如，由于忘记了 `for` 循环初始化器中的 `var` 关键字）导致的。

## 规则细节

任何对未声明变量的引用都会导致警告，除非该变量在 `/*global ...*/` 注释中明确提及，或者在配置文件中的 [`globals` key in the configuration file](../use/configure/language-options#using-configuration-files-1)。一个常见的使用情况是，如果你故意使用在其他地方定义的 globals（例如，在一个源自 HTML 的脚本中）。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-undef: "error"*/

var foo = someFunction();
var bar = a + 1;
```

:::

使用此规则与 `global` 声明的**正确**示例：

::: correct

```js
/*global someFunction, a*/
/*eslint no-undef: "error"*/

var foo = someFunction();
var bar = a + 1;
```

:::

注意，这条规则不允许对只读的全局变量进行赋值。
如果你也想禁止这些赋值，请参见 [no-global-assign](no-global-assign)。

这条规则也不允许对全局变量进行重新声明。
如果你也想禁止这些重新声明，请参见 [no-redeclare](no-redeclare)。

## 选项

* `typeof` 设置为 true 将对 typeof 检查中使用的变量发出警告（默认为 false）。

### typeof

使用默认的 `{ "typeof": false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-undef: "error"*/

if (typeof UndefinedIdentifier === "undefined") {
    // do something ...
}
```

:::

如果你想防止对未声明的变量进行 `typeof` 检查，可以使用这个选项。

使用 `{ "typeof": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-undef: ["error", { "typeof": true }] */

if(typeof a === "string"){}
```

:::

使用 `{ "typeof": true }` 选项及 `global`声明的**正确**示例：

::: correct

```js
/*global a*/
/*eslint no-undef: ["error", { "typeof": true }] */

if(typeof a === "string"){}
```

:::

## Environments

为了方便起见，ESLint 提供了快捷方式，预先定义了由流行的库和运行时环境暴露的全局变量。本规则支持这些环境，如[指定环境](../use/configure/language-options#指定全局变量)中所列。下面给出了几个例子：

### browser

在 `browser` 环境下，使用此规则的**正确**的示例：

::: correct

```js
/*eslint no-undef: "error"*/
/*eslint-env browser*/

setTimeout(function() {
    alert("Hello");
});
```

:::

### Node.js

在 `node` 环境下，使用此规则的**正确**示例：

::: correct

```js
/*eslint no-undef: "error"*/
/*eslint-env node*/

var fs = require("fs");
module.exports = function() {
    console.log(fs);
};
```

:::

## 何时不用

如果全局变量的明确声明不符合你的喜好。

## 兼容

这条规则与 [JSHint](http://jshint.com/) 和 [JSLint](http://www.jslint.com) 中对全局变量的处理兼容。
