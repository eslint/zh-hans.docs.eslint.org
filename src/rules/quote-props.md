---
title: quote-props
rule_type: suggestion
further_reading:
- https://kangax.github.io/compat-table/es5/#Reserved_words_as_property_names
- https://mathiasbynens.be/notes/javascript-properties
---

对象的字面属性名称可以用两种方式定义：使用字面符号或使用字符串。例如，这两个对象是等同的：

```js
var object1 = {
    property: true
};

var object2 = {
    "property": true
};
```

在许多情况下，如果你选择使用标识符而不是字符串或反之亦然，这并不重要。即便如此，你可能会决定在你的代码中执行一种一致的风格。

然而，在一些场合，你必须使用引号：

1. 如果你使用的是 ECMAScript 3 的 JavaScript 引擎（比如 IE8），并且你想使用关键字（比如 `if`）作为属性名。ECMAScript 5 不再限制这一点。
2. 你想在你的属性名中使用一个非标识符，比如有一个属性带有空格，如 `"one two"`。

另一个例子是，当使用数字字面量作为属性键时，引号确实很重要：

```js
var object = {
    1e2: 1,
    100: 2
};
```

乍看起来没什么问题，但实际上这段代码在 ECMAScript 5 严格模式下会产生一个语法错误。这是因为 `1e2` 和 `100` 在被用作属性名之前被强制变成了字符串。`String(1e2)` 和 `String(100)` 刚好都等于 `"100"`，这导致了“严格模式下不允许对象字面的重复数据属性”的错误。这样的问题在调试时可能很棘手，所以有些人喜欢要求在所有属性名周围加上引号。

## 规则细节

这条规则要求在对象的字面属性名称周围加引号。

## 选项

这个规则有两个选项，一个字符串选项和一个对象选项：

字符串选项：

* `"always"`（默认值）要求在所有对象字面属性名称周围加引号
* `"as-needed"` 不允许在不严格要求的对象字面属性名称周围加引号
* `"consistent"` 强制执行一致的引号风格；在一个给定的对象中，要么所有的属性都应该被引号，要么所有的属性都不应该被引号
* `"consistent-as-needed"` 要求在所有对象字面属性名称周围加引号，如果任何名称严格要求加引号，否则不允许对象属性名称周围加引号

对象选项：

* `"keywords": true`要求在作为对象属性名称的语言关键词周围加引号（只在使用 `as-needed` 或 `consistent-as-needed`时适用）
* `"unnecessary": true` （默认值）不允许在不严格要求的对象字面属性名称周围加引号（只适用于使用 `as-needed`时）
* `"unnecessary": false` 允许在没有严格要求的对象字面属性名称周围加引号（只适用于使用 `as-needed` 的情况下）
* `"numbers": true` 需要在作为对象属性名称的数字周围加引号（只适用于使用 `as-needed` 时）

### always

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint quote-props: ["error", "always"]*/

var object = {
    foo: "bar",
    baz: 42
};
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint quote-props: ["error", "always"]*/
/*eslint-env es6*/

var object1 = {
    "foo": "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    'foo': 'bar',
    'baz': 42,
    'qux-lorem': true
};

var object3 = {
    foo() {
        return;
    }
};
```

:::

### as-needed

使用此规则与 `"as-needed"` 选项的**错误**示例：

::: incorrect

```js
/*eslint quote-props: ["error", "as-needed"]*/

var object = {
    "a": 0,
    "0": 0,
    "true": 0,
    "null": 0
};
```

:::

使用此规则与 `"as-needed"` 选项的**正确**示例：

::: correct

```js
/*eslint quote-props: ["error", "as-needed"]*/
/*eslint-env es6*/

var object1 = {
    "a-b": 0,
    "0x0": 0,
    "1e2": 0
};

var object2 = {
    foo: 'bar',
    baz: 42,
    true: 0,
    0: 0,
    'qux-lorem': true
};

var object3 = {
    foo() {
        return;
    }
};
```

:::

### consistent

使用此规则与 `"consistent"` 选项的**错误**示例：

::: incorrect

```js
/*eslint quote-props: ["error", "consistent"]*/

var object1 = {
    foo: "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    'foo': 'bar',
    baz: 42
};
```

:::

使用此规则与 `"consistent"` 选项的**正确**示例：

::: correct

```js
/*eslint quote-props: ["error", "consistent"]*/

var object1 = {
    "foo": "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    'foo': 'bar',
    'baz': 42
};

var object3 = {
    foo: 'bar',
    baz: 42
};
```

:::

### consistent-as-needed

使用此规则与 `"consistent-as-needed"` 选项的**错误**示例：

::: incorrect

```js
/*eslint quote-props: ["error", "consistent-as-needed"]*/

var object1 = {
    foo: "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    'foo': 'bar',
    'baz': 42
};
```

:::

使用此规则与 `"consistent-as-needed"` 选项的**正确**示例：

::: correct

```js
/*eslint quote-props: ["error", "consistent-as-needed"]*/

var object1 = {
    "foo": "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    foo: 'bar',
    baz: 42
};
```

:::

### keywords

此规则与 `"as-needed", { "keywords": true }` 选项的额外**错误**示例：

::: incorrect

```js
/*eslint quote-props: ["error", "as-needed", { "keywords": true }]*/

var x = {
    while: 1,
    volatile: "foo"
};
```

:::

使用此规则与 `"consistent-as-needed", { "keywords": true }` 选项的额外**错误**示例：

::: incorrect

```js
/*eslint quote-props: ["error", "consistent-as-needed", { "keywords": true }]*/

var x = {
    "prop": 1,
    "bar": "foo"
};
```

:::

### unnecessary

使用此规则与 `"as-needed", { "unnecessary": false }` 选项的额外**正确**示例：

::: correct

```js
/*eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }]*/

var x = {
    "while": 1,
    "foo": "bar"  // Would normally have caused a warning
};
```

:::

### numbers

使用此规则与`"as-needed", { "numbers": true }` 选项的额外**错误**示例：

::: incorrect

```js
/*eslint quote-props: ["error", "as-needed", { "numbers": true }]*/

var x = {
    100: 1
}
```

:::

## 何时不用

如果你不关心属性名是否一致地用引号包装，而且你不以传统的 ES3 环境为目标，那么就把这个规则关掉。
