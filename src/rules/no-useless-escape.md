---
title: no-useless-escape
layout: doc
rule_type: suggestion
---

在字符串、模板字面和正则表达式中省略非特殊字符不会有任何影响，如下例所示：

```js
let foo = "hol\a"; // > foo = "hola"
let bar = `${foo}\!`; // > bar = "hola!"
let baz = /\:/ // same functionality with /:/
```

## 规则细节

这条规则标志着可以安全地删除转义而不改变行为。

使用此规则的**错误**示例：

::: incorrect

```js
/*eslint no-useless-escape: "error"*/

"\'";
'\"';
"\#";
"\e";
`\"`;
`\"${foo}\"`;
`\#{foo}`;
/\!/;
/\@/;
/[\[]/;
/[a-z\-]/;
```

:::

使用此规则的**正确**示例：

::: correct

```js
/*eslint no-useless-escape: "error"*/

"\"";
'\'';
"\x12";
"\u00a9";
"\371";
"xs\u2111";
`\``;
`\${${foo}}`;
`$\{${foo}}`;
/\\/g;
/\t/g;
/\w\$\*\^\./;
/[[]/;
/[\]]/;
/[a-z-]/;
```

:::

## 何时不用

如果你不希望被通知有不必要的转义，你可以安全地禁用这个规则。
