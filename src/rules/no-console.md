---
title: no-console
layout: doc
rule_type: suggestion
related_rules:
- no-alert
- no-debugger
---

在设计面向在浏览器中执行的 JavaScript 中，要尽可能避免使用 `console` 方法。此信息一般用于调试，因此不适合运送到客户端。一般来说，在推送到生产环境前应该剥离使用 `console`。

```js
console.log("Made it here.");
console.error("That shouldn't have happened.");
```

## 规则细节

这条规则不允许对 `console` 对象的方法进行调用或赋值。

使用此规则的**错误**示例：

::: incorrect

```js
/* eslint no-console: "error" */

console.log("Log a debug level message.");
console.warn("Log a warn level message.");
console.error("Log an error level message.");
console.log = foo();
```

:::

使用此规则的**正确**示例：

::: correct

```js
/* eslint no-console: "error" */

// custom console
Console.log("Hello world!");
```

:::

## 选项

这条规则有例外情况的对象选项：

* `"allow"` 是字符串数组，值为允许使用 `console` 方法的对象

使用此规则与额外的 `{ "allow": ["warn", "error"] }` 选项的**正确**示例：

::: correct

```js
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

console.warn("Log a warn level message.");
console.error("Log an error level message.");
```

:::

## 何时不用

然而，如果你使用的是 Node.js，`console` 是用来向用户输出信息的，所以并不严格用于调试目的。如果你开发 Node.js 相关内容，那么你很可能不希望启用这一规则。

另一种情况是，如果你想执行控制台调用，而不是控制台覆盖，你可能不会使用这条规则。比如：

```js
/* eslint no-console: ["error", { allow: ["warn"] }] */
console.error = function (message) {
  throw new Error(message);
};
```

在上例中使用 `no-console` 规则，ESLint 将报告错误。上面的示例中你可以禁用该规则:

```js
// eslint-disable-next-line no-console
console.error = function (message) {
  throw new Error(message);
};

// 或

console.error = function (message) {  // eslint-disable-line no-console
  throw new Error(message);
};
```

然而，你可能不想手动添加 `eslint-disable-next-line` 或 `eslint-disable-line`。你可以通过 `no-restricted-syntax` 规则达到只接收控制台调用错误的效果：

```json
{
    "rules": {
        "no-console": "off",
        "no-restricted-syntax": [
            "error",
            {
                "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
                "message": "Unexpected property on console object was called"
            }
        ]
    }
}
```
