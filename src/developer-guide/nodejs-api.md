---
title: Node.js API
layout: doc
eleventyNavigation:
    key: node.js api
    parent: developer guide
    title: Node.js API
    order: 9

---

虽然 ESLint 被设计成可以在命令行上运行，但也可以通过 Node.js API 以编程方式使用 ESLint。Node.js API 的目的是允许插件和工具作者直接使用 ESLint 功能，而不需要通过命令行界面。

**注意**：使用 API 的未记录部分，风险自负。只有那些在本文档中特别提到的部分被批准使用，并将保持稳定和可靠。任何没有记录的东西都是不稳定的，可能会在任何时候改变或被删除。

## ESLint 类

`ESLint` 类是在 Node.js 应用程序中使用的主要类。

这个类依赖于 Node.js 的 `fs` 模块和文件系统，所以你不能在浏览器中使用它。如果你想在浏览器上提示代码，请使用 [Linter][linter] 类代替。

下面是一个使用 `ESLint` 类的简单例子：

```js
const { ESLint } = require("eslint");

(async function main() {
  // 1. 创建实例
  const eslint = new ESLint();

  // 2. 检查文件
  const results = await eslint.lintFiles(["lib/**/*.js"]);

  // 3. 格式化结果
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 4. 输出
  console.log(resultText);
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
```

而这里有一个例子，可以自动修复检查出的问题：

```js
const { ESLint } = require("eslint");

(async function main() {
  // 1. 用 `fix` 选项创建实例
  const eslint = new ESLint({ fix: true });

  // 2. 检查文件，这不会修改目标文件
  const results = await eslint.lintFiles(["lib/**/*.js"]);

  // 3. 用固定的代码修改文件
  await ESLint.outputFixes(results);

  // 4. 格式化结果
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 5. 输出
  console.log(resultText);
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
```

### ◆ new ESLint(options)

```js
const eslint = new ESLint(options);
```

创建新的 `ESLint` 实例。

#### 参数

`ESLint` 构造函数接收一个 `options` 对象。如果你省略了 `options` 对象，那么它对所有选项使用默认值。`options` 对象有以下属性：

##### 文件枚举

* `options.cwd`（`string`）<br>
  默认为 `process.cwd()`。工作目录。这必须是一个绝对路径。
* `options.errorOnUnmatchedPattern`（`boolean`）<br>
  默认是 `true`。除非设置为 `false`，否则 [`eslint.lintFiles()`][eslint-lintfiles] 方法在没有找到目标文件时将抛出一个错误。
* `options.extensions`（`string[] | null`）<br>
  默认为 `null`。如果将目录路径传递给 [`eslint.lintFiles()`][eslint-lintfiles] 方法，ESLint 会检查那些目录中具有给定扩展名的文件。例如，当传递 `src/` 目录且 `extensions` 为 `[".js", ".ts"]` 时，ESLint 会 lint `src/` 中的 `*.js` 和 `*.ts` 文件。如果 `extensions` 为 `null`，ESLint 会检查 `*.js` 文件以及与配置中的 `overrides[].files` 模式匹配的文件。<br>**注意**：此选项仅在您传递目录时适用 [`eslint.lintFiles()`][eslint-lintfiles] 方法的路径。如果你传递像 `lib/**/*` 这样的 glob 模式，ESLint 将检查所有匹配 glob 模式的文件，无论扩展名如何。
* `options.globInputPaths`（`boolean`）<br>
  默认为 `true`。如果存在 `false`，则 [`eslint.lintFiles()`][eslint-lintfiles] 方法不会解释 glob 模式。
* `options.ignore`（`boolean`）<br>
  默认为 `true`。如果存在 `false`，则 [`eslint.lintFiles()`][eslint-lintfiles] 方法不尊重配置中的 `.eslintignore` 文件或 `ignorePatterns`。
* `options.ignorePath`（`string | null`）<br>
  默认为 `null`。ESLint 使用的文件路径而不是 `$CWD/.eslintignore`。如果存在路径而文件不存在，则此构造函数将引发错误。

##### 检查

* `options.allowInlineConfig`（`boolean`）<br>
  默认为 `true`。如果 `false` 存在，ESLint 会禁止源代码中的指令注释。如果此选项为 `false`，它会覆盖配置中的 `noInlineConfig` 设置。
* `options.baseConfig`（`ConfigData | null`）<br>
  默认为 `null`。[配置对象]，由与此实例一起使用的所有配置扩展。您可以使用此选项来定义将在您的配置文件未配置时使用的默认设置。
* `options.overrideConfig`（`ConfigData | null`）<br>
  默认为 `null`。[配置对象]，覆盖与此实例一起使用的所有配置。您可以使用此选项来定义将使用的设置，即使您的配置文件对其进行了配置。
* `options.overrideConfigFile`（`string | null`）<br>
  默认为 `null`。配置文件的路径会覆盖与此实例一起使用的所有配置。应用此选项后应用 `options.overrideConfig` 选项。
