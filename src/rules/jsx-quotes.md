---
title: jsx-quotes
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/jsx-quotes.md
rule_type: layout
related_rules:
- quotes
---

JSX 属性值可以包含字符串字面，用单引号或双引号划定。

```xml
<a b='c' />
<a b="c" />
```

与 JavaScript 中的字符串字元不同，JSX 属性中的字符串字元不能包含转义引号。
如果你想在 JSX 属性值中有一个双引号，你必须使用单引号作为字符串分隔符。

```xml
<a b="'" />
<a b='"' />
```

## 规则细节

这条规则强制要求在 JSX 属性中统一使用双引号或单引号。

## 选项

此规则选项为字符串：

* `"prefer-double"`（默认值）对于所有不包含双引号的 JSX 属性值，强制使用双引号。
* `"prefer-single"`对所有不包含单引号的 JSX 属性值强制使用单引号。

### prefer-double

使用此规则与默认的 `"prefer-double"` 选项的**错误**示例：

:::incorrect

```xml
/*eslint jsx-quotes: ["error", "prefer-double"]*/

<a b='c' />
```

:::

使用此规则与默认的 `"prefer-double"` 选项的**正确**示例：

:::correct

```xml
/*eslint jsx-quotes: ["error", "prefer-double"]*/

<a b="c" />
<a b='"' />
```

:::

### prefer-single

使用此规则与 `"prefer-single"` 选项的**错误**示例：

:::incorrect

```xml
/*eslint jsx-quotes: ["error", "prefer-single"]*/

<a b="c" />
```

:::

使用此规则与 `"prefer-single"` 选项的**正确**示例：

:::correct

```xml
/*eslint jsx-quotes: ["error", "prefer-single"]*/

<a b='c' />
<a b="'" />
```

:::

## 何时不用

如果你不使用 JSX，或者你不关心 JSX 属性中引号的一致用法，你可以关闭这个规则。
