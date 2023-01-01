---
title: no-implicit-globals
layout: doc
rule_type: suggestion
related_rules:
- no-undef
- no-global-assign
- no-unused-vars
further_reading:
- https://benalman.com/news/2010/11/immediately-invoked-function-expression/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Undeclared_var
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone
---

最好的做法是避免用本应属于脚本的局部变量“污染”全局范围。

从一个脚本中创建的全局变量可能会与从另一个脚本中创建的全局变量产生名称冲突，这通常会导致运行时错误或意外行为。

这条规则不允许以下情况：

* 在全局范围内创建一个或多个变量的声明。
* 全局变量的泄漏。
* 对只读的全局变量的重新声明和对只读的全局变量的赋值。

在需要的时候，有一种明确的方法来创建全局变量，即通过赋值给全局对象的一个属性。

这条规则对浏览器脚本大多有用。ES 模块和 CommonJS 模块中的顶级声明会创建模块范围内的
变量。ES 模块也有隐含的 `strict` 模式，可以防止全局变量的泄露。

默认情况下，本规则不检查 `const`、`let` 和 `class` 声明。

本规则有一个对象选项：

* 如果你想让这个规则也检查 `const`、`let` 和 `class` 的声明，就把 `"lexicalBindings"` 设置为 `true`。

## 规则细节

### `var` and `function` declarations

在处理浏览器脚本时，开发人员经常忘记，顶层范围的变量和函数声明会成为 `window` 对象上的全局变量。相对于有自己作用域的模块而言。全局变量应该明确地分配给 `window` 或 `self`，如果这是它的意图。否则，打算在脚本中使用的变量应该用一个 IIFE 来包装。

这条规则不允许在顶层脚本范围内声明 `var` 和 `function`。这并不适用于 ES 和 CommonJS 模块，因为它们都使用了模块范围。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-implicit-globals: "error"*/

var foo = 1;

function bar() {}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-implicit-globals: "error"*/

// explicitly set on window
window.foo = 1;
window.bar = function() {};

// intended to be scope to this file
(function() {
  var foo = 1;

  function bar() {}
})();
```

:::

使用此规则与 `"parserOptions": { "sourceType": "module" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-implicit-globals: "error"*/

// foo and bar are local to module
var foo = 1;
function bar() {}
```

:::

### Global variable leaks

当代码不是在 `strict` 模式下，对未声明的变量的赋值会创建一个新的全局变量。即使代码是在一个函数中，这也会发生。

这不适用于 ES 模块，因为模块代码是隐含在 `strict` 模式中的。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-implicit-globals: "error"*/

foo = 1;

Bar.prototype.baz = function () {
    a = 1; // Intended to be this.a = 1;
};
```

:::

### Read-only global variables

这条规则也不允许对只读的全局变量进行重新声明和对只读的全局变量进行赋值。

一个只读的全局变量可以是 ES 内置的全局变量（如 `Array`），也可以是环境中的全局变量（如浏览器环境中的 `window`），或者在配置文件中定义为 `readonly` 的全局变量或在 `/*global */` 注释中定义的全局变量。

* [指定环境](../user-guide/configuring#specifying-environments)
* [指定全局变量](../user-guide/configuring#specifying-globals)

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-implicit-globals: "error"*/

/*global foo:readonly*/

foo = 1;

Array = [];
var Object;
```

:::

### `const`, `let` and `class` declarations

词法声明 `const` 和 `let`，以及 `class` 声明，创建的变量都是块范围的。

然而，当在浏览器脚本的顶层声明时，这些变量不是“脚本范围”。
它们实际上是在全局范围内创建的，并且可能会产生与
 `var`、`const` 和 `let` 变量以及其他脚本的 `function` 和 `class` 声明产生名称冲突。
这不适用于 ES 和 CommonJS 模块。

如果该变量打算成为脚本的本地变量，请用一个块或一个立即调用的函数表达式（IIFE）来包装代码。

使用此规则并将默认的 `"lexicalBindings"` 选项设置为 `false` 时的**正确**示例：

::: correct

```js
/*eslint no-implicit-globals: ["error", {"lexicalBindings": false}]*/

const foo = 1;

let baz;

class Bar {}
```

:::

使用此规则并将 `"lexicalBindings"` 选项设置为 `true` 时的**错误**示例：

::: incorrect

```js
/*eslint no-implicit-globals: ["error", {"lexicalBindings": true}]*/

const foo = 1;

let baz;

class Bar {}
```

:::

使用此规则并将 `"lexicalBindings"` 选项设置为 `true` 时的**正确**示例：

::: correct

```js
/*eslint no-implicit-globals: ["error", {"lexicalBindings": true}]*/

{
    const foo = 1;
    let baz;
    class Bar {}
}

(function() {
    const foo = 1;
    let baz;
    class Bar {}
}());
```

:::

如果你打算创建一个全局的 `const` 或 `let` 变量或全局的 `class` 声明，以便在其他脚本中使用。
请注意，与传统的方法有所区别，即 `var` 声明和分配给全局 `window` 对象的一个属性。

* 词汇声明的变量不能被有条件地创建。脚本不能检查变量是否存在，然后再创建新的变量。`var` 总是会创建变量，但是重新声明不会导致运行时异常。
* 词法声明的变量不会在全局对象上创建属性，这也是耗时脚本可能期望的。
* 词法声明的变量是全局对象的影子属性，如果耗时脚本同时使用该变量，可能会产生错误。
如果消费脚本同时使用该变量和该属性，可能会产生错误。
* 如果初始化时抛出了一个异常，那么按词法声明的变量会产生一个永久的时间死区（TDZ）。
即使是 `typeof` 检查也不能避免 TDZ 引用异常。

使用此规则并将 `lexicalBindings` 选项设置为 `true` 时的**错误**示例：

::: incorrect

```js
/*eslint no-implicit-globals: ["error", {"lexicalBindings": true}]*/

const MyGlobalFunction = (function() {
    const a = 1;
    let b = 2;
    return function() {
        return a + b;
    }
}());
```

:::

使用此规则并将 `"lexicalBindings"` 选项设置为 `true` 时的**正确**示例：

::: correct

```js
/*eslint no-implicit-globals: ["error", {"lexicalBindings": true}]*/

window.MyGlobalFunction = (function() {
    const a = 1;
    let b = 2;
    return function() {
        return a + b;
    }
}());
```

:::

### exported

你可以使用和 [`no-unused-vars`](./no-unused-vars) 一样的方法，即 `/* exported variableName */` 块注释。参见 [`no-unused-vars` exported section](./no-unused-vars#exported) 了解细节。

使用 `/* exported variableName */` 操作的**正确**示例：

::: correct

```js
/* exported global_var */
var global_var = 42;
```

:::

## 何时不用

在使用浏览器脚本的情况下，如果希望能够在全局范围内明确地声明变量和函数，且代码处于严格模式下或不希望此规则对未声明变量发出警告，同时也不希望此规则对只读全局变量发出警告，那么可以禁用此规则。

在使用 CommonJS 模块的情况下，如果代码处于严格模式下或不希望此规则对未声明变量发出警告，同时也不希望此规则对只读全局变量发出警告，那么可以禁用此规则。

在使用 ES 模块的情况下，如果不希望此规则对只读全局变量发出警告，那么可以禁用此规则。
