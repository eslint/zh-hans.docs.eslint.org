---
title: space-before-blocks
layout: doc
rule_type: layout
related_rules:
- keyword-spacing
- arrow-spacing
- switch-colon-spacing
- block-spacing
- brace-style
---

一致性是任何风格指南的一个重要部分。
虽然将块的开头括号放在哪里是个人的偏好，但它应该在整个项目中保持一致。
不一致的风格会分散读者的注意力，使其无法看到代码的重要部分。

## 规则细节

这条规则将强制执行区块前的间距的一致性。它只适用于不从新行开始的块。

* 这条规则忽略了 `=>` 和块之间的间距。间距由 "箭头间距 "规则来处理。
* 这条规则忽略了关键词和区块之间的间距。间距由 "关键词间距 "规则处理。
* 这条规则忽略了在 switch case 的 `:` 和 block 之间的间距。间隔由 `switch-colon-spacing` 规则处理。

## 选项

这个规则需要一个参数。如果它是 `"always"`，那么块必须总是有至少一个前面的空格。如果是 `"never"`，那么所有区块都不应该有任何前面的空格。
那么所有的区块都不应该有任何前面的空格。如果需要对函数块、关键字块和类有不同的间距，可以通过一个可选的配置对象作为规则参数来
分别配置这些情况。如果配置对象中的任何一个值是 `"off"`，那么这两种风格都不会被强制用于该类型的块。

( e.g. `{ "functions": "never", "keywords": "always", "classes": "always" }` )

The default is `"always"`.

### "always"

使用此规则与 "always" 选项的**错误**示例：

::: incorrect

```js
/*eslint space-before-blocks: "error"*/

if (a){
    b();
}

function a(){}

for (;;){
    b();
}

try {} catch(a){}

class Foo{
  constructor(){}
}
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint space-before-blocks: "error"*/

if (a) {
    b();
}

if (a) {
    b();
} else{ /*no error. this is checked by `keyword-spacing` rule.*/
    c();
}

class C {
    static{} /*no error. this is checked by `keyword-spacing` rule.*/
}

function a() {}

for (;;) {
    b();
}

try {} catch(a) {}
```

:::

### "never"

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-before-blocks: ["error", "never"]*/

if (a) {
    b();
}

function a() {}

for (;;) {
    b();
}

try {} catch(a) {}
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint space-before-blocks: ["error", "never"]*/

if (a){
    b();
}

function a(){}

for (;;){
    b();
}

try{} catch(a){}

class Foo{
  constructor(){}
}
```

:::

Examples of **incorrect** code for this rule when configured `{ "functions": "never", "keywords": "always", "classes": "never" }`:

::: incorrect

```js
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "always", "classes": "never" }]*/
/*eslint-env es6*/

function a() {}

try {} catch(a){}

class Foo{
  constructor() {}
}
```

:::

使用此规则与 `{ "functions": "never", "keywords": "always", "classes": "never" }` 的**正确**示例：

::: correct

```js
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "always", "classes": "never" }]*/
/*eslint-env es6*/

for (;;) {
  // ...
}

describe(function(){
  // ...
});

class Foo{
  constructor(){}
}
```

:::

使用此规则与 `{ "functions": "always", "keywords": "never", "classes": "never" }` 的**错误**示例：

::: incorrect

```js
/*eslint space-before-blocks: ["error", { "functions": "always", "keywords": "never", "classes": "never" }]*/
/*eslint-env es6*/

function a(){}

try {} catch(a) {}

class Foo {
  constructor(){}
}
```

:::

使用此规则与 `{ "functions": "always", "keywords": "never", "classes": "never" }` 的**正确**示例：

::: correct

```js
/*eslint space-before-blocks: ["error", { "functions": "always", "keywords": "never", "classes": "never" }]*/
/*eslint-env es6*/

if (a){
  b();
}

var a = function() {}

class Foo{
  constructor() {}
}
```

:::

使用此规则与 `{ "functions": "never", "keywords": "never", "classes": "always" }` 的**错误**示例：

::: incorrect

```js
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "never", "classes": "always" }]*/
/*eslint-env es6*/

class Foo{
  constructor(){}
}
```

:::

使用此规则与 `{ "functions": "never", "keywords": "never", "classes": "always" }` 的**正确**示例：

::: correct

```js
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "never", "classes": "always" }]*/
/*eslint-env es6*/

class Foo {
  constructor(){}
}
```

:::

## 何时不用

如果你不关心区块前间距的一致性，你可以关闭这一规则。
