import React, { Fragment } from 'react';
import { Row, Col, PageHeader } from 'antd';
import Editor from '../../component/Editor/index';
import ContentPage from '../../component/content-page';
import './index.less';
const value1 = `
nav div {
    &:extend(.inline);
    // 这个的效果就跟使用  .inline;一样
    background: green;
}
.inline {
    color: #6b20b2;
}
// 输出
nav div {
    background: green;
}
nav div, .inline {
    color: #6b20b2;
}`
const value2 = `
.a:extend(.b) {}
// 这俩的效果一样
.a {
  &:extend(.b);
}`
const value3 = `
.c:extend(.d all) {
    // 延展所有关于.d的，例如.d, x.d , .d.x
  }
.c:extend(.d) {
    // 这个只延展选择器是 .d 的
}`
const value4 = `
.e:extend(.f) {}
.e:extend(.g) {}

// 下面的效果就是上面两个的合集
.e:extend(.f, .g) {}`
const value5 = `
.big-division,
.big-bag:extend(.bag),
.big-bucket:extend(.bucket) {
  background: pink;
}
.bag {
  color: green;
}
.bucket {
  color: blue;
}`
const value6 = `
pre:hover,
.some-class {
  &:extend(div pre);
}

// 与在每个选择器之后添加扩展名完全相同：
pre:hover:extend(div pre),
.some-class:extend(div pre) {}`
const value7 = `
.bucket {
    tr { // nested ruleset with target selector
      color: blue;
    }
}
.some-class:extend(.bucket tr) {} // nested ruleset is recognized

 // 产出 
.bucket tr,
.some-class {
    color: blue;
}`
const value8 = `
*.class {
    color: blue;
}
.noStar:extend(.class) {} // 这里将匹配不到 *.class 选择器

// 产出 
*.class {
    color: blue;
}`
const value9 = `
link:hover:visited {
    color: blue;
}
.selector:extend(link:visited:hover) {}

// 产出
link:hover:visited {
    color: blue;
}`
const value10 = `
[title=identifier] {
    color: blue;
  }
  [title='identifier'] {
    color: blue;
  }
  [title="identifier"] {
    color: blue;
  }
  
  .noQuote:extend([title=identifier]) {}
  .singleQuote:extend([title='identifier']) {}
  .doubleQuote:extend([title="identifier"]) {}`
const value11 = `
.a.b.test,
.test.c {
  color: orange;
}
.test {
  &:hover {
    color: green;
  }
}

.replacement:extend(.test all) {}

// 产出
.a.b.test,
.test.c,
.a.b.replacement,
.replacement.c {
  color: orange;
}
.test:hover,
.replacement:hover {
  color: green;
}`
const value12 = `
@variable: .bucket;
@{variable} { // interpolated selector
  color: blue;
}
.some-class:extend(.bucket) {} // does nothing, no match is found

// 并在目标选择器中使用变量扩展不匹配任何内容：
.bucket {
  color: blue;
}
.some-class:extend(@{variable}) {} // interpolated selector matches nothing
@variable: .bucket;

以上两个示例均编译为：
.bucket {
  color: blue;
}`
const value13 = `
.bucket {
    color: blue;
}
@{variable}:extend(.bucket) {}
@variable: .selector;

// 编译为：
.bucket, .selector {
    color: blue;
}`
const value14 = `
@media print {
    .screenClass:extend(.selector) {} // extend inside media
    .selector { // this will be matched - it is in the same media
      color: black;
    }
  }
  .selector { // ruleset on top of style sheet - extend ignores it
    color: red;
  }
  @media screen {
    .selector {  // ruleset inside another media - extend ignores it
      color: blue;
    }
  }

//  编译成：
  @media print {
    .selector,
    .screenClass { /*  ruleset inside the same media was extended */
      color: black;
    }
  }
  .selector { /* ruleset on top of style sheet was ignored */
    color: red;
  }
  @media screen {
    .selector { /* ruleset inside another media was ignored */
      color: blue;
    }
  }`
const value15 = `
@media screen {
    .screenClass:extend(.selector) {} // extend inside media
    @media (min-width: 1023px) {
      .selector {  // ruleset inside nested media - extend ignores it
        color: blue;
      }
    }
  }

//  编译成：
  @media screen and (min-width: 1023px) {
    .selector { /* ruleset inside another nested media was ignored */
      color: blue;
    }
  }`
