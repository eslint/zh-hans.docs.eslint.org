---
title: no-unmodified-loop-condition
rule_type: problem
---

经常会循环中修改循环条件中的变量。
如果没有，那可能是个错误。

```js
while (node) {
    doSomething(node);
}
```

```js
while (node) {
    doSomething(node);
    node = node.parent;
}
```

## 规则细节

这条规则会找到位于循环条件内的引用，然后检查是否有在循环中修改这些引用的变量。

如果是在二元表达式或三元表达式中的引用，这个规则会检查表达式的结果。
如果是在动态表达式中的引用（例如 `CallExpression`、`YieldExpression` 等），本规则将忽略它。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unmodified-loop-condition: "error"*/

var node = something;

while (node) {
    doSomething(node);
}
node = other;

for (var j = 0; j < items.length; ++i) {
    doSomething(items[j]);
}

while (node !== root) {
    doSomething(node);
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-unmodified-loop-condition: "error"*/

while (node) {
    doSomething(node);
    node = node.parent;
}

for (var j = 0; j < items.length; ++j) {
    doSomething(items[j]);
}

// OK, the result of this binary expression is changed in this loop.
while (node !== root) {
    doSomething(node);
    node = node.parent;
}

// OK, the result of this ternary expression is changed in this loop.
while (node ? A : B) {
    doSomething(node);
    node = node.parent;
}

// A property might be a getter which has side effect...
// Or "doSomething" can modify "obj.foo".
while (obj.foo) {
    doSomething(obj);
}

// A function call can return various values.
while (check(obj)) {
    doSomething(obj);
}
```

:::

## 何时不用

如果你不关心循环条件内的引用，你可以安全地禁用此规则。
