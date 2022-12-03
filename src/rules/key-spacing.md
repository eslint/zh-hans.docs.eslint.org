---
title: key-spacing
layout: doc
rule_type: layout
---

这个规则强制执行对象字面属性中的冒号周围的间距。它可以单独验证每个属性，也可以确保一个对象字面中相邻属性的水平对齐。

## 规则细节

这条规则使对象字面属性中的键和值之间的间距一致。在长行的情况下，在允许空白的地方添加一个新行是可以接受的。

## 选项

此规则选项为对象：

* `"beforeColon": false (default) | true`
    * `false`: 不允许在对象字面中的键和冒号之间有空格。
    * `true`: 要求在对象字面中的键和冒号之间至少有一个空格。
* "afterColon": true（默认） | false
    * `true`: 要求在对象字面中的冒号和值之间至少有一个空格。
    * `false`: 不允许在对象字面上的冒号和数值之间有空格。
* `"mode": "strict" (default) | "minimum"`
    * `"strict"`: 在对象字面的冒号前后强制执行一个空格。
    * `"minimum"`: 在对象字面的冒号之前或之后强制执行一个或多个空格。
* `"align": "value" | "colon"`：强制执行对象字词中冒号前后的一个或多个空格。
    * `"value"`: 在对象字面中强制执行水平对齐的值。
    * `"colon"`：在对象字面中对冒号和值都执行水平对齐。
* `"align"` 和一个对象值一起，允许在对象字面中的值被对齐时有细微的间距。
* `"singleLine"` 为单行对象字词指定一种间距样式。
* `"multiLine"` 为多行对象字词指定一种间距样式。

请注意，你可以使用顶层选项或分组选项（`singleLine` 和 `multiLine`），但不能同时使用。

### beforeColon

使用此规则与默认的 `{ "beforeColon": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint key-spacing: ["error", { "beforeColon": false }]*/

var obj = { "foo" : 42 };
```

:::

使用此规则与默认的 `{ "beforeColon": false }` 选项的**正确**示例：

::: correct

```js
/*eslint key-spacing: ["error", { "beforeColon": false }]*/

var obj = { "foo": 42 };
```

:::

使用此规则与 `{ "beforeColon": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint key-spacing: ["error", { "beforeColon": true }]*/

var obj = { "foo": 42 };
```

:::

使用此规则与 `{ "beforeColon": true }` 选项的**正确**示例：

::: correct

```js
/*eslint key-spacing: ["error", { "beforeColon": true }]*/

var obj = { "foo" : 42 };
```

:::

### afterColon

使用此规则与默认的 `{ "afterColon": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint key-spacing: ["error", { "afterColon": true }]*/

var obj = { "foo":42 };
```

:::

使用此规则与默认的 `{ "afterColon": true }` 选项的**正确**示例：

::: correct

```js
/*eslint key-spacing: ["error", { "afterColon": true }]*/

var obj = { "foo": 42 };
```

:::

使用此规则与 `{ "afterColon": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint key-spacing: ["error", { "afterColon": false }]*/

var obj = { "foo": 42 };
```

:::

使用此规则与 `{ "afterColon": false }` 选项的**正确**示例：

::: correct

```js
/*eslint key-spacing: ["error", { "afterColon": false }]*/

var obj = { "foo":42 };
```

:::

### mode

使用此规则与默认的 `{ "mode": "strict" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint key-spacing: ["error", { "mode": "strict" }]*/

call({
    foobar: 42,
    bat:    2 * 2
});
```

:::

使用此规则与默认的 `{ "mode": "strict" }` 选项的**正确**示例：

::: correct

```js
/*eslint key-spacing: ["error", { "mode": "strict" }]*/

call({
    foobar: 42,
    bat: 2 * 2
});
```

:::

使用此规则与 `{ "mode": "minimum" }` 选项的**正确**示例：

::: correct

```js
/*eslint key-spacing: ["error", { "mode": "minimum" }]*/

call({
    foobar: 42,
    bat:    2 * 2
});
```

:::

### align

