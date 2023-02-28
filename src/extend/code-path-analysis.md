---
title: 代码链路分析详情

---

ESLint 规则可以使用代码链路。
代码链路是指程序的执行顺序。
比如在 `if` 语句中分叉/连接。

```js
if (a && b) {
    foo();
}
bar();
```

![代码链路示例](../assets/images/code-path-analysis/helo.svg)

## 对象

程序可以用几个代码链路来表达。
一个代码链路用两种对象表示：`CodePath` 和 `CodePathSegment`。

### `CodePath`

`CodePath` 表达了一个代码链路整体。
这个对象存在于每个函数和全局中。
它对代码链路初始段和最终段都有引用。

`CodePath` 有以下属性：

* `id`（`string`） - 一个唯一的字符串。各自的规则可以使用 `id` 来保存每个代码链路额外信息。
* `origin`（`string`） - 代码链路开始的原因。可以是 `"program"`、`"function"`、`"class-field-initializer"` 或 `"class-static-block"`.
* `initialSegment`（`CodePathSegment`）- 代码链路初始段。
* `finalSegments`（`CodePathSegment[]`）- 包括返回和抛出的最终段。
* `returnedSegments`（`CodePathSegment[]`）- 只包括返回的最终段。
* `thrownSegments`（`CodePathSegment[]`）- 最后只包括抛出的片段。
* `currentSegments`（`CodePathSegment[]`）- 当前位置的片段。
* `upper`（`CodePath|null`）- 上层函数/全局范围的代码链路。
* `childCodePaths`（`CodePath[]`）- 包括函数代码链路的代码链路。

### `CodePathSegment`

`CodePathSegment` 是代码链路一个部分。
一个代码链路可以用多个 `CodePathSegment` 对象表示，它类似于双链表。
与双链表不同的是，它可以分叉和合并（下一个/前一个是复数）。

`CodePathSegment` 有以下属性：

* `id`（`string`） - 唯一的字符串。各自的规则可以使用 `id` 来保存每个段的额外信息。
* `nextSegments`（`CodePathSegment[]`） - 下一个分段。如果分叉，有两个或更多。如果是最终的，则没有。
* `prevSegments`（`CodePathSegment[]`） - 前一个片段。如果合并则有两个或更多。如果是初始则没有。
* `reachable`（`boolean`） - 显示它是否可以到达的标志。当前面有 `return`、`throw`、`break` 或 `continue` 时，这将变成 `false`。

## 活动

有五个与代码链路有关的事件，你可以在规则中定义事件处理程序。

```js
module.exports = function(context) {
    return {
        /**
         * 这在分析代码链路的开始阶段被调用。
         * 此时代码链路对象只有初始段。
         *
         * @param {CodePath} codePath - 新的代码链路
         * @param {ASTNode} node - 当前节点
         * @returns {void}
         */
        "onCodePathStart": function(codePath, node) {
            // 对 codePath 做点什么
        },

        /**
         * 这是在分析代码链路结束时调用的。
         * 在这个时候，代码链路对象已经完成。
         *
         * @param {CodePath} codePath - 完成的代码路径
         * @param {ASTNode} node - 当前节点
         * @returns {void}
         */
        "onCodePathEnd": function(codePath, node) {
            // 对 codePath 做点什么
        },

        /**
         * 当创建代码链路段时，会调用它。
         * 这意味着代码链路被分叉或合并了。
         * 在这个时候，该段有以前的段，并且已经被
         * 判断为可达或不可达。
         *
         * @param {CodePathSegment} segment - 新的代码链路段
         * @param {ASTNode} node - 当前节点
         * @returns {void}
         */
        "onCodePathSegmentStart": function(segment, node) {
            // 做点什么
        },

        /**
         *当一个代码链路段被留下时，这被调用。
         *在这个时候，该段还没有下一个段。
         *
         * @param {CodePathSegment} segment - 左边的代码链路段
         * @param {ASTNode} node - 当前节点
         * @returns {void}
         */
        "onCodePathSegmentEnd": function(segment, node) {
            // 做点什么
        },

        /**
         * 当代码链路段被循环使用时，会调用它。
         * 通常情况下，段在创建时有每一个前段。
         * 但当循环时，一个段被作为一个新的前段添加到一个
         * 现有的段。
         *
         * @param {CodePathSegment} fromSegment - 代码链路段的源码
         * @param {CodePathSegment} toSegment - 目标代码链路段
         * @param {ASTNode} node - 当前节点
         * @returns {void}
         */
        "onCodePathSegmentLoop": function(fromSegment, toSegment, node) {
            // 做点什么
        }
    };
};
```

### 关于 `onCodePathSegmentLoop`

这个事件会在存在下一个片段时触发。
这个时间点主要是指循环的结束。

示例 1：

```js
while (a) {
    a = foo();
}
bar();
```

