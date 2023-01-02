---
title: block-spacing
rule_type: layout
related_rules:
- space-before-blocks
- brace-style
---

## 规则细节

这条规则使开放区块标记和同一行的下一个标记之间的间距一致。这条规则也使同一行的封闭块标记和前一标记的间距一致。

## 选项

此规则有个值为字符串的选项：

* `"always"`（默认值）需要有一个或多个空格
* `"never"` 禁用空格

### always

使用此规则与默认 `"always"` 选项的**错误**示例：

:::incorrect

```js
/*eslint block-spacing: "error"*/

function foo() {return true;}
if (foo) { bar = 0;}
function baz() {let i = 0;
    return i;
}

class C {
    static {this.bar = 0;}
}
```

:::

使用此规则与默认 `"always"` 选项的**正确**示例：

:::correct

```js
/*eslint block-spacing: "error"*/

function foo() { return true; }
if (foo) { bar = 0; }

class C {
    static { this.bar = 0; }
}
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

:::incorrect

```js
/*eslint block-spacing: ["error", "never"]*/

function foo() { return true; }
if (foo) { bar = 0;}

class C {
    static { this.bar = 0; }
}
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

:::correct

```js
/*eslint block-spacing: ["error", "never"]*/

function foo() {return true;}
if (foo) {bar = 0;}

class C {
    static {this.bar = 0;}
}
```

:::

## 何时不用

如果你不希望报告块内部的间距样式，你可以安全地禁用这个规则。
