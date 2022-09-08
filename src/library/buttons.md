---
title: 按钮 
---

{% from 'components/button.macro.html' import button %}

有三种类型的按钮：主要、次要和透明。可以使用按钮样式使按钮或链接看起来像按钮。

为了应用合适的语义元素，需要提供预期行为：`action` 或 `link` 值。如果按钮执行动作，则会被渲染为“按钮”。如果按钮链接到别的地方，则会渲染为 `<a>`。

按钮宏默认为 `link`，它会渲染成看起来像按钮的 <code>&lt;a&gt;</code> 标记。如果将 `behavior` 的值设为 `action`，则表明它是执行操作的按钮，因此呈现为 `<button type="button">`。

## 用法

```html

<!-- 在想要渲染按钮的页面导入宏 -->
{% from 'components/button.macro.html' import button %}

<!-- 使用宏 -->

{ { button({ behavior: "action", type: "primary", text: "做点什么" }) } }

<!-- 默认行为：link -->
{ { button({ type: "primary", text: "去别的地方", url: "/url/to/somewhere/" }) } }
```

## 示例

{{ button({ behavior: "action", type: "主要" }) }}
{{ button({ behavior: "action", text: "我要执行操作", type: "secondary" }) }}
{{ button({ behavior: "action", text: "我要执行操作", type: "ghost" }) }}

{{ button({ type: "primary", text: "我要链接到别的地方", url: "#" }) }}
{{ button({ type: "secondary", text: "次级按钮", url:"#" }) }}
{{ button({ type: "ghost", text: "透明按钮", url:"#" }) }}
