---
title: function-call-argument-newline
rule_type: layout
related_rules:
- function-paren-newline
- func-call-spacing
- object-property-newline
- array-element-newline
---

一些风格指南要求或不允许在函数调用的参数之间换行。

## 规则细节

这条规则强制要求在函数调用的参数之间进行换行。

## 选项

此规则选项为字符串：

* `"always"`（默认值）要求参数之间有换行符
* `"never"` 不允许参数之间有换行符
* `"consistent"` 要求参数之间一致使用换行符

### always

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint function-call-argument-newline: ["error", "always"]*/

foo("one", "two", "three");

bar("one", "two", {
    one: 1,
    two: 2
});

baz("one", "two", (x) => {
    console.log(x);
});
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint function-call-argument-newline: ["error", "always"]*/

foo(
    "one",
    "two",
    "three"
);

bar(
    "one",
    "two",
    { one: 1, two: 2 }
);
// 或
bar(
    "one",
    "two",
    {
        one: 1,
        two: 2
    }
);

baz(
    "one",
    "two",
    (x) => {
        console.log(x);
    }
);
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint function-call-argument-newline: ["error", "never"]*/

foo(
    "one",
    "two", "three"
);

bar(
    "one",
    "two", {
        one: 1,
        two: 2
    }
);

baz(
    "one",
    "two", (x) => {
        console.log(x);
    }
);
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint function-call-argument-newline: ["error", "never"]*/

foo("one", "two", "three");
// 或
foo(
    "one", "two", "three"
);

bar("one", "two", { one: 1, two: 2 });
// 或
bar("one", "two", {
    one: 1,
    two: 2
});

baz("one", "two", (x) => {
    console.log(x);
});
```

:::

### consistent

使用此规则与 `"consistent"` 选项的**错误**示例：

::: incorrect

```js
/*eslint function-call-argument-newline: ["error", "consistent"]*/

foo("one", "two",
    "three");
//or
foo("one",
    "two", "three");

bar("one", "two",
    { one: 1, two: 2}
);

baz("one", "two",
    (x) => { console.log(x); }
);
```

:::

使用此规则与 `"consistent"` 选项的**正确**示例：

::: correct

```js
/*eslint function-call-argument-newline: ["error", "consistent"]*/

foo("one", "two", "three");
// 或
foo(
    "one",
    "two",
    "three"
);

bar("one", "two", {
    one: 1,
    two: 2
});
// 或
bar(
    "one",
    "two",
    { one: 1, two: 2 }
);
// 或
bar(
    "one",
    "two",
    {
        one: 1,
        two: 2
    }
);

baz("one", "two", (x) => {
    console.log(x);
});
// 或
baz(
    "one",
    "two",
    (x) => {
        console.log(x);
    }
);
```

:::

## 何时不用

如果你不想在参数之间实行换行，就不要启用这条规则。
