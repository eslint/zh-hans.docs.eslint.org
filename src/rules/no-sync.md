---
title: no-sync
rule_type: suggestion
---

此规则于 ESLint v7.0.0 中废弃，请使用 [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n) 中的对应规则代替。

在 Node.js 中，大多数 I/O 是通过异步方法完成的。然而，异步方法往往有同步版本。例如，`fs.exists()` 和 `fs.existsSync()`。在某些情况下，使用同步操作是可以的（如果像 ESLint 那样，你正在编写一个命令行工具）。然而，在其他情况下，使用同步操作被认为是一种不好的做法，应该避免。例如，如果你在 Node.js 上运行一个高流量的网络服务器，你应该仔细考虑是否要允许任何可能锁定服务器的同步操作。

## 规则细节

这条规则的目的是防止 Node.js 中的同步方法被调用。它特别寻找方法的后缀“`Sync`”（这是 Node.js 操作的惯例）。

## 选项

该规则有一个可选的对象选项 `{ allowAtRootLevel: <boolean> }`，它决定是否允许在文件的顶层，在任何函数之外使用同步方法。这个选项的默认值是 `false`。

使用此规则与默认的 `{ allowAtRootLevel: false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-sync: "error"*/

fs.existsSync(somePath);

function foo() {
  var contents = fs.readFileSync(somePath).toString();
}
```

:::

使用此规则与默认的 `{ allowAtRootLevel: false }` 选项的**正确**示例：

::: correct

```js
/*eslint no-sync: "error"*/

obj.sync();

async(function() {
    // ...
});
```

:::

使用此规则与 `{ allowAtRootLevel: true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-sync: ["error", { allowAtRootLevel: true }]*/

function foo() {
  var contents = fs.readFileSync(somePath).toString();
}

var bar = baz => fs.readFileSync(qux);
```

:::

使用此规则与 `{ allowAtRootLevel: true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-sync: ["error", { allowAtRootLevel: true }]*/

fs.readFileSync(somePath).toString();
```

:::

## 何时不用

如果你想在你的脚本中允许同步操作，不要启用这个规则。
