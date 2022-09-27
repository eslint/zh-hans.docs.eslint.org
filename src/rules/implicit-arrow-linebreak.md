---
title: implicit-arrow-linebreak
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/implicit-arrow-linebreak.md
rule_type: layout
related_rules:
- brace-style
---

箭头函数体可以包含作为表达式的隐式返回，而不是块体。这有助于让隐式返回的表达式位于同一位置。

## 规则细节

这条规则的目的是为确保包含隐性返回的箭头函数有相同的风格。

### 选项

此规则选项为字符串：

* `"beside"`（默认值）不允许在箭头函数体前有换行。
* `"below"` 要求在箭头函数体前有一个换行。

使用此规则与默认的 `"beside"` 选项的**错误**示例：

::: incorrect

```js
/* eslint implicit-arrow-linebreak: ["error", "beside"] */

(foo) =>
  bar;

(foo) =>
  (bar);

(foo) =>
  bar =>
    baz;

(foo) =>
(
  bar()
);
```

:::

使用此规则与默认的 `"beside"` 选项的**正确**示例：

::: correct

```js
/* eslint implicit-arrow-linebreak: ["error", "beside"] */

(foo) => bar;

(foo) => (bar);

(foo) => bar => baz;

(foo) => (
  bar()
);

// functions with block bodies allowed with this rule using any style
// to enforce a consistent location for this case, see the rule: `brace-style`
(foo) => {
  return bar();
}

(foo) =>
{
  return bar();
}
```

:::

使用此规则与 `"below"` 选项的**错误**示例：

::: incorrect

```js
/* eslint implicit-arrow-linebreak: ["error", "below"] */

(foo) => bar;

(foo) => (bar);

(foo) => bar => baz;
```

:::

使用此规则与 `"below"` 选项的**正确**示例：

::: correct

```js
/* eslint implicit-arrow-linebreak: ["error", "below"] */

(foo) =>
  bar;

(foo) =>
  (bar);

(foo) =>
  bar =>
    baz;
```

:::

## 何时不用

如果你不关心隐式返回的箭头函数表达式的一致位置，你不应该打开这个规则。

如果你使用 [`arrow-body-style`](arrow-body-style) 和 `"always"` 选项，你也可以禁用此规则，因为这将禁用箭头函数中隐式返回的使用。
