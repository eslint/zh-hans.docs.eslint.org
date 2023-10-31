---
title: no-process-env
rule_type: suggestion
further_reading:
- https://stackoverflow.com/questions/5869216/how-to-store-node-js-deployment-settings-configuration-files
- https://blog.benhall.me.uk/2012/02/storing-application-config-data-in/
---

此规则于 ESLint v7.0.0 中废弃，请使用 [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n) 中的对应规则代替。

Node.js 中的 `process.env` 对象是用来存储部署/配置参数的。在一个项目中丢弃它可能会导致维护问题，因为它是另一种全局依赖。因此，它可能导致多用户设置中的合并冲突和多服务器设置中的部署问题。相反，最好的做法之一是在一个单一的配置/设置文件中定义所有这些参数，可以在整个项目中访问。

## 规则细节

这条规则的目的是阻止使用 `process.env` 来避免全局依赖。因此，只要使用 `process.env`，它就会发出警告。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-process-env: "error"*/

if(process.env.NODE_ENV === "development") {
    //...
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-process-env: "error"*/

var config = require("./config");

if(config.env === "development") {
    //...
}
```

:::

## 何时不用

如果你喜欢在整个项目中使用 `process.env` 来检索环境变量的值，你可以安全地禁用此规则。
