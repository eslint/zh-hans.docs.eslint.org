---
title: generator-star-spacing
rule_type: layout
further_reading:
- https://leanpub.com/understandinges6/read/#leanpub-auto-generators
---

生成器是 ECMAScript 6 中一种新的函数类型，可以同时返回多个值。
这些特殊的函数是通过在 `function` 关键字后面加上 `*` 来表示的。

下面是生成器函数的例子：

```js
/*eslint-env es6*/

function* generator() {
    yield "44";
    yield "55";
}
```

这也可以：

```js
/*eslint-env es6*/

function *generator() {
    yield "44";
    yield "55";
}
```

这还是可以：

```js
/*eslint-env es6*/

function * generator() {
    yield "44";
    yield "55";
}
```

为了在使用生成器时保持一致性，本规则为 `*` 强制执行单一位置。

## 规则细节

该规则旨在强制执行生成器函数的 `*` 周围的间距。

## 选项

规则需要一个选项，一个对象，它有两个键 `before` 和 `after`，可以是布尔值 `true` 或 `false`。

* `before` 在 `*` 和 `function` 关键词之间强制执行间隔。
  如果它是 `true`，则需要一个空格，否则不允许有空格。

  在对象字面量速记方法中，不检查`*` 之前的间隔，因为它们缺少 `function` 关键字。

* `after` 强制要求在 `*` 和函数名（或匿名生成器函数的开头括号）之间有间距。
  如果它是 `true`，则需要一个空格，否则不允许有空格。

默认值是 `{"before": true, "after": false}`。

配置示例：

```json
"generator-star-spacing": ["error", {"before": true, "after": false}]
```

而该选项有速记为一个字符串的关键词。

* `{"before": true, "after": false}` → `"before"`
* `{"before": false, "after": true}` → `"after"`
* `{"before": true, "after": true}` → `"both"`
* `{"before": false, "after": false}` → `"neither"`

速记配置实力：

```json
"generator-star-spacing": ["error", "after"]
```

此外，这个规则允许通过每个函数类型的重写来进一步配置。

* `named` 为命名的函数提供重写。
* `anonymous` 为匿名函数提供重写。
* `method` 为类方法或属性函数速记提供重写。

一个带有重写的配置示例：

```json
"generator-star-spacing": ["error", {
    "before": false,
    "after": true,
    "anonymous": "neither",
    "method": {"before": true, "after": true}
}]
```

在上面的配置示例中，顶层的 `before` 和 `after` 选项定义了规则的默认行为。规则，而 `anonymous` 和 `method` 选项则覆盖了默认行为。
覆盖可以是一个带有 `before` 和 `after`的对象，也可以是上述的速记字符串。

## 示例

### before

使用此规则与 `"before"` 选项的**正确**示例：

::: correct

```js
/*eslint generator-star-spacing: ["error", {"before": true, "after": false}]*/
/*eslint-env es6*/

function *generator() {}

var anonymous = function *() {};

var shorthand = { *generator() {} };
```

:::

### after

使用此规则与 `"after"` 选项的**正确**示例：

::: correct

```js
/*eslint generator-star-spacing: ["error", {"before": false, "after": true}]*/
/*eslint-env es6*/

function* generator() {}

var anonymous = function* () {};

var shorthand = { * generator() {} };
```

:::

### both

使用此规则与 `"both"` 选项的**正确**示例：

::: correct

```js
/*eslint generator-star-spacing: ["error", {"before": true, "after": true}]*/
/*eslint-env es6*/

function * generator() {}

var anonymous = function * () {};

var shorthand = { * generator() {} };
```

:::

### neither

使用此规则与 `"neither"` 选项的**正确**示例：

::: correct

```js
/*eslint generator-star-spacing: ["error", {"before": false, "after": false}]*/
/*eslint-env es6*/

function*generator() {}

var anonymous = function*() {};

var shorthand = { *generator() {} };
```

:::

此规则与重写的**错误**示例：

::: incorrect

```js
/*eslint generator-star-spacing: ["error", {
    "before": false,
    "after": true,
    "anonymous": "neither",
    "method": {"before": true, "after": true}
}]*/
/*eslint-env es6*/

function * generator() {}

var anonymous = function* () {};

var shorthand = { *generator() {} };

class Class { static* method() {} }
```

:::

使用此规则与覆盖的**正确**示例：

::: correct

```js
/*eslint generator-star-spacing: ["error", {
    "before": false,
    "after": true,
    "anonymous": "neither",
    "method": {"before": true, "after": true}
}]*/
/*eslint-env es6*/

function* generator() {}

var anonymous = function*() {};

var shorthand = { * generator() {} };

class Class { static * method() {} }
```

:::

## 何时不用

如果你的项目不会使用生成器，或者你不关心间距的一致性，你就不需要这个规则。
