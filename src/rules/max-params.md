---
title: max-params
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/max-params.md
rule_type: suggestion
related_rules:
- complexity
- max-depth
- max-len
- max-lines
- max-lines-per-function
- max-nested-callbacks
- max-statements
---

带众多参数的函数可能难以阅读和编写，因为它需要记住每个参数是什么，它的类型，以及它们应该出现的顺序。因此，许多程序员坚持一个惯例，即对一个函数可以接受的参数数量设置上限。

```js
function foo (bar, baz, qux, qxx) { // four parameters, may be too many
    doSomething();
}
```

## 规则细节

这条规则强制规定了函数定义中允许的最大参数数。

## 选项

这个规则有一个数字或对象选项：

* `"max"`（默认为 `3`）在函数定义中执行最大的参数数。

**废弃**：对象属性 `maximum` 已废弃，请使用对象属性 `max` 代替。

### max

使用此规则与默认的 `{ "max": 3 }` 选项的**错误**示例：

:::incorrect

```js
/*eslint max-params: ["error", 3]*/
/*eslint-env es6*/

function foo (bar, baz, qux, qxx) {
    doSomething();
}

let foo = (bar, baz, qux, qxx) => {
    doSomething();
};
```

:::

使用此规则与默认的 `{ "max": 3 }` 选项的**正确**示例：

:::correct

```js
/*eslint max-params: ["error", 3]*/
/*eslint-env es6*/

function foo (bar, baz, qux) {
    doSomething();
}

let foo = (bar, baz, qux) => {
    doSomething();
};
```

:::