* `options.plugins`（`Record<string, Plugin> | null`）<br>
  默认为 `null`。ESLint 用于配置的 `plugins` 设置的插件实现。这是一个类似地图的对象。这些键是插件 ID，每个值都是实现。
* `options.reportUnusedDisableDirectives`（`"error" | "warn" | "off" | null`）<br>
  默认为 `null`。报告未使用的 eslint-disable 指令的严重性。如果此选项是一个严重性，它会覆盖配置中的 `reportUnusedDisableDirectives` 设置。
* `options.resolvePluginsRelativeTo`（`string` | `null`）<br>
  默认为 `null`。应该从中解析插件的目录的路径。如果 `null` 存在，ESLint 从包含插件设置的配置文件的位置加载插件。如果存在路径，ESLint 会从那里加载所有插件。
* `options.rulePaths`（`string[]`）<br>
  默认为 `[]`。要从中加载自定义规则的目录路径数组。
* `options.useEslintrc`（`boolean`）<br>
  默认为 `true`。如果 `false` 存在，ESLint 不会加载配置文件（`.eslintrc.*` 文件）。只有构造函数选项的配置是有效的。

##### 自动修复

* `options.fix`（`boolean | (message: LintMessage) => boolean`）<br>
   默认为 `false`。如果存在 `true`，则 [`eslint.lintFiles()`][eslint-lintfiles] 和 [`eslint.lintText()`][eslint-linttext] 方法在自动修复模式下工作。如果存在谓词函数，则这些方法将每个 lint 消息传递给函数，然后仅使用函数为其返回 `true` 的 lint 消息。
* `options.fixTypes`（`("directive" | "problem" | "suggestion" | "layout")[] | null`）<br>
   默认为 `null`。[`eslint.lintFiles()`][eslint-lintfiles] 和 [`eslint.lintText()`][eslint-linttext] 方法用于自动修复的规则类型。

##### 缓存相关

* `options.cache`（`boolean`）<br>
   默认为 `false`。如果是 `true`，则 [`eslint.lintFiles()`][eslint-lintfiles] 方法缓存 lint 结果并在每个目标文件未更改时使用它。请注意，升级 ESLint 插件时 ESLint 不会清除缓存。在这种情况下，您必须手动删除缓存文件。[`eslint.lintText()`][eslint-linttext] 方法不使用缓存，即使您将 `options.filePath` 传递给该方法。
* `options.cacheLocation`（`string`）<br>
   默认是 `.eslintcache`。[`eslint.lintFiles()`][eslint-lintfiles] 方法将缓存写入此文件。
* `options.cacheStrategy`（`string`）<br>
   默认为 `metadata`。用于检测更改文件的缓存策略。可以是 `"metadata"` 或 `"content"`。

### ◆ eslint.lintFiles(patterns)

```js
const results = await eslint.lintFiles(patterns);
```

此方法对匹配 glob 模式的文件进行检查，然后返回结果。

#### 参数

* `patterns`（`string | string[]`）<br>
  lint 的目标文件。这可以包含文件路径、目录路径和 glob 模式中的任何一种。

#### 返回值

*（`Promise<LintResult[]>`）<br>
  将用一个 [LintResult][lintresult] 对象的数组来实现的 Promise。

### ◆ eslint.lintText(code, options)

```js
const results = await eslint.lintText(code, options);
```

该方法对给定的源代码文本进行行测，然后返回结果。

默认情况下，该方法使用适用于当前工作目录下文件的配置（`cwd` 构造函数选项）。如果你想使用不同的配置，传递 `options.filePath`，ESLint 将加载 [`eslint.lintFiles()`][eslint-lintfiles] 对 `options.filePath` 处的文件使用的配置。

如果 `options.filePath` 值被配置为忽略，该方法返回一个空数组。如果 `options.warningIgnored` 选项和 `options.filePath` 选项一起被设置，该方法返回一个 [LintResult][lintresult] 对象。在这种情况下，该结果可能包含一个警告，表明该文件被忽略了。

#### 参数

The second parameter `options` is omittable.

* `code`（`string`）<br>
   要检查的源代码文本。
* `options.filePath`（`string`）<br>
   可选的。源代码文本文件的路径。如果省略，`result.filePath` 变成字符串 `"<text>"`。
* `options.warnIgnored`（`boolean`）<br>
   可选的。如果存在 `true` 并且 `options.filePath` 是 ESLint 应该忽略的文件，则此方法返回包含警告消息的检查结果。

#### 返回值

*（`Promise<LintResult[]>`）<br>
   将通过 [LintResult][lintresult] 对象数组实现的 Promise。这是一个数组（尽管只有一个检查结果），以保持它与 [`eslint.lintFiles()`][eslint-lintfiles] 方法之间的接口相似。

### ◆ eslint.getRulesMetaForResults(results)

```js
const results = await eslint.lintFiles(patterns);
const rulesMeta = eslint.getRulesMetaForResults(results);
```

