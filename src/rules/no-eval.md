---
title: no-eval
rule_type: suggestion
related_rules:
- no-implied-eval
further_reading:
- https://ericlippert.com/2003/11/01/eval-is-evil-part-one/
- https://javascriptweblog.wordpress.com/2010/04/19/how-evil-is-eval/
---

JavaScript 的 `eval()` 函数具有潜在的危险性，经常被滥用。在不受信任的代码上使用 `eval()` 可以使程序受到几种不同的注入攻击。在大多数情况下，使用 `eval()` 可以用更好的、替代性的方法来解决一个问题。

```js
var obj = { x: "foo" },
    key = "x",
    value = eval("obj." + key);
```

## 规则细节

这条规则的目的是通过禁止使用 `eval()` 函数来防止潜在的危险、不必要和缓慢的代码。因此，只要使用 `eval()` 函数，它就会发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-eval: "error"*/

var obj = { x: "foo" },
    key = "x",
    value = eval("obj." + key);

(0, eval)("var a = 0");

var foo = eval;
foo("var a = 0");

// This `this` is the global object.
this.eval("var a = 0");
```

:::

使用此规则并将 `browser` 环境设置为 `true` 时的额外**错误**示例：

::: incorrect

```js
/*eslint no-eval: "error"*/
/*eslint-env browser*/

window.eval("var a = 0");
```

:::

使用此规则并将 `node` 环境设置为 `true` 时的额外**错误**示例：

::: incorrect

```js
/*eslint no-eval: "error"*/
/*eslint-env node*/

global.eval("var a = 0");
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-eval: "error"*/
/*eslint-env es6*/

var obj = { x: "foo" },
    key = "x",
    value = obj[key];

class A {
    foo() {
        // This is a user-defined method.
        this.eval("var a = 0");
    }

    eval() {
    }

    static {
        // This is a user-defined static method.
        this.eval("var a = 0");
    }

    static eval() {
    }
}
```

:::

## 选项

这个规则有一个选项，允许间接调用 `eval`。
间接调用 `eval` 比直接调用 `eval` 危险性小，因为它们不能动态地改变范围。正因为如此，它们对性能的负面影响也不会达到直接调用 `eval` 的程度。

```js
{
    "no-eval": ["error", {"allowIndirect": true}] // default is false
}
```

使用此规则与 `{"allowIndirect": true}` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-eval: "error"*/

var obj = { x: "foo" },
    key = "x",
    value = eval("obj." + key);
```

:::

使用此规则与 `{"allowIndirect": true}` 选项的**正确**示例：

::: correct

```js
/*eslint no-eval: "error"*/

(0, eval)("var a = 0");

var foo = eval;
foo("var a = 0");

this.eval("var a = 0");
```

:::

::: correct

```js
/*eslint no-eval: "error"*/
/*eslint-env browser*/

window.eval("var a = 0");
```

:::

::: correct

```js
/*eslint no-eval: "error"*/
/*eslint-env node*/

global.eval("var a = 0");
```

:::

## 已知限制

* 这条规则会对每个 `eval()` 都发出警告，即使不是全局 `eval`。
  这种行为是为了检测直接调用 `eval` 的行为。比如说：

  ```js
  module.exports = function(eval) {
      // If the value of this `eval` is built-in `eval` function, this is a
      // call of direct `eval`.
      eval("var a = 0");
  };
  ```

* 这条规则不能捕捉重命名全局对象。比如说

  ```js
  var foo = window;
  foo.eval("var a = 0");
  ```
