---
title: 命令行
layout: doc
edit_link: https://github.com/eslint/eslint/edit/main/docs/src/user-guide/command-line-interface.md
eleventyNavigation:
    key: command line interface
    parent: user guide
    title: 命令行
    order: 3

---

你需要先安装 Node.js，然后方可根据[入门指南](getting-started)中的说明安装 ESLint。

用户大多会像这样在命令行中用 [`npx`](https://docs.npmjs.com/cli/v8/commands/npx) 运行 ESLint：

```shell
npx eslint [options] [file|dir|glob]*
```

比如：

```shell
# 检查两个文件
npx eslint file1.js file2.js

# 检查多个文件
npx eslint lib/**
```

请注意 glob 是由 shell 进行展开的,所以匹配结果将因你的 shell 及其配置不同而有所不同。如果想使用 node 的 `glob` 语法，则必须按如下所示添加引号（如需用于 Windows，则应使用双引号）：

```shell
npx eslint "lib/**"
```

**注意**：你也可以使用其他包管理器运行 ESLint，如 [Yarn](https://yarnpkg.com/) 或 [pnpm](https://pnpm.io/)。但请参考各自的包管理器文档以了解正确语法。

## 选项

此命令行工具提供了几个选项，可以运行 `npx eslint -h` 进行查看。

```text
eslint [options] file.js [file.js] [dir]

Basic configuration:
  --no-eslintrc                   Disable use of configuration from .eslintrc.*
  -c, --config path::String       Use this configuration, overriding .eslintrc.* config options if present
  --env [String]                  Specify environments
  --ext [String]                  Specify JavaScript file extensions
  --global [String]               Define global variables
  --parser String                 Specify the parser to be used
  --parser-options Object         Specify parser options
  --resolve-plugins-relative-to path::String  A folder where plugins should be resolved from, CWD by default

Specifying rules and plugins:
  --plugin [String]               Specify plugins
  --rule Object                   Specify rules
  --rulesdir [path::String]       Load additional rules from this directory. Deprecated: Use rules from plugins

Fixing problems:
  --fix                           Automatically fix problems
  --fix-dry-run                   Automatically fix problems without saving the changes to the file system
  --fix-type Array                Specify the types of fixes to apply (directive, problem, suggestion, layout)

Ignoring files:
  --ignore-path path::String      Specify path of ignore file
  --no-ignore                     Disable use of ignore files and patterns
  --ignore-pattern [String]       Pattern of files to ignore (in addition to those in .eslintignore)

Using stdin:
  --stdin                         Lint code provided on <STDIN> - default: false
  --stdin-filename String         Specify filename to process STDIN as

Handling warnings:
  --quiet                         Report errors only - default: false
  --max-warnings Int              Number of warnings to trigger nonzero exit code - default: -1

Output:
  -o, --output-file path::String  Specify file to write report to
  -f, --format String             Use a specific output format - default: stylish
  --color, --no-color             Force enabling/disabling of color

Inline configuration comments:
  --no-inline-config              Prevent comments from changing config or rules
  --report-unused-disable-directives  Adds reported errors for unused eslint-disable directives

Caching:
  --cache                         Only check changed files - default: false
  --cache-file path::String       Path to the cache file. Deprecated: use --cache-location - default: .eslintcache
  --cache-location path::String   Path to the cache file or directory
  --cache-strategy String         Strategy to use for detecting changed files in the cache - either: metadata or content - default: metadata

Miscellaneous:
  --init                          Run config initialization wizard - default: false
  --env-info                      Output execution environment information - default: false
  --no-error-on-unmatched-pattern  Prevent errors when pattern is unmatched
  --exit-on-fatal-error           Exit with exit code 2 in case of fatal error - default: false
  --debug                         Output debugging information
  -h, --help                      Show help
  -v, --version                   Output the version number
  --print-config path::String     Print the configuration for the given file
```

部分选项支持通过复用选项或指定逗号隔开的列表以传入数组（但 `--ignore-pattern` 除外，其无法使用二式）。

示例：

```shell
npx eslint --ext .jsx --ext .js lib/

npx eslint --ext .jsx,.js lib/
```

### 基本配置

#### `--no-eslintrc`

不使用 `.eslintrc.*` 和 `package.json` 文件中的配置。

示例：

```shell
npx eslint --no-eslintrc file.js
```

#### `-c`, `--config`

此项用于在原有的 ESLint 配置上额外新增配置（详见 [ESLint 配置](configuring/)）。

示例：

```shell
npx eslint -c ~/my-eslint.json file.js
```

该例中的配置文件位于 `~/my-eslint.json`。

如果 `.eslintrc.*` 和 `package.json` 文件中也由配置内容（即没有指定 `--no-eslintrc`）则将其合并。其中此文件配置项优先级高于 `.eslintrc.*` 和 `package.json` 配置项。

#### `--env`

此项可用于启用特定的环境。关于各环境所定义的全局变量的细节可参见[指定环境](configuring/language-options#specifying-environments)文档。此项仅用于启用环境，它不能用于禁用其他配置文件中设置的环境。若要指定多个环境，请用逗号隔开或复用该项。

示例：

```shell
npx eslint --env browser,node file.js
npx eslint --env browser --env node file.js
```

#### `--ext`

此项用于指定 ESLint 在目录中匹配目标文件所用扩展。
默认情况下，ESLint 会搜索 `*.js` 文件及与配置中 `overrides` 条目所匹配的文件。

示例：

```shell
# 仅 .ts 扩展
npx eslint . --ext .ts

# 同时使用 .js 和 .ts
npx eslint . --ext .js --ext .ts

# 也是同时使用 .js 和 .ts
npx eslint . --ext .js,.ts
```

**注意**：`--ext` 只适用于参数为目录的情况。若使用匹配模式或指定文件名，则忽略 `--ext`。

如 `npx eslint lib/* --ext .js` 则将匹配 `lib/` 目录下的所有文件，无论其扩展名如何。

#### `--global`

此项定义了全局变量，这样 `no-undef` 规则就不会将其标记为 undefined。默认情况下任何指定的全局变量都为只读变量，但在变量名称后面加上 `:true` 就允许写入了。要指定多个全局变量，请用逗号隔开或者复用此项。

示例：

```shell
npx eslint --global require,exports:true file.js
npx eslint --global require --global exports:true
```

#### `--parser`

此项用于指定 ESLint 所用解析器，默认使用 `espree`。

#### `--parser-options`

此项用于指定 ESLint 使用的解析器选项。注意解析器有哪些选项是由所用解析器决定的。

示例：

```shell
echo '3 ** 4' | npx eslint --stdin --parser-options=ecmaVersion:6 # 解析错误，失败
echo '3 ** 4' | npx eslint --stdin --parser-options=ecmaVersion:7 # 耶！成功
```

#### `--resolve-plugins-relative-to`

修改插件文件夹读取位置。默认情况下，插件基于当前工作目录解析。当插件是由非终端用户所安装，且必须项目与插件有强依赖性时，可使用此项。示例：

* 当使用位于当前项目之外的配置文件时（使用 `--config` 标志），如果该配置使用的插件是在本地安装的，`--resolve-plugins-relative-to` 应该被设置为包含该配置文件的目录。
* 若集成对 ESLint 和一组插件有依赖性，并且该工具代表用户用预设的配置调用 ESLint，该工具应将 `--resolve-plugins-relative-to` 设置为该工具的顶级目录。

### 指定规则与插件

#### `--plugin`

此项指定要加载的插件。你可以省略插件名称中的前缀 `eslint-plugin-`。

在使用插件前，你必须先用 npm 安装它。

示例：

```shell
npx eslint --plugin jquery file.js
npx eslint --plugin eslint-plugin-mocha file.js
```

#### `--rule`

此项指定了要使用的规则。这些规则将与配置文件中指定的规则合并（你可以使用 `--no-eslintrc` 来禁用这种行为）。要定义多个规则，用逗号隔开或者复用该项。也可以使用 [levn](https://github.com/gkz/levn#levn--) 格式指定规则。

如果规则是由插件定义的，你必须在规则的 ID 前加上插件的名称和 `/`。

示例：

```shell
npx eslint --rule 'quotes: [error, double]'
npx eslint --rule 'guard-for-in: error' --rule 'brace-style: [error, 1tbs]'
npx eslint --rule 'jquery/dollar-sign: error'
```

#### `--rulesdir`

**已废弃**：可使用插件中的规则代替。

此项用于指定另一个目录，从那里加载规则文件。你可以在运行时动态地加载新规则。适用于有不适合与 ESLint 捆绑的定制规则的情况。

示例：

```shell
npx eslint --rulesdir my-rules/ file.js
```

你的自定义规则目录中的规则必须遵循与捆绑规则相同的格式才能正常工作。你也可以通过包含多个 `--rulesdir` 选项为自定义规则指定多个位置。

```shell
npx eslint --rulesdir my-rules/ --rulesdir my-other-rules/ file.js
```

请注意，与核心规则和插件规则一样，你仍然需要在配置中或通过 `--rule` 命令行选项启用规则，以便确实运行了这些规则。使用 `--rulesdir` 指定规则目录并不会自动启用该目录下的规则。

### 修复问题

#### `--fix`

此项指示 ESLint 尝试修复尽可能多的问题。这些修复是对实际文件本身进行的，只有剩余的未修复的问题才会被输出。不是所有的问题都可以用此项来修复，在这些情况下，此项不起作用：

1. 当代码通过 pipe 传递给 ESLint 时会抛出错误。
2. 此项对使用处理器的代码没有影响，除非处理器选择了允许自动修复。

如果你想从 `stdin` 中修正代码，或者想在不实际写入文件的情况下进行修正，请使用 [`--fix-dry-run`](#--fix-dry-run) 项。

#### `--fix-dry-run`

此项与 `--fix` 的效果相同，但有一点不同：修复后的代码不会保存在文件系统中。这使得从 `stdin` 中修复代码成为可能（当与 `--stdin` 标志一起使用时）。

因为默认的格式不输出固定的代码，你必须使用另一种格式（如 `json`）来获得固定的内容。这里有该模式的示例：

```shell
getSomeText | npx eslint --stdin --fix-dry-run --format=json
```

此标志适用于需要命令行进行自动修复却不保存到文件系统的集成（例如编辑器插件）。

#### `--fix-type`

此项用于在使用 `--fix` 或 `--fix-dry-run` 时指定应用的修复类型。四种修复类型有：

1. `problem` - 修复代码中的潜在错误
2. `suggestion` - 改进代码
3. `layout` - 修复不改变程序结构（AST）的问题
4. `directive` - 修复内联指令，如 `// eslint-disable`。

你可以在命令行上指定一个或多个修复类型。这里有一些示例：

```shell
npx eslint --fix --fix-type suggestion .
npx eslint --fix --fix-type suggestion --fix-type problem .
npx eslint --fix --fix-type suggestion,layout .
```

如果你使用另一个程序来格式化你的代码，但你仍然希望 ESLint 应用其他类型的修正，则可使用此项。

### 忽略文件

#### `--ignore-path`

此项用于指定一个文件作为 `.eslintignore`。ESLint 默认在当前工作目录下寻找 `.eslintignore`。你可以通过指定其他文件的路径来覆盖取代默认地址。

示例：

```shell
npx eslint --ignore-path tmp/.eslintignore file.js
npx eslint --ignore-path .gitignore file.js
```

#### `--no-ignore`

禁止根据配置文件中的 `.eslintignore`、`--ignore-path`、`--ignore-pattern` 和 `ignorePatterns` 属性排除文件。

示例：

```shell
npx eslint --no-ignore file.js
```

#### `--ignore-pattern`

此项用于指定要忽略文件的匹配模式（在 `.eslintignore` 的基础上）。你可以重复该项以提供多个匹配。支持的语法与 `.eslintignore` [文件](configuring/ignoring-code#the-eslintignore-file)相同，它使用的模式与 `.gitignore`[规范](https://git-scm.com/docs/gitignore)相同。你应该加上引号以避免 shell 对 glob 模式的解释。

示例：

```shell
npx eslint --ignore-pattern '/lib/' --ignore-pattern '/src/vendor/*' .
```

### 使用 stdin

#### `--stdin`

此项告诉 ESLint 从 STDIN 而非文件中读取和检查源码。你可以用它来给 ESLint 传递代码。

示例：

```shell
cat myfile.js | npx eslint --stdin
```

#### `--stdin-filename`

此项用于指定文件来处理 STDIN。适用于需要处理来自 STDIN 的文件且有依赖于文件名的规则的情况。

示例：

```shell
cat myfile.js | npx eslint --stdin --stdin-filename=myfile.js
```

### 处理警告

#### `--quiet`

此项用于关闭警告报告。若启用此项，则 ESLint 将只报告错误。

示例：

```shell
npx eslint --quiet file.js
```

#### `--max-warnings`

此项用于指定警告阈值，若项目中有太多违反警告级别规则的情况，可以用它来强制 ESLint 以错误状态退出。

通常情况下，如果 ESLint 运行后没有发现错误（只有警告），它将以成功退出状态退出。然而若指定 `--max-warnings` 且总警告数大于给定阈值，则 ESLint 将以错误状态退出。指定阈值为 `-1` 或省略此项将阻止这种行为。

示例：

```shell
npx eslint --max-warnings 10 file.js
```

### 输出

#### `-o`, `--output-file`

将报告写入文件。

示例：

```shell
npx eslint -o ./test/test.html
```

将输出给定格式至指定文件内。

#### `-f`, `--format`

该选项指定了控制台输出格式。可选格式有：

* [checkstyle](formatters/#checkstyle)
* [compact](formatters/#compact)
* [html](formatters/#html)
* [jslint-xml](formatters/#jslint-xml)
* [json](formatters/#json)
* [junit](formatters/#junit)
* [stylish](formatters/#stylish)（默认值）
* [tap](formatters/#tap)
* [unix](formatters/#unix)
* [visualstudio](formatters/#visualstudio)

示例：

```shell
npx eslint -f compact file.js
```

你也可以在命令行中指定格式化程序文件的路径，以使用自定义格式化程序。

示例：

```shell
npx eslint -f ./customformat.js file.js
```

无论是否有 `eslint-formatter-` 前缀，都会解析通过 npm 安装的格式化程序。

示例：

```shell
npm install eslint-formatter-pretty

npx eslint -f pretty file.js

// 等同于：
npx eslint -f eslint-formatter-pretty file.js
```

将输出给定格式至控制台。如果你想把输出保存到文件中，你可以在命令行中这样做：

```shell
npx eslint -f compact file.js > results.txt
```

输出结果将保存到 `results.txt` 文件中。

#### `--color`, `--no-color`

此项强制启用/禁用颜色渲染。你可以用它来覆盖默认的行为，即启用颜色渲染，除非没有检测到 TTY，如当通过 `cat` 或 `less` 管道输送 `eslint` 时。

示例：

```shell
npx eslint --color file.js | cat
npx eslint --no-color file.js
```

### 行内配置注释

#### `--no-inline-config`

此项可以阻止像 `/*eslint-disable*/` 或
 `/*global foo*/` 这样的内联注释产生任何影响。这允许你设置一个 ESLint
配置，而不需要对它进行文件修改。所有内联的配置注释都会被忽略，如：

* `/*eslint-disable*/`
* `/*eslint-enable*/`
* `/*global*/`
* `/*eslint*/`
* `/*eslint-env*/`
* `// eslint-disable-line`
* `// eslint-disable-next-line`

示例：

```shell
npx eslint --no-inline-config file.js
```

#### `--report-unused-disable-directives`

此项会 ESLint 让报告使用像 `// eslint-disable-line` 这样的本来就没有报错的指令性注释。通过清理不再适用的 `eslint-disable` 注释，有助于避免未来的错误被抑制。

**警告**：当使用此项时，每当 ESLint 或自定义规则升级后，就可能会报告新的错误。例如，假设规则有问题，它报告了一个错误，然后人们添加 `eslint-disable` 注释来抑制错误报告。当规则错误在 ESLint 的补丁版本中被修复，`eslint-disable` 注释就失效了，因为 ESLint 不再报告假错误。若使用 `report-unused-disable-directives` 选项，这将会报告有未使用指令。

示例：

```shell
npx eslint --report-unused-disable-directives file.js
```

### 缓存

#### `--cache`

存储已处理文件的信息，以便只操作发生更改的文件。缓存默认存储在 `.eslintcache` 中。启用此项可以保证只处理修改过的文件，从而极大地缩短 ESLint 的运行时间。

**注意**：当你先用 `--cache` 运行 ESLint，然后在没有 `--cache` 的情况下运行 ESLint，`.eslintcache` 文件会被删除。这是因为检查的结果可能会改变，并导致 `.eslintcache` 失效。若想控制缓存文件被删除的时机，可以使用 `--cache-location` 为缓存文件指定备用位置。

**注意**：自动修复的文件不会存储于缓存中。在后续的检查如果没有再次触发自动修正，才会将它放在缓存里。

#### `--cache-file`

缓存文件的路径。如果没有指定 `.eslintcache` 将被使用。该文件将在执行 `eslint` 命令的目录下创建。**已废弃**：使用 `--cache-location` 代替。

#### `--cache-location`

缓存位置的路径。可以是一个文件或一个目录。如果没有指定位置，则使用 `.eslintcache`。在这种情况下将在执行 `eslint` 命令的目录下创建文件。

如果指定了一个目录，一个缓存文件将在指定的文件夹内创建。该文件的名称将基于当前工作目录（CWD）的哈希值。`.cache_hashOfCWD`。

**重要提示**：如果缓存的目录不存在，请确保在 \*nix 系统中添加尾部的 `/`，在  Windows 中添加 `\`。否则路径将识别为文件。

示例：

```shell
npx eslint "src/**/*.js" --cache --cache-location "/Users/user/.eslintcache/"
```

#### `--cache-strategy`

用于检测文件是否变更的缓存策略。可以是 `metadata` 或 `content`。如果没有指定策略，将使用 `metadata`。

`content` 策略在文件的修改时间改变但内容没有改变的情况下很有用。例如，这可能发生在 git 操作中，如 git 克隆，因为 git 不跟踪文件的修改时间。

示例：

```shell
npx eslint "src/**/*.js" --cache --cache-strategy content
```

### 杂项

#### `--init`

此项将运行 `npm init @eslint/config` 来启动配置初始化向导。新用户回答几个问题就可快速创建 `.eslintrc` 文件，并选择一个流行的风格指南。

配置将创建于当前目录。

#### `--env-info`

此项输出关于执行环境的信息，包括 Node、npm 的版本，以及 ESLint 的本地和全局安装。ESLint 团队可能会要求提供这些信息以帮助解决 bug。

#### `--no-error-on-unmatched-pattern`

此项可以防止在带引号的 glob 匹配或 `--ext` 未成功匹配时出现错误。当你的 shell 不能匹配 glob 时，此项无法阻止错误。

#### `--exit-on-fatal-error`

此项使 ESLint 在发生一个或多个致命的解析错误时以退出代码 2 退出。如果没有此项，致命的解析错误会被报告为违反规则。

#### `--debug`

该选项将调试信息输出到控制台。当你看到一个问题并很难找出它时，这个信息是很有用的。ESLint 团队可能会要求提供这些调试信息以帮助解决错误。
在 ESLint 的命令行中加入这个标志，以便在命令运行时获得额外的调试信息（比如 `npx eslint --debug test.js` 就等同于 `npx eslint test.js --debug`）。

#### `-h`, `--help`

输出帮助菜单并显示所有可用选项。若此项存在，则忽略其他选项。

#### `-v`, `--version`

输出当前的 ESLint 版本至控制台。若此项存在，则忽略其他选项。

#### `--print-config`

输出用于传递的文件的配置。若此项存在，则不进行提示，仅与配置相关的选项才有效。

示例：

```shell
npx eslint --print-config file.js
```

## 不限制某些文件

 ESLint 支持 `.eslintignore` 文件，当 ESLint 对一个目录进行操作时，将文件排除在检查过程之外。作为个别命令行参数的文件将被排除在外。`.eslintignore` 文件是一个纯文本文件，每行包含一个模式。它可以位于目标目录的任何一个祖先目录中；它将影响其包含目录中的文件以及所有子目录。下面是一个 `.eslintignore` 文件的简单例子。

```text
temp.js
**/vendor/*.js
```

你可以在[忽略代码](configuring/ignoring-code)中找到更加详细的 ESLint 默认忽略的匹配模式和目录。

## 退出码

当对文件进行检查时，ESLint 将以下方任一代码退出：

* `0`: 检查通过，没有任何错误。若 `--max-warnings` 标志为 `n`，则最多允许有 `n` 个警告。
* `1`: 着色成功，但至少有一个错误或有超过 `--max-warnings` 项的警告数。
* `2`: 由于配置问题或内部错误，检查失败。
