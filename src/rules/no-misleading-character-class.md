---
title: no-misleading-character-class
rule_type: problem
---

Unicode 包括由多个码位组成的字符。
正则字符类语法（`/[abc]/`）不能处理由多个码位组成的字符，这些字符将被溶入每个码位。例如，`❇️` 是由 `❇`（`U+2747`）和 VARIATION SELECTOR-16（`U+FE0F`）组成。如果这个字符在正则字符类中，它将匹配 `❇`（`U+2747`）或 VARIATION SELECTOR-16（`U+FE0F`），而不是 `❇️`。

这条规则报告在字符类语法中包括多个码位字符的正则表达式。这条规则认为以下字符是多码点字符。

**带有组合字符的字符**：

组合字符是属于 `Mc`、`Me` 和 `Mn` 之一的字符 [Unicode 一般类别](http://www.unicode.org/L2/L1999/UnicodeData.html#General%20Category)。

```js
/^[Á]$/u.test("Á"); //→ false
/^[❇️]$/u.test("❇️"); //→ false
```

**带有表情符号修饰的字符**：

```js
/^[👶🏻]$/u.test("👶🏻"); //→ false
/^[👶🏽]$/u.test("👶🏽"); //→ false
```

**区域旗帜符号**：

```js
/^[🇯🇵]$/u.test("🇯🇵"); //→ false
```

**ZWJ 合成的人物**：

```js
/^[👨‍👩‍👦]$/u.test("👨‍👩‍👦"); //→ false
```

**没有 Unicode 标志的代理对”**：

```js
/^[👍]$/.test("👍"); //→ false

// Surrogate pair is OK if with u flag.
/^[👍]$/u.test("👍"); //→ true
```

## 规则细节

此规则报告在字符类语法中包含多个码位字符的正则表达式。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-misleading-character-class: error */

/^[Á]$/u;
/^[❇️]$/u;
/^[👶🏻]$/u;
/^[🇯🇵]$/u;
/^[👨‍👩‍👦]$/u;
/^[👍]$/;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-misleading-character-class: error */

/^[abc]$/;
/^[👍]$/u;
/^[\q{👶🏻}]$/v;
```

:::

## 何时不用

如果您不想为多个码位字符检查正则字符类语法，您可以关闭此规则。
