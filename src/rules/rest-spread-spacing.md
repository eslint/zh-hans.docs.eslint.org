---
title: rest-spread-spacing
rule_type: layout
further_reading:
- https://github.com/tc39/proposal-object-rest-spread
---

ES2015 引入了剩余运算符和扩展运算符，它们将一个可迭代的结构扩展为其各个部分。它们的一些使用例子如下：

```js
let numArr = [1, 2, 3];
function add(a, b, c) {
    return a + b + c;
}
add(...numArr); // -> 6

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
arr1.push(...arr2); // -> [1, 2, 3, 4, 5, 6]

let [a, b, ...arr] = [1, 2, 3, 4, 5];
a; // -> 1
b // -> 2
arr; // ->  [3, 4, 5]

function numArgs(...args) {
  return args.length;
}
numArgs(a, b, c); // -> 3
```

除上述内容外，目前还有一项建议，即在规范中增加对象的休息和传播属性。它们可以按以下方式使用：

```js

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // -> 1
y; // -> 2
z; // -> { a: 3, b: 4 }

let n = { x, y, ...z };
n; // -> { x: 1, y: 2, a: 3, b: 4 }
```

与其他运算符一样，在剩余或展开运算符和它所操作的表达式之间允许有空白，这可能导致代码库中的间距不一致。

## 规则细节

这条规则的目的是强制执行剩余运算符和展开运算符及其表达式之间的一致间距。该规则还支持 ES2018 中的剩余对象和展开属性。

```json
{
    "parserOptions": {
        "ecmaVersion": 2018
    }
}
```

请阅读用户指南的[配置分析器选项](/docs/user-guide/configuring#specifying-parser-options)部分以了解更多。

## 选项

这个规则有一个字符串选项，其值为 `"never"` 或 `"always"`。默认值是 `"never"`。

### "never"

当使用默认的 `"never"` 选项时，在扩展运算符和其表达式之间不允许有空格：

```json
rest-spread-spacing: ["error"]
```

或

```json
rest-spread-spacing: ["error", "never"]
```

使用此规则与 `"never"` 的**错误**示例：

::: incorrect

```js
/*eslint rest-spread-spacing: ["error", "never"]*/

fn(... args)
[... arr, 4, 5, 6]
let [a, b, ... arr] = [1, 2, 3, 4, 5];
function fn(... args) { console.log(args); }
let { x, y, ... z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ... z };
```

:::

使用此规则与 `"never"` 的**正确**示例：

::: correct

```js
/*eslint rest-spread-spacing: ["error", "never"]*/

fn(...args)
[...arr, 4, 5, 6]
let [a, b, ...arr] = [1, 2, 3, 4, 5];
function fn(...args) { console.log(args); }
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ...z };
```

:::

### "always"

当使用 `"always"` 选项时，在扩展运算符和它们的表达式之间需要空格。

```json
rest-spread-spacing: ["error", "always"]
```

使用此规则与 `"always"` 的**错误**示例：
::: incorrect

```js
/*eslint rest-spread-spacing:["error", "always"]*/

fn(...args)
[...arr, 4, 5, 6]
let [a, b, ...arr] = [1, 2, 3, 4, 5];
function fn(...args) { console.log(args); }
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ...z };
```

:::

使用此规则与 `"always"` 的**正确**示例：

::: correct

```js
/*eslint rest-spread-spacing: ["error", "always"]*/

fn(... args)
[... arr, 4, 5, 6]
let [a, b, ... arr] = [1, 2, 3, 4, 5];
function fn(... args) { console.log(args); }
let { x, y, ... z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ... z };
```

:::

## 何时不用

如果你不关心强制执行传播运算符和其表达式之间的一致间距，你可以安全地禁用这一规则。
