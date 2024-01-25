---
title: no-setter-return
rule_type: problem
handled_by_typescript: true
related_rules:
- getter-return
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
---

设置器不能有返回值。

虽然从 setter 返回一个值不会产生错误，但返回的值被忽略了。因此，从 setter 返回一个值要么是不必要的，要么是一个可能的错误，因为返回的值不能被使用。

## 规则细节

使用此规则禁用从 setter 返回值，并在 setter 函数中报告`return` 语句。

只有没有值的 `return` 是允许的，因为它是一个控制流语句。

这条规则会检查以下范围中的设置器：

* 对象字面量。
* 类声明和类表达式。
* 全局对象的 `Object.create`、`Object.defineProperty`、`Object.defineProperties` 和 `Reflect.defineProperty` 方法中的属性描述词。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-setter-return: "error"*/

var foo = {
    set a(value) {
        this.val = value;
        return value;
    }
};

class Foo {
    set a(value) {
        this.val = value * 2;
        return this.val;
    }
}

const Bar = class {
    static set a(value) {
        if (value < 0) {
            this.val = 0;
            return 0;
        }
        this.val = value;
    }
};

Object.defineProperty(foo, "bar", {
    set(value) {
        if (value < 0) {
            return false;
        }
        this.val = value;
    }
});
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-setter-return: "error"*/

var foo = {
    set a(value) {
        this.val = value;
    }
};

class Foo {
    set a(value) {
        this.val = value * 2;
    }
}

const Bar = class {
    static set a(value) {
        if (value < 0) {
            this.val = 0;
            return;
        }
        this.val = value;
    }
};

Object.defineProperty(foo, "bar", {
    set(value) {
        if (value < 0) {
            throw new Error("Negative value.");
        }
        this.val = value;
    }
});
```

:::
