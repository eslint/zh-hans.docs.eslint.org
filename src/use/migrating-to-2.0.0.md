---
title: 迁移至 v2.0.0

---

ESLint v2.0.0 是第二个主要发行版，因此，ESLint 在 0.x 和 1.x 时期的工作方式与今后的工作方式之间有一些重大变化。这些变化都是参考 ESLint 社区用户反馈后产生的，并非没有考虑升级问题。我们相信这些变化能使 ESLint 变得更好，且希望升级并不困难，虽然在升级前需要做些处理，但相信你一定会看到升级带来的好处。

**重要**：如果你正在使用 0.x，请先[迁移至 1.0.0](./migrating-to-1.0.0)。

## 规则模式变更

在规则模式中由一个奇怪地方，如果选项很复杂，你有可能需要在规则模式中说明规则的严重性（0、1 或 2）。这将导致一个模式看起来像是这样：

```js
module.exports = {
    "type": "array",
    "items": [
        {
            "enum": [0, 1, 2]
        },
        {
            "enum": ["always", "never"]
        }
    ],
    "minItems": 1,
    "maxItems": 2
};
```

这让规则开发者感到困惑，因为规则似乎不应该负责验证自己的严重性。所以在 2.0.0 中规则不再需要检查自己的严重性。

**解决方案**：如果你导出了用于检查严重性的规则模式，你需要改几个地方：

1. 从模式中删除严重程度
2. 将 `minItems` 从 1 调节为 0
3. 将 `maxItems` 减去 1

以下是上方模式在正确转换后的样子：

```js
module.exports = {
    "type": "array",
    "items": [
        {
            "enum": ["always", "never"]
        }
    ],
    "minItems": 0,
    "maxItems": 1
};
```

## 移除规则

下列规则都已废弃且被新规则所代替。下面列出了所有移除的规则及其替代品：

* [no-arrow-condition](../rules/no-arrow-condition) 被 [no-confusing-arrow](../rules/no-confusing-arrow) 和 [no-constant-condition](../rules/no-constant-condition) 的组合所代替。同时启用它们两个就可以获得与 `no-arrow-condition` 一致的功能。
* [no-empty-label](../rules/no-empty-label) 被 [no-labels](../rules/no-labels) 搭配 `{"allowLoop": true, "allowSwitch": true}` 选项所代替。
* [space-after-keywords](../rules/space-after-keywords) 被 [keyword-spacing](../rules/keyword-spacing) 所代替。
* [space-before-keywords](../rules/space-before-keywords) 被 [keyword-spacing](../rules/keyword-spacing) 所代替。
* [space-return-throw-case](../rules/space-return-throw-case) 被 [keyword-spacing](../rules/keyword-spacing) 所代替。

**解决方案**：要使用新的规则，你需要更新你的规则配置。如果你使用被移除规则时，ESLint v2.0.0 会发出警告并建议使用相关的替代规则。希望借此减少升级过程中遇到的问题。

## 配置级联变更

在 v2.0.0 之前，如何目录同时包括了 `.eslintrc` 文件和带有 ESLint 配置信息的 `package.json` 文件，二者的设置会进行合并。但在 2.0.0，当二者同时存在时，将只会使用 `.eslintrc.*` 文件中的配置，并忽略 `package.json`。换句话说只有在没有其他 `.eslintrc.*` 文件存在时，`package.json` 中的 ESLint 配置才有用。

**解决方案**：如果你的目录中同时有 `.eslintrc.*` 和带有 ESLint 配置信息的 `package.json`，要把两个配置文件合并成一个。

## 内置全局变量

在 2.0.0 之前，ES6 中的新全局变量作为标准的一部分，被内置于全局环境内，包括了 `Promise`、`Map`、`Set` 和 `Symbol`。但这可能会造成潜在问题，例如，`no-undef` 允许使用 `Promise` 构造函数，但实际上在 ES5 代码中无法使用 Promise。在 2.0.0 中，内置环境将只包括标准的 ES5 全局变量，而 ES6 中新的全局变量已经被移到 `es6` 环境中。

