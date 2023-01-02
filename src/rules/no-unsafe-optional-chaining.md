---
title: no-unsafe-optional-chaining
rule_type: problem
---

可选的链式（`?.`）表达式可以用 `undefined` 的返回值进行短路。因此，将一个已评估的选项链表达式作为一个函数、对象、数字等来处理，会导致 TypeError 或意外的结果。比如：

```js
var obj = undefined;

1 in obj?.foo;  // TypeError
with (obj?.foo);  // TypeError
for (bar of obj?.foo);  // TypeError
bar instanceof obj?.foo;  // TypeError
const { bar } = obj?.foo;  // TypeError
```

另外，圆括号限制了链式短路的范围。比如：

```js
var obj = undefined;

(obj?.foo)(); // TypeError
(obj?.foo).bar; // TypeError
```

## 规则细节

这条规则的目的是检测一些使用可选链的情况，这些情况不能防止运行时错误。特别是，它标记了可选链式表达式的位置，即短路到 `undefined` 会导致之后抛出一个 TypeError。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unsafe-optional-chaining: "error"*/

(obj?.foo)();

(obj?.foo).bar;

(foo?.()).bar;

(foo?.()).bar();

(obj?.foo ?? obj?.bar)();

(foo || obj?.foo)();

(obj?.foo && foo)();

(foo ? obj?.foo : bar)();

(foo, obj?.bar).baz;

(obj?.foo)`template`;

new (obj?.foo)();

[...obj?.foo];

bar(...obj?.foo);

1 in obj?.foo;

bar instanceof obj?.foo;

for (bar of obj?.foo);

const { bar } = obj?.foo;

[{ bar } = obj?.foo] = [];

with (obj?.foo);

class A extends obj?.foo {}

var a = class A extends obj?.foo {};

async function foo () {
    const { bar } = await obj?.foo;
   (await obj?.foo)();
   (await obj?.foo).bar;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-unsafe-optional-chaining: "error"*/

(obj?.foo)?.();

obj?.foo();

(obj?.foo ?? bar)();

obj?.foo.bar;

obj.foo?.bar;

foo?.()?.bar;

(obj?.foo ?? bar)`template`;

new (obj?.foo ?? bar)();

var baz = {...obj?.foo};

const { bar } = obj?.foo || baz;

async function foo () {
  const { bar } = await obj?.foo || baz;
   (await obj?.foo)?.();
   (await obj?.foo)?.bar;
}
```

:::

## 选项

此规则选项为对象：

* `disallowArithmeticOperators`: 不允许对可选链式表达式进行算术运算（默认为 `false`）。如果是 `true`，本规则对可选链式表达式的算术操作提出警告，这可能导致 `NaN`。

### disallowArithmeticOperators

如果该选项设置为 `true`，该规则将被强制执行。

* 单项运算符：`-`, `+`
* 算术运算符：`+`, `-`, `/`, `*`, `%`, `**`
* 赋值运算符：`+=`, `-=`, `/=`, `*=`, `%=`, `**=`

使用此规则与 `{ "disallowArithmeticOperators": true }` 选项的额外**错误**示例：

::: incorrect

```js
/*eslint no-unsafe-optional-chaining: ["error", { "disallowArithmeticOperators": true }]*/

+obj?.foo;
-obj?.foo;

obj?.foo + bar;
obj?.foo - bar;
obj?.foo / bar;
obj?.foo * bar;
obj?.foo % bar;
obj?.foo ** bar;

baz += obj?.foo;
baz -= obj?.foo;
baz /= obj?.foo;
baz *= obj?.foo;
baz %= obj?.foo;
baz **= obj?.foo;

async function foo () {
  +await obj?.foo;
  await obj?.foo + bar;
  baz += await obj?.foo;
}
```

:::
