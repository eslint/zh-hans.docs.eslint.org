---
title: prefer-const
rule_type: suggestion
related_rules:
- no-var
- no-use-before-define
---

如果一个变量从未被重新赋值，使用 `const` 声明会更好。

`const` 声明告诉读者，“这个变量永远不会被重新赋值”，减少认知负担，提高可维护性。

## 规则细节

这条规则旨在标记那些使用 `let` 关键字声明的变量，但在初始赋值后从未重新赋值。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-const: "error"*/

// it's initialized and never reassigned.
let a = 3;
console.log(a);

let a;
a = 0;
console.log(a);

class C {
    static {
        let a;
        a = 0;
        console.log(a);
    }
}

// `i` is redefined (not reassigned) on each loop step.
for (let i in [1, 2, 3]) {
    console.log(i);
}

// `a` is redefined (not reassigned) on each loop step.
for (let a of [1, 2, 3]) {
    console.log(a);
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-const: "error"*/

// using const.
const a = 0;

// it's never initialized.
let a;
console.log(a);

// it's reassigned after initialized.
let a;
a = 0;
a = 1;
console.log(a);

// it's initialized in a different block from the declaration.
let a;
if (true) {
    a = 0;
}
console.log(a);

// it's initialized in a different scope.
let a;
class C {
    #x;
    static {
        a = obj => obj.#x;
    }
}

// it's initialized at a place that we cannot write a variable declaration.
let a;
if (true) a = 0;
console.log(a);

// `i` gets a new binding each iteration
for (const i in [1, 2, 3]) {
  console.log(a);
}

// `a` gets a new binding each iteration
for (const a of [1, 2, 3]) {
  console.log(a);
}

// `end` is never reassigned, but we cannot separate the declarations without modifying the scope.
for (let i = 0, end = 10; i < end; ++i) {
    console.log(a);
}

// `predicate` is only assigned once but cannot be separately declared as `const`
let predicate;
[object.type, predicate] = foo();

// `a` is only assigned once but cannot be separately declared as `const`
let a;
const b = {};
({ a, c: b.c } = func());

// suggest to use `no-var` rule.
var b = 3;
console.log(b);
```

:::

## 选项

```json
{
    "prefer-const": ["error", {
        "destructuring": "any",
        "ignoreReadBeforeAssign": false
    }]
}
```

### destructuring

那种在解构中解决变量的方式。
有 2 个值。

* `"any"`（默认值）- 如果在重构中的任何变量应该是 `const`，这个规则对这些变量提出警告。
* `"all"` - 如果在解构中所有的变量都应该是 `const`，这个规则会警告这些变量。否则，忽略它们。

使用默认的 `{"destructuring": "any"}` 选项的**错误**示例：

::: incorrect

```js
/*eslint prefer-const: "error"*/
/*eslint-env es6*/

let {a, b} = obj;    /*error 'b' is never reassigned, use 'const' instead.*/
a = a + 1;
```

:::

使用默认的 `{"destructuring": "any"}` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-const: "error"*/
/*eslint-env es6*/

// using const.
const {a: a0, b} = obj;
const a = a0 + 1;

// all variables are reassigned.
let {a, b} = obj;
a = a + 1;
b = b + 1;
```

:::

使用 `{"destructuring": "all"}` 选项的**错误**示例：

::: incorrect

```js
/*eslint prefer-const: ["error", {"destructuring": "all"}]*/
/*eslint-env es6*/

// all of `a` and `b` should be const, so those are warned.
let {a, b} = obj;    /*error 'a' is never reassigned, use 'const' instead.
                             'b' is never reassigned, use 'const' instead.*/
```

:::

使用 `{"destructuring": "all"}` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-const: ["error", {"destructuring": "all"}]*/
/*eslint-env es6*/

// 'b' is never reassigned, but all of `a` and `b` should not be const, so those are ignored.
let {a, b} = obj;
a = a + 1;
```

:::

### ignoreReadBeforeAssign

这是一个避免与 `no-use-before-define` 规则（未使用 `nofunc` 选项）冲突的选项。
如果指定 `true`，该规则将忽略在声明和第一次赋值之间读取的变量。
默认是 `false`。

使用 `{"ignoreReadBeforeAssign": true}` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": true}]*/
/*eslint-env es6*/

let timer;
function initialize() {
    if (foo()) {
        clearInterval(timer);
    }
}
timer = setInterval(initialize, 100);
```

:::

使用默认的 `{"ignoreReadBeforeAssign": false}` 选项的**正确**示例：

::: correct

```js
/*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": false}]*/
/*eslint-env es6*/

const timer = setInterval(initialize, 100);
function initialize() {
    if (foo()) {
        clearInterval(timer);
    }
}
```

:::

## 何时不用

如果你不希望被通知那些在初始分配后从未被重新分配的变量，你可以安全地禁用这个规则。
