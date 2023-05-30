---
title: 集成
eleventyNavigation:
    key: integrations
    parent: use eslint
    title: 集成
    order: 7
---

此页面包括了与 ESLint 集成的社区项目。列在此页的项目并不由 ESLint 所维护。

如果你想要推荐项目将其加入此也，请[提交拉去请求](../contribute/pull-requests).

## 编辑器

* Sublime Text 3：
    * [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint)
    * [Build Next](https://github.com/albertosantini/sublimetext-buildnext)
* Vim：
    * [ALE](https://github.com/w0rp/ale)
    * [Syntastic](https://github.com/vim-syntastic/syntastic/tree/master/syntax_checkers/javascript)
* Emacs：[Flycheck](http://www.flycheck.org/) 和 [javascript-eslint](http://www.flycheck.org/en/latest/languages.html#javascript) 检查器一同提供 ESLint 支持。
* Eclipse Orion：ESLint 是其[默认检查器](https://dev.eclipse.org/mhonarc/lists/orion-dev/msg02718.html)
* Eclipse IDE：[Tern ESLint linter](https://github.com/angelozerr/tern.java/wiki/Tern-Linter-ESLint)
* TextMate 2：
    * [eslint.tmbundle](https://github.com/ryanfitzer/eslint.tmbundle)
    * [javascript-eslint.tmbundle](https://github.com/natesilva/javascript-eslint.tmbundle)
* Atom：
    * [linter-eslint](https://atom.io/packages/linter-eslint)
    * [fast-eslint-8](https://atom.io/packages/fast-eslint-8)
* IntelliJ IDEA、WebStorm、PhpStorm、PyCharm、RubyMine 和其他 JetBrains IDE：[如何使用 ESLint](https://www.jetbrains.com/help/webstorm/eslint.html)
* Visual Studio: [Linting JavaScript in VS](https://learn.microsoft.com/en-us/visualstudio/javascript/linting-javascript?view=vs-2022)
* Visual Studio Code：[ESLint 扩展](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* Brackets：内置和 [Brackets ESLint](https://github.com/brackets-userland/brackets-eslint)

## 构建工具

* Grunt：[grunt-eslint](https://www.npmjs.com/package/grunt-eslint)
* Gulp：[gulp-eslint](https://www.npmjs.com/package/gulp-eslint)
* Mimosa：[mimosa-eslint](https://www.npmjs.com/package/mimosa-eslint)
* Broccoli：[broccoli-eslint](https://www.npmjs.com/package/broccoli-eslint)
* Browserify：[eslintify](https://www.npmjs.com/package/eslintify)
* Webpack：[eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin)
* Rollup：[@rollup/plugin-eslint](https://www.npmjs.com/package/@rollup/plugin-eslint)
* Ember-cli：[ember-cli-eslint](https://www.npmjs.com/package/ember-cli-eslint)
* Sails.js：[sails-hook-lint](https://www.npmjs.com/package/sails-hook-lint)、[sails-eslint](https://www.npmjs.com/package/sails-eslint)
* Start：[@start/plugin-lib-eslint](https://www.npmjs.com/package/@start/plugin-lib-eslint)
* Brunch：[eslint-brunch](https://www.npmjs.com/package/eslint-brunch)

## 命令行工具

* [ESLint Watch](https://www.npmjs.com/package/eslint-watch)
* [Code Climate CLI](https://github.com/codeclimate/codeclimate)
* [ESLint Nibble](https://github.com/IanVS/eslint-nibble)

## 源码控制

* [Git Precommit Hook](https://coderwall.com/p/zq8jlq/eslint-pre-commit-hook)
* [Git pre-commit hook that only lints staged changes](https://gist.github.com/dahjelle/8ddedf0aebd488208a9a7c829f19b9e8)
* [overcommit Git hook manager](https://github.com/brigade/overcommit)
* [Mega-Linter](https://nvuillam.github.io/mega-linter)：CI 限制器聚合、[embedding eslint](https://nvuillam.github.io/mega-linter/descriptors/javascript_eslint/)

## 测试

* Mocha.js：[mocha-eslint](https://www.npmjs.com/package/mocha-eslint)

## 其他集成列表

你可以在 GitHub [awesome-eslint](https://github.com/dustinspecker/awesome-eslint) 仓库中找到其他精选的流行 ESLint 集成列表。
