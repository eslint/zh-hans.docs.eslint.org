---
title: space-unary-ops
layout: doc
rule_type: layout
---

一些风格指南要求或不允许在单数运算符之前或之后有空格。这主要是一个风格问题，然而，一些 JavaScript 表达式可以不使用空格，这使得阅读和维护更加困难。

## 规则细节

这条规则对 `words` 单项运算符后的空格和 `nonwords` 单项运算符后/前的空格进行了统一。

对于 `words` 运算符，该规则只适用于语法上不需要空格的情况。例如，`delete obj.foo` 需要空格，本规则将不考虑。相等的 `delete(obj.foo)` 有一个选项空间（`delete (obj.foo)`），因此本规则将适用于它。

单数 `words` 运算符的例子：

```js
// new
var joe = new Person();

// delete
var obj = {
    foo: 'bar'
};
delete obj.foo;

// typeof
typeof {} // object

// void
void 0 // undefined
```

Examples of unary `nonwords` operators:

```js
if ([1,2,3].indexOf(1) !== -1) {};
foo = --foo;
bar = bar++;
baz = !foo;
qux = !!baz;
```

## 选项

这个规则有三个选项：

* `words` - 适用于单数词运算符，如 `new`, `delete`, `typeof`, `void`, `yield`
* `nonwords` - 适用于单数运算符，如 `-`, `+`, `--`, `++`, `!`, `!!`
* `overrides` - 指定每个运算符的间距的覆盖用法，字或非字。
  运算符，字或非字。默认情况下是空的，但可以用于
  强制执行或不允许运算符周围的间距。比如：

```js
    "space-unary-ops": [
        2, {
          "words": true,
          "nonwords": false,
          "overrides": {
            "new": false,
            "++": true
          }
    }]
```

在这种情况下，在 `new` 运算符之后不允许有间隔，而在 `++` 运算符之前/之后需要有间隔。

使用此规则与默认的 `{"words": true, "nonwords": false}` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-unary-ops: "error"*/

typeof!foo;

void{foo:0};

new[foo][0];

delete(foo.bar);

++ foo;

foo --;

- foo;

+ "3";
```

:::

::: incorrect

```js
/*eslint space-unary-ops: "error"*/
/*eslint-env es6*/

function *foo() {
    yield(0)
}
```

:::

::: incorrect

```js
/*eslint space-unary-ops: "error"*/

async function foo() {
    await(bar);
}
```

:::

使用此规则与 `{"words": true, "nonwords": false}` 选项的**正确**示例：

::: correct

```js
/*eslint space-unary-ops: "error"*/

// Word unary operator "typeof" is followed by a whitespace.
typeof !foo;

// Word unary operator "void" is followed by a whitespace.
void {foo:0};

// Word unary operator "new" is followed by a whitespace.
new [foo][0];

// Word unary operator "delete" is followed by a whitespace.
delete (foo.bar);

// Unary operator "++" is not followed by whitespace.
++foo;

// Unary operator "--" is not preceded by whitespace.
foo--;

// Unary operator "-" is not followed by whitespace.
-foo;

// Unary operator "+" is not followed by whitespace.
+"3";
```

:::

::: correct

```js
/*eslint space-unary-ops: "error"*/
/*eslint-env es6*/

function *foo() {
    yield (0)
}
```

:::

::: correct

```js
/*eslint space-unary-ops: "error"*/

async function foo() {
    await (bar);
}
```

:::