**解决方案**：如果你在写 ES6 代码却还未这样做的话，去启用 `es6` 环境：

```js
// 在 .eslintrc 中
{
    env: {
        es6: true
    }
}

// 或者在配置注释中
/*eslint-env es6*/
```

## 语言选项

在 v2.0.0 之前，要启用语言选项就需要在配置中使用 `ecmaFeatures`。在 2.0.0：

* `ecmaFeatures` 属性现在位于顶级的 `parserOptions` 选项之下.
* 删除了所有 ECMAScript 6 的 `ecmaFeatures` 标志已，转而使用 `parserOptions` 下的 `ecmaVersion` 属性，可以设置为 3、5（默认）或 6。
* `ecmaFeatures.modules` 标志被位于 `parserOptions` 之下的 `sourceType` 属性所取代，它可以被设置为 `"script"`（默认）或是针对 ES6 模块的 `"module"`。

**解决方案**：如果你正在 `ecmaFeatures` 中使用任何 ECMAScript 6 特性标志，那么你需要用 `ecmaVersion: 6` 来代替。ECMAScript 6 特性标志由：

* `arrowFunctions` - 启用[箭头函数](https://leanpub.com/understandinges6/read#leanpub-auto-arrow-functions)
* `binaryLiterals` - 启用[二进制字面量](https://leanpub.com/understandinges6/read#leanpub-auto-octal-and-binary-literals)
* `blockBindings` - 启用 `let` 和 `const`（又名[块级绑定](https://leanpub.com/understandinges6/read#leanpub-auto-block-bindings)）
* `classes` - 启用类
* `defaultParams` - 启用[默认函数参数](https://leanpub.com/understandinges6/read/#leanpub-auto-default-parameters)
* `destructuring` - 启用[解构](https://leanpub.com/understandinges6/read#leanpub-auto-destructuring-assignment)
* `forOf` - 启用 [`for-of` 循环](https://leanpub.com/understandinges6/read#leanpub-auto-iterables-and-for-of)
* `generators` - 启用[生成器](https://leanpub.com/understandinges6/read#leanpub-auto-generators)
* `modules` - 启用模块和全局严格模式
* `objectLiteralComputedProperties` - 启用[绑定对象字面量属性名](https://leanpub.com/understandinges6/read#leanpub-auto-computed-property-names)
* `objectLiteralDuplicateProperties` - 在严格模式启用[重复对象字面量属性](https://leanpub.com/understandinges6/read#leanpub-auto-duplicate-object-literal-properties)
* `objectLiteralShorthandMethods` - 启用[对象字面量速记方法](https://leanpub.com/understandinges6/read#leanpub-auto-method-initializer-shorthand)
* `objectLiteralShorthandProperties` - 启用[对象字面量速记属性](https://leanpub.com/understandinges6/read#leanpub-auto-property-initializer-shorthand)
* `octalLiterals` - 启用[八进制字面量](https://leanpub.com/understandinges6/read#leanpub-auto-octal-and-binary-literals)
* `regexUFlag` - 启用[正则表达式 `u` 标志](https://leanpub.com/understandinges6/read#leanpub-auto-the-regular-expression-u-flag)
* `regexYFlag` - 启用[正则表达式 `y` 标志](https://leanpub.com/understandinges6/read#leanpub-auto-the-regular-expression-y-flag)
* `restParams` - 启用[剩余参数](https://leanpub.com/understandinges6/read#leanpub-auto-rest-parameters)
* `spread` - 启用数组[展开运算符](https://leanpub.com/understandinges6/read#leanpub-auto-the-spread-operator)
* `superInFunctions` - 启用在函数内引用 `super`
* `templateStrings` - 启用[模板字符串](https://leanpub.com/understandinges6/read/#leanpub-auto-template-strings)
* `unicodeCodePointEscapes` - 启用[代码点转义](https://leanpub.com/understandinges6/read/#leanpub-auto-escaping-non-bmp-characters)

如果你正在使用这些标志，比如说：

```js
{
    ecmaFeatures: {
        arrowFunctions: true
    }
}
```

那么你需要使用 `ecmaVersion` 启用 ES6：

```js
{
    parserOptions: {
        ecmaVersion: 6
    }
}
```

如果你正在 `ecmaFeatures` 中使用非 ES6 标志，你需要把这些东西移动到 `parserOptions` 里。比如：

```js
{
    ecmaFeatures: {
        jsx: true
    }
}
```

然后把 `ecmaFeatures` 移动到 `parserOptions` 下面：

```js
{
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
    }
}
```

如果你正在像这样使用 `ecmaFeatures.modules` 启用 ES6 模块支持：

```js
{
    ecmaFeatures: {
        modules: true
    }
}
```

```js
{
    parserOptions: {
        sourceType: "module"
    }
}
```

此外, 如果你在规则外使用 `context.ecmaFeatures`，那么你将需要用以下几种方式更新代码：

1. 如果你正在使用像 `context.ecmaFeatures.blockBindings` 这样的 ES6 特性标志， 重写并检查 `context.parserOptions.ecmaVersion > 5`。
2. 如果你正在使用 `context.ecmaFeatures.modules`，重写并检查 Program 节点的 `sourceType` 属性值为 `"module"`。
3. 如果你正在使用像 `context.ecmaFeatures.jsx` 这样的非 ES6 特性标志，重写并检查 `context.parserOptions.ecmaFeatures.jsx`。

如果你的插件有个规则正在使用 RuleTester，那么你需要更新传递给使用 `ecmaFeatures` 的规则的选项。举个例子：

```js
var ruleTester = new RuleTester();
ruleTester.run("no-var", rule, {
    valid: [
        {
            code: "let x;",
            parserOptions: { ecmaVersion: 6 }
        }
    ]
});
```

如果你没有在插件或自定义/插件规则和测试中使用 `ecmaFeatures`，那什么也不需要改。

## `"eslint:recommended"` 新的规则

```json
{
    "extends": "eslint:recommended"
}
```

在 2.0.0，`"eslint:recommended"` 新增了以下 11 个规则：

* [constructor-super](../rules/constructor-super)
* [no-case-declarations](../rules/no-case-declarations)
* [no-class-assign](../rules/no-class-assign)
* [no-const-assign](../rules/no-const-assign)
* [no-dupe-class-members](../rules/no-dupe-class-members)
* [no-empty-pattern](../rules/no-empty-pattern)
* [no-new-symbol](../rules/no-new-symbol)
* [no-self-assign](../rules/no-self-assign)
* [no-this-before-super](../rules/no-this-before-super)
* [no-unexpected-multiline](../rules/no-unexpected-multiline)
* [no-unused-labels](../rules/no-unused-labels)

**解决方案**：如果你不想管这些规则，你可以简单地把它们统统禁用了。

```json
{
    "extends": "eslint:recommended",
    "rules": {
        "no-case-declarations": 0,
        "no-class-assign": 0,
        "no-const-assign": 0,
        "no-dupe-class-members": 0,
        "no-empty-pattern": 0,
        "no-new-symbol": 0,
        "no-self-assign": 0,
        "no-this-before-super": 0,
        "no-unexpected-multiline": 0,
        "no-unused-labels": 0,
        "constructor-super": 0
    }
}
```

## 范围分析更改

我们在范围分析中发现了一些需要解决的漏洞。具体来说就是我们没有用所有方式来判断一个全局变量是否已经定义了。

一开始 `Variable` 对象和 `Reference` 对象会相互引用的：

* `Variable#references` 属性是引用了变量的 `Reference` 对象数组
* `Reference#resolved` 属性是被引用的 `Variable` 对象

但直到 1.x，以下的这些变量和引用属性中都有错误的空值：

* 全局声明的 `var`。
* 全局声明的 `function`。
* 配置文件中定义的变量。
* 在 `/* global */` 注释中定义的变量。

现在，这些变量和引用属性有了正确的值。

`Scope#through` 属性引用了值为 `null` 的 `Reference#resolved`。这导致了一系列变化，`Scope#through` 属性的值也发生了改变。

**解决方案**：如果你使用 `Scope#through` 来寻找哪些地方引用了内置的全局变量，你需要做以下几个改变。

比如在 1.x 版本中，你可以这样定位 `window` 全局变量。

```js
var globalScope = context.getScope();
globalScope.through.forEach(function(reference) {
    if (reference.identifier.name === "window") {
        checkForWindow(reference);
    }
});
```

这是一种迂回的查找变量方式，因为它是 ESLint 完成后再添加的。`window` 变量位于 `Scope#through` 内，因为无法找不到定义。

而在 2.0.0，`window` 不再位于 `Scope#through` 中，因为我们已经添加了正确的声明。这意味着你可以直接引用 `window` 对象（或任何其他全局对象）。所以前面的示例会变成这样：

```js
var globalScope = context.getScope();
var variable = globalScope.set.get("window");
if (variable) {
    variable.references.forEach(checkForWindow);
}
```

进一步阅读：<https://estools.github.io/escope/>

## `eslint:recommended` 的默认值更改

如果你在 `extends` 中使用 `eslint:recommended` 并使用 [`no-multiple-empty-lines`] 或 [`func-style`] 则会受此影响，比如说：

```json
{
    "extends": "eslint:recommended",
    "rules": {
        "no-multiple-empty-lines": 2,
        "func-style": 2
    }
}
```

`no-multiple-empty-lines` 规则默认没有预期行为，但在 ESLint `1.x` 的 `eslint:recommended` 默认值有了默认行为，因此最多允许有两个空行。

`func-style` 规则默认配置为 `"expression"`，但在 ESLint `1.x` 的 `eslint:recommended` 中默认值却是 `"declaration"`。

ESLint 2.0.0删除了这些冲突的默认值，因此你可能开始看到与这些规则有关的提示错误。

**解决方案**：如果你想要维持之前的行为模式，更新配置中的 `no-multiple-empty-lines` 并添加 `{"max": 2}`，然后把 `func-style` 改为 `"declaration"`。举个例子：

```json
{
    "extends": "eslint:recommended",
    "rules": {
        "no-multiple-empty-lines": [2, {"max": 2}],
        "func-style": [2, "declaration"]
    }
}
```

[`no-multiple-empty-lines`]: ../rules/no-multiple-empty-lines
[`func-style`]: ../rules/func-style

## SourceCode 构造函数（Node API）更改

`SourceCode` 构造函数用于处理 Unicode BOM。
如果第一个参数 `text` 有 BOM，`SourceCode` 构造函数会将 `this.hasBOM` 设置为 `true` 并剥离文本中的 BOM。

```js
var SourceCode = require("eslint").SourceCode;

var code = new SourceCode("\uFEFFvar foo = bar;", ast);

assert(code.hasBOM === true);
assert(code.text === "var foo = bar;");
```

所以也应该从剥离的文本中解析第二个参数 `ast`。

**解决方案**：如果你正在代码中使用 `SourceCode` 构造函数，请在剥离 BOM 后解析源码：

```js
var ast = yourParser.parse(text.replace(/^\uFEFF/, ""), options);
var sourceCode = new SourceCode(text, ast);
```

## 规则变更

* [`strict`](../rules/strict) - 默认为 `"safe"`（之前的默认值是 `"function"`）

## 插件不再有默认配置

在 v2.0.0 之前，插件可以指定 `rulesConfig`。当用户使用插件时，`rulesConfig` 将自动启用, 这与 ESLint 在习惯做法相反（在默认情况下不启用任何东西）。为了使插件的行为保持一致，我们不再支持插件中 `rulesConfig`。

**解决方案**：如果你正在配置文件中使用插件，你需要手动启用插件规则。
