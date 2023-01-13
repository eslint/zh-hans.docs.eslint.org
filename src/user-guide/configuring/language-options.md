---
title: 语言选项
eleventyNavigation:
    key: configuring language options
    parent: configuring
    title: 配置语言选项
    order: 2

---

JavaScript 生态中有多个运行时、版本、扩展和框架。每个所支持的语法和全局变量都不尽相同。ESLint 会让你指定项目中 JavaScript 所使用的语言选项。你也可以在项目中使用插件扩展 ESLint 支持的语言选项。

## 指定环境

环境会提供预设的全局变量。可用的环境有：

* `browser` - 浏览器全局变量。
* `node` - Node.js 的全局变量和 Node.js 的范围。
* `commonjs` - CommonJS 全局变量和 CommonJS 范围（用于使用 Browserify/WebPack 的纯浏览器代码）。
* `shared-node-browser` - Node.js 和浏览器共同的全局变量。
* `es6` - 启用除模块之外的所有 ECMAScript 6 功能（这会自动将解析器设置为 6）。
* `es2016` - 添加所有 ECMAScript 2016 的全局变量，并自动将解析器选项 `ecmaVersion` 设置为 7。
* `es2017` - 添加所有 ECMAScript 2017 的全局变量，并自动将解析器选项 `ecmaVersion` 设置为 8。
* `es2018` - 添加所有 ECMAScript 2018 的全局变量，并自动将解析器选项 `ecmaVersion` 设置为 9。
* `es2019` - 添加所有 ECMAScript 2019 的全局变量，并自动将解析器选项 `ecmaVersion` 设置为 10。
* `es2020` - 添加所有 ECMAScript 2020 的全局变量，并自动将解析器选项 `ecmaVersion` 设置为 11。
* `es2021` - 添加所有 ECMAScript 2021 的全局变量，并自动将解析器选项 `ecmaVersion` 设置为 12。
* `es2022` - 添加所有 ECMAScript 2022 的全局变量，并自动将解析器选项 `ecmaVersion` 设置为 13。
* `worker` - 网络工作者全局变量。
* `amd` - 根据 [amd](https://github.com/amdjs/amdjs-api/wiki/AMD) 规范，将 `require()` 和 `define()` 定义为全局变量。
* `mocha` - 添加所有 Mocha 测试的全局变量。
* `jasmine` - 添加 1.3 和 2.0 版本的所有 Jasmine 测试全局变量。
* `jest` - Jest 全局变量。
* `phantomjs` - PhantomJS 全局变量。
* `protractor` - Protractor 全局变量。
* `qunit` - QUnit 全局变量。
* `jquery` - jQuery 全局变量。
* `prototypejs` - Prototype.js 全局变量。
* `shelljs` - ShellJS 全局变量。
* `meteor` - Meteor 全局变量。
* `mongo` - MongoDB 全局变量。
* `applescript` - AppleScript 全局变量。
* `nashorn` - Java 8 Nashorn 全局变量。
* `serviceworker` - Service Worker 全局变量。
* `atomtest` - Atom 测试帮助器全局变量。
* `embertest` - Ember 测试助手的全局变量
* `webextensions` - WebExtensions 全局变量。
* `greasemonkey` - GreaseMonkey 全局变量。

这些环境并不互斥，所以你可以一次定义多个环境。

可以用配置文件中或 `--env` [command line](../command-line-interface) 标志指定环境。

### 使用配置注释

要在 JavaScript 文件中使用注释来指定环境，请使用以下格式：

```js
/* eslint-env node, mocha */
```

这启用了 Node.js 和 Mocha 环境。

### 使用配置文件

在配置文件中使用 `env` 键指定环境，并通过将每个环境设置为 `true` 来启用想要的环境。例如，下面是启用浏览器和 Node.js 环境的例子：

```json
{
    "env": {
        "browser": true,
        "node": true
    }
}
```

或者在 `package.json` 文件中：

```json
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "env": {
            "browser": true,
            "node": true
        }
    }
}
```

或者在 YAM 中L:

```yaml
---
  env:
    browser: true
    node: true
```

### 使用插件

如果你想使用插件中的环境，一定要在 `plugins` 数组中指定插件的名称，然后使用没有前缀的插件名称，后面加一个斜线，最后再加上环境名称。比如说：

```json
{
    "plugins": ["example"],
    "env": {
        "example/custom": true
    }
}
```

或者在 `package.json` 文件中

```json
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "plugins": ["example"],
        "env": {
            "example/custom": true
        }
    }
}
```

## 指定全局变量

ESLint 的一些核心规则依赖于对你的代码在运行时可用的全局变量的了解。由于这些变量在不同的环境中会有很大的不同，而且在运行时也会被修改，因此 ESLint 不会对你的执行环境中存在的全局变量进行假设。如果你想使用需要知道有哪些全局变量的规则，你可以在你的配置文件中定义全局变量，或者在你的源代码中使用配置注释。

### 使用配置注释

要在你的 JavaScript 文件中使用注释来指定全局变量，请使用以下格式：

```js
/* global var1, var2 */
```

这定义了两个全局变量 `var1` 和 `var2`。如果你想选择性地指定这些全局变量可以被写入（而不是只能被读取），那么你可以在每个变量上设置 `"writable"` 标志。

```js
/* global var1:writable, var2:writable */
```

### 使用配置文件

要在配置文件中配置全局变量，请将 `globals` 配置属性设置成对象，其中包含为你要使用的每个全局变量命名的键。对于每个全局变量的键，将相应的值设置为 `"writable"` 以允许变量被覆盖，或者 `"readonly"` 以禁止覆盖。例如：

```json
{
    "globals": {
        "var1": "writable",
        "var2": "readonly"
    }
}
```

And in YAML:

```yaml
---
  globals:
    var1: writable
    var2: readonly
```

该例子允许在代码中覆盖 `var1`，但不允许覆盖 `var2`。

可以将它们的值设置为字符串 `"off"` 来禁用全局变量。例如，在一个环境中，可以使用大多数 ES2015 全局变量，但不可以使用 `Promise`，那么你就可以使用这个配置：

```json
{
    "env": {
        "es6": true
    },
    "globals": {
        "Promise": "off"
    }
}
```

由于历史原因，布尔值 `false` 和字符串值 `"readable"` 等同于 `"readonly"`。同样地，布尔值 `true` 和字符串`"writeable"` 等同于 `"writable"`。然而，旧值已经废弃了。

## 指定解析器选项

ESLint 允许你指定你想要支持的 JavaScript 语言选项。默认情况下，ESLint 希望使用 ECMAScript 5 语法。你可以通过使用解析器选项来覆盖这一设置，以实现对其他 ECMAScript 版本以及 JSX 的支持。

请注意，支持 JSX 语法并不等同于支持 React。React 对 JSX 语法应用了特定的语义，而 ESLint 并不能识别。如果你使用 React 并且使用 React 语法，我们建议使用 [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)。
同样地，支持 ES6 语法不等于支持新的 ES6 全局变量（例如，新的类型，如 `Set`）。使用 `{ "parserOptions": { "ecmaVersion": 6 } }` 启用 ES6 语法；使用 `{ "env": { "es6": true } }` 启用新的 ES6 全局变量，设置 `{ "env": { "es6": true }}` 会自动启用 ES6 语法，但 `{ "parserOptions": { "ecmaVersion": 6 } }` 则不会自动启用 ES6 全局变量。

可以在 `.eslintrc.*` 文件中通过使用 `parserOptions` 属性设置解析器选项。可用选项有：

* `ecmaVersion`  - 设置为 3、5（默认）、6、7、8、9、10、11、12 或 13，以指定你要使用的 ECMAScript 语法的版本。你也可以设置为 2015（6）、2016（7）、2017（8）、2018（9）、2019（10）、2020（11）、2021（12）或 2022（13）来使用基于年份的命名。你也可以设置 `"latest"` 来使用受支持的最新版本。
* `sourceType` - 设置为 `"script"`（默认值）或 `"module"`（如果代码是 ECMAScript 模块）。
* `allowReserved` - 允许使用保留字作为标识符（如果 `ecmaVersion` 为 3）。
* `ecmaFeatures` - 表示你想使用哪些额外的语言特性的对象。
    * `globalReturn` - 允许全局范围内的 `return` 语句
    * `impliedStrict` - 启用全局[严格模式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)（如果 `ecmaVersion` 是 5 或更高版本）
    * `jsx` - 启用 [JSX](https://facebook.github.io/jsx/)

`.eslintrc.json` 文件示例：

```json
{
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": "error"
    }
}
```

设置解析器选项有助于 ESLint 确定解析错误是什么。所有的语言选项默认为 `false`。
