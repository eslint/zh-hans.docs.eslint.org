---
title: 共享配置
eleventyNavigation:
    key: share configs
    parent: extend eslint
    title: 共享配置
    order: 3
---

`.eslintrc` 文件中的配置是项目的重要组成部分，因此，你可能想与其他项目或人分享它。可共享配置允许你在 [npm](https://www.npmjs.com/) 上发布你的配置设置，让其他人下载并在他们的 ESLint 项目中使用它。

想分享你的 ESLint 配置可以创建一个**可共享配置**。在 [npm](https://www.npmjs.com/) 发布可共享配置可以让其他人下载并在它们的 ESLint 项目中使用它。

此页面解释了如何创建并发布共享配置。

## 创建可共享配置

可共享配置时一个只导出配置对象的 npm 包，就像你平时那样[创建 Node.js 模块](https://docs.npmjs.com/getting-started/creating-node-modules)那样。

模块名称必须遵循下列任一格式：

- 以 `eslint-config-` 开头，像是 `eslint-config-myconfig`。
- 如果是 npm [范围模块](https://docs.npmjs.com/misc/scope)，则只需将模块以 `@scope/eslint-config` 命名或以此为前缀命名即可，如 `@scope/eslint-config` 和 `@scope/eslint-config-myconfig`。

在你的模块中，在模块的 [`main`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#main) 入口点文件中导出共享配置。默认主要入口点是 `index.js`。示例：

```js
module.exports = {

    globals: {
        MyGlobal: true
    },

    rules: {
        semi: [2, "always"]
    }

};
```

由于 `index.js` 文件完全是 JavaScript，你可以从文件中读取这些设置或动态生成它们。

## 发布可共享配置

在准备好可共享配置后，你就可以[发布到 npm](https://docs.npmjs.com/getting-started/publishing-npm-packages) 并与他人共享来。我们建议在 `package.json` 文件中使用 `eslint` 和 `eslintconfig` 这两个[关键词](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#keywords)，这样别人能更容易找到你的模块。

你应该在 `package.json` 中使用 [peerDependencies](https://docs.npmjs.com/files/package.json#peerdependencies) 字段声明对 ESLint 的依赖。为了确保未来的兼容性，推荐使用 `>=` 范围语法来声明依赖关系和所需要的最低 ESLint 版本。比如：

```json
{
    "peerDependencies": {
        "eslint": ">= 3"
    }
}
```

如果你的可共享配置依赖于某个插件，你也应该把它指定为 `peerDependency`（插件将基于终端用户的项目加载，所以终端用户需要安装所需插件）。然而，如果你的可共享配置依赖于[自定义解析器](custom-parsers)或另一个可共享配置，则可以在 `package.json` 将这些包指定为 `dependencies`。

你也可以在发布之前通过全局链接你的模块，在自己电脑上测试你的可共享配置。输入：

```bash
npm link
```

然后，在想要使用可共享配置的项目中，输入：

```bash
npm link eslint-config-myconfig
```

请确保将 `eslint-config-myconfig` 替换为你的模块的实际名称。

## 使用可共享配置

在配置文件的 `extends` 字段中包括配置名称就可以使用可共享配置。值就是你的模块名称。比如：

```json
{
    "extends": "eslint-config-myconfig"
}
```

你也可以省略 `eslint-config-`，ESLint 会自动假定使用这一前缀：

```json
{
    "extends": "myconfig"
}
```

你不能通过 ESLint CLI 的 [`--config`](../use/command-line-interface#-c---config) 标志使用可共享配置。

### npm 范围模块

也支持多种使用 npm [范围模块](https://docs.npmjs.com/misc/scope)对方式：

可以使用模块的名称：

```json
{
    "extends": "@scope/eslint-config"
}
```

你也可以省略 `eslint-config`，ESLint 会自动假定使用这一前缀：

```json
{
    "extends": "@scope"
}
```

模块名称也可以自定义。比如你的包叫做 `@scope/eslint-config-myconfig`，那么可以在配置中这样指定：

```json
{
    "extends": "@scope/eslint-config-myconfig"
}
```

你也可以在配置中省略 `eslint-config`：

```json
{
    "extends": "@scope/myconfig"
}
```

### 用可共享配置覆盖设置

你可以直接在 `.eslintrc` 文件中加入可共享配置的设置，从而覆盖这些设置。

## 共享多个配置

在同一个 npm 包中可以共享多个配置。你可以按照[创建可共享配置](#创建可共享配置)章节的指示为包指定一个默认的配置。你可以通过在 npm 包添加一个新文件，然后从你的 ESLint 配置中引用它来指定额外的可共享配置。

作为一个例子，你可以在你的 npm 包的根目录创建名为 `my-special-config.js` 的文件，并导出配置，例如：

```js
// my-special-config.js

module.exports = {
    rules: {
        quotes: [2, "double"]
    }
};
```

然后，假设你使用的是 `eslint-config-myconfig` 这个包，你可以通过以下方式访问额外的配置：

```json
{
    "extends": "myconfig/my-special-config"
}
```

当使用[范围模块](https://docs.npmjs.com/misc/scope)时，不可能省略 `eslint-config` 命名空间。这样做会导致解析错误，如上所述。假设包的名字是 `@scope/eslint-config`，可以这样扩展配置：

```json
{
    "extends": "@scope/eslint-config/my-special-config"
}
```

注意，你可以省去文件名中的 `.js`。通过这种方式，你可以在你的包中添加你想要的额外配置。

**重要**：我们强烈建议为你的插件设置默认配置，以避免错误。

## 本地配置文件解析

如果你需要制作多个可以相互扩展并生活在不同目录下的配置，你可以创建一个可共享的配置来处理这种情况。

以下示例，我们假设你使用的包名是 `eslint-config-myconfig`，你的包会看起来像这样：

```text
myconfig
├── index.js
└─┬ lib
  ├── defaults.js
  ├── dev.js
  ├── ci.js
  └─┬ ci
    ├── frontend.js
    ├── backend.js
    └── common.js
```

在 `index.js` 中，可以这样：

```js
module.exports = require('./lib/ci.js');
```

现在包里有 `/lib/defaults.js`，其中包含：

```js
module.exports = {
    rules: {
        'no-console': 1
    }
};
```

在 `/lib/ci.js` 里：

```js
module.exports = require('./ci/backend');
```

在 `/lib/ci/common.js` 里：

```js
module.exports = {
    rules: {
        'no-alert': 2
    },
    extends: 'myconfig/lib/defaults'
};
```

尽管是在一个完全不同的目录下，所有 `extends` 都必须使用想扩展的配置文件的完整包路径。

现在在 `/lib/ci/backend.js` 里：

```js
module.exports = {
    rules: {
        'no-console': 1
    },
    extends: 'myconfig/lib/ci/common'
};
```

在最后一个文件中，再次看到为了正确解析你的配置，需要包括完整的软件包路径。

## 进一步阅读

* [npm 开发者指南](https://docs.npmjs.com/misc/developers)
