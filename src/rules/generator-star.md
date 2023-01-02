---
title: generator-star
further_reading:
- https://leanpub.com/understandinges6/read/#leanpub-auto-generators
---

在生成器函数中强制执行星号周围的一致间距。

（已移除）此规则在 ESLint v1.0 中移除并被 [generator-star-spacing](generator-star-spacing) 所取代。

生成器是 ECMAScript 6 中一种新的函数类型，可以同时返回多个值。
这些特殊的函数是通过在 `function` 关键字后面加上 `"*` 来表示的。

下面是生成器函数的示例：

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

这条规则规定，`*` 要么放在 `function` 关键字旁边，要么放在函数名称旁边。这个规则的单一选项是一个指定星号位置的字符串。对于这个选项，你可以通过 `"start"`，`"middle"` 或 `"end"`。默认是 `"end"`。

你可以像这样在配置中设置样式：

```json
"generator-star": ["error", "start"]
```

当使用 `"start"` 时，这个位置将被强制执行。

```js
/*eslint-env es6*/

function* generator() {
}
```

当使用 `"middle"` 时，这个位置将被强制执行：

```js
/*eslint-env es6*/

function * generator() {
}
```

当使用 `"end"` 时，这个位置将被强制执行：

```js
/*eslint-env es6*/

function *generator() {
}
```

当使用表达式语法时，`"start"` 将在这里被强制执行：

```js
/*eslint-env es6*/

var generator = function* () {
}
```

当使用表达式语法时，`"middle"` 将在这里被强制执行：

```js
/*eslint-env es6*/

var generator = function * () {
}
```

当使用表达式语法时，将强制执行 `"end"`：

```js
/*eslint-env es6*/

var generator = function *() {
}
```

当使用表达式语法时，这对 ``"start"` 和 `"end"` 都有效：

```js
/*eslint-env es6*/

var generator = function*() {
}
```

生成器的缩短的对象字面语法不受此规则影响。

## 何时不用

如果你的项目将不使用生成器，你就不需要这个规则。
