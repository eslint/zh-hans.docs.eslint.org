---
title: no-extra-parens
rule_type: layout
related_rules:
- arrow-parens
- no-cond-assign
- no-return-assign
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
---

这条规则限制了括号的使用，只在有必要的地方使用。

## 规则细节

此规则总是忽略以下周围的额外括号：

* 正则字词，如 `(/abc/).test(var)`，以避免与 [wrap-regex](wrap-regex) 规则冲突
*立即调用的函数表达式（也称为 IIFE），如 `var x = (function () {})();` 和 `var x = (function () {}();` 以避免与 [wrap-iife](wrap-iife) 规则冲突
* 箭头函数参数，以避免与 [arrow-parens](arrow-parens) 规则冲突

## 选项

此规则选项为字符串：

* `"all"`（默认值）不允许在**任何**表达式周围使用不必要的括号。
* `"functions"` 只允许在函数表达式周围有不必要的括号

该规则有一个对象选项，用于处理 `"all"` 选项的例外情况。

* `"conditionalAssign": false` 允许在条件测试表达式中的赋值周围加上括号。
* `"returnAssign": false` 允许在 `return` 语句中使用额外的小括号。
* `"nestedBinaryExpressions": false` 允许在嵌套二进制表达式中使用额外的小括号。
* `"ternaryOperandBinaryExpressions": false` 允许在三元运算符 `?:` 的操作数周围添加额外的括号。
* `"ignoreJSX": "none|all|multi-line|single-line"` 允许在没有/所有/多行/单行 JSX 组件周围使用额外的小括号。默认为 `none`。
* `"enforceForArrowConditionals": false` 允许在作为箭头函数主体的三元表达式周围添加小括号。
* `"enforceForSequenceExpressions": false` 允许在序列表达式周围加上小括号。
* `"enforceForNewInMemberExpressions": false`允许在成员表达式中的 `new` 表达式周围使用额外的小括号。
* `"enforceForFunctionPrototypeMethods": false` 允许在函数表达式的即时 `.call` 和 `.apply` 方法调用周围以及同一上下文中的函数表达式周围添加括号。
* `"allowParensAfterCommentPattern": "any-string-pattern"` 允许在匹配正则表达式的注释前面加上额外的括号。

### all

使用此规则与默认的 `"all"` 选项的**错误**示例：

::: incorrect

```js
/* eslint no-extra-parens: "error" */

a = (b * c);

(a * b) + c;

for (a in (b, c));

for (a in (b));

for (a of (b));

typeof (a);

(Object.prototype.toString.call());

(function(){} ? a() : b());

class A {
    [(x)] = 1;
}

class B {
    x = (y + z);
}
```

:::

使用此规则与默认的 `"all"` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: "error" */

(0).toString();

(Object.prototype.toString.call());

({}.toString.call());

(function(){}) ? a() : b();

(/^a$/).test(x);

for (a of (b, c));

for (a of b);

for (a in b, c);

for (a in b);

class A {
    [x] = 1;
}

class B {
    x = y + z;
}
```

:::

### conditionalAssign

使用此规则与 `"all"` 和 `{ "conditionalAssign": false }` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "conditionalAssign": false }] */

while ((foo = bar())) {}

if ((foo = bar())) {}

do; while ((foo = bar()))

for (;(a = b););
```

:::

### returnAssign

使用此规则与 `"all"` 和 `{ "returnAssign": false }` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "returnAssign": false }] */

function a(b) {
  return (b = 1);
}

function a(b) {
  return b ? (c = d) : (c = e);
}

b => (b = 1);

b => b ? (c = d) : (c = e);
```

:::

### nestedBinaryExpressions

使用此规则与 `"all"` 和 `{ "nestedBinaryExpressions": false }` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "nestedBinaryExpressions": false }] */

x = a || (b && c);
x = a + (b * c);
x = (a * b) / c;
```

:::

### ternaryOperandBinaryExpressions

使用规则选项 `"all"` 和 `{ "ternaryOperandBinaryExpressions": false }` 时，以下是符合规则的代码示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "ternaryOperandBinaryExpressions": false }] */

