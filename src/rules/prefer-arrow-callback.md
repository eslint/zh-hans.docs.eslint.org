---
title: prefer-arrow-callback
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
---

箭头函数可以成为回调或函数参数的函数表达式的一个有吸引力的替代品。

例如，箭头函数会自动绑定到其周围的范围/上下文。这提供了一种替代 ES6 之前的标准，即明确绑定函数表达式以实现类似的行为。

此外，箭头函数：

* 不那么冗长，而且更容易推理。

* 无论在什么地方或什么时候被调用，都以词法形式绑定。

## 规则细节

这条规则定位了用作回调或函数参数的函数表达式。对于任何可以用箭头函数替换而不改变结果的，将产生一个错误。

下面的例子**将会**被标记出来：

```js
/* eslint prefer-arrow-callback: "error" */

foo(function(a) { return a; }); // ERROR
// prefer: foo(a => a)

foo(function() { return this.a; }.bind(this)); // ERROR
// prefer: foo(() => this.a)
```

箭头函数不会产生相同结果的情况将被忽略。

以下例子**将不会**被标记：

```js
/* eslint prefer-arrow-callback: "error" */
/* eslint-env es6 */

// arrow function callback
foo(a => a); // OK

// generator as callback
foo(function*() { yield; }); // OK

// function expression not used as callback or function argument
var foo = function foo(a) { return a; }; // OK

// unbound function expression callback
foo(function() { return this.a; }); // OK

// recursive named function callback
foo(function bar(n) { return n && n + bar(n - 1); }); // OK
```

## 选项

通过一个选项对象来进一步控制这个规则的行为。

Default: `{ allowNamedFunctions: false, allowUnboundThis: true }`

### allowNamedFunctions

默认情况下 `{ "allowNamedFunctions": false }`，这个 `boolean` 选项禁止使用命名函数作为回调或函数参数。

将此值改为 `true` 将扭转该选项的行为，允许不受限制地使用命名函数。

`{ "allowNamedFunctions": true }` **将不会**标记下面的例子。

```js
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */

foo(function bar() {});
```

### allowUnboundThis

默认情况下 `{ "allowUnboundThis": true }`，这个 `boolean` 选项允许包含 `this` 的函数表达式被用作回调，只要相关的函数没有被明确绑定。

当设置为 `false` 时，该选项完全禁止使用函数表达式作为回调或函数参数，没有例外。

`{ "allowUnboundThis": false }` **将**标记以下例子。

```js
/* eslint prefer-arrow-callback: [ "error", { "allowUnboundThis": false } ] */
/* eslint-env es6 */

foo(function() { this.a; });

foo(function() { (() => this); });

someArray.map(function(item) { return this.doSomething(item); }, someObject);
```

## 何时不用

* 在尚未采用 ES6 语言特性的环境中（ES3/5）。

* 在允许在描述回调或函数参数时使用函数表达式的 ES6+环境中。
