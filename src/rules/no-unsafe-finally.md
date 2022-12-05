---
title: no-unsafe-finally
layout: doc
rule_type: problem
---

JavaScript 会暂停 `try` 和 `catch` 块的控制流语句，直到`finally` 块执行完毕。因此，当 `return`、`throw`、`break` 或 `continue` 在 `finally` 中使用时，`try` 和 `catch` 中的控制流语句会被覆盖，这被认为是意外行为。比如：

```js
// We expect this function to return 1;
(() => {
    try {
        return 1; // 1 is returned but suspended until finally block ends
    } catch(err) {
        return 2;
    } finally {
        return 3; // 3 is returned before 1, which we did not expect
    }
})();

// > 3
```

```js
// We expect this function to throw an error, then return
(() => {
    try {
        throw new Error("Try"); // error is thrown but suspended until finally block ends
    } finally {
        return 3; // 3 is returned before the error is thrown, which we did not expect
    }
})();

// > 3
```

```js
// We expect this function to throw Try(...) error from the catch block
(() => {
    try {
        throw new Error("Try")
    } catch(err) {
        throw err; // The error thrown from try block is caught and rethrown
    } finally {
        throw new Error("Finally"); // Finally(...) is thrown, which we did not expect
    }
})();

// > Uncaught Error: Finally(...)
```

```js
// We expect this function to return 0 from try block.
(() => {
  label: try {
    return 0; // 0 is returned but suspended until finally block ends
  } finally {
    break label; // It breaks out the try-finally block, before 0 is returned.
  }
  return 1;
})();

// > 1
```

## 规则细节

使用此规则禁用 `return`, `throw`, `break`, 和 `continue` 语句。在 `finally` 块内。它允许间接使用，例如在 `function` 或 `class` 定义中。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        return 3;
    }
};
```

:::

::: incorrect

```js
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        throw new Error;
    }
};
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        console.log("hola!");
    }
};
```

:::

::: correct

```js
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        let a = function() {
            return "hola!";
        }
    }
};
```

:::

::: correct

```js
/*eslint no-unsafe-finally: "error"*/
let foo = function(a) {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        switch(a) {
            case 1: {
                console.log("hola!")
                break;
            }
        }
    }
};
```

:::

## 何时不用

如果你想允许在 `finally` 块中进行控制流操作，你可以关闭这个规则。