(a && b) ? foo : bar;

(a - b > a) ? foo : bar;

foo ? (bar || baz) : qux;

foo ? bar : (baz || qux);
```

:::

### ignoreJSX

使用此规则与 `all` 和 `{ "ignoreJSX": "all" }` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { ignoreJSX: "all" }] */
const Component = (<div />)
const Component = (
    <div
        prop={true}
    />
)
```

:::

使用此规则与 `all` 和 `{ "ignoreJSX": "multi-line" }` 选项的**错误**示例：

::: incorrect

```js
/* eslint no-extra-parens: ["error", "all", { ignoreJSX: "multi-line" }] */
const Component = (<div />)
const Component = (<div><p /></div>)
```

:::

使用此规则与 `all` 和 `{ "ignoreJSX": "multi-line" }` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { ignoreJSX: "multi-line" }] */
const Component = (
    <div>
        <p />
    </div>
)
const Component = (
    <div
        prop={true}
    />
)
```

:::

使用此规则与 `all` 和 `{ "ignoreJSX": "single-line" }` 选项的**错误**示例：

::: incorrect

```js
/* eslint no-extra-parens: ["error", "all", { ignoreJSX: "single-line" }] */
const Component = (
    <div>
        <p />
    </div>
)
const Component = (
    <div
        prop={true}
    />
)
```

:::

使用此规则与 `all` 和 `{ "ignoreJSX": "single-line" }` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { ignoreJSX: "single-line" }] */
const Component = (<div />)
const Component = (<div><p /></div>)
```

:::

### enforceForArrowConditionals

使用此规则与 `"all"` 和 `{ "enforceForArrowConditionals": false }` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "enforceForArrowConditionals": false }] */

const b = a => 1 ? 2 : 3;
const d = c => (1 ? 2 : 3);
```

:::

### enforceForSequenceExpressions

使用此规则与 `"all"` 和 `{ "enforceForSequenceExpressions": false }` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "enforceForSequenceExpressions": false }] */

(a, b);

if ((val = foo(), val < 10)) {}

while ((val = foo(), val < 10));
```

:::

### enforceForNewInMemberExpressions

使用此规则与 `"all"` 和 `{ "enforceForNewInMemberExpressions": false }` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "enforceForNewInMemberExpressions": false }] */

const foo = (new Bar()).baz;

const quux = (new Bar())[baz];

(new Bar()).doSomething();
```

:::

### enforceForFunctionPrototypeMethods

使用此规则与 `"all"` 和 `{ "enforceForFunctionPrototypeMethods": false }` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "enforceForFunctionPrototypeMethods": false }] */

const foo = (function () {}).call();

const bar = (function () {}).apply();

const baz = (function () {}.call());

const quux = (function () {}.apply());
```

:::

### allowParensAfterCommentPattern

要使此规则允许在特定注释前面有额外的括号，请将此选项设置为字符串模式，它将被传递给 [`RegExp` 构造函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp)。

使用此规则与 `"all"` 和 `{ "allowParensAfterCommentPattern": "@type" }` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "allowParensAfterCommentPattern": "@type" }] */
const span = /**@type {HTMLSpanElement}*/(event.currentTarget);
if (/** @type {Foo | Bar} */(options).baz) console.log('Lint free');
foo(/** @type {Bar} */ (bar), options, {
    name: "name",
    path: "path",
});
if (foo) {
    /** @type {Bar} */
    (bar).prop = false;
}
```

:::

### functions

使用此规则与 `"functions"` 选项的**错误**示例：

::: incorrect

```js
/* eslint no-extra-parens: ["error", "functions"] */

((function foo() {}))();

var y = (function () {return 1;});
```

:::

使用此规则与 `"functions"` 选项的**正确**示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "functions"] */

(0).toString();

(Object.prototype.toString.call());

({}.toString.call());

(function(){} ? a() : b());

(/^a$/).test(x);

a = (b * c);

(a * b) + c;

typeof (a);
```

:::