该方法返回一个对象，其中包含每个在给定的 `results` 中触发 lint 错误的规则的元信息。

#### 参数

* `results`（`LintResult[]`）<br>
  从调用 `ESLint#lintFiles()` 或 `ESLint#lintText()` 返回的 [LintResult][lintresult] 对象的数组。

#### 返回值

*（`Object`）<br>
  一个对象，其属性名称是来自 `results` 的规则 ID，其属性值是规则的元信息（如果有的话）。

### ◆ eslint.calculateConfigForFile(filePath)

```js
const config = await eslint.calculateConfigForFile(filePath);
```

这个方法计算一个给定文件的配置，这对调试很有用。

* 它解析并合并 `extends` 和 `overrides` 设置到顶层配置。
* 它将 `parser` 设置解析为绝对路径。
* 它将 `plugins` 设置规范化，以对齐短名称（如 `eslint-plugin-foo` → `foo`)。
* 如果匹配了一个传统的文件扩展处理器，它会添加 `processor` 设置。
* 它不解释 `env` 设置到 `globals` 和 `parserOptions` 设置，所以结果对象包含 `env` 设置。

#### 参数

* `filePath`（`string`）<br>
  你想计算配置的文件的路径。目录路径是禁止的，因为 ESLint 不能处理 `overrides` 设置。

#### 返回值

*（`Promise<Object>`）<br>
  将用一个配置对象来实现的 Promise。

### ◆ eslint.isPathIgnored(filePath)

```js
const isPathIgnored = await eslint.isPathIgnored(filePath);
```

这个方法检查一个给定的文件是否被你的配置所忽略。

#### 参数

* `filePath`（`string`）<br>
  你想检查的文件的路径。

#### 返回值

*（`Promise<boolean>`）<br>
  将执行的 Promise，即文件是否被忽略。如果文件会被忽略，则它将返回 `true`。

### ◆ eslint.loadFormatter(nameOrPath)

```js
const formatter = await eslint.loadFormatter(nameOrPath);
```

该方法加载一个格式化器。格式化器将检查结果转换为人类或机器可读的字符串。

#### 参数

* `nameOrPath`（`string | undefined`）<br>
   要检查的文件的路径。允许使用以下值：
     * `undefined`。在这种情况下会加载 `"stylish"` 内置格式化程序。
     * [内置格式化程序][builtin-formatters]的名称。
     * [第三方格式化程序][third-party-formatters]的名称。举些例子：
         * `"foo"` 将加载 `eslint-formatter-foo`。
         * `"@foo"` 将加载 `@foo/eslint-formatter`。
         * `"@foo/bar"` 将加载 `@foo/eslint-formatter-bar`。
     * 定义格式化程序的文件路径。路径必须包含一个或多个路径分隔符（`/`）以区分它是否是路径。例如，以 `./` 开头。

#### 返回值

*（`Promise<LoadedFormatter>`）<br>
  将用 [LoadedFormatter][loadedformatter] 对象来实现的 Promise。

### ◆ ESLint.version

```js
const version = ESLint.version;
```

ESLint 的版本字符串。例如：`"7.0.0"`。

这是一个静态属性。

### ◆ ESLint.outputFixes(results)

```js
await ESLint.outputFixes(results);
```

该方法将 ESLint 的自动修复功能所修改的代码写入其各自的文件中。如果任何被修改的文件不存在，这个方法不做任何事情。

这是一个静态方法。

#### 参数

* `results`（`LintResult[]`）<br>
  The [LintResult][lintresult] objects to write.

#### 返回值

*（`Promise<void>`）<br>
  在所有文件写完后将实现的 Promise。

### ◆ ESLint.getErrorResults(results)

```js
const filteredResults = ESLint.getErrorResults(results);
```

该方法复制给定的结果并删除警告。返回值只包含错误。

这是一个静态方法。

#### 参数

* `results`（`LintResult[]`）<br>
  要过滤的 [LintResult][lintresult] 对象。

#### 返回值

*（`LintResult[]`）<br>
  被过滤的 [LintResult][lintresult] 对象。

### ◆ LintResult 类型

`LintResult` 值是每个文件的提示结果的信息。[`eslint.lintFiles()`][eslint-lintfiles] 和 [`eslint.lintText()`][eslint-linttext] 方法返回它。它有以下属性
* `filePath`（`string`）<br>
  此结果文件的绝对路径。如果文件路径未知（当您没有将 `options.filePath` 选项传递给 [`eslint.lintText()`][eslint-linttext] 方法时），这是字符串 `"<text>"`。
* `messages`（`LintMessage[]`）<br>
  [LintMessage] 对象的数组。
* `suppressedMessages`（`SuppressedLintMessage[]`）<br>
  [SuppressedLintMessage] 对象的数组。
* `fixableErrorCount`（`number`）<br>
  `fix` 构造函数选项可以自动修复的错误数。
* `fixableWarningCount`（`number`）<br>
  `fix` 构造函数选项可以自动修复的警告数量。
