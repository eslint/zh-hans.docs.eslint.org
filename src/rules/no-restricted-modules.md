---
title: no-restricted-modules
layout: doc
rule_type: suggestion
---

此规则于 ESLint v7.0.0 中废弃，请使用 [`eslint-plugin-node`](https://github.com/mysticatea/eslint-plugin-node) 中的对应规则代替。

Node.js 中的模块是一个简单或复杂的功能，组织在一个 JavaScript 文件中，可以在整个 Node.js 中重复使用
应用中重复使用。关键字 `require` 在 Node.js/CommonJS 中用于将模块导入到应用程序中。这样，你可以有动态加载，其中加载的模块名称不是预定义的/静态的，或者只在“真正需要时”加载一个模块。

你为什么要限制一个模块？

如果你想限制开发人员可以使用的方法，不允许使用特定的 Node.js 模块会很有用。例如，如果你想禁止文件系统访问，你可以阻止使用 `fs` 模块。

## 规则细节

这个规则允许你指定你不想在你的应用程序中使用的模块。

## 选项

规则需要一个或多个字符串作为选项s：限制性模块的名称。

```json
"no-restricted-modules": ["error", "foo-module", "bar-module"]
```

它也可以接受一个包含  `paths` 和gitignore风格的 `patterns` 字符串列表的对象。

```json
"no-restricted-modules": ["error", { "paths": ["foo-module", "bar-module"] }]
```

```json
"no-restricted-modules": ["error", {
    "paths": ["foo-module", "bar-module"],
    "patterns": ["foo-module/private/*", "bar-module/*","!baz-module/good"]
}]
```

你也可以为你想限制的任何路径指定一个自定义信息，如下所示：

```json
"no-restricted-modules": ["error", {
  "name": "foo-module",
  "message": "Please use bar-module instead."
  }
]
```

or like this:

```json
"no-restricted-modules": ["error",{
"paths":[{
  "name": "foo-module",
  "message": "Please use bar-module instead."
  }]
}]
```

自定义信息将被附加到默认的错误信息中。请注意，你不能为限制的模式指定自定义错误信息，因为一个特定的模块可能匹配多个模式。

要限制所有 Node.js 核心模块的使用（通过 <https://github.com/nodejs/node/tree/master/lib>）：

```json
{
    "no-restricted-modules": ["error",
        "assert","buffer","child_process","cluster","crypto","dgram","dns","domain","events","freelist","fs","http","https","module","net","os","path","punycode","querystring","readline","repl","smalloc","stream","string_decoder","sys","timers","tls","tracing","tty","url","util","vm","zlib"
    ]
}
```

## 示例

使用此规则并限制使用 `"fs"、"cluster"、"lodash"` 模块的**错误**示例：

::: incorrect

```js
/*eslint no-restricted-modules: ["error", "fs", "cluster"]*/

var fs = require('fs');
var cluster = require('cluster');
```

:::

::: incorrect

```js
/*eslint no-restricted-modules: ["error", {"paths": ["cluster"] }]*/

var cluster = require('cluster');
```

:::

::: incorrect

```js
/*eslint no-restricted-modules: ["error", { "patterns": ["lodash/*"] }]*/

var pick = require('lodash/pick');
```

:::

使用此规则并限制使用 `"fs"、"cluster"、"lodash"` 模块的**正确**示例：

::: correct

```js
/*eslint no-restricted-modules: ["error", "fs", "cluster"]*/

var crypto = require('crypto');
```

:::

::: correct

```js
/*eslint no-restricted-modules: ["error", {
    "paths": ["fs", "cluster"],
    "patterns": ["lodash/*", "!lodash/pick"]
}]*/

var crypto = require('crypto');
var pick = require('lodash/pick');
```

:::
