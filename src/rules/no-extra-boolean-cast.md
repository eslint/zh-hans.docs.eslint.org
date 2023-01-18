---
title: no-extra-boolean-cast
rule_type: suggestion
---

在诸如 `if` 语句的测试中，表达式的结果已经被强制为布尔值，通过双重否定（`!!`）或 `Boolean` 调用来转换为布尔值是不必要的。例如，这些 `if` 语句是等同的。

```js
if (!!foo) {
    // ...
}

if (Boolean(foo)) {
    // ...
}

if (foo) {
    // ...
}
```

## 规则细节

这条规则不允许不必要的布尔值转换。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-extra-boolean-cast: "error"*/

var foo = !!!bar;

var foo = !!bar ? baz : bat;

var foo = Boolean(!!bar);

var foo = new Boolean(!!bar);

if (!!foo) {
    // ...
}

if (Boolean(foo)) {
    // ...
}

while (!!foo) {
    // ...
}

do {
    // ...
} while (Boolean(foo));

for (; !!foo; ) {
    // ...
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-extra-boolean-cast: "error"*/

var foo = !!bar;
var foo = Boolean(bar);

function foo() {
    return !!bar;
}

var foo = bar ? !!baz : !!bat;
```

:::

## 选项

此规则选项为对象：

* `"enforceForLogicalOperands"` 当设置为 `true` 时，除了检查默认上下文外，还检查额外的布尔运算是否包含在逻辑表达式中。默认为 `false`，这意味着该规则默认不对逻辑表达式中的额外布尔值进行警告。

### enforceForLogicalOperands

使用此规则并将 `enforceForLogicalOperands` 选项设置为 `true` 时的**错误**示例：

::: incorrect

```js
/*eslint no-extra-boolean-cast: ["error", {"enforceForLogicalOperands": true}]*/

if (!!foo || bar) {
    //...
}

while (!!foo && bar) {
    //...
}

if ((!!foo || bar) && baz) {
    //...
}

foo && Boolean(bar) ? baz : bat

var foo = new Boolean(!!bar || baz)
```

:::

使用此规则并将 `enforceForLogicalOperands` 选项设置为 `true` 时的**正确**示例：

::: correct

```js
/*eslint no-extra-boolean-cast: ["error", {"enforceForLogicalOperands": true}]*/

if (foo || bar) {
    //...
}

while (foo && bar) {
    //...
}

if ((foo || bar) && baz) {
    //...
}

foo && bar ? baz : bat

var foo = new Boolean(bar || baz)

var foo = !!bar || baz;
```

:::
