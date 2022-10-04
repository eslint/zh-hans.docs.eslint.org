---
title: default-case-last
layout: doc
rule_type: suggestion
related_rules:
- default-case
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
---

一个 `switch` 语句可以选择有一个 `default` 子句。

如果有的话它通常是最后一个子句，但也不一定要这样。也可以把 `default` 子句放在所有 `case` 子句之前，或者放在两者之间的任何地方。其行为与最后一个子句基本相同。只有在 `case` 子句（包括 `default` 之后定义的子句）中没有匹配的情况下，`default` 块才会被执行，但是也可以从 `default` 子句“fall through”到列表中的后续子句。然而，这种跨越并不常见，而且会让人感到困惑。

即使没有“fall through”逻辑，看到 `default` 子句在 `case` 子句之前或之间仍然是意想不到的。按照惯例，它应该是最后一个子句。

如果一个 `switch` 语句应该有一个 `default` 子句，将其定义为最后一个子句被认为是最佳做法。

## 规则细节

这条规则强制要求 `switch` 语句中的 `default` 子句排在最后。

它只适用于已经有 `default` 子句的 `switch` 语句。

这条规则并不强制要求 `default` 子句的存在。如果你也想在 `switch` 语句中强制执行 `default` 子句的存在，请参见 [default-case](default-case)。

使用此规则的**错误**示例：

:::incorrect

```js
/*eslint default-case-last: "error"*/

switch (foo) {
    default:
        bar();
        break;
    case "a":
        baz();
        break;
}

switch (foo) {
    case 1:
        bar();
        break;
    default:
        baz();
        break;
    case 2:
        quux();
        break;
}

switch (foo) {
    case "x":
        bar();
        break;
    default:
    case "y":
        baz();
        break;
}

switch (foo) {
    default:
        break;
    case -1:
        bar();
        break;
}

switch (foo) {
  default:
    doSomethingIfNotZero();
  case 0:
    doSomethingAnyway();
}
```

:::

使用此规则的**正确**示例：

:::correct

```js
/*eslint default-case-last: "error"*/

switch (foo) {
    case "a":
        baz();
        break;
    default:
        bar();
        break;
}

switch (foo) {
    case 1:
        bar();
        break;
    case 2:
        quux();
        break;
    default:
        baz();
        break;
}

switch (foo) {
    case "x":
        bar();
        break;
    case "y":
    default:
        baz();
        break;
}

switch (foo) {
    case -1:
        bar();
        break;
}

if (foo !== 0) {
    doSomethingIfNotZero();
}
doSomethingAnyway();
```

:::
