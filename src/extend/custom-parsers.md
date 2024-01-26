---
title: 自定义解析器
eleventyNavigation:
    key: custom parsers
    parent: extend eslint
    title: 创建自定义解析器
    order: 5
---

ESLint 自定义解析器用于扩展 ESLint，以支持检查代码中新的非标准 JavaScript 语言功能或自定义语法。解析器负责提取代码并将其转换为抽象语法树（AST），ESLint 可对其进行分析和检查。

## 创建自定义解析器

### 自定义解析器中的方法

自定义解析器是一个 JavaScript 对象，带有 `parse` 或 `parseForESLint` 方法。`parse` 方法只返回 AST，而 `parseForESLint` 方法还会返回附加属性，让解析器能更多地自定义 ESLint 的行为。

这两种方法的第一个参数都是源代码，第二个参数是可选的配置对象，配置对象在配置文件中以 [`parserOptions`](../use/configure/language-options#指定解析器选项) 的形式提供。

```javascript
// customParser.js

const espree = require("espree");

// Logs the duration it takes to parse each file.
function parse(code, options) {
    const label = `Parsing file "${options.filePath}"`;
    console.time(label);
    const ast = espree.parse(code, options);
    console.timeEnd(label);
    return ast; // Only the AST is returned.
};

module.exports = { parse };
```

### `parse` 返回对象

`parse` 方法应该简单地返回 [AST](#ast-规范) 对象。

### `parseForESLint` 返回对象

`parseForESLint` 方法应该返回一个包括所需的 `ast` 属性和可选的 `services`、`scopeManager` 和 `visitorKeys` 属性。

* `ast` 应该包含 [AST](#ast-规范) 对象。
* `services` 可以包含任何依赖于解析器的服务（例如节点的类型检查器）。`services` 属性的值可以作为 `context.sourceCode.parserServices` 传递给规则。默认为空对象。
* `scopeManager` 可以是 [ScopeManager](./scope-manager-interface) 对象。自定义解析器可以为实验性/增强性语法提供自定义范围分析。默认使用 [eslint-scope](https://github.com/eslint/eslint-scope) 创建的 `ScopeManager` 对象。
    * 在 ESLint v4.14.0 中加入了对 `scopeManager` 的支持。支持 `scopeManager` 的 ESLint 版本将在 `parserOptions` 中提供 `eslintScopeManager: true` 属性，可用于特征检测。
* `visitorKeys` 可以是自定义 AST 遍历的对象。该对象的键是 AST 节点的类型。每个值是一个应该被遍历的属性名称的数组。默认为 [`eslint-visitor-keys` 的键](https://github.com/eslint/eslint-visitor-keys#evkkeys)。
    * 在 ESLint v4.14.0 中加入了对 `visitorKeys` 的支持。支持 `visitorKeys` 的 ESLint 版本将在 `parserOptions` 中提供 `eslintVisitorKeys: true` 属性，它可以用作特征检测。

### 自定义解析器中的元数据

为了更容易调试和更有效地缓存自定义解析器，建议在自定义解析器的根提供包含名称和版本的 `meta` 对象，如下所示：

```js
// preferred location of name and version
module.exports = {
    meta: {
        name: "eslint-parser-custom",
        version: "1.2.3"
    }
};
```

`meta.name` 属性应与你的自定义解析器的 npm 包名称匹配，而 `meta.version` 属性应与你的自定义解析器的 npm 包版本匹配。最简单的方法是从你的 `package.json` 中读取这些信息。

## AST 规范

自定义解析器创建的 AST 需要基于 [ESTree](https://github.com/estree/estree)。AST 还需要包括一些关于源码细节信息的额外属性。

### 所有节点

所有节点必须要有 `range` 属性。

* `range`（`number[]`）是一个由两个数字组成的数组。这两个数字都是基于 0 的索引，表示源代码字符数组中的位置。第一个是节点的起始位置，第二个是节点的结束位置。`code.slice(node.range[0], node.range[1])` 必须是该节点的文本。这个范围不包括节点周围的空格/括号。
* `loc` (`SourceLocation`) 不能是 `null`。[ESTree](https://github.com/estree/estree/blob/25834f7247d44d3156030f8e8a2d07644d771fdb/es5.md#node-objects) 将 `loc` 属性定义为 nullable，但 ESLint 需要这个属性。另一方面 `SourceLocation#source` 属性也可以是 `undefined`。ESLint 不使用 `SourceLocation#source` 属性。

所有节点的 `parent` 属性必须可覆写。ESLint 在遍历时会在任何规则访问 AST 前，将每个节点的 `parent` 属性设置为其父节点。

### `Program` 节点

`Program` 节点必须要有 `tokens` 和 `comments` 属性。这两个属性都是 Token 接口下的一个数组：

```ts
interface Token {
    type: string;
    loc: SourceLocation;
    range: [number, number];
    // 参见“所有节点”部分，了解 `range` 属性的细节。
    value: string;
}
```

* `tokens`（`Token[]`）是影响程序行为的令牌阵列。令牌之间可能存在任意的空间，所以规则会检查 `Token#range` 以检测令牌之间的空间。这必须按 `Token#range[0]` 进行排序。
* `comments`（`Token[]`）是评论标记的阵列。这必须按 `Token#range[0]` 排序。

所有标记和评论的范围索引必须不与其他标记和评论的范围重叠。

### `Literal` 节点

`Literal` 节点必须要有 `raw` 属性。

* `raw`（`string`）是这个字面的源代码。这与 `code.slice(node.range[0], node.range[1])` 相同。

## 打包自定义解析器

要将自定义解析器发布到 npm，请执行以下操作：

1. 按照上述[创建自定义分析程序](#创建自定义解析器)部分创建自定义解析器。
1. [给自定义解析器创建 npm 包](https://docs.npmjs.com/creating-node-js-modules)。
1. 在 `package.json` 文件中，将 [`main`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#main) 字段设置为导出自定义解析器的文件。
1. [发布 npm 软件包。](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)

有关发布 npm 软件包的更多信息，请参阅 [npm 文档](https://docs.npmjs.com/)。

发布 npm 软件包后，将软件包添加到项目中即可使用。例如

```shell
npm install eslint-parser-myparser --save-dev
```

然后使用 `parser` 属性将自定义分析程序添加到 ESLint 配置文件中。例如：

```js
// .eslintrc.js

module.exports = {
  parser: 'eslint-parser-myparser',
  // ... rest of configuration
};
```

了解更多在项目中使用 ESLint 解析器的信息，请参见[配置解析器](../use/configure/parser)。

## 示例

有关自定义解析器的复杂示例，请参阅 [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser) 源代码。

为规则提供 `context.sourceCode.parserServices.foo()` 方法的简单自定义解析器。

```javascript
// awesome-custom-parser.js
var espree = require("espree");
function parseForESLint(code, options) {
    return {
        ast: espree.parse(code, options),
        services: {
            foo: function() {
                console.log("foo");
            }
        },
        scopeManager: null,
        visitorKeys: null
    };
};

module.exports = { parseForESLint };
```

在 ESLint 配置文件中包括自定义解析器：

```js
// .eslintrc.json
{
    "parser": "./path/to/awesome-custom-parser.js"
}
```
