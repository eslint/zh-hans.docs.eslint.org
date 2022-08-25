---
layout: main.html
title: 版本
permalink: /versions/
hook: "versions-page"
---

{%- from 'components/hero.macro.html' import hero %}

{{ hero({
    title: "ESLint 版本",
    supporting_text: "选择文档版本"
}) }}

<section class="versions-section section">
    <div class="content-container">
        <nav aria-labelledby="versions-label">
            {% include 'partials/versions-list.html' %}
        </nav>
    </div>
</section>
