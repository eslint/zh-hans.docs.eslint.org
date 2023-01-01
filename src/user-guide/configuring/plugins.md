---
title: 插件
eleventyNavigation:
    key: configuring plugins
    parent: configuring
    title: 插件配置
    order: 4

---

## 指定解析器

默认情况下，ESLint 使用 [Espree](https://github.com/eslint/espree) 作为其解析器。你可以选择在你的配置文件中指定使用一个不同的解析器，只要该解析器满足以下要求。

1. 它必须是一个可以从使用解析器的配置文件中加载的 Node 模块。通常情况下，这意味着你应该使用 npm 单独安装解析器包。
1. 它必须符合[解析器接口](../../developer-guide/working-with-custom-parsers)。

请注意，即使有这些兼容性，也不能保证外部解析器能与 ESLint 正确工作，ESLint 也不会修复与其他解析器不兼容的漏洞。

你可以在 `.eslintrc` 文件中使用 `parser` 选项指定 npm 模块作为解析器。例如，下面指定使用 Esprima 而不是 Espree：

```json
{
    "parser": "esprima",
    "rules": {
        "semi": "error"
    }
}
```

以下解析器与 ESLint 兼容：

* [Esprima](https://www.npmjs.com/package/esprima)
* [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) - 使 [Babel](https://babeljs.io) 解析器与 ESLint 兼容的的包装器。
* [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - 一个将 TypeScript 转换为与 ESTree 兼容的形式的解析器，因此它可以在 ESLint 中使用。

注意当使用自定义的解析器时，仍然需要配置 `parserOptions` 属性，以便 ESLint 在默认情况下与 ECMAScript 5 中没有的功能正常工作。解析器都是用 `parserOptions` 来决定特性启用与否。

## 指定处理器

插件可以提供处理器。处理器可以从其他类型的文件中提取 JavaScript 代码，然后让 ESLint 对 JavaScript 代码进行提示，或者处理器可以在预处理中转换 JavaScript 代码以达到某些目的。

在配置文件中使用 `processor` 键指定处理器，用斜线连接插件名称和处理器名称的字符串。例如，下面启用了插件 `a-plugin` 提供的处理器 `a-processor`：

```json
{
    "plugins": ["a-plugin"],
    "processor": "a-plugin/a-processor"
}
```

要为特定类型文件指定处理器，可以一起使用 `overrides` 键和 `processor` 键。例如，下面使用处理器 `a-plugin/markdown` 来处理 `*.md` 文件。

```json
{
    "plugins": ["a-plugin"],
    "overrides": [
        {
            "files": ["*.md"],
            "processor": "a-plugin/markdown"
        }
    ]
}
```

处理器可以创建命名代码块，如 `0.js` 和 `1.js`。ESLint 将这种命名代码块作为原始文件的子文件来处理。你可以在配置的 `overrides` 部分为命名代码块指定额外的配置。例如，下面禁用 markdown 文件中以 `.js` 结尾的命名代码块的 `strict` 规则。

```json
{
    "plugins": ["a-plugin"],
    "overrides": [
        {
            "files": ["*.md"],
            "processor": "a-plugin/markdown"
        },
        {
            "files": ["**/*.md/*.js"],
            "rules": {
                "strict": "off"
            }
        }
    ]
}
```

ESLint 检查命名代码块的文件路径，如果没有与 `overrides` 条目匹配的文件路径，则忽略这些文件。如果你想检查除 `*.js` 以外的指定代码块，记得要添加 `overrides` 条目。

## 配置插件

ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。

要在配置文件内配置插件，请使用 `plugins` 键，它应该是由插件名称组成的列表。可以省略插件名称中的  `eslint-plugin-` 前缀。

```json
{
    "plugins": [
        "plugin1",
        "eslint-plugin-plugin2"
    ]
}
```

而在 YAML 中是：

```yaml
---
  plugins:
    - plugin1
    - eslint-plugin-plugin2
```

**注意**：

1. 插件的解析是相对于配置文件的。换句话说，ESLint 将按照用户在配置文件中运行 `require('eslint-plugin-pluginname')` 获得的方式加载插件。
2. 基本配置中的插件（通过 `extends` 设置加载）是相对于派生配置文件的。例如，如果 `./.eslintrc` 中有 `extends: ["foo"]`。而 `eslint-config-foo` 中有 `plugins: ["bar"]`，ESLint 会从 `./node_modules/`（而不是 `./node_modules/eslint-config-foo/node_modules/`）或祖先目录找到 `eslint-plugin-bar`。因此，解析配置文件和基础配置中的每个插件都是独立的。

### 命名规范

#### 包括插件

可以在非范围包中省略 `eslint-plugin-` 前缀

```js
{
    // ...
    "plugins": [
        "jquery", // means eslint-plugin-jquery
    ]
    // ...
}
```

也可以用范围包启用同一条规则：

```js
{
    // ...
    "plugins": [
        "@jquery/jquery", // means @jquery/eslint-plugin-jquery
        "@foobar" // means @foobar/eslint-plugin
    ]
    // ...
}
```

#### 使用插件

当使用由插件定义的规则、环境或配置时，必须按照惯例来引用它们。

* `eslint-plugin-foo` → `foo/a-rule`
* `@foo/eslint-plugin` → `@foo/a-config`
* `@foo/eslint-plugin-bar` → `@foo/bar/a-environment`

比如说：

```js
{
    // ...
    "plugins": [
        "jquery",   // eslint-plugin-jquery
        "@foo/foo", // @foo/eslint-plugin-foo
        "@bar"      // @bar/eslint-plugin
    ],
    "extends": [
        "plugin:@foo/foo/recommended",
        "plugin:@bar/recommended"
    ],
    "rules": {
        "jquery/a-rule": "error",
        "@foo/foo/some-rule": "error",
        "@bar/another-rule": "error"
    },
    "env": {
        "jquery/jquery": true,
        "@foo/foo/env-foo": true,
        "@bar/env-bar": true,
    }
    // ...
}
```
