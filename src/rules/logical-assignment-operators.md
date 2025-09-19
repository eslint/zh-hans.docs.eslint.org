---
title: logical-assignment-operators
rule_type: suggestion
---

ES2021 为逻辑运算符 `||`、`&&` 和 `??` 引入赋值运算符简写。
在此之前仅允许算术运算符如 `+` 或 `*`（参见 [operator-assignment](./operator-assignment) 规则）进行简写。
如果赋值目标和逻辑表达式的左表达式相同，则可以使用该简写。
比如 `a = a || b` 就可以简写为 `a ||= b`。

## 规则细节

此规则要求或禁止使用逻辑赋值运算符简写。

### 选项

此规则有一个字符串和一个对象选项。
字符串选项：

* `"always"`（默认值）
* `"never"`

对象选项（仅当字符串选项被设置为 `"always"` 时可用）：

* `"enforceForIfStatements": false`（默认值）**不会**检查等价的 `if` 语句
* `"enforceForIfStatements": true` 检查等价的 `if` 语句

#### always

此选项检查可以使用逻辑赋值运算符简写的表达式。比如 `a = a || b` 可以简写为 `a ||= b`。
也将报告可以简写的使用结合律的表达式，如 `a = a || b || c` 可以简写为 `a ||= b || c`，除非采用括号明确评估顺序，如 `a = (a || b) || c`。

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint logical-assignment-operators: ["error", "always"]*/

a = a || b
a = a && b
a = a ?? b
a || (a = b)
a && (a = b)
a ?? (a = b)
a = a || b || c
a = a && b && c
a = a ?? b ?? c
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint logical-assignment-operators: ["error", "always"]*/

a = b
a += b
a ||= b
a = b || c
a || (b = c)

if (a) a = b

a = (a || b) || c
```

:::

#### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint logical-assignment-operators: ["error", "never"]*/

a ||= b
a &&= b
a ??= b
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint logical-assignment-operators: ["error", "never"]*/

a = a || b
a = a && b
a = a ?? b
```

:::

#### enforceForIfStatements

此选项检查能够表达为逻辑赋值运算符的 if 语句的其他模式。

使用此规则与 `["always", { enforceForIfStatements: true }]` 选项的**错误**示例：

::: incorrect

```js
/*eslint logical-assignment-operators: ["error", "always", { enforceForIfStatements: true }]*/

if (a) a = b // <=> a &&= b
if (!a) a = b // <=> a ||= b

if (a == null) a = b // <=> a ??= b
if (a === null || a === undefined) a = b // <=> a ??= b
```

:::

使用此规则与 `["always", { enforceForIfStatements: true }]` 选项的**正确**示例：

::: correct

```js
/*eslint logical-assignment-operators: ["error", "always", { enforceForIfStatements: true }]*/

if (a) b = c
if (a === 0) a = b
```

:::

## 何时不用

使用逻辑操作符赋值简写是风格上的选择。将此规则关闭可以允许开发者根据具体案例选择更加易读的风格。
