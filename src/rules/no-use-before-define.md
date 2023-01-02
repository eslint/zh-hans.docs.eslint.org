---
title: no-use-before-define
rule_type: problem
---

在 JavaScript 中，在 ES6 之前，变量和函数的声明被吊在一个作用域的顶端，所以有可能在代码中正式声明之前使用标识符。这可能会引起混淆，有些人认为最好是在使用变量和函数之前先声明它们。

在 ES6 中，块级绑定（`let` 和 `const`）引入了“temporal dead zone”，任何试图在变量声明之前访问它的行为都会被抛出一个 `ReferenceError`。

## 规则细节

当遇到对尚未声明的标识符的引用时，该规则将发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-use-before-define: "error"*/

alert(a);
var a = 10;

f();
function f() {}

function g() {
    return b;
}
var b = 1;

{
    alert(c);
    let c = 1;
}

{
    class C extends C {}
}

{
    class C {
        static x = "foo";
        [C.x]() {}
    }
}

{
    const C = class {
        static x = C;
    }
}

{
    const C = class {
        static {
            C.x = "foo";
        }
    }
}

export { foo };
const foo = 1;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-use-before-define: "error"*/

var a;
a = 10;
alert(a);

function f() {}
f(1);

var b = 1;
function g() {
    return b;
}

{
    let c;
    c++;
}

{
    class C {
        static x = C;
    }
}

{
    const C = class C {
        static x = C;
    }
}

{
    const C = class {
        x = C;
    }
}

{
    const C = class C {
        static {
            C.x = "foo";
        }
    }
}

const foo = 1;
export { foo };
```

:::

## 选项

```json
{
    "no-use-before-define": ["error", {
        "functions": true,
        "classes": true,
        "variables": true,
        "allowNamedExports": false
    }]
}
```

* `functions` (`boolean`) -
  显示此规则是否检查函数声明的标志。
  如果是 `true`，该规则会警告在函数声明之前对函数的每个引用。
  否则，忽略这些引用。
  函数声明被吊起，所以是安全的。
  默认是 `true`。
* `classes` (`boolean`) -
  显示本规则是否检查上层作用域的类声明的标志。
  如果是 `true`，这个规则会警告每个在类声明之前对类的引用。
  否则，如果声明是在上层函数作用域中，就会忽略这些引用。
  类声明没有被吊起，所以可能会有危险。
  默认为 `true`。
* `variables` (`boolean`) -
  这个标志决定了规则是否检查上层作用域中的变量声明。
  如果是 `true`，规则会警告每一个在变量声明前对变量的引用。
  否则，如果声明在上层范围内，规则会忽略引用，而如果引用与声明在同一范围内，则仍然会报告。
  默认为 `true`。
* `allowNamedExports` (`boolean`)-
  如果这个标志被设置为 `true`，规则总是允许在 `export {};`声明中的引用。
  这些引用是安全的，即使这些变量是在代码的后面声明的。
  默认是 `false`。

这个规则接受 `"nofunc"` 字符串作为一个选项。
`"nofunc"` 与 `{ "functions": false, "classes": true, "variables": true, "allowNamedExports": false }` 相同。

### functions

使用 `{ "functions": false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-use-before-define: ["error", { "functions": false }]*/

f();
function f() {}
```

:::

该选项允许对函数声明的引用。关于函数表达式和箭头函数，请参见 [`variables`](#variables) 选项。

### classes

使用 `{ "classes": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-use-before-define: ["error", { "classes": false }]*/

new A();
class A {
}

{
    class C extends C {}
}

{
    class C extends D {}
    class D {}
}

{
    class C {
        static x = "foo";
        [C.x]() {}
    }
}

{
    class C {
        static {
            new D();
        }
    }
    class D {}
}
```

:::

使用 `{ "classes": false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-use-before-define: ["error", { "classes": false }]*/

function foo() {
    return new A();
}

class A {
}
```

:::

### variables

使用 `{ "variables": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-use-before-define: ["error", { "variables": false }]*/

console.log(foo);
var foo = 1;

f();
const f = () => {};

g();
const g = function() {};

{
    const C = class {
        static x = C;
    }
}

{
    const C = class {
        static x = foo;
    }
    const foo = 1;
}

{
    class C {
        static {
            this.x = foo;
        }
    }
    const foo = 1;
}
```

:::

使用 `{ "variables": false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-use-before-define: ["error", { "variables": false }]*/

function baz() {
    console.log(foo);
}
var foo = 1;

const a = () => f();
function b() { return f(); }
const c = function() { return f(); }
const f = () => {};

const e = function() { return g(); }
const g = function() {}

{
    const C = class {
        x = foo;
    }
    const foo = 1;
}
```

:::

### allowNamedExports

使用 `{ "allowNamedExports": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-use-before-define: ["error", { "allowNamedExports": true }]*/

export { a, b, f, C };

const a = 1;

let b;

function f () {}

class C {}
```

:::

使用 `{ "allowNamedExports": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-use-before-define: ["error", { "allowNamedExports": true }]*/

export default a;
const a = 1;

const b = c;
export const c = 1;

export function foo() {
    return d;
}
const d = 1;
```

:::
