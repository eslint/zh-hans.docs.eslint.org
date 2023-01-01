---
title: no-alert
rule_type: suggestion
related_rules:
- no-console
- no-debugger
---

JavaScript 的 `alert`、`confirm` 和 `prompt` 函数被广泛认为是碍眼的 UI 元素，应该用更合适的自定义 UI 实现来代替。此外，`alert` 经常在调试代码时使用，但应在部署到生产环境前删除。

```js
alert("here!");
```

## 规则细节

此规则致力于捕捉应被删除的调试代码和应被替换成不那么碍眼的自定义 UI 的弹出式 UI 元素。因此，当它遇到非 shadowed 的调用 `alert`、`prompt` 和 `confirm` 函数时，它将发出警告。

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint no-alert: "error"*/

alert("here!");

confirm("Are you sure?");

prompt("What's your name?", "John Doe");
```

:::

使用此规则的**正确**示例：

:::correct

```js
/*eslint no-alert: "error"*/

customAlert("Something happened!");

customConfirm("Are you sure?");

customPrompt("Who are you?");

function foo() {
    var alert = myCustomLib.customAlert;
    alert();
}
```

:::
