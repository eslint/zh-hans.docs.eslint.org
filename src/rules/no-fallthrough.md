---
title: no-fallthrough
layout: doc
rule_type: problem
related_rules:
- default-case
---

JavaScript 中的 `switch` 语句是该语言中最容易出错的结构之一，部分原因是它能够从一个 `case` “滑”到下一个。比如：

```js
switch(foo) {
    case 1:
        doSomething();

    case 2:
        doSomethingElse();
}
```

在这个例子中，如果 `foo` 是 `1`，那么执行将流经两种情况，因为第一种情况会落到第二种情况。你可以通过使用 `break` 来防止这种情况，如本例：

```js
switch(foo) {
    case 1:
        doSomething();
        break;

    case 2:
        doSomethingElse();
}
```

当你不想要突破的时候，这样做很好，但是如果突破是故意的呢，在语言中没有办法表明这一点。最好的做法是使用与 `/falls?\s?through/i` 正则表达式相匹配的注释来表明突破是故意的：

```js
switch(foo) {
    case 1:
        doSomething();
        // falls through

    case 2:
        doSomethingElse();
}

switch(foo) {
    case 1:
        doSomething();
        // fall through

    case 2:
        doSomethingElse();
}

switch(foo) {
    case 1:
        doSomething();
        // fallsthrough

    case 2:
        doSomethingElse();
}

switch(foo) {
    case 1: {
        doSomething();
        // falls through
    }

    case 2: {
        doSomethingElse();
    }
}
```

在这个例子中，对于预期的行为没有任何混淆之处。很明显，第一种情况是要落到第二种情况上的。

## 规则细节

这条规则的目的是为了消除无意中从一个案例到另一个案例的突破。因此，它标记了任何没有被注释标记的突破情况。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-fallthrough: "error"*/

switch(foo) {
    case 1:
        doSomething();

    case 2:
        doSomething();
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-fallthrough: "error"*/

switch(foo) {
    case 1:
        doSomething();
        break;

    case 2:
        doSomething();
}

function bar(foo) {
    switch(foo) {
        case 1:
            doSomething();
            return;

        case 2:
            doSomething();
    }
}

switch(foo) {
    case 1:
        doSomething();
        throw new Error("Boo!");

    case 2:
        doSomething();
}

switch(foo) {
    case 1:
    case 2:
        doSomething();
}

switch(foo) {
    case 1:
        doSomething();
        // falls through

    case 2:
        doSomething();
}

switch(foo) {
    case 1: {
        doSomething();
        // falls through
    }

    case 2: {
        doSomethingElse();
    }
}
```

:::

请注意，这些例子中的最后一个 `case` 语句不会引起警告，因为没有任何东西可以落入。

## 选项

这个规则有一个对象选项。

* 将 `commentPattern` 选项设置为正则表达式字符串，以改变对故意落空的注释的测试。

* 将 `allowEmptyCase` 选项设置为 `true`，以允许空的情况，而不管布局如何。默认情况下，只有当空的 `case` 和下一个 `case` 在同一行或连续的行上时，该规则才不要求在空的 `case` 后有落空的注释。

### commentPattern

使用 `{ "commentPattern": "break[\\s\\w]*omitted" }` 选项的**正确**示例：

::: correct

```js
/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/

switch(foo) {
    case 1:
        doSomething();
        // break omitted

    case 2:
        doSomething();
}

switch(foo) {
    case 1:
        doSomething();
        // caution: break is omitted intentionally

    default:
        doSomething();
}
```

:::

### allowEmptyCase

使用 `{ "allowEmptyCase": true }` 选项的**正确**示例：

::: correct

```js
/* eslint no-fallthrough: ["error", { "allowEmptyCase": true }] */
switch(foo){
    case 1:
    case 2: doSomething();
}
switch(foo){
    case 1:
    /*
    Put a message here 
    */
    case 2: doSomething();
}
```

:::

## 何时不用

如果你不想强制要求每个 `case` 语句以 `throw`、`return`、`break` 或注释结束，那么你可以安全地关闭这个规则。
