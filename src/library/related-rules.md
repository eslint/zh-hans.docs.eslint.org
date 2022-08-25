---
title: 相关规则 
---

可以使用 `related_rules` 简码添加一个或多个相关规则。

## 用法

使用该简码需要提供包含规则名称的数组。

```html
{ % related_rules ["no-extra-semi", "no-unexpected-multiline", "semi-spacing"] % }
```

## 示例

{% related_rules ["no-extra-semi", "no-unexpected-multiline", "semi-spacing"] %}
