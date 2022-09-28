---
title: max-lines-per-function
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/max-lines-per-function.md
rule_type: suggestion
related_rules:
- complexity
- max-depth
- max-lines
- max-nested-callbacks
- max-params
- max-statements
- max-statements-per-line
---

有些人认为大型函数是一种代码风格。大型函数往往会做很多事情，而且会让人很难理解正在发生的事情。许多编码风格指南规定了一个函数所能包含的行数限制。这条规则可以帮助强制执行这种风格。

## 规则细节

这条规则强制规定了每个函数的最大行数，以帮助维护和降低复杂性。

### 为什么不使用 `max-statements` 或其他复杂性测量规则来代替？

像下面的例子一样，嵌套的长方法链通常被分割成不同的行，以便阅读：

```js
function() {
    return m("div", [
        m("table", {className: "table table-striped latest-data"}, [
            m("tbody",
                data.map(function(db) {
                    return m("tr", {key: db.dbname}, [
                        m("td", {className: "dbname"}, db.dbname),
                        m("td", {className: "query-count"},  [
                            m("span", {className: db.lastSample.countClassName}, db.lastSample.nbQueries)
                        ])
                    ])
                })
            )
        ])
    ])
}
```

* `max-statements` 将只报告为 1 条语句，尽管是 16 行代码。
* `complexity` 将只报告复杂度为 1
* `max-nested-callbacks` 将只报告 1 个
* `max-depth` 将报告深度为 0

## 选项

这个规则有以下几个选项，可以指定为任一对象：

* `"max"`（默认为 `50`）执行一个函数中的最大行数。

* `"skipBlankLines"`（默认为 `false`）忽略纯粹由空白构成的行。

* `"skipComments"`（默认为 `false`）忽略只包含注释的行。

* `"IIFEs"`（默认为 `false`）包括任何包含在 IIFEs 中的代码。

另外，你可以为 `max` 选项指定一个整数。

```json
"max-lines-per-function": ["error", 20]
```

相当于

```json
"max-lines-per-function": ["error", { "max": 20 }]
```

### code

使用此规则与最大值 `2` 的**错误**示例：

::: incorrect

```js
/*eslint max-lines-per-function: ["error", 2]*/
function foo() {
    var x = 0;
}
```

:::

::: incorrect

```js
/*eslint max-lines-per-function: ["error", 2]*/
function foo() {
    // a comment
    var x = 0;
}
```

:::

::: incorrect

```js
/*eslint max-lines-per-function: ["error", 2]*/
function foo() {
    // a comment followed by a blank line

    var x = 0;
}
```

:::

使用此规则与最大值 `3` 的**正确**代码示例：

::: correct

```js
/*eslint max-lines-per-function: ["error", 3]*/
function foo() {
    var x = 0;
}
```

:::

::: correct

```js
/*eslint max-lines-per-function: ["error", 3]*/
function foo() {
    // a comment
    var x = 0;
}
```

:::

::: correct

```js
/*eslint max-lines-per-function: ["error", 3]*/
function foo() {
    // a comment followed by a blank line

    var x = 0;
}
```

:::

### skipBlankLines

使用此规则与 `{ "skipBlankLines": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-lines-per-function: ["error", {"max": 2, "skipBlankLines": true}]*/
function foo() {

    var x = 0;
}
```

:::

使用此规则与 `{ "skipBlankLines": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-lines-per-function: ["error", {"max": 3, "skipBlankLines": true}]*/
function foo() {

    var x = 0;
}
```

:::

### skipComments

使用此规则与 `{ "skipComments": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-lines-per-function: ["error", {"max": 2, "skipComments": true}]*/
function foo() {
    // a comment
    var x = 0;
}
```

:::

使用此规则与 `{ "skipComments": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-lines-per-function: ["error", {"max": 3, "skipComments": true}]*/
function foo() {
    // a comment
    var x = 0;
}
```

:::

### IIFEs

使用此规则与 `{ "IIFEs": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-lines-per-function: ["error", {"max": 2, "IIFEs": true}]*/
(function(){
    var x = 0;
}());

(() => {
    var x = 0;
})();
```

:::

使用此规则与 `{ "IIFEs": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-lines-per-function: ["error", {"max": 3, "IIFEs": true}]*/
(function(){
    var x = 0;
}());

(() => {
    var x = 0;
})();
```

:::

## 何时不用

如果你不关心你的函数中的行数，你可以关闭这个规则。
