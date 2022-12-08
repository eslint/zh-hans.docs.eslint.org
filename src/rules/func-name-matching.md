---
title: func-name-matching
layout: doc
rule_type: suggestion
---

## 规则细节

这条规则要求函数名必须与被分配的变量或属性名相匹配。如果属性名称是一个字面，而这个字面在你的配置中指定的 ECMAScript 版本（默认为 ES5）中不是一个有效的标识符，那么该规则将忽略属性的分配。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint func-name-matching: "error"*/

var foo = function bar() {};
foo = function bar() {};
obj.foo = function bar() {};
obj['foo'] = function bar() {};
var obj = {foo: function bar() {}};
({['foo']: function bar() {}});

class C {
    foo = function bar() {};
}
```

:::

::: incorrect

```js
/*eslint func-name-matching: ["error", "never"] */

var foo = function foo() {};
foo = function foo() {};
obj.foo = function foo() {};
obj['foo'] = function foo() {};
var obj = {foo: function foo() {}};
({['foo']: function foo() {}});

class C {
    foo = function foo() {};
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint func-name-matching: "error"*/
/*eslint func-name-matching: ["error", "always"]*/ // these are equivalent
/*eslint-env es6*/

var foo = function foo() {};
var foo = function() {};
var foo = () => {};
foo = function foo() {};

obj.foo = function foo() {};
obj['foo'] = function foo() {};
obj['foo//bar'] = function foo() {};
obj[foo] = function bar() {};

var obj = {foo: function foo() {}};
var obj = {[foo]: function bar() {}};
var obj = {'foo//bar': function foo() {}};
var obj = {foo: function() {}};

obj['x' + 2] = function bar(){};
var [ bar ] = [ function bar(){} ];
({[foo]: function bar() {}})

class C {
    foo = function foo() {};
    baz = function() {};
}

// private names are ignored
class D {
    #foo = function foo() {};
    #bar = function foo() {};
    baz() {
        this.#foo = function foo() {};
        this.#foo = function bar() {};
    }
}

module.exports = function foo(name) {};
module['exports'] = function foo(name) {};
```

:::

::: correct

```js
/*eslint func-name-matching: ["error", "never"] */
/*eslint-env es6*/

var foo = function bar() {};
var foo = function() {};
var foo = () => {};
foo = function bar() {};

obj.foo = function bar() {};
obj['foo'] = function bar() {};
obj['foo//bar'] = function foo() {};
obj[foo] = function foo() {};

var obj = {foo: function bar() {}};
var obj = {[foo]: function foo() {}};
var obj = {'foo//bar': function foo() {}};
var obj = {foo: function() {}};

obj['x' + 2] = function bar(){};
var [ bar ] = [ function bar(){} ];
({[foo]: function bar() {}})

class C {
    foo = function bar() {};
    baz = function() {};
}

// private names are ignored
class D {
    #foo = function foo() {};
    #bar = function foo() {};
    baz() {
        this.#foo = function foo() {};
        this.#foo = function bar() {};
    }
}

module.exports = function foo(name) {};
module['exports'] = function foo(name) {};
```

:::

## 选项

这个规则需要一个 `always` 或 `never` 的可选字符串（当省略时，默认为 `always`），以及一个带有两个属性 `considerPropertyDescriptor` 和 `includeCommonJSModuleExports` 的可选选项对象。

### considerPropertyDescriptor

布尔值，默认为 `false`。如果 `considerPropertyDescriptor` 被设置为 true，将检查 `Object.create`、`Object.defineProperty`、`Object.defineProperties` 和 `Reflect.defineProperty` 的使用。

使用 `{ considerPropertyDescriptor: true }` 选项的**正确**示例：

::: correct

```js
/*eslint func-name-matching: ["error", { "considerPropertyDescriptor": true }]*/
/*eslint func-name-matching: ["error", "always", { "considerPropertyDescriptor": true }]*/ // these are equivalent
var obj = {};
Object.create(obj, {foo:{value: function foo() {}}});
Object.defineProperty(obj, 'bar', {value: function bar() {}});
Object.defineProperties(obj, {baz:{value: function baz() {} }});
Reflect.defineProperty(obj, 'foo', {value: function foo() {}});
```

:::

使用 `{ considerPropertyDescriptor: true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-name-matching: ["error", { "considerPropertyDescriptor": true }]*/
/*eslint func-name-matching: ["error", "always", { "considerPropertyDescriptor": true }]*/ // these are equivalent
var obj = {};
Object.create(obj, {foo:{value: function bar() {}}});
Object.defineProperty(obj, 'bar', {value: function baz() {}});
Object.defineProperties(obj, {baz:{value: function foo() {} }});
Reflect.defineProperty(obj, 'foo', {value: function value() {}});
```

:::

### includeCommonJSModuleExports

布尔值，默认为 `false`。如果 `includeCommonJSModuleExports` 被设置为 true，此规则将检查 `module.exports` 和 `module["exports"]`。

使用 `{ includeCommonJSModuleExports: true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint func-name-matching: ["error", { "includeCommonJSModuleExports": true }]*/
/*eslint func-name-matching: ["error", "always", { "includeCommonJSModuleExports": true }]*/ // these are equivalent

module.exports = function foo(name) {};
module['exports'] = function foo(name) {};
```

:::

## 何时不用

如果你想允许命名的函数拥有与它们被分配到的变量或属性不同的名称，请不要使用这条规则。

## 兼容

* **JSCS**：[requireMatchingFunctionName](https://jscs-dev.github.io/rule/requireMatchingFunctionName)
