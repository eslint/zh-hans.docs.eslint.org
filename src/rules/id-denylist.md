---
title: id-denylist
layout: doc
rule_type: suggestion
---

> “计算机科学中只有两件难事：缓存失效和命名事物。” - 菲尔-卡尔顿

通用名称可能导致难以破译的代码。这个规则允许你指定一个不允许的标识符名称的拒绝列表，以避免这种做法。

## 规则细节

这条规则不允许在赋值和 `function` 定义中使用指定的标识符。

这条规则将捕获不允许的标识符，有这些标识符：

* 变量声明
* 函数声明
* 创建对象时分配给对象的属性
* 类字段
* 类方法

它不会捕捉那些不允许的标识符：

* 函数调用（所以你仍然可以使用你没有控制权的函数）
* 对象属性（所以你仍然可以使用你没有控制权的对象）

## 选项

规则需要一个或多个字符串作为选项：受限标识符的名称。

例如，限制使用常见的通用标识符：

```json
{
    "id-denylist": ["error", "data", "err", "e", "cb", "callback"]
}
```

**注意**:数组的第一个元素代表规则的严重程度（见[配置规则](/docs/latest/user-guide/configuring/rules)。数组中的其他元素是你想禁止的标识符。

使用此规则与演示的 `"data"、"callback"` 限制性标识符的**错误**示例：

::: incorrect

```js
/*eslint id-denylist: ["error", "data", "callback"] */

var data = {...};

function callback() {
    // ...
}

element.callback = function() {
    // ...
};

var itemSet = {
    data: [...]
};

class Foo {
    data = [];
}

class Foo {
    #data = [];
}

class Foo {
    callback( {);
}

class Foo {
    #callback( {);
}
```

:::

使用此规则和演示的 `"data", "callback"` 限制性标识符的**正确**示例：

::: correct

```js
/*eslint id-denylist: ["error", "data", "callback"] */

var encodingOptions = {...};

function processFileResult() {
    // ...
}

element.successHandler = function() {
    // ...
};

var itemSet = {
    entities: [...]
};

callback(); // all function calls are ignored

foo.callback(); // all function calls are ignored

foo.data; // all property names that are not assignments are ignored

class Foo {
    items = [];
}

class Foo {
    #items = [];
}

class Foo {
    method( {);
}

class Foo {
    #method( {);
}
```

:::

## 何时不用

如果你不想限制某些标识符的使用，你可以把这个规则关掉。
