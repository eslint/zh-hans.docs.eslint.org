---
title: no-plusplus
layout: doc
rule_type: suggestion
---

因为单数的 `++` 和 `--` 运算符要自动插入分号，所以空白处的不同会改变源代码的语义。

```js
var i = 10;
var j = 20;

i ++
j
// i = 11, j = 20
```

```js
var i = 10;
var j = 20;

i
++
j
// i = 10, j = 21
```

## 规则细节

这条规则不允许使用单数运算符 `++` 和 `-`。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-plusplus: "error"*/

var foo = 0;
foo++;

var bar = 42;
bar--;

for (i = 0; i < l; i++) {
    return;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-plusplus: "error"*/

var foo = 0;
foo += 1;

var bar = 42;
bar -= 1;

for (i = 0; i < l; i += 1) {
    return;
}
```

:::

## 选项

这个规则有一个对象选项。

* `"allowForLoopAfterthoughts": true` 允许单数运算符 `++` 和 `--` 在 `for` 循环的后缀（最终表达式）中。

### allowForLoopAfterthoughts

使用此规则与 `{ "allowForLoopAfterthoughts": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }]*/

for (i = 0; i < l; i++) {
    doSomething(i);
}

for (i = l; i >= 0; i--) {
    doSomething(i);
}

for (i = 0, j = l; i < l; i++, j--) {
    doSomething(i, j);
}
```

:::

使用此规则与 `{ "allowForLoopAfterthoughts": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }]*/

for (i = 0; i < l; j = i++) {
    doSomething(i, j);
}

for (i = l; i--;) {
    doSomething(i);
}

for (i = 0; i < l;) i++;
```

:::
