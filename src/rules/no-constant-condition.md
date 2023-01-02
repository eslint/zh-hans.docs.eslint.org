---
title: no-constant-condition
rule_type: problem
related_rules:
- no-constant-binary-expression
---

作为测试条件的常量表达式（例如字面量）可能是一个错别字或开发触发的特定行为。例如，下面的代码看起来好像还没有准备好用于生产。

```js
if (false) {
    doSomethingUnfinished();
}
```

## 规则细节

这条规则不允许在以下测试条件中使用常量表达式：

* `if`、`for`、`while` 或 `do...while` 语句
* `?:` 三元表达式

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-constant-condition: "error"*/

if (false) {
    doSomethingUnfinished();
}

if (void x) {
    doSomethingUnfinished();
}

if (x &&= false) {
    doSomethingNever();
}

if (class {}) {
    doSomethingAlways();
}

if (new Boolean(x)) {
    doSomethingAlways();
}

if (Boolean(1)) {
    doSomethingAlways();
}

if (undefined) {
    doSomethingUnfinished();
}

if (x ||= true) {
    doSomethingAlways();
}

for (;-2;) {
    doSomethingForever();
}

while (typeof x) {
    doSomethingForever();
}

do {
    doSomethingForever();
} while (x = -1);

var result = 0 ? a : b;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-constant-condition: "error"*/

if (x === 0) {
    doSomething();
}

for (;;) {
    doSomethingForever();
}

while (typeof x === "undefined") {
    doSomething();
}

do {
    doSomething();
} while (x);

var result = x !== 0 ? a : b;
```

:::

## 选项

### checkLoops

默认为 `true`。将此选项设置为 `false` 允许在循环中使用常量表达式。

当 `checkLoops` 为 `false` 时的**正确**示例：

::: correct

```js
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/

while (true) {
    doSomething();
    if (condition()) {
        break;
    }
};

for (;true;) {
    doSomething();
    if (condition()) {
        break;
    }
};

do {
    doSomething();
    if (condition()) {
        break;
    }
} while (true)
```

:::
