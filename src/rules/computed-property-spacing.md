---
title: computed-property-spacing
rule_type: layout
related_rules:
- array-bracket-spacing
- comma-spacing
- space-in-parens
---

虽然格式化的偏好是非常个人化的，但一些风格指南要求或不允许在以下情况下在计算属性之间有空格：

```js
/*eslint-env es6*/

var obj = { prop: "value" };
var a = "prop";
var x = obj[a]; // computed property in object member expression

var a = "prop";
var obj = {
  [a]: "value" // computed property key in object literal (ECMAScript 6)
};

var obj = { prop: "value" };
var a = "prop";
var { [a]: x } = obj; // computed property key in object destructuring pattern (ECMAScript 6)
```

## 规则细节

这条规则强制要求计算的属性括号内的间距一致。

它要求或不允许括号和括号内的值之间有空格。
这条规则不适用于用换行将其与相邻值分开的括号。

## 选项

这个规则有两个选项，一个字符串选项和一个对象选项：

字符串选项：

* `"never"`（默认值）不允许在计算属性的括号内有空格
* `"always"` 要求计算属性括号内有一个或多个空格

对象选项：

* `"enforceForClassMembers": true`（默认值）另外将此规则应用于类成员。

### never

使用此规则与默认的 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint computed-property-spacing: ["error", "never"]*/
/*eslint-env es6*/

obj[foo ]
obj[ 'foo']
var x = {[ b ]: a}
obj[foo[ bar ]]

const { [ a ]: someProp } = obj;
({ [ b ]: anotherProp } = anotherObj);
```

:::

使用此规则与默认的 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint computed-property-spacing: ["error", "never"]*/
/*eslint-env es6*/

obj[foo]
obj['foo']
var x = {[b]: a}
obj[foo[bar]]

const { [a]: someProp } = obj;
({ [b]: anotherProp } = anotherObj);
```

:::

### always

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint computed-property-spacing: ["error", "always"]*/
/*eslint-env es6*/

obj[foo]
var x = {[b]: a}
obj[ foo]
obj['foo' ]
obj[foo[ bar ]]
var x = {[ b]: a}
const { [a]: someProp } = obj;
({ [b ]: anotherProp } = anotherObj);
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint computed-property-spacing: ["error", "always"]*/
/*eslint-env es6*/

obj[ foo ]
obj[ 'foo' ]
var x = {[ b ]: a}
obj[ foo[ bar ] ]
const { [ a ]: someProp } = obj;
({ [ b ]: anotherProp } = anotherObj);
```

:::

#### enforceForClassMembers

如果 `enforceForClassMembers` 设置为 `true`（默认），该规则也不允许/执行类方法、getters 和 setters 的计算键内的空格。

使用此规则与默认的 `"never"` 和 `{ "enforceForClassMembers": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint computed-property-spacing: ["error", "never", { "enforceForClassMembers": true }]*/
/*eslint-env es6*/

class Foo {
  [a ]() {}
  get [b ]() {}
  set [b ](value) {}
}

const Bar = class {
  [ a](){}
  static [ b]() {}
  static get [ c ]() {}
  static set [ c ](value) {}
}
```

:::

使用此规则与默认的 `"never"` 和 `{ "enforceForClassMembers": true }` 选项的**正确**示例：

::: correct

```js
/*eslint computed-property-spacing: ["error", "never", { "enforceForClassMembers": true }]*/
/*eslint-env es6*/

class Foo {
  [a]() {}
  get [b]() {}
  set [b](value) {}
}

const Bar = class {
  [a](){}
  static [b]() {}
  static get [c]() {}
  static set [c](value) {}
}
```

:::

使用此规则与 `"never"` 和 `{ "enforceForClassMembers": false }` 选项的**正确**示例：

::: correct

```js
/*eslint computed-property-spacing: ["error", "never", { "enforceForClassMembers": false }]*/
/*eslint-env es6*/

class Foo {
  [a ]() {}
  get [b ]() {}
  set [b ](value) {}
}

const Bar = class {
  [ a](){}
  static [ b]() {}
  static get [ c ]() {}
  static set [ c ](value) {}
}
```

:::

## 何时不用

如果你不关心计算属性的一致性，你可以把这个规则关掉。
