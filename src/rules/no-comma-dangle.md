---
title: no-comma-dangle

---

不允许在对象和数组字面上使用尾随逗号。

（已移除）此规则在 ESLint v1.0 中移除并被 [comma-dangle](comma-dangle) 所取代。

根据 ECMAScript 5（和 ECMAScript 3！）的规范，对象字面量中的尾随逗号是有效的，但是 IE8（当不在 IE8 文档模式下）及以下版本遇到 JavaScript 中的尾随逗号时，会出现错误。

```js
var foo = {
    bar: "baz",
    qux: "quux",
};
```

## 规则细节

这条规则的目的是检测对象字面的尾随逗号。因此，只要遇到对象字面的尾随逗号，它就会发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
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

使用此规则的**正确**示例：

::: correct

```js
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

## 何时不用

如果你的代码不会在 IE8 或更低版本中运行（例如 Node.js 应用程序），并且你希望允许尾随逗号，请关闭此规则。
