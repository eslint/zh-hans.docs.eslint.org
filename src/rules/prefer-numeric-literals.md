---
title: prefer-numeric-literals
rule_type: suggestion
---

`parseInt()` 和 `Number.parseInt()` 函数可以用来将二进制、八进制和十六进制的字符串变成整数。由于 ES6 支持二进制、八进制和十六进制字面，本规则鼓励使用这些数字字面而不是 `parseInt()` 或 `Number.parseInt()`。

```js
0b111110111 === 503;
0o767 === 503;
```

## 规则细节

如果调用 `parseInt()` 或 `Number.parseInt()`时有两个参数：一个字符串；以及 2（二进制）、8（八进制）或 16（十六进制）的进制选项，则本规则不允许调用。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint prefer-numeric-literals: "error"*/

parseInt("111110111", 2) === 503;
parseInt(`111110111`, 2) === 503;
parseInt("767", 8) === 503;
parseInt("1F7", 16) === 503;
Number.parseInt("111110111", 2) === 503;
Number.parseInt("767", 8) === 503;
Number.parseInt("1F7", 16) === 503;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint prefer-numeric-literals: "error"*/
/*eslint-env es6*/

parseInt(1);
parseInt(1, 3);
Number.parseInt(1);
Number.parseInt(1, 3);

0b111110111 === 503;
0o767 === 503;
0x1F7 === 503;

a[parseInt](1,2);

parseInt(foo);
parseInt(foo, 2);
Number.parseInt(foo);
Number.parseInt(foo, 2);
```

:::

## 何时不用

如果你想允许对二进制、八进制或十六进制的整数使用 `parseInt()` 或 `Number.parseInt()`，或者你没有使用 ES6（因为 ES5 及以下版本不支持二进制和八进制字面量），你可能希望禁用这一规则。

## 兼容

* **JSCS**：[requireNumericLiterals](https://jscs-dev.github.io/rule/requireNumericLiterals)
