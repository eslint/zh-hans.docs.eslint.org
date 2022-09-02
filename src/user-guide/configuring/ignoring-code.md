---
title: Ignoring Code
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/user-guide/configuring/ignoring-code.md
eleventyNavigation:
    key: ignoring code
    parent: configuring
    title: Ignoring Code
    order: 5

---

## 配置文件中的 `ignorePatterns`

你可以在你的配置文件中使用 `ignorePatterns` 来告诉 ESLint 忽略特定的文件和目录。`ignorePatterns` 模式遵循与 `.eslintignore` 相同的规则。参见[`.eslintignore` 文档](./ignoring-code#the-eslintignore-file)了解更多内容。

```json
{
    "ignorePatterns": ["temp.js", "**/vendor/*.js"],
    "rules": {
        //...
    }
}
```

* `ignorePatterns` 中的 glob 模式是相对于配置文件所在的目录而言的。
* 你不能在 `overrides` 属性中使用 `ignorePatterns` 属性。
* 在 `.eslintignore` 中定义的模式优先于配置文件的 `ignorePatterns` 属性。

如果 glob 模式以 `/` 开头，该模式是相对于配置文件的基本目录而言的。例如，`lib/.eslintrc.json` 中的 `/foo.js` 会匹配 `lib/foo.js`，而不是匹配`lib/subdir/foo.js`。

如果配置是通过 `--config` CLI 选项提供的，配置中以 `/` 开头的忽略模式是相对于当前工作目录的，而不是给定配置的基本目录。例如，如果使用 `--config configs/.eslintrc.json`，配置中的忽略模式是基于 `.` 而不是 `./configs`。

## `.eslintignore` 文件

你可以通过在项目的根目录下创建 `.eslintignore` 文件来告诉 ESLint 要忽略哪些文件和目录。`.eslintignore` 文件是一个纯文本文件，其中每一行都是一个 glob 模式，表示哪些路径应该被省略掉。例如，下面的内容将忽略所有的 JavaScript 文件：

```text
**/*.js
```

当运行 ESLint 时，在决定要检查的文件范围前，它会在当前工作目录中寻找 `.eslintignore` 文件。如果找到该文件，那么在遍历目录时就会应用这些偏好。每次只能使用一个 `.eslintignore` 文件，且仅会使用当前工作目录中的 `.eslintignore` 文件。

Glob 使用 [node-ignore](https://github.com/kaelzhang/node-ignore) 进行匹配，因此有许多特性：

* 以 `#` 开头的行被视为注释，不影响忽略模式。
* 路径是相对于当前工作目录的。这也适用于通过 `--ignore-pattern`[命令](../command-line-interface#--ignore-pattern)传递的路径。
* 前面有 `!` 的行是否定模式，重新包括被先前模式忽略的模式。
* 忽略模式的行为与 `.gitignore` [规范](https://git-scm.com/docs/gitignore)一致。

特别要注意的是，像 `.gitignore` 文件一样，所有用作 `.eslintignore` 和 `--ignore-pattern` 的模式的路径必须使用正斜杠作为路径分隔符。

```text
# Valid
/root/src/*.js

# Invalid
\root\src\*.js
```

请参阅 [`.gitignore`](https://git-scm.com/docs/gitignore) 的规范，了解更多有效的语法实例。

除了 `.eslintignore` 文件中的任何模式外，ESLint 总是遵循一些隐含的忽略规则，即使通过了 `--no-ignore` 标志。这些隐含的规则如下：

* 忽略 `node_modules/`
* 忽略点文件（除了 `.eslintrc.*`），以及点文件夹和它们的内容

这些规则也有一些例外：

* 如果要检查的路径是一个 glob 模式或目录路径，并且是点文件夹，则检查所有点文件和点文件夹，包括目录结构深处的点文件和点文件夹。

  例如，`eslint .config/` 将对 `.config` 目录下的所有点文件夹和点文件进行检查，包括一级子目录以及在目录结构中更深的子目录。

* 如果要检查的路径是一个特定的文件路径，并且通过了 `--no-ignore` 标志，ESLint 将检查该文件，而不考虑隐含的忽略规则。

  例如，`eslint .config/my-config-file.js --no-ignore` 将检查 `my-config-file.js`。需要注意的是，同样的命令如果没有 `--no-ignore` 行，就不会对 `my-config-file.js`文件进行检测。

* 通过 `--ignore-pattern` 或 `.eslintignore` 指定的 Allowlist 和 denylist 规则会优先于隐含的忽略规则。

  例如，在这种情况下，`.build/test.js` 是允许列表的理想文件。因为默认忽略了所有点文件夹及其子文件，`.build` 必须首先要处于允许列表中，这样 eslint 才会知道它的子文件。然后，`.build/test.js` 必须被明确地列入允许列表，而其余的内容则被拒绝列表。这可以通过以下 `.eslintignore` 文件完成：

  ```text
  # Allowlist 'test.js' in the '.build' folder
  # But do not allow anything else in the '.build' folder to be linted
  !.build
  .build/*
  !.build/test.js
  ```

  与下面的 `--ignore-pattern` 一样：

  ```shell
  eslint --ignore-pattern '!.build' --ignore-pattern '.build/*' --ignore-pattern '!.build/test.js' parent-folder/
  ```

## 使用替代文件

如果你想使用一个不同于当前工作目录中的 `.eslintignore` 的文件，你可以在命令行中使用 `--ignore-path` 选项来指定它。比如你也可以使用 `.jshintignore` 文件，因为它们格式一样：

```shell
eslint --ignore-path .jshintignore file.js
```

You can also use your `.gitignore` file:

```shell
eslint --ignore-path .gitignore file.js
```

任何遵循标准忽略文件格式的文件都可以被使用。请记住，指定 `--ignore-path` 意味着任何现有的 `.eslintignore` 文件将不会被使用。注意 `.eslintignore`中的 glob 规则遵循 `.gitignore` 中的规则。

## package.json 中的 eslintIgnore

如果没找到 `.eslintignore` 文件，也没有指定替代文件，ESLint 将在 package.json 中寻找 `eslintIgnore` 键获取要忽略检查的文件。

```json
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "env": {
            "browser": true,
            "node": true
        }
    },
    "eslintIgnore": ["hello.js", "world.js"]
}
```

## 忽略文件警告

当你把目录传给 ESLint 时，文件和目录都被默默地忽略了。如果你把一个特定的文件传给 ESLint，那么你会看到警告，表明该文件被跳过。比如假设你有一个 `.eslintignore` 文件，像是这样：

```text
foo.js
```

然后你运行：

```shell
eslint foo.js
```

你就会看到此警告：

```text
foo.js
  0:0  warning  File ignored because of a matching ignore pattern. Use "--no-ignore" to override.

✖ 1 problem (0 errors, 1 warning)
```

这条信息的出现是因为 ESLint 不确定你是否真的要对该文件进行忽略处理。正如该信息所示，你可以使用 `--no-ignore` 来省略忽略规则。

考虑另一种情况，你可能想在某个特定的点文件或点文件夹上运行 ESLint，但忘了在 `.eslintignore` 文件中特别允许这些文件。你想要运行：

```shell
eslint .config/foo.js
```

你就会看到此警告：

```text
.config/foo.js
  0:0  warning  File ignored by default.  Use a negated ignore pattern (like "--ignore-pattern '!<relative/path/to/filename>'") to override

✖ 1 problem (0 errors, 1 warning)
```

出现这个消息是因为在通常情况下，这个文件会被 ESLint 的隐式忽略规则所忽略（如上所述）。在 `.eslintignore` 文件中否定的忽略规则将覆盖隐含的规则，并重新包含这个文件进行检测。此外，在这个特定的案例中，`--no-ignore` 也可以用来对文件进行提示。
