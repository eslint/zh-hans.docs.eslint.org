---
title: newline-before-return
layout: doc
rule_type: layout
related_rules:
- newline-after-var
---

此规则在 ESLint v4.0.0 中**废弃**，并被 [padding-line-between-statements](padding-line-between-statements) 规则取代。

在 JavaScript 中，关于 `return` 语句之前是否要有空行，没有硬性规定。然而，清楚地划定一个函数的返回位置可以大大增加代码的可读性和清晰度。比如说：

```js
function foo(bar) {
  var baz = 'baz';
  if (!bar) {
    bar = baz;
    return bar;
  }
  return bar;
}
```

添加换行符可以明显地将返回语句与前几行分开，使其清楚地知道函数在哪里退出以及返回什么值。

```js
function foo(bar) {
  var baz = 'baz';

  if (!bar) {
    bar = baz;

    return bar;
  }

  return bar;
}
```

## 规则细节

这条规则要求在 `return` 语句前有一个空行，以提高代码的清晰度，除非 `return` 在一个语句组中单独存在（如 if 语句）。在后一种情况下，不需要划分 `return` 语句，因为它是单独的。将忽略注释，并且不作为空行计算。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint newline-before-return: "error"*/

function foo(bar) {
    if (!bar) {
        return;
    }
    return bar;
}

function foo(bar) {
    if (!bar) {
        return;
    }
    /* multi-line
    comment */
    return bar;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint newline-before-return: "error"*/

function foo() {
    return;
}

function foo() {

    return;
}

function foo(bar) {
    if (!bar) return;
}

function foo(bar) {
    if (!bar) { return };
}

function foo(bar) {
    if (!bar) {
        return;
    }
}

function foo(bar) {
    if (!bar) {
        return;
    }

    return bar;
}

function foo(bar) {
    if (!bar) {

        return;
    }
}

function foo() {

    // comment
    return;
}
```

:::

## 何时不用

如果你对 `return` 前是否要有空行没有硬性规定，你可以安全地禁用这一规则。
