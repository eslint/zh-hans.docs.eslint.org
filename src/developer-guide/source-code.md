---
title: 源码
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/developer-guide/source-code.md
eleventyNavigation:
    key: getting the source code
    parent: developer guide
    title: 获取源码
    order: 1

---

ESLint 托管在 [GitHub](https://github.com/eslint/eslint) 上并使用 [Git](https://git-scm.com/) 对进行源代码控制。要获得源码，你必须先在系统上安装 Git。关于安装和设置 Git 的说明可以参考 <https://help.github.com/articles/set-up-git/>。

如果你只想在本地创建个源码副本来玩玩，你可以用这个命令克隆主仓库：

```shell
git clone git://github.com/eslint/eslint.git
```

如果你打算为 ESLint 做贡献，那么你应该选择分叉该仓库。你可以在 <https://help.github.com/articles/fork-a-repo/> 找到关于分叉版本库的说明。在分叉 ESLint 仓库后，你还需要根据分叉创建本地副本。

## 开始开发

在开始开发之前，还有一些东西需要安装：

* [Node.JS](https://nodejs.org)
* [npm](https://www.npmjs.com/)

有本地副本，并安装了 Node.JS 和 npm，你就需要安装 ESLint 对依赖：

```shell
cd eslint
npm install
```

现在当你运行 `eslint` 时，它将运行本地副本并使用你的修改。

**注意**：每次从主仓库拉取后，都应该重新运行 `npm install`，以确保你有最新的开发依赖。

## 目录结构

ESLint 的目录和文件结构如下：

* `bin` - 安装 ESLint 后可以使用的可执行文件
* `conf` - 默认配置信息
* `docs` - 项目文档
* `lib` - 包含源码
    * `formatters` - 所有定义格式化的源文件
    * `rules` - 所有定义规则的源文件
* `tests` - 主要的单元测试文件夹
    * `lib` - 源码测试
        * `formatters` - 测试格式化
        * `rules` - 测试规则
