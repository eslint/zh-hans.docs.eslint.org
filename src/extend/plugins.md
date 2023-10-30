---
title: 创建插件
eleventyNavigation:
    key: create plugings
    parent: extend eslint
    title: 创建插件
    order: 2
---

ESLint 插件是给 ESLint 添加额外的规则和插件选项的扩展。插件让你可以自定义 ESLint 配置来强制执行不包括在 ESLint 核心包中的规则。插件也可以提供额外的环境、自定义处理器和配置。

## 插件命名

每个插件都是以 `eslint-plugin-<plugin-name>` 为名的 npm 模块，例如 `eslint-plugin-jquery`。你也可以使用 `@<scope>/eslint-plugin-<plugin-name>` 格式的范围包，如 `@jquery/eslint-plugin-jquery`以及 `@<scope>/eslint-plugin`，如 `@jquery/eslint-plugin`。

## 创建插件

要想创建一个插件的最简单方法是使用 [Yeoman 生成器](https://www.npmjs.com/package/generator-eslint)。该生成器将引导你创建插件骨架。

### 插件的元数据

为了更容易进行调试和更有效地缓存插件，建议在插件的根文件中提供 `meta` 对象，包括名称和版本，如下所示：

```js
// preferred location of name and version
module.exports = {
    meta: {
        name: "eslint-plugin-custom",
        version: "1.2.3"
    }
};
```

`meta.name` 属性应该与插件的 npm 包名称匹配，而 `meta.version` 属性应该与你的插件的 npm 包版本匹配。最简单的方法是从你的 `package.json` 中读取这些信息。

作为替代方法，你还可以在你的插件的根文件下暴露 `name` 和 `version` 属性，例如：

```js
// alternate location of name and version
module.exports = {
    name: "eslint-plugin-custom",
    version: "1.2.3"
};
```

虽然使用 `meta` 对象是提供插件名称和版本的首选方式，但这种格式也是可以接受的，并向后兼容。

### 插件中的规则

插件可以为 ESLint 提供自定义的规则。要做到这一点，插件必须输出 `rules` 对象，其中包含一个规则 ID 到规则的键值映射。规则 ID 不需要遵循任何命名惯例（比如可以是 `dollar-sign`）。了解更多关于在插件中创建自定义规则的信息，请参见[自定义规则](custom-rules)。

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

你可以通过在 `configs` 键下指定配置，将其捆绑在一个插件内。适用于当你想捆绑自定义规则和额外配置集合时。每个插件支持多个配置。

你可以在配置中包括来自也同样来自插件中的单个规则。你必须在配置中的 `plugins` 数组里指定你的的插件名称，并指定你想要启用的来自插件中的任何规则。任何规则必须以以缩略插件名或完整插件名为前缀。

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
    },
    rules: {
        "my-rule": {/* rule definition */},
        "another-rule": {/* rule definition */},
        "yet-another-rule": {/* rule definition */}
    }
};
```

插件不能强制使用某个特定配置。用户必须手动在配置文件中包括来自插件的配置。

如果上面的示例插件名为 `eslint-plugin-myPlugin`，那么就可以在配置文件中分别通过添加 `"plugin:myPlugin/myConfig"` 和 `"plugin:myPlugin/myOtherConfig"` 使用 `myConfig` 和 `myOtherConfig` 配置。

```json
// .eslintrc.json

{
    "extends": ["plugin:myPlugin/myConfig"]
}

```

### 对等依赖

为了明确该插件需要 ESLint 才能正常工作，你必须在你插件的 `package.json` 的 `peerDependencies` 字段中提及并声明 ESLint 是插件的对等依赖。

该插件的支持是在 ESLint `0.8.0` 版本中引入的。确保 `peerDependencies` 指向 ESLint `0.8.0` 或更高版本。

```json
{
    "peerDependencies": {
        "eslint": ">=0.8.0"
    }
}
```

## 测试

ESLint 提供了 [`RuleTester`](../integrate/nodejs-api#ruletester) 工具，以便测试插件规则。

## 检查

ESLint 插件也应该要进行检查！建议使用以下插件的 `recommended` 配置对你的插件进行检查：

* [eslint](https://www.npmjs.com/package/eslint)
* [eslint-plugin-eslint-plugin](https://www.npmjs.com/package/eslint-plugin-eslint-plugin)
* [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)

## 分享插件

为了让其他人更容易发现你的插件，可以在 `package.json` 文件中添加这些[关键词](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#keywords)。

推荐的关键词有：

* `eslint`
* `eslintplugin`
