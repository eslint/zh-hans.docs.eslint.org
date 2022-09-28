---
title: max-nested-callbacks
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/max-nested-callbacks.md
rule_type: suggestion
related_rules:
- complexity
- max-depth
- max-len
- max-lines
- max-lines-per-function
- max-params
- max-statements
further_reading:
- http://book.mixu.net/node/ch7.html
- https://web.archive.org/web/20220104141150/https://howtonode.org/control-flow
- https://web.archive.org/web/20220127215850/https://howtonode.org/control-flow-part-ii
---

许多 JavaScript 库使用回调模式来管理异步操作。任何复杂的程序都很可能需要在不同的并发程度上管理几个异步操作。一个容易陷入的陷阱是嵌套回调，回调嵌套得越深，代码就越难读。

```js
foo(function () {
    bar(function () {
        baz(function() {
            qux(function () {

            });
        });
    });
});
```

## 规则细节

这条规则强制规定了回调可以嵌套的最大深度，以提高代码的清晰度。

## 选项

这条规则有一个数字或对象选项：

* `"max"`（默认为 `10`）加强了回调可以被嵌套的最大深度。

**废弃**：对象属性 `maximum` 已废弃，请使用对象属性 `max` 代替。

### max

使用此规则与 `{ "max": 3 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-nested-callbacks: ["error", 3]*/

foo1(function() {
    foo2(function() {
        foo3(function() {
            foo4(function() {
                // Do something
            });
        });
    });
});
```

:::

使用此规则与 `{ "max": 3 }` 选项的**正确**示例：

::: correct

```js
/*eslint max-nested-callbacks: ["error", 3]*/

foo1(handleFoo1);

function handleFoo1() {
    foo2(handleFoo2);
}

function handleFoo2() {
    foo3(handleFoo3);
}

function handleFoo3() {
    foo4(handleFoo4);
}

function handleFoo4() {
    foo5();
}
```

:::
