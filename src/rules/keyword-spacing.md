---
title: keyword-spacing
rule_type: layout
---

关键词是 JavaScript 的语法元素，如 `try` 和 `if`。
这些关键词对语言有特殊的意义，所以在代码编辑器中经常以不同的颜色出现。
作为语言的一个重要部分，风格指南经常提到关键词周围应该使用的间距。
例如，你可能有一个风格指南，说关键词应该总是由空格包围，这意味着 `if-else` 语句必须看起来像这样。

```js
if (foo) {
    // ...
} else {
    // ...
}
```

当然，你也可以有一个风格指南，不允许关键词周围有空格。

然而，如果你想强制执行 `function`关键词和下面的开头小括号之间的间距样式，请参考 [space-before-function-paren](space-before-function-paren)。

## 规则细节

这条规则使关键字和类似关键字的标记的间距一致。`as`（在模块声明中），`async`（在 async 函数中），`await`（在 await 表达式中），`break`、`case`、`catch`、`class`、`const`、`continue`、`debugger`、`default`、`delete`、`do`、`else`、`export`、`extends`、`finally`、`for`、`from`（在模块声明中）。`function`、`get`（getter）, `if`、`import`、`in`（在 for-in 语句中）、`let`、`new`、`of`（在 for-of 语句中）、`return`、`set`（setter）、`static`、`super`、`switch`、`this`、`throw`、`try`、`typeof`、`var`、`void`、`while`、`with` 和 `yield`。这条规则经过精心设计的，不与其他间距规则冲突：它不适用于其他规则报告有问题的间距。

## 选项

此规则选项为对象：

* `"before": true`（默认值）要求关键词前至少有一个空格。
* `"before": false` 不允许关键词前有空格。
* `"after": true`（默认值）要求关键词后面至少有一个空格。
* `"after": false` 不允许关键词后有空格。
* `"overrides"` 允许覆盖指定关键词的间距样式。

### before

使用此规则与默认的 `{ "before": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint keyword-spacing: ["error", { "before": true }]*/

if (foo) {
    //...
}else if (bar) {
    //...
}else {
    //...
}
```

:::

使用此规则与默认的 `{ "before": true }` 选项的**正确**示例：

::: correct

```js
/*eslint keyword-spacing: ["error", { "before": true }]*/
/*eslint-env es6*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}

// Avoid conflict with `array-bracket-spacing`
let a = [this];
let b = [function() {}];

// Avoid conflict with `arrow-spacing`
let a = ()=> this.foo;

// Avoid conflict with `block-spacing`
{function foo() {}}

// Avoid conflict with `comma-spacing`
let a = [100,this.foo, this.bar];

// Avoid conflict with `computed-property-spacing`
obj[this.foo] = 0;

// Avoid conflict with `generator-star-spacing`
function *foo() {}

// Avoid conflict with `key-spacing`
let obj = {
    foo:function() {}
};

// Avoid conflict with `object-curly-spacing`
let obj = {foo: this};

// Avoid conflict with `semi-spacing`
let a = this;function foo() {}

// Avoid conflict with `space-in-parens`
(function () {})();

// Avoid conflict with `space-infix-ops`
if ("foo"in {foo: 0}) {}
if (10+this.foo<= this.bar) {}

// Avoid conflict with `jsx-curly-spacing`
let a = <A foo={this.foo} bar={function(){}} />
```

:::

使用此规则与 `{ "before": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint keyword-spacing: ["error", { "before": false }]*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}
```

:::

使用此规则与 `{ "before": false }` 选项的**正确**示例：

::: correct

```js
/*eslint keyword-spacing: ["error", { "before": false }]*/

if (foo) {
    //...
}else if (bar) {
    //...
}else {
    //...
}
```

:::

### after

使用此规则与默认的 `{ "after": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint keyword-spacing: ["error", { "after": true }]*/

if(foo) {
    //...
} else if(bar) {
    //...
} else{
    //...
}
```

:::

使用此规则与默认的 `{ "after": true }` 选项的**正确**示例：

::: correct

```js
/*eslint keyword-spacing: ["error", { "after": true }]*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}

// Avoid conflict with `array-bracket-spacing`
let a = [this];

// Avoid conflict with `arrow-spacing`
let a = ()=> this.foo;

// Avoid conflict with `comma-spacing`
let a = [100, this.foo, this.bar];

// Avoid conflict with `computed-property-spacing`
obj[this.foo] = 0;

// Avoid conflict with `generator-star-spacing`
function* foo() {}

// Avoid conflict with `key-spacing`
let obj = {
    foo:function() {}
};

// Avoid conflict with `func-call-spacing`
class A {
    constructor() {
        super();
    }
}

// Avoid conflict with `object-curly-spacing`
let obj = {foo: this};

// Avoid conflict with `semi-spacing`
let a = this;function foo() {}

// Avoid conflict with `space-before-function-paren`
function() {}

// Avoid conflict with `space-infix-ops`
if ("foo"in{foo: 0}) {}
if (10+this.foo<= this.bar) {}

// Avoid conflict with `space-unary-ops`
function* foo(a) {
    return yield+a;
}

// Avoid conflict with `yield-star-spacing`
function* foo(a) {
    return yield* a;
}

// Avoid conflict with `jsx-curly-spacing`
let a = <A foo={this.foo} bar={function(){}} />
```

:::

使用此规则与 `{ "after": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint keyword-spacing: ["error", { "after": false }]*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}
```

:::

使用此规则与 `{ "after": false }` 选项的**正确**示例：

::: correct

```js
/*eslint keyword-spacing: ["error", { "after": false }]*/

if(foo) {
    //...
} else if(bar) {
    //...
} else{
    //...
}
```

:::

### overrides

使用此规则与 `{ "overrides": { "if": { "after": false }, "for": { "after": false }, "while": { "after": false }, "static": { "after": false }, "as": { "after": false } } }` 选项的**正确**示例：

::: correct

```js
/*eslint keyword-spacing: ["error", { "overrides": {
  "if": { "after": false },
  "for": { "after": false },
  "while": { "after": false },
  "static": { "after": false },
  "as": { "after": false }
} }]*/

if(foo) {
    //...
} else if(bar) {
    //...
} else {
    //...
}

for(;;);

while(true) {
    //...
}

class C {
    static{
        //...
    }
}

export { C as"my class" };
```

:::

## 何时不用

如果你不想在关键词间距上执行一致性，你可以安全地禁用此规则。
