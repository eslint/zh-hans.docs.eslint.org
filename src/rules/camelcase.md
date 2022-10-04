---
title: camelcase
layout: doc
rule_type: suggestion
---

当涉及到变量的命名时，风格指南通常分为两个阵营：驼峰（`variableName`）和下划线（`variable_name`）。这条规则的重点是使用骆驼大写的方法。如果你的风格指南要求对你的变量名称使用驼峰大写，那么这条规则就是为你准备的。

## 规则细节

该规则寻找源代码中的任何下划线（`_`）。它忽略了前面和后面的下划线，只检查变量名称中间的下划线。如果 ESLint 认为该变量是一个常量（所有大写字母），那么就不会产生警告。否则，就会有一个警告。这条规则只标记定义和赋值，不标记函数调用。在 ES6 的 `import` 语句中，这条规则只针对将被导入到本地模块范围的变量名称。

## 选项

此规则选项为对象：

* `"properties": "always"`（默认值）执行属性名称的骆驼大写风格。
* `"properties": "never"` 不检查属性名称
* `"ignoreDestructuring": false`（默认值）对非结构化的标识符执行驼峰大写风格。
* `"ignoreDestructuring": true` 不检查非结构化标识符（但仍然检查代码中以后对这些标识符的使用）。
* `"ignoreImports": false`（默认值）对 ES2015 导入执行骆驼大写风格。
* `"ignoreImports": true` 不检查 ES2015 导入（但仍然检查在代码除函数参数外的任何地方使用导入）。
* `"ignoreGlobals": false`（默认值）对全局变量执行骆驼大写风格。
* `"ignoreGlobals": true` 不对全局变量执行骆驼大写风格。
* `allow`（`string[]`）支持的属性列表，支持正则。

### properties: "always"

使用此规则与默认的 `{ "properties": "always" }` 选项的**错误**示例：

:::incorrect

```js
/*eslint camelcase: "error"*/

import { no_camelcased } from "external-module"

var my_favorite_color = "#112C85";

function do_something() {
    // ...
}

obj.do_something = function() {
    // ...
};

function foo({ no_camelcased }) {
    // ...
};

function foo({ isCamelcased: no_camelcased }) {
    // ...
}

function foo({ no_camelcased = 'default value' }) {
    // ...
};

var obj = {
    my_pref: 1
};

var { category_id = 1 } = query;

var { foo: no_camelcased } = bar;

var { foo: bar_baz = 1 } = quz;
```

:::

使用此规则与默认的 `{ "properties": "always" }` 选项的**正确**示例：

:::correct

```js
/*eslint camelcase: "error"*/

import { no_camelcased as camelCased } from "external-module";

var myFavoriteColor   = "#112C85";
var _myFavoriteColor  = "#112C85";
var myFavoriteColor_  = "#112C85";
var MY_FAVORITE_COLOR = "#112C85";
var foo = bar.baz_boom;
var foo = { qux: bar.baz_boom };

obj.do_something();
do_something();
new do_something();

var { category_id: category } = query;

function foo({ isCamelCased }) {
    // ...
};

function foo({ isCamelCased: isAlsoCamelCased }) {
    // ...
}

function foo({ isCamelCased = 'default value' }) {
    // ...
};

var { categoryId = 1 } = query;

var { foo: isCamelCased } = bar;

var { foo: isCamelCased = 1 } = quz;

```

:::

### properties: "never"

使用此规则与 `{ "properties": "never" }` 选项的**正确**示例：

:::correct

```js
/*eslint camelcase: ["error", {properties: "never"}]*/

var obj = {
    my_pref: 1
};
```

:::

### ignoreDestructuring: false

使用此规则与默认的 `{ "ignoreDestructuring": false }` 选项的**错误**示例：

:::incorrect