1. 首先，分析推进到循环的终点。

   ![循环事件示例 1](./assets/images/code-path-analysis/loop-event-example-while-1.svg)

2. 其次，它创建了循环链路。
   这时，已经存在下一个片段，所以不会触发 `onCodePathSegmentStart` 事件。
   而是触发 `onCodePathSegmentLoop`。

   ![循环事件示例 2](../assets/images/code-path-analysis/loop-event-example-while-2.svg)

3. 最后，它达到终点。

   ![循环事件示例 3](../assets/images/code-path-analysis/loop-event-example-while-3.svg)

示例 2：

```js
for (let i = 0; i < 10; ++i) {
    foo(i);
}
bar();
```

1. `for` 语句更加复杂。
   首先，分析推进到 `ForStatement.update`。
   `update` 段先会停留。

   ![循环事件示例 1](../assets/images/code-path-analysis/loop-event-example-for-1.svg)

2. 第二，它推进到 `ForStatement.body`。
   当然，在 `body` 段之前有 `test` 段。
   它会停留在 `update` 段。

   ![循环事件示例 2](../assets/images/code-path-analysis/loop-event-example-for-2.svg)

3. 第三，它创建了从 `body` 段到 `update` 段的循环路径。
   此时存在下一个，所以不会触发 `onCodePathSegmentStart` 事件。
   而是触发 `onCodePathSegmentLoop`。

   ![循环事件示例 3](../assets/images/code-path-analysis/loop-event-example-for-3.svg)

4. 第四，它还创建了从 `update` 段到 `test` 段的循环路径。
   此时存在下一个段，所以不会触发 `onCodePathSegmentStart` 事件。
   而是触发 `onCodePathSegmentLoop`。

   ![循环事件示例 4](../assets/images/code-path-analysis/loop-event-example-for-4.svg)

5. 最后，到达终点。

   ![循环事件示例 5](../assets/images/code-path-analysis/loop-event-example-for-5.svg)

## 使用示例

### 检查能否执行

```js
function isReachable(segment) {
    return segment.reachable;
}

module.exports = function(context) {
    var codePathStack = [];

    return {
        // 存储 CodePath 对象
        "onCodePathStart": function(codePath) {
            codePathStack.push(codePath);
        },
        "onCodePathEnd": function(codePath) {
            codePathStack.pop();
        },

        // 检查能否执行
        "ExpressionStatement": function(node) {
            var codePath = codePathStack[codePathStack.length - 1];

            // 检查当前的代码链路段
            if (!codePath.currentSegments.some(isReachable)) {
                context.report({message: "Unreachable!", node: node});
            }
        }
    };
};
```

