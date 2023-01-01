---
title: no-else-return
rule_type: suggestion
---

如果 `if` 块内包含 `return` 语句，`else` 块就没有必要了。它的内容可以放在块的外面。

```js
function foo() {
    if (x) {
        return y;
    } else {
        return z;
    }
}
```

## 规则细节

这条规则的目的是突出显示在含有返回语句的 `if` 后面不必要的代码块。因此，当遇到在一连串的 `if` 后面有一个 `else`，而这些 `if` 都包含 `return` 语句时，它将发出警告。

## 选项

此规则选项为对象：

* `allowElseIf: true`（默认值）允许返回后有 `else if` 块
* `allowElseIf: false` 不允许在返回后有 `else if` 块

### `allowElseIf: true`

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-else-return: "error"*/

function foo() {
    if (x) {
        return y;
    } else {
        return z;
    }
}

function foo() {
    if (x) {
        return y;
    } else if (z) {
        return w;
    } else {
        return t;
    }
}

function foo() {
    if (x) {
        return y;
    } else {
        var t = "foo";
    }

    return t;
}

function foo() {
    if (error) {
        return 'It failed';
    } else {
        if (loading) {
            return "It's still loading";
        }
    }
}

// Two warnings for nested occurrences
function foo() {
    if (x) {
        if (y) {
            return y;
        } else {
            return x;
        }
    } else {
        return z;
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-else-return: "error"*/

function foo() {
    if (x) {
        return y;
    }

    return z;
}

function foo() {
    if (x) {
        return y;
    } else if (z) {
        var t = "foo";
    } else {
        return w;
    }
}

function foo() {
    if (x) {
        if (z) {
            return y;
        }
    } else {
        return z;
    }
}

function foo() {
    if (error) {
        return 'It failed';
    } else if (loading) {
        return "It's still loading";
    }
}
```

:::

### `allowElseIf: false`

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-else-return: ["error", {allowElseIf: false}]*/

function foo() {
    if (error) {
        return 'It failed';
    } else if (loading) {
        return "It's still loading";
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-else-return: ["error", {allowElseIf: false}]*/

function foo() {
    if (error) {
        return 'It failed';
    }

    if (loading) {
        return "It's still loading";
    }
}
```

:::
