---
title: no-reserved-keys

further_reading:
- https://kangax.github.io/compat-table/es5/#Reserved_words_as_property_names
---

不允许在对象字面量中使用未加引号的保留字作为属性名称。
.

（已移除）此规则在 ESLint v1.0 中移除并被 [quote-props](quote-props) 所取代。

ECMAScript 3 描述了一系列的关键字和保留词，如 `if` 和 `public`，这些关键字和保留词用于或打算用于一个核心语言特性。该规范还指出，这些关键词和保留词不能作为对象属性名称，而要用字符串括起来。在 ECMAScript 3 环境下，当你在一个对象字面中使用关键字或保留字时，会发生错误。比如：

```js
var values = {
    enum: ["red", "blue", "green"]  // throws an error in ECMAScript 3
}
```

在这段代码中，`enum` 被用作对象键，在 ECMAScript 3 环境下（如 Internet Explorer 8）会出现错误。

ECMAScript 5 放宽了限制，关键字和保留字可以作为对象的键，而不会引起错误。然而，任何需要在 ECMAScript 3 中运行的代码仍然需要避免使用关键字和保留字作为键。

## 规则细节

这条规则的目的是消除使用 ECMAScript 3 关键字和保留词作为对象字面的键。因此，在 ECMAScript 3 环境下，只要有一个对象键会出错，它就会发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
var superman = {
    class: "Superhero",
    private: "Clark Kent"
};

var values = {
    enum: ["red", "blue", "green"]
};
```

:::

使用此规则的**正确**示例：

::: correct

```js
var superman = {
    "class": "Superhero",
    "private": "Clark Kent"
};

var values = {
    "enum": ["red", "blue", "green"]
};
```

:::

## 何时不用

如果你的代码只在 ECMAScript 5 或更高的环境中执行，那么你可以安全地关闭这个规则。
