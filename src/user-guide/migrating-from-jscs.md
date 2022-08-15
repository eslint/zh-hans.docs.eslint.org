---
title: 迁移自 JSCS
layout: doc
edit_link: https://github.com/eslint/eslint/edit/main/docs/src/user-guide/migrating-from-jscs.md

---

在 2016 年四月，我们[宣布](https://eslint.org/blog/2016/04/welcoming-jscs-to-eslint)停止 JSCS 项目，JSCS 团队 将加入 ESLint 团队。该指引旨在帮助 JSCS 用户将其设置和项目迁移至 ESLint。我们试图让转换工作极可能自动化，但难免有些需要手工修改的地方。

## 术语

在开始 ESLint 迁移工作前，你可以阅读下方所列出的 ESLint 所使用的术语及其 JSCS 所用术语见的关系，这有助于迁移工作顺利进行。

* **配置文件** - 在 JSCS 中，配置文件指的是 `.jscsrc`、`.jscsrc.json`、`.jscsrc.yaml` 或 `.jscsrs.js`。在 ESLint 中，配置文件指的是 `.eslintrc.json`、`.eslintrc.yml`、`.eslintrc.yaml` 或 `.eslintrc.js`（还有已废弃的 `.eslintrc` 文件格式)。
* **预设** - 在 JSCS 中, 直接提供了许多预定义配置的。ESLint 只提供了一个无关风格的预定义配置（`eslint:recommended`）。不过 ESLint 支持[可共享配置](https://eslint.org/docs/developer-guide/shareable-configs)。可共享的配置是指人们自行发布到 npm 的配置，几乎所有的 JSCS 预设都有与之对应的可共享配置（见下文“转换预设”部分）。此外，配置文件中的 `preset` 选项等同于 ESLint 的 `extends` 选项。

## 使用 Polyjuice 转换配置文件

[Polyjuice](https://github.com/brenolf/polyjuice) 是用于将 JSCS（和 JSHint）配置文件自动转换为 ESLint 配置文件的工具。它明白二者规则之间的对应关系，并将自动输出与之对应的 ESLint 配置文件，该文件尽可能地与你现有的 JSCS 文件像似。

安装 Polyjuice：

```shell
npm install -g polyjuice
```

Polyjuice 使用 JSON 配置文件，所以如果你正在使用 JavaScript 或 YAML JSCS 配置文件，那么你一个先将其转换为 JSON 配置。

要转换配置文件，只需向 `--jscs` 标志传递 `.jscs.json` 文件所处位置：

```shell
polyjuice --jscs .jscsrc.json > .eslintrc.json
```

它将创建与 `.jscsrc.json` 有着对等规则的 `.eslintrc.json` 文件。

你可以同时传递多个 `.jscsrc.json` 文件，Polyjuice 会将其合并成一个 `.eslintrc.json` 文件：

```shell
polyjuice --jscs .jscsrc.json ./foo/.jscsrc.json > .eslintrc.json
```

**注意**：Polyjuice 可以根据 JSCS 配置创建合理的 ESLint 配置，但并不能实现百分百一致。你可能仍然会看见与 JSCS 不同的警告，以及你可能需要在使用 Polyjuice 后对其进行进一步修改。特别是在 JSCS 中使用内联注释来启用/禁用某些规则（你需要手动将这些注释转换为使用 ESLint 风格的注释，见本页面后面的“禁用内联规则”）。

### 从零开始创建新的配置

如果不想直接把 JSCS 配置转换成 ESLint 配置，那可以使用 ESLint 内置向导从零开始。只需运行：

```shell
npm init @eslint/config
```

你会被询问一系列的问题以帮助你设置适合你的入门配置文件：

## 转换预设

大多数 JSCS 预设都有与之对应的可共享配置。下表列出了每个 JSCS 预设对应的可共享配置：

| **JSCS 预设** | **ESLint 可共享配置** |
|-----------------|-----------------------------|
| `airbnb`        | [`eslint-config-airbnb-base`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) |
| `crockford`        | （无） |
| `google`        | [`eslint-config-google`](https://github.com/google/eslint-config-google) |
| `grunt`        | [`eslint-config-grunt`](https://github.com/markelog/eslint-config-grunt) |
| `idiomatic`        | [`eslint-config-idiomatic`](https://github.com/jamespamplin/eslint-config-idiomatic) |
| `jquery`        | [`eslint-config-jquery`](https://github.com/jquery/eslint-config-jquery) |
| `mdcs`        | [`eslint-config-mdcs`](https://github.com/zz85/mrdoobapproves) |
| `node-style-guide`        | [`eslint-config-node-style-guide`](https://github.com/pdehaan/eslint-config-node-style-guide) |
| `wikimedia`        | [`eslint-config-wikimedia`](https://github.com/wikimedia/eslint-config-wikimedia) |
| `wordpress`        | [`eslint-config-wordpress`](https://github.com/WordPress-Coding-Standards/eslint-config-wordpress) |

举个例子，假设你正在使用 `airbnb` 预设，那么你的 `.jscsrc` 文件看起来像是这样：

```json
{
    "preset": "airbnb"
}
```

为了在 ESLint 也能保持一致，你首先需要安装 `eslint-config-airbnb` 可共享配置包：

```shell
npm install eslint-config-airbnb-base --save-dev
```

然后你要像这样修改你的配置文件：

```json
{
    "extends": "airbnb-base"
}
```

ESLint 看到 `"airbnb-base"` 就会去寻找 `eslint-config-airbnb-base`（节省点打字时间）。

## 禁用内联规则

JSCS 和 ESLint 都在文件内使用注释来开关部分代码的规则启用状态。下表列出了 JSCS 的内联注释以及与之对应的 ESLint 注释：

| **描述** | **JSCS 注释** | **ESLint 注释** |
|-----------------|------------------|--------------------|
| 禁用所有规则 | `// jscs:disable` 或 `/* jscs:disable */` | `/* eslint-disable */` |
| 启用所有规则 | `// jscs:enable` 或 `/* jscs:enable */` | `/* eslint-enable */` |
| 禁用一个规则 | `// jscs:disable ruleName` 或 `/* jscs:disable ruleName */` | `/* eslint-disable rule-name */` |
| 启用一个规则 | `// jscs:enable ruleName` 或 `/* jscs:enable ruleName */` | `/* eslint-enable rule-name */` |
| 禁用多个规则 | `// jscs:disable ruleName1, ruleName2` 或 `/* jscs:disable ruleName1, ruleName2 */` | `/* eslint-disable rule-name1, rule-name2 */` |
| 启用多个规则 | `// jscs:enable ruleName1, ruleName2` 或 `/* jscs:enable ruleName1, ruleName2 */` | `/* eslint-enable rule-name1, rule-name2 */` |
| 禁用单行的一个规则 | `// jscs:ignore ruleName` | `// eslint-disable-line rule-name` |

## 命令行选项

JSCS 和 ESLint 都提供了许多针对配置选项的命令行参数。下面列出了 ESLint 与 JSCS 命令行选项间的对应关系。

### `--fix`

JSCS 使用 `--fix` 选项应用代码自动修复：

```shell
jscs --fix file.js
```

ESLint 有相同的选项：

```shell
eslint --fix file.js
```

### `--auto-configure`

JSCS `--auto-configure` 选项可以根据给定文件内容创建配置：

```shell
jscs --auto-configure file.js
```

在 ESLint 里有类似的  `--init` 选项，你可以 "Inspect your JavaScript file(s)"（获取 JavaScript 文件）：

```shell
eslint --init
? How would you like to configure ESLint? (Use arrow keys)
> Answer questions about your style
  Use a popular style guide
  Inspect your JavaScript file(s)
```

## `--config`, `-c`

JSCS 支持在命令行中使用  `--config` 或 `-c` 指定配置文件，像是这样：

```shell
jscs --config myconfig.json file.js
jscs -c myconfig.json file.js
```

ESLint 也可以使用这两个标志：

```shell
eslint --config myconfig.json file.js
eslint -c myconfig.json file.js
```

## 传递代码给 ESLint

在 JSCS 里，你可以像这样传递代码：

```shell
cat file.js | jscs
```

在 ESLint 里，你也可以传递代码，只不过需要加上 `--stdin` 标志：

```shell
cat file.js | eslint --stdin
```
