---
title: 正确和错误的代码用例
---

为了表示正确和错误的代码用例，可以分别给代码块添加上正确和错误的图标。

## 用大

要表示一个代码块正确与否，需要将代码块包裹在标有 `correct` 或 `incorrect` 的容器中。

请确保 markdown 代码块上下都有留空，这样才能正确渲染。

```text
::: correct

`` `js
function() {
    const another = [];
}
`` `
:::

::: incorrect

`` `js
function() {
    const another = [];
}
`` `
:::
```

## 示例

正确用例：

::: correct

```js
const { ESLint } = require("eslint");

(async function main() {
  // 1. 创建带有 `fix` 选项的实例
  const eslint = new ESLint({ fix: true });

  // 2. 检查文件，但并不会对目标文件进行修改
  const results = await eslint.lintFiles(["lib/**/*.js"]);

  // 3. 用修复后的代码替换之
  await ESLint.outputFixes(results);

  // 4. 格式化结果
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 5. 输出结果
  console.log(resultText);
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
```

:::

错误用例：

::: incorrect

```js
const { ESLint } = require("eslint");

(async function main() {
  // 1. 创建带有 `fix` 选项的实例
  const eslint = new ESLint({ fix: true });

  // 2. 检查文件，但并不会对目标文件进行修改
  const results = await eslint.lintFiles(["lib/**/*.js"]);

  // 3. 用修复后的代码替换之
  await ESLint.outputFixes(results);

  // 4. 格式化结果
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 5. 输出结果
  console.log(resultText);
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
```

:::
