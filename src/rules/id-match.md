---
title: id-match
rule_type: suggestion
---

> “计算机科学中只有两件难事：缓存失效和命名事物。” - 菲尔-卡尔顿

在一个项目中对事物进行统一命名是一个经常被低估的代码创建方面。
如果做得正确，它可以为你的团队节省不必要的挠头和误导的时间。
这个规则允许你精确地定义和执行你的团队应该使用的变量和函数名称。
不再局限于 camelCase, snake_case, PascalCase 或 oHungarianNotation。Id-match 可以满足你所有的需求！

## 规则细节

这条规则要求赋值和 `function` 定义中的标识符与指定的正则表达式匹配。

## 选项

这个规则有一个字符串选项，用于指定正则表达式。

例如，要强制执行骆驼大写的命名惯例：

```json
{
    "id-match": ["error", "^[a-z]+([A-Z][a-z]+)*$"]
}
```

使用此规则与 `"^[a-z]+([A-Z][a-z]+)*$"` 选项的**错误**示例：

::: incorrect

```js
/*eslint id-match: ["error", "^[a-z]+([A-Z][a-z]+)*$"]*/

var my_favorite_color = "#112C85";
var _myFavoriteColor  = "#112C85";
var myFavoriteColor_  = "#112C85";
var MY_FAVORITE_COLOR = "#112C85";
function do_something() {
    // ...
}

obj.do_something = function() {
    // ...
};

class My_Class {}

class myClass {
    do_something() {}
}

class myClass {
    #do_something() {}
}
```

:::

使用此规则与 `"^[a-z]+([A-Z][a-z]+)*$"` 选项的**正确**示例：

::: correct

```js
/*eslint id-match: ["error", "^[a-z]+([A-Z][a-z]+)*$"]*/

var myFavoriteColor   = "#112C85";
var foo = bar.baz_boom;
var foo = { qux: bar.baz_boom };
do_something();
var obj = {
    my_pref: 1
};

class myClass {}

class myClass {
    doSomething() {}
}

class myClass {
    #doSomething() {}
}
```

:::

此规则选项为对象：

* `"properties": false`（默认值）不检查对象属性
* `"properties": true` 要求对象字面属性和成员表达式赋值属性与指定的正则表达式匹配
* `"classFields": false`（默认值）不检查类字段名。
* `"classFields": true` 要求类字段名与指定的正则表达式匹配
* `"onlyDeclarations": false`（默认值）要求所有变量名称与指定的正则表达式相匹配
* `"onlyDeclarations": true` 要求只有 `var`、`const`、`let`、`function` 和 `class` 的声明与指定的正则表达式匹配
* `"ignoreDestructuring": false`（默认值）对非结构化的标识符执行`id-match`
* `"ignoreDestructuring": true`不 检查非结构化的标识符

### properties

使用此规则与 `"^[a-z]+([A-Z][a-z]+)*$", { "properties": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint id-match: ["error", "^[a-z]+([A-Z][a-z]+)*$", { "properties": true }]*/

var obj = {
    my_pref: 1
};
```

:::

### classFields

使用此规则与 `"^[a-z]+([A-Z][a-z]+)*$", { "classFields": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint id-match: ["error", "^[a-z]+([A-Z][a-z]+)*$", { "properties": true }]*/

class myClass {
    my_pref = 1;
}

class myClass {
    #my_pref = 1;
}
```

:::

### onlyDeclarations

使用此规则与 `"^[a-z]+([A-Z][a-z]+)*$", { "onlyDeclarations": true }` 选项的**正确**示例：

::: correct

```js
/*eslint id-match: [2, "^[a-z]+([A-Z][a-z]+)*$", { "onlyDeclarations": true }]*/

do_something(__dirname);
```

:::

### ignoreDestructuring: false

使用此规则与默认的 `"^[^_]+$", { "ignoreDestructuring": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint id-match: [2, "^[^_]+$", { "ignoreDestructuring": false }]*/

var { category_id } = query;

var { category_id = 1 } = query;

var { category_id: category_id } = query;

var { category_id: category_alias } = query;

var { category_id: categoryId, ...other_props } = query;
```

:::

### ignoreDestructuring: true

使用此规则与 `"^[^_]+$", { "ignoreDestructuring": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint id-match: [2, "^[^_]+$", { "ignoreDestructuring": true }]*/

var { category_id: category_alias } = query;

var { category_id, ...other_props } = query;
```

:::

使用此规则与 `"^[^_]+$", { "ignoreDestructuring": true }` 选项的**正确**示例：

::: correct

```js
/*eslint id-match: [2, "^[^_]+$", { "ignoreDestructuring": true }]*/

var { category_id } = query;

var { category_id = 1 } = query;

var { category_id: category_id } = query;
```

:::

## 何时不用

如果你不想对所有标识符执行任何特定的命名规则，或者你的命名规则太复杂，无法通过配置这个规则来执行，那么你就不应该启用这个规则。