* `errorCount`（`number`）<br>
  错误的数量。这包括可修复的错误和致命错误。
* `fatalErrorCount`（`number`）<br>
  致命错误的数量。
* `warningCount`（`number`）<br>
  警告的数量。这包括可修复的警告。
* `输出`（`string | undefined`）<br>
  修改后的源代码文本。如果不存在任何可修复的消息，则此属性未定义。
* `source`（`string | undefined`）<br>
  原始源代码文本。如果任何消息不存在或“输出”属性存在，则该属性未定义。
* `usedDeprecatedRules`（`{ ruleId: string; replaceBy: string[] }[]`）<br>
  有关用于检查此文件的已弃用规则的信息。

### ◆ LintMessage 类型

`LintMessage` 值是每个检查错误的信息。[LintResult] 类型的 `messages` 属性包含它。它具有以下属性：

* `ruleId`（`string` | `null`）<br>
  生成此 lint 消息的规则名称。如果此消息是由 ESLint 核心而不是规则生成的，则为 `null`。
* `严重性`（`1 | 2`）<br>
  此消息的严重性。`1` 表示警告，`2` 表示错误。
* `fatal`（`boolean | undefined`）<br>
  `true` 如果这是与规则无关的致命错误，例如解析错误。
* `消息`（`string`）<br>
  错误消息。
* `line`（`number | undefined`）<br>
  此消息开始点的从 1 开始的行号。
* `column`（`number | undefined`）<br>
  此消息开始点的从 1 开始的列号。
* `endLine`（`number | undefined`）<br>
  此消息的结束点的从 1 开始的行号。如果此消息不是范围，则此属性未定义。
* `endColumn`（`number | undefined`）<br>
  此消息结束点的从 1 开始的列号。如果此消息不是范围，则此属性未定义。
* `fix`（`EditInfo | undefined`）<br>
  autofix 的 [EditInfo] 对象。如果此消息不可修复，则此属性未定义。
* `suggestions`（`{ desc: string; fix: EditInfo }[] | undefined`）<br>
  建议清单。每个建议都是用于修复代码的描述和 [EditInfo] 对象的对。编辑器集成等 API 用户可以选择其中之一来修复此消息的问题。如果此消息没有任何建议，则此属性未定义。

### ◆ SuppressedLintMessage 类型

`SuppressedLintMessage` 值是每个抑制的检查错误的信息。[LintResult] 类型的 `suppressedMessages` 属性包含它。它具有以下属性：

* `ruleId`（`string` | `null`）<br>
  与 [LintMessage] 类型中的 `ruleId` 相同。
* `严重性`（`1 | 2`）<br>
  与 [LintMessage] 类型中的 `severity` 相同。
* `fatal`（`boolean | undefined`）<br>
  与 [LintMessage] 类型中的 `fatal` 相同。
* `消息`（`字符串`）<br>
  与 [LintMessage] 类型中的 `message` 相同。
* `line`（`number | undefined`）<br>
  与 [LintMessage] 类型中的 `line` 相同。
* `column`（`number | undefined`）<br>
  与 [LintMessage] 类型中的 `column` 相同。
* `endLine`（`number | undefined`）<br>
  与 [LintMessage] 类型中的 `endLine` 相同。
* `endColumn`（`number | undefined`）<br>
  与 [LintMessage] 类型中的 `endColumn` 相同。
* `fix`（`EditInfo | undefined`）<br>
  与 [LintMessage] 类型中的 `fix` 相同。
* `suggestions`（`{ desc: string; fix: EditInfo }[] | undefined`）<br>
  与 [LintMessage] 类型中的 `suggestions` 相同。
* `suppressions`（`{ kind: string; justification: string}[]`）<br>
  压制清单。每个抑制都是一种类型和一个理由的对。

### ◆ EditInfo 类型

`EditInfo` 值是编辑文本的信息。[LintMessage] 类型的 `fix` 和 `suggestions` 属性包含它。它具有以下属性：

* `range`（`[number, number]`）<br>
  要删除的源代码文本中的一对基于 0 的索引。
* `text`（`string`）<br>
  要添加的文本。

这个编辑信息意味着用 `text` 属性值替换 `range` 属性的范围。这就像 `sourceCodeText.slice(0, edit.range[0])+ edit.text+ sourceCodeText.slice(edit.range[1])`。因此，如果 `range[0]` 和 `range[1]` 的属性值是相同的，那就是添加，如果 `text` 属性值是空字符串，那就是删除。

### ◆ LoadedFormatter 类型

`LoadedFormatter` 值是将 [LintResult][lintresult] 对象转换成文本的对象。eslint.loadFormatter()][eslint-loadformatter] 方法返回它。它有以下方法：

