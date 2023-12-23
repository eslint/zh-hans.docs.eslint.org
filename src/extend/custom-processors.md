---
title: 自定义处理器
eleventyNavigation:
    key: custom processors
    parent: create plugins
    title: 自定义处理器
    order: 3
---

你也可以创建自定义处理器，告诉 ESLint 如何处理标准 JavaScript 以外的文件。比如你可以编写一个自定义处理器从 Markdown 文件中提取并处理 JavaScript（[eslint-plugin-markdown](https://www.npmjs.com/package/eslint-plugin-markdown) 包含的处理器就是做这个的）。

## 自定义处理器规范

为了创建自定义处理器，模块导出的对象必须符合以下接口：

```js
module.exports = {
    processors: {
        meta: {
            name: "eslint-processor-name",
            version: "1.2.3"
        },
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

**`preprocess` 方法*使用文件内容和文件名作为参数，并返回一个代码块的数组以进行提示。这些代码块将被单独检查，但仍被注册到文件名上。

一个代码块有两个属性 `text` 和 `filename`。`text` 属性是代码块的内容，`filename` 属性是代码块的名称。块的名称可以是任何东西，但应包括文件扩展名，这将告诉检查器如何处理当前块。检查器将检查 [`--ext` CLI 选项](../use/command-line-interface#--ext)，看当前块是否应该被检查，并解决 `overrides` 配置，检查如何处理当前块。

由插件决定它是否需要只返回非 JavaScript 文件的一部分或多个片段的。例如在处理 `.html` 文件的情况下，你可能想通过合并所有的脚本只返回数组中的一个项目。像是 `.md` 文件，因为每个 JavaScript 块都可能是独立的，就可以返回多个项目。

**`meta` 对象** 有助于 ESLint 缓存处理器并提供更友好的调试消息。`meta.name` 属性应与处理器名称匹配，而 `meta.version` 属性应与你的处理器的 npm 包版本匹配。最简单的方法是从你的 `package.json` 中读取这些信息。

**`postprocess` 方法**接收一个二维数组，该数组包括检查器消息和文件名。输入数组中的每一项都对应于从 `preprocess` 方法返回的部分。`postprocess` 方法必须调整所有错误的位置，使其与原始的、未处理的代码中的位置相对应，并将其汇总为一个平面数组并返回。

每个检查消息中报告的问题都要有以下位置信息：

```typescript
type LintMessage = {

  /// The 1-based line number where the message occurs.
  line?: number;

   /// The 1-based column number where the message occurs.
  column?: number;

  /// The 1-based line number of the end location.
  endLine?: number;

  /// The 1-based column number of the end location.
  endColumn?: number;

  /// If `true`, this is a fatal error.
  fatal?: boolean;

  /// Information for an autofix.
  fix: Fix;

  /// The error message.
  message: string;

  /// The ID of the rule which generated the message, or `null` if not applicable.
  ruleId: string | null;

  /// The severity of the message.
  severity: 0 | 1 | 2;

  /// Information for suggestions.
  suggestions?: Suggestion[];
};

type Fix = {
    range: [number, number];
    text: string;
}

type Suggestion = {
    desc?: string;
    messageId?: string;
    fix: Fix;
}
```

默认情况下，ESLint 在使用处理器时不会进行自动修正，即使在命令行上启用了 `--fix` 标志。为了让 ESLint 在使用你的处理器时自动修正代码，你应该采取以下额外步骤。

1. 更新 `postprocess` 方法，以额外转换报告问题的 `fix` 属性。所有可自动修复的问题都有 `fix` 属性，它是符合以下模式的对象：

    ```typescript
    {
        range: [number, number],
        text: string
    }
    ```

    `range` 属性包含代码中的两个索引，指的是将被替换的连续文本部分的开始和结束位置。`text` 属性指的是将替换给定范围的文本。

    在最初的问题列表中，`fix` 属性将指代被处理的 JavaScript 中的修复。`postprocess` 方法应该将该对象转换为指原始的、未处理的文件中的一个修复。

2. 给处理器添加 `supportsAutofix: true` 属性。

你可以在一个插件中同时存在规则和自定义处理程序。在一个插件中也可以有多个处理程序。要支持多个扩展，可以将每个扩展添加到 `processors` 元素中，并将它们指向同一个对象。

## 在配置文件中指定处理器

要使用一个处理器，将其 ID 添加到配置文件中的 `processor` 部分。处理器 ID 是一个插件名称和处理器名称的连接字符串，用斜线作为分隔符。这也可以被添加到配置文件的 `overrides` 部分，以指定哪个处理器应该处理哪些文件。

例如：

```yml
plugins:
  - a-plugin
overrides:
  - files: "*.md"
    processor: a-plugin/markdown
```

参见插件配置文档中的[指定处理器](../use/configure/plugins#指定处理器)获取详情。

## 文件扩展名处理器

::: warning
此功能已弃用，且仅在 eslintrc 风格的配置文件中生效。平面配置文件不会自动应用处理器；你需要明确设置 `processor` 属性。
:::

如果自定义处理器的名字以 `.` 开头，ESLint 就会把这个处理器作为**文件扩展名处理器**来处理，ESLint 会自动将这个处理器应用于该文件扩展名。用户不需要在配置文件给文件扩展名制定处理器。

比如：

```js
module.exports = {
    processors: {
        // This processor will be applied to `*.md` files automatically.
        // Also, you can use this processor as "plugin-id/.md" explicitly.
        ".md": {
            preprocess(text, filename) { /* ... */ },
            postprocess(messageLists, filename) { /* ... */ }
        },
        // This processor will not be applied to any files automatically.
        // To use this processor, you must explicitly specify it
        // in your configuration as "plugin-id/markdown".
       "markdown": {
            preprocess(text, filename) { /* ... */ },
            postprocess(messageLists, filename) { /* ... */ }
        }
    }
}
```

多个不同的文件扩展名也可以使用相同的处理器。下列示例展示了如何对 `.md` 和 `.mdx` 文件使用相同处理器：

```js
const myCustomProcessor = { /* processor methods */ };

module.exports = {
    // The same custom processor is applied to both
    // `.md` and `.mdx` files.
    processors: {
        ".md": myCustomProcessor,
        ".mdx": myCustomProcessor
    }
}
```
