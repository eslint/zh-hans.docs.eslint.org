---
title: lines-between-class-members
layout: doc
rule_type: layout
related_rules:
- padded-blocks
- padding-line-between-statements
---

这条规则通过在类成员之间强制执行行来提高可读性。它不会检查第一个成员之前和最后一个成员之后的空行，因为上下块已经考虑到了这一点。

## 规则细节

使用此规则的**错误**示例：

::: incorrect

```js
/* eslint lines-between-class-members: ["error", "always"]*/
class MyClass {
  x;
  foo() {
    //...
  }
  bar() {
    //...
  }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/* eslint lines-between-class-members: ["error", "always"]*/
class MyClass {
  x;

  foo() {
    //...
  }

  bar() {
    //...
  }
}
```

:::

使用此规则的额外**正确**示例：

::: correct

```js
/* eslint lines-between-class-members: ["error", "always"]*/
class MyClass {
  x = 1

  ;in = 2
}
```

:::

### 选项

这个规则有一个字符串选项和一个对象选项。

字符串选项：

* `"always"`（默认）要求在类成员后有一个空行。
* `"never"` 不允许在类成员后出现空行。

对象选项：

* `"exceptAfterSingleLine": false`（默认）**不**跳过检查单行类成员后的空行。
* `"exceptAfterSingleLine": true` 跳过检查单行类成员后的空行。

使用此规则与字符串选项的**错误**示例：

::: incorrect

```js
/* eslint lines-between-class-members: ["error", "always"]*/
class Foo{
  x;
  bar(){}
  baz(){}
}

/* eslint lines-between-class-members: ["error", "never"]*/
class Foo{
  x;

  bar(){}

  baz(){}
}
```

:::

使用此规则与字符串选项的**正确**示例：

::: correct

```js
/* eslint lines-between-class-members: ["error", "always"]*/
class Foo{
  x;

  bar(){}

  baz(){}
}

/* eslint lines-between-class-members: ["error", "never"]*/
class Foo{
  x;
  bar(){}
  baz(){}
}
```

:::

使用此规则与对象选项的**正确**示例：

::: correct

```js
/* eslint lines-between-class-members: ["error", "always", { "exceptAfterSingleLine": true }]*/
class Foo{
  x; // single line class member
  bar(){} // single line class member
  baz(){
    // multi line class member
  }

  qux(){}
}
```

:::

## 何时不用

如果你不想类成员之间有空行，你可以禁用这个规则。

## 兼容

* [requirePaddingNewLinesAfterBlocks](https://jscs-dev.github.io/rule/requirePaddingNewLinesAfterBlocks)
* [disallowPaddingNewLinesAfterBlocks](https://jscs-dev.github.io/rule/disallowPaddingNewLinesAfterBlocks)