* `format`（`(results: LintResult[], resultsMeta: ResultsMeta) => string | Promise<string>`）<br>
  将 [LintResult] 对象转换为文本的方法。如果设置了 `--max-warnings` 且警告数量达到限制，则`resultsMeta` 对象将包括 `maxWarningsExceeded` 对象。`maxWarningsExceeded` 对象将包括两个属性：值为 `--max-warnings` 选项的 `maxWarnings` 和值为检查出的警告数量的 `foundWarnings`。

---

## SourceCode

`SourceCode`类型表示 ESLint 执行的解析过的源代码。它在 ESLint 内部使用，也可以使用已经解析过的代码。你可以通过传入代表代码的文本字符串和 [ESTree](https://github.com/estree/estree) 格式的抽象语法树（AST）（包括位置信息、范围信息、注释和标记）来创建一个新的 `SourceCode` 的实例：

```js
const SourceCode = require("eslint").SourceCode;

const code = new SourceCode("var foo = bar;", ast);
```

如果 AST 缺少任何所需的信息，`SourceCode` 构造函数会抛出一个错误。

`SourceCode` 构造函数剥离了 Unicode BOM。
请注意 AST 也应该从剥离的文本中解析出来。

```js
const SourceCode = require("eslint").SourceCode;

const code = new SourceCode("\uFEFFvar foo = bar;", ast);

assert(code.hasBOM === true);
assert(code.text === "var foo = bar;");
```

### SourceCode#splitLines()

这是一个关于 `SourceCode` 的静态函数，用于将源代码文本分割成一个行数。

```js
const SourceCode = require("eslint").SourceCode;

const code = "var a = 1;\nvar b = 2;"

// 将代码分割成一个数组
const codeLines = SourceCode.splitLines(code);

/*
    codeLines 的值将是
    [
        "var a = 1;",
        "var b = 2;"
    ]
 */
```

---

## 检查器

`Linter` 对象对 JavaScript 代码进行实际评估。它不做任何文件系统的操作，只是对代码进行解析和报告。特别是，`Linter` 对象不处理配置对象或文件。除非你在浏览器中工作，否则你可能想用 [ESLint 类](#eslint-类) 代替。

`Linter` 是一个构造函数，你可以通过传入你想使用的选项来创建一个新实例。可用的选项有：

* `cwd` - 一个应该被视为当前工作目录的目录的路径。规则可以通过调用 `context.getCwd()` 访问它（见 [上下文对象](./working-with-rules#the-context-object)）。如果 `cwd` 是 `undefined`，如果全局的 `process` 对象被定义（例如，在 Node.js 运行时），它将被规范化为 `process.cwd()`，否则 `undefined`。

比如：

```js
const Linter = require("eslint").Linter;
const linter1 = new Linter({ cwd: 'path/to/project' });
const linter2 = new Linter();
```

在这个例子中，在 `linter1` 上运行的规则在调用 `context.getCwd()` 时将得到 `path/to/project`。
在 `linter2` 上运行的，如果全局的 `process` 对象被定义，将得到 `process.cwd()`，否则将得到 `undefined`（例如在浏览器 <https://eslint.org/demo>）。

### Linter#verify

检查器上最重要的方法是 `verify()`，它启动了对给定文本的提示。这个方法接受三个参数：

* `code` - 要检查的源代码（一个字符串或 `SourceCode` 的实例）。
* `config` - 一个配置对象，已经被 `ESLint` 使用 eslintrc 文件和/或其他配置参数处理并规范化。
    **注意**: 如果你想对文本进行检查，并让你的配置被读取和处理，请使用 [`ESLint#lintFiles()`][eslint-lintfiles] 或 [`ESLint#lintText()`][eslint-linttext] 来代替。
* `options` -（可选）本次运行的附加选项。
    * `filename` -（可选）与源代码相关的文件名。
    * `preprocess` -（可选）[插件中的处理器](/docs/developer-guide/working-with-plugins#processors-in-plugins)文档描述的 `preprocess` 方法。
    * `postprocess` -（可选）[插件中的处理器](/docs/developer-guide/working-with-plugins#processors-in-plugins)文档描述的 `postprocess` 方法的一个函数。
    * `filterCodeBlock` -（可选）一个函数，决定 interlet 应该采用哪些代码块。该函数接收两个参数。第一个参数是一个代码块的虚拟文件名。第二个参数是代码块的文本。如果该函数返回 `true`，那么检查器就采用该代码块。如果该函数被省略，则检查器只采用 `*.js` 的代码块。如果你提供了一个 `filterCodeBlock` 函数，它将覆盖这个默认行为，所以检查器不会自动采用 `*.js` 代码块。
    * `disableFixes` -（可选）当设置为 `true` 时，检查器不对检查结果的 `fix` 或 `suggestions` 属性进行处理。
    * `allowInlineConfig` -（可选）设置为 `false`，禁止内联注释改变 ESLint 规则。
    * `reportUnusedDisableDirectives` -（可选）当设置为 `true` 时，为未使用的 `eslint-disable` 指令添加报告错误，无论如何在禁用区不会有问题被报告。

如果第三个参数是一个字符串，它被解释为 `filename`。

你可以像这样调用 `verify()`：

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

const messages = linter.verify("var foo;", {
    rules: {
        semi: 2
    }
}, { filename: "foo.js" });

// 或使用 SourceCode

const Linter = require("eslint").Linter,
    linter = new Linter(),
    SourceCode = require("eslint").SourceCode;

const code = new SourceCode("var foo = bar;", ast);

const messages = linter.verify(code, {
    rules: {
        semi: 2
    }
}, { filename: "foo.js" });
```

`verify()` 方法返回一个对象数组，该数组包含了关于提示性警告和错误的信息。下面是一个例子：

```js
{
    fatal: false,
    ruleId: "semi",
    severity: 2,
    line: 1,
    column: 23,
    message: "Expected a semicolon.",
    fix: {
        range: [1, 15],
        text: ";"
    }
}
```

每条提示信息的可用信息是：

* `column` - 发生错误的那一列。
* `fatal` - 通常省略，但如果有解析错误（与规则无关），将被设置为 true。
* `line` - 发生错误的那一行。
* `message` - 应该输出的信息。
* `nodeType` - 报告有问题的节点或标记类型。
* `ruleId` - 触发信息的规则的 ID（如果 `fatal` 为真，则为空）。
* `severity` - 1 或 2，取决于你的配置。
* `endColumn` - 发生错误的范围的结束列（如果不是范围，这个属性被省略）。
* `endLine` - 发生错误的范围的结束行（如果不是范围，这个属性被省略）。
* `fix` - 一个描述问题修复的对象（如果没有修复，这个属性被省略）。
* `suggestions` - 一个对象数组，描述可能的 lint 修复方法，供编辑者以编程方式启用（详见 [Working with Rules docs](./working-with-rules#providing-suggestions)）。

你可以通过 `getSuppressedMessages()` 方法获得前一次运行中被抑制的信息。如果没有前一次运行，`getSuppressedMessage()` 将返回一个空列表。

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

const messages = linter.verify("var foo = bar; // eslint-disable-line -- Need to suppress", {
    rules: {
        semi: ["error", "never"]
    }
}, { filename: "foo.js" });
const suppressedMessages = linter.getSuppressedMessages();

console.log(suppressedMessages[0].suppressions); // [{ "kind": "directive", "justification": "Need to suppress" }]
```

提示消息对象有一个废弃的 `source` 属性。这个属性**将在即将发布破坏性版本中从林特信息中移除**。如果你依赖这个属性，你现在应该使用由检查器提供的 `SourceCode` 实例。

你也可以通过使用 `getSourceCode()` 方法来获得 `linter` 内部使用的 `SourceCode` 对象的一个实例：

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

const messages = linter.verify("var foo = bar;", {
    rules: {
        semi: 2
    }
}, { filename: "foo.js" });

const code = linter.getSourceCode();

console.log(code.text);     // "var foo = bar;"
```

通过这种方式，你可以检索到上次运行 `linter.verify()` 时使用的文本和 AST。

### Linter#verifyAndFix()

这个方法与 verify 类似，只是它也运行自动修正逻辑，类似于命令行中的 `--fix` 标志。结果对象将包含自动修正的代码，以及任何未被自动修正的代码的剩余提示信息。

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

const messages = linter.verifyAndFix("var foo", {
    rules: {
        semi: 2
    }
});
```

此方法的输出对象：

```js
{
    fixed: true,
    output: "var foo;",
    messages: []
}
```

可用的信息是：

* `fixed` - 真，如果代码被修复。
* `output` - 固定的代码文本（如果没有应用修复，可能与输入相同）。
* `messages` - 给定代码的所有信息的集合（它的信息与上面 `verify` 块中解释的一样）。

### Linter#defineRule

每个 `Linter` 实例持有一个规则名称到加载规则对象的映射。默认情况下，所有 ESLint 核心规则都被加载。如果你想用自定义规则使用 `Linter`，你应该使用 `defineRule` 方法，按 ID 注册你的规则。

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

linter.defineRule("my-custom-rule", {
    // （ESLint 规则）

    create(context) {
        // ...
    }
});

const results = linter.verify("// some source text", { rules: { "my-custom-rule": "error" } });
```

### Linter#defineRules

这是一个类似于 `Linter#defineRule` 的方便方法，只是它允许你使用一个对象一次性定义许多规则。

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

linter.defineRules({
    "my-custom-rule": { /* ESLint 规则 */ create() {} },
    "another-custom-rule": { /* ESLint 规则 */ create() {} }
});

const results = linter.verify("// some source text", {
    rules: {
        "my-custom-rule": "error",
        "another-custom-rule": "warn"
    }
});
```

### Linter#getRules

该方法返回所有加载规则的 map。

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

linter.getRules();

/*
Map {
  'accessor-pairs' => { meta: { docs: [Object], schema: [Array] }, create: [Function: create] },
  'array-bracket-newline' => { meta: { docs: [Object], schema: [Array] }, create: [Function: create] },
  ...
}
*/
```

### Linter#defineParser

每个 `Linter` 实例都持有一个自定义解析器的映射。如果你想以编程方式定义一个分析器，你可以添加这个函数
第一个参数是解析器的名称，第二个参数是[解析器对象](/docs/developer-guide/working-with-custom-parsers)。默认的 `"espree"` 解析器将已经为每个 `Linter` 实例加载。

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

linter.defineParser("my-custom-parser", {
    parse(code, options) {
        // ...
    }
});

const results = linter.verify("// some source text", { parser: "my-custom-parser" });
```

### Linter#version/Linter.version

每个 `Linter` 实例都有一个 `version` 属性，包含 `Linter`实例所在的 ESLint 的语义版本号。

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

linter.version; // => '4.5.0'
```

还有一个 `Linter.version` 属性，你可以不通过实例化 `Linter` 来读取：

```js
const Linter = require("eslint").Linter;

Linter.version; // => '4.5.0'
```

---

## RuleTester

`eslint.RuleTester` 是一个为 ESLint 规则编写测试的工具。它在内部用于 ESLint 附带的捆绑规则，也可以被插件使用。

使用示例：

```js
"use strict";

const rule = require("../../../lib/rules/my-rule"),
    RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("my-rule", rule, {
    valid: [
        {
            code: "var foo = true",
            options: [{ allowFoo: true }]
        }
    ],

    invalid: [
        {
            code: "var invalidVariable = true",
            errors: [{ message: "Unexpected invalid variable." }]
        },
        {
            code: "var invalidVariable = true",
            errors: [{ message: /^Unexpected.+variable/ }]
        }
    ]
});
```

`RuleTester` 构造函数接受一个可选的对象参数，它可以用来为你的测试案例指定默认值。例如，如果你所有的测试用例都使用 ES2015，你可以把它设置为默认值：

```js
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });
```

`RuleTester#run()` 方法用于运行测试。它应该被传递给以下参数：

* 规则的名称（字符串）
* 规则对象本身（见[“与规则一起工作”](./working-with-rules)）
* 一个包含 `valid` 和 `invalid` 属性的对象，每个属性都是一个包含测试案例的数组。

一个测试用例是一个具有以下属性的对象：

* `name`（字符串，可选）：测试用例的名称，以使其更容易找到。
* `code`（字符串，必需）：该规则应该运行的源代码。
* `options`（数组，可选）: 传递给规则的选项。规则的严重性不应该包括在这个列表中。
* `filename`（字符串，可选）：给定情况下的文件名（对于对文件名进行断言的规则很有用）。
* `only`（布尔值，可选）：在支持的测试框架中专门运行此案例进行调试。

除了上述属性外，无效的测试案例还可以有以下属性：

* `errors`（数字或数组，需要）：断言该规则在此代码上运行时预期产生的错误的一些属性。如果这是一个数字，断言产生的错误的数量。否则，这应该是一个对象的列表，每个对象都包含关于一个报告错误的信息。以下属性可用于一个错误（所有都是可选的）：
    * `message` (字符串/正则)：错误的信息
    * `messageId`（字符串）: 错误的 ID。参见[用 messageId 测试错误](#testing-errors-with-messageid) 了解详情。
    * `data`（对象）: 占位数据，可与 `messageId` 结合使用。
    * `type` (string): 报告的 AST 节点的类型
    * `line`（数字）: 报告位置的基于 1 的行号
    * `column`（数字）: 报告位置的基于 1 的列号
    * `endLine`（数字）: 报告位置结束时的 1 个行号。
    * `endColumn`（数字）：报告位置结束时基于 1 的列号。
    * `suggestions` (array): 一个包含建议细节的对象数组，用于检查。详见[测试建议](#testing-suggestions)

    如果提供一个字符串作为错误，而不是一个对象，该字符串被用来断言错误的 `message`。
* `output`（字符串，如果规则修复了代码，则需要）。断言在使用此规则进行单次自动修复时将产生的输出（例如，使用 `--fix` 命令行标志）。如果这是 `null`，断言没有一个报告的问题是建议自动修正的。

测试用例的任何附加属性将作为配置选项直接传递给 linter。例如，一个测试案例可以有一个 `parserOptions` 属性来配置解析器的行为：

```js
{
    code: "let foo;",
    parserOptions: { ecmaVersion: 2015 }
}
```

如果一个有效的测试用例只使用 `code` 属性，它可以选择性地提供一个包含代码的字符串，而不是一个带有 `code` 键的对象。

### Testing errors with `messageId`

如果被测试的规则使用 `messageId` 你可以在测试用例中使用 `messageId` 属性来断言报告错误的 `messageId` 而不是其 `message`。

```js
{
    code: "let foo;",
    errors: [{ messageId: "unexpected" }]
}
```

对于有占位符的信息，测试用例也可以使用 `data` 属性来额外断言报告错误的 `message`。

```js
{
    code: "let foo;",
    errors: [{ messageId: "unexpected", data: { name: "foo" } }]
}
```

请注意，测试用例中的 `data` 并不断言传递给 `context.report` 的 `data`。相反，它被用来形成预期的消息文本，然后与收到的 `message` 进行比较。

### Testing Suggestions

建议可以通过在错误对象上定义一个 `suggestions` 键来测试。检查建议的选项有以下几个（都是可选的）：

* `desc`（字符串）。建议的 `desc` 值
* `messageId`（字符串）: 对于使用 `messageId` 的建议，建议的 `messageId` 值。
* `data`（对象）: 可与 `messageId` 结合使用的占位数据。
* `output`（字符串）。一个代码字符串，代表对输入代码应用建议修正的结果。

例子：

```js
ruleTester.run("my-rule-for-no-foo", rule, {
    valid: [],
    invalid: [{
        code: "var foo;",
        errors: [{
            suggestions: [{
                desc: "Rename identifier 'foo' to 'bar'",
                output: "var bar;"
            }]
        }]
    }]
})
```

建议测试对象中的 `messageId` 和 `data` 属性与错误测试对象的工作方式相同。详情见 [用 messageId 测试错误](#testing-errors-with-messageid)。

```js
ruleTester.run("my-rule-for-no-foo", rule, {
    valid: [],
    invalid: [{
        code: "var foo;",
        errors: [{
            suggestions: [{
                messageId: "renameFoo",
                data: { newName: "bar" },
                output: "var bar;"
            }]
        }]
    }]
})
```

### 自定义 RuleTester

`RuleTester` 依赖于两个函数来运行测试。`describe` 和 `it`。这些函数可以来自不同的地方：

1. 如果 `RuleTester.describe` 和 `RuleTester.it` 已经被设置为函数值，`RuleTester` 将使用 `RuleTester.describe` 和 `RuleTester.it` 来运行测试。你可以用它来定制 `RuleTester` 的行为，以配合你正在使用的测试框架。

    如果 `RuleTester.itOnly` 被设置为函数值，`RuleTester` 将调用 `RuleTester.itOnly` 而不是 `RuleTester.it` 来运行带有 `only: true` 的 case。如果未设置 `RuleTester.itOnly`，但 `RuleTester.it` 有一个 `only` 的函数属性，`RuleTester` 将回退到 `RuleTester.it.only`。

2. 否则，如果 `describe` 和 `it` 作为 globals 存在，`RuleTester` 将使用 `global.describe` 和 `global.it` 来运行测试，`global.it.only` 来运行 `only: true` 的案例。这使得 `RuleTester` 在使用 [Mocha](https://mochajs.org/) 这样的框架时，无需任何额外的配置就能工作。
3. 否则，`RuleTester#run` 将简单地依次执行所有的测试，如果其中一个测试失败，将抛出一个错误。这意味着你可以简单地使用 `Node.js`执行一个调用 `RuleTester.run` 的测试文件，而不需要一个测试框架。

`RuleTester#run` 调用 `describe` 函数，有两个参数：一个描述规则的字符串和一个回调函数。回调函数调用 `it` 函数，有一个描述测试案例的字符串和一个测试函数。如果测试通过，测试函数将成功返回，如果测试失败，则抛出一个错误。`only` 的签名与 `it` 相同。`RuleTester` 为每个案例调用 `it` 或 `only`，即使有些案例有 `only: true`，测试框架负责实现测试案例的排他性（注意这是使用 [Mocha](https://mochajs.org/) 等框架时测试套件的标准行为；只有当你计划定制 `RuleTester.describe`、`RuleTester.it` 或 `RuleTester.itOnly` 时，这一信息才是相关的）。

定制 `RuleTester` 的例子：

```js
"use strict";

const RuleTester = require("eslint").RuleTester,
    test = require("my-test-runner"),
    myRule = require("../../../lib/rules/my-rule");

RuleTester.describe = function(text, method) {
    RuleTester.it.title = text;
    return method.call(this);
};

RuleTester.it = function(text, method) {
    test(RuleTester.it.title + ": " + text, method);
};

// 然后按文件规定使用 RuleTester

const ruleTester = new RuleTester();

ruleTester.run("my-rule", myRule, {
    valid: [
        // 有效的测试案例
    ],
    invalid: [
        // 无效的测试案例
    ]
})
```

---

[configuration object]: ../user-guide/configuring/
[builtin-formatters]: https://eslint.org/docs/user-guide/formatters/
[third-party-formatters]: https://www.npmjs.com/search?q=eslintformatter
[eslint-lintfiles]: #-eslintlintfilespatterns
[eslint-linttext]: #-eslintlinttextcode-options
[eslint-loadformatter]: #-eslintloadformatternameorpath
[lintresult]: #-lintresult-type
[lintmessage]: #-lintmessage-type
[suppressedlintmessage]: #-suppressedlintmessage-type
[editinfo]: #-editinfo-type
[loadedformatter]: #-loadedformatter-type
