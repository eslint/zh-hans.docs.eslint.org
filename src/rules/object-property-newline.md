---
title: object-property-newline
layout: doc
rule_type: layout
related_rules:
- brace-style
- comma-dangle
- key-spacing
- object-curly-spacing
---

这条规则允许你限制对象字面中的属性规范的位置。你可以禁止任何属性说明的任何部分与任何其他属性说明的任何部分出现在同一行。你可以使这一禁止成为绝对的，或者，通过调用一个对象选项，你可以允许一个例外，允许一个对象字面的所有属性规范的所有部分出现在一行。

## 规则细节

### Motivations

这条规则使我们有可能像一些风格指南所要求的那样，确保属性规范出现在不同的行中，以提高可读性。例如，你可以禁止所有这些。

```js
const newObject = {a: 1, b: [2, {a: 3, b: 4}]};
const newObject = {
    a: 1, b: [2, {a: 3, b: 4}]
};
const newObject = {
    a: 1,
    b: [2, {a: 3, b: 4}]
};
const newObject = {
    a: 1,
    b: [
        2,
        {a: 3, b: 4}
    ]
};

```

而不是这些，你可以通过写作来遵守规则

```js
const newObject = {
    a: 1,
    b: [2, {
        a: 3,
        b: 4
    }]
};
```

或

```js
const newObject = {
    a: 1,
    b: [
        2,
        {
            a: 3,
            b: 4
        }
    ]
};
```

这个规则的另一个好处是当一个属性被改变时，差异的特殊性。

```diff
// More specific
 var obj = {
     foo: "foo",
-    bar: "bar",
+    bar: "bazz",
     baz: "baz"
 };
```

```diff
// Less specific
-var obj = { foo: "foo", bar: "bar", baz: "baz" };
+var obj = { foo: "foo", bar: "bazz", baz: "baz" };
```

### Optional Exception

规则提供了一个对象选项，`allowAllPropertiesOnSameLine`（一个已被废弃的同义词是 `allowMultiplePropertiesPerLine`）。如果你把它设置为 `true`，像上面的前两个对象字面，所有的属性规格都在同一行，将被允许，但是像

```js
const newObject = {
    a: 'a.m.', b: 'p.m.',
    c: 'daylight saving time'
};

```

将被禁止，因为有两个属性，但不是所有的属性，出现在同一行。

### Notations

这条规则同样适用于所有的属性规范，不管是什么记号，包括：

* `a: 1`（ES5）
* `a`（ES2015 速记属性）
* ``[`prop${a}`]``（ES2015 计算的属性名）

因此，规则（没有选项的例外）禁止这两种情况。

```js
const newObject = {
    a: 1, [
        process.argv[4]
    ]: '01'
};
const newObject = {
    a: 1, [process.argv[4]]: '01'
};
```

（这种行为与下面引用的 JSCS 规则不同，JSCS 规则不把计算过的属性名称的前面的 `[` 作为该属性规范的一部分。JSCS 规则禁止这些格式中的第二种，但允许第一种）。

### Multiline Properties

该规则禁止在任何一行中，将一个属性规范的至少 1 个字符与任何其他属性规范的至少 1 个字符放在一起。例如，该规则禁止

```js
const newObject = {a: [
    'Officiële website van de Europese Unie',
    'Официален уебсайт на Европейския съюз'
], b: 2};
```

因为 `a` 的规格的 1 个字符（即其值尾部的 `]`）与 `b` 的规格在同一行。

可选的例外并不能原谅这种情况，因为整个属性说明的集合跨越了 4 行，而不是 1 行。

### Inter-property Delimiters

划分属性规格的逗号和任何空白都不被视为它们的一部分。因此，该规则允许这两种格式：

```js
const newFunction = multiplier => ({
    a: 2 * multiplier,
    b: 4 * multiplier,
    c: 8 * multiplier
});
const newFunction = multiplier => ({
    a: 2 * multiplier
    , b: 4 * multiplier
    , c: 8 * multiplier
});
```

（这种行为与下面引用的 JSCS 规则不同，JSCS 规则允许第一种，但禁止第二种格式。)

### --fix

如果用命令行 `--fix` 选项来调用这个规则，违反规则的对象字词通常会被修改以符合规则。每种情况下的修改都是将属性说明移到下一行，只要同一行中存在部分或全部的前一个属性说明。比如说：

```js
const newObject = {
    a: 'a.m.', b: 'p.m.',
    c: 'daylight saving time'
};
```

is converted to

```js
const newObject = {
    a: 'a.m.',
b: 'p.m.',
    c: 'daylight saving time'
};
```

修改并不取决于对象选项是否被设置为 `true`。换句话说，ESLint 从不将所有的属性说明收集到一行，即使对象选项允许这样做。

如果一个注释紧接在第二行或之后的属性说明之前，ESLint 不会纠正对这一规则的违反，因为 ESLint 无法确定将注释放在哪一行。

如上图所示，应用于此规则的 `--fix` 选项不符合其他规则，如 `indent`，但是，如果这些其他规则也有效，选项也会应用它们。

## 示例

使用此规则切没有使用对象选项或将 `allowAllPropertiesOnSameLine` 设置为 `false` 的**错误**示例：

::: incorrect

```js
/*eslint object-property-newline: "error"*/

const obj0 = { foo: "foo", bar: "bar", baz: "baz" };

const obj1 = {
    foo: "foo", bar: "bar", baz: "baz"
};

const obj2 = {
    foo: "foo", bar: "bar",
    baz: "baz"
};

const obj3 = {
    [process.argv[3] ? "foo" : "bar"]: 0, baz: [
        1,
        2,
        4,
        8
    ]
};

const a = "antidisestablishmentarianistically";
const b = "yugoslavyalılaştırabildiklerimizdenmişsiniz";
const obj4 = {a, b};

const domain = process.argv[4];
const obj5 = {
    foo: "foo", [
    domain.includes(":") ? "complexdomain" : "simpledomain"
]: true};
```

:::

此规则并没有对象选项或将 `allowAllPropertiesOnSameLine` 设置为 `false` 的**正确**示例：

::: correct

```js
/*eslint object-property-newline: "error"*/

const obj1 = {
    foo: "foo",
    bar: "bar",
    baz: "baz"
};

const obj2 = {
    foo: "foo"
    , bar: "bar"
    , baz: "baz"
};

const user = process.argv[2];
const obj3 = {
    user,
    [process.argv[3] ? "foo" : "bar"]: 0,
    baz: [
        1,
        2,
        4,
        8
    ]
};
```

:::

使用此规则与额外的：`{ "allowAllPropertiesOnSameLine": true }` 选项的**正确**示例：

::: correct

```js
/*eslint object-property-newline: ["error", { "allowAllPropertiesOnSameLine": true }]*/

const obj = { foo: "foo", bar: "bar", baz: "baz" };

const obj2 = {
    foo: "foo", bar: "bar", baz: "baz"
};
const user = process.argv[2];
const obj3 = {
    user, [process.argv[3] ? "foo" : "bar"]: 0, baz: [1, 2, 4, 8]
};
```

:::

## 何时不用

如果你想逐一决定是否将财产规格放在单独的行上，你可以关闭这一规则。

## 兼容

**JSCS**：本规则与 [requireObjectKeysOnNewLine](https://jscs-dev.github.io/rule/requireObjectKeysOnNewLine) 部分兼容性。
