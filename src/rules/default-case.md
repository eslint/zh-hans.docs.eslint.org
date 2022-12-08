---
title: default-case
layout: doc
rule_type: suggestion
related_rules:
- no-fallthrough
---

一些代码惯例要求所有的 `switch` 语句都有一个 `default` case，即使默认 case 是空的，例如：

```js
switch (foo) {
    case 1:
        doSomething();
        break;

    case 2:
        doSomething();
        break;

    default:
    // 什么也不做
}
```

我们的想法是，最好总是明确地说明默认行为应该是什么，这样就可以清楚地知道开发者是否错误地忘记了包括默认行为。

其他的代码惯例允许你跳过 `default` 的情况，只要有一个注释表明这个省略是有意为之，例如：

```js
switch (foo) {
    case 1:
        doSomething();
        break;

    case 2:
        doSomething();
        break;

    // no default
}
```

再一次，这里的意图是表明开发者打算不存在默认行为。

## 规则细节

这条规则的目的是要求在 `switch` 语句中使用 `default` 大小写。如果没有 `default` 的情况，可以选择在最后一个 `case` 后加上 `// no default`。注释可以是任何想要的大小写，例如 `// No Default`。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint default-case: "error"*/

switch (a) {
    case 1:
        /* code */
        break;
}

```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint default-case: "error"*/

switch (a) {
    case 1:
        /* 代码 */
        break;

    default:
        /* 代码 */
        break;
}

switch (a) {
    case 1:
        /* 代码 */
        break;

    // no default
}

switch (a) {
    case 1:
        /* 代码 */
        break;

    // No Default
}
```

:::

## 选项

这个规则接受一个选项参数：

* 将`commentPattern` 选项设置为一个正则表达式字符串，以改变默认的 `/^no default$/i` 注释测试模式

### commentPattern

使用 `{ "commentPattern": "^skip\\sdefault" }` 选项的**正确**示例：

::: correct

```js
/*eslint default-case: ["error", { "commentPattern": "^skip\\sdefault" }]*/

switch(a) {
    case 1:
        /* code */
        break;

    // 跳过 default
}

switch(a) {
    case 1:
        /* code */
        break;

    // 跳过 default case
}
```

:::

## 何时不用

如果不想控制 `switch` 语句中的 `default` 执行情况，你可以安全地禁用这个规则。
