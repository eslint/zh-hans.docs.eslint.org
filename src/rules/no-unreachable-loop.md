---
title: no-unreachable-loop
layout: doc
rule_type: problem
related_rules:
- no-unreachable
- no-constant-condition
- no-unmodified-loop-condition
- for-direction
---

代码也可能会存在一个永远无法实现二次迭代的循环。

```js
for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === myName) {
        doSomething(arr[i]);
        // break was supposed to be here
    }
    break;
}
```

在极少数情况下，可能预期行为就是只使用一个迭代（或最多一个迭代），这种情况下代码应该使用 `if` 条件重构，而不是使用 `while`、`do-while` 和 `for` 循环。在这种情况下，避免使用循环结构被认为是一种最佳做法。

## 规则细节

该规则旨在通过对循环体进行静态代码路径分析，检测并禁止最多只能有一次迭代的循环。

特别是，这条规则将不允许一个循环的主体在所有代码路径中都退出循环。如果循环主体中的所有代码路径都以 "break"、"return "或 "throw "语句结束，那么无论循环的条件如何，这种循环的第二次迭代肯定是无法到达的。

该规则检查 `while`、`do-while`、`for`、`for-in` 和 `for-of` 循环。你可以选择禁用对这些结构的检查。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unreachable-loop: "error"*/

while (foo) {
    doSomething(foo);
    foo = foo.parent;
    break;
}

function verifyList(head) {
    let item = head;
    do {
        if (verify(item)) {
            return true;
        } else {
            return false;
        }
    } while (item);
}

function findSomething(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (isSomething(arr[i])) {
            return arr[i];
        } else {
            throw new Error("Doesn't exist.");
        }
    }
}

for (key in obj) {
    if (key.startsWith("_")) {
        break;
    }
    firstKey = key;
    firstValue = obj[key];
    break;
}

for (foo of bar) {
    if (foo.id === id) {
        doSomething(foo);
    }
    break;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-unreachable-loop: "error"*/

while (foo) {
    doSomething(foo);
    foo = foo.parent;
}

function verifyList(head) {
    let item = head;
    do {
        if (verify(item)) {
            item = item.next;
        } else {
            return false;
        }
    } while (item);

    return true;
}

function findSomething(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (isSomething(arr[i])) {
            return arr[i];
        }
    }
    throw new Error("Doesn't exist.");
}

for (key in obj) {
    if (key.startsWith("_")) {
        continue;
    }
    firstKey = key;
    firstValue = obj[key];
    break;
}

for (foo of bar) {
    if (foo.id === id) {
        doSomething(foo);
        break;
    }
}
```

:::

请注意，这条规则不是用来检查循环条件的，在诸如以下例子的情况下不会发出警告。

本规则的其他**正确的**代码的例子。

::: correct

```js
/*eslint no-unreachable-loop: "error"*/

do {
    doSomething();
} while (false)

for (let i = 0; i < 1; i++) {
    doSomething(i);
}

for (const a of [1]) {
    doSomething(a);
}
```

:::

## 选项

这个规则有一个对象选项，有一个选项。

* `"ignore"` - 一个可选的循环类型数组，它将被该规则忽略。

### ignore

你可以在 `"ignore"` 数组中最多指定 5 个不同的元素：

* `"WhileStatement"` - 忽略所有`while`循环。
* `"DoWhileStatement"` - 忽略所有 `do-while` 循环。
* `"ForStatement"` - 忽略所有的 `for` 循环（不适用于 `for-in` 和 `for-of` 循环）.
* `"ForInStatement"` - 忽略所有的 `for-in` 循环。
* `"ForOfStatement"` - 忽略所有的 `for-of` 循环。

使用此规则与 `"ignore"` 选项的**正确**示例：

::: correct

```js
/*eslint no-unreachable-loop: ["error", { "ignore": ["ForInStatement", "ForOfStatement"] }]*/

for (var key in obj) {
  hasEnumerableProperties = true;
  break;
}

for (const a of b) break;
```

:::

## 已知限制

一般来说只会静态分析代码路径，不评估条件。由于这一情况，次规则可能会遗漏诸如以下的报告情况：

```js
for (let i = 0; i < 10; i++) {
    doSomething(i);
    if (true) {
        break;
    }
}
```
