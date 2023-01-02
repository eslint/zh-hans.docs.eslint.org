---
title: brace-style
rule_type: layout
related_rules:
- block-spacing
- space-before-blocks
further_reading:
- https://en.wikipedia.org/wiki/Indent_style
---

大括号风格与编程中的[缩进风格](https://en.wikipedia.org/wiki/Indent_style)密切相关，描述了大括号相对于其控制语句和正文的位置。世界上可能有十几种，甚至更多的大括号样式。

*one true brace style* 是 JavaScript 中最常见的大括号风格之一，在这种风格中，一个块的开头大括号与它对应的语句或声明放在同一行中。比如说：

```js
if (foo) {
  bar();
} else {
  baz();
}
```

有一种叫 Stroustrup 的常见 one true brace style 变体，其中 `if-else` 结构中的 `else`、`catch` 和 `finally` 语句必须在上一封闭括号后的独立行中。比如说：

```js
if (foo) {
  bar();
}
else {
  baz();
}
```

另一种风格被称为 [Allman](https://en.wikipedia.org/wiki/Indent_style#Allman_style)，在这种风格中，所有的大括号都应该在独立行上，没有任何额外的缩进。比如说：

```js
if (foo)
{
  bar();
}
else
{
  baz();
}
```

虽然没有哪种风格被认为比其他风格更好，但大多数开发者都同意，在整个项目中拥有一致的风格对其长期可维护性非常重要。

## 规则细节

这条规则使块的括号风格一致。

## 选项

此规则选项为字符串：

* `"1tbs"`（默认值）执行 one true brace 风格
* `"stroustrup"` 执行 Stroustrup 风格
* `"allman"` 执行 Allman 风格

此规则有用于例外情况的对象选项：

* `"allowSingleLine": true`（默认为 `false`）允许一个区块的开头和结尾括号在*同一行。

### 1tbs

使用此规则与默认的 `"1tbs"` 选项的**错误**示例：

:::incorrect

```js
/*eslint brace-style: "error"*/

function foo()
{
  return true;
}

if (foo)
{
  bar();
}

try
{
  somethingRisky();
} catch(e)
{
  handleError();
}

if (foo) {
  bar();
}
else {
  baz();
}

class C
{
    static
    {
        foo();
    }
}
```

:::

使用此规则与默认的 `"1tbs"` 选项的**正确**示例：

:::correct

```js
/*eslint brace-style: "error"*/

function foo() {
  return true;
}

if (foo) {
  bar();
}

if (foo) {
  bar();
} else {
  baz();
}

try {
  somethingRisky();
} catch(e) {
  handleError();
}

class C {
    static {
        foo();
    }
}

// 没有大括号也就没有问题
if (foo) bar();
else if (baz) boom();
```

:::

使用此规则与 `"1tbs", { "allowSingleLine": true }` 选项的**正确**示例：

:::correct

```js
/*eslint brace-style: ["error", "1tbs", { "allowSingleLine": true }]*/

function nop() { return; }

if (foo) { bar(); }

if (foo) { bar(); } else { baz(); }

try { somethingRisky(); } catch(e) { handleError(); }

if (foo) { baz(); } else {
  boom();
}

if (foo) { baz(); } else if (bar) {
  boom();
}

if (foo) { baz(); } else
if (bar) {
  boom();
}

if (foo) { baz(); } else if (bar) {
  boom();
}

try { somethingRisky(); } catch(e) {
  handleError();
}

class C {
    static { foo(); }
}

class D { static { foo(); } }
```

:::

### stroustrup

使用此规则与 `"stroustrup"` 选项的**错误**示例：

:::incorrect

```js
/*eslint brace-style: ["error", "stroustrup"]*/

function foo()
{
  return true;
}

if (foo)
{
  bar();
}

try
{
  somethingRisky();
} catch(e)
{
  handleError();
}

class C
{
    static
    {
        foo();
    }
}

if (foo) {
  bar();
} else {
  baz();
}
```

:::

使用此规则与 `"stroustrup"` 选项的**正确**示例：

:::correct

```js
/*eslint brace-style: ["error", "stroustrup"]*/

function foo() {
  return true;
}

if (foo) {
  bar();
}

if (foo) {
  bar();
}
else {
  baz();
}

try {
  somethingRisky();
}
catch(e) {
  handleError();
}

class C {
    static {
        foo();
    }
}

// 没有大括号也就没有问题
if (foo) bar();
else if (baz) boom();
```

:::

使用此规则与 `"stroustrup", { "allowSingleLine": true }` 选项的**正确**示例：

:::correct

```js
/*eslint brace-style: ["error", "stroustrup", { "allowSingleLine": true }]*/

function nop() { return; }

if (foo) { bar(); }

if (foo) { bar(); }
else { baz(); }

try { somethingRisky(); }
catch(e) { handleError(); }

class C {
    static { foo(); }
}

class D { static { foo(); } }
```

:::

### allman

使用此规则与 `"allman"` 选项的**错误**示例：

:::incorrect

```js
/*eslint brace-style: ["error", "allman"]*/

function foo() {
  return true;
}

if (foo)
{
  bar(); }

try
{
  somethingRisky();
} catch(e)
{
  handleError();
}

class C {
    static {
        foo();
    }
}

if (foo) {
  bar();
} else {
  baz();
}
```

:::

使用此规则与 `"allman"` 选项的**正确**示例：

:::correct

```js
/*eslint brace-style: ["error", "allman"]*/

function foo()
{
  return true;
}

if (foo)
{
  bar();
}

if (foo)
{
  bar();
}
else
{
  baz();
}

try
{
  somethingRisky();
}
catch(e)
{
  handleError();
}

class C
{
    static
    {
        foo();
    }
}

// 没有大括号也就没有问题
if (foo) bar();
else if (baz) boom();
```

:::

使用此规则与 `"allman", { "allowSingleLine": true }` 选项的**正确**示例：

:::correct

```js
/*eslint brace-style: ["error", "allman", { "allowSingleLine": true }]*/

function nop() { return; }

if (foo) { bar(); }

if (foo) { bar(); }
else { baz(); }

try { somethingRisky(); }
catch(e) { handleError(); }

class C
{
    static { foo(); }

    static
    { foo(); }
}

class D { static { foo(); } }
```

:::

## 何时不用

如果你不想强制使用特定的括号样式，就不要启用这个规则。
