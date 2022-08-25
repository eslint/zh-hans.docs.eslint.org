---
layout: main.html
title: 语言
permalink: /languages/
hook: "languages-page"
---

{%- from 'components/hero.macro.html' import hero %}

{{ hero({
    title: "语言",
    supporting_text: "选择你的语言"
}) }}

<section class="languages-section section">
    <div class="content-container">
        <nav aria-labelledby="languages-label">
            {% include 'partials/languages-list.html' %}
        </nav>
    </div>
</section>
