---
title: 规则 
---

规则组件宏定义于 `/components/rule.macro.html`。该宏参数支持传入用于渲染的规则列表。

一个规则要有：

* 名词
* 描述
* 表明被废弃还是被删除的标志：`deprecated` 和 `removed`
* replacedBy 值，表示其所代替的规则（如果适用）
* 类型对象，表示该规则的类型

## 用法

```html
<!-- 导入宏 -->
{ % from 'components/rule.macro.html' import rule % }

<!-- 使用宏 -->
 { { rule({
    name: "rule-name",
    deprecated: true, // or removed: true
    replacedBy: "name-of-replacement-rule"
    description: 'Example: Enforce `return` statements in getters.',
    categories: {
        recommended: true,
        fixable: true,
        hasSuggestions: false
    }
}) } }
```

## 示例

{% from 'components/rule.macro.html' import rule %}

 {{ rule({
    name: "getter-return",
    deprecated: true,
    description: 'Enforce `return` statements in getters.',
    categories: {
        recommended: true,
        fixable: true,
        hasSuggestions: false
    }
}) }}

 {{ rule({
    name: "getter-return",
    removed: true,
    description: 'Enforce `return` statements in getters.',
    replacedBy: "other-rule-here",
    categories: {
        recommended: true,
        fixable: true,
        hasSuggestions: false
    }
}) }}

{{ rule({
    name: "getter-return",
    deprecated: false,
    description: 'Enforce `return` statements in getters.',
    categories: {
        recommended: true,
        fixable: false,
        hasSuggestions: false
    }

}) }}
