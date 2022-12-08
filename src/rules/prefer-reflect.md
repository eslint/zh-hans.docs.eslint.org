---
title: prefer-reflect
layout: doc
rule_type: suggestion
related_rules:
- no-useless-call
- prefer-spread
- no-delete-var
---

此规则在 ESLint v3.9.0，不会被替换。这条规则的初衷现在看来是被误导了，因为我们已经明白，`Reflect` 方法实际上并不是为了取代规则中建议的 `Object` 对应物，而是作为低级原始类型存在，与代理一起使用，以便复制以前存在的各种功能的默认行为，在被**废弃**。

**请注意**：这条规则包含一个不正确的行为——它会建议你使用 `Reflect.getOwnPropertyNames` 而不是 `Object.getOwnPropertyNames`，但前者在[规范](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflection)中并不存在。我们建议使用 `exceptions` 选项和 `"getOwnPropertyNames"` 来避免这个错误的建议。

ES6 Reflect API 附带了一些方法，这些方法在某种程度上废弃了旧的构造函数上的方法：

* [`Reflect.apply`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.apply) effectively deprecates [`Function.prototype.apply`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-function.prototype.apply) and [`Function.prototype.call`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-function.prototype.call)
* [`Reflect.deleteProperty`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.deleteproperty) effectively deprecates the [`delete` keyword](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-delete-operator-runtime-semantics-evaluation)
* [`Reflect.getOwnPropertyDescriptor`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.getownpropertydescriptor) effectively deprecates [`Object.getOwnPropertyDescriptor`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.getownpropertydescriptor)
* [`Reflect.getPrototypeOf`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.getprototypeof) effectively deprecates [`Object.getPrototypeOf`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.getprototypeof)
* [`Reflect.setPrototypeOf`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.setprototypeof) effectively deprecates [`Object.setPrototypeOf`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.setprototypeof)
* [`Reflect.preventExtensions`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.preventextensions)  effectively deprecates [`Object.preventExtensions`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.preventextensions)

prefer-reflect 规则将标记任何旧方法的使用，建议使用较新的 Reflect 版本。

## 规则细节

## 选项

### Exceptions

```js
"prefer-reflect": [<enabled>, { "exceptions": [<...exceptions>] }]
```

`exceptions` 选项允许你传递一个你想继续使用的旧风格的方法名称数组。

例如，如果你希望使用所有的 Reflect 方法，除了 `Function.prototype.apply`，那么你的配置将是 `prefer-reflect: [2, { "exceptions": ["apply"] }]`。

如果你想使用 Reflect 方法，但继续使用 `delete`关键字，那么你的配置将看起来像 `prefer-reflect: [2, { "exceptions": ["delete"] }]`。

这些可以根据你的需要进行组合。要使所有方法成为例外（从而使这一规则无用），使用 `prefer-reflect。[2, { "exceptions": ["apply", "call", "defineProperty", "getOwnPropertyDescriptor", "getPrototypeOf", "setPrototypeOf", "isExtensible", "getOwnPropertyNames", "preventExtensions", "delete" ] }]`

### Reflect.apply

废弃了 `Function.prototype.apply()` 和 `Function.prototype.call()`。

本规则在没有例外情况下使用时的**错误**示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

myFunction.apply(undefined, args);
myFunction.apply(null, args);
obj.myMethod.apply(obj, args);
obj.myMethod.apply(other, args);

myFunction.call(undefined, arg);
myFunction.call(null, arg);
obj.myMethod.call(obj, arg);
obj.myMethod.call(other, arg);
```

:::

在没有例外的情况下使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.apply(myFunction, undefined, args);
Reflect.apply(myFunction, null, args);
Reflect.apply(obj.myMethod, obj, args);
Reflect.apply(obj.myMethod, other, args);
Reflect.apply(myFunction, undefined, [arg]);
Reflect.apply(myFunction, null, [arg]);
Reflect.apply(obj.myMethod, obj, [arg]);
Reflect.apply(obj.myMethod, other, [arg]);
```

:::

使用此规则与 `{ "exceptions": ["apply"] }` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["apply"] }]*/

