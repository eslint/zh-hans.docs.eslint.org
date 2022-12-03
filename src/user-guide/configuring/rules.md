---
title: 规则
layout: doc
eleventyNavigation:
    key: configuring rules
    parent: configuring
    title: 规则配置
    order: 3

---

## 规则配置

ESLint 有大量的内置规则，你可以通过插件添加更多的规则。你也可以通过配置注释或配置文件来修改你的项目使用哪些规则。要改变一个规则的设置，你必须把规则的 ID 设置为这些值之一。

* `"off"` 或 `0` - 关闭规则
* `"warn"` 或 `1` - 启用并视作警告（不影响退出）。
* `"error"` 或 `2` - 启用并视作错误（触发时退出代码为 1）

### 使用配置注释

要使用配置注释在文件中配置规则，请使用以下格式的注释：

```js
/* eslint eqeqeq: "off", curly: "error" */
```

在这个例子中，关闭 [`eqeqeq`](../../rules/eqeqeq)，启用 [`curly`](../../rules/curly) 并视作错误。你也可以使用数字等价物来表示规则的严重程度。

```js
/* eslint eqeqeq: 0, curly: 2 */
```

这个例子与上一个例子相同，只是它使用了数字代码而不是字符串值。关闭 `eqeqeq` 规则，`curly` 规则设置为错误。

如果一个规则有额外的选项，你可以使用数组字面的语法来指定它们，比如：

```js
/* eslint quotes: ["error", "double"], curly: 2 */
```

这个注释为 [`quotes`](../../rules/quotes) 规则指定了“双重”选项。数组中的第一项总是规则的严重程度（数字或字符串）。

配置注释可以包括描述，以解释为什么注释是必要的。描述必须出现在配置之后，并以两个或多个连续的 `-` 字符与配置分开。比如。

```js
/* eslint eqeqeq: "off", curly: "error" -- Here's a description about why this configuration is necessary. */
```

```js
/* eslint eqeqeq: "off", curly: "error"
    --------
    Here's a description about why this configuration is necessary. */
```

```js
/* eslint eqeqeq: "off", curly: "error"
 * --------
 * This will not work due to the line above starting with a '*' character.
 */
```

### 使用配置文件

要在配置文件中配置规则，请使用 `rules` 键和一个错误级别以及任何你想使用的选项。比如：

```json
{
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"]
    }
}
```

而在 YAML 中则是：

```yaml
---
rules:
  eqeqeq: off
  curly: error
  quotes:
    - error
    - double
```

要配置一个定义在插件中的规则，你必须在规则的 ID 前加上插件的名称和 `/`。比如说：

```json
{
    "plugins": [
        "plugin1"
    ],
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"],
        "plugin1/rule1": "error"
    }
}
```

而在 YAML 中则是：

```yaml
---
plugins:
  - plugin1
rules:
  eqeqeq: 0
  curly: error
  quotes:
    - error
    - "double"
  plugin1/rule1: error
```

在这些配置文件中，规则`plugin1/rule1`来自名为 `plugin1` 的插件。你也可以在配置注释中使用这种格式，比如：

```js
/* eslint "plugin1/rule1": "error" */
```

**注意**：当从插件中指定规则时，确保省略 `eslint-plugin-`。ESLint 只在内部使用无前缀的名字来定位规则。

## 禁用规则

### 使用配置注释

要在你的文件中暂时禁用规则警告，可以使用以下格式的块状注释：

```js
/* eslint-disable */

alert('foo');

/* eslint-enable */
```

你还可以禁用或启用特定规则的警告：

```js
/* eslint-disable no-alert, no-console */

alert('foo');
console.log('bar');

/* eslint-enable no-alert, no-console */
```

**注意**：`/* eslint-enable */` 没有列出任何特定的规则将导致所有被禁用的规则被重新启用。

要禁用整个文件中的规则警告，在文件的顶部写入 `/* eslint-disable */` 块注释：

```js
/* eslint-disable */

alert('foo');
```

你还可以在整个文件范围内禁用或启用特定规则：

```js
/* eslint-disable no-alert */

alert('foo');
```

为了确保永远不会使用一个规则（无论未来是否会有任何启用/禁用行）：

```js
/* eslint no-alert: "off" */

alert('foo');
```

要禁用某一特定行的所有规则，请使用以下格式之一的行或块注释：

```js
alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');

/* eslint-disable-next-line */
alert('foo');

alert('foo'); /* eslint-disable-line */
```

要禁用某一特定行的特定规则：

```js
alert('foo'); // eslint-disable-line no-alert

// eslint-disable-next-line no-alert
alert('foo');

alert('foo'); /* eslint-disable-line no-alert */

/* eslint-disable-next-line no-alert */
alert('foo');
```

要禁用一个特定行的多个规则：

```js
alert('foo'); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert('foo');

alert('foo'); /* eslint-disable-line no-alert, quotes, semi */

/* eslint-disable-next-line no-alert, quotes, semi */
alert('foo');

/* eslint-disable-next-line
  no-alert,
  quotes,
  semi
*/
alert('foo');
```

上述所有方法也适用于插件规则。比如，要禁用 `eslint-plugin-example` 的 `rule-name` 规则，将插件的名称（`example`）和规则的名称（`rule-name`）合并为 `example/rule-name`：

```js
foo(); // eslint-disable-line example/rule-name
foo(); /* eslint-disable-line example/rule-name */
```

配置注释可以包括说明，以解释为什么注释是必要的。描述必须在配置之后，并且需要用两个或多个连续的 `-` 字符与配置分开。比如：

```js
// eslint-disable-next-line no-console -- Here's a description about why this configuration is necessary.
console.log('hello');

/* eslint-disable-next-line no-console --
 * Here's a very long description about why this configuration is necessary
 * along with some additional information
**/
console.log('hello');
```

**注意**：禁用文件一部分的警告的注释告诉 ESLint 不要报告被禁用的代码违反规则。然而，ESLint 仍然解析整个文件，所以禁用的代码仍然需要是语法上有效的 JavaScript。

### 使用配置文件

要在配置文件中禁用一组文件的规则，请使用 `overrides` 键和 `files` 键。比如：

```json
{
  "rules": {...},
  "overrides": [
    {
      "files": ["*-test.js","*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}
```

### 禁用内联注释

要禁用所有内联配置注释，请使用 `noInlineConfig` 设置。比如：

```json
{
  "rules": {...},
  "noInlineConfig": true
}
```

这个设置类似于 [--no-inline-config](../command-line-interface#--no-inline-config) CLI 选项。

#### 报告未用 `eslint-disable` 注释

要报告未使用的 `eslint-disable` 注释，使用 `reportUnusedDisableDirectives` 设置。比如：

```json
{
  "rules": {...},
  "reportUnusedDisableDirectives": true
}
```

这个设置类似于 [--report-unused-disable-directives](../command-line-interface#--report-unused-disable-directives) CLI 选项，但不会使检查失败（严重程度为 `"warn"`）。
