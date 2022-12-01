---
title: require-jsdoc
layout: doc
rule_type: suggestion
related_rules:
- valid-jsdoc
---

此规则在 ESLint v5.10.0 中[**被废弃**](https://eslint.org/blog/2018/11/jsdoc-end-of-life)。

[JSDoc](http://usejsdoc.org) 是一个 JavaScript API 文档生成器。它使用代码中特殊格式的注释来自动生成 API 文档。例如，对于一个函数，JSDoc 的注释是这样的。

```js
/**
 * Adds two numbers together.
 * @param {int} num1 The first number.
 * @param {int} num2 The second number.
 * @returns {int} The sum of the two numbers.
 */
function sum(num1, num2) {
    return num1 + num2;
}
```

一些风格指南要求对所有函数进行 JSDoc 注释，作为解释函数行为的一种方式。

## 规则细节

此规则要求指定节点的 JSDoc 注释。支持的节点有：

* `"FunctionDeclaration"`
* `"ClassDeclaration"`
* `"MethodDefinition"`
* `"ArrowFunctionExpression"`
* `"FunctionExpression"`

## 选项

此规则有一个单一的对象选项：

* `"require"` 要求指定节点的 JSDoc 注释。

默认的选项设置为：

```json
{
    "require-jsdoc": ["error", {
        "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": false,
            "ClassDeclaration": false,
            "ArrowFunctionExpression": false,
            "FunctionExpression": false
        }
    }]
}
```

### require

使用此规则与 `{ "require": { "FunctionDeclaration": true, "MethodDefinition": true, "ClassDeclaration": true, "ArrowFunctionExpression": true, "FunctionExpression": true } }` 选项的**错误**示例：

::: incorrect

```js
/*eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
    }
}]*/

function foo() {
    return 10;
}

var foo = () => {
    return 10;
};

class Foo {
    bar() {
        return 10;
    }
}

var foo = function() {
    return 10;
};

var foo = {
    bar: function() {
        return 10;
    },

    baz() {
        return 10;
    }
};
```

:::

使用此规则与 `{ "require": { "FunctionDeclaration": true, "MethodDefinition": true, "ClassDeclaration": true, "ArrowFunctionExpression": true, "FunctionExpression": true } }` 选项的**正确**示例：

::: correct

```js
/*eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
    }
}]*/

/**
 * It returns 10
 */
function foo() {
    return 10;
}

/**
 * It returns test + 10
 * @params {int} test - some number
 * @returns {int} sum of test and 10
 */
var foo = (test) => {
    return test + 10;
}

/**
 * It returns 10
 */
var foo = () => {
    return 10;
}

/**
 * It returns 10
 */
var foo = function() {
    return 10;
}

var array = [1,2,3];
array.filter(function(item) {
    return item > 2;
});

/**
 * A class that can return the number 10
 */
class Foo {
    /**
    * It returns 10
    */
    bar() {
        return 10;
    }
}

/**
 * It returns 10
 */
var foo = function() {
    return 10;
};

var foo = {
    /**
    * It returns 10
    */
    bar: function() {
        return 10;
    },

    /**
    * It returns 10
    */
    baz() {
        return 10;
    }
};

setTimeout(() => {}, 10); // since it's an anonymous arrow function
```

:::

## 何时不用

如果你的函数不需要 JSDoc，那么你可以不使用这个规则。
