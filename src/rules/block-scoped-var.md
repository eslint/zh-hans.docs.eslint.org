---
title: block-scoped-var
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/block-scoped-var.md
rule_type: suggestion
further_reading:
- https://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting
---

当变量在其定义的块之外被使用时，`block-scoped-var` 规则会产生警告。这模拟了 C 语言的块范围。

## 规则细节

这条规则的目的是减少变量在其绑定上下文之外的使用，并模仿其他语言的传统块范围。这是为了帮助语言的新手们避免因变量提升而产生的地狱。

此规则的**错误**示例：

:::incorrect

```js
/*eslint block-scoped-var: "error"*/

function doIf() {
    if (true) {
        var build = true;
    }

    console.log(build);
}

function doIfElse() {
    if (true) {
        var build = true;
    } else {
        var build = false;
    }
}

function doTryCatch() {
    try {
        var build = 1;
    } catch (e) {
        var f = build;
    }
}

function doFor() {
    for (var x = 1; x < 10; x++) {
        var y = f(x);
    }
    console.log(y);
}

class C {
    static {
        if (something) {
            var build = true;
        }
        build = false;
    }
}
```

:::

此规则的**正确**示例：

:::correct

```js
/*eslint block-scoped-var: "error"*/

function doIf() {
    var build;

    if (true) {
        build = true;
    }

    console.log(build);
}

function doIfElse() {
    var build;

    if (true) {
        build = true;
    } else {
        build = false;
    }
}

function doTryCatch() {
    var build;
    var f;

    try {
        build = 1;
    } catch (e) {
        f = build;
    }
}

function doFor() {
    for (var x = 1; x < 10; x++) {
        var y = f(x);
        console.log(y);
    }
}

class C {
    static {
        var build = false;
        if (something) {
            build = true;
        }
    }
}
```

:::
