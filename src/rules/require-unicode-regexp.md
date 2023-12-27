---
title: require-unicode-regexp
rule_type: suggestion
---

正则 `u` 标志有两个作用。

1. **使正则表达式正确处理 UTF-16 代用对**。

    特别是，字符范围语法得到正确的行为。

    ```js
    /^[👍]$/.test("👍") //→ false
    /^[👍]$/u.test("👍") //→ true
    ```

2. **使正则表达式尽早抛出语法错误，因为禁用[附件 B 扩展](https://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns)**。

    由于历史原因，JavaScript 正则表达式对语法错误是宽容的。例如，`/\w{1, 2/` 是一个语法错误，但是 JavaScript 并没有抛出这个错误。它匹配的是诸如 `"a{1, 2"` 这样的字符串。这样的恢复逻辑在附件 B 中进行了定义。

    `u` 标志禁用了附件 B 定义的恢复逻辑。因此，你可以提前发现错误。这类似于[严格模式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)。

正则表达式中的 `v` 标志是在 ECMAScript 2024 中引入的，它是 `u` 标志的一个超集，并提供了两个额外的功能：

1. **字符串的 Unicode 属性**

    使用 Unicode 属性转义，你可以使用字符串的属性。

    ```js
    const re = /^\p{RGI_Emoji}$/v;

    // Match an emoji that consists of just 1 code point:
    re.test('⚽'); // '\u26BD'
    // → true ✅

    // Match an emoji that consists of multiple code points:
    re.test('👨🏾‍⚕️'); // '\u{1F468}\u{1F3FE}\u200D\u2695\uFE0F'
    // → true ✅
    ```

2. **集合表示法**

    它允许在字符类之间进行集合操作。

    ```js
    const re = /[\p{White_Space}&&\p{ASCII}]/v;
    re.test('\n'); // → true
    re.test('\u2028'); // → false
    ```

请查看 <https://github.com/tc39/proposal-regexp-v-flag> 和 <https://v8.dev/features/regexp-v-flag> 以获取更多详细信息。

因此，`u` 和 `v` 标志让我们更好地处理正则表达式。

## 规则细节

这条规则的目的是在正则表达式上强制使用 `u` 标志。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint require-unicode-regexp: error */

const a = /aaa/
const b = /bbb/gi
const c = new RegExp("ccc")
const d = new RegExp("ddd", "gi")

const e = /aaa/v
const f = /bbb/giv
const g = new RegExp("ccc", "v")
const h = new RegExp("ddd", "giv")
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint require-unicode-regexp: error */

const a = /aaa/u
const b = /bbb/giu
const c = new RegExp("ccc", "u")
const d = new RegExp("ddd", "giu")

// This rule ignores RegExp calls if the flags could not be evaluated to a static value.
function f(flags) {
    return new RegExp("eee", flags)
}
```

:::

## 何时不用

如果你不想通知没有 `u` 标志的正则表达式，你可以安全地禁用此规则。
