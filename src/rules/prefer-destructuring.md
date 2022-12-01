---
title: prefer-destructuring
layout: doc
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
- https://2ality.com/2015/01/es6-destructuring.html
---

在 JavaScript ES6 中，增加了一种新的语法，用于从数组索引或对象属性创建变量，称为[解构](#further-reading)。 这条规则强制使用解构，而不是通过成员表达式来访问一个属性。

## 规则细节

### 选项

这个规则需要两组配置对象。第一个对象参数决定了该规则适用于哪些类型的解构。

两个属性，`array` 和 `object`，可以用来独立开启或关闭这些类型的解构要求。默认情况下，两者都是真。

另外，你可以为不同的分配类型使用单独的配置。它接受另外两个键，而不是 `array` 和 `object`。

一个键是 `VariableDeclarator`，另一个是 `AssignmentExpression`，它可以用来独立控制这些类型的解构要求。每个属性都接受一个对象，该对象接受两个属性，`array` 和 `object`，可以用来独立地控制 `array` 和 `object`中每个变量声明和赋值表达式的解构要求。 默认情况下，`array` 和 `object` 对于 `VariableDeclarator` 和 `AssignmentExpression` 都被设置为 true。

该规则有第二个对象，只有一个键，`enforceForRenamedProperties`，它决定了 `object` 的结构化是否适用于重命名的变量。

**注意**。在运行时不可能确定一个变量将引用一个对象或一个数组。因此，这个规则通过检查被访问的键是否是一个整数来猜测赋值类型。这可能会导致以下令人困惑的情况。

* 访问一个键为整数的对象属性将属于 `array` 的解构范畴。
* 通过一个计算的索引访问一个数组元素将属于 `object` 解构的范畴。

命令行中的 `--fix` 选项只修复变量声明中报告的问题，其中只有那些属于 `object` 重构范畴的问题。此外，声明的变量的名称必须与初始化器中用于非计算成员访问的名称相同。例如，`var foo = object.foo` 可以通过这个规则自动修复。涉及计算成员访问（如 `var foo = object[foo]`）或重命名属性（如 `var foo = object.bar`）的问题不会被自动修复。

使用此规则的**错误**示例：

::: incorrect

```javascript
// With `array` enabled
var foo = array[0];

// With `object` enabled
var foo = object.foo;
var foo = object['foo'];
```

:::

使用此规则的**正确**示例：

::: correct

```javascript
// With `array` enabled
var [ foo ] = array;
var foo = array[someIndex];

// With `object` enabled
var { foo } = object;

var foo = object.bar;

let foo;
({ foo } = object);
```

:::

启用 `enforceForRenamedProperties` 时的**错误**示例：

::: incorrect

```javascript
var foo = object.bar;
```

:::

启用 `enforceForRenamedProperties` 时**正确**示例：

::: correct

```javascript
var { bar: foo } = object;
```

:::

启用 `enforceForRenamedProperties` 时额外的**正确**示例：

::: correct

```javascript
class C {
    #x;
    foo() {
        const bar = this.#x; // private identifiers are not allowed in destructuring
    }
}
```

:::

配置示例，填入默认的 `array` 和 `object`，看起来像这样：

```json
{
  "rules": {
    "prefer-destructuring": ["error", {
      "array": true,
      "object": true
    }, {
      "enforceForRenamedProperties": false
    }]
  }
}
```

两个属性，`array` 和 `object`，可以用来独立开启或关闭这些类型的解构要求。默认情况下，两者都是真的。

例如，下面的配置只强制执行对象解构，而不是数组解构。

```json
{
  "rules": {
    "prefer-destructuring": ["error", {"object": true, "array": false}]
  }
}
```

一个配置的例子，填写了默认的 `VariableDeclarator` 和 `AssignmentExpression` ，看起来像这样：

```json
{
  "rules": {
    "prefer-destructuring": ["error", {
      "VariableDeclarator": {
        "array": false,
        "object": true
      },
      "AssignmentExpression": {
        "array": true,
        "object": true
      }
    }, {
      "enforceForRenamedProperties": false
    }]
  }
}
```

两个属性，`VariableDeclarator` 和 `AssignmentExpression`，可以用来打开或关闭对 `array` 和 `object` 的解构要求。默认情况下，所有的值都是真。

例如，下面的配置在变量声明中执行对象解构，在赋值表达式中执行数组解构。

```json
{
  "rules": {
    "prefer-destructuring": ["error", {
      "VariableDeclarator": {
        "array": false,
        "object": true
      },
      "AssignmentExpression": {
        "array": true,
        "object": false
      }
    }, {
      "enforceForRenamedProperties": false
    }]
  }
}

```

当强制解构 `VariableDeclarator` 中的对象时的**正确**示例：

::: correct

```javascript
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
var {bar: foo} = object;
```

:::

当强制解构 `AssignmentExpression` 中的对象时的**正确**示例：

::: correct

```javascript
/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */
[bar] = array;
```

:::

## 何时不用

如果你希望能够直接访问数组索引或对象属性，你可以根据自己的口味配置规则，或者完全禁用该规则。

此外，如果你打算直接访问大的数组索引，比如：

```javascript
var foo = array[100];
```

那么这条规则的 `array` 部分就不被推荐了，因为解构与这种用例不是很匹配。

或者对于不可迭代的“类数组”对象。

```javascript
var $ = require('jquery');
var foo = $('body')[0];
var [bar] = $('body'); // fails with a TypeError
```
