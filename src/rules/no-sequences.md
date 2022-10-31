---
title: no-sequences
layout: doc
rule_type: suggestion
---

逗号运算符包括多个表达式，而在这些表达式中只有一个是预期的。它从左到右评估每个操作数并返回最后一个操作数的值。然而，这经常会掩盖副作用，而且它的使用往往是一个意外。下面是一些序列的例子。

```js
var a = (3, 5); // a = 5

a = b += 5, a + b;

while (a = next(), a && a.length);

(0, eval)("doSomething();");
```

## 规则细节

本规则禁止使用逗号运算符，但以下情况除外：

* 在 `for` 语句的初始化或更新部分。
* 默认情况下，如果表达式序列被明确地包裹在圆括号中。这个例外可以通过 `allowInParentheses` 选项删除。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-sequences: "error"*/

foo = doSomething(), val;

0, eval("doSomething();");

do {} while (doSomething(), !!test);

for (; doSomething(), !!test; );

if (doSomething(), !!test);

switch (val = foo(), val) {}

while (val = foo(), val < 42);

with (doSomething(), val) {}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-sequences: "error"*/

foo = (doSomething(), val);

(0, eval)("doSomething();");

do {} while ((doSomething(), !!test));

for (i = 0, j = 10; i < j; i++, j--);

if ((doSomething(), !!test));

switch ((val = foo(), val)) {}

while ((val = foo(), val < 42));

with ((doSomething(), val)) {}
```

:::

### 关于箭头函数体的说明

如果一个箭头函数体是一个语句而不是一个块，并且该语句包含一个序列，你需要在语句周围使用双括号，以表明该序列是故意的。

使用箭头函数的**错误**示例：

::: incorrect

```js
/*eslint no-sequences: "error"*/
const foo = (val) => (console.log('bar'), val);

const foo = () => ((bar = 123), 10);

const foo = () => { return (bar = 123), 10 }
```

:::

使用箭头函数的**正常**示例：

::: correct

```js
/*eslint no-sequences: "error"*/
const foo = (val) => ((console.log('bar'), val));

const foo = () => (((bar = 123), 10));

const foo = () => { return ((bar = 123), 10) }
```

:::

## 选项

这个规则需要一个选项，即一个对象，具有以下属性：

* `"allowInParentheses"`：如果设置为 `true`（默认），该规则允许表达式序列被明确地包裹在括号内。

### allowInParentheses

使用此规则与 `{ "allowInParentheses": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-sequences: ["error", { "allowInParentheses": false }]*/

foo = (doSomething(), val);

(0, eval)("doSomething();");

do {} while ((doSomething(), !!test));

for (; (doSomething(), !!test); );

if ((doSomething(), !!test));

switch ((val = foo(), val)) {}

while ((val = foo(), val < 42));

with ((doSomething(), val)) {}

const foo = (val) => ((console.log('bar'), val));
```

:::

使用此规则与 `{ "allowInParentheses": false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-sequences: ["error", { "allowInParentheses": false }]*/

for (i = 0, j = 10; i < j; i++, j--);
```

:::

## 何时不用

如果带有逗号运算符的序列表达式可以接受，则禁用此规则。
另一种情况是，你可能想报告逗号运算符的所有用法，甚至在 for 循环中。你可以使用 `no-restricted-syntax` 规则来实现这一点。

```js
{
    "rules": {
        "no-restricted-syntax": ["error", "SequenceExpression"]
    }
}
```
