---
title: no-labels
rule_type: suggestion
related_rules:
- no-extra-label
- no-label-var
- no-unused-labels
---

JavaScript 中的标签语句与 `break` 和 `continue` 一起使用，以控制多个循环的流动。比如：

```js
outer:
    while (true) {

        while (true) {
            break outer;
        }
    }
```

`break outer` 语句确保这段代码不会导致无限循环，因为控制权在 `outer` 标签被应用后会返回到下一个语句。如果这条语句被改成只有`break`，控制就会流回外层的 `while` 语句，就会产生无限循环。

虽然在某些情况下很方便，但标签往往很少被使用，而且被一些人认为是流控制的补救形式，更容易出错，更难理解。

## 规则细节

这条规则的目的是消除 JavaScript 中标签语句的使用。每当遇到有标签的语句和 `break` 或 `continue` 与标签一起使用时，它都会发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-labels: "error"*/

label:
    while(true) {
        // ...
    }

label:
    while(true) {
        break label;
    }

label:
    while(true) {
        continue label;
    }

label:
    switch (a) {
    case 0:
        break label;
    }

label:
    {
        break label;
    }

label:
    if (a) {
        break label;
    }
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-labels: "error"*/

var f = {
    label: "foo"
};

while (true) {
    break;
}

while (true) {
    continue;
}
```

:::

## 选项

这些选项允许带有循环或开关语句的标签。

* `"allowLoop"`（`boolean`，默认为 `false`） - 如果这个选项被设置为 `true`，这个规则会忽略那些粘有循环语句的标签。
* `"allowSwitch"`（`boolean`，默认为 `false`） - 如果这个选项被设置为 `true`，这条规则会忽略粘在 switch 语句上的标签。

实际上，JavaScript 中的标签语句可以用于循环和开关语句以外的地方。
但是，这种方式非常罕见，并不为人所知，所以这将使开发人员感到困惑。

### allowLoop

使用 `{ "allowLoop": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-labels: ["error", { "allowLoop": true }]*/

label:
    while (true) {
        break label;
    }
```

:::

### allowSwitch

使用 `{ "allowSwitch": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-labels: ["error", { "allowSwitch": true }]*/

label:
    switch (a) {
        case 0:
            break label;
    }
```

:::

## 何时不用

如果你需要在任何地方使用标注的语句，你可以安全地禁用这一规则。
