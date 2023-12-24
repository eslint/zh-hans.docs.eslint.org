---
title: no-promise-executor-return
rule_type: problem
related_rules:
- no-async-promise-executor
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
---

`new Promise` 构造函数接受一个参数，称为**执行器**。

```js
const myPromise = new Promise(function executor(resolve, reject) {
    readFile('foo.txt', function(err, result) {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});
```

执行器函数通常启动一些异步操作。一旦完成，执行器应该用结果调用 `resolve`，如果发生错误，则调用 `reject`。

执行器的返回值被忽略。从执行器函数中返回一个值是一个可能的错误，因为返回的值不能被使用，它不会以任何方式影响承诺。

## 规则细节

这条规则不允许从 Promise 执行器函数中返回值。

只允许不带值的 `return`，因为它是一个控制流语句。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-promise-executor-return: "error"*/
/*eslint-env es6*/

new Promise((resolve, reject) => {
    if (someCondition) {
        return defaultResult;
    }
    getSomething((err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

new Promise((resolve, reject) => getSomething((err, data) => {
    if (err) {
        reject(err);
    } else {
        resolve(data);
    }
}));

new Promise(() => {
    return 1;
});
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-promise-executor-return: "error"*/
/*eslint-env es6*/

new Promise((resolve, reject) => {
    if (someCondition) {
        resolve(defaultResult);
        return;
    }
    getSomething((err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

new Promise((resolve, reject) => {
    getSomething((err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

Promise.resolve(1);
```

:::

## 选项

此规则接受选项，一个带有以下属性的对象：

* `allowVoid`：如果设置为 `true`（默认为 `false`），此规则将允许返回 `void` 值。

### allowVoid

使用此规则与 `{ "allowVoid": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-promise-executor-return: ["error", { allowVoid: true }]*/
/*eslint-env es6*/

new Promise((resolve, reject) => {
    if (someCondition) {
        return void resolve(defaultResult);
    }
    getSomething((err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

new Promise((resolve, reject) => void getSomething((err, data) => {
    if (err) {
        reject(err);
    } else {
        resolve(data);
    }
}));
new Promise(r => void r(1));
```

:::
