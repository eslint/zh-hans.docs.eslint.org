---
title: padded-blocks
rule_type: layout
related_rules:
- lines-between-class-members
- padding-line-between-statements
---

一些风格指南要求块状语句以空行开始和结束。其目的是
以提高可读性，从视觉上将块内容和周围的代码分开。

```js
if (a) {

    b();

}
```

因为有一致的代码风格是很好的，所以你应该总是编写缩进块，或者永远不要这样做。

## 规则细节

这条规则使块内的空行填充一致。

## 选项

这个规则有两个选项，第一个选项可以是一个字符串选项或一个对象选项。
第二个选项是一个对象选项，它可以允许出现例外情况。

### First option

字符串选项：

* `"always"`（默认值）要求在块语句、函数体、类静态块、类和 `switch` 语句的开头和结尾处有空行。
* `"never"` 不允许在块状语句、函数体、类静态块、类和 `switch` 语句的开头和结尾出现空行。

对象选项：

* `"blocks"` 要求或不允许在块语句、函数体和类的静态块中进行空行。
* `"classes"` 要求或不允许在类内进行空行。
* `"switches"` 要求或不允许在 `switch` 中进行空行。

### Second option

* `"allowSingleLineBlocks": true` 允许单行块。

### always

使用此规则与默认的 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", "always"]*/

if (a) {
    b();
}

if (a) { b(); }

if (a)
{
    b();
}

if (a) {
    b();

}

if (a) {
    // comment
    b();

}

class C {
    static {
        a();
    }
}
```

:::

使用此规则与默认的 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint padded-blocks: ["error", "always"]*/

if (a) {

    b();

}

if (a)
{

    b();

}

if (a) {

    // comment
    b();

}

class C {

    static {

        a();

    }

}
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", "never"]*/

if (a) {

    b();

}

if (a)
{

    b();

}

if (a) {

    b();
}

if (a) {
    b();

}

class C {

    static {

        a();

    }

}
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint padded-blocks: ["error", "never"]*/

if (a) {
    b();
}

if (a)
{
    b();
}

class C {
    static {
        a();
    }
}
```

:::

### blocks

使用此规则与 `{ "blocks": "always" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "blocks": "always" }]*/

if (a) {
    b();
}

if (a) { b(); }

if (a)
{
    b();
}

if (a) {

    b();
}

if (a) {
    b();

}

if (a) {
    // comment
    b();

}

class C {

    static {
        a();
    }

}
```

:::

使用此规则与 `{ "blocks": "always" }` 选项的**正确**示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "blocks": "always" }]*/

if (a) {

    b();

}

if (a)
{

    b();

}

if (a) {

    // comment
    b();

}

class C {

    static {

        a();

    }

}

class D {
    static {

        a();

    }

}
```

:::

使用此规则与 `{ "blocks": "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "blocks": "never" }]*/

if (a) {

    b();

}

if (a)
{

    b();

}

if (a) {

    b();
}

if (a) {
    b();

}

class C {
    static {

        a();

    }
}
```

:::

使用此规则与 `{ "blocks": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "blocks": "never" }]*/

if (a) {
    b();
}

if (a)
{
    b();
}

class C {
    static {
        a();
    }
}

class D {

    static {
        a();
    }

}
```

:::

### classes

使用此规则与 `{ "classes": "always" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "classes": "always" }]*/

class  A {
    constructor(){
    }
}
```

:::

使用此规则与 `{ "classes": "always" }` 选项的**正确**示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "classes": "always" }]*/

class  A {

    constructor(){
    }

}
```

:::

使用此规则与 `{ "classes": "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "classes": "never" }]*/

class  A {

    constructor(){
    }

}
```

:::

使用此规则与 `{ "classes": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "classes": "never" }]*/

class  A {
    constructor(){
    }
}
```

:::

### switches

使用此规则与 `{ "switches": "always" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "switches": "always" }]*/

switch (a) {
    case 0: foo();
}
```

:::

使用此规则与 `{ "switches": "always" }` 选项的**正确**示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "switches": "always" }]*/

switch (a) {

    case 0: foo();

}

if (a) {
    b();
}
```

:::

使用此规则与 `{ "switches": "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "switches": "never" }]*/

switch (a) {

    case 0: foo();

}
```

:::

使用此规则与 `{ "switches": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "switches": "never" }]*/

switch (a) {
    case 0: foo();
}

if (a) {

    b();

}
```

:::

### always + allowSingleLineBlocks

使用此规则与 `"always", {"allowSingleLineBlocks": true}` 选项的**错误**示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", "always", { allowSingleLineBlocks: true }]*/

if (a) {
    b();
}

if (a) {

    b();
}

if (a) {
    b();

}
```

:::

使用此规则与 `"always", {"allowSingleLineBlocks": true}` 选项的**正确**示例：

::: correct

```js
/*eslint padded-blocks: ["error", "always", { allowSingleLineBlocks: true }]*/

if (a) { b(); }

if (a) {

    b();

}
```

:::

## 何时不用

如果你不关心块内填充的一致性，你可以关闭这个规则。
