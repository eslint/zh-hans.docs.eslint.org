---
title: comma-dangle
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/comma-dangle.md
rule_type: layout
---

根据 ECMAScript 5（和 ECMAScript 3！）的规范，对象字面上的尾随逗号是有效的。然而，IE8（当不在 IE8 文档模式下）及以下版本在遇到 JavaScript 中的尾随逗号时将会出现错误。

```js
var foo = {
    bar: "baz",
    qux: "quux",
};
```

尾随逗号简化了向对象和数组添加和删除项目的过程，因为只会提及你要修改的那一行。
赞成使用尾随逗号的另一个理由是，当从对象或数组中添加或删除一个项目时，它可以提高差异的清晰度：

不太清晰：

```diff
 var foo = {
-    bar: "baz",
-    qux: "quux"
+    bar: "baz"
 };
```

更清晰：

```diff
 var foo = {
     bar: "baz",
-    qux: "quux",
 };
```

## 规则细节

这条规则强制要求在对象和数组字面上统一使用尾随逗号。

## 选项

该规则有一个字符串选项或对象选项：

```json
{
    "comma-dangle": ["error", "never"],
    // 或
    "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "never",
        "imports": "never",
        "exports": "never",
        "functions": "never"
    }]
}
```

* `"never"`（默认值）不允许使用尾随逗号
* `"always"` 需要尾随逗号
* `"always-multiline"` 当最后一个元素或属性在与结尾的 `]` 或 `}` **不同行**时，要求使用尾随逗号；当最后一个元素或属性与结尾的`]`或`}`在**同一行**时，不允许使用尾随逗号
* `"only-multiline"` 当最后一个元素或属性在与结尾的 `]` 或 `}` **不同行**时，允许（但不要求）尾随逗号，当最后一个元素或属性与结尾的 `]` 或 `}` 在**相同行**时，不允许尾随逗号

你也可以使用一个对象选项来为每种类型的语法配置这个规则。
以下每个选项都可以设置为 `"never"`, `"always"`, `"always-multiline"`, `"only-multiline"` 或 `"ignore"`。
除非另有规定，每个选项的默认值都是 `"never"`。

* `arrays` 是用于数组字面和数组模式的解构（如 `let [a,] = [1,];`）。
* `objects` 用于对象字面和对象结构模式（如 `let {a,} = {a: 1};`）。
* `imports` 是用于 ES 模块的导入声明（如 `import {a,} from "foo";`）。
* `exports` 是 ES 模块的导出声明（例如：`export {a,};`)。
* `functions`是用于函数声明和函数调用（如 `(function(a,){ })(b,);`）。
    * `functions` 应该只在对 ECMAScript 2017 或更高版本进行检查时启用。

### never

使用此规则与默认的 `"never"` 选项的**错误**示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", "never"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var arr = [1,2,];

foo({
  bar: "baz",
  qux: "quux",
});
```

:::

使用此规则与默认的 `"never"` 选项的**正确**示例：

:::correct

```js
/*eslint comma-dangle: ["error", "never"]*/

var foo = {
    bar: "baz",
    qux: "quux"
};

var arr = [1,2];

foo({
  bar: "baz",
  qux: "quux"
});
```

:::

### always

使用此规则与 `"always"` 选项的**错误**示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", "always"]*/

var foo = {
    bar: "baz",
    qux: "quux"
};

var arr = [1,2];

foo({
  bar: "baz",
  qux: "quux"
});
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

:::correct

```js
/*eslint comma-dangle: ["error", "always"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var arr = [1,2,];

foo({
  bar: "baz",
  qux: "quux",
});
```

:::

### always-multiline

使用此规则与 `"always-multiline"` 选项的**错误**示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", "always-multiline"]*/

var foo = {
    bar: "baz",
    qux: "quux"
};

var foo = { bar: "baz", qux: "quux", };

var arr = [1,2,];

var arr = [1,
    2,];

var arr = [
    1,
    2
];

foo({
  bar: "baz",
  qux: "quux"
});
```

:::

使用此规则与 `"always-multiline"` 选项的**正确**示例：

:::correct

```js
/*eslint comma-dangle: ["error", "always-multiline"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var foo = {bar: "baz", qux: "quux"};
var arr = [1,2];

var arr = [1,
    2];

var arr = [
    1,
    2,
];

foo({
  bar: "baz",
  qux: "quux",
});
```

:::

### only-multiline

使用此规则与 `"only-multiline"` 选项的**错误**示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", "only-multiline"]*/

var foo = { bar: "baz", qux: "quux", };

var arr = [1,2,];

var arr = [1,
    2,];

```

:::

使用此规则与 `"only-multiline"` 选项的**正确**示例：

:::correct

```js
/*eslint comma-dangle: ["error", "only-multiline"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var foo = {
    bar: "baz",
    qux: "quux"
};

var foo = {bar: "baz", qux: "quux"};
var arr = [1,2];

var arr = [1,
    2];

var arr = [
    1,
    2,
];

var arr = [
    1,
    2
];

foo({
  bar: "baz",
  qux: "quux",
});

foo({
  bar: "baz",
  qux: "quux"
});
```

:::

### functions

使用此规则与 `{"functions": "never"}` 选项的**错误**示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", {"functions": "never"}]*/

function foo(a, b,) {
}

foo(a, b,);
new foo(a, b,);
```

:::

使用此规则与 `{"functions": "never"}` 选项的**正确**示例：

:::correct

```js
/*eslint comma-dangle: ["error", {"functions": "never"}]*/

function foo(a, b) {
}

foo(a, b);
new foo(a, b);
```

:::

使用此规则与 `{"functions": "always"}` 选项的**错误**示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", {"functions": "always"}]*/

function foo(a, b) {
}

foo(a, b);
new foo(a, b);
```

:::

使用此规则与 `{"functions": "always"}` 选项的**正确**示例：

:::correct

```js
/*eslint comma-dangle: ["error", {"functions": "always"}]*/

function foo(a, b,) {
}

foo(a, b,);
new foo(a, b,);
```

:::

## 何时不用

如果你不关心尾随逗号，你可以把这个规则关掉。
