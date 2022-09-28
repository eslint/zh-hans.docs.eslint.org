---
title: grouped-accessor-pairs
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/grouped-accessor-pairs.md
rule_type: suggestion
related_rules:
- accessor-pairs
- no-dupe-keys
- no-dupe-class-members
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
---

同一属性的 getter 和 setter 不一定要相邻定义。

例如，下面的语句将创建同一个对象：

```js
var o = {
    get a() {
        return this.val;
    },
    set a(value) {
        this.val = value;
    },
    b: 1
};

var o = {
    get a() {
        return this.val;
    },
    b: 1,
    set a(value) {
        this.val = value;
    }
};
```

虽然允许在对象或类定义中的任何地方定义 getter 或 setter 对，但为同一属性分组访问函数被认为是一种最佳做法。

换句话说，如果一个属性有一个 getter 和一个 setter，setter 应该定义在 getter 之后，或者反之亦然。

## 规则细节

这条规则要求在对象字面、类声明和类表达式中对同一属性的访问函数进行分组定义。

作为选择，本规则也可以强制执行一致的顺序（`getBeforeSet`或`setBeforeGet`）。

这条规则并不强制要求 getter 或 setter 的配对存在。如果你也想强制执行 getter/setter 对，请参阅 [accessor-pairs](accessor-pairs)。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint grouped-accessor-pairs: "error"*/

var foo = {
    get a() {
        return this.val;
    },
    b: 1,
    set a(value) {
        this.val = value;
    }
};

var bar = {
    set b(value) {
        this.val = value;
    },
    a: 1,
    get b() {
        return this.val;
    }
}

class Foo {
    set a(value) {
        this.val = value;
    }
    b(){}
    get a() {
        return this.val;
    }
}

const Bar = class {
    static get a() {
        return this.val;
    }
    b(){}
    static set a(value) {
        this.val = value;
    }
}
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint grouped-accessor-pairs: "error"*/

var foo = {
    get a() {
        return this.val;
    },
    set a(value) {
        this.val = value;
    },
    b: 1
};

var bar = {
    set b(value) {
        this.val = value;
    },
    get b() {
        return this.val;
    },
    a: 1
}

class Foo {
    set a(value) {
        this.val = value;
    }
    get a() {
        return this.val;
    }
    b(){}
}

const Bar = class {
    static get a() {
        return this.val;
    }
    static set a(value) {
        this.val = value;
    }
    b(){}
}
```

:::

## 选项

此规则选项为字符串：

* `"anyOrder"`（默认值）不强制执行顺序。
* `"getBeforeSet"` 如果一个属性同时有 getter 和 setter，要求 getter 在 setter 之前被定义。
* `"setBeforeGet"` 如果一个属性同时有 getter 和 setter，要求 setter 在 getter 之前定义。

### getBeforeSet

使用此规则与 `"getBeforeSet"` 选项的**错误**示例：

::: incorrect

```js
/*eslint grouped-accessor-pairs: ["error", "getBeforeSet"]*/

var foo = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};

class Foo {
    set a(value) {
        this.val = value;
    }
    get a() {
        return this.val;
    }
}

const Bar = class {
    static set a(value) {
        this.val = value;
    }
    static get a() {
        return this.val;
    }
}
```

:::

使用此规则与 `"getBeforeSet"` 选项的**正确**示例：

::: correct

```js
/*eslint grouped-accessor-pairs: ["error", "getBeforeSet"]*/

var foo = {
    get a() {
        return this.val;
    },
    set a(value) {
        this.val = value;
    }
};

class Foo {
    get a() {
        return this.val;
    }
    set a(value) {
        this.val = value;
    }
}

const Bar = class {
    static get a() {
        return this.val;
    }
    static set a(value) {
        this.val = value;
    }
}
```

:::

### setBeforeGet

使用此规则与 `"setBeforeGet"` 选项的**错误**示例：

::: incorrect

```js
/*eslint grouped-accessor-pairs: ["error", "setBeforeGet"]*/

var foo = {
    get a() {
        return this.val;
    },
    set a(value) {
        this.val = value;
    }
};

class Foo {
    get a() {
        return this.val;
    }
    set a(value) {
        this.val = value;
    }
}

const Bar = class {
    static get a() {
        return this.val;
    }
    static set a(value) {
        this.val = value;
    }
}
```

:::

使用此规则与 `"setBeforeGet"` 选项的**正确**示例：

::: correct

```js
/*eslint grouped-accessor-pairs: ["error", "setBeforeGet"]*/

var foo = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};

class Foo {
    set a(value) {
        this.val = value;
    }
    get a() {
        return this.val;
    }
}

const Bar = class {
    static set a(value) {
        this.val = value;
    }
    static get a() {
        return this.val;
    }
}
```

:::

## 已知限制

由于静态分析的限制，这个规则没有考虑到可能的副作用，在某些情况下
可能需要或不需要对有计算键的 getters/setters 进行分组或排序，如下面的例子：

```js
/*eslint grouped-accessor-pairs: "error"*/

var a = 1;

// false warning (false positive)
var foo = {
    get [a++]() {
        return this.val;
    },
    b: 1,
    set [a++](value) {
        this.val = value;
    }
};

// missed warning (false negative)
var bar = {
    get [++a]() {
        return this.val;
    },
    b: 1,
    set [a](value) {
        this.val = value;
    }
};
```

另外，对于有重复的 getters 或 setters 的属性，这个规则不会报告任何警告。

如果你也想禁止对象字面的重复键，请参见 [no-dupe-keys](no-dupe-keys)。

如果你也想禁止类定义中的重复名称，请参见 [no-dupe-class-members](no-dupe-class-members)。
