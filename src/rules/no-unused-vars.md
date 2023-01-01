---
title: no-unused-vars
rule_type: problem
---

在代码中声明了变量，但没有在任何地方使用，这很可能是由于不完整的重构造成的错误。这样的变量占用了代码中的空间，会导致读者的混淆。

## 规则细节

这个规则的目的是消除未使用的变量、函数和函数参数。

一个变量 `foo` 被认为是被使用的，如果以下任何一项为真：

* 它被调用（`foo()`）或构造（`new foo()`）
* 它被读取（`var bar = foo`）
* 它被作为参数传入一个函数 (`doSomething(foo)`)
* 在一个函数中读取，并传递给另一个函数（`doSomething(function() { foo(); }）`）

如果一个变量只被声明（`var foo = 5`）或分配给（`foo = 7`），则不被认为是被使用。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unused-vars: "error"*/
/*global some_unused_var*/

// It checks variables you have defined as global
some_unused_var = 42;

var x;

// Write-only variables are not considered as used.
var y = 10;
y = 5;

// A read for a modification of itself is not considered as used.
var z = 0;
z = z + 1;

// By default, unused arguments cause warnings.
(function(foo) {
    return 5;
})();

// Unused recursive functions also cause warnings.
function fact(n) {
    if (n < 2) return 1;
    return n * fact(n - 1);
}

