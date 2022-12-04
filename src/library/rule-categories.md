---
title: 规则类型
---

## 多个规则类型

规则类型即规则页面中的“推荐（recommended）”、“可修复（fixable）”和“有建议（hasSuggestions）”。它们都使用 `ruleCategories` 宏进行渲染（从 `/components/rule-categories.macro.html` 中导入）。每种类型都有对应的独立宏。

```html
{ % from 'components/rule-categories.macro.html' import ruleCategories % }

{ { ruleCategories({
        recommended: true,
        fixable: true,
        hasSuggestions: true
}) } }
```

### 示例

{% from 'components/rule-categories.macro.html' import ruleCategories, recommended, fixable, hasSuggestions %}

{{ ruleCategories({
        recommended: true,
        fixable: true,
        hasSuggestions: true
}) }}

## 单个规则类型

对于每条规则，你可以使用对应的类型简码渲染其所属类别：

```html
{ % recommended % }
{ % fixable % }
{ % hasSuggestions % }
```

## 示例

{% recommended %}
{% fixable %}
{% hasSuggestions %}
