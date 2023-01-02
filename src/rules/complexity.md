---
title: complexity
rule_type: suggestion
related_rules:
- max-depth
- max-len
- max-lines
- max-lines-per-function
- max-nested-callbacks
- max-params
- max-statements
further_reading:
- https://en.wikipedia.org/wiki/Cyclomatic_complexity
- https://ariya.io/2012/12/complexity-analysis-of-javascript-code
- https://craftsmanshipforsoftware.com/2015/05/25/complexity-for-javascript/
- https://web.archive.org/web/20160808115119/http://jscomplexity.org/complexity
- https://github.com/eslint/eslint/issues/4808#issuecomment-167795140
---

循环复杂度衡量的是通过程序源代码的线性独立路径的数量。这条规则允许设置一个循环复杂度阈值。

```js
function a(x) {
    if (true) {
        return x; // 1st path
    } else if (false) {
        return x+1; // 2nd path
    } else {
        return 4; // 3rd path
    }
}
```

## 规则细节

这条规则旨在通过限制程序中允许的循环复杂性来减少代码的复杂性。因此，当循环复杂度超过配置的阈值（默认为 `20`）时，它将发出警告。

最大值为 2 的**错误**示例：

::: incorrect

```js
/*eslint complexity: ["error", 2]*/

function a(x) {
    if (true) {
        return x;
    } else if (false) {
        return x+1;
    } else {
        return 4; // 3rd path
    }
}

function b() {
    foo ||= 1;
    bar &&= 1;
}
```

:::

最大值为 2 的**正确**示例：

::: correct

```js
/*eslint complexity: ["error", 2]*/

function a(x) {
    if (true) {
        return x;
    } else {
        return 4;
    }
}

function b() {
    foo ||= 1;
}
```

:::

类的字段初始化器和类的静态块是隐式函数。因此，它们的复杂性是针对每个初始化器和每个静态块单独计算的，而且它不对包围代码的复杂性做出贡献。

最大值为 2 的额外**错误**示例：

::: incorrect

```js
/*eslint complexity: ["error", 2]*/

class C {
    x = a || b || c; // this initializer has complexity = 3
}

class D { // this static block has complexity = 3
    static {
        if (foo) {
            bar = baz || qux;
        }
    }
}
```

:::

最大值为 2 的额外**正确**示例：

::: correct

```js
/*eslint complexity: ["error", 2]*/

function foo() { // this function has complexity = 1
    class C {
        x = a + b; // this initializer has complexity = 1
        y = c || d; // this initializer has complexity = 2
        z = e && f; // this initializer has complexity = 2

        static p = g || h; // this initializer has complexity = 2
        static q = i ? j : k; // this initializer has complexity = 2

        static { // this static block has complexity = 2
            if (foo) {
                baz = bar;
            }
        }

        static { // this static block has complexity = 2
            qux = baz || quux;
        }
    }
}
```

:::

## 选项

你可以选择指定 `max` 对象属性：

```json
"complexity": ["error", 2]
```

相当于

```json
"complexity": ["error", { "max": 2 }]
```

**废弃**：对象属性 `maximum` 已被废弃。请使用属性 `max` 代替。

## 何时不用

如果你不确定代码的复杂性，那么最好是禁用这个规则。
