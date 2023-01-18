---
title: no-duplicate-case
rule_type: problem
---

如果一个 `switch` 语句在 `case` 子句中有重复的测试表达式，很可能是程序员复制了一个 `case` 子句，但忘记了改变测试表达式。

## 规则细节

使用此规则禁止在 `switch` 的 `case` 子句中重复测试表达式。

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint no-duplicate-case: "error"*/

var a = 1,
    one = 1;

switch (a) {
    case 1:
        break;
    case 2:
        break;
    case 1:         // duplicate test expression
        break;
    default:
        break;
}

switch (a) {
    case one:
        break;
    case 2:
        break;
    case one:         // duplicate test expression
        break;
    default:
        break;
}

switch (a) {
    case "1":
        break;
    case "2":
        break;
    case "1":         // duplicate test expression
        break;
    default:
        break;
}
```

:::

使用此规则的**正确**示例：

:::correct

```js
/*eslint no-duplicate-case: "error"*/

var a = 1,
    one = 1;

switch (a) {
    case 1:
        break;
    case 2:
        break;
    case 3:
        break;
    default:
        break;
}

switch (a) {
    case one:
        break;
    case 2:
        break;
    case 3:
        break;
    default:
        break;
}

switch (a) {
    case "1":
        break;
    case "2":
        break;
    case "3":
        break;
    default:
        break;
}
```

:::

## 何时不用

在极少数情况下，`case` 子句中相同的测试表达式会产生不同的值，这必然意味着表达式会引起和依赖副作用，你将不得不禁用这个规则。

```js
switch (a) {
    case i++:
        foo();
        break;
    case i++: // eslint-disable-line no-duplicate-case
        bar();
        break;
}
```
