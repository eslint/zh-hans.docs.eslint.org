---
title: object-curly-newline
layout: doc
rule_type: layout
related_rules:
- comma-spacing
- key-spacing
- object-curly-spacing
- object-property-newline
---

一些风格指南要求或不允许在对象大括号和其他标记内有换行符。

## 规则细节

这条规则要求或不允许在 `{` 和其后面的标记之间，以及在 `}` 和其前面的对象字面或结构化赋值的标记之间进行换行。

## 选项

这个规则有一个字符串选项：

* `"always"` 要求在开头和结尾的大括号之后和之前进行换行。
* `"never"` 不允许在大括号开头和结尾之前断行。

或对象选项：

* `"multiline": true` 如果属性内部或属性之间有换行，就需要换行。否则，它不允许换行。
* `"minProperties"` 如果属性的数量至少是给定的整数，则需要换行。默认情况下，如果一个对象包含换行符并且其属性数量少于给定的整数，也会报告一个错误。然而，如果 `consistent` 选项被设置为 `true`，第二个行为将被禁用。
* `"consistent": true`（默认值）要求两个大括号，或者两个大括号都不直接包含新行。注意，启用该选项也会改变 `minProperties` 选项的行为（更多信息见上面的 `minProperties`）。

你可以为对象字面、结构化赋值和命名的导入和导出指定不同的选项。

```json
{
    "object-curly-newline": ["error", {
        "ObjectExpression": "always",
        "ObjectPattern": { "multiline": true },
        "ImportDeclaration": "never",
        "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    }]
}
```

* `"ObjectExpression"`配置对象字词
* `"ObjectPattern"`配置用于重组分配的对象模式
* `"ImportDeclaration"`配置指定的进口。
* `"ExportDeclaration"` 配置命名的出口。

### always

使用此规则与 `"always"` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", "always"]*/
/*eslint-env es6*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {foo() {
    dosomething();
}};

let {} = obj;
let {f} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

:::

使用此规则与 `"always"` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-newline: ["error", "always"]*/
/*eslint-env es6*/

let a = {
};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

:::

### never

使用此规则与 `"never"` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", "never"]*/
/*eslint-env es6*/

let a = {
};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

:::

使用此规则与 `"never"` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-newline: ["error", "never"]*/
/*eslint-env es6*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {foo: function() {
    dosomething();
}};

let {} = obj;
let {f} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

:::

### multiline

使用此规则与 `{ "multiline": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", { "multiline": true }]*/
/*eslint-env es6*/

let a = {
};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {foo: 1,
    bar: 2};
let e = {foo: function() {
    dosomething();
}};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

:::

使用此规则与 `{ "multiline": true }` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-newline: ["error", { "multiline": true }]*/
/*eslint-env es6*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {} = obj;
let {f} = obj;
let {g, h} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

:::

### minProperties

使用此规则与 `{ "minProperties": 2 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", { "minProperties": 2 }]*/
/*eslint-env es6*/

let a = {
};
let b = {
    foo: 1
};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {
    foo: function() {
        dosomething();
    }
};

let {
} = obj;
let {
    f
} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

:::

使用此规则与 `{ "minProperties": 2 }` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-newline: ["error", { "minProperties": 2 }]*/
/*eslint-env es6*/

let a = {};
let b = {foo: 1};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {foo: function() {
    dosomething();
}};

let {} = obj;
let {f} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

:::

### consistent

使用此规则与默认的 `{ "consistent": true }` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", { "consistent": true }]*/
/*eslint-env es6*/

let a = {foo: 1
};
let b = {
    foo: 1};
let c = {foo: 1, bar: 2
};
let d = {
    foo: 1, bar: 2};
let e = {foo: function() {
    dosomething();
    }
};
let f = {
    foo: function() {
    dosomething();}};

let {g
} = obj;
let {
    h} = obj;
let {i, j
} = obj;
let {k, l
} = obj;
let {
    m, n} = obj;
let {
    o, p} = obj;
let {q = function() {
    dosomething();
    }
} = obj;
let {
    r = function() {
        dosomething();
    }} = obj;
```

:::

使用此规则与默认的 `{ "consistent": true }` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-newline: ["error", { "consistent": true }]*/
/*eslint-env es6*/

let empty1 = {};
let empty2 = {
};
let a = {foo: 1};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {foo: function() {dosomething();}};
let f = {
    foo: function() {
        dosomething();
    }
};

let {} = obj;
let {
} = obj;
let {g} = obj;
let {
    h
} = obj;
let {i, j} = obj;
let {
    k, l
} = obj;
let {m,
    n} = obj;
let {
    o,
    p
} = obj;
let {q = function() {dosomething();}} = obj;
let {
    r = function() {
        dosomething();
    }
} = obj;
```

:::

### ObjectExpression and ObjectPattern

使用此规则与 `{ "ObjectExpression": "always", "ObjectPattern": "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", { "ObjectExpression": "always", "ObjectPattern": "never" }]*/
/*eslint-env es6*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {foo: function() {
    dosomething();
}};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

:::

使用此规则与 `{ "ObjectExpression": "always", "ObjectPattern": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-newline: ["error", { "ObjectExpression": "always", "ObjectPattern": "never" }]*/
/*eslint-env es6*/

let a = {
};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {} = obj;
let {f} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

:::

### ImportDeclaration and ExportDeclaration

使用此规则与 `{ "ImportDeclaration": "always", "ExportDeclaration": "never" }` 选项的**错误**示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", { "ImportDeclaration": "always", "ExportDeclaration": "never" }]*/
/*eslint-env es6*/

import {foo, bar} from 'foo-bar';
import {foo as f, bar} from 'foo-bar';
import {foo,
    bar} from 'foo-bar';

export {
   foo,
   bar
};
export {
   foo as f,
   bar
} from 'foo-bar';
```

:::

使用此规则与 `{ "ImportDeclaration": "always", "ExportDeclaration": "never" }` 选项的**正确**示例：

::: correct

```js
/*eslint object-curly-newline: ["error", { "ImportDeclaration": "always", "ExportDeclaration": "never" }]*/
/*eslint-env es6*/

import {
    foo,
    bar
} from 'foo-bar';
import {
    foo, bar
} from 'foo-bar';
import {
    foo as f,
    bar
} from 'foo-bar';

export { foo, bar } from 'foo-bar';
export { foo as f, bar } from 'foo-bar';
```

:::

## 何时不用

如果你不想在开括号后和闭括号前执行一致的换行，你可以安全地禁用此规则。

## 兼容

* **JSCS**：[requirePaddingNewLinesInObjects](https://jscs-dev.github.io/rule/requirePaddingNewLinesInObjects)
* **JSCS**：[disallowPaddingNewLinesInObjects](https://jscs-dev.github.io/rule/disallowPaddingNewLinesInObjects)
