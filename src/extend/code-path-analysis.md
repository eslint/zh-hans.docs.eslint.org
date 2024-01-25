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

:::img-container
![代码链路示例](../assets/images/code-path-analysis/helo.svg)
:::

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
* `initialSegment`（`CodePathSegment`） - 代码链路初始段。
* `finalSegments`（`CodePathSegment[]`） - 包括返回和抛出的最终段。
* `returnedSegments`（`CodePathSegment[]`） - 只包括返回的最终段。
* `thrownSegments`（`CodePathSegment[]`） - 最后只包括抛出的片段。
* `currentSegments`（`CodePathSegment[]`） - 当前位置的片段。
* `upper`（`CodePath|null`） - 上层函数/全局范围的代码链路。
* `childCodePaths`（`CodePath[]`） - 包括函数代码链路的代码链路。

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
module.exports = {
    meta: {
        // ...
    },
    create(context) {

        return {
            /**
             * This is called at the start of analyzing a code path.
             * In this time, the code path object has only the initial segment.
             *
             * @param {CodePath} codePath - The new code path.
             * @param {ASTNode} node - The current node.
             * @returns {void}
             */
            onCodePathStart(codePath, node) {
                // do something with codePath
            },

            /**
             * This is called at the end of analyzing a code path.
             * In this time, the code path object is complete.
             *
             * @param {CodePath} codePath - The completed code path.
             * @param {ASTNode} node - The current node.
             * @returns {void}
             */
            onCodePathEnd(codePath, node) {
                // do something with codePath
            },

            /**
             * This is called when a reachable code path segment was created.
             * It meant the code path is forked or merged.
             * In this time, the segment has the previous segments and has been
             * judged reachable or not.
             *
             * @param {CodePathSegment} segment - The new code path segment.
             * @param {ASTNode} node - The current node.
             * @returns {void}
             */
            onCodePathSegmentStart(segment, node) {
                // do something with segment
            },

            /**
             * This is called when a reachable code path segment was left.
             * In this time, the segment does not have the next segments yet.
             *
             * @param {CodePathSegment} segment - The left code path segment.
             * @param {ASTNode} node - The current node.
             * @returns {void}
             */
            onCodePathSegmentEnd(segment, node) {
                // do something with segment
            },

            /**
             * This is called when an unreachable code path segment was created.
             * It meant the code path is forked or merged.
             * In this time, the segment has the previous segments and has been
             * judged reachable or not.
             *
             * @param {CodePathSegment} segment - The new code path segment.
             * @param {ASTNode} node - The current node.
             * @returns {void}
             */
            onUnreachableCodePathSegmentStart(segment, node) {
                // do something with segment
            },

            /**
             * This is called when an unreachable code path segment was left.
             * In this time, the segment does not have the next segments yet.
             *
             * @param {CodePathSegment} segment - The left code path segment.
             * @param {ASTNode} node - The current node.
             * @returns {void}
             */
            onUnreachableCodePathSegmentEnd(segment, node) {
                // do something with segment
            },

            /**
             * This is called when a code path segment was looped.
             * Usually segments have each previous segments when created,
             * but when looped, a segment is added as a new previous segment into a
             * existing segment.
             *
             * @param {CodePathSegment} fromSegment - A code path segment of source.
             * @param {CodePathSegment} toSegment - A code path segment of destination.
             * @param {ASTNode} node - The current node.
             * @returns {void}
             */
            onCodePathSegmentLoop(fromSegment, toSegment, node) {
                // do something with segment
            }
        };

    }
}
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

:::img-container
   ![循环事件示例 1](../assets/images/code-path-analysis/loop-event-example-while-1.svg)
:::

1. 其次，它创建了循环链路。
   这时，已经存在下一个片段，所以不会触发 `onCodePathSegmentStart` 事件。
   而是触发 `onCodePathSegmentLoop`。

:::img-container
   ![循环事件示例 2](../assets/images/code-path-analysis/loop-event-example-while-2.svg)
:::

1. 最后，它达到终点。

:::img-container
   ![循环事件示例 3](../assets/images/code-path-analysis/loop-event-example-while-3.svg)
:::

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

:::img-container
   ![循环事件示例 1](../assets/images/code-path-analysis/loop-event-example-for-1.svg)
:::

2. 第二，它推进到 `ForStatement.body`。
   当然，在 `body` 段之前有 `test` 段。
   它会停留在 `update` 段。

:::img-container
   ![循环事件示例 2](../assets/images/code-path-analysis/loop-event-example-for-2.svg)
:::

3. 第三，它创建了从 `body` 段到 `update` 段的循环路径。
   此时存在下一个，所以不会触发 `onCodePathSegmentStart` 事件。
   而是触发 `onCodePathSegmentLoop`。

