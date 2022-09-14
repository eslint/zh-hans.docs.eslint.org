---
title: 可共享配置
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/developer-guide/shareable-configs.md
eleventyNavigation:
    key: shareable configs
    parent: developer guide
    title: 可共享配置
    order: 8

---

`.eslintrc` 文件中的配置是你项目的一个重要部分，因此，你可能想与其他项目或人分享它。可共享的配置允许你在 [npm](https://www.npmjs.com/) 上发布你的配置设置，让其他人下载并在他们的 ESLint 项目中使用它。

## 创建可共享的配置

可共享的配置只是导出配置对象的 npm 包。要开始，像你平时那样[创建 Node.js 模块](https://docs.npmjs.com/getting-started/creating-node-modules)。确保模块名称以 `eslint-config-` 开头，像是 `eslint-config-myconfig`。

也支持 npm [范围模块](https://docs.npmjs.com/misc/scope)，只需将模块以 `@scope/eslint-config` 前缀命名即可，如 `@scope/eslint-config` 和 `@scope/eslint-config-myconfig`。

创建 `index.js` 文件并导出包含设置的对象：

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

由于 `index.js` 仅仅是 JavaScript，你可以选择从文件中读取这些设置或动态生成它们。

## 发布可共享配置

在准备好可共享配置准备后，你就可以[发布到 npm](https://docs.npmjs.com/getting-started/publishing-npm-packages)并与他人共享来。我们建议使用 `eslint` 和 `eslintconfig` 这两个关键词，这样别人就可以很容易地找到你的模块。

你应该在 `package.json` 中使用 [peerDependencies](https://docs.npmjs.com/files/package.json#peerdependencies) 字段声明对 ESLint 的依赖。为了确保未来的兼容性，推荐使用 ">=" 范围语法来声明依赖关系和所需要的最低 ESLint 版本。比如：

```json
{
    "peerDependencies": {
        "eslint": ">= 3"
    }
}
```

如果你的可共享配置依赖于某个插件，你也应该把它指定为 `peerDependency`（插件将基于终端用户的项目加载，所以终端用户需要安装所需插件）。然而，如果你的可共享配置依赖于第三方解析器或另一个可共享配置，则可以将这些包指定为 `dependencies`。

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

可共享配置设计与 `.eslintrc` 文件的 `extends` 功能一起使用。`extends` 的值不要使用文件路径，而要使用你的模块名称。例如：

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

### npm 范围模块

也支持多种使用 npm [范围模块](https://docs.npmjs.com/misc/scope)对方式：

使用模块的名称：

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

也可以自定义模块名称，只是要注意，当使用[范围模块](https://docs.npmjs.com/misc/scope)时，不可能省略 `eslint-config-` 前缀。这样做会导致包的命名冲突，因此在大多数情况下会出现解析错误。例如，名为 `@scope/eslint-config-myconfig` 的包和 `@scope/myconfig`，由于两者都是有效的范围包名称，配置应该被指定为：

```json
{
    "extends": "@scope/eslint-config-myconfig"
}
```

你可以直接在 `.eslintrcq 文件中加入可共享配置的设置，从而覆盖这些设置。

## 共享多个配置

在同一个 npm 包中可以共享多个配置。你可以按照第一节的指示为包指定一个默认的配置。你可以通过简单地添加一个新文件到你的 npm 包，然后从你的 ESLint 配置中引用它来指定额外的配置。

作为一个例子，你可以在你的 npm 包的根目录创建名为 `my-special-config.js` 的文件，并导出配置，例如：

```js
module.exports = {
    rules: {
        quotes: [2, "double"]
    }
};
```

然后，假设你使用的是 `eslint-config-myconfig`这 个包，你可以通过以下方式访问额外的配置：

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

**重要**：我们强烈建议总是为你的插件包括一个默认的配置，以避免错误。

## 本地配置文件解析

如果你需要制作多个可以相互扩展并生活在不同目录下的配置，你可以创建一个可共享的配置来处理这种情况。

以下示例，我们假设你使用的包名是`eslint-config-myconfig`，你的包看起来像这样：

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

在你的 `index.js` 中，你可以这样：

```js
module.exports = require('./lib/ci.js');
```

现在在你的包里有 `/lib/defaults.js`，其中包含：

```js
module.exports = {
    rules: {
        'no-console': 1
    }
};
```

在你的`/lib/ci.js`中，你有

```js
module.exports = require('./ci/backend');
```

在你的 `/lib/ci/common.js`内

```js
module.exports = {
    rules: {
        'no-alert': 2
    },
    extends: 'myconfig/lib/defaults'
};
```

尽管是在一个完全不同的目录下，所有 `extends` 都必须使用想扩展的配置文件的完整包路径。

现在在你的 `/lib/ci/backend.js` 中

```js
module.exports = {
    rules: {
        'no-console': 1
    },
    extends: 'myconfig/lib/ci/common'
};
```

在最后一个文件中，你会再次看到，为了正确解析你的配置，你需要包括完整的软件包路径。

## 进一步阅读

* [npm 开发者指南](https://docs.npmjs.com/misc/developers)
