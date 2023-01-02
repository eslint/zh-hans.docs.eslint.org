---
title: sort-keys
rule_type: suggestion
related_rules:
- sort-imports
- sort-vars
---

当声明多个属性时，一些开发者喜欢按字母顺序对属性名称进行排序，以便在以后更容易找到和/或区别必要的属性。其他人则认为这增加了复杂性，成为维护的负担。

## 规则细节

该规则检查对象表达式的所有属性定义，并验证所有变量是否按字母顺序排序。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint sort-keys: "error"*/
/*eslint-env es6*/

let obj = {a: 1, c: 3, b: 2};
let obj = {a: 1, "c": 3, b: 2};

// Case-sensitive by default.
let obj = {a: 1, b: 2, C: 3};

// Non-natural order by default.
let obj = {1: a, 2: c, 10: b};

// This rule checks computed properties which have a simple name as well.
// Simple names are names which are expressed by an Identifier node or a Literal node.
const S = Symbol("s")
let obj = {a: 1, ["c"]: 3, b: 2};
let obj = {a: 1, [S]: 3, b: 2};
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint sort-keys: "error"*/
/*eslint-env es6*/

let obj = {a: 1, b: 2, c: 3};
let obj = {a: 1, "b": 2, c: 3};

// Case-sensitive by default.
let obj = {C: 3, a: 1, b: 2};

// Non-natural order by default.
let obj = {1: a, 10: b, 2: c};

// This rule checks computed properties which have a simple name as well.
let obj = {a: 1, ["b"]: 2, c: 3};
let obj = {a: 1, [b]: 2, c: 3};

// This rule ignores computed properties which have a non-simple name.
let obj = {a: 1, [c + d]: 3, b: 2};
let obj = {a: 1, ["c" + "d"]: 3, b: 2};
let obj = {a: 1, [`${c}`]: 3, b: 2};
let obj = {a: 1, [tag`c`]: 3, b: 2};

// This rule does not report unsorted properties that are separated by a spread property.
let obj = {b: 1, ...c, a: 2};
```

:::

## 选项

```json
{
    "sort-keys": ["error", "asc", {"caseSensitive": true, "natural": false, "minKeys": 2}]
}
```

第 1 个选项是 `"asc"` 或 `"desc"`。

* `"asc"`（默认值）- 执行属性的升序。
* `"desc"` - 强制执行属性的降序。

第二个选项是一个有 3 个属性的对象：

* `caseSensitive` - 如果是 `true`，强制要求属性以大小写为序。默认是 `true`。
* `minKeys` - 指定一个对象应该有的最小键数，以便该对象的未排序键产生错误。默认为 `2`，这意味着默认情况下，所有具有未排序键的对象将导致检查抛出错误。
* `natural` - 如果是 `true` 则强制要求属性以自然顺序排列。默认是 `false`。自然顺序是以人类排序的方式比较包含字母和数字组合的字符串。它基本上是按数字排序，而不是按字母表排序。所以在自然排序中，数字 10 排在数字 3 之后。
* `allowLineSeparatedGroups` - 如果 `true` 则该规则允许通过换行来分组对象键。换句话说，一个属性后的空行将重置键值的排序。默认是 `false`。

列表示例：

如果 `natural` 为真，排序将是
1
3
6
8
10

如果 `natural` 为假，排序将是
1
10
3
6
8

### desc

使用 `"desc"` 选项的**错误**示例：

::: incorrect

```js
/*eslint sort-keys: ["error", "desc"]*/
/*eslint-env es6*/

let obj = {b: 2, c: 3, a: 1};
let obj = {"b": 2, c: 3, a: 1};

// Case-sensitive by default.
let obj = {C: 1, b: 3, a: 2};

// Non-natural order by default.
let obj = {10: b, 2: c, 1: a};
```

:::

使用 `"desc"` 选项的**正确**示例：

::: correct

```js
/*eslint sort-keys: ["error", "desc"]*/
/*eslint-env es6*/

let obj = {c: 3, b: 2, a: 1};
let obj = {c: 3, "b": 2, a: 1};

