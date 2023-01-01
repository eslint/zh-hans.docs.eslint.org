---
title: no-continue
rule_type: suggestion
---

`continue` 语句会终止当前或标记循环的当前迭代中的语句的执行，并在下一个迭代中继续执行循环。如果使用不当，可能会降低代码的可测试性、可读性和可维护性。应该使用结构化的控制流语句，如 `if` 来代替。

```js
var sum = 0,
    i;

for(i = 0; i < 10; i++) {
    if(i >= 5) {
        continue;
    }

    a += i;
}
```

## 规则细节

使用此规则禁用 `continue` 语句。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-continue: "error"*/

var sum = 0,
    i;

for(i = 0; i < 10; i++) {
    if(i >= 5) {
        continue;
    }

    a += i;
}
```

:::

::: incorrect

```js
/*eslint no-continue: "error"*/

var sum = 0,
    i;

labeledLoop: for(i = 0; i < 10; i++) {
    if(i >= 5) {
        continue labeledLoop;
    }

    a += i;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-continue: "error"*/

var sum = 0,
    i;

for(i = 0; i < 10; i++) {
    if(i < 5) {
       a += i;
    }
}
```

:::

## 兼容

* **JSLint**：`continue`