:::img-container
   ![循环事件示例 3](../assets/images/code-path-analysis/loop-event-example-for-3.svg)
:::

4. 第四，它还创建了从 `update` 段到 `test` 段的循环路径。
   此时存在下一个段，所以不会触发 `onCodePathSegmentStart` 事件。
   而是触发 `onCodePathSegmentLoop`。

:::img-container
   ![循环事件示例 4](../assets/images/code-path-analysis/loop-event-example-for-4.svg)
:::

5. 最后，到达终点。

:::img-container
   ![循环事件示例 5](../assets/images/code-path-analysis/loop-event-example-for-5.svg)
:::

## 使用示例

### 跟踪当前代码段位置

要跟踪当前代码路径段的位置，你可以定义一个规则，如下所示：

```js
module.exports = {
    meta: {
        // ...
    },
    create(context) {

        // tracks the code path we are currently in
        let currentCodePath;

        // tracks the segments we've traversed in the current code path
        let currentSegments;

        // tracks all current segments for all open paths
        const allCurrentSegments = [];

        return {

            onCodePathStart(codePath) {
                currentCodePath = codePath;
                allCurrentSegments.push(currentSegments);
                currentSegments = new Set();
            },

            onCodePathEnd(codePath) {
                currentCodePath = codePath.upper;
                currentSegments = allCurrentSegments.pop();
            },

            onCodePathSegmentStart(segment) {
                currentSegments.add(segment);
            },

            onCodePathSegmentEnd(segment) {
                currentSegments.delete(segment);
            },

            onUnreachableCodePathSegmentStart(segment) {
                currentSegments.add(segment);
            },

            onUnreachableCodePathSegmentEnd(segment) {
                currentSegments.delete(segment);
            }
        };

    }
};
```

在这个例子中，`currentCodePath` 变量用于访问当前正在遍历的代码路径，而 `currentSegments` 变量则跟踪到目前为止已经遍历的该代码路径中的段。请注意，`currentSegments` 既开始时为空集，也在遍历进行时不断更新。

跟踪当前代码路径段的位置有助于分析导致特定节点的代码路径，就像在下一个例子中所示。

### 寻找不可达的节点

要找到不可达的节点，跟踪当前代码路径段的位置，然后使用节点访问器检查是否有任何可达的段。例如，以下代码查找任何不可达的 `ExpressionStatement`。

```js
function areAnySegmentsReachable(segments) {
    for (const segment of segments) {
        if (segment.reachable) {
            return true;
        }
    }

    return false;
}

module.exports = {
    meta: {
        // ...
    },
    create(context) {

        // tracks the code path we are currently in
        let currentCodePath;

        // tracks the segments we've traversed in the current code path
        let currentSegments;

        // tracks all current segments for all open paths
        const allCurrentSegments = [];

        return {

            onCodePathStart(codePath) {
                currentCodePath = codePath;
                allCurrentSegments.push(currentSegments);
                currentSegments = new Set();
            },

            onCodePathEnd(codePath) {
                currentCodePath = codePath.upper;
                currentSegments = allCurrentSegments.pop();
            },

            onCodePathSegmentStart(segment) {
                currentSegments.add(segment);
            },

            onCodePathSegmentEnd(segment) {
                currentSegments.delete(segment);
            },

            onUnreachableCodePathSegmentStart(segment) {
                currentSegments.add(segment);
            },

            onUnreachableCodePathSegmentEnd(segment) {
                currentSegments.delete(segment);
            },

            ExpressionStatement(node) {

                // check all the code path segments that led to this node
                if (!areAnySegmentsReachable(currentSegments)) {
                    context.report({ message: "Unreachable!", node });
                }
            }

        };

    }
};
```

