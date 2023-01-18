---
title: arrow-spacing
rule_type: layout
---

这条规则规范了箭头函数的箭头（`=>`）前后的间距样式。

```js
/*eslint-env es6*/

// { "before": true, "after": true }
(a) => {}

// { "before": false, "after": false }
(a)=>{}
```

## 规则细节

这个规则接受对象参数，其中包含 `before` 和 `after` 属性，每个都是布尔值。

默认配置是 `{ "before": true, "after": true }`。

`true` 意味着应该有**一个或多个空格**，`false` 意味着**没有空格**。

使用此规则与默认 `{ "before": true, "after": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint arrow-spacing: "error"*/
/*eslint-env es6*/

()=> {};
() =>{};
(a)=> {};
(a) =>{};
a =>a;
a=> a;
()=> {'\n'};
() =>{'\n'};
```

:::

使用此规则与默认 `{ "before": true, "after": true }` 选项的**正确**示例：

:::correct

```js
/*eslint arrow-spacing: "error"*/
/*eslint-env es6*/

() => {};
(a) => {};
a => a;
() => {'\n'};
```

:::

使用此规则与 `{ "before": false, "after": false }` 选项的**错误**示例：

:::incorrect

```js
/*eslint arrow-spacing: ["error", { "before": false, "after": false }]*/
/*eslint-env es6*/

() =>{};
(a) => {};
()=> {'\n'};
```

:::

使用此规则与 `{ "before": false, "after": false }` 选项的**正确**示例：

:::correct

```js
/*eslint arrow-spacing: ["error", { "before": false, "after": false }]*/
/*eslint-env es6*/

()=>{};
(a)=>{};
()=>{'\n'};
```

:::

使用此规则与 `{ "before": false, "after": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint arrow-spacing: ["error", { "before": false, "after": true }]*/
/*eslint-env es6*/

() =>{};
(a) => {};
()=>{'\n'};
```

:::

使用此规则与 `{ "before": false, "after": true }` 选项的**正确**示例：

:::correct

```js
/*eslint arrow-spacing: ["error", { "before": false, "after": true }]*/
/*eslint-env es6*/

()=> {};
(a)=> {};
()=> {'\n'};
```

:::