// in addition to Reflect.apply(...):
myFunction.apply(undefined, args);
myFunction.apply(null, args);
obj.myMethod.apply(obj, args);
obj.myMethod.apply(other, args);
```

:::

使用此规则与 `{ "exceptions": ["call"] }` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["call"] }]*/

// in addition to Reflect.apply(...):
myFunction.call(undefined, arg);
myFunction.call(null, arg);
obj.myMethod.call(obj, arg);
obj.myMethod.call(other, arg);
```

:::

### Reflect.defineProperty

废弃了 `Object.defineProperty()`

在没有例外情况下使用此规则时的**错误**示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.defineProperty({}, 'foo', {value: 1})
```

:::

在没有例外的情况下使用此规则时的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.defineProperty({}, 'foo', {value: 1})
```

:::

使用此规则与 `{ "exceptions": ["defineProperty"] }` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["defineProperty"] }]*/

Object.defineProperty({}, 'foo', {value: 1})
Reflect.defineProperty({}, 'foo', {value: 1})
```

:::

### Reflect.getOwnPropertyDescriptor

废弃了 `Object.getOwnPropertyDescriptor()`。

在没有例外情况下使用此规则时的**错误**示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.getOwnPropertyDescriptor({}, 'foo')
```

:::

在没有例外的情况下使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.getOwnPropertyDescriptor({}, 'foo')
```

:::

使用此规则与 `{ "exceptions": ["getOwnPropertyDescriptor"] }` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["getOwnPropertyDescriptor"] }]*/

Object.getOwnPropertyDescriptor({}, 'foo')
Reflect.getOwnPropertyDescriptor({}, 'foo')
```

:::

### Reflect.getPrototypeOf

废弃了 `Object.getPrototypeOf()`。

在没有例外的情况下使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.getPrototypeOf({}, 'foo')
```

:::

在没有例外的情况下使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.getPrototypeOf({}, 'foo')
```

:::

使用此规则与 `{ "exceptions": ["getPrototypeOf"] }` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["getPrototypeOf"] }]*/

Object.getPrototypeOf({}, 'foo')
Reflect.getPrototypeOf({}, 'foo')
```

:::

### Reflect.setPrototypeOf

废弃了 `Object.setPrototypeOf()`。

在没有例外的情况下使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.setPrototypeOf({}, Object.prototype)
```

:::

在没有例外的情况下使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.setPrototypeOf({}, Object.prototype)
```

:::

使用此规则与 `{ "exceptions": ["setPrototypeOf"] }` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["setPrototypeOf"] }]*/

Object.setPrototypeOf({}, Object.prototype)
Reflect.setPrototypeOf({}, Object.prototype)
```

:::

### Reflect.isExtensible

废弃了 `Object.isExtensible`。

在没有例外的情况下使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.isExtensible({})
```

:::

在没有例外的情况下使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.isExtensible({})
```

:::

使用此规则与 `{ "exceptions": ["isExtensible"] }` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["isExtensible"] }]*/

Object.isExtensible({})
Reflect.isExtensible({})
```

:::

### Reflect.preventExtensions

废弃了 `Object.preventExtensions()`。

在没有例外情况下使用此规则时的**错误**示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.preventExtensions({})
```

:::

在没有例外的情况下使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.preventExtensions({})
```

:::

使用此规则与 `{ "exceptions": ["preventExtensions"] }` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["preventExtensions"] }]*/

Object.preventExtensions({})
Reflect.preventExtensions({})
```

:::

### Reflect.deleteProperty

废弃了 `delete` 关键字

在没有例外情况下使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

delete foo.bar; // deleting object property
```

:::

在没有例外情况下使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

delete bar; // deleting variable
Reflect.deleteProperty(foo, 'bar');
```

:::

注意：关于防止删除变量的规则，见 [no-delete-var instead](no-delete-var)

使用此规则与 `{ "exceptions": ["delete"] }` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["delete"] }]*/

delete bar
delete foo.bar
Reflect.deleteProperty(foo, 'bar');
```

:::

## 何时不用

不应该在 ES3/5 环境中使用此规则。

在 ES2015（ES6）或更高版本中，如果你不希望被通知有可能使用 Reflect 的地方，你可以安全地禁用这个规则。
