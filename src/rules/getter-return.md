---
title: getter-return
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/getter-return.md
rule_type: problem
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
- https://leanpub.com/understandinges6/read/#leanpub-auto-accessor-properties
---

get 语法将一个对象属性绑定到一个函数上，当该属性被查询时将会被调用。它在 ECMAScript 5 中首次引入。

```js
var p = {
    get name(){
        return "nicholas";
    }
};

Object.defineProperty(p, "age", {
    get: function (){
        return 17;
    }
});
```

请注意，每个 `getter` 都应该返回值。

## 规则细节

这条规则强制要求属性获取器中要有返回语句。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint getter-return: "error"*/

p = {
    get name(){
        // no returns.
    }
};

Object.defineProperty(p, "age", {
    get: function (){
        // no returns.
    }
});

class P{
    get name(){
        // no returns.
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint getter-return: "error"*/

p = {
    get name(){
        return "nicholas";
    }
};

Object.defineProperty(p, "age", {
    get: function (){
        return 18;
    }
});

class P{
    get name(){
        return "nicholas";
    }
}
```

:::

## 选项

此规则选项为对象：

* `"allowImplicit": false`（默认值）不允许用 `return` 语句隐式返回 `undefined`。

使用 `{ "allowImplicit": true }` 选项的**正确**示例：

::: correct

```js
/*eslint getter-return: ["error", { allowImplicit: true }]*/
p = {
    get name(){
        return; // return undefined implicitly.
    }
};
```

:::

## 何时不用

如果你的项目不使用 ES5 属性获取器，你就不需要这个规则。
