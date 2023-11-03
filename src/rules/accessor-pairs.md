---
title: accessor-pairs
rule_type: suggestion
related_rules:
- no-dupe-keys
- no-dupe-class-members
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
---

在 JavaScript 中，一个常见的错误是，在创建一个对象时，只为一个属性设置了一个 setter，但从来没有为它定义一个相应的 getter。没有 getter，你就无法读取该属性，所以它最终不会被使用。

下面是一些示例：

```js
// 坏
var o = {
    set a(value) {
        this.val = value;
    }
};


// 好
var o = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};

```

如果定义了 setter 而没有 getter，该规则会发出警告。使用选项 `getWithoutSet`，如果你有一个没有 setter 的 getter，它也会发出警告。

## 规则细节

这条规则执行一种风格，它要求每个定义了 setter 的属性都要有一个 getter。

通过激活 `getWithoutSet` 选项，它强制要求每个定义了 setter 的属性都有一个 setter。

这个规则总是检查对象字面和属性描述符。默认情况下，它也检查类声明和类表达式。

## 选项

* 将 `setWithoutGet` 设置为 `true` 后，会对于没有 getters 的 setters，将发出警告（默认为 `true`）。
* 将 `getWithoutSet` 设置为 `true` 后，会对于没有 setters 的 getters，将发出警告（默认为 `false`）。
* 将 `enforceForClassMembers` 设置为 `true` 此外，还将这一规则应用于类的 getters/setters（默认为 `true`）如果你想让这一规则忽略类的声明和类的表达式，将 `enforceForClassMembers` 设置为 `false`。


### setWithoutGet

使用默认 `{ "setWithoutGet": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint accessor-pairs: "error"*/

var o = {
    set a(value) {
        this.val = value;
    }
};


var o = {d: 1};
Object.defineProperty(o, 'c', {
    set: function(value) {
        this.val = value;
    }
});
```

:::

使用默认 `{ "setWithoutGet": true }` 选项的**正确**示例：

:::correct

```js
/*eslint accessor-pairs: "error"*/

var o = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};

var o = {d: 1};
Object.defineProperty(o, 'c', {
    set: function(value) {
        this.val = value;
    },
    get: function() {
        return this.val;
    }
});

```

:::

### getWithoutSet

使用 `{ "getWithoutSet": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint accessor-pairs: ["error", { "getWithoutSet": true }]*/

var o = {
    set a(value) {
        this.val = value;
    }
};

var o = {
    get a() {
        return this.val;
    }
};

var o = {d: 1};
Object.defineProperty(o, 'c', {
    set: function(value) {
        this.val = value;
    }
});

var o = {d: 1};
Object.defineProperty(o, 'c', {
    get: function() {
        return this.val;
    }
});
```

:::

使用 `{ "getWithoutSet": true }` 选项的**正确**示例：

:::correct

```js
/*eslint accessor-pairs: ["error", { "getWithoutSet": true }]*/
var o = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};

var o = {d: 1};
Object.defineProperty(o, 'c', {
    set: function(value) {
        this.val = value;
    },
    get: function() {
        return this.val;
    }
});

```

:::

### enforceForClassMembers

当 `enforceForClassMembers` 设置为 `true`（默认值）时：

* `"getWithoutSet": true` 会对类中没有 setters 的 getters 发出警告。
* `"setWithoutGet": true` 会对类中没有 getters 的 setters 发出警告。

使用 `{ "getWithoutSet": true, "enforceForClassMembers": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint accessor-pairs: ["error", { "getWithoutSet": true, "enforceForClassMembers": true }]*/

class Foo {
    get a() {
        return this.val;
    }
}

class Bar {
    static get a() {
        return this.val;
    }
}

const Baz = class {
    get a() {
        return this.val;
    }
    static set a(value) {
        this.val = value;
    }
}
```

:::

使用 `{ "setWithoutGet": true, "enforceForClassMembers": true }` 选项的**错误**示例：

:::incorrect

```js
/*eslint accessor-pairs: ["error", { "setWithoutGet": true, "enforceForClassMembers": true }]*/

class Foo {
    set a(value) {
        this.val = value;
    }
}

const Bar = class {
    static set a(value) {
        this.val = value;
    }
}
```

:::

当 `enforceForClassMembers` 设置为 `false` 时，该规则将忽略类。

使用 `{ "getWithoutSet": true, "setWithoutGet": true, "enforceForClassMembers": false }` 选项的**正确**示例：

:::correct

```js
/*eslint accessor-pairs: ["error", {
    "getWithoutSet": true, "setWithoutGet": true, "enforceForClassMembers": false
}]*/

class Foo {
    get a() {
        return this.val;
    }
}

class Bar {
    static set a(value) {
        this.val = value;
    }
}

const Baz = class {
    static get a() {
        return this.val;
    }
}

const Quux = class {
    set a(value) {
        this.val = value;
    }
}
```

:::

## 已知限制

由于静态分析的限制，这个规则没有考虑到可能的副作用，在某些情况下可能不会报告缺失的 getter/setter 对，就像下面的例子：

```js
/*eslint accessor-pairs: "error"*/

var a = 1;

// no warnings
var o = {
    get [a++]() {
        return this.val;
    },
    set [a++](value) {
        this.val = value;
    }
};
```

另外，这条规则不允许在对象字面和类定义中出现重复的键，在某些情况下，有重复的键的话可能不会报告缺少 getter/setter 对，如下面的例子：

```js
/*eslint accessor-pairs: "error"*/

// no warnings
var o = {
    get a() {
        return this.val;
    },
    a: 1,
    set a(value) {
        this.val = value;
    }
};
```

上面的代码创建了一个只有属性 `"a"` 的 setter 的对象。

如果你也希望在对象字面中不允许有重复键，请参见 [no-dupe-keys](no-dupe-keys)

如果你也希望在类的定义中不允许有重复的名称，请参见 [no-dupe-class-members](no-dupe-class-members)

## 何时不用

如果你不关心对象上同时存在的 setters 和 getters，你可以关闭这个规则。
