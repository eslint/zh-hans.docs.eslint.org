---
title: lines-between-class-members
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

这个规则有两个选项，第一个选项可以是字符串或对象，第二个选项是一个对象。

第一个选项可以是字符串 `"always"` 或 `"never"`，或者一个拥有名为 `enforce` 属性的对象：

* `"always"`（默认）要求在类成员后面有一个空行。
* `"never"` 不允许在类成员后面有空行。
* `Object`：拥有名为 `enforce` 属性的对象。`enforce` 属性应该是一个对象数组，每个对象都指定了在特定类成员对之间强制使用空行的配置。
    * **enforce**：你可以提供任意数量的配置。如果成员对匹配多个配置，将使用最后匹配的配置。如果成员对不回匹配任何配置，而回被忽略。每个对象应该具有以下属性：
        * **blankLine**：可以设置为 `"always"` 或 `"never"`，表示是否需要在指定的成员之间要求或禁止空行。
        * **prev**：指定前一个类成员的类型。它可以是 `"method"` 表示类方法，`"field"` 表示类字段，或 `"*"` 表示任何类成员。
        * **next**：指定后一个类成员的类型。它遵循与 `prev` 相同的选项。

第二个选项是拥有名为 `exceptAfterSingleLine` 属性的对象：

* `"exceptAfterSingleLine": false`（默认）**不回**跳过检查单行类成员后的空行。
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

使用此规则与具有配置数组选项的**错误**示例：

::: incorrect

```js
// disallows blank lines between methods
/*eslint lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
]*/

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';
  #fieldB = 'Field B';

  method1() {}

  get area() {
    return this.method1();
  }

  method2() {}
}
```

:::

::: incorrect

```js
// requires blank lines around fields, disallows blank lines between methods
/*eslint lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "always", prev: "*", next: "field" },
        { blankLine: "always", prev: "field", next: "*" },
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
]*/

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }
  fieldA = 'Field A';
  #fieldB = 'Field B';
  method1() {}

  get area() {
    return this.method1();
  }

  method2() {}
}
```

:::

使用此规则与具有配置数组选项的**正确**示例：

::: correct

```js
// disallows blank lines between methods
/*eslint lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
]*/

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';

  #fieldB = 'Field B';

  method1() {}
  get area() {
    return this.method1();
  }
  method2() {}
}
```

:::

::: correct

```js
// requires blank lines around fields, disallows blank lines between methods
/*eslint lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "always", prev: "*", next: "field" },
        { blankLine: "always", prev: "field", next: "*" },
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
]*/

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';

  #fieldB = 'Field B';

  method1() {}
  get area() {
    return this.method1();
  }
  method2() {}
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

::: correct

```js
/*eslint lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "always", prev: "*", next: "method" },
        { blankLine: "always", prev: "method", next: "*" },
        { blankLine: "always", prev: "field", next: "field" }
      ]
    },
    { exceptAfterSingleLine: true }
]*/

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';
  #fieldB = 'Field B';
  method1() {}
  get area() {
    return this.method1();
  }

  method2() {}
}
```

:::

## 何时不用

如果你不想类成员之间有空行，你可以禁用这个规则。

## 兼容

* [requirePaddingNewLinesAfterBlocks](https://jscs-dev.github.io/rule/requirePaddingNewLinesAfterBlocks)
* [disallowPaddingNewLinesAfterBlocks](https://jscs-dev.github.io/rule/disallowPaddingNewLinesAfterBlocks)
