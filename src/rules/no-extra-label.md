---
title: no-extra-label
rule_type: suggestion
related_rules:
- no-labels
- no-label-var
- no-unused-labels
---

如果一个循环不包含嵌套的循环或开关，那么就没有必要给这个循环贴标签。

```js
A: while (a) {
    break A;
}
```

你可以通过删除标签并使用没有标签的 `break` 或 `continue` 来达到同样的效果。
可能这些标签会让开发者感到困惑，因为他们希望标签能跳到更远的地方。

## 规则细节

这一规则旨在消除不必要的标签。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-extra-label: "error"*/

A: while (a) {
    break A;
}

B: for (let i = 0; i < 10; ++i) {
    break B;
}

C: switch (a) {
    case 0:
        break C;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-extra-label: "error"*/

while (a) {
    break;
}

for (let i = 0; i < 10; ++i) {
    break;
}

switch (a) {
    case 0:
        break;
}

A: {
    break A;
}

B: while (a) {
    while (b) {
        break B;
    }
}

C: switch (a) {
    case 0:
        while (b) {
            break C;
        }
        break;
}
```

:::

## 何时不用

如果你不希望被通知标签的使用情况，你可以安全地禁用此规则。
