---
title: newline-per-chained-call
layout: doc
edit_link: https://github.com/eslint/zh-hans.eslint.org/edit/main/src/rules/newline-per-chained-call.md
rule_type: layout
---

单行的链式方法调用如果没有换行，就很难读懂，所以有些开发者在链式方法调用的每一个后面都放一个换行符，以使其更易读，更容易维护。

让我们来看看下面这段完全有效的（但却是单行的）代码。

```js
d3.select("body").selectAll("p").data([4, 8, 15, 16, 23, 42 ]).enter().append("p").text(function(d) { return "I'm number " + d + "!"; });
```

然而，有了适当的新行，它就变得容易阅读和理解了。看看下面写的同样的代码，在每个调用后都有换行。

```js
d3
    .select("body")
    .selectAll("p")
    .data([
        4,
        8,
        15,
        16,
        23,
        42
    ])
    .enter()
    .append("p")
    .text(function (d) {
        return "I'm number " + d + "!";
    });
```

支持这种风格的另一个理由是，当方法链中的某些东西被改变时，它可以提高差异的清晰度。

不太清晰：

```diff
-d3.select("body").selectAll("p").style("color", "white");
+d3.select("body").selectAll("p").style("color", "blue");
```

更为清晰：

```diff
d3
    .select("body")
    .selectAll("p")
-    .style("color", "white");
+    .style("color", "blue");
```

## 规则细节

这条规则要求在方法链或深层成员访问中的每个调用后都有一个换行。不过不包括像 `instance[something]` 这样的计算属性访问。

## 选项

此规则选项为对象：

* `"ignoreChainWithDepth"`（默认：`2`）允许链路达到指定的深度。

### ignoreChainWithDepth

使用此规则与默认的 `{ "ignoreChainWithDepth": 2 }` 选项的**错误**示例：

::: incorrect

```js
/*eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 2 }]*/

_.chain({}).map(foo).filter(bar).value();

// 或
_.chain({}).map(foo).filter(bar);

// 或
_
  .chain({}).map(foo)
  .filter(bar);

// 或
obj.method().method2().method3();
```

:::

使用此规则与默认的 `{ "ignoreChainWithDepth": 2 }` 选项的**正确**示例：

::: correct

```js
/*eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 2 }]*/

_
  .chain({})
  .map(foo)
  .filter(bar)
  .value();

// 或
_
  .chain({})
  .map(foo)
  .filter(bar);

// 或
_.chain({})
  .map(foo)
  .filter(bar);

// 或
obj
  .prop
  .method().prop;

// 或
obj
  .prop.method()
  .method2()
  .method3().prop;
```

:::

## 何时不用

如果你有冲突的规则，或者当你对一条链路上的连锁调用没有意见时，你可以安全地关闭这个规则。
