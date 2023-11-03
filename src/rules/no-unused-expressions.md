---
title: no-unused-expressions
rule_type: suggestion
---

一个未使用的表达式对程序的状态没有影响，表明是一个逻辑错误。

例如，`n + 1;` 并非语法错误，但它可能是错别字，程序员的意思是一个赋值语句 `n += 1;`。有时，这种未使用的表达式可能会被生产环境中的一些构建工具消除，这可能会破坏应用逻辑。

## 规则细节

这条规则的目的是消除那些对程序状态没有影响的未使用的表达式。

这条规则不适用于使用 `new` 运算符的函数调用或构造函数调用，因为它们可能对程序的状态产生**副作用**。

```js
var i = 0;
function increment() { i += 1; }
increment(); // return value is unused, but i changed as a side effect

var nThings = 0;
function Thing() { nThings += 1; }
new Thing(); // constructed object is unused, but nThings changed as a side effect
```

这条规则不适用于指令（指令的形式是字面字符串表达式，如脚本、模块或函数开头的 `"use strict";`）。

序列表达式（那些使用逗号的表达式，如 `a = 1, b = 2`）总是被认为是未使用的，除非其返回值被分配或用于条件评估，或者用序列表达式的值进行函数调用。

## 选项

这个规则在其默认状态下不需要任何参数。如果你想启用以下一个或多个参数，你可以通过一个设置了选项的对象，如下所示：

* `allowShortCircuit` 设置为 `true` 将允许你在表达式中使用短路求值（默认为 `false`）。
* `allowTernary` 设置为 `true` 将使你能够在表达式中使用三元运算符，类似于短路求值（默认为 `false`）。
* `allowTaggedTemplates` 设置为 `true` 将使你能够在表达式中使用标记的模板字面（默认为 `false`）。
* `enforceForJSX` 设置为 `true` 将标记未使用的 JSX 元素表达式（默认为 `false`）。

这些选项允许未使用的表达式，**只有当所有**的代码路径直接改变状态（例如，赋值语句）或可能有的**副作用**（例如，函数调用）。

使用默认的 `{ "allowShortCircuit": false, "allowTernary": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-unused-expressions: "error"*/

0

if(0) 0

{0}

f(0), {}

a && b()

a, b()

c = a, b;

a() && function namedFunctionInExpressionContext () {f();}

(function anIncompleteIIFE () {});

injectGlobal`body{ color: red; }`

```

:::

使用默认的 `{ "allowShortCircuit": false, "allowTernary": false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-expressions: "error"*/

{} // In this context, this is a block statement, not an object literal

{myLabel: someVar} // In this context, this is a block statement with a label and expression, not an object literal

function namedFunctionDeclaration () {}

(function aGenuineIIFE () {}());

f()

a = 0

new C

delete a.b

void a
```

:::

请注意，只有当一个或多个字符串表达式语句（带或不带分号）不在脚本、模块或函数的开头（单独且不被其他语句打断）时，才会被视为未使用。否则，它们将被视为“directive prologue”的一部分，一个可能被 JavaScript 引擎使用的部分。这包括“严格模式”指令。

在指令方面，此规则的**正确**示例：

::: correct

```js
/*eslint no-unused-expressions: "error"*/

"use strict";
"use asm"
"use stricter";
"use babel"
"any other strings like this in the directive prologue";
"this is still the directive prologue";

function foo() {
    "bar";
}

class Foo {
    someMethod() {
        "use strict";
    }
}
```

:::

Examples of **incorrect** code for this rule in regard to directives:

::: incorrect

```js
/*eslint no-unused-expressions: "error"*/

doSomething();
"use strict"; // this isn't in a directive prologue, because there is a non-directive statement before it

function foo() {
    "bar" + 1;
}

class Foo {
    static {
        "use strict"; // class static blocks do not have directive prologues
    }
}
```

:::

### allowShortCircuit

使用 `{ "allowShortCircuit": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true }]*/

a || b
```

:::

使用 `{ "allowShortCircuit": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true }]*/

a && b()
a() || (b = c)
```

:::

### allowTernary

使用 `{ "allowTernary": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-unused-expressions: ["error", { "allowTernary": true }]*/

a ? b : 0
a ? b : c()
```

:::

使用 `{ "allowTernary": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-expressions: ["error", { "allowTernary": true }]*/

a ? b() : c()
a ? (b = c) : d()
```

:::

### allowShortCircuit and allowTernary

使用 `{ "allowShortCircuit": true, "allowTernary": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }]*/

a ? b() || (c = d) : e()
```

:::

### allowTaggedTemplates

使用 `{ "allowTaggedTemplates": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-unused-expressions: ["error", { "allowTaggedTemplates": true }]*/

`some untagged template string`;
```

:::

使用 `{ "allowTaggedTemplates": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-expressions: ["error", { "allowTaggedTemplates": true }]*/

tag`some tagged template string`;
```

:::

### enforceForJSX

JSX 在 React 生态系统中最常使用，它被编译成 `React.createElement` 表达式。虽然没有副作用，但这些调用并没有被 `no-unused-expression` 规则自动标记出来。如果你使用 React 或其他无副作用的 JSX pragma，可以启用这个选项来标记这些表达式。

使用 `{ "enforceForJSX": true }` 选项的**错误**示例：

::: incorrect

```jsx
/*eslint no-unused-expressions: ["error", { "enforceForJSX": true }]*/

<MyComponent />;

<></>;
```

:::

使用 `{ "enforceForJSX": true }` 选项的**正确**示例：

::: correct

```jsx
/*eslint no-unused-expressions: ["error", { "enforceForJSX": true }]*/

var myComponentPartial = <MyComponent />;

var myFragment = <></>;
```

:::
