---
title: no-restricted-globals
rule_type: suggestion
related_rules:
- no-restricted-properties
- no-restricted-syntax
---

如果你想通过启用环境来允许一组全局变量的使用，但又想禁止某些全局变量的使用，那么禁止使用特定的全局变量就很有用。
变量，但仍想禁止其中一些变量的使用。

例如，早期的 Internet Explorer 版本将当前的 DOM 事件作为一个全局变量 `event` 暴露出来，但使用这个变量在很长一段时间内被认为是一种不好的做法。限制不要将确保此变量用于浏览器代码中。

## 规则细节

这个规则允许你指定你不想在你的应用程序中使用的全局变量名称。

## 选项

这条规则接受一个字符串列表，其中每个字符串是一个要限制的全局变量。

```json
{
    "rules": {
        "no-restricted-globals": ["error", "event", "fdescribe"]
    }
}
```

另外，规则也接受对象，其中指定了全局名称和一个自定义信息的选项。

```json
{
    "rules": {
        "no-restricted-globals": [
            "error",
            {
                "name": "event",
                "message": "Use local parameter instead."
            },
            {
                "name": "fdescribe",
                "message": "Do not commit fdescribe. Use describe instead."
            }
        ]
    }
}
```

使用 `"event"、"fdescribe"` 全局变量名的**错误**示例：

::: incorrect

```js
/*global event, fdescribe*/
/*eslint no-restricted-globals: ["error", "event", "fdescribe"]*/

function onClick() {
    console.log(event);
}

fdescribe("foo", function() {
});
```

:::

使用此规则与 `"event"` 全局变量名的**正确**示例：

::: correct

```js
/*global event*/
/*eslint no-restricted-globals: ["error", "event"]*/

import event from "event-module";
```

:::

::: correct

```js
/*global event*/
/*eslint no-restricted-globals: ["error", "event"]*/

var event = 1;
```

:::

使用此规则与 `"event"` 全局变量名及自定义错误信息的**错误**示例：

::: incorrect

```js
/*global event*/
/* eslint no-restricted-globals: ["error", { name: "event", message: "Use local parameter instead." }] */

function onClick() {
    console.log(event);    // Unexpected global variable 'event'. Use local parameter instead.
}
```

:::
