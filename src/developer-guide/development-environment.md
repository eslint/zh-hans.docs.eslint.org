---
title: 开发环境
eleventyNavigation:
    key: set up a development environment
    parent: developer guide
    title: 设置开发环境
    order: 2

---

ESLint 有个非常轻量的开发环境，这使得更新代码快速而简单。下面是在给项目提交贡献前，关于建立本地开发环境的分步指南。

## 第一步：安装 Node.js

前往 <https://nodejs.org/> 下载并安装适合你的操作系统的最新稳定版本。

大多数安装程序已经带有 [npm](https://www.npmjs.com/)，但如果由于某些原因 npm 在你的系统上不起作用，你可以根据网站上的说明手动安装它。

## 第二步：分叉并签出你自己的 ESLint 仓库

进入 <https://github.com/eslint/eslint>，点击“Fork”按钮。然后按照 [GitHub 文档](https://help.github.com/articles/fork-a-repo)进行分叉和克隆。

在克隆仓库后，需要运行 `npm install` 以获得所有必要的依赖。

```shell
cd eslint
npm install
```

此步骤必须连接网络。它需要下载很多实用程序。

## 第三步：添加上游源码

**上游源码**是指 ESLint 的主要仓库，那里有活跃的开发。虽然你没有上游的推送权限，但你会有拉取权限，你可以随时拉取最新的代码。

要添加 ESLint 的上游源码，请在你的仓库中运行以下程序：

```shell
git remote add upstream git@github.com:eslint/eslint.git
```

现在，`upstream` 远程仓库指向了上游的源码。

## 第四步：安装 Yeoman 生成器

[Yeoman](http://yeoman.io) 是一个脚手架生成器，ESLint 使用它来简化新规则的开发。如果你还没有安装 Yeoman，你可以通过 npm 安装它：

```shell
npm install -g yo
```

然后，你可以安装 ESLint Yeoman 生成器：

```shell
npm install -g generator-eslint
```

关于如何使用它，请看[生成器文档](https://github.com/eslint/generator-eslint)的说明。

## 第五步：运行测试

运行测试是确保你已经正确设置了开发环境的最好方法。确保你在 `eslint` 目录下并运行：

```shell
npm test
```

测试需要几分钟的时间才能完成。如果任何测试失败，这可能意味着环境设置的一个或多个部分没有正确完成。因为上游的测试总是没有问题。

## 参考信息

### 工作流程

在安装好开发环境后，你就可以对 ESLint 的源文件进行修改并提交。提交时需要认真遵守我们的 [pull-request 提交工作流程](contributing/pull-requests)。

### 构建脚本

ESLint 有几个构建脚本，可以帮助开发各个部分。

#### npm test

主要使用的脚本是 `npm test`，它做了几件事：

1. 检查所有 JavaScript（包括测试）和 JSON 。
1. 在 Node.js 上运行所有测试
1. 检查代码覆盖率目标
1. 生成 `build/eslint.js`，以便在浏览器中使用。
1. 在 PhantomJS 中运行一个测试子集

请确保在修改后和发送拉动请求前运行这个程序。

**注意**：完整的代码覆盖率报告会输出到 `/coverage`。

#### npm run lint

仓库中只运行 JavaScript 和 JSON 检查。

#### npm run webpack

生成 `build/eslint.js`，一个在浏览器中使用的 ESLint 版本。
