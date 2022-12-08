---
title: no-warning-comments
layout: doc
rule_type: suggestion
---

开发人员经常给不完整或需要审查的代码添加注释。最有可能的是，你想修复或审查代码，然后删除注释，在你认为代码已经可以生产之前。

```js
// TODO: do something
// FIXME: this is not a good idea
```

## 规则细节

此规则报告包括其配置中指定的任何预定义术语的注释。

## 选项

这个规则有一个选项对象的字面量：

* `"terms"`：可选择的匹配条款数组。默认为 `["todo", "fixme", "xxx"]`。术语的匹配不考虑大小写，并作为整个单词。`fix` 可以匹配 `FIX`，但不能匹 配`fixing`。术语可以由多个词组成。`really bad idea`。
* `"location"`：可选的字符串，用于配置您的评论中检查匹配的位置。默认为 `"start"`。从第一个非装饰性字符开始，忽略空格、新行 和 `decoration` 中指定的字符。另一个值是匹配注释中的 `"anywhere"`。
* `"decoration"`：可选的字符数组，当位置为 `"start"` 时，在注释的开始部分会被忽略。默认为 `[]`。任何空白序列或该属性中的字符都会被忽略。当位置为 `"anywhere"` 时，该选项被忽略。

使用默认的 `{ "terms": ["todo", "fixme", "xxx"], "location": "start" }` 选项的**错误**示例:

::: incorrect

```js
/*eslint no-warning-comments: "error"*/

/*
FIXME
*/
function callback(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  // TODO
}
```

:::

使用默认的 `{ "terms": ["todo", "fixme", "xxx"], "location": "start" }` 选项的**错误**示例:

::: correct

```js
/*eslint no-warning-comments: "error"*/

function callback(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  // NOT READY FOR PRIME TIME
  // but too bad, it is not a predefined warning term
}
```

:::

### terms and location

使用 `{ "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-warning-comments: ["error", { "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }]*/

// TODO: this
// todo: this too
// Even this: TODO
/*
 * The same goes for this TODO comment
 * Or a fixme
 * as well as any other term
 */
```

:::

使用 `{ "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-warning-comments: ["error", { "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }]*/

// This is to do
// even not any other    term
// any other terminal
/*
 * The same goes for block comments
 * with any other interesting term
 * or fix me this
 */
```

:::

### Decoration Characters

使用 `{ "decoration": ["*"] }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-warning-comments: ["error", { "decoration": ["*"] }]*/
//***** todo decorative asterisks are ignored *****//
/**
 * TODO new lines and asterisks are also ignored in block comments.
 */
```

:::

使用 `{ "decoration": ["/", "*"] }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-warning-comments: ["error", { "decoration": ["/", "*"] }]*/
////// TODO decorative slashes and whitespace are ignored //////
//***** todo decorative asterisks are also ignored *****//
/**
 * TODO new lines are also ignored in block comments.
 */
```

:::

使用 `{ "decoration": ["/", "*"] }` 选项的**正确**示例：

::: correct

```js
/*eslint no-warning-comments: ["error", { "decoration": ["/", "*"] }]*/
//!TODO preceded by non-decoration character
/**
 *!TODO preceded by non-decoration character in a block comment
 */
```

:::

## 何时不用

* 如果你有一个庞大的代码库，而开发时没有制定不使用这种警告条款的政策，你可能会得到数以百计的警告/错误，如果你不能解决所有的问题（例如，如果你没有时间去做），可能会产生反作用，因为你可能会忽略其他的警告/错误，或者习惯于其中的许多错误，不再注意它。
* 和上面的原因一样。你不应该配置那些经常使用的术语（例如，在你的评论中使用的母语的中心部分）。
