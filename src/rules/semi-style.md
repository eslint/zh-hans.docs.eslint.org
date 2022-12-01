---
title: semi-style
layout: doc
rule_type: layout
related_rules:
- no-extra-semi
- semi
- semi-spacing
---

一般来说，分号是在行尾的。然而，在无分号风格中，分号是在行的开头。这条规则强制规定分号在配置的位置。

## 规则细节

这条规则报告分号周围的行终止符。

这条规则有一个选项。

```json
{
    "semi-style": ["error", "last"],
}
```

* `"last"`（默认值）表示分号在语句的末尾。
* `"first"` 强制要求分号在语句的开头。即使你使用这个选项，`for` 循环头的分号（`for(a;b;c){}`）应该在行尾。

此规则与 `"last"` 选项的**错误**示例：

::: incorrect

```js
/*eslint semi-style: ["error", "last"]*/

foo()
;[1, 2, 3].forEach(bar)

for (
    var i = 0
    ; i < 10
    ; ++i
) {
    foo()
}

class C {
    static {
        foo()
        ;bar()
    }
}
```

:::

此规则与 `"last"` 选项的**正确**示例：

::: correct

```js
/*eslint semi-style: ["error", "last"]*/

foo();
[1, 2, 3].forEach(bar)

for (
    var i = 0;
    i < 10;
    ++i
) {
    foo()
}

class C {
    static {
        foo();
        bar()
    }
}
```

:::

此规则与 `"first"` 选项的**错误**示例：

::: incorrect

```js
/*eslint semi-style: ["error", "first"]*/

foo();
[1, 2, 3].forEach(bar)

for (
    var i = 0
    ; i < 10
    ; ++i
) {
    foo()
}

class C {
    static {
        foo();
        bar()
    }
}
```

:::

此规则与 `"first"` 选项的**正确**示例：

::: correct

```js
/*eslint semi-style: ["error", "first"]*/

foo()
;[1, 2, 3].forEach(bar)

for (
    var i = 0;
    i < 10;
    ++i
) {
    foo()
}

class C {
    static {
        foo()
        ;bar()
    }
}
```

:::

## 何时不用

如果你不想通知分号的位置，你可以安全地禁用此规则。