参见：
[no-unreachable](https://github.com/eslint/eslint/blob/HEAD/lib/rules/no-unreachable.js),
[no-fallthrough](https://github.com/eslint/eslint/blob/HEAD/lib/rules/no-fallthrough.js),
[consistent-return](https://github.com/eslint/eslint/blob/HEAD/lib/rules/consistent-return.js)

### 检查是否每个路径都调用了函数

此示例检查每个链路中是否调用了 `cb` 参数。
`CodePath` 和 `CodePathSegment` 的实例被共享给每个规则。
所以规则不能也不应该修改这些实例。
请使用信息来代替。

```js
function hasCb(node, context) {
    if (node.type.indexOf("Function") !== -1) {
        const sourceCode = context.sourceCode;
        return sourceCode.getDeclaredVariables(node).some(function(v) {
            return v.type === "Parameter" && v.name === "cb";
        });
    }
    return false;
}

function isCbCalled(info) {
    return info.cbCalled;
}

module.exports = {
    meta: {
        // ...
    },
    create(context) {

        let funcInfo;
        const funcInfoStack = [];
        const segmentInfoMap = Object.create(null);

        return {
            // Checks `cb`.
            onCodePathStart(codePath, node) {
                funcInfoStack.push(funcInfo);

                funcInfo = {
                    codePath: codePath,
                    hasCb: hasCb(node, context),
                    currentSegments: new Set()
                };
            },

            onCodePathEnd(codePath, node) {
                funcInfo = funcInfoStack.pop();

                // Checks `cb` was called in every paths.
                const cbCalled = codePath.finalSegments.every(function(segment) {
                    const info = segmentInfoMap[segment.id];
                    return info.cbCalled;
                });

                if (!cbCalled) {
                    context.report({
                        message: "`cb` should be called in every path.",
                        node: node
                    });
                }
            },

            // Manages state of code paths and tracks traversed segments
            onCodePathSegmentStart(segment) {

                funcInfo.currentSegments.add(segment);

                // Ignores if `cb` doesn't exist.
                if (!funcInfo.hasCb) {
                    return;
                }

                // Initialize state of this path.
                const info = segmentInfoMap[segment.id] = {
                    cbCalled: false
                };

                // If there are the previous paths, merges state.
                // Checks `cb` was called in every previous path.
                if (segment.prevSegments.length > 0) {
                    info.cbCalled = segment.prevSegments.every(isCbCalled);
                }
            },

            // Tracks unreachable segment traversal
            onUnreachableCodePathSegmentStart(segment) {
                funcInfo.currentSegments.add(segment);
            },

            // Tracks reachable segment traversal
            onCodePathSegmentEnd(segment) {
                funcInfo.currentSegments.delete(segment);
            },

            // Tracks unreachable segment traversal
            onUnreachableCodePathSegmentEnd(segment) {
                funcInfo.currentSegments.delete(segment);
            },

            // Checks reachable or not.
            CallExpression(node) {

                // Ignores if `cb` doesn't exist.
                if (!funcInfo.hasCb) {
                    return;
                }

                // Sets marks that `cb` was called.
                const callee = node.callee;
                if (callee.type === "Identifier" && callee.name === "cb") {
                    funcInfo.currentSegments.forEach(segment => {
                        const info = segmentInfoMap[segment.id];
                        info.cbCalled = true;
                    });
                }
            }
        };
    }
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

:::img-container
![Hello World](../assets/images/code-path-analysis/example-hello-world.svg)
:::

### `IfStatement`

```js
if (a) {
    foo();
} else {
    bar();
}
```

:::img-container
![`IfStatement`](../assets/images/code-path-analysis/example-ifstatement.svg)
:::

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

:::img-container
![`IfStatement`（链）](../assets/images/code-path-analysis/example-ifstatement-chain.svg)
:::

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

:::img-container
![`SwitchStatement`](../assets/images/code-path-analysis/example-switchstatement.svg)
:::

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

:::img-container
![`SwitchStatement`（有 `default` 值）](../assets/images/code-path-analysis/example-switchstatement-has-default.svg)
:::

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

:::img-container
![`TryStatement` (try-catch)](../assets/images/code-path-analysis/example-trystatement-try-catch.svg)
:::

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

:::img-container
![`TryStatement` (try-finally)](../assets/images/code-path-analysis/example-trystatement-try-finally.svg)
:::

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

:::img-container
![`TryStatement` (try-catch-finally)](../assets/images/code-path-analysis/example-trystatement-try-catch-finally.svg)
:::

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

:::img-container
![`WhileStatement`](../assets/images/code-path-analysis/example-whilestatement.svg)
:::

### `DoWhileStatement`

```js
do {
    foo();
    bar();
} while (a);
```

:::img-container
![`DoWhileStatement`](../assets/images/code-path-analysis/example-dowhilestatement.svg)
:::

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

:::img-container
![`ForStatement`](../assets/images/code-path-analysis/example-forstatement.svg)
:::

### `ForStatement`（永远）

```js
for (;;) {
    foo();
}
bar();
```

:::img-container
![`ForStatement`（永远）](../assets/images/code-path-analysis/example-forstatement-for-ever.svg)
:::

### `ForInStatement`

```js
for (let key in obj) {
    foo(key);
}
```

:::img-container
![`ForInStatement`](../assets/images/code-path-analysis/example-forinstatement.svg)
:::

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

:::img-container
  ![当有函数时](../assets/images/code-path-analysis/example-when-there-is-a-function-g.svg)
:::

* 仅该函数：

:::img-container
  ![当有函数时](../assets/images/code-path-analysis/example-when-there-is-a-function-f.svg)
:::
