---
title: 格式化工具参考
eleventyNavigation:
    key: formatters
    parent: use eslint
    title: 格式化工具
    order: 6
---

ESLint 有几个用来控制提示结果外观的内置格式化工具，同时也支持第三方格式化工具。

你可以在命令行中使用 `--format` 或 `--f` 标志来指定格式化工具。例如，`--format json` 使用 `json` 格式化。

内置的格式化选项有：

* [checkstyle](#checkstyle)
* [compact](#compact)
* [html](#html)
* [jslint-xml](#jslint-xml)
* [json-with-metadata](#json-with-metadata)
* [json](#json)
* [junit](#junit)
* [stylish](#stylish)
* [tap](#tap)
* [unix](#unix)
* [visualstudio](#visualstudio)

## 源码示例

每个格式化示例都是用 `.eslintrc.json` 配置检查 `fullOfProblems.js` 得到的。

`fullOfProblems.js`：

```js
function addOne(i) {
    if (i != NaN) {
        return i ++
    } else {
      return
    }
};
```

`.eslintrc.json`：

```json
{
    "extends": "eslint:recommended",
    "rules": {
        "consistent-return": 2,
        "indent"           : [1, 4],
        "no-else-return"   : 1,
        "semi"             : [1, "always"],
        "space-unary-ops"  : 2
    }
}
```

使用命令行测试格式化工具：

```shell
npx eslint --format <Add formatter here> fullOfProblems.js
```

## 内置格式化工具选项

### checkstyle

输出结果使用 [Checkstyle](https://checkstyle.sourceforge.io/) 格式：

输出示例：

```text
<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js"><error line="1" column="10" severity="error" message="&amp;apos;addOne&amp;apos; is defined but never used. (no-unused-vars)" source="eslint.rules.no-unused-vars" /><error line="2" column="9" severity="error" message="Use the isNaN function to compare with NaN. (use-isnan)" source="eslint.rules.use-isnan" /><error line="3" column="16" severity="error" message="Unexpected space before unary operator &amp;apos;++&amp;apos;. (space-unary-ops)" source="eslint.rules.space-unary-ops" /><error line="3" column="20" severity="warning" message="Missing semicolon. (semi)" source="eslint.rules.semi" /><error line="4" column="12" severity="warning" message="Unnecessary &amp;apos;else&amp;apos; after &amp;apos;return&amp;apos;. (no-else-return)" source="eslint.rules.no-else-return" /><error line="5" column="1" severity="warning" message="Expected indentation of 8 spaces but found 6. (indent)" source="eslint.rules.indent" /><error line="5" column="7" severity="error" message="Function &amp;apos;addOne&amp;apos; expected a return value. (consistent-return)" source="eslint.rules.consistent-return" /><error line="5" column="13" severity="warning" message="Missing semicolon. (semi)" source="eslint.rules.semi" /><error line="7" column="2" severity="error" message="Unnecessary semicolon. (no-extra-semi)" source="eslint.rules.no-extra-semi" /></file></checkstyle>
```

### compact

人类可读的输出格式。模仿 JSHint 的默认输出。

输出示例：

```text
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js: line 1, col 10, Error - 'addOne' is defined but never used. (no-unused-vars)
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js: line 2, col 9, Error - Use the isNaN function to compare with NaN. (use-isnan)
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js: line 3, col 16, Error - Unexpected space before unary operator '++'. (space-unary-ops)
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js: line 3, col 20, Warning - Missing semicolon. (semi)
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js: line 4, col 12, Warning - Unnecessary 'else' after 'return'. (no-else-return)
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js: line 5, col 1, Warning - Expected indentation of 8 spaces but found 6. (indent)
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js: line 5, col 7, Error - Function 'addOne' expected a return value. (consistent-return)
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js: line 5, col 13, Warning - Missing semicolon. (semi)
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js: line 7, col 2, Error - Unnecessary semicolon. (no-extra-semi)

9 problems
```

### html

输出结果为 HTML。`html` 格式化对于在浏览器中的可视化展示很有用。

输出示例：

<iframe src="html-formatter-example.html" width="100%" height="460px"></iframe>

### jslint-xml

输出结果格式与 [JSLint Jenkins 插件](https://plugins.jenkins.io/jslint/)兼容。

输出示例：

```text
<?xml version="1.0" encoding="utf-8"?><jslint><file name="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js"><issue line="1" char="10" evidence="" reason="&amp;apos;addOne&amp;apos; is defined but never used. (no-unused-vars)" /><issue line="2" char="9" evidence="" reason="Use the isNaN function to compare with NaN. (use-isnan)" /><issue line="3" char="16" evidence="" reason="Unexpected space before unary operator &amp;apos;++&amp;apos;. (space-unary-ops)" /><issue line="3" char="20" evidence="" reason="Missing semicolon. (semi)" /><issue line="4" char="12" evidence="" reason="Unnecessary &amp;apos;else&amp;apos; after &amp;apos;return&amp;apos;. (no-else-return)" /><issue line="5" char="1" evidence="" reason="Expected indentation of 8 spaces but found 6. (indent)" /><issue line="5" char="7" evidence="" reason="Function &amp;apos;addOne&amp;apos; expected a return value. (consistent-return)" /><issue line="5" char="13" evidence="" reason="Missing semicolon. (semi)" /><issue line="7" char="2" evidence="" reason="Unnecessary semicolon. (no-extra-semi)" /></file></jslint>
```

### json-with-metadata

输出 JSON 序列化 结果。`json-with-metadata` 提供与 [`json`](#json) 格式化相同的提示结果，并提供关于应用规则的额外元数据。判断结果包含在 `results` 属性中，规则元数据包含在 `metadata` 属性中。

另外，你可以使用 [ESLint Node.js API](../../integrate/nodejs-api) 来编程使用 ESLint。

输出示例：

```text
{"results":[{"filePath":"/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js","messages":[{"ruleId":"no-unused-vars","severity":2,"message":"'addOne' is defined but never used.","line":1,"column":10,"nodeType":"Identifier","messageId":"unusedVar","endLine":1,"endColumn":16},{"ruleId":"use-isnan","severity":2,"message":"Use the isNaN function to compare with NaN.","line":2,"column":9,"nodeType":"BinaryExpression","messageId":"comparisonWithNaN","endLine":2,"endColumn":17},{"ruleId":"space-unary-ops","severity":2,"message":"Unexpected space before unary operator '++'.","line":3,"column":16,"nodeType":"UpdateExpression","messageId":"unexpectedBefore","endLine":3,"endColumn":20,"fix":{"range":[57,58],"text":""}},{"ruleId":"semi","severity":1,"message":"Missing semicolon.","line":3,"column":20,"nodeType":"ReturnStatement","messageId":"missingSemi","endLine":4,"endColumn":1,"fix":{"range":[60,60],"text":";"}},{"ruleId":"no-else-return","severity":1,"message":"Unnecessary 'else' after 'return'.","line":4,"column":12,"nodeType":"BlockStatement","messageId":"unexpected","endLine":6,"endColumn":6,"fix":{"range":[0,94],"text":"function addOne(i) {\n    if (i != NaN) {\n        return i ++\n    } \n      return\n    \n}"}},{"ruleId":"indent","severity":1,"message":"Expected indentation of 8 spaces but found 6.","line":5,"column":1,"nodeType":"Keyword","messageId":"wrongIndentation","endLine":5,"endColumn":7,"fix":{"range":[74,80],"text":"        "}},{"ruleId":"consistent-return","severity":2,"message":"Function 'addOne' expected a return value.","line":5,"column":7,"nodeType":"ReturnStatement","messageId":"missingReturnValue","endLine":5,"endColumn":13},{"ruleId":"semi","severity":1,"message":"Missing semicolon.","line":5,"column":13,"nodeType":"ReturnStatement","messageId":"missingSemi","endLine":6,"endColumn":1,"fix":{"range":[86,86],"text":";"}},{"ruleId":"no-extra-semi","severity":2,"message":"Unnecessary semicolon.","line":7,"column":2,"nodeType":"EmptyStatement","messageId":"unexpected","endLine":7,"endColumn":3,"fix":{"range":[93,95],"text":"}"}}],"suppressedMessages":[],"errorCount":5,"fatalErrorCount":0,"warningCount":4,"fixableErrorCount":2,"fixableWarningCount":4,"source":"function addOne(i) {\n    if (i != NaN) {\n        return i ++\n    } else {\n      return\n    }\n};"}],"metadata":{"rulesMeta":{"no-else-return":{"type":"suggestion","docs":{"description":"Disallow `else` blocks after `return` statements in `if` statements","recommended":false,"url":"https://eslint.org/docs/rules/no-else-return"},"schema":[{"type":"object","properties":{"allowElseIf":{"type":"boolean","default":true}},"additionalProperties":false}],"fixable":"code","messages":{"unexpected":"Unnecessary 'else' after 'return'."}},"indent":{"type":"layout","docs":{"description":"Enforce consistent indentation","recommended":false,"url":"https://eslint.org/docs/rules/indent"},"fixable":"whitespace","schema":[{"oneOf":[{"enum":["tab"]},{"type":"integer","minimum":0}]},{"type":"object","properties":{"SwitchCase":{"type":"integer","minimum":0,"default":0},"VariableDeclarator":{"oneOf":[{"oneOf":[{"type":"integer","minimum":0},{"enum":["first","off"]}]},{"type":"object","properties":{"var":{"oneOf":[{"type":"integer","minimum":0},{"enum":["first","off"]}]},"let":{"oneOf":[{"type":"integer","minimum":0},{"enum":["first","off"]}]},"const":{"oneOf":[{"type":"integer","minimum":0},{"enum":["first","off"]}]}},"additionalProperties":false}]},"outerIIFEBody":{"oneOf":[{"type":"integer","minimum":0},{"enum":["off"]}]},"MemberExpression":{"oneOf":[{"type":"integer","minimum":0},{"enum":["off"]}]},"FunctionDeclaration":{"type":"object","properties":{"parameters":{"oneOf":[{"type":"integer","minimum":0},{"enum":["first","off"]}]},"body":{"type":"integer","minimum":0}},"additionalProperties":false},"FunctionExpression":{"type":"object","properties":{"parameters":{"oneOf":[{"type":"integer","minimum":0},{"enum":["first","off"]}]},"body":{"type":"integer","minimum":0}},"additionalProperties":false},"StaticBlock":{"type":"object","properties":{"body":{"type":"integer","minimum":0}},"additionalProperties":false},"CallExpression":{"type":"object","properties":{"arguments":{"oneOf":[{"type":"integer","minimum":0},{"enum":["first","off"]}]}},"additionalProperties":false},"ArrayExpression":{"oneOf":[{"type":"integer","minimum":0},{"enum":["first","off"]}]},"ObjectExpression":{"oneOf":[{"type":"integer","minimum":0},{"enum":["first","off"]}]},"ImportDeclaration":{"oneOf":[{"type":"integer","minimum":0},{"enum":["first","off"]}]},"flatTernaryExpressions":{"type":"boolean","default":false},"offsetTernaryExpressions":{"type":"boolean","default":false},"ignoredNodes":{"type":"array","items":{"type":"string","not":{"pattern":":exit$"}}},"ignoreComments":{"type":"boolean","default":false}},"additionalProperties":false}],"messages":{"wrongIndentation":"Expected indentation of {{expected}} but found {{actual}}."}},"space-unary-ops":{"type":"layout","docs":{"description":"Enforce consistent spacing before or after unary operators","recommended":false,"url":"https://eslint.org/docs/rules/space-unary-ops"},"fixable":"whitespace","schema":[{"type":"object","properties":{"words":{"type":"boolean","default":true},"nonwords":{"type":"boolean","default":false},"overrides":{"type":"object","additionalProperties":{"type":"boolean"}}},"additionalProperties":false}],"messages":{"unexpectedBefore":"Unexpected space before unary operator '{{operator}}'.","unexpectedAfter":"Unexpected space after unary operator '{{operator}}'.","unexpectedAfterWord":"Unexpected space after unary word operator '{{word}}'.","wordOperator":"Unary word operator '{{word}}' must be followed by whitespace.","operator":"Unary operator '{{operator}}' must be followed by whitespace.","beforeUnaryExpressions":"Space is required before unary expressions '{{token}}'."}},"semi":{"type":"layout","docs":{"description":"Require or disallow semicolons instead of ASI","recommended":false,"url":"https://eslint.org/docs/rules/semi"},"fixable":"code","schema":{"anyOf":[{"type":"array","items":[{"enum":["never"]},{"type":"object","properties":{"beforeStatementContinuationChars":{"enum":["always","any","never"]}},"additionalProperties":false}],"minItems":0,"maxItems":2},{"type":"array","items":[{"enum":["always"]},{"type":"object","properties":{"omitLastInOneLineBlock":{"type":"boolean"}},"additionalProperties":false}],"minItems":0,"maxItems":2}]},"messages":{"missingSemi":"Missing semicolon.","extraSemi":"Extra semicolon."}},"consistent-return":{"type":"suggestion","docs":{"description":"Require `return` statements to either always or never specify values","recommended":false,"url":"https://eslint.org/docs/rules/consistent-return"},"schema":[{"type":"object","properties":{"treatUndefinedAsUnspecified":{"type":"boolean","default":false}},"additionalProperties":false}],"messages":{"missingReturn":"Expected to return a value at the end of {{name}}.","missingReturnValue":"{{name}} expected a return value.","unexpectedReturnValue":"{{name}} expected no return value."}}}}}
```

### json

输出 JSON 序列化结果。`json` 格式化工具在你想以编程方式处理命令行的提示结果时很有用。

另外，你可以使用 [ESLint Node.js API](../../integrate/nodejs-api) 来编程使用 ESLint。

输出示例：

```text
[{"filePath":"/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js","messages":[{"ruleId":"no-unused-vars","severity":2,"message":"'addOne' is defined but never used.","line":1,"column":10,"nodeType":"Identifier","messageId":"unusedVar","endLine":1,"endColumn":16},{"ruleId":"use-isnan","severity":2,"message":"Use the isNaN function to compare with NaN.","line":2,"column":9,"nodeType":"BinaryExpression","messageId":"comparisonWithNaN","endLine":2,"endColumn":17},{"ruleId":"space-unary-ops","severity":2,"message":"Unexpected space before unary operator '++'.","line":3,"column":16,"nodeType":"UpdateExpression","messageId":"unexpectedBefore","endLine":3,"endColumn":20,"fix":{"range":[57,58],"text":""}},{"ruleId":"semi","severity":1,"message":"Missing semicolon.","line":3,"column":20,"nodeType":"ReturnStatement","messageId":"missingSemi","endLine":4,"endColumn":1,"fix":{"range":[60,60],"text":";"}},{"ruleId":"no-else-return","severity":1,"message":"Unnecessary 'else' after 'return'.","line":4,"column":12,"nodeType":"BlockStatement","messageId":"unexpected","endLine":6,"endColumn":6,"fix":{"range":[0,94],"text":"function addOne(i) {\n    if (i != NaN) {\n        return i ++\n    } \n      return\n    \n}"}},{"ruleId":"indent","severity":1,"message":"Expected indentation of 8 spaces but found 6.","line":5,"column":1,"nodeType":"Keyword","messageId":"wrongIndentation","endLine":5,"endColumn":7,"fix":{"range":[74,80],"text":"        "}},{"ruleId":"consistent-return","severity":2,"message":"Function 'addOne' expected a return value.","line":5,"column":7,"nodeType":"ReturnStatement","messageId":"missingReturnValue","endLine":5,"endColumn":13},{"ruleId":"semi","severity":1,"message":"Missing semicolon.","line":5,"column":13,"nodeType":"ReturnStatement","messageId":"missingSemi","endLine":6,"endColumn":1,"fix":{"range":[86,86],"text":";"}},{"ruleId":"no-extra-semi","severity":2,"message":"Unnecessary semicolon.","line":7,"column":2,"nodeType":"EmptyStatement","messageId":"unexpected","endLine":7,"endColumn":3,"fix":{"range":[93,95],"text":"}"}}],"suppressedMessages":[],"errorCount":5,"fatalErrorCount":0,"warningCount":4,"fixableErrorCount":2,"fixableWarningCount":4,"source":"function addOne(i) {\n    if (i != NaN) {\n        return i ++\n    } else {\n      return\n    }\n};"}]
```

### junit

输出结果格式与 [JUnit Jenkins 插件](https://plugins.jenkins.io/junit/)兼容。

输出示例：

```text
<?xml version="1.0" encoding="utf-8"?>
<testsuites>
<testsuite package="org.eslint" time="0" tests="9" errors="9" name="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js">
<testcase time="0" name="org.eslint.no-unused-vars" classname="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems"><failure message="&amp;apos;addOne&amp;apos; is defined but never used."><![CDATA[line 1, col 10, Error - &amp;apos;addOne&amp;apos; is defined but never used. (no-unused-vars)]]></failure></testcase>
<testcase time="0" name="org.eslint.use-isnan" classname="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems"><failure message="Use the isNaN function to compare with NaN."><![CDATA[line 2, col 9, Error - Use the isNaN function to compare with NaN. (use-isnan)]]></failure></testcase>
<testcase time="0" name="org.eslint.space-unary-ops" classname="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems"><failure message="Unexpected space before unary operator &amp;apos;++&amp;apos;."><![CDATA[line 3, col 16, Error - Unexpected space before unary operator &amp;apos;++&amp;apos;. (space-unary-ops)]]></failure></testcase>
<testcase time="0" name="org.eslint.semi" classname="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems"><failure message="Missing semicolon."><![CDATA[line 3, col 20, Warning - Missing semicolon. (semi)]]></failure></testcase>
<testcase time="0" name="org.eslint.no-else-return" classname="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems"><failure message="Unnecessary &amp;apos;else&amp;apos; after &amp;apos;return&amp;apos;."><![CDATA[line 4, col 12, Warning - Unnecessary &amp;apos;else&amp;apos; after &amp;apos;return&amp;apos;. (no-else-return)]]></failure></testcase>
<testcase time="0" name="org.eslint.indent" classname="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems"><failure message="Expected indentation of 8 spaces but found 6."><![CDATA[line 5, col 1, Warning - Expected indentation of 8 spaces but found 6. (indent)]]></failure></testcase>
<testcase time="0" name="org.eslint.consistent-return" classname="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems"><failure message="Function &amp;apos;addOne&amp;apos; expected a return value."><![CDATA[line 5, col 7, Error - Function &amp;apos;addOne&amp;apos; expected a return value. (consistent-return)]]></failure></testcase>
<testcase time="0" name="org.eslint.semi" classname="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems"><failure message="Missing semicolon."><![CDATA[line 5, col 13, Warning - Missing semicolon. (semi)]]></failure></testcase>
<testcase time="0" name="org.eslint.no-extra-semi" classname="/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems"><failure message="Unnecessary semicolon."><![CDATA[line 7, col 2, Error - Unnecessary semicolon. (no-extra-semi)]]></failure></testcase>
</testsuite>
</testsuites>

```

### stylish

人类可读的输出格式。这是默认格式。

输出示例：

```text

/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js
  1:10  error    'addOne' is defined but never used            no-unused-vars
  2:9   error    Use the isNaN function to compare with NaN    use-isnan
  3:16  error    Unexpected space before unary operator '++'   space-unary-ops
  3:20  warning  Missing semicolon                             semi
  4:12  warning  Unnecessary 'else' after 'return'             no-else-return
  5:1   warning  Expected indentation of 8 spaces but found 6  indent
  5:7   error    Function 'addOne' expected a return value     consistent-return
  5:13  warning  Missing semicolon                             semi
  7:2   error    Unnecessary semicolon                         no-extra-semi

✖ 9 problems (5 errors, 4 warnings)
  2 errors and 4 warnings potentially fixable with the `--fix` option.

```

### tap

输出结果格式符合 [Test Anything Protocol (TAP)](https://testanything.org/) 规范。

输出示例：

```text
TAP version 13
1..1
not ok 1 - /var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js
  ---
  message: '''addOne'' is defined but never used.'
  severity: error
  data:
    line: 1
    column: 10
    ruleId: no-unused-vars
  messages:
    - message: Use the isNaN function to compare with NaN.
      severity: error
      data:
        line: 2
        column: 9
        ruleId: use-isnan
    - message: Unexpected space before unary operator '++'.
      severity: error
      data:
        line: 3
        column: 16
        ruleId: space-unary-ops
    - message: Missing semicolon.
      severity: warning
      data:
        line: 3
        column: 20
        ruleId: semi
    - message: Unnecessary 'else' after 'return'.
      severity: warning
      data:
        line: 4
        column: 12
        ruleId: no-else-return
    - message: Expected indentation of 8 spaces but found 6.
      severity: warning
      data:
        line: 5
        column: 1
        ruleId: indent
    - message: Function 'addOne' expected a return value.
      severity: error
      data:
        line: 5
        column: 7
        ruleId: consistent-return
    - message: Missing semicolon.
      severity: warning
      data:
        line: 5
        column: 13
        ruleId: semi
    - message: Unnecessary semicolon.
      severity: error
      data:
        line: 7
        column: 2
        ruleId: no-extra-semi
  ...

```

### unix

输出结果格式与类 UNIX 系统中的许多命令相似。可以用 [grep](https://www.gnu.org/software/grep/manual/grep.html)、[sed](https://www.gnu.org/software/sed/manual/sed.html) 和 [awk](https://www.gnu.org/software/gawk/manual/gawk.html) 等工具进行解析。

输出示例：

```text
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js:1:10: 'addOne' is defined but never used. [Error/no-unused-vars]
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js:2:9: Use the isNaN function to compare with NaN. [Error/use-isnan]
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js:3:16: Unexpected space before unary operator '++'. [Error/space-unary-ops]
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js:3:20: Missing semicolon. [Warning/semi]
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js:4:12: Unnecessary 'else' after 'return'. [Warning/no-else-return]
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js:5:1: Expected indentation of 8 spaces but found 6. [Warning/indent]
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js:5:7: Function 'addOne' expected a return value. [Error/consistent-return]
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js:5:13: Missing semicolon. [Warning/semi]
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js:7:2: Unnecessary semicolon. [Error/no-extra-semi]

9 problems
```

### visualstudio

将结果输出为与 [Visual Studio](https://visualstudio.microsoft.com/) IDE 的集成终端兼容的格式。当使用 Visual Studio 时，你可以点击集成终端中的提示结果，转到源代码中的问题。

输出示例：

```text
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js(1,10): error no-unused-vars : 'addOne' is defined but never used.
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js(2,9): error use-isnan : Use the isNaN function to compare with NaN.
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js(3,16): error space-unary-ops : Unexpected space before unary operator '++'.
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js(3,20): warning semi : Missing semicolon.
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js(4,12): warning no-else-return : Unnecessary 'else' after 'return'.
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js(5,1): warning indent : Expected indentation of 8 spaces but found 6.
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js(5,7): error consistent-return : Function 'addOne' expected a return value.
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js(5,13): warning semi : Missing semicolon.
/var/lib/jenkins/workspace/Releases/eslint Release/eslint/fullOfProblems.js(7,2): error no-extra-semi : Unnecessary semicolon.

9 problems
```
