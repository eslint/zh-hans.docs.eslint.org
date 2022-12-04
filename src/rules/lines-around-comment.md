---
title: lines-around-comment
layout: doc
rule_type: layout
related_rules:
- space-before-blocks
- spaced-comment
---

许多风格指南要求在注释之前或之后有空行。这些规则的主要目的 这些规则的主要目的是使注释更容易阅读，提高代码的可读性。

## 规则细节

这个规则要求在注释之前和/或之后有空行。它可以启用块（`/*`）和行（`//`）注释支持。该规则不适用于与代码出现在同一行的注释，也不要求在文件的开头或结尾有空行。

## 选项

此规则选项为对象：

* `"beforeBlockComment": true`（默认值）要求在块状注释之前有一个空行
* `"afterBlockComment": true` 要求在块状注释之后有一个空行
* `"beforeLineComment": true` 要求在行注释之前有一个空行
* `"afterLineComment": true` 要求在行注释后有一个空行
* `"allowBlockStart": true` 允许注释出现在块语句、函数体、类、开关语句和类静态块的开头
* `"allowBlockEnd": true` 允许注释出现在块语句、函数体、类、开关语句和类静态块的末尾
* `"allowObjectStart": true` 允许注释出现在对象字面的开头
* `"allowObjectEnd": true` 允许注释出现在对象字词的末尾
* `"allowArrayStart": true` 允许注释出现在数组字词的开始处
* `"allowArrayEnd": true` 允许注释出现在数组文字的末尾
* `"allowClassStart": true` 允许注释出现在类的开始部分
* `"allowClassEnd": true` 允许注释出现在类的末尾
* `"applyDefaultIgnorePatterns"` 启用或禁用规则所忽略的默认注释模式
* `"ignorePattern"`自定义模式将被规则忽略

### beforeBlockComment

使用此规则与默认的 `{ "beforeBlockComment": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true }]*/

var night = "long";
/* what a great and wonderful day */
var day = "great"
```

:::

使用此规则与默认的 `{ "beforeBlockComment": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true }]*/

var night = "long";

/* what a great and wonderful day */
var day = "great"
```

:::

### afterBlockComment

使用此规则与 `{ "afterBlockComment": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true }]*/

var night = "long";

/* what a great and wonderful day */
var day = "great"
```

:::

使用此规则与 `{ "afterBlockComment": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true }]*/

var night = "long";

/* what a great and wonderful day */

var day = "great"
```

:::

### beforeLineComment

使用此规则与 `{ "beforeLineComment": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true }]*/

var night = "long";
// what a great and wonderful day
var day = "great"
```

:::

使用此规则与 `{ "beforeLineComment": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true }]*/

var night = "long";

// what a great and wonderful day
var day = "great"
```

:::

### afterLineComment

使用此规则与 `{ "afterLineComment": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true }]*/

var night = "long";
// what a great and wonderful day
var day = "great"
```

:::

使用此规则与 `{ "afterLineComment": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true }]*/

var night = "long";
// what a great and wonderful day

var day = "great"
```

:::

### allowBlockStart

使用此规则与 `{ "beforeLineComment": true, "allowBlockStart": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowBlockStart": true }]*/

function foo(){
    // what a great and wonderful day
    var day = "great"
    return day;
}

if (bar) {
    // what a great and wonderful day
    foo();
}

class C {
    // what a great and wonderful day

    method() {
        // what a great and wonderful day
        foo();
    }

    static {
        // what a great and wonderful day
        foo();
    }
}
```

:::

使用此规则与 `{ "beforeBlockComment": true, "allowBlockStart": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowBlockStart": true }]*/

function foo(){
    /* what a great and wonderful day */
    var day = "great"
    return day;
}

if (bar) {
    /* what a great and wonderful day */
    foo();
}

class C {
    /* what a great and wonderful day */

    method() {
        /* what a great and wonderful day */
        foo();
    }

    static {
        /* what a great and wonderful day */
        foo();
    }
}

switch (foo) {
  /* what a great and wonderful day */

  case 1:    
    bar();
    break;
}
```

:::

### allowBlockEnd

使用此规则与 `{ "afterLineComment": true, "allowBlockEnd": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true, "allowBlockEnd": true }]*/

function foo(){
    var day = "great"
    return day;
    // what a great and wonderful day
}

if (bar) {
    foo();
    // what a great and wonderful day
}

class C {

    method() {
        foo();
        // what a great and wonderful day
    }

    static {
        foo();
        // what a great and wonderful day
    }

    // what a great and wonderful day
}
```

:::

使用此规则与 `{ "afterBlockComment": true, "allowBlockEnd": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true, "allowBlockEnd": true }]*/

function foo(){
    var day = "great"
    return day;

    /* what a great and wonderful day */
}

if (bar) {
    foo();

    /* what a great and wonderful day */
}

class C {

    method() {
        foo();

        /* what a great and wonderful day */
    }

    static {
        foo();

        /* what a great and wonderful day */
    }

    /* what a great and wonderful day */
}

switch (foo) {
  case 1:    
    bar();
    break;

  /* what a great and wonderful day */
}
```

:::

### allowClassStart

使用此规则与 `{ "beforeLineComment": true, "allowClassStart": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowClassStart": false }]*/

class foo {
    // what a great and wonderful day
    day() {}
};
```

:::

使用此规则与 `{ "beforeLineComment": true, "allowClassStart": false }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowClassStart": false }]*/

class foo {

    // what a great and wonderful day
    day() {}
};
```

