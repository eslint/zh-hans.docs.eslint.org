---
title: ScopeManager
layout: doc

---

本文档是基于 [eslint-scope](https://github.com/eslint/eslint-scope) 的实现编写的，它是 [escope](https://github.com/estools/escope) 的分叉，并废弃了一些 ESLint 不使用的成员。

----

## ScopeManager 接口

`ScopeManager` 对象拥有所有的变量作用域。

### 字段

#### scopes

* **类型**：`Scope[]`
* **描述**：所有作用域

#### globalScope

* **类型**：`Scope`
* **描述**：根作用域

### 方法

#### acquire(node, inner = false)

**参数**：
    * `node` (`ASTNode`) ... 用于获取其作用域的 AST 节点。
    * `inner` (`boolean`) ... 如果节点有多个作用域，这通常返回最外层的作用域。如果 `inner` 是 `true` 则返回最里面的作用域。默认是`false`。
**返回类型**：`Scope | null`
**描述**：获取给定的 AST 节点的作用域。得到的作用域的 `block` 属性是该节点。这个方法从不返回 `function-expression-name` 作用域。如果节点没有它们的作用域，这将返回 `null`。

#### getDeclaredVariables(node)

* **参数**：
    * `node` (`ASTNode`) ... 用于获取它们的变量的 AST 节点.
* **返回类型**：`Variable[]`
* **描述**：获取给定的 AST 节点所定义的变量。得到的变量的 `def[].node`/`def[].parent` 属性是节点。如果该节点没有定义任何变量，将返回空数组。

### 废弃成员

ESLint 中定义了这些成员，但没有使用它们。

#### isModule()

* **参数**：
* **返回类型**：`boolean`
* **描述**：如果该程序是模块则为 `true`。

#### isImpliedStrict()

* **参数**：
* **返回类型**：`boolean`
* **描述**：如果这个程序是隐含的严格模式，即 `options.impliedStrict === true`，则为 `true`。

#### isStrictModeSupported()

* **参数**：
* **返回类型**：`boolean`
* **描述**：`true` 如果这个程序支持严格模式。即：`options.ecmaVersion >= 5`。

#### acquireAll(node)

* **参数**：
    * `node` (`ASTNode`) ... 用于获得它们作用域的 AST 节点。
* **返回类型**：`Scope[] | null`
* **描述**：获取给定的 AST 节点的作用域。得到的作用域的 `block` 属性是节点。如果该节点没有他们的作用域，则返回 `null`。

----

## Scope 接口

`Scope` 对象拥有作用域内的所有变量和引用。

### 字段

#### type

* **类型**：`string`
* **描述**：此作用域的类型。可以是 `"block"`、`"catch"`、`"class"`、`"class-field-initializer"`、`"class-static-block"`、`"for"`、`"function"`、`"function-expression-name"`、`"global"`、`"module"`、`"switch"` 或 `"with"` 其中之一。

#### isStrict

* **类型**：`boolean`
* **描述**：如果这个作用域是严格模式，则为 `true`。

#### upper

* **类型**：`Scope | null`
* **描述**：父作用域。如果这是全局作用域，那么这个属性就是 `null`。

#### childScopes

* **类型**：`Scope[]`
* **描述**：子作用域的数组。这不包括子孙作用域。

#### variableScope

* **类型**：`Scope`
* **描述**：最近的祖先，其 `type` 是 `"class-field-initializer"`、`"class-static-block"`、`"function"`、`"global"` 或 `"module"` 之一。以上作用域是自引用作用域

> 这代表最低的包围函数或顶层作用域。类的字段初始化器和类的静态块是隐式函数。由于历史原因，这是承载由 `var` 声明定义的变量的作用域，因此被称为 `variableScope`。

#### block

* **类型**：`ASTNode`
* **描述**：创建此作用域的 AST 节点。

#### variables

* **类型**：`Variable[]`
* **描述**：此作用域上定义的所有变量的数组。这不包括在子作用域中定义的变量。

#### set

* **类型**：`Map<string, Variable>`
* **描述**：变量名称与变量对象的映射。

> 我希望重命名 `set` 字段或用方法代替。

#### references

* **类型**：`Reference[]`
* **描述**：此作用域上的所有引用的数组。这不包括子作用域中的引用。

#### through

* **类型**：`Reference[]`
* **描述**：在此作用域内无法解析的引用数组。

#### functionExpressionScope

* **类型**：`boolean`
* **描述**：若此作用域为 `"function-expression-name"`，则为 `true`。

> 我希望废除 `functionExpressionScope` 字段，并用 `scope.type === "function-expression-name"` 代替。

### 废弃成员

ESLint 中定义了这些成员，但没有使用它们。

#### taints

* **类型**：`Map<string, boolean>`
* **描述**：变量名与 `tainted` 标志的映射。

#### dynamic

* **类型**：`boolean`
* **描述**：若为动态作用域，则为 `true`。也就是说，这个作用域的类型是 `"global"` 或 `"with"`。

#### directCallToEvalScope

* **类型**：`boolean`
* **描述**：若此作用域调用了 `eval()`，则为 `true`。

#### thisFound

* **类型**：`boolean`
* **描述**：若此作用域包含 `this`，则为 `true`。

#### resolve(node)

* **参数**：
    * `node` (`ASTNode`) ... 用于获得其参考对象的 AST 节点。该节点的类型必须是 `"Identifier"`。
* **返回类型**：`Reference | null`
* **描述**：返回 `this.references.find(r => r.identifier === node)`。

#### isStatic()

* **参数**：
* **返回类型**：`boolean`
* **描述**：返回 `!this.dynamic`。

#### isArgumentsMaterialized()

* **参数**：
* **返回类型**：`boolean`
* **描述**：如果是在 `arguments` 变量中的使用的 `"function"` 作用域，则为 `true`。

#### isThisMaterialized()

* **参数**：
* **返回类型**：`boolean`
* **描述**：返回 `this.thisFound`.

#### isUsedName(name)

* **参数**：
    * `name` (`string`) ... 要检查的名字。
* **返回类型**：`boolean`
* **描述**：如果在变量名或引用名中使用给定的名称，则为 `true`。

----

## Variable 接口

`Variable` 对象是变量的信息。

### 字段

#### name

* **类型**：`string`
* **描述**：该变量的名称。

#### scope

* **类型**：`Scope`
* **描述**：定义该变量的作用域。

#### identifiers

* **类型**：`ASTNode[]`
* **描述**：定义该变量的 `Identifier` 节点的数组。如果这个变量被重新声明，这个数组包括两个或多个节点。

> 我希望废除 `identifiers` 字段，并用 `defs[].name` 字段来代替。

#### references

* **类型**：`Reference[]`
* **描述**：该变量的引用数组。

#### defs

* **类型**：`Definition[]`
* **描述**：该变量的定义数组。

### 废弃的成员

ESLint 中定义了这些成员，但没有使用它们。

#### tainted

* **类型**：`boolean`
* **描述**：`tainted` 标志（总是 `false`）。

#### stack

* **类型**：`boolean`
* **描述**：`stack` 标志（我不清楚它的作用）。

----

## Reference 接口

`Reference` 对象是参考的信息。

### Fields

#### identifier

* **类型**：`ASTNode`
* **描述**：该引用的 `Identifier` 节点。

#### from

* **类型**：`Scope`
* **描述**：该引用所处的 `Scope` 对象。

#### resolved

* **类型**：`Variable | null`
* **描述**：该引用指向 `Variable` 对象。如果没有定义此变量，则为 `null`。

#### writeExpr

* **类型**：`ASTNode | null`
* **描述**：作为右侧的 ASTNode 对象。

#### init

* **类型**：`boolean`
* **描述**：如果这个写入引用是变量初始化器或默认值，则为 `true`。

### Methods

#### isWrite()

* **参数**：
* **返回类型**：`boolean`
* **描述**：如果该引用可写，则为 `true`。

#### isRead()

* **参数**：
* **返回类型**：`boolean`
* **描述**：如果正在读取该引用，则为 `true`。

#### isWriteOnly()

* **参数**：
* **返回类型**：`boolean`
* **描述**：如果该引用可写不可读，则为 `true`。

#### isReadOnly()

* **参数**：
* **返回类型**：`boolean`
* **描述**：`true`，如果这个引用是读而不是写。

#### isReadWrite()

* **参数**：
* **返回类型**：`boolean`
* **描述**：如果该引用可读写的，则为 `true`。

### 废弃成员

ESLint 中定义了这些成员，但没有使用它们。

#### tainted

* **类型**：`boolean`
* **描述**：`tainted` 标志（总是为 `false`）。

#### flag

* **类型**：`number`
* **描述**：`1` 是读，`2` 是写，`3` 是读/写。

#### partial

* **类型**：`boolean`
* **描述**：`partial` 标志。

#### isStatic()

* **参数**：
* **返回类型**：`boolean`
* **描述**：如果该引用被静态解析，则为 `true`。

----

## Definition 接口

`Definition` 对象是变量定义的信息。

### Fields

#### type

* **类型**：`string`
* **描述**：该定义的类型是 `"CatchClause"`、`"ClassName"`、`"FunctionName"`、`"ImplicitGlobalVariable"`、`"ImportBinding"`、`"Parameter"` 和 `"Variable"` 之一。

#### name

* **类型**：`ASTNode`
* **描述**：该定义的 `Identifier` 节点。

#### node

* **类型**：`ASTNode`
* **描述**：名称的包围性节点。

| type                       | node |
|:---------------------------|:-----|
| `"CatchClause"`            | `CatchClause`
| `"ClassName"`              | `ClassDeclaration` or `ClassExpression`
| `"FunctionName"`           | `FunctionDeclaration` or `FunctionExpression`
| `"ImplicitGlobalVariable"` | `Program`
| `"ImportBinding"`          | `ImportSpecifier`, `ImportDefaultSpecifier`, or `ImportNamespaceSpecifier`
| `"Parameter"`              | `FunctionDeclaration`, `FunctionExpression`, or `ArrowFunctionExpression`
| `"Variable"`               | `VariableDeclarator`

#### parent

* **类型**：`ASTNode | undefined | null`
* **描述**：名称的包围性语句节点。

| type                       | parent |
|:---------------------------|:-------|
| `"CatchClause"`            | `null`
| `"ClassName"`              | `null`
| `"FunctionName"`           | `null`
| `"ImplicitGlobalVariable"` | `null`
| `"ImportBinding"`          | `ImportDeclaration`
| `"Parameter"`              | `null`
| `"Variable"`               | `VariableDeclaration`

### 废弃成员

ESLint 中定义了这些成员，但没有使用它们。

#### index

* **类型**：`number | undefined | null`
* **描述**：声明语句中的索引.

#### kind

* **类型**：`string | undefined | null`
* **描述**：声明声明的种类。
