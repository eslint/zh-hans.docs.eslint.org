---
title: 配置文件（新）
eleventyNavigation:
    key: configuration files
    parent: configure
    title: 配置文件（新）
    order: 1
---

::: warning
此系统功能完备，但尚未默认启用。你可以在项目根目录放置 `eslint.config.js` 文件或将 `ESLINT_USE_FLAT_CONFIG` 环境变量设置为 `true` 来启用该系统。哪怕在有 `eslint.config.js` 文件的情况下，也可以将环境变量设置为 `false` 来禁用它。如果你正在使用 API，那你可以通过使用本页所描述的 `FlatESLint` 类、`FlatRuleTester` 类或在 `Linter` 类中配置 `configType: "flat"` 来使用此配置系统。
:::

你可以把 ESLint 项目配置放在配置文件中，可以在里面添加内置规则及其行为、具有自定义规则的插件、可共享配置、希望规则适用的文件范围等等。

## 配置文件

ESLint 的配置文件是 `eslint.config.js`，它应该放在项目根目录下，并导出包含[配置对象](#配置对象)的数组。下面有一个示例：

```js
export default [
    {
        rules: {
            semi: "error",
            "prefer-const": "error"
        }
    }
];
```

此处的配置数组只包含一个配置对象。而该配置对象启用了两条规则：`semi` 和 `prefer-const`。ESLint 会在所有使用此配置文件处理的文件中使用这两个规则。

如果你的项目在其 `package.json` 文件中未指定 `"type":"module"`，那么 `eslint.config.js` 则必须采用 CommonJS 格式，例如：

```js
module.exports = [
    {
        rules: {
            semi: "error",
            "prefer-const": "error"
        }
    }
];
```

配置文件还可以导出一个解析为配置数组的 Promise。这对于在 CommonJS 配置文件中使用 ESM 依赖项非常有用，就像在这个例子中一样：

```js
module.exports = (async () => {

    const someDependency = await import("some-esm-dependency");

    return [
        // ... use `someDependency` here
    ];

})();
```

## 配置对象

每个配置对象都包括了 ESLint 检查一组文件所需的所有信息。配置对象由以下属性组成：

* `files` - 表示配置适用的文件范围的 glob 模式数组。在没有指定的情况下，配置对象适用于所有与其他配置对象匹配的文件。
* `ignores` - 表示配置对象不应适用的文件的 glob 模式数组。如果没有指定，配置对象将适用于所有由 `files` 匹配的文件。
* `languageOptions` - 包含如何配置检查过程中 JavaScript 设置的对。
    * `ecmaVersion` - 支持 ECMAScript 的版本。可以是任何年份（`2022`）或版本（`5`）。设置为 `"latest"` 则使用受支持的最新版本（默认为 `"latest"`）。
    * `sourceType` - JavaScript 源码类型。传统脚本文件可以使用 `"script"`，ECMAScript 模块（ESM）可以用 `"module"`，CommonJS 文件使用 `"commonjs`（默认情况下，`.js` 和 `.mjs` 文件使用 `"module"`；`.cjs` 文件使用 `"commonjs"`）
    * `globals` - 指定额外对象的对象，这些对象应该在检查期间会被添加到全局范围内。
    * `parser` - 包含 `parse()` 方法或 `parseForESLint()` 方法的对象（默认为 [`espree`](https://github.com/eslint/espree)）
    * `parserOptions` - 指定额外选项的对象，这些选项将直接传递给解析器上的 `parse()` 或 `parseForESLint()` 方法。可用选项取决于解析器。
* `linterOptions` - 对象，包含与提示过程有关的设置。
    * `noInlineConfig` - 表示是否允许内联配置布尔值。
    * `reportUnusedDisableDirectives` - 表示是否应该跟踪和报告未用的禁用指令的布尔值。
* `processor` - 包含 `preprocess()` 和 `postprocess()` 方法的对象，或者表示插件内处理器名称的字符串（如 `"pluginName/processorName"`）。
* `plugins` - 包含插件名称与对应的插件对象的名值对对象。如果指定了 `files`，则只适用于与之匹配的文件。
* `rules` - 包含规则配置的对象。如果指定了 `files` 或 `ignores`，则规则配置只适用于与之匹配匹配的文件。
* `settings` - 包含对所有规则可用的名值对的对象。

### 指定 `files` 和 `ignores`

::: tip
在 `files` 和 `ignores` 中的模式使用的是 [`minimatch`](https://www.npmjs.com/package/minimatch) 语法，并使用基于 `eslint.config.js` 文件位置的相对路径。
:::

你可以使用 `files` 和 `ignores` 的组合来决定配置对象的文件适用范围。默认情况下，ESLint 会匹配 `**/*.js`、`**/*.cjs` 和 `**/*.mjs`。如果配置对象没有指定 `files` 或 `ignores`，则会被用于所有与其他配置对象匹配的文件，默认情况下，配置对象通过 JavaScript 文件传递给 ESLint。比如：

```js
export default [
    {
        rules: {
            semi: "error"
        }
    }
];
```

在这种配置下 `semi` 规则就会用于所有与 ESLint 中的默认文件相匹配的文件。因此，如果用 ESLint 检查 `example.js` 则会使用 `semi` 规则。如果你传递了非 JavaScript 文件，比如 `example.txt`，就不会使用 `semi` 规则，因为没有其他配置对象与该文件名匹配（同时 ESLint 将输出错误信息，让你知道由于缺少配置，忽略了该文件）。

#### 使用 `ignores` 排除文件

可以通过组合 `files` 和 `ignores` 模式来限制配置对象适用范围。例如，你可能希望某些规则只适用于 `src` 目录下的文件。

```js
export default [
    {
        files: ["src/**/*.js"],
        rules: {
            semi: "error"
        }
    }
];
```

此处的 `semi` 规则只用于 `src` 目录下的 JavaScript 文件。如果你在其他目录的文件上运行 ESLint，则忽略该配置对象。通过添加 `ignores`，你也可以让这个配置对象不用在  `src` 中的部分文件：

```js
export default [
    {
        files: ["src/**/*.js"],
        ignores: ["**/*.config.js"],
        rules: {
            semi: "error"
        }
    }
];
```

这个配置对象会匹配 `src` 目录下的所有 JavaScript 文件，除了以 `.config.js` 结尾的文件。你也可以在 `ignores` 中使用否定模式，将文件排除在忽略模式之外，例如：

```js
export default [
    {
        files: ["src/**/*.js"],
        ignores: ["**/*.config.js", "!**/eslint.config.js"],
        rules: {
            semi: "error"
        }
    }
];
```

这里，配置对象排除了以 `.config.js` 结尾的文件，除了 `eslint.config.js` 文件仍将应用 `semi` 规则。

非全局的 `ignores` 模式只能匹配文件名。类似 `"dir-to-exclude/"` 的模式将不会忽略任何内容。为了忽略特定目录中的所有内容，应该使用类似 `"dir-to-exclude/**"` 的模式。

如果使用了 `ignores` 而没有使用 `files`，但有任何其他键（如 `rules`），那么配置对象适用于除了 `ignores` 中指定的文件外的所有文件，例如：

```js
export default [
    {
        ignores: ["**/*.config.js"],
        rules: {
            semi: "error"
        }
    }
];
```

此配置对象适用于所有文件，除了以 `.config.js` 结尾的文件。实际上这就相当于把 `files` 设置为 `**/*`。但一般来说，如果指定了 `"ignore"`，最好也要指定 `files`。

#### 使用 `ignores` 全局性地忽略文件

如果 `ignores` 在配置对象中没有任何其他键，那么这些模式将被全局忽略。下面是示例：

```js
export default [
    {
        ignores: [".config/*"]
    }
];
```

此配置表明将忽略 `.config` 目录下的所有文件，该模式会添加在默认匹配模式 `["**/node_modules/**", ".git/**"]` 后。

你也可以不忽略被包含在默认匹配模式中的应被忽略的文件和目录。比如此配置不会忽略 `node_modules/mylibrary`：

```js
export default [
    {
        ignores: [
            "!node_modules/",           // unignore `node_modules/` directory
            "node_modules/*",           // ignore its content
            "!node_modules/mylibrary/"  // unignore `node_modules/mylibrary` directory
        ]
    }
];
```

请注意，只有全局的 `ignores` 模式才能匹配目录。属于特定配置的 `ignores` 模式只会匹配文件名。

#### 级联配置对象

当多个配置对象匹配一个给定的文件名时，配置对象会被合并，当有冲突时，后面的对象会优先于前面的对象。例如：

```js
export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                MY_CUSTOM_GLOBAL: "readonly"
            }
        }
    },
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: {
                it: "readonly",
                describe: "readonly"
            }
        }
    }
];
```

使用这种配置，所有的 JavaScript 文件都定义了一个自定义的全局对象，称为 `MY_CUSTOM_GLOBAL`，而那些在 `tests` 目录下的 JavaScript 文件，除了 `MY_CUSTOM_GLOBAL`之外，还有 `it` 和 `describe` 定义为全局对象。对于 tests 目录下的任何 JavaScript 文件，这两个配置对象都会被应用，所以 `languageOptions.globals` 会被合并，形成最终结果。

### 配置检查器选项

可以用 `linterOptions` 对象来配置特定于检查过程的选项。这些选项会影响品评的进行，而不影响文件的源代码被解释的方式。

#### 禁用内联配置

内联配置是通过 `/*eslint*/` 注释实现的，例如 `/*eslint semi: error*/`。你可以通过设置 `noInlineConfig` 为 `true` 来禁用内联配置。启用后，将忽略所有内联配置。下面是示例：

```js
export default [
    {
        files: ["**/*.js"],
        linterOptions: {
            noInlineConfig: true
        }
    }
];
```

#### 报告未用的禁用指令

像 `/*eslint-disable*/` 和 `/*eslint-disable-next-line*/` 这样的禁用指令是用来禁用 ESLint 规则的，围绕代码的某些部分。随着代码的变化，这些指令有可能不再需要，因为代码的变化使规则不再被触发。你可以通过设置 `reportUnusedDisableDirectives` 选项为 `true` 来启用这些未用的禁用指令的报告，如本例：

```js
export default [
    {
        files: ["**/*.js"],
        linterOptions: {
            reportUnusedDisableDirectives: true
        }
    }
];
```

默认情况下，未用的禁用指令被报告为警告。你可以使用 `--report-unused-disable-directives` 命令行选项来改变这一设置。

### 配置语言选项

可以使用 `languageOptions` 对象来配置 ESLint 如何评估你的 JavaScript 代码的特定选项。

#### 配置 JavaScript 版本

要配置 ESLint 用来评估你的 JavaScript（ECMAScript）的版本，请使用 `ecmaVersion` 属性。这个属性决定了哪些全局变量和语法在你的代码中是有效的，可以设置为版本号（`6`）、年份（`2022`）或 `"latest"`（使用 ESLint 支持的最新版本）。`ecmaVersion` 默认值为 `"latest"`，建议保持这个默认值，除非你需要确保你的 JavaScript 代码被评估为旧版本。例如，一些旧的运行时可能只能用 ECMAScript 5，在这种情况下，你把 ESLint 配置成这样：

```js
export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 5
        }
    }
];
```

#### 配置 JavaScript 源类型

ESLint 可以通过三种方式之一来检查代码：

1. ECMAScript 模块（ESM） - 代码有模块作用域，并以严格模式运行。
1. CommonJS - 代码有顶层函数作用域，并在非严格模式下运行。
1. Script - 代码有共享的全局作用域，并在非严格模式下运行。

你可以通过指定 `sourceType` 属性来指定你的代码要在哪种模式下运行。这个属性可以被设置为 `"module"`、`"commonjs"` 或  `"script"`。默认情况下，`.js` 和 `.mjs` 文件的 `sourceType` 是 `"module"`，而 `.cjs` 文件则是 `"commonjs"`。下面是示例：

```js
export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "script"
        }
    }
];
```

#### 配置自定义解析器及其选项

在许多情况下，你可以使用 ESLint 提供的默认解析器来解析你的 JavaScript 代码。你可以通过使用 `parser` 属性来覆盖默认的解析器。`parser` 属性必须是包含 `parse()` 方法或 `parseForESLint()` 方法的对象。例如，你可以使用 [`@babel/eslint-parser`](https://www.npmjs.com/package/@babel/eslint-parser) 包来让 ESLint 解析实验性语法：

```js
import babelParser from "@babel/eslint-parser";

export default [
    {
        files: ["**/*.js", "**/*.mjs"],
        languageOptions: {
            parser: babelParser
        }
    }
];
```

这种配置可以确保使用 Babel 解析器，而不是使用默认解析器，来解析所有以 `.js` 和 `.mjs` 结尾的文件。

你也可以通过使用 `parserOptions` 属性直接向自定义解析器传递选项。这个属性是一个对象，其名-值对是特定于你所使用的解析器的。对于 Babel 解析器，你可以这样传入选项：

```js
import babelParser from "@babel/eslint-parser";

export default [
    {
        files: ["**/*.js", "**/*.mjs"],
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    // your babel options
                    presets: ["@babel/preset-env"],
                }
            }
        }
    }
];
```

#### 配置全局变量

要在配置对象中配置全局变量，请将 `globals` 配置属性设置为一个对象，其中包含为你要使用的每个全局变量命名的键。对于每个全局变量的键，设置相应的值等于 `"writable"` 以允许变量被覆盖，或 `"readonly"` 不允许覆盖。例如：

```js
import globals from "globals";
export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser
            }
        }
    }
];
```

这些例子允许在代码中覆盖 `var1`，但不允许覆盖 `var2`。

可以用字符串 `"off"` 来禁用全局变量。例如，在一个环境中，可以使用大多数 ES2015 的全局变量，但不能用 `Promise`，你就可以使用这个配置：

```js
export default [
    {
        languageOptions: {
            globals: {
                Promise: "off"
            }
        }
    }
];
```

由于历史原因，布尔值 `false` 和字符串值 `"readable"` 等同于 `"readonly"`。同样地，布尔值 `true` 和字符串 `"writeable"` 等同于 `"writable"`。然而，旧值已经被废弃了。

### 在配置中使用插件

插件用于在 ESLint 项目中共享规则、处理器、配置、解析器等等。

#### 使用插件规则

你可以使用插件中的特定规则。可以在配置对象中使用 `plugins` 键指定该插件。`plugin` 键值为对象，其中属性名是插件名，值是插件对象本身。下面是示例：

```js
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

在这个配置中，JSDoc 插件被定义为 `jsdoc`。每个规则名称中的前缀 `jsdoc/` 表示该规则来自该名称的插件，而不是来自 ESLint 本身。

因为插件的名字和插件对象都是 `jsdoc`，你也可以将配置缩短为这样：

```js
import jsdoc from "eslint-plugin-jsdoc";

export default [
    {
        files: ["**/*.js"],
        plugins: {
            jsdoc
        },
        rules: {
            "jsdoc/require-description": "error",
            "jsdoc/check-values": "error"
        }
    }
];
```

虽然这是最常见的约定，但你不一定就要使用与插件规定相同的名称。你可以随意指定想要的前缀，例如：

```js
import jsdoc from "eslint-plugin-jsdoc";

export default [
    {
        files: ["**/*.js"],
        plugins: {
            jsd: jsdoc
        },
        rules: {
            "jsd/require-description": "error",
            "jsd/check-values": "error"
        }
    }
];
```

这时该配置对象就是使用 `jsd` 而非原先的 `jsdoc` 插件前缀。

#### 使用包含在插件中的配置

你可以直接通过在 `eslint.config.js` 配置数组中添加配置来使用包含在插件中的配置。
通常，你会使用插件的推荐配置。下面是示例：

```js
import jsdoc from "eslint-plugin-jsdoc";
export default [
    // 包含在插件中的配置
    jsdoc.configs.recommended,
    // 其他配置对象……
    {
        files: ["**/*.js"],
        plugins: {
            jsdoc: jsdoc
        },
        rules: {
            "jsdoc/require-description": "warn",
        }
    }
];
```

### 使用处理程序

处理器允许 ESLint 将文本转化为 ESLint 可以检查的代码片段。你可以通过定义一个 `processor` 属性来指定某个文件类型所使用的处理器，该属性需要包括形如 `"pluginName/processorName"` 的处理器名称，以引用插件中的处理器，或是包括使用 `preprocess()` 和 `postprocess()` 方法的对象。例如，想要从 Markdown 文件中提取 JavaScript 代码块，你可以在你的配置中加入这个：

```js
import markdown from "eslint-plugin-markdown";

export default [
    {
        files: ["**/*.md"],
        plugins: {
            markdown
        },
        processor: "markdown/markdown",
        settings: {
            sharedData: "Hello"
        }
    }
];
```

这个配置对象指定在名为 `markdown` 的插件中包含一个名为 `markdown` 的处理器。此配置将使该处理器应用于所有以 `.md` 结尾的文件。

处理器可以将命名代码块当作配置对象中的文件名，如 `0.js` 和 `1.js`。ESLint 将这样的命名代码块作为原始文件的一个子文件来处理。你可以为命名代码块指定额外的配置对象。例如，下面是对 markdown 文件中以 `.js` 结尾的命名代码块禁用 `strict` 规则。

```js
import markdown from "eslint-plugin-markdown";

export default [
    {
        files: ["**/*.md"],
        plugins: {
            markdown
        },
        processor: "markdown/markdown",
        settings: {
            sharedData: "Hello"
        }
    },

    // applies only to code blocks
    {
        files: ["**/*.md/*.js"],
        rules: {
            strict: "off"
        }
    }
];
```

### 配置规则

你可以在一个配置对象中配置任何数量的规则，方法是添加一个 `rules` 属性，其中包含一个带有你的规则配置的对象。这个对象中的名称是规则的名称，值是每个规则的配置。下面是示例：

```js
export default [
    {
        rules: {
            semi: "error"
        }
    }
];
```

这个配置对象指定 [`semi`](../../rules/semi) 规则应被启用，其严重程度为 `"error"`。你也可以通过指定一个数组来为规则提供选项，其中第一项是严重程度，之后的每一项都是规则的选项。例如，你可以将 `"semi"` 规则切换为不允许使用分号，将 `"never"` 作为一个选项。

```js
export default [
    {
        rules: {
            semi: ["error", "never"]
        }
    }
];
```

每个规则都指定自己的选项，可以是任何有效的 JSON 数据类型。请查看你要配置的规则的文档，以获得更多关于其可用选项的信息。

#### 规则的严重程度

你可以为一个规则指定三种可能的严重程度

* `"error"`（或 `2`） - 将问题视作错误。当使用 ESLint CLI 时，错误导致 CLI 以非零代码退出。
* `"warn"`（或 `1`） - 将问题视作警告。当使用 ESLint CLI 时，在不改变退出代码报告警告内容。如仅报告警告内容，则退出代码为 0。
* `"off"`（或 `0`） - 彻底关闭规则。

#### 规则配置级联

当一个以上的配置对象指定相同的规则时，规则配置会被合并，后面的对象优先于之前的任何对象。例如：

```js
export default [
    {
        rules: {
            semi: ["error", "never"]
        }
    },
    {
        rules: {
            semi: ["warn", "always"]
        }
    }
];
```

使用这个配置，`semi` 的最终规则配置是 `["warn", "always"]`，因为它出现在数组的最后。数组表示配置的是严重程度和任何选项。你可以仅通过定义一个字符串或数字来改变严重程度，如本例：

```js
export default [
    {
        rules: {
            semi: ["error", "never"]
        }
    },
    {
        rules: {
            semi: "warn"
        }
    }
];
```

在这里，第二个配置对象只覆盖了严重性，所以 `semi` 的最终配置是 `["warn", "never"]`。

### 配置共享设置

ESLint 支持在配置文件中添加共享设置。当在配置对象中添加 `settings` 对象，它将提供给所有规则。约定俗成插件将他们感兴趣的设置放入命名空间，以避免与其他设置相冲突。插件可以使用 `settings` 来指定应该在其所有规则中共享的信息。如果你正在添加自定义规则，并希望它们能够访问相同的信息，这可能是有用的。下面是示例：

```js
export default [
    {
        settings: {
            sharedData: "Hello"
        }
    }
];
```

### 使用预定义配置

ESLint 有两个针对 JavaScript 的预定义配置：

* `js.configs.recommended` - 启用 ESLint 推荐大家使用的规则，以避免潜在错误
* `js.configs.all` - 启用所有 ESLint 提供的规则

要使用这些预定义配置，要先安装 `@eslint/js` 包，然后在配置对象的其他属性中加入：

```js
import js from "@eslint/js";

export default [
    "js.configs.recommended",
    {
        rules: {
            semi: ["warn", "always"]
        }
    }
];
```

这里，首先应用了 `js.configs.recommended` 预定义配置，然后另一个配置对象为 `semi` 增加了所需的配置。

可以通过指定一个带有 `files` 键的配置对象，将这些预定义配置应用于部分文件，就像这样：

你可以

```js
import js from "@eslint/js";

export default [
    {
        files: ["**/src/safe/*.js"],
        ...js.configs.recommended
    }
];
```

## 配置文件解析

当 ESLint 在命令行上运行时，它首先检查当前工作目录中的 `eslint.config.js`，如果没有找到，将在下一个父目录中寻找该文件。这种搜索一直持续到找到该文件或到达根目录。

你可以通过通过将设置 `ESLINT_USE_FLAT_CONFIG` 环境变量设置为 `true`，并在命令行中使用 `-c` 或 `--config` 选项来指定替代的配置文件，以避免检索 `eslint.config.js`。例如

```shell
ESLINT_USE_FLAT_CONFIG=true npx eslint -c some-other-file.js **/*.js
```

在这种情况下，ESLint 将不会检索 `eslint.config.js`，而会直接使用 `some-other-file.js`。