// Case-sensitive by default.
let obj = {b: 3, a: 2, C: 1};

// Non-natural order by default.
let obj = {2: c, 10: b, 1: a};
```

:::

### insensitive

使用 `{caseSensitive: false}` 选项的**错误**示例：

::: incorrect

```js
/*eslint sort-keys: ["error", "asc", {caseSensitive: false}]*/
/*eslint-env es6*/

let obj = {a: 1, c: 3, C: 4, b: 2};
let obj = {a: 1, C: 3, c: 4, b: 2};
```

:::

使用 `{caseSensitive: false}` 选项的**正确**示例：

::: correct

```js
/*eslint sort-keys: ["error", "asc", {caseSensitive: false}]*/
/*eslint-env es6*/

let obj = {a: 1, b: 2, c: 3, C: 4};
let obj = {a: 1, b: 2, C: 3, c: 4};
```

:::

### natural

使用 `{natural: true}` 选项的**错误**示例：

::: incorrect

```js
/*eslint sort-keys: ["error", "asc", {natural: true}]*/
/*eslint-env es6*/

let obj = {1: a, 10: c, 2: b};
```

:::

使用 `{natural: true}` 选项的**正确**示例：

::: correct

```js
/*eslint sort-keys: ["error", "asc", {natural: true}]*/
/*eslint-env es6*/

let obj = {1: a, 2: b, 10: c};
```

:::

### minKeys

使用 `{minKeys: 4}` 选项的**错误**示例：

::: incorrect

```js
/*eslint sort-keys: ["error", "asc", {minKeys: 4}]*/
/*eslint-env es6*/

// 4 keys
let obj = {
    b: 2,
    a: 1, // not sorted correctly (should be 1st key)
    c: 3,
    d: 4,
};

// 5 keys
let obj = {
    2: 'a',
    1: 'b', // not sorted correctly (should be 1st key)
    3: 'c',
    4: 'd',
    5: 'e',
};
```

:::

使用 `{minKeys: 4}` 选项的**正确**示例：

::: correct

```js
/*eslint sort-keys: ["error", "asc", {minKeys: 4}]*/
/*eslint-env es6*/

// 3 keys
let obj = {
    b: 2,
    a: 1,
    c: 3,
};

// 2 keys
let obj = {
    2: 'b',
    1: 'a',
};
```

:::

### allowLineSeparatedGroups

使用 `{allowLineSeparatedGroups: true}` 选项的**错误**示例：

::: incorrect

```js
/*eslint sort-keys: ["error", "asc", {allowLineSeparatedGroups: true}]*/
/*eslint-env es6*/

let obj1 = {
    b: 1,
    c () {

    },
    a: 3
}

let obj2 = {
    b: 1,
    c: 2,

    z () {

    },
    y: 3
}

let obj3 = {
    b: 1,
    c: 2,

    z () {

    },
    // comment
    y: 3,
}

let obj4 = {
    b: 1
    // comment before comma
    , a: 2
};
```

:::

使用 `{allowLineSeparatedGroups: true}` 选项的**正确**示例：

::: correct

```js
/*eslint sort-keys: ["error", "asc", {allowLineSeparatedGroups: true}]*/
/*eslint-env es6*/

let obj = {
    e: 1,
    f: 2,
    g: 3,

    a: 4,
    b: 5,
    c: 6
}

let obj = {
    b: 1,

    // comment
    a: 4,
    c: 5,
}

let obj = {
    c: 1,
    d: 2,

    b () {

    }, 
    e: 3,
}

let obj = {
    c: 1,
    d: 2,
    // comment

    // comment
    b() {

    },
    e: 4
}

let obj = {
    b,

    [foo + bar]: 1,
    a
}

let obj = {
    b: 1
    // comment before comma

    ,
    a: 2
};

var obj = {
    b: 1,

    a: 2,
    ...z,
    c: 3
}
```

:::

## 何时不用

如果你不关心属性对顺序，你可以安全地禁用此规则。

## 兼容

* **JSCS**：[validateOrderInObjectKeys](https://jscs-dev.github.io/rule/validateOrderInObjectKeys)
