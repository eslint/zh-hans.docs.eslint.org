---
title: template-curly-spacing
layout: doc
rule_type: layout
---

我们可以通过使用一对 `${` 和 `}`在模板字符串中嵌入表达式。

这个规则可以根据风格指南强制使用大括号内的间距。

```js
let hello = `hello, ${people.name}!`;
```

## 规则细节

这条规则的目的是保持模板字词内部间距的一致性。

## 选项

```json
{
    "template-curly-spacing": ["error", "never"]
}
```

这个规则有一个选项，其值是 `"never"` 或 `"always"`。

* `"never"`（默认） - 不允许大括号内有空格。
* `"always"` - 要求在大括号内有一个或多个空格。

## 示例

### never

使用此规则与默认的 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint template-curly-spacing: "error"*/

`hello, ${ people.name}!`;
`hello, ${people.name }!`;

`hello, ${ people.name }!`;
```

:::

使用此规则与默认的 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint template-curly-spacing: "error"*/

`hello, ${people.name}!`;

`hello, ${
    people.name
}!`;
```

:::

### always

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint template-curly-spacing: ["error", "always"]*/

`hello, ${ people.name}!`;
`hello, ${people.name }!`;

`hello, ${people.name}!`;
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint template-curly-spacing: ["error", "always"]*/

`hello, ${ people.name }!`;

`hello, ${
    people.name
}!`;
```

:::

## 何时不用

如果你不希望被通知模板字符串内的间距使用情况，你可以安全地禁用此规则。