使用此规则与 `{ "align": "value" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint key-spacing: ["error", { "align": "value" }]*/

var obj = {
    a: value,
    bcde:  42,
    fg :   foo()
};
```

:::

使用此规则与 `{ "align": "value" }` 选项的**正确**示例：

::: correct

```js
/*eslint key-spacing: ["error", { "align": "value" }]*/

var obj = {
    a:    value,
    bcde: 42,

    fg: foo(),
    h:  function() {
        return this.a;
    },
    ijkl: 'Non-consecutive lines form a new group'
};

var obj = { a: "foo", longPropertyName: "bar" };
```

:::

使用此规则与 `{ "align": "colon" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint key-spacing: ["error", { "align": "colon" }]*/

call({
    foobar: 42,
    bat:    2 * 2
});
```

:::

使用此规则与 `{ "align": "colon" }` 选项的**正确**示例：

::: correct

```js
/*eslint key-spacing: ["error", { "align": "colon" }]*/

call({
    foobar: 42,
    bat   : 2 * 2
});
```

:::

### align

`align` 选项可以通过 `beforeColon`, `afterColon`, `mode` 和 `on` 选项进行额外配置。

如果 `align` 被定义为对象，且没有提供所有的参数，则未定义的参数将默认为以下内容：

```js
// Defaults
align: {
    "beforeColon": false,
    "afterColon": true,
    "on": "colon",
    "mode": "strict"
}
```

使用此规则与演示的 `{ "align": { } }` 选项的**正确**示例：

::: correct

```js
/*eslint key-spacing: ["error", {
    "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "colon"
    }
}]*/

var obj = {
    "one"   : 1,
    "seven" : 7
}
```

:::

::: correct

```js
/*eslint key-spacing: ["error", {
    "align": {
        "beforeColon": false,
        "afterColon": false,
        "on": "value"
    }
}]*/

var obj = {
    "one":  1,
    "seven":7
}
```

:::

### align and multiLine

`multiLine` 和 `align` 选项可以不同，这允许对你的文件的 `key-spacing' 进行微调控制。如果 `align` 被配置为一个对象，`align` 将不会**继承 `multiLine`。

`multiLine`在任何一个对象字头跨越多行的时候都会被使用。`align`配置在同一对象中有一组属性时使用。比如说：

```javascript
var myObj = {
  key1: 1, // uses multiLine

  key2: 2, // uses align (when defined)
  key3: 3, // uses align (when defined)

  key4: 4 // uses multiLine
}

```

使用此规则与演示的 `{ "align": { }, "multiLine": { } }` 选项的**错误**示例：

::: incorrect

```js
/*eslint key-spacing: ["error", {
    "multiLine": {
        "beforeColon": false,
        "afterColon":true
    },
    "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "colon"
    }
}]*/

var obj = {
    "myObjectFunction": function() {
        // Do something
    },
    "one"             : 1,
    "seven"           : 7
}
```

:::

使用此规则与演示的 `{ "align": { }, "multiLine": { } }` 选项的**正确**示例：

::: correct

```js
/*eslint key-spacing: ["error", {
    "multiLine": {
        "beforeColon": false,
        "afterColon": true

    },
    "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "colon"
    }
}]*/

var obj = {
    "myObjectFunction": function() {
        // Do something
        //
    }, // These are two separate groups, so no alignment between `myObjectFunction` and `one`
    "one"   : 1,
    "seven" : 7 // `one` and `seven` are in their own group, and therefore aligned
}
```

:::

### singleLine and multiLine

使用此规则与演示的 `{ "singleLine": { }, "multiLine": { } }` 选项的**正确**示例：

::: correct

```js
/*eslint "key-spacing": [2, {
    "singleLine": {
        "beforeColon": false,
        "afterColon": true
    },
    "multiLine": {
        "beforeColon": true,
        "afterColon": true,
        "align": "colon"
    }
}]*/
var obj = { one: 1, "two": 2, three: 3 };
var obj2 = {
    "two" : 2,
    three : 3
};
```

:::

## 何时不用

如果你有另一种属性间距的约定，可能与可用的选项不一致，或者你想允许多种样式同时存在，你可以安全地禁用这一规则。
