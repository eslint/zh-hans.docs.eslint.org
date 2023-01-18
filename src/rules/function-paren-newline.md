---
title: function-paren-newline
rule_type: layout
---

许多风格指南要求或不允许在函数括号内使用换行符。

## 规则细节

这条规则使函数参数或参数的括号内的换行符一致。

### 选项

这条规则有一个选项，可以是一个字符串，也可以是一个对象。

* `"always"` 要求在所有函数的括号内换行。
* `"never"` 不允许在所有函数括号内换行。
* `"multiline"`（默认值）要求在函数括号内换行，如果任何参数之间有换行。否则，它不允许使用换行符。
* `"multiline-arguments"` 与 `multiline` 的工作方式相同，但如果只有一个参数，则允许在函数括号内划线。
* `"consistent"` 要求每对小括号一致使用换行符。如果一对小括号中的一个小括号内有换行符，而另一个小括号没有，则报告错误。
* `{ "minItems": value }` 如果参数/参数的数量至少为 `value`，则要求在函数小括号内使用换行符。否则，它不允许使用换行符。

配置示例：

```json
{
  "rules": {
    "function-paren-newline": ["error", "never"]
  }
}
```

```json
{
  "rules": {
    "function-paren-newline": ["error", { "minItems": 3 }]
  }
}
```

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", "always"] */

function foo(bar, baz) {}

var foo = function(bar, baz) {};

var foo = (bar, baz) => {};

foo(bar, baz);
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/* eslint function-paren-newline: ["error", "always"] */

function foo(
  bar,
  baz
) {}

var foo = function(
  bar, baz
) {};

var foo = (
  bar,
  baz
) => {};

foo(
  bar,
  baz
);
```

:::

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", "never"] */

function foo(
  bar,
  baz
) {}

var foo = function(
  bar, baz
) {};

var foo = (
  bar,
  baz
) => {};

foo(
  bar,
  baz
);
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/* eslint function-paren-newline: ["error", "never"] */

function foo(bar, baz) {}

function foo(bar,
             baz) {}

var foo = function(bar, baz) {};

var foo = (bar, baz) => {};

foo(bar, baz);

foo(bar,
  baz);
```

:::

使用此规则与默认的 `"multiline"` 选项的**错误**示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", "multiline"] */

function foo(bar,
  baz
) {}

var foo = function(
  bar, baz
) {};

var foo = (
  bar,
  baz) => {};

foo(bar,
  baz);

foo(
  function() {
    return baz;
  }
);
```

:::

使用此规则与默认的 `"multiline"` 选项的**正确**示例：

::: correct

```js
/* eslint function-paren-newline: ["error", "multiline"] */

function foo(bar, baz) {}

var foo = function(
  bar,
  baz
) {};

var foo = (bar, baz) => {};

foo(bar, baz, qux);

foo(
  bar,
  baz,
  qux
);

foo(function() {
  return baz;
});
```

:::

使用此规则与 `"consistent"` 选项的**错误**示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", "consistent"] */

function foo(bar,
  baz
) {}

var foo = function(bar,
  baz
) {};

var foo = (
  bar,
  baz) => {};

foo(
  bar,
  baz);

foo(
  function() {
    return baz;
  });
```

:::

使用此规则与 `"consistent"` 选项的**正确**示例：

::: correct

```js
/* eslint function-paren-newline: ["error", "consistent"] */

function foo(bar,
  baz) {}

var foo = function(bar, baz) {};

var foo = (
  bar,
  baz
) => {};

foo(
  bar, baz
);

foo(
  function() {
    return baz;
  }
);
```

:::

使用此规则与 `"multiline-arguments"` 选项的**错误**示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", "multiline-arguments"] */

function foo(bar,
  baz
) {}

var foo = function(bar,
  baz
) {};

var foo = (
  bar,
  baz) => {};

foo(
  bar,
  baz);

foo(
  bar, qux,
  baz
);
```

:::

使用此规则与 consistent `"multiline-arguments"` 选项的**正确**示例：

::: correct

```js
/* eslint function-paren-newline: ["error", "multiline-arguments"] */

function foo(
  bar,
  baz
) {}

var foo = function(bar, baz) {};

var foo = (
  bar
) => {};

foo(
  function() {
    return baz;
  }
);
```

:::

使用此规则与 `{ "minItems": 3 }` 选项的**错误**示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", { "minItems": 3 }] */

function foo(
  bar,
  baz
) {}

function foo(bar, baz, qux) {}

var foo = function(
  bar, baz
) {};

var foo = (bar,
  baz) => {};

foo(bar,
  baz);
```

:::

使用此规则与 `{ "minItems": 3 }` 选项的**正确**示例：

::: correct

```js
/* eslint function-paren-newline: ["error", { "minItems": 3 }] */

function foo(bar, baz) {}

var foo = function(
  bar,
  baz,
  qux
) {};

var foo = (
  bar, baz, qux
) => {};

foo(bar, baz);

foo(
  bar, baz, qux
);
```

:::

## 何时不用

如果不想在函数括号内使用风格一致的换行符，就不要开启这个规则。
