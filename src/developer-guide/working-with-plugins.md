---
title: 创建插件
layout: doc
eleventyNavigation:
    key: working with plugings
    parent: developer guide
    title: 创建插件
    order: 5

---

每个插件都是以 `eslint-plugin-<plugin-name>` 为名的 npm 模块，例如 `eslint-plugin-jquery`。你也可以使用 `@<scope>/eslint-plugin-<plugin-name>` 格式的范围包，如 `@jquery/eslint-plugin-jquery`以及 `@<scope>/eslint-plugin`，如 `@jquery/eslint-plugin`。

## 创建插件

要想创建一个插件的最简单方法是使用 [Yeoman 生成器](https://www.npmjs.com/package/generator-eslint)。该生成器将引导你创建插件骨架。

### 插件中的规则

插件可以为 ESLint 提供额外的规则。要做到这一点，插件必须输出 `rules` 对象，其中包含一个规则 ID 到规则的键值映射。规则 ID 不需要遵循任何命名惯例（例如，它可以只是 `dollar-sign`）。

```js
module.exports = {
    rules: {
        "dollar-sign": {
            create: function (context) {
                // 规则实现……
            }
        }
    }
};
```

要在 ESLint 中使用这个规则，你需要使用没有前缀的插件名称，后面是一个斜线，然后是规则名称。因此，如果这个插件被命名为 `eslint-plugin-myplugin`，那么在你的配置中，你就可以使用 `myplugin/dollar-sign` 来引用这个规则。例如：`"rules": {"myplugin/dollar-sign": 2}`。

### 插件中的环境

插件可以暴露额外的环境，以便在 ESLint 中使用。要做到这一点，插件必须输出一个 `environments` 对象。`environments` 对象的键是所提供的不同环境的名称，其值是环境设置。比如说：

```js
module.exports = {
    environments: {
        jquery: {
            globals: {
                $: false
            }
        }
    }
};
```

这个插件中定义了 `jquery` 环境。要在 ESLint 中使用这个环境，你需要使用没有前缀的插件名称，后面是一个斜线，然后是环境名称。因此，如果这个插件被命名为 `eslint-plugin-myplugin`，那么你将在配置中设置环境为 `"myplugin/jquery"`。

插件环境可以定义以下对象：

1. `globals` - 在配置文件中扮演同样的 `globals`。键是 globals 的名字，值是 `true`，允许覆盖 global，`false`，不允许覆盖。
1. `parserOptions` - 与配置文件中的 `parserOptions` 作用相同。

### 插件中的处理器

你也可以创建插件，告诉 ESLint 如何处理 JavaScript 以外的文件。为了创建一个处理器，从你的模块导出的对象必须符合以下接口。

```js
module.exports = {
    processors: {
        "processor-name": {
            // takes text of the file and filename
            preprocess: function(text, filename) {
                // here, you can strip out any non-JS content
                // and split into multiple strings to lint

                return [ // return an array of code blocks to lint
                    { text: code1, filename: "0.js" },
                    { text: code2, filename: "1.js" },
                ];
            },

            // takes a Message[][] and filename
            postprocess: function(messages, filename) {
                // `messages` argument contains two-dimensional array of Message objects
                // where each top-level array item contains array of lint messages related
                // to the text that was returned in array from preprocess() method

                // you need to return a one-dimensional array of the messages you want to keep
                return [].concat(...messages);
            },

            supportsAutofix: true // (optional, defaults to false)
        }
    }
};
```

**`preprocess` 方法**将文件内容和文件名作为参数，并返回一个代码块的数组，以进行提示。这些代码块将被单独标记，但仍被注册到文件名上。

一个代码块有两个属性 `text` 和 `filename`；`text` 属性是代码块的内容，`filename` 属性是代码块的名称。块的名称可以是任何东西，但应包括文件扩展名，这将告诉检查器如何处理当前块。检查器将检查 [`--ext` CLI 选项](../user-guide/command-line-interface#--ext)，看当前块是否应该被检查，并解决 `overrides`配置，检查如何处理当前块。

由插件决定它是否需要只返回一个部分，或多个部分。例如在处理 `.html` 文件的情况下，你可能想通过合并所有的脚本只返回数组中的一个项目，但对于 `.md` 文件，每个 JavaScript 块可能是独立的，你可以返回多个项目。

**`postprocess`方法**接收一个二维数组，该数组包括检查器消息和文件名。输入数组中的每一项都对应于从 `preprocess` 方法返回的部分。`postprocess` 方法必须调整所有错误的位置，使其与原始的、未处理的代码中的位置相对应，并将其汇总为一个平面数组并返回。

报告的问题有以下位置信息：

```typescript
{
    line: number,
    column: number,

    endLine?: number,
    endColumn?: number
}
```

默认情况下，ESLint 在使用处理器时不会进行自动修正，即使在命令行上启用了 `--fix` 标志。为了让 ESLint 在使用你的处理器时自动修正代码，你应该采取以下额外步骤。

1. 更新 `postprocess` 方法，以额外转换报告问题的 `fix` 属性。所有可自动修复的问题都将有 `fix` 属性，它是符合以下模式的对象：

    ```js
    {
        range: [number, number],
        text: string
    }
    ```

    `range` 属性包含代码中的两个索引，指的是将被替换的连续文本部分的开始和结束位置。`text` 属性指的是将替换给定范围的文本。

    在最初的问题列表中，`fix` 属性将指代被处理的 JavaScript 中的修复。`postprocess` 方法应该将该对象转换为指原始的、未处理的文件中的一个修正。

2. 给处理器添加 `supportsAutofix: true` 属性。

你可以在一个插件中同时拥有规则和处理程序。你也可以在一个插件中拥有多个处理程序。
要支持多个扩展，将每个扩展添加到 `processors` 元素中，并将它们指向同一个对象。

#### 在配置文件中指定处理器

要使用一个处理器，将其 ID 添加到配置文件中的 `processor` 部分。处理器 ID 是一个插件名称和处理器名称的连接字符串，用斜线作为分隔符。这也可以被添加到配置文件的 `overrides` 部分，以指定哪个处理器应该处理哪些文件。

例如：

```yml
plugins:
  - a-plugin
overrides:
  - files: "*.md"
    processor: a-plugin/markdown
```

参见[指定处理器](../user-guide/configuring/plugins#specifying-processor)获取详情。

#### 文件扩展名处理器

如果一个处理器的名字以 `.` 开头，ESLint 就会把这个处理器作为**文件扩展名处理器**来处理，指定自动将这个处理器应用于哪种文件。人们不需要在他们的配置文件中指定文件扩展名的处理器。

示例：

```js
module.exports = {
    processors: {
        // This processor will be applied to `*.md` files automatically.
        // Also, people can use this processor as "plugin-id/.md" explicitly.
        ".md": {
            preprocess(text, filename) { /* ... */ },
            postprocess(messageLists, filename) { /* ... */ }
        }
    }
}
```

### 插件中的配置

你可以通过在 `configs` 键下指定配置，将其捆绑在一个插件内。当你想提供的不仅仅是代码风格，还有一些自定义的规则来支持它时，这可能很有用。每个插件支持多个配置。请注意，不可能为一个给定的插件指定一个默认的配置，用户必须在他们的配置文件中指定，当他们想使用一个配置。

```js
// eslint-plugin-myPlugin

module.exports = {
    configs: {
        myConfig: {
            plugins: ["myPlugin"],
            env: ["browser"],
            rules: {
                semi: "error",
                "myPlugin/my-rule": "error",
                "eslint-plugin-myPlugin/another-rule": "error"
            }
        },
        myOtherConfig: {
            plugins: ["myPlugin"],
            env: ["node"],
            rules: {
                "myPlugin/my-rule": "off",
                "eslint-plugin-myPlugin/another-rule": "off",
                "eslint-plugin-myPlugin/yet-another-rule": "error"
            }
        }
    }
};
```

如果上面的示例插件名为 `eslint-plugin-myPlugin`，那么就可以分别通过 `"plugin:myPlugin/myConfig"` 和 `"plugin:myPlugin/myOtherConfig"` 使用 `myConfig` 和 `myOtherConfig` 配置。

```json
{
    "extends": ["plugin:myPlugin/myConfig"]
}

```

**注意**：请注意，配置将不会默认启用插件的任何规则，而应被视为一个独立的配置。这意味着你必须在 `plugins` 数组中指定你的插件名称，以及你想启用的属于该插件的任何规则。任何插件规则必须以短或长的插件名称为前缀。参见[配置插件](../user-guide/configuring/plugins#configuring-plugins)获取更多信息。

### 对等依赖

为了明确该插件需要 ESLint 才能正常工作，你必须在你的 `package.json` 中将 ESLint 声明为 `peerDependency`。
该插件的支持是在 ESLint `0.8.0`版本中引入的。确保 `peerDependency` 指向 ESLint `0.8.0` 或更高版本。

```json
{
    "peerDependencies": {
        "eslint": ">=0.8.0"
    }
}
```

### 测试

ESLint 提供了 [`RuleTester`](/docs/developer-guide/nodejs-api#ruletester) 工具，以便测试插件规则。

### 筛选

ESLint 插件也应该要进行检查！建议使用以下插件的 `recommended` 配置对你的插件进行检查：

* [eslint](https://www.npmjs.com/package/eslint)
* [eslint-plugin-eslint-plugin](https://www.npmjs.com/package/eslint-plugin-eslint-plugin)
* [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)

## 分享插件

为了让社区都可以使用使你的插件，你必须在 npm 上发布它。

推荐的关键词有：

* `eslint`
* `eslintplugin`

在你的 `package.json` 文件中加入这些关键词，以便别人容易找到。

## 进一步阅读

* [npm 开发者指南](https://docs.npmjs.com/misc/developers)
