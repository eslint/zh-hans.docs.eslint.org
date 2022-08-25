---
title: 提示 
---

提示消息有三种不同的类型：警告、提示、重要提示。

## 用法

每个类型的提示都有简码，使用时需要提供“了解更多”的文本和链接。

```html
{ % warning "x.xx 版本移除了此规则", "/link/to/learn/more" % }

{ % tip "善意提示，可以做点什么", "/link/to/learn/more" % }

{ % important "x.xx 版本废弃了此规则", "/link/to/learn/more" % }
```

## 示例

{% warning "警告文本", "/" %}
{% tip "提示文本", "/" %}
{% important "文本", "/" %}
