---
title: switch-colon-spacing
rule_type: layout
---

冒号周围的间距提高了 `case`/`default` 条款的可读性。

## 规则细节

这条规则控制 `switch` 语句中的 `case` 和 `default` 子句周围的间距。
这条规则只在连续的标记存在于同一行的情况下进行检查。

这条规则有 2 个布尔值的选项：

```json
{
    "switch-colon-spacing": ["error", {"after": true, "before": false}]
}
```

* `"after": true`（默认值）要求冒号后有一个或多个空格。
* `"after": false` 不允许在冒号后有空格。
* `"before": true` 需要在冒号前有一个或多个空格。
* `"before": false`（默认值）不允许在冒号之前。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint switch-colon-spacing: "error"*/

switch (a) {
    case 0 :break;
    default :foo();
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint switch-colon-spacing: "error"*/

switch (a) {
    case 0: foo(); break;
    case 1:
        bar();
        break;
    default:
        baz();
        break;
}
```

:::

使用此规则与 `{"after": false, "before": true}` 选项的**错误**示例：

::: incorrect

```js
/*eslint switch-colon-spacing: ["error", {"after": false, "before": true}]*/

switch (a) {
    case 0: break;
    default: foo();
}
```

:::

使用此规则与 `{"after": false, "before": true}` 选项的**正确**示例：

::: correct

```js
/*eslint switch-colon-spacing: ["error", {"after": false, "before": true}]*/

switch (a) {
    case 0 :foo(); break;
    case 1 :
        bar();
        break;
    default :
        baz();
        break;
}
```

:::

## 何时不用

如果你不关心 switch 语句的冒号周围的间距，你可以安全地禁用此规则。
