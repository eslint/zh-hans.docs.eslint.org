---
title: yield-star-spacing
rule_type: layout
further_reading:
- https://leanpub.com/understandinges6/read/#leanpub-auto-generators
---

## 规则细节

这条规则强制要求在 `yield*` 表达式中的 `*` 周围有间距。

## 选项

规则需要一个选项，一个对象，它有两个键 `before` 和 `after`，具有布尔值 `true` 或 `false`。

* `before` 强制执行 `yield` 和 `*` 之间的间距。
  如时果 `true` 就需要一个空格，否则不允许有空格。

* `after` 强制执行 `*` 和参数之间的间距。
  如果它是 `true`，则需要一个空格，否则不允许有空格。

默认为 `{"before": false, "after": true}`。

```json
"yield-star-spacing": ["error", {"before": true, "after": false}]
```

该选项也有一个字符串速记。

* `{"before": false, "after": true}` → `"after"`
* `{"before": true, "after": false}` → `"before"`
* `{"before": true, "after": true}` → `"both"`
* `{"before": false, "after": false}` → `"neither"`

```json
"yield-star-spacing": ["error", "after"]
```

## 示例

### after

使用此规则与默认的 `"after"` 选项的**正确**示例：

::: correct

```js
/*eslint yield-star-spacing: ["error", "after"]*/
/*eslint-env es6*/

function* generator() {
  yield* other();
}
```

:::

### before

使用此规则与 `"before"` 选项的**正确**示例：

::: correct

```js
/*eslint yield-star-spacing: ["error", "before"]*/
/*eslint-env es6*/

function *generator() {
  yield *other();
}
```

:::

### both

使用此规则与 `"both"` 选项的**正确**示例：

::: correct

```js
/*eslint yield-star-spacing: ["error", "both"]*/
/*eslint-env es6*/

function * generator() {
  yield * other();
}
```

:::

### neither

使用此规则与 `"neither"` 选项的**正确**示例：

::: correct

```js
/*eslint yield-star-spacing: ["error", "neither"]*/
/*eslint-env es6*/

function*generator() {
  yield*other();
}
```

:::

## 何时不用

如果你的项目不会使用生成器，或者你不关心间距的一致性，你就不需要这个规则。