// When a function definition destructures an array, unused entries from the array also cause warnings.
function getY([x, y]) {
    return y;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-unused-vars: "error"*/

var x = 10;
alert(x);

// foo is considered used here
myFunc(function foo() {
    // ...
}.bind(this));

(function(foo) {
    return foo;
})();

var myFunc;
myFunc = setTimeout(function() {
    // myFunc is considered used
    myFunc();
}, 50);

// Only the second argument from the destructured array is used.
function getY([, y]) {
    return y;
}
```

:::

### exported

在 CommonJS 或 ECMAScript 模块之外的环境中，你可以使用 `var` 来创建一个全局变量，该变量可能被其他脚本使用。你可以使用 `/* exported variableName */` 注释块来表示这个变量被导出，因此不应该被认为是未使用的。

请注意，`/* exported */`对以下任何情况都没有影响：

* 当环境是 `node` 或 `commonjs` 时
* 当 `parserOptions.sourceType` 是 `module`时
* 当 `ecmaFeatures.globalReturn` 为 `true` 时

行注释 `// exported variableName` 将不起作用，因为 `exported` 不是特定于行的。

使用 `/* exported variableName */` 操作的**正确**示例：

::: correct

```js
/* exported global_var */

var global_var = 42;
```

:::

## 选项

这个规则需要一个参数，可以是一个字符串或一个对象。字符串的设置与 `vars` 属性的设置相同（解释如下）。

默认情况下，该规则对变量启用 `all` 选项，对参数启用 `after-used`。

```json
{
    "rules": {
        "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
    }
}
```

### vars

`vars` 选项有两个设置项：

* `all`检查所有变量的使用，包括全局范围内的变量。这是默认设置。
* `local`只检查本地声明的变量是否被使用，但会允许全局变量不被使用。

#### vars: local

使用 `{ "vars": "local" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
/*global some_unused_var */

some_unused_var = 42;
```

:::

### varsIgnorePattern

`varsIgnorePattern` 选项指定了不检查使用情况的例外情况：名称与 regexp 模式匹配的变量。例如，名称中含有 `ignored` 或 `Ignored` 的变量。

使用 `{ "varsIgnorePattern": "[iI]gnored" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

var firstVarIgnored = 1;
var secondVar = 2;
console.log(secondVar);
```

:::

### args

`args` 选项有三个设置：

* `after-used` - 在最后使用的参数之前出现的未使用的位置参数将不被检查，但所有命名的参数和最后使用的参数之后的所有位置参数将被检查。
* `all` - 必须使用所有命名的参数。
* `none` - 不检查参数。

#### args: after-used

使用默认的 `{ "args": "after-used" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-unused-vars: ["error", { "args": "after-used" }]*/

// 2 errors, for the parameters after the last used parameter (bar)
// "baz" is defined but never used
// "qux" is defined but never used
(function(foo, bar, baz, qux) {
    return bar;
})();
```

:::

使用默认的 `{ "args": "after-used" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-vars: ["error", {"args": "after-used"}]*/

(function(foo, bar, baz, qux) {
    return qux;
})();
```

:::

#### args: all

使用 `{ "args": "all" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-unused-vars: ["error", { "args": "all" }]*/

// 2 errors
// "foo" is defined but never used
// "baz" is defined but never used
(function(foo, bar, baz) {
    return bar;
})();
```

:::

#### args: none

使用 `{ "args": "none" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "args": "none" }]*/

(function(foo, bar, baz) {
    return bar;
})();
```

:::

### ignoreRestSiblings

`ignoreRestSiblings`选项是一个布尔值（默认：`false`）。使用 [Rest Property](https://github.com/tc39/proposal-object-rest-spread) 可以从一个对象的 `omit` 属性，但默认情况下，兄弟姐妹的属性被标记为 `unused`。启用这个选项后，其余属性的兄弟姐妹将被忽略。

使用 `{ "ignoreRestSiblings": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
// 'foo' and 'bar' were ignored because they have a rest property sibling.
var { foo, ...coords } = data;

var bar;
({ bar, ...coords } = data);
```

:::

### argsIgnorePattern

`argsIgnorePattern` 选项指定了不检查使用情况的例外情况：参数的名称与 regexp 模式相匹配。例如，名称以下划线开头的变量。

使用 `{ "argsIgnorePattern": "^_" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/

function foo(x, _y) {
    return x + 1;
}
foo();
```

:::

### destructuredArrayIgnorePattern

`destructuredArrayIgnorePattern` 选项指定了不检查使用的例外情况：名称与 regexp 模式匹配的数组解构模式的元素。例如，名字以下划线开头的变量。

使用 `{ "destructuredArrayIgnorePattern": "^_" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "destructuredArrayIgnorePattern": "^_" }]*/

const [a, _b, c] = ["a", "b", "c"];
console.log(a+c);

const { x: [_a, foo] } = bar;
console.log(foo);

function baz([_c, x]) {
    x;
}
baz();

function test({p: [_q, r]}) {
    r;
}
test();

let _m, n;
foo.forEach(item => {
    [_m, n] = item;
    console.log(n);
});

let _o, p;
_o = 1;
[_o, p] = foo;
p;
```

:::

### caughtErrors

`caughtErrors` 选项用于 `catch` 块参数的验证。

它有两个设置：

* `none` - 不检查错误对象。这是默认设置。
* `all` - 必须使用所有命名的参数。

#### caughtErrors: none

不指定这条规则就相当于把它指定为 `none`。

使用 `{ "caughtErrors": "none" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "caughtErrors": "none" }]*/

try {
    //...
} catch (err) {
    console.error("errors");
}
```

:::

#### caughtErrors: all

使用 `{ "caughtErrors": "all" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-unused-vars: ["error", { "caughtErrors": "all" }]*/

// 1 error
// "err" is defined but never used
try {
    //...
} catch (err) {
    console.error("errors");
}
```

:::

### caughtErrorsIgnorePattern

`caughtErrorsIgnorePattern` 选项指定了不检查使用的例外情况：捕获名称与 regexp 模式匹配的参数。例如，名字以 `ignore` 开头的变量。

使用 `{ "caughtErrorsIgnorePattern": "^ignore" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "caughtErrorsIgnorePattern": "^ignore" }]*/

try {
    //...
} catch (ignoreErr) {
    console.error("errors");
}
```

:::

## 何时不用

如果你不想得到关于未使用的变量或函数参数的通知，你可以安全地关闭这个规则。
