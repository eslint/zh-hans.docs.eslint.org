---
title: template-tag-spacing
rule_type: layout
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals
- https://exploringjs.com/es6/ch_template-literals.html#_examples-of-using-tagged-template-literals
---

在 ES6 中，可以创建名为[标签模板字面量](#further-reading)的函数，其中函数参数由模板字面的字符串和表达式组成。

当使用标记的模板字面时，有可能在标记函数和模板字面之间插入空白。由于这个空白是可选的，下面几行是等价的。

```js
let hello = func`Hello world`;
let hello = func `Hello world`;
```

## 规则细节

这条规则的目的是保持模板标签函数和其模板字面之间的间距的一致性。

## 选项

```json
{
    "template-tag-spacing": ["error", "never"]
}
```

该规则有一个选项，其值可以设置为 `"never"` 或 `"always"`。

* `"never"`（默认值）- 不允许在标签函数和其模板字面之间有空格。
* `"always"`- 要求在标签函数和其模板字面之间有一个或多个空格。

## 示例

### never

使用此规则与默认的 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint template-tag-spacing: "error"*/

func `Hello world`;
```

:::

使用此规则与默认的 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint template-tag-spacing: "error"*/

func`Hello world`;
```

:::

### always

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint template-tag-spacing: ["error", "always"]*/

func`Hello world`;
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint template-tag-spacing: ["error", "always"]*/

func `Hello world`;
```

:::

## 何时不用

如果你不想被通知标签函数和它们的模板字面量之间的使用间距，你可以安全地禁用此规则。
