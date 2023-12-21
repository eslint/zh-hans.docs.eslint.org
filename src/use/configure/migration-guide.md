---
title: 配置迁移指南
eleventyNavigation:
    key: migration guide
    parent: configure
    title: 配置迁移指南
    order: 8
---

这份指南概述了如何将 ESLint 配置文件从 eslintrc 格式（通常配置在 `.eslintrc.js` 或 `.eslintrc.json` 文件中）迁移到新的平面配置格式（通常配置在 `eslint.config.js` 文件中）。

要了解有关平面配置格式的更多信息，请参见[这篇博客文章](https://eslint.org/blog/2022/08/new-config-system-part-2/)。

有关这些配置格式的参考信息，请参阅以下文档：

* [eslintrc 配置文件](configuration-files)
* [平面配置文件](configuration-files-new)

## 开始使用平面配置文件

从 ESLint v9.0.0 开始，平面配置文件格式将成为默认的配置文件格式。一旦发布了 ESLint v9.0.0，你可以在没有任何额外配置的情况下开始使用平面配置文件格式。

要在 ESLint v8 中使用平面配置，请在项目根目录中放置一个 `eslint.config.js` 文件**或**将 `ESLINT_USE_FLAT_CONFIG` 环境变量设置为 `true`。

## 配置文件格式间保持不变的事项

尽管配置文件格式从 eslintrc 更改为平面配置，但以下内容保持不变：

* 配置规则的语法
* 配置处理器的语法
* CLI，除了 [CLI 标志更改](#cli-标志变化) 中指定的标志更改之外。
* 全局变量的配置方式相同，但位于不同的属性上（参见[配置语言选项](#配置语言选项)）。

## 配置格式间的关键区别

eslintrc 和平面配置格式之间的一些最显着的区别包括以下内容：

### 导入插件和自定义解析器

Eslintrc 文件在 `plugins` 属性内使用基于字符串的导入系统加载插件，并在 `extends` 属性内加载外部配置。

平面配置文件将插件和解析器表示为 JavaScript 对象。这意味着你可以使用 CommonJS 的 `require()` 或 ES 模块的 `import` 语句从外部文件加载插件和自定义解析器。

例如，这个 eslintrc 配置文件加载了 `eslint-plugin-jsdoc` 并配置了该插件的规则：

```javascript
// .eslintrc.js

module.exports = {
    // ...other config
    plugins: ["jsdoc"],
    rules: {
        "jsdoc/require-description": "error",
        "jsdoc/check-values": "error"
    }
    // ...other config
};
```

在平面配置中相应的配置写作：

```javascript
// eslint.config.js

import jsdoc from "eslint-plugin-jsdoc";

export default [
    {
        files: ["**/*.js"],
        plugins: {
            jsdoc: jsdoc
        },
        rules: {
            "jsdoc/require-description": "error",
            "jsdoc/check-values": "error"
        }
    }
];
```

### 自定义解析器

在 eslintrc 文件中，导入自定义解析器类似于导入插件：你使用字符串指定解析器的名称。

在平面配置文件中，需要将自定义解析器作为模块导入，然后再将其分配给配置对象的 `languageOptions.parser` 属性。

例如，这个 eslintrc 配置文件使用了 `@babel/eslint-parser` 解析器：

```javascript
// .eslintrc.js

module.exports = {
    // ...other config
    parser: "@babel/eslint-parser",
    // ...other config
};
```

In flat config, you would do the same thing like this:

```javascript
// eslint.config.js

import babelParser from "@babel/eslint-parser";

export default [
    {
        // ...other config
        languageOptions: {
            parser: babelParser
        }
        // ...other config
    }
];
```

### 基于 Glob 的配置

默认情况下，eslintrc 文件会对放置它们的目录及其子目录中的所有文件（除了被 `.eslintignore` 包含的文件）进行 lint。如果你希望对不同的文件 glob 模式使用不同的配置，可以在 `overrides` 属性中指定它们。

默认情况下，平面配置文件支持在导出的数组中使用基于 glob 模式的不同配置。你可以在配置对象的 `files` 属性中包含 glob 模式。如果不指定 `files` 属性，配置将默认为 glob 模式 `"**/*.{js,mjs,cjs}"`。基本上，平面配置文件中的所有配置都类似于 eslintrc 的 `overrides` 属性。

#### eslintrc 示例

例如，这个 eslintrc 文件将用于它所处的目录及其子目录中的所有文件：

```javascript
// .eslintrc.js

module.exports = {
    // ...other config
    rules: {
        semi: ["warn", "always"]
    }
};
```

这个 ESLint 配置文件支持多个配置并使用覆盖：

```javascript
// .eslintrc.js

module.exports = {
    // ...other config
    overrides: [
        {
            files: ["src/**/*"],
            rules: {
                semi: ["warn", "always"]
            }
        },
        {
            files:["test/**/*"],
            rules: {
                "no-console": "off"
            }
        }
    ]
};
```

以下是使用默认 glob 模式的平面配置示例：

```javascript
// eslint.config.js

import js from "@eslint/js";

export default [
    js.configs.recommended, // Recommended config applied to all files
    // Override the recommended config
    {
        rules: {
            indent: ["error", 2],
            "no-unused-vars": "warn"
        }
        // ...other configuration
    }
];
```

支持为不同 glob 模式进行多个配置的平面配置示例：

```javascript
// eslint.config.js

import js from "@eslint/js";

export default [
    js.configs.recommended, // Recommended config applied to all files
    // File-pattern specific overrides
    {
        files: ["src/**/*", "test/**/*"],
        rules: {
            semi: ["warn", "always"]
        }
    },
    {
        files:["test/**/*"],
        rules: {
            "no-console": "off"
        }
    }
    // ...other configurations
];
```

### 配置语言选项

在 eslintrc 文件中，通过 `env`、`globals` 和 `parserOptions` 属性配置各种语言选项。使用 `env` 属性配置针对特定运行时的全局变量组（例如浏览器中 JavaScript 的 `document` 和 `window`；Node.js 的 `process` 和 `require`）。

在平面配置文件中，`globals` 和 `parserOptions` 被整合到 `languageOptions` 键下；`env` 属性不存在。特定运行时的全局变量组从 [globals](https://www.npmjs.com/package/globals) npm 包导入，并包含在 `globals` 属性中。你可以使用扩展运算符（`...`）一次性导入多个全局变量。

```javascript
// .eslintrc.js

module.exports = {
    env: {
        browser: true,
    },
    globals: {
        myCustomGlobal: "readonly",
    },
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module"
    }
    // ...other config
}
```

以下是相同配置的平面配置版本：

```javascript
// eslint.config.js

import globals from "globals";

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                myCustomGlobal: "readonly"
            },
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module"
            }
        }
        // ...other config
    }
];
```

### 预定义配置

在 eslintrc 文件中，使用 `extends` 属性来使用预定义的配置。ESLint 提供了两个可以作为字符串访问的预定义配置：

* `"eslint:recommended"`：ESLint 推荐的规则
* `"eslint:all"`：所有 ESLint 内置的规则

你还可以使用 `extends` 属性来扩展自定义配置。自定义配置可以是指向本地配置文件或 npm 包名称的路径。

在平面配置文件中，预定义配置需要从单独的模块导入到平面配置文件中的。`recommended` 和 `all` 规则配置位于 [`@eslint/js`](https://www.npmjs.com/package/@eslint/js) 包中。你必须导入此包才能使用这些配置：

```shell
npm install @eslint/js --save-dev
```

你可以将这些配置中的每一个添加到导出的数组中，或者从它们中暴露特定的规则。你必须使用平面配置导入本地配置文件和 npm 包配置的模块。

例如，下面是使用了内置的 `eslint:recommended` 配置的 ESLint 配置文件：

```javascript
// .eslintrc.js

module.exports = {
    // ...other config
    extends: "eslint:recommended",
    rules: {
        semi: ["warn", "always"]
    },
    // ...other config
}
```

这个 ESLint 配置文件使用了内置配置、本地自定义配置以及来自 npm 包的自定义配置：

```javascript
// .eslintrc.js

module.exports = {
    // ...other config
    extends: ["eslint:recommended", "./custom-config.js", "eslint-config-my-config"],
    rules: {
        semi: ["warn", "always"]
    },
    // ...other config
}
```

同样的配置在平面配置中写作：

```javascript
// eslint.config.js

import js from "@eslint/js";
import customConfig from "./custom-config.js";
import myConfig from "eslint-config-my-config";

export default [
    js.configs.recommended,
    customConfig,
    myConfig,
    {
        rules: {
            semi: ["warn", "always"]
        },
        // ...other config
    }
];
```

请注意，因为你只是导入 JavaScript 模块，你可以在 ESLint 使用它们之前修改配置对象。例如，你可能希望某个配置对象仅适用于你的测试文件：

```javascript
// eslint.config.js

import js from "@eslint/js";
import customTestConfig from "./custom-test-config.js";

export default [
    js.configs.recommended,
    {
        ...customTestConfig,
        files: ["**/*.test.js"],
    },
];
```

### 忽略文件

使用 eslintrc，你可以通过在项目根目录创建一个单独的 `.eslintignore` 文件来让 ESLint 忽略某些文件。`.eslintignore` 文件使用与 `.gitignore` 文件相同的 glob 模式语法。或者你也可以在 eslintrc 文件中使用 `ignorePatterns` 属性。

而要在平面配置中忽略文件，你则需要使用配置对象中的 `ignores` 属性。`ignores` 属性接受 glob 模式的数组。请注意，平面配置的 glob 模式**不匹配**点文件（例如，`*.js` 不会匹配 `.dotfile.js`）。平面配置不支持从 `.eslintignore` 文件加载 ignore 模式，因此你需要直接将这些模式迁移到平面配置中。

例如，以下是一个可以与 eslintrc 配置一起使用的 `.eslintignore` 示例：

```shell
# .eslintignore
temp.js
.config/*
# ...other ignored files
```

`ignorePatterns` example:

```javascript
// .eslintrc.js
module.exports = {
    // ...other config
    ignorePatterns: ["temp.js", ".config/*"],
};
```

同样的文件忽略模式在平面配置中写作：

```javascript
export default [
    {
        // ...other config
        ignores: ["temp.js", ".config/*"]
    }
];
```

### 检查器选项

ESlintrc 文件允许你使用 `noInlineConfig` 和 `reportUnusedDisableDirectives` 属性配置检查器本身。

平面配置系统引入了一个新的顶级属性 `linterOptions`，你可以使用它来配置代码检查器。在 `linterOptions` 对象中，你可以包含 `noInlineConfig` 和 `reportUnusedDisableDirectives`。

比如这个使用检查器选项的 eslintrc 文件：

```javascript
// .eslintrc.js

module.exports = {
    // ...other config
    noInlineConfig: true,
    reportUnusedDisableDirectives: true
}
```

以下是相同选项的平面配置版：

```javascript
// eslint.config.js

export default [
    {
        // ...other config
        linterOptions: {
            noInlineConfig: true,
            reportUnusedDisableDirectives: true
        }
    }
];
```

### CLI 标志变化

不再支持使用平面配置文件格式的以下 CLI 标志：

* `--rulesdir`
* `--ext`
* `--resolve-plugins-relative-to`

`--no-eslintrc` 标志已被替换为 `--no-config-lookup`。

### 其他更改

从 eslintrc 到平面配置文件格式的以下更改：

* `root` 选项不再存在（平面配置文件的行为就像设置了 `root: true` 一样）。
* `files` 选项不再可以是单个字符串，它必须是一个数组。
* `sourceType` 选项现在支持新值 `"commonjs"`（`.eslintrc` 也支持它，但从未记录在案）。

## 平面配置文件的 TypeScript 类型

你可以在 DefinitelyTyped 项目中查看平面配置文件格式的 TypeScript 类型。配置数组中对象的接口称为 `FlatConfig`。

你可以在 [Github 上的 DefinitelyTyped 存储库](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/eslint/index.d.ts)中查看类型定义。

## 进一步阅读

* [概述平面配置文件格式的博客文章](https://eslint.org/blog/2022/08/new-config-system-part-2/)
* [新配置系统 API 用法的博客文章](https://eslint.org/blog/2022/08/new-config-system-part-3/)
* [新配置系统背景的博客文章](https://eslint.org/blog/2022/08/new-config-system-part-1/)
