---
title: no-useless-computed-key
rule_type: suggestion
---

使用带有字面意义的计算属性是没有必要的，如：

```js
var foo = {["a"]: "b"};
```

这代码也可以写成：

```js
var foo = {"a": "b"};
```

## 规则细节

这条规则不允许在非必要的情况下使用计算的属性键。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-useless-computed-key: "error"*/

var a = { ['0']: 0 };
var a = { ['0+1,234']: 0 };
var a = { [0]: 0 };
var a = { ['x']: 0 };
var a = { ['x']() {} };
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-useless-computed-key: "error"*/

var c = { 'a': 0 };
var c = { 0: 0 };
var a = { x() {} };
var c = { a: 0 };
var c = { '0+1,234': 0 };
```

:::

使用此规则的额外**正确**示例：

::: correct

```js
/*eslint no-useless-computed-key: "error"*/

var c = {
    "__proto__": foo, // defines object's prototype

    ["__proto__"]: bar // defines a property named "__proto__"
};
```

:::

## 选项

此规则选项为对象：

* `enforceForClassMembers` 设置为 `true` 会将此规则额外应用于类成员（默认`false`）。

### enforceForClassMembers

默认情况下，该规则不检查类声明和类表达式。
因为 `enforceForClassMembers` 的默认值是 `false`。

当 `enforceForClassMembers` 被设置为 `true` 时，该规则也将不允许在类字段、类方法、类 getters 和类 setters 中使用不必要的计算键。

使用此规则与 `{ "enforceForClassMembers": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-useless-computed-key: ["error", { "enforceForClassMembers": true }]*/

class Foo {
    ["foo"] = "bar";

    [0]() {}
    ['a']() {}
    get ['b']() {}
    set ['c'](value) {}

    static ["foo"] = "bar";

    static ['a']() {}
}
```

:::

使用此规则与 `{ "enforceForClassMembers": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-useless-computed-key: ["error", { "enforceForClassMembers": true }]*/

class Foo {
    "foo" = "bar";

    0() {}
    'a'() {}
    get 'b'() {}
    set 'c'(value) {}

    static "foo" = "bar";

    static 'a'() {}
}
```

:::

使用此规则与 `{ "enforceForClassMembers": true }` 选项的额外**正确**示例：

::: correct

```js
/*eslint no-useless-computed-key: ["error", { "enforceForClassMembers": true }]*/

class Foo {
    ["constructor"]; // instance field named "constructor"

    "constructor"() {} // the constructor of this class

    ["constructor"]() {} // method named "constructor"

    static ["constructor"]; // static field named "constructor"

    static ["prototype"]; // runtime error, it would be a parsing error without `[]`
}
```

:::

## 何时不用

如果你不希望被通知到不必要的计算属性键，你可以安全地禁用这个规则。