参见：
[no-unreachable](https://github.com/eslint/eslint/blob/HEAD/lib/rules/no-unreachable.js),
[no-fallthrough](https://github.com/eslint/eslint/blob/HEAD/lib/rules/no-fallthrough.js),
[consistent-return](https://github.com/eslint/eslint/blob/HEAD/lib/rules/consistent-return.js)

### 要想检查代码链路状态

此示例检查每个链路中是否调用了 `cb` 参数。
`CodePath` 和 `CodePathSegment` 的实例被共享给每个规则。
所以规则不能也不应该修改这些实例。
请使用信息来代替。

```js
function hasCb(node, context) {
    if (node.type.indexOf("Function") !== -1) {
        return context.getDeclaredVariables(node).some(function(v) {
            return v.type === "Parameter" && v.name === "cb";
        });
    }
    return false;
}

function isCbCalled(info) {
    return info.cbCalled;
}

module.exports = function(context) {
    var funcInfoStack = [];
    var segmentInfoMap = Object.create(null);

    return {
        // 检查 `cb`.
        "onCodePathStart": function(codePath, node) {
            funcInfoStack.push({
                codePath: codePath,
                hasCb: hasCb(node, context)
            });
        },
        "onCodePathEnd": function(codePath, node) {
            funcInfoStack.pop();

            // 检查每个链路是否调用了 `cb`
            var cbCalled = codePath.finalSegments.every(function(segment) {
                var info = segmentInfoMap[segment.id];
                return info.cbCalled;
            });

            if (!cbCalled) {
                context.report({
                    message: "`cb` should be called in every path.",
                    node: node
                });
            }
        },

        // 管理代码链路状态
        "onCodePathSegmentStart": function(segment) {
            var funcInfo = funcInfoStack[funcInfoStack.length - 1];

            // 如果不存在 `cb`，则忽略。
            if (!funcInfo.hasCb) {
                return;
            }

            // 初始化这个链路的状态。
            var info = segmentInfoMap[segment.id] = {
                cbCalled: false
            };

            // 如果有以前的链路，则合并状态
            // 检查每个此前的链路是否调用了 `cb`
            if (segment.prevSegments.length > 0) {
                info.cbCalled = segment.prevSegments.every(isCbCalled);
            }
        },

        // 检查是否可达
        "CallExpression": function(node) {
            var funcInfo = funcInfoStack[funcInfoStack.length - 1];

            // 如果不存在 `cb`，则忽略
            if (!funcInfo.hasCb) {
                return;
            }

            // 设置调用 `cb` 的标记。
            var callee = node.callee;
            if (callee.type === "Identifier" && callee.name === "cb") {
                funcInfo.codePath.currentSegments.forEach(function(segment) {
                    var info = segmentInfoMap[segment.id];
                    info.cbCalled = true;
                });
            }
        }
    };
};
```

参见：
[constructor-super](https://github.com/eslint/eslint/blob/HEAD/lib/rules/constructor-super.js),
[no-this-before-super](https://github.com/eslint/eslint/blob/HEAD/lib/rules/no-this-before-super.js)

## 代码链路示例

### Hello World

```js
console.log("Hello world!");
```

![Hello World](../assets/images/code-path-analysis/example-hello-world.svg)

### `IfStatement`

```js
if (a) {
    foo();
} else {
    bar();
}
```

![`IfStatement`](../assets/images/code-path-analysis/example-ifstatement.svg)

### `IfStatement`（链）

```js
if (a) {
    foo();
} else if (b) {
    bar();
} else if (c) {
    hoge();
}
```

![`IfStatement`（链）](../assets/images/code-path-analysis/example-ifstatement-chain.svg)

### `SwitchStatement`

```js
switch (a) {
    case 0:
        foo();
        break;

    case 1:
    case 2:
        bar();
        // fallthrough

    case 3:
        hoge();
        break;
}
```

![`SwitchStatement`](../assets/images/code-path-analysis/example-switchstatement.svg)

### `SwitchStatement`（有 `default` 值）

```js
switch (a) {
    case 0:
        foo();
        break;

    case 1:
    case 2:
        bar();
        // fallthrough

    case 3:
        hoge();
        break;

    default:
        fuga();
        break;
}
```

![`SwitchStatement`（有 `default` 值）](../assets/images/code-path-analysis/example-switchstatement-has-default.svg)

### `TryStatement` (try-catch)

```js
try {
    foo();
    if (a) {
        throw new Error();
    }
    bar();
} catch (err) {
    hoge(err);
}
last();
```

它会在以下地方创建了从 `try` 块到 `catch` 块的路径：

* `throw` 语句。
* `try` 块中的第一个可抛节点（如调用函数）。
* `try` 块的结束。

![`TryStatement` (try-catch)](../assets/images/code-path-analysis/example-trystatement-try-catch.svg)

### `TryStatement` (try-finally)

```js
try {
    foo();
    bar();
} finally {
    fuga();
}
last();
```

如果没有 `catch`、`finally` 块有两个当前段。
这时，`CodePath.currentSegments.length` 是 `2`。
一个是正常路径，另一个是返回路径（`throw` 或 `return`）。

![`TryStatement` (try-finally)](../assets/images/code-path-analysis/example-trystatement-try-finally.svg)

### `TryStatement` (try-catch-finally)

```js
try {
    foo();
    bar();
} catch (err) {
    hoge(err);
} finally {
    fuga();
}
last();
```

![`TryStatement` (try-catch-finally)](../assets/images/code-path-analysis/example-trystatement-try-catch-finally.svg)

### `WhileStatement`

```js
while (a) {
    foo();
    if (b) {
        continue;
    }
    bar();
}
```

![`WhileStatement`](../assets/images/code-path-analysis/example-whilestatement.svg)

### `DoWhileStatement`

```js
do {
    foo();
    bar();
} while (a);
```

![`DoWhileStatement`](../assets/images/code-path-analysis/example-dowhilestatement.svg)

### `ForStatement`

```js
for (let i = 0; i < 10; ++i) {
    foo();
    if (b) {
        break;
    }
    bar();
}
```

![`ForStatement`](../assets/images/code-path-analysis/example-forstatement.svg)

### `ForStatement`（永远）

```js
for (;;) {
    foo();
}
bar();
```

![`ForStatement`（永远）](../assets/images/code-path-analysis/example-forstatement-for-ever.svg)

### `ForInStatement`

```js
for (let key in obj) {
    foo(key);
}
```

![`ForInStatement`](../assets/images/code-path-analysis/example-forinstatement.svg)

### 当有函数时

```js
function foo(a) {
    if (a) {
        return;
    }
    bar();
}

foo(false);
```

它创建了两个代码链路：

* 全局：

  ![当有函数时](../assets/images/code-path-analysis/example-when-there-is-a-function-g.svg)

* 仅该函数：

  ![当有函数时](../assets/images/code-path-analysis/example-when-there-is-a-function-f.svg)