```js
/*eslint camelcase: "error"*/

var { category_id } = query;

var { category_id = 1 } = query;

var { category_id: category_id } = query;

var { category_id: category_alias } = query;

var { category_id: categoryId, ...other_props } = query;
```

:::

### ignoreDestructuring: true

使用此规则与 `{ "ignoreDestructuring": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint camelcase: ["error", {ignoreDestructuring: true}]*/

var { category_id: category_alias } = query;

var { category_id, ...other_props } = query;
```

:::

使用此规则与 `{ "ignoreDestructuring": true }` 选项的**正确**示例：

:::correct

```js
/*eslint camelcase: ["error", {ignoreDestructuring: true}]*/

var { category_id } = query;

var { category_id = 1 } = query;

var { category_id: category_id } = query;
```

:::

请注意，这个选项只适用于解构模式中的标识符。除了默认或其他选项已经允许的使用外，它并不额外允许在以后的代码中对创建的变量进行任何特殊的使用。

使用此规则与额外的 `{ "ignoreDestructuring": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint camelcase: ["error", {ignoreDestructuring: true}]*/

var { some_property } = obj; // allowed by {ignoreDestructuring: true}
var foo = some_property + 1; // error, ignoreDestructuring does not apply to this statement
```

:::

这个选项的一个常见用例是，当不打算在以后的代码中使用标识符时，避免无用的重命名。

使用此规则与额外的 `{ "ignoreDestructuring": true }` 选项的**正确**示例：

:::correct

```js
/*eslint camelcase: ["error", {ignoreDestructuring: true}]*/

var { some_property, ...rest } = obj;
// do something with 'rest', nothing with 'some_property'
```

:::

此选项的另一个常见用例就是结合 `{ "properties": "never" }` 使用，这时标识符只能作为属性速记使用。

使用此规则与附加的 `{ "properties": "never", "ignoreDestructuring": true }` 选项的**正确**示例：

:::correct

```js
/*eslint camelcase: ["error", {"properties": "never", ignoreDestructuring: true}]*/

var { some_property } = obj;
doSomething({ some_property });
```

:::

### ignoreImports: false

使用此规则与默认的 `{ "ignoreImports": false }` 选项的**错误**示例：

:::incorrect

```js
/*eslint camelcase: "error"*/

import { snake_cased } from 'mod';
```

:::

### ignoreImports: true

使用此规则与 `{ "ignoreImports": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint camelcase: ["error", {ignoreImports: true}]*/

import default_import from 'mod';

import * as namespaced_import from 'mod';
```

:::

使用此规则与 `{ "ignoreImports": true }` 选项的**正确**示例：

:::correct

```js
/*eslint camelcase: ["error", {ignoreImports: true}]*/

import { snake_cased } from 'mod';
```

:::

### ignoreGlobals: false

使用此规则与默认的 `{ "ignoreGlobals": false }` 选项的**错误**示例：

:::incorrect

```js
/*eslint camelcase: ["error", {ignoreGlobals: false}]*/
/* global no_camelcased */

const foo = no_camelcased;
```

:::

### ignoreGlobals: true

使用此规则与 `{ "ignoreGlobals": true }` 选项的**正确**示例：

:::correct

```js
/*eslint camelcase: ["error", {ignoreGlobals: true}]*/
/* global no_camelcased */

const foo = no_camelcased;
```

:::

### allow

使用此规则与 `allow` 选项的**正确**示例：

:::correct

```js
/*eslint camelcase: ["error", {allow: ["UNSAFE_componentWillMount"]}]*/

function UNSAFE_componentWillMount() {
    // ...
}
```

:::

::: correct

```js
/*eslint camelcase: ["error", {allow: ["^UNSAFE_"]}]*/

function UNSAFE_componentWillMount() {
    // ...
}

function UNSAFE_componentWillMount() {
    // ...
}
```

:::

## 何时不用

如果你已经建立了编码标准，使用不同的命名惯例（用下划线分隔单词），请关闭此规则。
