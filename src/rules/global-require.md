---
title: global-require
rule_type: suggestion
---

此规则于 ESLint v7.0.0 中废弃，请使用 [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n) 中的对应规则代替。

在 Node.js 中，模块的依赖性是使用 `require()` 函数包含的，例如：

```js
var fs = require("fs");
```

虽然 `require()` 可以在代码的任何地方调用，但一些风格指南规定，它应该只在模块的顶层调用，以使其更容易识别依赖关系。例如，当依赖关系被深深地嵌套在函数和其他语句中时，可以说很难识别它们。

```js
function foo() {
    if (condition) {
        var fs = require("fs");
    }
}
```

由于 `require()` 做的是同步加载，所以在其他地方使用时可能会导致性能问题。

此外，ES6 模块规定 `import` 和 `export` 语句只能出现在模块主体的顶层。

## 规则细节

这个规则要求所有对 `require()` 的调用都在模块的顶层，类似于 ES6 的 `import` 和 `export` 语句，也只能在顶层出现。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint global-require: "error"*/
/*eslint-env es6*/

// calling require() inside of a function is not allowed
function readFile(filename, callback) {
    var fs = require("fs");
    fs.readFile(filename, callback);
}

// conditional requires like this are also not allowed
if (DEBUG) {
    require("debug");
}

// a require() in a switch statement is also flagged
switch (x) {
    case "1":
        require("1");
        break;
}

// you may not require() inside an arrow function body
var getModule = (name) => require(name);

// you may not require() inside of a function body as well
function getModule(name) {
    return require(name);
}

// you may not require() inside of a try/catch block
try {
    require(unsafeModule);
} catch (e) {
    console.log(e);
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint global-require: "error"*/

// all these variations of require() are ok
require("x");
var y = require("y");
var z;
z = require("z").initialize();

// requiring a module and using it in a function is ok
var fs = require("fs");
function readFile(filename, callback) {
    fs.readFile(filename, callback);
}

// you can use a ternary to determine which module to require
var logger = DEBUG ? require("dev-logger") : require("logger");

// if you want you can require() at the end of your module
function doSomethingA() {}
function doSomethingB() {}
var x = require("x"),
    z = require("z");
```

:::

## 何时不用

如果你有一个模块必须用来自文件系统的信息进行初始化，或者一个模块只在非常罕见的情况下使用，并且会导致大量的加载开销，那么禁用这个规则可能是有意义的。如果你需要在 `try`/`catch` 中  `require()` 依赖，你可以使用 `// eslint-disable-line global-require` 注释为该依赖关系禁用这个规则。
