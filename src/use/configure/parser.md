---
title: 配置解析器
eleventyNavigation:
    key: configure parser
    parent: configure
    title: 配置解析器
    order: 6
---

你可以使用自定义解析器将 JavaScript 代码转换为 ESLint 可以理解的抽象语法树。如果你的代码不适用 ESLint 默认的解析器 Espree 的话，可能就需要添加自定义解析器了。

## 配置自定义解析器

默认情况下，ESLint 使用 [Espree](https://github.com/eslint/espree) 作为解析器。当解析器满足下列条件时，你可以选择在配置文件中指定不同的解析器：

1. 解析器必须是可以加载的 Node 模块，可以在配置文件中使用。通常这意味着你应该 npm 使用单独安装解析器包。
1. 它必须遵守[解析器接口](../../extend/custom-parsers)。

注意即使这些都符合，也不意味着 ESLint 就一定能与外部解析器一起正常工作。ESLint 并不会修复与其他解析器相关的兼容性缺陷。

要指定 npm 模块作为解析，需要在 `.eslintrc` 文件中使用 `parser` 选项指定。比如，下方就指定使用 Esprima 代替 Espree：

```json
{
    "parser": "esprima",
    "rules": {
        "semi": "error"
    }
}
```

下列解析器与 ESLint 兼容：

* [Esprima](https://www.npmjs.com/package/esprima)
* [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) - [Babel](https://babeljs.io) 解析器的包装以便与 ESLint 兼容。
* [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - 将 TypeScript 转换为与 ESTree 格式兼容的解析器，好可以在 ESLint 中使用。

注意当使用自定义解析器时，仍需要使用 `parserOptions` 配置属性以便 ESLint 可以正常使用默认不在 ECMAScript 5 中的特性。解析器都会传递 `parserOptions`，并可能使用或不使用它们来决定启用哪些功能。
