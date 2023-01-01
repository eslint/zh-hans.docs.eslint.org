---
title: nonblock-statement-body-position
rule_type: layout
further_reading:
- https://jscs-dev.github.io/rule/requireNewlineBeforeSingleStatementsInIf
---

当编写 `if`、`else`、`while`、`do-while` 和 `for` 语句时，主体可以是单个语句，而不是一个块。为这些单一的语句执行一个一致的位置可能是很有用的。

例如，一些开发人员避免写这样的代码：

```js
if (foo)
  bar();
```

如果另一个开发者试图在 `if` 语句中加入 `baz();`，他们可能会错误地将代码改为

```js
if (foo)
  bar();
  baz(); // this line is not in the `if` statement!
```

为了避免这个问题，我们可以要求所有的单行 `if` 语句直接出现在条件后面，不加换行符。

```js
if (foo) bar();
```

## 规则细节

这条规则的目的是为单行语句执行一个一致的位置。

请注意，这条规则并不强制要求使用一般的单行语句。如果你想禁止单行语句，请使用 [`curly`](/docs/rules/curly) 规则代替。

### 选项

此规则选项为字符串：

* `"beside"`（默认值）不允许在单行语句前添加换行。
* `"below"`要求在单行语句前加一个换行。
* `"any"`不强制执行单行语句的位置。

此外，规则接受一个可选的对象选项，其中有一个 `"overrides"` 键。这可以用来为特定的语句指定一个位置，以覆盖默认值：

* `"beside", { "overrides": { "while": "below" } }` 要求所有的单行语句与它们的父语句出现在同一行，除非父语句是 `while` 语句，在这种情况下，单行语句必须不在同一行。
* `"below", { "overrides": { "do": "any" } }` 不允许所有的单行语句与它们的父语句出现在同一行，除非父语句是一个 `do-while` 语句，在这种情况下，单行语句的位置不被强制执行。

使用此规则与默认的 `"beside"` 选项的**错误**示例：

::: incorrect

```js
/* eslint nonblock-statement-body-position: ["error", "beside"] */

if (foo)
  bar();
else
  baz();

while (foo)
  bar();

for (let i = 1; i < foo; i++)
  bar();

do
  bar();
while (foo)

```

:::

使用此规则与默认的 `"beside"` 选项的**正确**示例：

::: correct

```js
/* eslint nonblock-statement-body-position: ["error", "beside"] */

if (foo) bar();
else baz();

while (foo) bar();

for (let i = 1; i < foo; i++) bar();

do bar(); while (foo)

if (foo) { // block statements are always allowed with this rule
  bar();
} else {
  baz();
}
```

:::

使用此规则与 `"below"` 选项的**错误**示例：

::: incorrect

```js
/* eslint nonblock-statement-body-position: ["error", "below"] */

if (foo) bar();
else baz();

while (foo) bar();

for (let i = 1; i < foo; i++) bar();

do bar(); while (foo)
```

:::

使用此规则与 `"below"` 选项的**正确**示例：

::: correct

```js
/* eslint nonblock-statement-body-position: ["error", "below"] */

if (foo)
  bar();
else
  baz();

while (foo)
  bar();

for (let i = 1; i < foo; i++)
  bar();

do
  bar();
while (foo)

if (foo) {
  // Although the second `if` statement is on the same line as the `else`, this is a very common
  // pattern, so it's not checked by this rule.
} else if (bar) {
}
```

:::

使用此规则与 `"beside", { "overrides": { "while": "below" } }` 选项的**错误**示例：

::: incorrect

```js
/* eslint nonblock-statement-body-position: ["error", "beside", { "overrides": { "while": "below" } }] */

if (foo)
  bar();

while (foo) bar();
```

:::

使用此规则与 `"beside", { "overrides": { "while": "below" } }` 选项的**正确**示例：

::: correct

```js
/* eslint nonblock-statement-body-position: ["error", "beside", { "overrides": { "while": "below" } }] */

if (foo) bar();

while (foo)
  bar();
```

:::

## 何时不用

如果你不关心单行语句的位置是否一致，你不应该开启这个规则。如果你对 [`curly`](/docs/rules/curly) 规则使用 `"all"` 选项，你也可以禁用此规则，因为这将完全不允许单行语句。
