---
title: arrow-body-style
layout: doc
rule_type: suggestion
---

箭头函数的函数体有两种语法形式。 它们可以用 *block*（用大括号表示）`() => { ... }` 或者用一个单一的表达式 `() => ...`，其值被隐含地返回。

## 规则细节

这个规则可以强制或不允许在箭头函数体周围使用大括号。

## 选项

该规则有一个或两个选项。第一个是字符串，它可以是:

* `"always"` 在函数体周围执行大括号。
* `"as-needed"` 在可以省略的地方不使用大括号（缺省）。
* `"never"` 在函数主体周围不使用大括号（将箭头函数限制在返回表达式的角色）。

当第一个选项是 `"as-needed"` 时，第二个是对象，用于更精细的配置。目前，唯一可用的选项是 `requireReturnForObjectLiteral`，布尔值。它默认为 `false`。如果设置为 `true`，返回需要大括号和一个明确的对象字面量。

```json
"arrow-body-style": ["error", "always"]
```

### always

使用此规则与 `"always"` 选项的**错误**示例：

:::incorrect

```js
/*eslint arrow-body-style: ["error", "always"]*/
/*eslint-env es6*/
let foo = () => 0;
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

:::correct

```js
let foo = () => {
    return 0;
};
let foo = (retv, name) => {
    retv[name] = true;
    return retv;
};
```

:::

### as-needed

使用此规则与默认 `"as-needed"` 选项的**错误**示例：

:::incorrect

```js
/*eslint arrow-body-style: ["error", "as-needed"]*/
/*eslint-env es6*/

let foo = () => {
    return 0;
};
let foo = () => {
    return {
       bar: {
            foo: 1,
            bar: 2,
        }
    };
};
```

:::

使用此规则与默认 `"as-needed"` 选项的**正确**示例：

:::correct

```js
/*eslint arrow-body-style: ["error", "as-needed"]*/
/*eslint-env es6*/

let foo = () => 0;
let foo = (retv, name) => {
    retv[name] = true;
    return retv;
};
let foo = () => ({
    bar: {
        foo: 1,
        bar: 2,
    }
});
let foo = () => { bar(); };
let foo = () => {};
let foo = () => { /* do nothing */ };
let foo = () => {
    // 什么也不做
};
let foo = () => ({ bar: 0 });
```

:::

#### requireReturnForObjectLiteral

> 该选项只在与 "按需 "选项一起使用时适用。

使用此规则与 `{ "requireReturnForObjectLiteral": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }]*/
/*eslint-env es6*/
let foo = () => ({});
let foo = () => ({ bar: 0 });
```

:::

使用此规则与 `{ "requireReturnForObjectLiteral": true }` 选项的**正确**示例：

:::correct

```js
/*eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }]*/
/*eslint-env es6*/

let foo = () => {};
let foo = () => { return { bar: 0 }; };
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

:::incorrect

```js
/*eslint arrow-body-style: ["error", "never"]*/
/*eslint-env es6*/

let foo = () => {
    return 0;
};
let foo = (retv, name) => {
    retv[name] = true;
    return retv;
};
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

:::correct

```js
/*eslint arrow-body-style: ["error", "never"]*/
/*eslint-env es6*/

let foo = () => 0;
let foo = () => ({ foo: 0 });
```

:::
