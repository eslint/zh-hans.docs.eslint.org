---
title: 将插件迁移至平面配置
eleventyNavigation:
    key: plugin flat config
    parent: create plugins
    title: 迁移至平面配置
    order: 4

---

从 ESLint v9.0.0 开始，默认的配置系统将是新的平面配置系统。为了让你的插件也适用于平面配置文件，你需要在现有插件中做些改变。

## 推荐的插件结构

为了让你的插件更容易地在平面配置系统中工作，建议你将现有插件的入口点改成这样：

```js
const plugin = {
    meta: {},
    configs: {},
    rules: {},
    processors: {}
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

这种结构可以更灵活地实施本页中讨论的其他改变。

## 添加插件元信息

在旧有的 eslintrc 配置系统中，ESLint 可以从包名中获取插件信息。而在平面配置中，ESLint 无法再获取插件的包名，为了补充缺失的信息，你最起码应该在 `meta` 键中添加 `name` 键。理想情况下还可以包括 `version` 键，例如：

```js
const plugin = {
    meta: {
        name: "eslint-plugin-example",
        version: "1.0.0"
    },
    configs: {},
    rules: {},
    processors: {}
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

如果你的插件以 npm 包的形式发布，那么 `name` 和 `version` 应该与 `package.json` 文件中的保持一致；不然你可以随意指定它的值。

在没有元信息的情况下，你的插件将无法与命令行选项 `--cache` 和 `--print-config` 一起使用。

## 将规则迁移至平面配置

插件中的 `rules` 键无需进行修改。一切与旧有的 eslintrc 配置系统一样。

## 将处理器迁移至平面配置

只要你没有使用文件扩展名解析器，那么插件中的 `processors` 键就无需更改。如果有[文件扩展名处理器](custom-processors#文件扩展名处理器)，你必须将名称更改为有效的标识符（使用数字或字母）。在旧的配置系统中文件扩展名处理器会自动应用，但在平面配置中它们不好自动应用。下面是文件扩展名处理的一个示例：

```js
const plugin = {
    configs: {},
    rules: {},
    processors: {

        // no longer supported
        ".md": {
            preprocess() {},
            postprocess() {}
        }
    }
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

`.md` 不再是有效的处理器名称，所以必须将它替换为有效的标识符，例如 `markdown`：

```js
const plugin = {
    configs: {},
    rules: {},
    processors: {

        // works in both old and new config systems
        "markdown": {
            preprocess() {},
            postprocess() {}
        }
    }
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

你还需要手动在配置中指定这个重命名后的处理器才能正常使用，像是：

```js
import example from "eslint-plugin-example";

export default [
    {
        plugins: {
            example
        },
        processor: "example/markdown"
    }
];
```

如果你重命名了文件扩展名处理器，那么你需要在插件文档中为用户指出这点。

## 将配置迁移至平面配置

如果你的插件中导出的配置指回了自身，那么你需要将配置更新为平面配置格式。作为迁移的一部分，你需要在 `plugins` 键中直接饮用插件。举例说明，下面是一个名为 `eslint-plugin-example` 的插件，它以旧配置系统格式导出了配置：

```js
// plugin name: eslint-plugin-example
module.exports = {
    configs: {

        // the config referenced by example/recommended
        recommended: {
            plugins: ["example"],
            rules: {
                "example/rule1": "error",
                "example/rule2": "error"
            }
        }
    },
    rules: {
        rule1: {},
        rule2: {};
    }
};
```

为了迁移至平面配置格式，你需要在推荐的插件结构中将配置移动到 `plugin` 变量定义之后，像这样：

```js
const plugin = {
    configs: {},
    rules: {},
    processors: {}
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
    recommended: {
        plugins: {
            example: plugin
        },
        rules: {
            "example/rule1": "error",
            "example/rule2": "error"
        }
    }
})

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

然后你的用户就可像以这样使用导出的配置：

```js
import example from "eslint-plugin-example";

export default [

    // use recommended config
    example.configs.recommended,

    // and provide your own overrides
    {
        rules: {
            "example/rule1": "warn"
        }
    }
];
```

你应该更新文档以便用户可以知道如何引用导出的配置。

## 将环境迁移至平面配置

在平面配置中不再支持环境，所以我们建议将你的环境过渡到导出配置中。假设你像这样导出了 `mocha` 环境：

```js
// plugin name: eslint-plugin-example
module.exports = {
    environments: {
        mocha: {
            globals: {
                it: true,
                xit: true,
                describe: true,
                xdescribe: true
            }
        }
    },
    rules: {
        rule1: {},
        rule2: {};
    }
};
```

为了将这个环境迁移至配置中，你需要在 `plugin.configs` 对象中添加新的键，值为包括相同信息的平面配置对象，像是这样：

```js
const plugin = {
    configs: {},
    rules: {},
    processors: {}
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
    mocha: {
        languageOptions: {
            globals: {
                it: "writeable",
                xit: "writeable",
                describe: "writeable",
                xdescribe: "writeable"
            }
        }
    }
})

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

然后你的用户就可以像这样使用导出的配置：

```js
import example from "eslint-plugin-example";

export default [

    // use the mocha globals
    example.configs.mocha,

    // and provide your own overrides
    {
        languageOptions: {
            globals: {
                it: "readonly"
            }
        }
    }
];
```

你应该更新文档以便用户可以知道如何引用导出的配置。

## 向后兼容性

如果你的插件需要同时支持旧的和新的配置系统，那么你需要：

1. **导出 CommonJS 入口点**。旧的配置系统无法加载以仅 ESM 格式发布的插件。如果你的源码是 ESM，那么你需要使用捆绑器来生成 CommonJS 版本，然后在 `package.json` 文件中使用 [`exports`](https://nodejs.org/api/packages.html#package-entry-points) 键来确保 Node.js 可以找到 CommonJS 版本。
1. **保留 `environments` 键**。如果你的插件有导出自定义环境，它们应该保持原样，并按照上述说明在平面配置中同样导出。如果 ESLint 以平面配置模式运行，那么会忽略 `environments` 键。
1. **同时导出 eslintrc 和平面配置**。`configs` 键仅在使用配置时进行验证，所以你可以在 `configs` 键中同时提供两种格式。我们建议你在旧的配置格式后添加 `-legacy` 以便更加清晰地指出这些配置在未来将不再受支持。比如，你的主要配置名为 `recommended`，它现在是平面格式，然后你可以同时提供采用 eslintrc 配置格式，名为 `recommended-legacy` 的配置。

## 延伸阅读

* [博客文章《平面配置文件格式概述》（英文）](https://eslint.org/blog/2022/08/new-config-system-part-2/)
* [博客文章《新配置系统的 API 使用》（英文）](https://eslint.org/blog/2022/08/new-config-system-part-3/)
* [博客文章《新配置系统的背景》（英文）](https://eslint.org/blog/2022/08/new-config-system-part-1/)