:::

使用此规则与 `{ "beforeLineComment": true, "allowClassStart": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowClassStart": true }]*/

class foo {
    // what a great and wonderful day
    day() {}
};
```

:::

使用此规则与 `{ "beforeBlockComment": true, "allowClassStart": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowClassStart": false }]*/

class foo {
    /* what a great and wonderful day */
    day() {}
};
```

:::

使用此规则与 `{ "beforeBlockComment": true, "allowClassStart": false }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowClassStart": false }]*/

class foo {

    /* what a great and wonderful day */
    day() {}
};
```

:::

使用此规则与 `{ "beforeBlockComment": true, "allowClassStart": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowClassStart": true }]*/

class foo {
    /* what a great and wonderful day */
    day() {}
};
```

:::

### allowClassEnd

使用此规则与 `{ "afterLineComment": true, "allowClassEnd": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true, "allowClassEnd": true }]*/

class foo {
    day() {}
    // what a great and wonderful day
};
```

:::

使用此规则与 `{ "afterBlockComment": true, "allowClassEnd": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true, "allowClassEnd": true }]*/

class foo {
    day() {}

    /* what a great and wonderful day */
};
```

:::

### allowObjectStart

使用此规则与 `{ "beforeLineComment": true, "allowObjectStart": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowObjectStart": true }]*/

var foo = {
    // what a great and wonderful day
    day: "great"
};

const {
    // what a great and wonderful day
    foo: someDay
} = {foo: "great"};

const {
    // what a great and wonderful day
    day
} = {day: "great"};
```

:::

使用此规则与 `{ "beforeBlockComment": true, "allowObjectStart": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowObjectStart": true }]*/

var foo = {
    /* what a great and wonderful day */
    day: "great"
};

const {
    /* what a great and wonderful day */
    foo: someDay
} = {foo: "great"};

const {
    /* what a great and wonderful day */
    day
} = {day: "great"};
```

:::

### allowObjectEnd

使用此规则与 `{ "afterLineComment": true, "allowObjectEnd": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true, "allowObjectEnd": true }]*/

var foo = {
    day: "great"
    // what a great and wonderful day
};

const {
    foo: someDay
    // what a great and wonderful day
} = {foo: "great"};

const {
    day
    // what a great and wonderful day
} = {day: "great"};
```

:::

使用此规则与 `{ "afterBlockComment": true, "allowObjectEnd": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true, "allowObjectEnd": true }]*/

var foo = {
    day: "great"

    /* what a great and wonderful day */
};

const {
    foo: someDay

    /* what a great and wonderful day */
} = {foo: "great"};

const {
    day

    /* what a great and wonderful day */
} = {day: "great"};
```

:::

### allowArrayStart

使用此规则与 `{ "beforeLineComment": true, "allowArrayStart": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowArrayStart": true }]*/

var day = [
    // what a great and wonderful day
    "great",
    "wonderful"
];

const [
    // what a great and wonderful day
    someDay
] = ["great", "not great"];
```

:::

使用此规则与 `{ "beforeBlockComment": true, "allowArrayStart": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowArrayStart": true }]*/

var day = [
    /* what a great and wonderful day */
    "great",
    "wonderful"
];

const [
    /* what a great and wonderful day */
    someDay
] = ["great", "not great"];
```

:::

### allowArrayEnd

使用此规则与 `{ "afterLineComment": true, "allowArrayEnd": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true, "allowArrayEnd": true }]*/

var day = [
    "great",
    "wonderful"
    // what a great and wonderful day
];

const [
    someDay
    // what a great and wonderful day
] = ["great", "not great"];
```

:::

使用此规则与 `{ "afterBlockComment": true, "allowArrayEnd": true }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true, "allowArrayEnd": true }]*/

var day = [
    "great",
    "wonderful"

    /* what a great and wonderful day */
];

const [
    someDay

    /* what a great and wonderful day */
] = ["great", "not great"];
```

:::

### ignorePattern

默认情况下，这个规则会忽略以下列词语开头的注释。`eslint`, `jshint`, `jslint`, `istanbul`, `global`, `exported`, `jscs`. 要想在默认值之外忽略更多的注释，请将`ignorePattern`选项设置为一个字符串模式，该模式将被传递给 [`RegExp`构造函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp)。

使用 `ignorePattern` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error"]*/

foo();
/* eslint mentioned in this comment */,
bar();

/*eslint lines-around-comment: ["error", { "ignorePattern": "pragma" }] */

foo();
/* a valid comment using pragma in it */
```

:::

使用 `ignorePattern` 选项的**错误**示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "ignorePattern": "pragma" }] */

1 + 1;
/* something else */
```

:::

### applyDefaultIgnorePatterns

即使提供了 `ignorePattern`，也会应用默认的忽略模式。如果你想省略默认模式，将此选项设置为 `false`。

使用 `{ "applyDefaultIgnorePatterns": false }` 选项的**正确**示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "ignorePattern": "pragma", applyDefaultIgnorePatterns: false }] */

foo();
/* a valid comment using pragma in it */
```

:::

使用 `{ "applyDefaultIgnorePatterns": false }` 选项的**错误**示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "applyDefaultIgnorePatterns": false }] */

foo();
/* eslint mentioned in comment */

```

:::

## 何时不用

许多人喜欢更简洁的代码风格，不介意注释与代码连在一起。如果你属于这一类，这条规则就不适合你。
