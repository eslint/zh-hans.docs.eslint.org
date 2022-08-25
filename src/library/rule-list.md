---
title: 规则列表
---

规则列表宏由 `components/rule-list.macro.html` 所定义。此宏接受规则名称列表并将其渲染成用逗号分隔的链接。

## 用法

{% raw %}

```html
<!-- 导入宏 -->
{% from 'components/rule-list.macro.html' import ruleList %}

<!-- 使用宏 -->
{{ ruleList({ rules: ['accessor-pairs', 'no-undef'] }) }}
```

{% endraw %}

## 示例

{% from 'components/rule-list.macro.html' import ruleList %}

{{ ruleList({ rules: ['accessor-pairs', 'no-undef'] }) }}
