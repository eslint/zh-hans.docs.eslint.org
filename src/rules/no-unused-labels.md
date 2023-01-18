---
title: no-unused-labels
rule_type: suggestion
related_rules:
- no-extra-label
- no-labels
- no-label-var
---

在代码的任何地方声明了而没有使用的标签，很可能是由于不完整的重构造成的错误。

```js
OUTER_LOOP:
for (const student of students) {
    if (checkScores(student.scores)) {
        continue;
    }
    doSomething(student);
}
```

在这种情况下，可能是忘记了删除 `OUTER_LOOP:`。
这样的标签会占用代码中的空间，也会导致读者的混淆。

## 规则细节

这一规则旨在消除未使用的标签。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unused-labels: "error"*/

A: var foo = 0;

B: {
    foo();
}

C:
for (let i = 0; i < 10; ++i) {
    foo();
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-unused-labels: "error"*/

A: {
    if (foo()) {
        break A;
    }
    bar();
}

B:
for (let i = 0; i < 10; ++i) {
    if (foo()) {
        break B;
    }
    bar();
}
```

:::

## 何时不用

如果你不想被通知有未使用的标签，你可以安全地禁用此规则。
