---
title: no-constant-binary-expression
rule_type: problem
related_rules:
- no-constant-condition
further_reading:
- https://eslint.org/blog/2022/07/interesting-bugs-caught-by-no-constant-binary-expression/
---

总是评估为真或假的比较和总是短路或从不短路的逻辑表达式 (`||`, `&&`, `??`) 都可能是程序员错误的迹象。

这些错误在复杂的表达式中特别常见，因为在这些表达式中，运算符的优先级很容易被误判。比如：

```js
// One might think this would evaluate as `a + (b ?? c)`:
const x = a + b ?? c;

// But it actually evaluates as `(a + b) ?? c`. Since `a + b` can never be null,
// the `?? c` has no effect.
```

此外，这个规则还可以检测到与新构建的对象/数组/函数等的比较。在 JavaScript 中，对象是通过引用进行比较的，一个新构造的对象永远不可能 `===` 任何其他值。这对于那些来自于对象通过值进行比较的语言的程序员来说，可能会感到惊讶。

```js
// Programmers coming from a language where objects are compared by value might expect this to work:
const isEmpty = x === [];

// However, this will always result in `isEmpty` being `false`.
```

## 规则细节

这条规则确定了 `==` 和 `===` 的比较，根据 JavaScript 语言的语义，这些比较将总是评估为 `true` 或 `false`。

它还识别了 `||`、`&&` 和 `??` 逻辑表达式，这些表达式将始终或永远不会短路。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-constant-binary-expression: "error"*/

const value1 = +x == null;

const value2 = condition ? x : {} || DEFAULT;

const value3 = !foo == null;

const value4 = new Boolean(foo) === true;

const objIsEmpty = someObj === {};

const arrIsEmpty = someArr === [];
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-constant-binary-expression: "error"*/

const value1 = x == null;

const value2 = (condition ? x : {}) || DEFAULT;

const value3 = !(foo == null);

const value4 = Boolean(foo) === true;

const objIsEmpty = Object.keys(someObj).length === 0;

const arrIsEmpty = someArr.length === 0;

const shortCircuit1 = condition1 && false && condition2;

const shortCircuit2 = condition1 || true || condition2;

const shortCircuit3 = condition1 ?? "non-nullish" ?? condition2;

```

:::
