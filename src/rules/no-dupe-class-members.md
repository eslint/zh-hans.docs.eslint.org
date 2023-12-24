---
title: no-dupe-class-members
rule_type: problem
handled_by_typescript: true
---

如果在类成员中存在同名的声明，最后一个声明会无声地覆盖其他声明。
这可能会导致意外的行为。

```js
/*eslint-env es6*/

class Foo {
  bar() { console.log("hello"); }
  bar() { console.log("goodbye"); }
}

var foo = new Foo();
foo.bar(); // goodbye
```

## 规则细节

这条规则旨在标记类成员中的重复名称的使用。

## 示例

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-dupe-class-members: "error"*/

class Foo {
  bar() { }
  bar() { }
}

class Foo {
  bar() { }
  get bar() { }
}

class Foo {
  bar;
  bar;
}

class Foo {
  bar;
  bar() { }
}

class Foo {
  static bar() { }
  static bar() { }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-dupe-class-members: "error"*/

class Foo {
  bar() { }
  qux() { }
}

class Foo {
  get bar() { }
  set bar(value) { }
}

class Foo {
  bar;
  qux;
}

class Foo {
  bar;
  qux() { }
}

class Foo {
  static bar() { }
  bar() { }
}
```

:::

## 何时不用

不应该在 ES3/5 环境中使用此规则。

在 ES2015（ES6）或更高版本中，如果你不想被通知类成员中的重复名称，你可以安全地禁用这个规则。