const value16 = `
@media screen {
    .selector {  /* ruleset inside nested media - top level extend works */
      color: blue;
    }
    @media (min-width: 1023px) {
      .selector {  /* ruleset inside nested media - top level extend works */
        color: blue;
      }
    }
}
.topLevel:extend(.selector) {} /* top level extend matches everything */

//  编译成： 
  @media screen {
    .selector,
    .topLevel { /* ruleset inside media was extended */
      color: blue;
    }
  }
  @media screen and (min-width: 1023px) {
    .selector,
    .topLevel { /* ruleset inside nested media was extended */
      color: blue;
    }
  }`
const value17 = `
.animal {
    background-color: black;
    color: white;
  }`
const value18 = `
<a class="animal bear">Bear</a>
.animal {
  background-color: black;
  color: white;
}
.bear {
  background-color: brown;
}`
const value19 = `
<a class="bear">Bear</a>
.animal {
  background-color: black;
  color: white;
}
.bear {
  &:extend(.animal);
  background-color: brown;
}`
const value20 = `
.my-inline-block() {
    display: inline-block;
    font-size: 0;
  }
  .thing1 {
    .my-inline-block;
  }
  .thing2 {
    .my-inline-block;
  }

//  产出
  .thing1 {
    display: inline-block;
    font-size: 0;
  }
  .thing2 {
    display: inline-block;
    font-size: 0;
  }`
const value21 = `
.my-inline-block {
    display: inline-block;
    font-size: 0;
  }
  .thing1 {
    &:extend(.my-inline-block);
  }
  .thing2 {
    &:extend(.my-inline-block);
  }

//  产出
  .my-inline-block,
  .thing1,
  .thing2 {
    display: inline-block;
    font-size: 0;
  }`
  const value22 = `
  li.list > a {
    // list styles
  }
  button.list-style {
    &:extend(li.list > a); // use the same list styles
  }`
