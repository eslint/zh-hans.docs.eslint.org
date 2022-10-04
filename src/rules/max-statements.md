---
title: max-statements
layout: doc
rule_type: suggestion
related_rules:
- complexity
- max-depth
- max-len
- max-lines
- max-lines-per-function
- max-nested-callbacks
- max-params
---

`max-statements` 规则允许你指定一个函数中可以存在的最大语句数。

```js
function foo() {
  var bar = 1; // 一个语句
  var baz = 2; // 两个语句
  var qux = 3; // 三个语句
}
```

## 规则细节

这条规则强制规定了功能块中允许的最大语句数。

## 选项

这条规则有一个数字或对象选项：

* `"max"`（默认为 `10`）强制规定函数块中允许的最大语句数。

**废弃**：对象属性 `"maximum"` 已被废弃，请使用对象属性 `"max"` 代替。

此规则选项为对象：

* `"ignoreTopLevelFunctions": true` 忽略顶级函数

### max

使用此规则与默认的 `{ "max": 10 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint max-statements: ["error", 10]*/
/*eslint-env es6*/

function foo() {
  var foo1 = 1;
  var foo2 = 2;
  var foo3 = 3;
  var foo4 = 4;
  var foo5 = 5;
  var foo6 = 6;
  var foo7 = 7;
  var foo8 = 8;
  var foo9 = 9;
  var foo10 = 10;

  var foo11 = 11; // Too many.
}

let foo = () => {
  var foo1 = 1;
  var foo2 = 2;
  var foo3 = 3;
  var foo4 = 4;
  var foo5 = 5;
  var foo6 = 6;
  var foo7 = 7;
  var foo8 = 8;
  var foo9 = 9;
  var foo10 = 10;

  var foo11 = 11; // Too many.
};
```

:::

使用此规则与默认的 `{ "max": 10 }` 选项的**正确**示例：

::: correct

```js
/*eslint max-statements: ["error", 10]*/
/*eslint-env es6*/

function foo() {
  var foo1 = 1;
  var foo2 = 2;
  var foo3 = 3;
  var foo4 = 4;
  var foo5 = 5;
  var foo6 = 6;
  var foo7 = 7;
  var foo8 = 8;
  var foo9 = 9;
  var foo10 = 10;
  return function () {

    // The number of statements in the inner function does not count toward the
    // statement maximum.

    return 42;
  };
}

let foo = () => {
  var foo1 = 1;
  var foo2 = 2;
  var foo3 = 3;
  var foo4 = 4;
  var foo5 = 5;
  var foo6 = 6;
  var foo7 = 7;
  var foo8 = 8;
  var foo9 = 9;
  var foo10 = 10;
  return function () {

    // The number of statements in the inner function does not count toward the
    // statement maximum.

    return 42;
  };
}
```

:::

注意，这条规则不适用于类静态块，而且类静态块中的语句不算是包围函数的语句。

使用此规则与 `{ "max": 2 }` 选项的**正确**示例：

::: correct

```js
/*eslint max-statements: ["error", 2]*/

function foo() {
    let one;
    let two = class {
        static {
            let three;
            let four;
            let five;
            if (six) {
                let seven;
                let eight;
                let nine;
            }
        }
    };
}
```

:::

### ignoreTopLevelFunctions

使用此规则与 `{ "max": 10 }, { "ignoreTopLevelFunctions": true }` 选项的**正确**示例：

::: correct

```js
/*eslint max-statements: ["error", 10, { "ignoreTopLevelFunctions": true }]*/

function foo() {
  var foo1 = 1;
  var foo2 = 2;
  var foo3 = 3;
  var foo4 = 4;
  var foo5 = 5;
  var foo6 = 6;
  var foo7 = 7;
  var foo8 = 8;
  var foo9 = 9;
  var foo10 = 10;
  var foo11 = 11;
}
```

:::
