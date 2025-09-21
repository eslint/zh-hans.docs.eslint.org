---
title: no-irregular-whitespace
rule_type: problem
further_reading:
- https://es5.github.io/#x7.2
- https://web.archive.org/web/20200414142829/http://timelessrepo.com/json-isnt-a-javascript-subset
- https://codepoints.net/U+1680
---

无效或不规则的空白会导致 ECMAScript 5 解析器出现问题，也会使代码更难调试，其性质与混合制表符和空格相似。

程序员可能会错误地输入各种空白字符，例如复制或键盘快捷键。例如，在 macOS 上按下 Alt + Space，就会输入一个不间断的空格字符。

解决这个问题的一个简单方法是，从头开始重写违规的一行。这也可能是文本编辑器带来的问题：如果重写该行不能解决这个问题，可以尝试使用不同的编辑器。

已知这些空格引起的问题：

* 欧甘空格（Ogham Space Mark）
    * 作为有效的标记分隔符，但在多数字体中会显示为可见字形，这在源代码中可能造成误导。
* 蒙古语元音分隔符
    * 自 Unicode 6.3 起不再被视为空格分隔符。若将其替代常规标记分隔符使用，当前解析器将报语法错误。
* 行分隔符与段落分隔符
    * 这些字符始终是有效的空白字符和行终止符，但在 ECMAScript 2019 之前被视为字符串字面量中的非法字符。
* 零宽度空格
    * 不被认为是标记的分隔符，通常被解析为 `Unexpected token ILLEGAL`
    * 在现代浏览器中不显示，使得代码库软件有望解决可视化的问题。

在 JSON 中，本规则所列为非标准空格的字符均不得出现在字符串之外。

## 规则细节

这条规则的目的是捕捉非正常制表符和空格的无效空白。这些字符中的一些可能会在现代浏览器中引起问题，而另一些则是一个需要发现的调试问题。

该规则不允许使用以下字符，但选项允许的情况除外。

```text
\u000B - Line Tabulation (\v) - <VT>
\u000C - Form Feed (\f) - <FF>
\u00A0 - No-Break Space - <NBSP>
\u0085 - Next Line
\u1680 - Ogham Space Mark
\u180E - Mongolian Vowel Separator - <MVS>
\ufeff - Zero Width No-Break Space - <BOM>
\u2000 - En Quad
\u2001 - Em Quad
\u2002 - En Space - <ENSP>
\u2003 - Em Space - <EMSP>
\u2004 - Three-Per-Em
\u2005 - Four-Per-Em
\u2006 - Six-Per-Em
\u2007 - Figure Space
\u2008 - Punctuation Space - <PUNCSP>
\u2009 - Thin Space
\u200A - Hair Space
\u200B - Zero Width Space - <ZWSP>
\u2028 - Line Separator
\u2029 - Paragraph Separator
\u202F - Narrow No-Break Space
\u205f - Medium Mathematical Space
\u3000 - Ideographic Space
```

## 选项

次规则有一个对象选项，用于处理例外情况：

* `"skipStrings": true`（默认值）允许在字符串字面中使用任何空白字符
* `"skipComments": true` 允许在注释中使用任何空白字符
* `"skipRegExps": true` 允许在正则表达式中使用任何空格字符
* `"skipTemplates": true` 允许在模板字面量中使用任何空白字符
* `"skipJSXText": true` 允许在 JSX 文本中使用任何空白字符

### skipStrings

使用此规则与默认的 `{ "skipStrings": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint no-irregular-whitespace: "error"*/

var thing = function() /*<NBSP>*/{
    return 'test';
}

var thing = function( /*<NBSP>*/){
    return 'test';
}

var thing = function /*<NBSP>*/(){
    return 'test';
}

var thing = function ᠎/*<Ogham Space Mark>*/(){
    return 'test';
}

var thing = function() {
    return 'test'; /*<ENSP>*/
}

var thing = function() {
    return 'test'; /*<NBSP>*/
}

var thing = function() {
    // Description <NBSP>: some descriptive text
}

/*
Description <NBSP>: some descriptive text
*/

var thing = function() {
    return / <NBSP>regexp/;
}

/*eslint-env es6*/
var thing = function() {
    return `template <NBSP>string`;
}
```

:::

使用此规则与默认的 `{ "skipStrings": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-irregular-whitespace: "error"*/

var thing = function() {
    return ' <NBSP>thing';
}

var thing = function() {
    return '​<ZWSP>thing';
}

var thing = function() {
    return 'th <NBSP>ing';
}
```

:::

### skipComments

该规则与 `{ "skipComments": true }` 选项的额外**正确**示例：

::: correct

```js
/*eslint no-irregular-whitespace: ["error", { "skipComments": true }]*/

function thing() {
    // Description <NBSP>: some descriptive text
}

/*
Description <NBSP>: some descriptive text
*/
```

:::

### skipRegExps

使用此规则与额外的 `{ "skipRegExps": true }` 选项的**正确**示例：

::: correct

```js
/*eslint no-irregular-whitespace: ["error", { "skipRegExps": true }]*/

function thing() {
    return / <NBSP>regexp/;
}
```

:::

### skipTemplates

使用此该规则与额外的 `{ "skipTemplates": true }` 选项的正确示例：

::: correct

```js
/*eslint no-irregular-whitespace: ["error", { "skipTemplates": true }]*/
/*eslint-env es6*/

function thing() {
    return `template <NBSP>string`;
}
```

:::

### skipJSXText

使用此规则与 `{ "skipJSXText": true }` 选项的其他**正确**示例：

::: correct { "ecmaFeatures": { "jsx": true } }

```jsx
/*eslint no-irregular-whitespace: ["error", { "skipJSXText": true }]*/
/*eslint-env es6*/

function Thing() {
    return <div>text in JSX</div>; // <NBSP> before `JSX`
}
```

:::

## 何时不用

如果你决定要在你的应用程序中使用除制表符和空格之外的空白，那么你就需要在字符串之外使用空白。
