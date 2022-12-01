---
title: space-in-parens
layout: doc
rule_type: layout
related_rules:
- array-bracket-spacing
- object-curly-spacing
- computed-property-spacing
---

一些风格指南要求或不允许括号内有空格。

```js
foo( 'bar' );
var x = ( 1 + 2 ) * 3;

foo('bar');
var x = (1 + 2) * 3;
```

## 规则细节

这条规则将通过禁止或要求在 `(` 的右边和 `)` 的左边有一个或多个空格来强制执行括号内的一致间距。

只要你没有使用 `"empty"` 的例外情况明确禁止空括号，`()` 将被允许。

## 选项

这个规则有两个选项：

* `"never"`（默认值）执行括号内的零空间
* `"always"` 执行括号内的一个空格

根据你的编码习惯，你可以通过在配置中指定它来选择任一选项：

```json
"space-in-parens": ["error", "always"]
```

### "never"

使用此规则与默认的 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-in-parens: ["error", "never"]*/

foo( );

foo( 'bar');
foo('bar' );
foo( 'bar' );

foo( /* bar */ );

var foo = ( 1 + 2 ) * 3;
( function () { return 'bar'; }() );
```

:::

使用此规则与默认的 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint space-in-parens: ["error", "never"]*/

foo();

foo('bar');

foo(/* bar */);

var foo = (1 + 2) * 3;
(function () { return 'bar'; }());
```

:::

### "always"

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always"]*/

foo( 'bar');
foo('bar' );
foo('bar');

foo(/* bar */);

var foo = (1 + 2) * 3;
(function () { return 'bar'; }());
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint space-in-parens: ["error", "always"]*/

foo();
foo( );

foo( 'bar' );

foo( /* bar */ );

var foo = ( 1 + 2 ) * 3;
( function () { return 'bar'; }() );
```

:::

### Exceptions

一个对象字面可以作为第三个数组项来指定例外情况，键为 `"exceptions"`，值为数组。这些例外情况在第一个选项的背景下工作。也就是说，如果 `"always"` 被设置为强制间隔，那么任何 "例外 "都将**不允许**间隔。相反，如果 `"never"` 被设置为不允许间距，那么任何 "例外 "都将*加强*间距。

请注意，这条规则只执行小括号内的间距；它不检查大括号或方括号内的间距，但当且仅当这些括号与开括号或闭括号相邻时，将执行或不允许这些括号的间距。

以下是一些例外情况。`["{}", "[]", "()", "empty"]`。

### Empty Exception

Empty parens exception and behavior:

* `always` allows for both `()` and `( )`
* `never` (default) requires `()`
* `always` excepting `empty` requires `()`
* `never` excepting `empty` requires `( )` (empty parens without a space is here forbidden)

### 示例

使用此规则与 `"never", { "exceptions": ["{}"] }` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["{}"] }]*/

foo({bar: 'baz'});
foo(1, {bar: 'baz'});
```

:::

使用此规则与 `"never", { "exceptions": ["{}"] }` 选项的**正确**示例：

::: correct

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["{}"] }]*/

foo( {bar: 'baz'} );
foo(1, {bar: 'baz'} );
```

:::

使用此规则与 `"always", { "exceptions": ["{}"] }` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}"] }]*/

foo( {bar: 'baz'} );
foo( 1, {bar: 'baz'} );
```

:::

使用此规则与 `"always", { "exceptions": ["{}"] }` 选项的**正确**示例：

::: correct

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}"] }]*/

foo({bar: 'baz'});
foo( 1, {bar: 'baz'});
```

:::

使用此规则与 `"never", { "exceptions": ["[]"] }` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["[]"] }]*/

foo([bar, baz]);
foo([bar, baz], 1);
```

:::

使用此规则与 `"never", { "exceptions": ["[]"] }` 选项的**正确**示例：

::: correct

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["[]"] }]*/

foo( [bar, baz] );
foo( [bar, baz], 1);
```

:::

使用此规则与 `"always", { "exceptions": ["[]"] }` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["[]"] }]*/

foo( [bar, baz] );
foo( [bar, baz], 1 );
```

:::

使用此规则与 `"always", { "exceptions": ["[]"] }` 选项的**正确**示例：

::: correct

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["[]"] }]*/

foo([bar, baz]);
foo([bar, baz], 1 );
```

:::

使用此规则与 `"never", { "exceptions": ["()"] }]` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["()"] }]*/

foo((1 + 2));
foo((1 + 2), 1);
foo(bar());
```

:::

使用此规则与 `"never", { "exceptions": ["()"] }]` 选项的**正确**示例：

::: correct

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["()"] }]*/

foo( (1 + 2) );
foo( (1 + 2), 1);
foo(bar() );
```

:::

使用此规则与 `"always", { "exceptions": ["()"] }]` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["()"] }]*/

foo( ( 1 + 2 ) );
foo( ( 1 + 2 ), 1 );
```

:::

使用此规则与 `"always", { "exceptions": ["()"] }]` 选项的**正确**示例：

::: correct

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["()"] }]*/

foo(( 1 + 2 ));
foo(( 1 + 2 ), 1 );
```

:::

`"empty"` exception concerns empty parentheses, and works the same way as the other exceptions, inverting the first 选项。

使用此规则与 `"never", { "exceptions": ["empty"] }]` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["empty"] }]*/

foo();
```

:::

使用此规则与 `"never", { "exceptions": ["empty"] }]` 选项的**正确**示例：

::: correct

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["empty"] }]*/

foo( );
```

:::

使用此规则与 `"always", { "exceptions": ["empty"] }]` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["empty"] }]*/

foo( );
```

:::

使用此规则与 `"always", { "exceptions": ["empty"] }]` 选项的**正确**示例：

::: correct

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["empty"] }]*/

foo();
```

:::

You can include multiple entries in the `"exceptions"` array.

使用此规则与 `"always", { "exceptions": ["{}", "[]"] }]` 选项的**错误**示例：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}", "[]"] }]*/

bar( {bar:'baz'} );
baz( 1, [1,2] );
foo( {bar: 'baz'}, [1, 2] );
```

:::

使用此规则与 `"always", { "exceptions": ["{}", "[]"] }]` 选项的**正确**示例：

::: correct

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}", "[]"] }]*/

bar({bar:'baz'});
baz( 1, [1,2]);
foo({bar: 'baz'}, [1, 2]);
```

:::

## 何时不用

如果你不关心括号之间间距的一致性，你可以关闭这一规则。
