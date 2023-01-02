---
title: 单元测试
eleventyNavigation:
    key: run the tests
    parent: developer guide
    title: 运行测试
    order: 3

---

ESLint 大多数部分都有与之相关的单元测试。单元测试是用 [Mocha](https://mochajs.org/) 编写的，你在为 ESLint 做贡献时需要用到。可以在 `tests` 目录下找到所有的单元测试。

在第一次获得源码时，你需要运行一次 `npm install` 来设置 ESLint 的开发环境。完成后你就可以通过以下方式运行测试：

```shell
npm test
```

它自动启动 Mocha 并运行 `tests` 目录下的所有测试。你只需要添加你的测试，运行测试时会自动选取。

## 运行单个测试

如果你想快速运行一个测试文件，你可以通过直接运行 Mocha 并传入文件名来实现。例如：

```shell
npm run test:cli tests/lib/rules/no-undef.js
```

如果你想只运行一个或一个子集的 `RuleTester` 测试用例，可以在每个测试用例中添加 `only: true`，如果用 `RuleTester.only(...)` 包裹测试用例则会自动添加：

```js
ruleTester.run("my-rule", myRule, {
    valid: [
        RuleTester.only("const valid = 42;"),
        // 其他有效情况
    ],
    invalid: [
        {
            code: "const invalid = 42;",
            only: true,
        },
        // 其他无效的情况
    ]
})
```

当你在处理一个特定的漏洞并迭代解决方案时，就需要运行单个测试。在提交拉动请求前，你需要运行 `npm test`。`npm test` 会使用 Mocha 的 `--forbid-only` 选项来防止 `only` 测试通过完整的测试运行。

## 对单元测试的更多控制

`npm run test:cli` 是 `./node_modules/.bin/mocha` 中的 Mocha cli 对别名。可以提供[选项](https://mochajs.org/#command-line-usage)以帮助更好地控制测试的运行。

`npm test` 中测试的默认超时时长为 10000ms。你可以传递 `ESLINT_MOCHA_TIMEOUT` 环境变量来改变超时时长，例如：

```shell
ESLINT_MOCHA_TIMEOUT=20000 npm test
```
