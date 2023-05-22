---
title: 配置文件
eleventyNavigation:
    key: configuration files
    parent: configure
    title: 配置文件
    order: 2
---

你可以把 ESLint 项目配置放在配置文件中，可以包括内置规则、希望它们如被执行、具有自定义规则的插件、可共享配置、你希望规则适用于哪些文件等等。

## 配置文件格式

ESLint 支持几种格式的配置文件：

**JavaScript** - 使用 `.eslintrc.js` 并导出包括配置的对象。
**JavaScript (ESM)** - 当在 JavaScript 包中运行 ESLint 时，且其 `package.json` 中指定 `"type":"module"` 时，使用 `.eslintrc.cjs`。请注意 ESLint 目前不支持 ESM 配置。
**YAML** - 使用 `.eslintrc.yaml` 或 `.eslintrc.yml` 来定义配置结构。
**JSON** - 使用 `.eslintrc.json` 来定义配置结构。ESLint JSON 文件中也可以使用 JavaScript 风格注释。
**package.json** - 在 `package.json` 文件中创建 `eslintConfig` 属性并在那里定义你的配置。

如果在同一目录下存在多个配置文件，ESLint 将按照以下优先顺序以此使用其一：

1. `.eslintrc.js`
1. `.eslintrc.cjs`
1. `.eslintrc.yaml`
1. `.eslintrc.yml`
1. `.eslintrc.json`
1. `package.json`

## 使用配置文件

有两种使用配置文件的方法。

