---
title: no-restricted-imports
layout: doc
rule_type: suggestion
---

进口是 ES6/ES2015 的标准，用于使其他模块的功能在你当前模块中可用。在 CommonJS 中，这是通过 `require()` 调用实现的，这使得这个 ESLint 规则大致等同于 CommonJS 的 `no-restricted-modules` 对应。

为什么你要限制进口？

* 有些导入可能在特定的环境中没有意义。例如，Node.js 的 `fs` 模块在一个没有文件系统的环境中是没有意义的。

* 有些模块提供类似或相同的功能，想想 `lodash` 和 `underscore`。你的项目可能已经对一个模块进行了标准化。你要确保其他的替代方案没有被使用，因为这将不必要地使项目臃肿，并提供更高的维护成本，因为有一个依赖性就足够了。

## 规则细节

这个规则允许你指定你不想在你的应用程序中使用的导入。

它只适用于静态导入，不适用于动态导入。

## 选项

指定限制性进口的语法看起来像这样：

```json
"no-restricted-imports": ["error", "import1", "import2"]
```

或像这样：

```json
"no-restricted-imports": ["error", { "paths": ["import1", "import2"] }]
```

当使用对象形式时，你也可以指定一个 gitignore 风格的模式数组：

```json
"no-restricted-imports": ["error", {
    "paths": ["import1", "import2"],
    "patterns": ["import1/private/*", "import2/*", "!import2/good"]
}]
```

你也可以为你想限制的任何路径指定一个自定义信息，如下所示：

```json
"no-restricted-imports": ["error", {
    "name": "import-foo",
    "message": "Please use import-bar instead."
}, {
    "name": "import-baz",
    "message": "Please use import-quux instead."
}]
```

或像这样：

```json
"no-restricted-imports": ["error", {
    "paths": [{
        "name": "import-foo",
        "message": "Please use import-bar instead."
    }, {
        "name": "import-baz",
        "message": "Please use import-quux instead."
    }]
}]
```

或像这样，如果你需要限制只从一个模块导入某些东西：

```json
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "import-foo",
    "importNames": ["Bar"],
    "message": "Please use Bar from /import-bar/baz/ instead."
  }]
}]
```

或像这样，如果你想对模式匹配应用一个自定义的信息：

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["import1/private/*"],
      "message": "usage of import1 private modules not allowed."
    }, {
      "group": ["import2/*", "!import2/good"],
      "message": "import2 is deprecated, except the modules in import2/good."
    }]
}]
```

自定义信息将被附加到默认的错误信息中。

模式匹配也可以被配置为大小写敏感的：

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["import1/private/prefix[A-Z]*"],
      "caseSensitive": true
    }]
}]
```

模式匹配可以只限制特定的导入名称，类似于 `paths` 选项：

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["utils/*"],
      "importNames": ["isEmpty"],
      "message": "Use 'isEmpty' from lodash instead."
    }]
}]
```

要限制使用所有 Node.js 的核心导入（通过<https://github.com/nodejs/node/tree/master/lib>）：

```json
    "no-restricted-imports": ["error",
         "assert","buffer","child_process","cluster","crypto","dgram","dns","domain","events","freelist","fs","http","https","module","net","os","path","punycode","querystring","readline","repl","smalloc","stream","string_decoder","sys","timers","tls","tracing","tty","url","util","vm","zlib"
    ],
```

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

import fs from 'fs';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

export { fs } from 'fs';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

export * from 'fs';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { "paths": ["cluster"] }]*/

import cluster from 'cluster';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["lodash/*"] }]*/

import pick from 'lodash/pick';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["default"],
    message: "Please use the default import from '/bar/baz/' instead."
}]}]*/

import DisallowedObject from "foo";
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["DisallowedObject"],
    message: "Please import 'DisallowedObject' from '/bar/baz/' instead."
}]}]*/

import { DisallowedObject } from "foo";

import { DisallowedObject as AllowedObject } from "foo";

import { "DisallowedObject" as AllowedObject } from "foo";
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["DisallowedObject"],
    message: "Please import 'DisallowedObject' from '/bar/baz/' instead."
}]}]*/

import * as Foo from "foo";
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["lodash/*"],
    message: "Please use the default import from 'lodash' instead."
}]}]*/

import pick from 'lodash/pick';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["foo[A-Z]*"],
    caseSensitive: true
}]}]*/

import pick from 'fooBar';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNames: ['isEmpty'],
    message: "Use 'isEmpty' from lodash instead."
}]}]*/

import { isEmpty } from 'utils/collection-utils';
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

import crypto from 'crypto';
export { foo } from "bar";
```

:::

::: correct

```js
/*eslint no-restricted-imports: ["error", { "paths": ["fs"], "patterns": ["eslint/*"] }]*/

import crypto from 'crypto';
import eslint from 'eslint';
export * from "path";
```

:::

::: correct

```js
/*eslint no-restricted-imports: ["error", { paths: [{ name: "foo", importNames: ["DisallowedObject"] }] }]*/

import DisallowedObject from "foo"
```

:::

::: correct

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["DisallowedObject"],
    message: "Please import 'DisallowedObject' from '/bar/baz/' instead."
}]}]*/

import { AllowedObject as DisallowedObject } from "foo";
```

:::

::: correct

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["lodash/*"],
    message: "Please use the default import from 'lodash' instead."
}]}]*/

import lodash from 'lodash';
```

:::

::: correct

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["foo[A-Z]*"],
    caseSensitive: true
}]}]*/

import pick from 'food';
```

:::

::: correct

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNames: ['isEmpty'],
    message: "Use 'isEmpty' from lodash instead."
}]}]*/

import { hasValues } from 'utils/collection-utils';
```

:::

## 何时不用

如果你想在你的项目中导入一个模块而不出现 ESLint 错误或警告，不要使用这个规则，也不要在这个规则的列表中包含一个模块。
