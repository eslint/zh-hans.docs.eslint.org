---
title: valid-jsdoc
layout: doc
rule_type: suggestion
related_rules:
- require-jsdoc
further_reading:
- https://jsdoc.app
---

这个规则在 ESLint v5.10.0 中[**废弃**](https://eslint.org/blog/2018/11/jsdoc-end-of-life)。

[JSDoc](http://usejsdoc.org) 从 JavaScript 代码中特殊格式的注释中生成应用程序编程接口（API）文档。例如，这是一个函数的 JSDoc 注释。

```js
/**
 * Add two numbers.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}
```

如果注释因为错别字而失效，那么文档将是不完整的。

如果注释是不一致的，因为当函数定义被修改时，它们没有被更新，那么读者可能会感到困惑。

## 规则细节

该规则执行有效和一致的 JSDoc 注释。它报告以下任何问题。

* 缺少参数标签：`@arg`、`@argument` 或 `@param`。
* 与函数或方法相比，注释中的参数名称顺序不一致
* 缺少返回标签：`@return` 或 `@returns`。
* 缺少参数或返回类型
* 缺少参数或返回的描述
* 语法错误

本规则不报告类、函数或方法的 JSDoc 注释缺失。

**注意**：该规则不支持 Google Closure 文档工具的所有用例。因此，一些代码如 `(/**number*/ n => n * 2);` 会被标记成缺少适当的函数 JSDoc 注释，尽管 `/**number*/` 旨在成为一个类型提示而不是一个函数的文档块。如果你以这种方式使用类型提示，我们不建议使用这个规则。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint valid-jsdoc: "error"*/

// expected @param tag for parameter num1 but found num instead
// missing @param tag for parameter num2
// missing return type
/**
 * Add two numbers.
 * @param {number} num The first number.
 * @returns The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}

// missing brace
// missing @returns tag
/**
 * @param {string name Whom to greet.
 */
function greet(name) {
    console.log("Hello " + name);
}

// missing parameter type for num1
// missing parameter description for num2
/**
 * Represents a sum.
 * @constructor
 * @param num1 The first number.
 * @param {number} num2
 */
function sum(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint valid-jsdoc: "error"*/
/*eslint-env es6*/

/**
 * Add two numbers.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}

// default options allow missing function description
// return type `void` means the function has no `return` statement
/**
 * @param {string} name Whom to greet.
 * @returns {void}
 */
function greet(name) {
    console.log("Hello " + name);
}

// @constructor tag allows missing @returns tag
/**
 * Represents a sum.
 * @constructor
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 */
function sum(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
}

// class constructor allows missing @returns tag
/**
 * Represents a sum.
 */
class Sum {
    /**
     * @param {number} num1 The first number.
     * @param {number} num2 The second number.
     */
    constructor(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
}

// @abstract tag allows @returns tag without `return` statement
class Widget {
    /**
    * When the state changes, does it affect the rendered appearance?
    * @abstract
    * @param {Object} state The new state of the widget.
    * @returns {boolean} Is current appearance inconsistent with new state?
    */
    mustRender (state) {
        throw new Error("Widget subclass did not implement mustRender");
    }
}

// @override tag allows missing @param and @returns tags
class WonderfulWidget extends Widget {
    /**
     * @override
     */
    mustRender (state) {
        return state !== this.state; // shallow comparison
    }
}
```

:::

## 选项

此规则选项为对象：

* `"prefer"` 执行一致的文档标签，由一个对象指定，其属性意味着用值代替键（如 `"return": "returns"` 意味着用 `@return` 代替`@returns`)
* `"preferType"` 强制执行一致的类型字符串，该对象的属性意味着使用值而不是键（如 `"object": "Object"` 意味着使用 `Object` 代替`object`）
* `"requireReturn"` 需要有返回标签：
    * `true`（默认值）**即使**函数或方法没有`return` 语句（该选项值不适用于构造函数）
    * `false` **当且仅当**函数或方法使用 `return` 语句或返回一个值，例如 `async` 函数（此选项值适用于构造函数）
* `"requireReturnType": false` 允许在返回标签中缺少类型。
* `"matchDescription"`指定（作为一个字符串）一个正则表达式来匹配每个 JSDoc 注释中的描述（如 `".+"` 需要一个描述；这个选项不适用于参数或返回标签中的描述）
* `"requireParamDescription": false` 允许参数标签中缺少描述
* `"requireReturnDescription": false` 允许在返回标签中缺少描述
* `"requireParamType": false` 允许在参数标签中缺失类型。

### prefer

使用此规则与示例的 `"prefer": { "arg": "param", "argument": "param", "class": "constructor", "return": "returns", "virtual": "abstract" }` 选项的额外**错误**示例：
::: incorrect

```js
/*eslint valid-jsdoc: ["error", { "prefer": { "arg": "param", "argument": "param", "class": "constructor", "return": "returns", "virtual": "abstract" } }]*/
/*eslint-env es6*/

/**
 * Add two numbers.
 * @arg {int} num1 The first number.
 * @arg {int} num2 The second number.
 * @return {int} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}

/**
 * Represents a sum.
 * @class
 * @argument {number} num1 The first number.
 * @argument {number} num2 The second number.
 */
function sum(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
}

class Widget {
    /**
     * When the state changes, does it affect the rendered appearance?
     * @virtual
     * @argument {Object} state The new state of the widget.
     * @return {boolean} Is current appearance inconsistent with new state?
     */
    mustRender (state) {
        throw new Error("Widget subclass did not implement mustRender");
    }
}
```

:::

### preferType

使用此规则与示例的 `"preferType": { "Boolean": "boolean", "Number": "number", "object": "Object", "String": "string" }` 选项的额外**错误**示例：

::: incorrect

```js
/*eslint valid-jsdoc: ["error", { "preferType": { "Boolean": "boolean", "Number": "number", "object": "Object", "String": "string" } }]*/
/*eslint-env es6*/

/**
 * Add two numbers.
 * @param {Number} num1 The first number.
 * @param {Number} num2 The second number.
 * @returns {Number} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}

/**
 * Output a greeting as a side effect.
 * @param {String} name Whom to greet.
 * @returns {void}
 */
function greet(name) {
    console.log("Hello " + name);
}

class Widget {
    /**
     * When the state changes, does it affect the rendered appearance?
     * @abstract
     * @param {object} state The new state of the widget.
     * @returns {Boolean} Is current appearance inconsistent with new state?
     */
    mustRender (state) {
        throw new Error("Widget subclass did not implement mustRender");
    }
}
```

:::

### requireReturn

使用此规则与 `"requireReturn": false` 选项的的额外**错误**示例：

::: incorrect

```js
/*eslint valid-jsdoc: ["error", { "requireReturn": false }]*/

// unexpected @returns tag because function has no `return` statement
/**
 * @param {string} name Whom to greet.
 * @returns {string} The greeting.
 */
function greet(name) {
    console.log("Hello " + name);
}

// add @abstract tag to allow @returns tag without `return` statement
class Widget {
    /**
     * When the state changes, does it affect the rendered appearance?
     * @param {Object} state The new state of the widget.
     * @returns {boolean} Is current appearance inconsistent with new state?
     */
    mustRender (state) {
        throw new Error("Widget subclass did not implement mustRender");
    }
}
```

:::

使用此规则与 `"requireReturn": false` 选项的的额外**正确**示例：

::: correct

```js
/*eslint valid-jsdoc: ["error", { "requireReturn": false }]*/

/**
 * @param {string} name Whom to greet.
 */
function greet(name) {
    console.log("Hello " + name);
}
```

:::

### requireReturnType

使用此规则与 `"requireReturnType": false` 选项的的额外**正确**示例：

::: correct

```js
/*eslint valid-jsdoc: ["error", { "requireReturnType": false }]*/

/**
 * Add two numbers.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}
```

:::

### requireParamType

使用此规则与 `"requireParamType": false` 选项的额外**正确**示例：
::: correct

```js
/*eslint valid-jsdoc: ["error", { "requireParamType": false }]*/

/**
 * Add two numbers.
 * @param num1 The first number.
 * @param num2 The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}
```

:::

### matchDescription

使用此规则与示例的 `"matchDescription": ".+"` 选项的额外**错误**示例：

::: incorrect

```js
/*eslint valid-jsdoc: ["error", { "matchDescription": ".+" }]*/

// missing function description
/**
 * @param {string} name Whom to greet.
 * @returns {void}
 */
function greet(name) {
    console.log("Hello " + name);
}
```

:::

### requireParamDescription

使用此规则与 `"requireParamDescription": false` 选项的额外**正确**示例：
::: correct

```js
/*eslint valid-jsdoc: ["error", { "requireParamDescription": false }]*/

/**
 * Add two numbers.
 * @param {int} num1
 * @param {int} num2
 * @returns {int} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}
```

:::

### requireReturnDescription

使用此规则与 `"requireReturnDescription": false` 选项的额外**正确**示例：

::: correct

```js
/*eslint valid-jsdoc: ["error", { "requireReturnDescription": false }]*/

/**
 * Add two numbers.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns {number}
 */
function add(num1, num2) {
    return num1 + num2;
}
```

:::

## 何时不用

如果你不使用 JSDoc，那么你可以安全地关闭这个规则。