第一种使用配置文件的方式是使用 `.eslintrc.*` 和 `package.json` 文件。ESLint 会自动要检查文件的目录中寻找它们，并在其直系父目录中寻找，直到文件系统的根目录（`/`）、当前用户的主目录（`~/`）或指定 `root: true` 时停止。关于这方面的更多细节，请看下面的 [级联和层次结构](#级联和层次结构)。当你希望项目的不同部分有不同的配置时，或当你希望其他人能够直接使用 ESLint 而无需传入配置文件时，就可以选择使用配置文件。

使用配置文件的第二种方法是把文件保存在你想保存的地方，然后用 `--config` 选项把它的位置传给 CLI，例如：

```shell
eslint -c myconfig.json myfiletotest.js
```

如果你使用了配置文件，并希望 ESLint 忽略所有 `.eslintrc.*` 文件，确保使用了 [`--no-eslintrc`](../command-line-interface#--no-eslintrc) 的同时也使用了 [`--config`](../command-line-interface#-c---config) 标志。

下面是 JSON 配置文件示例，它使用了 `typescript-eslint` 解析器来支持 TypeScript 语法：

```json
{
    "root": true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": { "project": ["./tsconfig.json"] },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/strict-boolean-expressions": [
            2,
            {
                "allowString" : false,
                "allowNumber" : false
            }
        ]
    },
    "ignorePatterns": ["src/**/*.test.ts", "src/frontend/generated/*"]
}
```

### 配置文件中的注释

JSON 和 YAML 配置文件格式都支持注释（`package.json` 文件中不能使用注释）。你可以在 JSON 文件使用 JavaScript 风格的注释，在 YAML 文件使用 YAML 风格的注释。ESLint 会安全地忽略了配置文件中的注释。这可以使你的配置文件更加人性化。

对于 JavaScript 风格的注释：

```js
{
    "env": {
        "browser": true
    },
    "rules": {
        // 仅在此目录覆盖默认设置
        "eqeqeq": "warn",
        "strict": "off"
    }
}
```

YAML 风格注释：

```yaml
env:
    browser: true
rules:
    # 覆盖默认配置
    eqeqeq: warn
    strict: off
```

## 添加共享设置

ESLint 支持在配置文件中添加共享设置。插件使用 `settings` 来指定应该在其所有规则中共享的信息。你可以在 ESLint 配置文件中添加 `settings` 对象，它将被提供给每个正在执行的规则。如果你正在添加自定义规则，并希望它们能够访问相同的信息，并且易于配置，这可能是有用的。

在 JSON 中：

```json
{
    "settings": {
        "sharedData": "Hello"
    }
}
```

而在 YAML 中则是：

```yaml
---
  settings:
    sharedData: "Hello"
```

## 级联和层次结构

当使用 `.eslintrc.*` 和 `package.json` 文件进行配置时，你可以利用配置级联的优势。假设你的项目符合以下的结构：

```text
your-project
├── .eslintrc.json
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc.json
  └── test.js
```

配置级联的工作是基于被提示的文件的位置。如果有一个 `.eslintrc` 文件与被提示的文件在同一目录下，那么该配置将被优先考虑。然后 ESLint 沿着目录结构向上搜索，合并沿途发现的任何 `.eslintrc` 文件，直到到达 `root: true` 的 `.eslintrc` 文件或根目录。

同样，如果根目录下有 `package.json` 文件，而其中又有 `eslintConfig` 字段，它所描述的配置将适用于它下面的所有子目录，但 `tests/` 目录下的 `.eslintrc` 文件所描述的配置将在有冲突的规范时覆盖它。

```text
your-project
├── package.json
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc.json
  └── test.js
```

如果在同一目录下有 `.eslintrc` 和 `package.json` 文件，`.eslintrc` 将优先使用，`package.json` 文件将不被使用。

默认情况下，ESLint 将在所有父文件夹中寻找配置文件，直到根目录。如果你想让你的所有项目都遵循某个惯例，这可能很有用，但有时会导致意外的结果。要将 ESLint 限制在一个特定的项目中，在 `.eslintrc.*` 文件或 `package.json` 文件的 `eslintConfig` 字段内或在项目根层的 `.eslintrc.*` 文件中放置 `"root": true`。一旦 ESLint 找到 `"root": true` 的配置，它将停止在父文件夹中寻找。

```js
{
    "root": true
}
```

而在 YAML 中是：

```yaml
---
  root: true
```

例如，考虑到 `projectA` 在 `lib/` 目录下的 `.eslintrc` 文件中设置了 `"root": true`。 在这种情况下，当对 `main.js` 进行检查时，`lib/` 中的配置将被使用，但 `projectA/` 中的 `.eslintrc` 文件不会被使用。

```text
home
└── user
    └── projectA
        ├── .eslintrc.json  <- Not used
        └── lib
            ├── .eslintrc.json  <- { "root": true }
            └── main.js
```

完整的配置层次，从高到低的优先级，如下所示：

1. 内联配置：
    1. `/*eslint-disable*/` 和 `/*eslint-enable*/`
    1. `/*global*/`
    1. `/*eslint*/`
    1. `/*eslint-env*/`
2. 命令行选项（或 CLIEngine 等价物）：
    1. `--global`
    1. `--rule`
    1. `--env`
    1. `-c`, `--config`
3. 项目级配置：
    1. `.eslintrc.*` 或 `package.json` 文件与 linted 文件在同一目录下
    2. 继续搜索祖先目录中的 `.eslintrc.*` 和 `package.json` 文件，直到包括根目录，或者找到`"root": true` 的配置。

请注意，在这种情况下，[当前用户在你的首选操作系统上的主目录](https://nodejs.org/api/os.html#os_os_homedir)（`~/`）也被认为是根目录，搜索配置文件也会在那里停止。从 8.0.0 版本开始[取消对个人配置文件的支持](configuration-files#personal-configuration-files-deprecated)，该目录下的配置文件将被忽略。

## 扩展配置文件

配置文件使用扩展后，就可以继承另一个配置文件的所有特征（包括规则、插件和语言选项）并修改所有选项。它有三种配置，定义如下。

* 基础配置：被扩展的配置。
* 派生配置：扩展基础配置的配置。
* 结果的实际配置：将派生配置合并到基础配置的结果。

`extends` 属性值可以是：

* 一个指定配置的字符串。
* 一个指定配置的字符串（要么是配置文件的路径，要么是可共享配置的名称，要么是 `eslint:recommended`，要么是 `eslint:all`）。
* 一个字符串数组，每个额外的配置都会扩展前面的配置。

ESLint 递归地扩展配置，所以基本配置也可以使用 `extends` 属性。`extends` 属性中的相对路径和可共享的配置名称从它们出现的配置文件的位置解析。

可以省略配置名称中的 `eslint-config-` 前缀。如 `airbnb` 会被解析为 `eslint-config-airbnb`。

`rules` 属性可以做以下任何事情来扩展（或覆盖）规则集：

* 启用额外的规则：
* 改变一个继承的规则的严重程度，而不改变其选项。
    * 基本配置：`"eqeqeq": ["error", "allow-null"]`
    * 派生配置：`"eqeqeq": "warn"`
    * 产生的实际配置：`"eqeqeq": ["warn", "allow-null"]`
* 覆盖基础配置中的规则选项：
    * 基本配置：`"quotes": ["error", "single", "avoid-escape"]`
    * 派生配置：`"quotes": ["error", "single"]`
    * 产生的实际配置：`"quotes": ["error", "single"]`
* 覆盖基础配置中作为对象给出的规则的选项：
    * 基本配置：`"max-lines": ["error", { "max": 200, "skipBlankLines": true, "skipComments": true }]`
    * 派生配置：`"max-lines": ["error", { "max": 100 }]`
    * 产生的实际配置：`"max-lines": ["error", { "max": 100 }]` 其中 `skipBlankLines` 和 `skipComments` 默认为 `false`

### 使用可共享配置包

[可共享配置](../../extend/shareable-configs) 是导出配置对象的一个 npm 包。当你在项目根目录下安装了这个包后，ESLint 就可以使用它了。

`extends` 属性值可以省略包名的 `eslint-config-`前缀。

`npm init @eslint/config` 命令可以创建一个配置，这样你就可以扩展一个流行的风格指南（如 `eslint-config-standard`）。

YAML 格式的配置文件的例子：

```yaml
extends: standard
rules:
  comma-dangle:
    - error
    - always
  no-empty: warn
```

### 使用 `eslint:recommended`

在 `extends` 属性中使用 `"eslint:recommended"` 可以启用报告常见问题的核心规则子集（这些规则在[规则页](../../rules/) 上用复选标记“推荐（recommended）”来标识）。

下面的示例中扩展 `eslint:recommended` 并覆盖了一些配置选项：

JavaScript 格式的配置文件的示例：

```js
module.exports = {
    "extends": "eslint:recommended",
    "rules": {
        // 启用额外规则
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],

        // override configuration set by extending "eslint:recommended"
        "no-empty": "warn",
        "no-cond-assign": ["error", "always"],

        // 禁用基础配置汇总的规则
         "for-direction": "off",
    }
}
```

### 使用插件配置

[插件](../../extend/plugins)是一个可以为 ESLint 添加各种扩展功能的 npm 包。一个插件可以执行许多功能，包括但不限于添加新的规则和导出[可共享的配置](../../extend/plugins#configs-in-plugins)。请确保该包已经安装在 ESLint 能够需要它的目录中。

`plugins` [属性值](./plugins#配置插件)可以省略包名中的 `eslint-plugin-` 前缀。

`extends` 属性值由以下内容组成：

* `plugin:`
* 包名（可以省略其前缀，如 `react` 是 `eslint-plugin-react` 的缩写）
* `/`
* 配置名称（如 `recommended`）

JSON 格式的配置文件的示例：

```json
{
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
       "react/no-set-state": "off"
    }
}
```

### 使用现有配置文件

`extends` 属性值可以是基于[配置文件](#使用配置文件))的绝对或相对路径。ESLint 会解析相对于基础配置文件的相对路径中的配置文件。

一个 JSON 格式的配置文件的例子：

```json
{
    "extends": [
        "./node_modules/coding-standard/eslintDefaults.js",
        "./node_modules/coding-standard/.eslintrc-es6",
        "./node_modules/coding-standard/.eslintrc-jsx"
    ],
    "rules": {
        "eqeqeq": "warn"
    }
}
```

### 使用 `"eslint:all"`

`extends` 属性值可以使用 `"eslint:all"` 来启用当前安装的 ESLint 版本中的所有核心规则。核心规则的集合会因 ESLint 的任何次要或主要版本改变而改变。

**重要的是**：此配置**不建议用于生产**，因为它随着 ESLint 的每个次要和主要版本的变化而变化，使用时风险自担。

在你决定项目配置时，你可以启用所有的核心规则以便快速开始探索规则和选项，特别是如果你很少覆盖选项或禁用规则。规则的默认选项不是 ESLint 的认可（如 [`quotes`](../../rules/quotes) 规则的默认选项并不意味着双引号比单引号好）。

如果你的配置扩展了 `eslint:all`，在你升级到 ESLint 较新的主要或次要版本后，在你使用[命令行](../command-line-interface#--fix)上的 `--fix` 选项前，查看报告的问题，这样你就知道一个新的可修复规则是否会对代码进行修改。

JavaScript 格式的配置文件的示例：

```js
module.exports = {
    "extends": "eslint:all",
    "rules": {
        // 覆盖默认选项
        "comma-dangle": ["error", "always"],
        "indent": ["error", 2],
        "no-cond-assign": ["error", "always"],

        // 当前禁用，但未来可能会启用
        "one-var": "off", // ["error", "never"]

        // 禁用
        "init-declarations": "off",
        "no-console": "off",
        "no-inline-comments": "off",
    }
}
```

## 基于 glob 模式的配置

<b>v4.1.0+.</b> 有时，更精细的配置是必要的，比如同一目录下的文件的配置不同。因此，你可以在 `overrides` 键下提供配置，这些配置只会用于符合特定 glob 模式的文件，且使用与你在命令行中传递的相同格式（如 `app/**/*.test.js`）。

overrides 中的 glob 模式使用 [minimatch 语法](https://github.com/isaacs/minimatch)。

### 覆盖是如何工作的？

通过使用 `overrides` 键，可以覆盖配置中基于文件 glob 模式的设置。使用 `overrides` 键的示例：

在你的 `.eslintrc.json` 中：

```json
{
  "rules": {
    "quotes": ["error", "double"]
  },

  "overrides": [
    {
      "files": ["bin/*.js", "lib/*.js"],
      "excludedFiles": "*.test.js",
      "rules": {
        "quotes": ["error", "single"]
      }
    }
  ]
}
```

以下是重写在配置文件中的工作方式：

* 模式是针对相对于配置文件目录的文件路径而应用的。例如，如果你的配置文件的路径是 `/Users/john/workspace/any-project/.eslintrc.js` ，而你要覆盖的文件的路径是 `/Users/john/workspace/any-project/lib/util.js`，那么 `.eslintrc.js` 中提供的模式将针对相对路径 `lib/util.js` 执行。
* 在同一配置文件中，glob 模式覆盖的优先级高于常规配置。同一个配置文件中的多个覆盖会按顺序应用。也就是说，配置文件中的最后一个覆盖块总是具有最高的优先权。
* 针对 glob 的配置与其他 ESLint 配置的工作原理几乎相同。覆盖块可以包含任何在常规配置中有效的配置选项，但 `root` 和 `ignorePatterns` 除外。
    * 一个 glob 特定的配置可以有一个 `extends` 设置，但扩展配置中的 `root` 属性会被忽略。扩展配置中的 `ignorePatterns` 属性只用于 glob 特定配置所匹配的文件。
    * 嵌套的 `overrides` 设置只有在父配置和子配置的 glob 模式都匹配时才会被应用。当扩展的配置设置了`overrides` 时也是这样子。
* 在覆盖块中可以提供多个 glob 模式。一个文件必须至少与所提供的模式之一相匹配，才能使用该配置。
* 覆盖块也可以指定排除在匹配之外的模式。如果一个文件与任何一个被排除的模式相匹配，则不会使用该配置。

### 相对的 glob 模式

```txt
project-root
├── app
│   ├── lib
│   │   ├── foo.js
│   │   ├── fooSpec.js
│   ├── components
│   │   ├── bar.js
│   │   ├── barSpec.js
│   ├── .eslintrc.json
├── server
│   ├── server.js
│   ├── serverSpec.js
├── .eslintrc.json
```

`app/.eslintrc.json` 中的配置定义了 glob 模式 `**/*Spec.js`，该模式就基于 `app/.eslintrc.json` 目录。因此，这个模式会匹配 `app/lib/fooSpec.js` 和 `app/components/barSpec.js` ，但**不匹配** `server/serverSpec.js`。如果你在 `project-root` 文件夹下的 `.eslintrc.json` 文件中定义了相同的模式，它会匹配所有三个 `*Spec` 文件。

如果配置是通过 `--config` CLI 选项提供的，配置中的 glob 模式是相对于当前工作目录的，而不是给定配置的基本目录。例如，如果 `--config configs/.eslintrc.json` 出现，那么配置中的 glob 模式是相对于 `.` 而不是 `./configs`。

### 指定目标文件来进行检查

如果你用 CLI 指定了目录（如 `eslint lib`），ESLint 会在目录中搜索目标文件来进行检查。目标文件包括 `*.js` 或与任何 `overrides` 条目相匹配的文件（但不包括任何以 `*` 结尾的 `files` 条目）。

如果你指定了 [`--ext`](../command-line-interface#ext) 命令行选项和目录，那么目标文件就只有是指定文件扩展名的文件，而不会考虑 `overrides` 条目。

## 个人配置文件（已废弃）

⚠️ **此功能已弃用**。这个功能将在 8.0.0 版本中被删除。如果你想继续使用个人配置文件，请使用 [`--config` CLI 选项](../command-line-interface#-c---config)。关于这一决定的更多信息，请参见 [RFC 28](https://github.com/eslint/rfcs/pull/28) 和 [RFC 32](https://github.com/eslint/rfcs/pull/32)。

`~/` 指的是[当前用户在你喜欢的操作系统上的主目录](https://nodejs.org/api/os.html#os_os_homedir)。这里所指的个人配置文件是 `~/.eslintrc.*` 文件，目前它的处理方式与其他配置文件不同。

### ESLint 是如何找到个人配置文件的？

如果 `eslint` 在项目中找不到任何配置文件，`eslint` 则加载 `~/.eslintrc.*` 文件。

如果 `eslint` 能在项目中找到配置文件，`eslint` 则忽略 `~/.eslintrc.*` 文件，即使它在项目目录的祖先目录下。

### 个人配置文件的表现如何？

`~/.eslintrc.*` 文件的行为与普通配置文件类似，但有一些例外。

`~/.eslintrc.*` 文件从 `~/node_modules/` 中加载可共享的配置和自定义解析器 - 类似于 `require()` - 在用户的主目录中。请注意，它不会加载全局安装的包。

`~/.eslintrc.*` 文件默认从 `$CWD/node_modules` 中加载插件，以便唯一地识别插件。如果你想用 `~/.eslintrc.*` 文件使用插件，插件必须在每个项目的本地安装。另外，你可以使用 [`--resolve-plugins-relative-to` CLI 选项](../command-line-interface#--resolve-plugins-relative-to)来修改 ESLint 加载插件的位置。
