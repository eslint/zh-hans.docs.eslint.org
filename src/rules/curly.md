---
title: curly
layout: doc
rule_type: suggestion
---

当一个块只包含一个语句时，JavaScript 允许省略大括号。然而，许多人认为，最好的做法是永远不要在块周围省略大括号，即使它们是可选的，因为这可能导致错误并降低代码的清晰度。因此，下面的例子：

```js
if (foo) foo++;
```

也可以写作：

```js
if (foo) {
    foo++;
}
```

然而，有些人喜欢只在有一个以上的语句要执行时使用大括号。

## 规则细节

这条规则的目的是通过确保块语句被大括号包裹来防止错误和提高代码的清晰度。当它遇到省略大括号的块时，会发出警告。

## 选项

### all

使用默认的 `"all"` 选项的**错误**示例：

::: incorrect

```js
/*eslint curly: "error"*/

if (foo) foo++;

while (bar)
    baz();

if (foo) {
    baz();
} else qux();
```

:::

使用默认的 `"all"` 选项的**正确**示例：

::: correct

```js
/*eslint curly: "error"*/

if (foo) {
    foo++;
}

while (bar) {
    baz();
}

if (foo) {
    baz();
} else {
    qux();
}
```

:::

### multi

默认情况下，只要使用 `if`、`else`、`for`、`while` 或 `do` 而没有使用块语句作为主体，该规则就会发出警告。然而，你可以指定只有在块中有多个语句时才使用块语句，而当块中只有一个语句时就会警告。

使用 `"multi"` 选项的**错误**示例：

::: incorrect

```js
/*eslint curly: ["error", "multi"]*/

if (foo) {
    foo++;
}

if (foo) bar();
else {
    foo++;
}

while (true) {
    doSomething();
}

for (var i=0; i < items.length; i++) {
    doSomething();
}
```

:::

使用 `"multi"` 选项的**正确**示例：

::: correct

```js
/*eslint curly: ["error", "multi"]*/

if (foo) foo++;

else foo();

while (true) {
    doSomething();
    doSomethingElse();
}
```

:::

### multi-line

另外，你可以放宽规则，允许无大括号的单行 `if`、`else if`、`else`、`for`、`while` 或 `do`，而在其他情况下仍然强制使用大括号。

使用 `"multi-line"` 选项的**错误**示例：

::: incorrect

```js
/*eslint curly: ["error", "multi-line"]*/

if (foo)
  doSomething();
else
  doSomethingElse();

if (foo) foo(
  bar,
  baz);
```

:::

使用 `"multi-line"` 选项的**正确**示例：

::: correct

```js
/*eslint curly: ["error", "multi-line"]*/

if (foo) foo++; else doSomething();

if (foo) foo++;
else if (bar) baz()
else doSomething();

do something();
while (foo);

while (foo
  && bar) baz();

if (foo) {
    foo++;
}

if (foo) { foo++; }

while (true) {
    doSomething();
    doSomethingElse();
}
```

:::

### multi-or-nest

你可以使用另一种配置，如果主体只包含一个单行语句，则强制使用无括号的`if`、`else if`、`else`、`for`、`while`或`do`。而在所有其他情况下强制使用大括号。

使用 `"multi-or-nest"` 选项的**错误**示例：

::: incorrect

```js
/*eslint curly: ["error", "multi-or-nest"]*/

if (!foo)
    foo = {
        bar: baz,
        qux: foo
    };

while (true)
  if(foo)
      doSomething();
  else
      doSomethingElse();

if (foo) {
    foo++;
}

while (true) {
    doSomething();
}

for (var i = 0; foo; i++) {
    doSomething();
}
```

:::

使用 `"multi-or-nest"` 选项的**正确**示例：

::: correct

```js
/*eslint curly: ["error", "multi-or-nest"]*/

if (!foo) {
    foo = {
        bar: baz,
        qux: foo
    };
}

while (true) {
  if(foo)
      doSomething();
  else
      doSomethingElse();
}

if (foo)
    foo++;

while (true)
    doSomething();

for (var i = 0; foo; i++)
    doSomething();
```

:::

对于前面有注释的单行语句，允许使用大括号，但不是必须的。

使用 `"multi-or-nest"` 选项的又一**正确**示例：

::: correct

```js
/*eslint curly: ["error", "multi-or-nest"]*/

if (foo)
    // 一些注释
    bar();

if (foo) {
    // 一些注释
    bar();
}
```

:::

### consistent

当使用任何一个 `multi*` 选项时，你可以添加一个选项来强制执行 `if` 的所有主体。`else if` 和 `else`链的所有主体都要有或没有大括号。

使用 `"multi", "consistent"` 选项的**错误**示例：

::: incorrect

```js
/*eslint curly: ["error", "multi", "consistent"]*/

if (foo) {
    bar();
    baz();
} else
    buz();

if (foo)
    bar();
else if (faa)
    bor();
else {
    other();
    things();
}

if (true)
    foo();
else {
    baz();
}

if (foo) {
    foo++;
}
```

:::

使用 `"multi", "consistent"` 选项的**正确**示例：

::: correct

```js
/*eslint curly: ["error", "multi", "consistent"]*/

if (foo) {
    bar();
    baz();
} else {
    buz();
}

if (foo) {
    bar();
} else if (faa) {
    bor();
} else {
    other();
    things();
}

if (true)
    foo();
else
    baz();

if (foo)
    foo++;

```

:::

## 何时不用

如果你对什么时候使用块语句和什么时候不使用没有严格的约定，你可以安全地禁用这一规则。