export default class Easy extends React.Component {
    render() {
        return (
            <ContentPage>
                <Fragment key='left'>
                    <div id="install">
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="延伸（Extend）"
                            subTitle="Study hard"
                        >
                            <h1 className="font-bold">1.1 开始</h1>
                            <p>Extend是一个Less伪类，它将合并的选择器与与其引用的选择器合并</p>
                            <Row>
                                <Col span={12}>
                                    <nav>nav
                                        <div>div</div>
                                    </nav>
                                    <div className="inline">
                                        inline
                                    </div>
                                    <p>:extend选择器将所述“延伸选择器”（申请nav ul）到.inline类的任何地方.inline类出现。声明块将保持原样，但不对扩展进行任何引用（因为扩展不是CSS）。</p>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value1}
                                    />
                                </Col>
                            </Row>
                            <h1 className="font-bold">1.2 扩展语法</h1>
                            <p>扩展要么附加到选择器，要么放置在规则集中。看起来像是带有选择器参数的伪类（可选），其后跟关键字all：</p>
                            <Editor value={value2} />
                            <Editor value={value3} />
                            <p>它可以包含一个或多个要扩展的类，以逗号分隔。</p>
                            <Editor value={value4} />
                            <h1 className="font-bold">1.3 扩展附加到选择器</h1>
                            <p>附加到选择器的扩展看起来像一个普通的伪类，带有选择器作为参数。一个选择器可以包含多个extend子句，但是所有扩展都必须在选择器的末尾。</p>
                            <ul>
                                <li>在选择器之后扩展：pre:hover:extend(div pre)。</li>
                                <li>选择器和扩展之间允许有空格：pre:hover :extend(div pre)。</li>
                                <li>允许多个扩展：pre:hover:extend(div pre):extend(.bucket tr)-注意，这与pre:hover:extend(div pre, .bucket tr)的效果是一样的</li>
                                <li>这是不允许的：pre:hover:extend(div pre).nth-child(odd)。扩展必须是最后一个。</li>
                            </ul>
                            <p>如果规则集包含多个选择器，则它们中的任何一个都可以具有extend关键字。在一个规则集中扩展的多个选择器：</p>
                            <Row>
                                <Col span={12}>
                                    <div className="big-division">big-division</div>
                                    <div className="big-bag">big-bag</div>
                                    <div className="big-bucket">big-bucket</div>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value5}
                                    />
                                </Col>
                            </Row>
                            <h1 className="font-bold">1.4 扩展内部规则集</h1>
                            <p>可以使用 &:extend(selector) 语法将扩展放置在规则集的主体中。将扩展放置到主体中是将其放入该规则集的每个选择器的快捷方式。</p>
                            <p>在体内延伸：</p>
                            <Editor value={value6} />
                            <h1 className="font-bold">1.5 扩展嵌套选择器</h1>
                            <p>Extend可以匹配嵌套的选择器。如下：</p>
                            <Editor value={value7} />
                            <h1 className="font-bold">1.6 精确匹配与扩展</h1>
                            <p>默认情况下，扩展查找选择器之间的完全匹配。它们必须具有相同的形式才能匹配。唯一的例外是属性选择器中的引号，很少知道它们的含义相同并匹配它们。</p>
                            <p>选择器*.class和.class是等效的，但扩展名将与它们不匹配</p>
                            <Editor value={value8} />
                            <p>伪类的顺序很重要。选择器link:hover:visited和link:visited:hover匹配相同的元素集，但extend将它们视为不同的元素：</p>
                            <Editor value={value9} />
                            <h1 className="font-bold">1.7 第n个表达式</h1>
                            <p>第N个表达形式很重要。 1n+3和n+3是等效的，但extend与它们不匹配</p>
                            <p>属性选择器中的引用类型无关紧要。以下所有都是等效的。</p>
                            <Editor value={value10} />
                            <h1 className="font-bold">1.8 扩展“全部”</h1>
                            <p>当在扩展参数最后指定all关键字时，它告诉Less将该选择器作为另一个选择器的一部分进行匹配。将复制选择器，然后仅将选择器的匹配部分替换为扩展名，从而创建一个新的选择器。</p>
                            <Editor value={value11} />
                            <p>您可以认为这种操作模式实质上是在进行无损搜索和替换</p>
                            <h1 className="font-bold">1.9 带扩展的选择器插值</h1>
                            <p>扩展是不能够与变量匹配选择。如果选择器包含变量，则extend将忽略它。但是，extend可以附加到插值选择器。</p>
                            <p>具有变量的选择器将不匹配：</p>
                            <Editor value={value12} />
                            <p>但是，将其:extend附加到插值选择器即可：</p>
                            <Editor value={value13} />
                            <h1 className="font-bold">1.10 在@media范围内/扩展</h1>
                            <p>当前，声明:extend内部@media仅会匹配同一媒体声明内的选择器：</p>
                            <Editor value={value14} />
                            <p>注意：扩展与嵌套@media声明中的选择器不匹配：</p>
                            <Editor value={value15} />
                            <p>顶级扩展匹配所有内容，包括嵌套媒体中的选择器：</p>
                            <Editor value={value16} />
                            <h1 className="font-bold">1.11 扩展用例</h1>
                            <p>经典用例.经典的用例是避免添加基类。例如, 如果你有</p> 
                            <Editor value={value17}/>
                            <p>并且您想要一个动物的子类型来覆盖背景色，那么您有两个选择，首先是更改HTML</p>
                            <Editor value={value18}/>
                            <p>或简化了html并在您的更少范围内使用extend。例如</p>
                            <Editor value={value19}/>
                            <h1 className="font-bold">1.12 减少CSS大小</h1>
                            <p>Mixins将所有属性复制到选择器中，这可能导致不必要的重复。因此，您可以使用扩展而不是混合来将选择器上移到要使用的属性，这将减少生成CSS的次数。</p>
                            <p>Example - with mixin:</p>
                            <Editor value={value20}/>
                            <p>Example - with extend:</p>
                            <Editor value={value21}/>
                            <h1 className="font-bold">1.13 组合样式/更高级的混音</h1>
                            <p>另一个用例是mixin的替代方案-因为mixin仅可与简单的选择器一起使用，如果您有两个不同的html块，但需要对两者应用相同的样式，则可以使用扩展来关联两个区域。</p>
                            <Editor value={value22}/>
                        </PageHeader>
                    </div>
                </Fragment>
                <Fragment key='right'>
                    <ul>
                        <li><a href='#install'>安装</a></li>
                        <li>
                            <a href='#variable'>
                                Less变量
                                <ul>
                                    <li><a href='#content-1'>变量</a></li>
                                    <li><a href='#content-2'>Less变量 (可变插值)</a></li>
                                    <li><a href='#content-3'>URLs变量</a></li>
                                    <li><a href='#content-4'>Import 变量</a></li>
                                    <li><a href='#content-5'>属性变量</a></li>
                                    <li><a href='#content-6'>可变变量</a></li>
                                    <li><a href='#content-7'>懒惰评估</a></li>
                                    <li><a href='#content-8'>属性作为变量（新！)</a></li>
                                    <li><a href='#content-9'>默认变量</a></li>
                                </ul>
                            </a>
                        </li>
                    </ul>
                </Fragment>
            </ContentPage>
        )
    }
}
