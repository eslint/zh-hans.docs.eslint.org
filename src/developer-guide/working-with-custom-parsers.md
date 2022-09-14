---
title: 使用自定义解析器
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/developer-guide/working-with-custom-parsers.md
eleventyNavigation:
    key: working with custom parsers
    parent: developer guide
    title: 自定义解析器
    order: 7

---

如果你想使用你自己的解析器并为你的规则提供额外的能力，你可以指定你自己的自定义解析器。如果解析器上暴露了一个 `parseForESLint` 方法，这个方法将被用来解析代码。否则，将使用 `parse` 方法。这两个方法都应该接受源代码作为第一个参数，以及一个可选的配置对象作为第二个参数（在配置文件中作为 `parserOptions` 提供）。`parse` 方法应该简单地返回 AST。`parseForESLint` 方法应该返回一个对象，其中包含必需的属性 `ast` 和可选的属性 `services`、`scopeManager`和`visitorKeys`。

* `ast` 应该包含 AST。
* `services` 可以包含任何依赖于解析器的服务（例如节点的类型检查器）。`services` 属性的值可以作为 `context.parserServices` 传递给规则。默认为空对象。
* `scopeManager` 可以是 [ScopeManager](./scope-manager-interface) 对象。自定义解析器可以为实验性/增强性语法提供自定义范围分析。默认是使用 [eslint-scope](https://github.com/eslint/eslint-scope) 创建的`ScopeManager` 对象。
    * 对 `scopeManager` 的支持是在 ESLint v4.14.0 中加入的。支持 `scopeManager` 的 ESLint 版本将在`parserOptions` 中提供 `eslintScopeManager: true` 属性，可用于特征检测。
* `visitorKeys`可以是一个自定义 AST 遍历的对象。该对象的键是 AST 节点的类型。每个值是一个应该被遍历的属性名称的数组。默认为 [`eslint-visitor-keys` 的键](https://github.com/eslint/eslint-visitor-keys#evkkeys)。
    * 在 ESLint v4.14.0 中加入对 `visitorKeys` 对支持。支持 `visitorKeys` 的 ESLint 版本将在`parserOptions` 中提供 `eslintVisitorKeys: true` 属性，它可以用作特征检测。

你可以[在这](https://github.com/typescript-eslint/typescript-eslint)找到 ESLint 解析器项目。

```json
{
    "parser": "./path/to/awesome-custom-parser.js"
}
```

```javascript
var espree = require("espree");
// awesome-custom-parser.js
exports.parseForESLint = function(code, options) {
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

```

## AST 规范

自定义解析器创建的 AST 要基于 [ESTree](https://github.com/estree/estree)。AST 需要包括一些关于源码细节信息的额外属性。

### 所有节点

所有节点必须要有 `range` 属性。

* `range`（`number[]`）是一个由两个数字组成的数组。这两个数字都是基于 0 的索引，是源代码字符数组中的位置。第一个是节点的起始位置，第二个是节点的结束位置。`code.slice(node.range[0], node.range[1])` 必须是该节点的文本。这个范围不包括节点周围的空格/括号。
* `loc` (`SourceLocation`) 不能是 `null`。[ESTree](https://github.com/estree/estree/blob/25834f7247d44d3156030f8e8a2d07644d771fdb/es5.md#node-objects) 将 `loc` 属性定义为 nullable，但 ESLint 需要这个属性。另一方面 `SourceLocation#source` 属性也可以是 `undefined`。ESLint 不使用 `SourceLocation#source` 属性。

所有节点的 `parent` 属性必须可覆写。ESLint 在遍历时会在任何规则访问 AST 前，将每个节点的 `parent` 属性设置为其父节点。

### `Program` 节点

`Program` 节点必须要有 `tokens` 和 `comments` 属性。这两个属性都是 Token 接口下的一个数组：

```ts
interface Token {
    type: string;
    loc: SourceLocation;
    range: [number, number]; // 参见“所有节点”部分，了解“范围”属性的细节。
    value: string;
}
```

* `tokens`（`Token[]`）是影响程序行为的令牌阵列。令牌之间可能存在任意的空间，所以规则检查`Token#range`以检测令牌之间的空间。这必须按`Token#range[0]`进行排序。
* `comments`（`Token[]`）是评论标记的阵列。这必须按 `Token#range[0]` 排序。

所有标记和评论的范围索引必须不与其他标记和评论的范围重叠。

### `Literal` 节点

`Literal` 节点必须要有 `raw` 属性。

* `raw`（`string`）是这个字面的源代码。这与 `code.slice(node.range[0], node.range[1])` 相同。
