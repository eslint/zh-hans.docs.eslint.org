---
title: operator-linebreak
layout: doc
rule_type: layout
related_rules:
- comma-style
---

当一个语句太长而不能放在一行中时，一般会在分隔表达式的运算符旁边插入换行符。我想到的第一个样式是将运算符放在行尾，遵循英文标点符号规则。

```js
var fullHeight = borderTop +
                 innerHeight +
                 borderBottom;
```

一些开发者发现，将运算符放在行首会使代码更易读。

```js
var fullHeight = borderTop
               + innerHeight
               + borderBottom;
```

## 规则细节

这条规则为运算符执行了一致的换行风格。

## 选项

这个规则有两个选项，一个字符串选项和一个对象选项：

字符串选项：

* `"after"` 要求将换行符放在运算符之后。
* `"before"` 要求将换行符放在运算符之前。
* `"none"` 不允许在运算符的两侧有换行符。

对象选项：

* `"overrides"` 覆盖指定操作者的全局设置

默认配置是 `"after", { "overrides": { "?": "before", ":": "before" } }`

### after

使用此规则与 `"after"` 选项的**错误**示例：

::: incorrect

```js
/*eslint operator-linebreak: ["error", "after"]*/

foo = 1
+
2;

foo = 1
    + 2;

foo
    = 5;

if (someCondition
    || otherCondition) {
}

answer = everything
  ? 42
  : foo;

class Foo {
    a
        = 1;
    [b]
        = 2;
    [c
    ]
        = 3;
}
```

:::

使用此规则与 `"after"` 选项的**正确**示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "after"]*/

foo = 1 + 2;

foo = 1 +
      2;

foo =
    5;

if (someCondition ||
    otherCondition) {
}

answer = everything ?
  42 :
  foo;

class Foo {
    a =
        1;
    [b] =
        2;
    [c
    ] =
        3;
    d = 4;
}
```

:::

### before

使用此规则与 `"before"` 选项的**错误**示例：

::: incorrect

```js
/*eslint operator-linebreak: ["error", "before"]*/

foo = 1 +
      2;

foo =
    5;

if (someCondition ||
    otherCondition) {
}

answer = everything ?
  42 :
  foo;

class Foo {
    a =
        1;
    [b] =
        2;
    [c
    ] =
        3;
}
```

:::

使用此规则与 `"before"` 选项的**正确**示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "before"]*/

foo = 1 + 2;

foo = 1
    + 2;

foo
    = 5;

if (someCondition
    || otherCondition) {
}

answer = everything
  ? 42
  : foo;

class Foo {
    a
        = 1;
    [b]
        = 2;
    [c
    ]
        = 3;
    d = 4;
}
```

:::

### none

使用此规则与 `"none"` 选项的**错误**示例：

::: incorrect

```js
/*eslint operator-linebreak: ["error", "none"]*/

foo = 1 +
      2;

foo = 1
    + 2;

if (someCondition ||
    otherCondition) {
}

if (someCondition
    || otherCondition) {
}

answer = everything
  ? 42
  : foo;

answer = everything ?
  42 :
  foo;

class Foo {
    a =
        1;
    [b] =
        2;
    [c
    ] =
        3;
    d
        = 4;
    [e]
        = 5;
    [f
    ]
        = 6;
}
```

:::

使用此规则与 `"none"` 选项的**正确**示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "none"]*/

foo = 1 + 2;

foo = 5;

if (someCondition || otherCondition) {
}

answer = everything ? 42 : foo;

class Foo {
    a = 1;
    [b] = 2;
    [c
    ] = 3;
    d = 4;
    [e] = 5;
    [f
    ] = 6;
}
```

:::

### overrides

使用此规则与 `{ "overrides": { "+=": "before" } }` 选项的额外**错误**示例：

::: incorrect

```js
/*eslint operator-linebreak: ["error", "after", { "overrides": { "+=": "before" } }]*/

var thing = 'thing';
thing +=
  's';
```

:::

使用此规则与 `{ "overrides": { "+=": "before" } }` 选项的额外**正确**示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "after", { "overrides": { "+=": "before" } }]*/

var thing = 'thing';
thing
  += 's';
```

:::

使用此规则与 `{ "overrides": { "?": "ignore", ":": "ignore" } }` 选项的额外**错误**示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "after", { "overrides": { "?": "ignore", ":": "ignore" } }]*/

answer = everything ?
  42
  : foo;

answer = everything
  ?
  42
  :
  foo;
```

:::

使用此规则与默认的 `"after", { "overrides": { "?": "before", ":": "before" } }` 选项的**错误**示例：

::: incorrect

```js
/*eslint operator-linebreak: ["error", "after", { "overrides": { "?": "before", ":": "before" } }]*/

foo = 1
+
2;

foo = 1
    + 2;

foo
    = 5;

if (someCondition
    || otherCondition) {
}

answer = everything ?
  42 :
  foo;
```

:::

使用此规则与默认的 `"after", { "overrides": { "?": "before", ":": "before" } }` 选项的**正确**示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "after", { "overrides": { "?": "before", ":": "before" } }]*/

foo = 1 + 2;

foo = 1 +
      2;

foo =
    5;

if (someCondition ||
    otherCondition) {
}

answer = everything
  ? 42
  : foo;
```

:::

## 何时不用

如果你的项目不会使用常见的操作者换行方式，请关闭此规则。
