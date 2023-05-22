---
title: 创建插件
eleventyNavigation:
    key: create plugings
    parent: extend eslint
    title: 创建插件
    order: 1
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

你也可以创建插件，告诉 ESLint 如何处理 JavaScript 以外的文件。为了创建一个处理器，从你的模块导出的对象必须符合以下接口：

你可以通过在 `processors` 键中包含处理器函数来为插件添加处理器。关于定义自定义处理器的更多信息，请参考[自定义处理器](custom-processors)。

```js
module.exports = {
    processors: {
        // This processor will be applied to `*.md` files automatically.
        ".md": {
            preprocess(text, filename) { /* ... */ },
            postprocess(messages, filename) { /* ... */ }
        }
        "processor-name": {
            preprocess: function(text, filename) {/* ... */},
            postprocess: function(messages, filename) { /* ... */ },
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

**注意**：请注意，配置将不会默认启用插件的任何规则，而应被视为一个独立的配置。这意味着你必须在 `plugins` 数组中指定你的插件名称，以及你想启用的属于该插件的任何规则。任何插件规则必须以短或长的插件名称为前缀。参见[配置插件](../use/configure/plugins#配置插件)获取更多信息。

### 对等依赖

为了明确该插件需要 ESLint 才能正常工作，你必须在你的 `package.json` 中将 ESLint 声明为 `peerDependency`。
该插件的支持是在 ESLint `0.8.0` 版本中引入的。确保 `peerDependency` 指向 ESLint `0.8.0` 或更高版本。

```json
{
    "peerDependencies": {
        "eslint": ">=0.8.0"
    }
}
```

### 测试

ESLint 提供了 [`RuleTester`](../integrate/nodejs-api#ruletester) 工具，以便测试插件规则。

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
