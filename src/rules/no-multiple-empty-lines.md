---
title: no-multiple-empty-lines
rule_type: layout
---

有些开发者喜欢删除多个空白行，而另一些开发者则认为这有助于提高可读性。留白对于分隔代码的逻辑部分很有用，但多余的留白会占用更多的屏幕。

## 规则细节

这个规则旨在减少阅读你的代码时需要的滚动。它将在超过最大空行数时发出警告。

## 选项

此规则选项为对象：

* `"max"`（默认：`2`) 强制执行一个最大的连续空行数。
* `"maxEOF"` 在文件的结尾处执行最大的连续空行数。
* `"maxBOF"` 强制执行文件开头的最大连续空行数。

### max

使用此规则与默认的 `{ "max": 2 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-multiple-empty-lines: "error"*/

var foo = 5;


var bar = 3;
```

:::

使用此规则与默认的 `{ "max": 2 }` 选项的**正确**示例：

::: correct

```js
/*eslint no-multiple-empty-lines: "error"*/

var foo = 5;


var bar = 3;
```

:::

### maxEOF

使用此规则与 `{ max: 2, maxEOF: 0 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxEOF": 0 }]*/

var foo = 5;


var bar = 3;


```

:::

使用此规则与 `{ max: 2, maxEOF: 0 }` 选项的**正确**示例：

::: correct

```js
/*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxEOF": 0 }]*/

var foo = 5;


var bar = 3;
```

:::

**注意**：尽管这样可以确保 EOF 处没有空行，但如果文件以换行方式结束，大多数编辑器仍然会在最后显示一个空行，如下图所示。在最后一个 `\n` 之后的文件末尾没有空行，尽管编辑器可能会显示一个附加行。一个真正的附加行将用 `\n\n` 表示。

**错误**：

::: incorrect

```js
1    /*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxEOF": 0 }]*/⏎
2    ⏎
3    var foo = 5;⏎
4    ⏎
5    ⏎
6    var bar = 3;⏎
7    ⏎
8
```

:::

**正确**：

::: correct

```js
1    /*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxEOF": 0 }]*/⏎
2    ⏎
3    var foo = 5;⏎
4    ⏎
5    ⏎
6    var bar = 3;⏎
7
```

:::

### maxBOF

使用此规则与 `{ max: 2, maxBOF: 1 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxBOF": 1 }]*/


var foo = 5;


var bar = 3;
```

:::

使用此规则与 `{ max: 2, maxBOF: 1 }` 选项的**正确**示例：

::: correct

```js
/*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxBOF": 1}]*/

var foo = 5;


var bar = 3;
```

:::

## 何时不用

如果你不关心额外的空行，就把它关掉。
