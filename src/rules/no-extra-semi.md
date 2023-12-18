---
title: no-extra-semi
rule_type: suggestion
related_rules:
- semi
- semi-spacing
---

输入错误和对哪里需要分号的误解会导致不必要的分号的出现。虽然在技术上不是一个错误，但额外的分号会在阅读代码时造成混乱。

## 规则细节

这条规则禁止不必要的分号。

该规则报告的问题可以自动修复，除非在标签和后续语句之间有任何注释，或者删除标签会导致后续语句变成诸如 `"use strict"` 之类的指令。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-extra-semi: "error"*/

var x = 5;;

function foo() {
    // code
};

class C {
    field;;

    method() {
        // code
    };

    static {
        // code
    };
};
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-extra-semi: "error"*/

var x = 5;

function foo() {
    // code
}

var bar = function() {
    // code
};

class C {
    field;

    method() {
        // code
    }

    static {
        // code
    }
}
```

:::

## 何时不用

如果你故意使用额外的分号，那么你可以禁用这个规则。
