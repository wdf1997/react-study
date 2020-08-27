import React, { Fragment } from 'react';
import { Row, Col, PageHeader } from 'antd';
import Editor from '../../component/Editor/index';
import ContentPage from '../../component/content-page';
import './index.less';

const value1 = `
.bordered {
    border: solid 2px blueviolet;
}
  
.menu a {
    color: #111;
    padding: 10px;
    .bordered();
    // 或者直接 .bordered;
}`
const value2 = `
.my-mixin {
    color: blueviolet;
  }
.my-other-mixin() {
    background: pink;
}
.class {
    .my-mixin();
    .my-other-mixin();
}`
const value3 = `
.my-hover-mixin() {
    &:hover {
       border: 2px solid green;
    }
  }
.button {
    background: pink;
    .my-hover-mixin();
}

// 这里的产出就是
.button:hover {
    border: 2px solid green;
  }
`
const value4 = `
#outer() {
    .inner {
      color: red;
    }
} 
.c {
    #outer > .inner();
}
// 这样子解析出来的就是
.c {
    color: red;
}

.c {
    #outer;
}
// 这样子解析出来的是
.c {
    .inner {
        color: red;
    }
}`
const value5 = `
// 下面三种写法的效果都一样
@mode: huge;
1、
.namespace when (@mode = huge) {
    .mixin {
        background: green;
    };
}
2、
.namespace {
    .mixin when (@mode = huge) {
        background: green;
     }
}
3、
.mixin() {
    background: green;
}
.namespace when (@mode = huge) {
    .mixin();
}`
const value6 = `
#sp_1 when (default()) {
    #sp_2 when (default()) {
      .mixin() when not(default()) { /* */ }
    }
  }`
const value7 = `
  .foo (@bg: #fcc5d7, @color: #b46cf8) {
    background: @bg;
    color: @color;
  }
  .unimportant {
    .foo();
    background: green;
  }
  .important {
    .foo() !important;
    background: green;
  }
  // 解析后
  .unimportant {
    background: #fcc5d7;
    color: #b46cf8;
    background: green;
  }
  .important {
    background: #fcc5d7 !important;
    color: #b46cf8 !important;
    background: green;
  }`
const value8 = `
  // 参数mixin也可以具有其参数的默认值：
  .border-radius(@radius: 5px) {
    border: 2px solid #b46cf8;
    margin-bottom: 5px;
    -webkit-border-radius: @radius;
       -moz-border-radius: @radius;
            border-radius: @radius;
  }
  .header {
    .border-radius(4px);
  }
  .butt {
    .border-radius(6px);
  }
  // 当没有传入参数时，会使用默认值
  .default {
    .border-radius();
  }`
const value9 = `
  .mixina(@color) {
    color: @color;
  }
  .mixina(@color; @padding: 2px) {
    border:1px solid @color;
    padding: @padding;
  }
  .mixina(@color; @padding; @margin: 2px) {
    color: @color;
    padding: @padding;
    margin: @margin;
  }
  .some {
    .mixina(#6141ee)
  }
  // 编译成： (不懂为什么，为什么第三个的都没有编译)
  .some {
    color: #6141ee;
    border: 1px solid #6141ee;
    padding: 2px;
  }`
const value10 = `
  .mixinb(@color: blue; @margin: 10px; @padding: 20px) {
    color: @color;
    margin: @margin;
    padding: @padding;
    border: 1px solid @color;
  }
  .class1 {
    .mixinb(@margin: 20px; @color: green);
  }
  .class2 {
    .mixinb(yellow; @padding: 20px);
  }
  .class3 {
      .mixinb(pink, 20px, 10px)
  }`
const value11 = `
  .box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #464646) {
    -webkit-box-shadow: @arguments;
       -moz-box-shadow: @arguments;
            box-shadow: @arguments;
  }
  .class4 {
    border: 1px solid pink;
    .box-shadow(1px; 1px; 3px);
  }
  // 结果是
  .class4 {
    border: 1px solid pink;
    -webkit-box-shadow: 1px 1px 3px #464646;
       -moz-box-shadow: 1px 1px 3px #464646;
            box-shadow: 1px 1px 3px #464646;
  }`
const value12 = `
    .mixin(...) {        // matches 0-N arguments
    .mixin() {           // matches exactly 0 arguments
    .mixin(@a: 1) {      // matches 0-1 arguments
    .mixin(@a: 1; ...) { // matches 0-N arguments
    .mixin(@a; ...) {    // matches 1-N arguments
    // 此外   
    .mixin(@a; @rest...) {
        // @rest is bound to arguments after @a
        // @arguments is bound to all arguments
    }`
const value13 = `
    .mixinc(dark; @color) {
        background: darken(@color, 10%);
    }
    .mixinc(light; @color) {
        background: lighten(@color, 20%);
    }
    .mixinc(@_; @color) {
        border: 1px solid;
    }
    .class5 {
        .mixinc(light; #f72346)
    }
    // 解析
    .class5 {
        border: 1px solid;
        background: lighten(#f72346, 20%);
    }
      `
const value14 = `
.average(@x, @y) {
    @result: ((@x + @y) / 2);
  }
.class6 {
    // call a mixin and look up its "@result" value
    padding: .average(16px, 50px)[@result];
    border: 1px solid;
  }
  // 解析
  class6 {
    border: 1px solid;
    padding: 33px;
  }`
const value15 = `
.aver(@x, @y) {
    @result1: ((@x + @y) / 2);
    @result2: ((@x - @y) / 2);
    // background-color: pink; 
  }
.class7 {
    // 这里将取.aver的最后一个属性的值，如果最后一个是background-color：pink，则padding：pink，无效。
    padding: .aver(50px, 16px)[];
    border: 1px solid;
  }`
const value16 = `
  .mixind() {
    @backcolor: pink;
    @fontcolor: blue;
  }
  .caller {
    .mixind();
    background: @backcolor;
    color: @fontcolor;
  }
  @backcolor: green;`
const value17 = `
  .unlock(@value) { // outer mixin
    background-color: purple;
    .doSomething() { // nested mixin
      background: @value;
    }
  }
  .class8 {
    // 这里要先调用.unlock，再调用.doSomething才会显示出background的效果,不然就只是返回.unlock里面的效果。
    .unlock(pink); // unlock doSomething mixin
    .doSomething(); //nested mixin was copied here and is usable
  }`
const value18 = `
  .loop(@counter) when (@counter > 0) {
    .loop((@counter - 1));    // next iteration
    width: (10px * @counter); // code for each iteration
    background: green;
  }
  .class9 {
    .loop(5); // launch the loop
  }
  // 解析
  div {
    width: 10px;
    width: 20px;
    width: 30px;
    width: 40px;
    width: 50px;
  }
  `
const value19 = `
  .generate-columns(4);
  .generate-columns(@n, @i: 1) when (@i =< @n) {
    .div-@{i} {
      width: (@i * 100% / @n);
      background: yellowgreen;
      margin-bottom: 2px;
    }
    .generate-columns(@n, (@i + 1));
  }`
const value20 = `
  .mixine(@a) when (lightness(@a) >= 50%) {
    background-color: black;
  }
  .mixine(@a) when (lightness(@a) < 50%) {
    background-color: white;
  }
  .mixine(@a) {
    color: @a;
  }
  .class10 { .mixine(#ddd) }
  .class11 { .mixine(#555) }
  
  // 得到
  .class10 {
    background-color: black;
    color: #ddd;
  }
  .class11 {
    background-color: white;
    color: #555;
  }`
const value21 = `
  .truth(@a) when (@a) { ... }
  .truth(@a) when (@a = true) { ... }
`
const value22 = `
.class {
    .truth(40); // Will not match any of the above definitions.
  }`
const value23 = `
.mixin(@a; @b: 0) when (isnumber(@b)) { ... }
.mixin(@a; @b: black) when (iscolor(@b)) { ... }`
const value24 = `
  #theme.dark.navbar {
    .colors(light) {
      primary: purple;
    }
    .colors(dark) {
      primary: black;
      secondary: grey;
    }
  }
  
  .navbar {
    @colors: #theme.dark.navbar.colors(dark);
    background: @colors[primary];
    border: 1px solid @colors[secondary];
  }
  
  // 将输出
  .navbar {
    background: black;
    border: 1px solid grey;
  }
  `
  const value25 = `
  #library() {
    .rules() {
      background: green;
    }
  }
  .box {
    @alias: #library.rules();
    @alias();
  }
  //输出
  .box {
    background: green;
  }`
  const value26 =`
  #library() {
    .rules() {
      background: green;
    }
  }
  .box {
    // 这里将不知道#library.rules是选择器还是调用方法；
    @alias: #library.rules; 
    @alias();   // 就会报错ERROR: Could not evaluate variable call @alias
  }`
  const value27 = `
  .box {
    @alias: #library.rules;
    // 我们可以给变量加上括号，来使用他作为选择器变量
    @{alias} {
      color: red;
    }
  }
  // 输出
  .box #library.rules {
    color: red;
  }`
export default class Easy extends React.Component {
    render() {
        return (
            <ContentPage>
                <Fragment key='left'>
                    <div id='content-1'>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="混合（Mixins）"
                            subTitle="Study hard"
                        >
                            <h1 className="font-bold">2.1 变量</h1>
                            <p>混合（Mixin）是一种将一组属性从一个规则集包含（或混入）到另一个规则集的方法。假设我们定义了一个类（class）如下：</p>
                            <Row>
                                <Col span={12}>
                                    <div className="menu">menu按钮</div>
                                    <p>.bordered 类所包含的属性就将同时出现在 .menu a 中了。（注意，你也可以使用 .menu 作为 mixin 使用。）</p>
                                    <p>当前和历史上，mixin调用中的括号是可选的，但不建议使用可选的括号，并且在将来的版本中将需要使用括号。</p>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value1}
                                    />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.2 不输出混合</h1>
                            <p>如果要创建一个mixin，但又不希望该mixin出现在CSS输出中，请在mixin定义后加上括号。</p>
                            <Row>
                                <Col span={10}>
                                    <div className="class">class</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value2} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.3 Mixins中的选择器</h1>
                            <p>Mixins不仅可以包含属性，还可以包含选择器。</p>
                            <Row>
                                <Col span={10}>
                                    <div className="button">button</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value3} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.4 命名空间</h1>
                            <p>如果要在更复杂的选择器中混合属性，则可以堆叠多个ID或类。</p>
                            <Row>
                                <Col span={10}>
                                    <div className="c">c
                                        <div className="inner">inner</div>
                                    </div>
                                    <p>（1）#outer &gt; .inner()</p>
                                    <p>（2）#outer .inner();</p>
                                    <p>（3）#outer.inner();</p>
                                    <div>以上三种的写法，最终的效果都是一样的</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value4} />
                                </Col>
                            </Row>
                            <h1>2.5 受保护的命名空间</h1>
                            <p>如果名称空间具有保护，则仅当保护条件返回true时，才使用由其定义的混合。评估名称空间保护的方式与保护Mixin的方式完全相同，因此以下两个混合方式的工作方式相同：</p>
                            <Row>
                                <Col span={13}>
                                    <div className="namespace">
                                        namespace
                                        <div className="mixin">mixin</div>
                                    </div>
                                    <Editor value={value5} />
                                </Col>
                                <Col span={11}>
                                    <p><strong>default</strong>假定该函数对于所有嵌套名称空间和mixin具有相同的值。永远不会评估以下mixin，因此保证其警惕之一是错误的：</p>
                                    <Editor value={value6} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.6 !important关键字</h1>
                            <p>!important在mixin调用之后使用关键字将其继承的所有属性标记为!important：</p>
                            <Row>
                                <Col span={10}>
                                    <div className="unimportant">unimportant</div>
                                    <div className="important">important</div>
                                    <p>如图所示，加了 !important的样式没有改变</p>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value7} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.7 参数混合</h1>
                            <p>Mixins也可以接受参数，这些参数是在混合时传递到选择器块的变量。</p>
                            <Row>
                                <Col span={10}>
                                    <div className="header">header</div>
                                    <div className="butt">butt</div>
                                    <div className="default">default</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value8} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.8 具有多个参数的Mixins</h1>
                            {/* <p>Mixins也可以接受参数，这些参数是在混合时传递到选择器块的变量。</p> */}
                            <Row>
                                <Col span={10}>
                                    <div className="some">some</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value9} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.9 命名参数</h1>
                            <p>混合引用可以通过名称而不是位置来提供参数值。可以通过名称来引用任何参数，它们不必采用任何特殊顺序：</p>
                            <Row>
                                <Col span={10}>
                                    <div className="class1">class1</div>
                                    <div className="class2">class2</div>
                                    <div className="class3">class3</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value10} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.10 @arguments</h1>
                            <p>@arguments在mixin内部有特殊含义，它包含调用mixin时传递的所有参数。如果您不想处理单个参数，这将很有用：</p>
                            <Row>
                                <Col span={10}>
                                    <div className="class4">class4</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value11} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.11 高级参数和@rest变量</h1>
                            <p>...如果您希望mixin接受可变数量的参数，则可以使用。在变量名之后使用此命令会将这些参数分配给变量。</p>
                            <Editor value={value12} />
                            <h1 className="font-bold">2.12 模式匹配</h1>
                            <p>有时，您可能想根据传递给它的参数来更改混合的行为。让我们从一些基本的东西开始：</p>
                            <Row>
                                <Col span={10}>
                                    <div className="class5">class5</div>
                                    <ul>
                                        这是发生了什么：
                                        <li>第一个mixin定义不匹配，因为它应dark作为第一个参数。</li>
                                        <li>第二个mixin定义匹配，因为它符合预期light。</li>
                                        <li>第三个mixin定义匹配，因为它期望任何值。</li>
                                    </ul>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value13} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.13 使用Mixins作为函数</h1>
                            <p>从混合调用中选择属性和变量，从Less 3.5开始，您可以使用属性/变量访问器从评估的混合规则中选择一个值。这可以让您使用类似于功能的混合。</p>
                            <p>如果您有多个匹配的mixin，则会评估并合并所有规则，并返回带有该标识符的最后一个匹配值。这类似于CSS中的层叠，它允许您“覆盖” mixin值。</p>
                            <Row>
                                <Col span={10}>
                                    <div className="class6">class6</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value14} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.14 未命名的查询</h1>
                            <p>如果您没有在其中指定查找值[@lookup]，而是在mixin或规则集调用之后写入[]，则所有值将级联，并选择最后声明的值。</p>
                            <Row>
                                <Col span={10}>
                                    <div className="class7">class7</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value15} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.15 将mixin和变量解锁到调用方作用域中</h1>
                            <Row>
                                <Col span={10}>
                                    <div className="caller">caller</div>
                                    <p>像在这个例子中，在调用者.caller范围内的变量是受到保护的，所以即使在外面重新给 @backcolor赋值了，但是.caller内部的@backcolor还是不变。而其外部的@backcolor是不受到保护的，已经被重新赋值。</p>
                                    <div className="outer">outer</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value16} />
                                </Col>
                            </Row>
                            <p>最后，在mixin中定义的mixin也充当返回值</p>
                            <Row>
                                <Col span={10}>
                                    <div className="class8">class8</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value17} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.16 递归混合</h1>
                            <p>在Less中，mixin可以自称。当与Guard表达式和模式匹配结合使用时，此类递归mixin 可用于创建各种迭代/循环结构。</p>
                            <Row>
                                <Col span={10}>
                                    <div className="class9">class9</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value18} />
                                </Col>
                            </Row>
                            <p>使用递归循环生成CSS网格类的一般示例：</p>
                            <Row>
                                <Col span={10}>
                                    <div className="div-1">div-1</div>
                                    <div className="div-2">div-2</div>
                                    <div className="div-3">div-3</div>
                                    <div className="div-4">div-4</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value19} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.17 Mixin Guards</h1>
                            <p>当您想匹配表达式时，与简单值或arity相反，保护很有用</p>
                            <p>为了尽量接近CSS的声明性，Less选择了通过受保护的mixins而不是if/ else语句来实现条件执行，这与@media查询功能规范类似。</p>
                            <Row>
                                <Col span={10}>
                                    <div className="class10">class10</div>
                                    <div className="class11">class11</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value20} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.18 后卫比较运算符</h1>
                            <p>{'比较运营商在后卫可用的完整列表是：>，>=，=，=<，<。此外，关键字true是唯一的真实值，使这两个mixins等效：'}</p>
                            <Editor value={value21} />
                            <p>除关键字之外的任何其他值true都是伪造的：</p>
                            <Editor value={value22} />
                            <h1 className="font-bold">2.19 逻辑运算符</h1>
                            <p>使用and关键字来组合：</p>
                            <Editor value='.mixin(@a) when (isnumber(@a)) and (@a > 0) { ... }' />
                            <p>您可以通过用逗号分隔来模仿or运算符,。如果任何一个守卫评估为真，则认为是匹配：</p>
                            <Editor value='.mixin(@a) when (@a > 10), (@a < -10) { ... }' />
                            <p>使用not关键字来否定条件：</p>
                            <Editor value='.mixin(@b) when not (@b > 0) { ... }' />
                            <h1 className="font-bold">2.20 类型检查功能</h1>
                            <p>如果要基于值类型匹配混合，则可以使用以下is功能：</p>
                            <Editor value={value23} />
                            <p>以下是基本的类型检查功能：</p>
                            <ul>
                                <li>iscolor</li>
                                <li>isnumber</li>
                                <li>isstring</li>
                                <li>iskeyword</li>
                                <li>isurl</li>
                                <p>如果要检查值是否是数字，是否还使用特定单位，则可以使用以下方法之一：</p>

                                <li>ispixel</li>
                                <li>ispercentage</li>
                                <li>isem</li>
                                <li>isunit</li>
                            </ul>
                            <h1 className="font-bold">2.21 混叠别名</h1>
                            <p>将mixin调用分配给变量,可以将Mixins分配给变量以为变量调用，也可以将其用于映射查找。</p>
                            <Row>
                                <Col span={10}>
                                    <div className="navbar">navbar</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value24} />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.22 可变调用</h1>
                            <p>整个mixin调用可以被别名并称为变量调用。如：</p>
                            <Row>
                                <Col span={10}>
                                    <div className="box">box</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value25} />
                                </Col>
                            </Row>
                            <p>请注意，与root中使用的mixin不同，分配给变量且不带参数的 mixin调用始终需要括号。以下无效</p>
                            <Editor value={value26} />
                            <p>这是因为不知道变量到底是分配选择器还是mixin调用，这是不明确的。就像上面的例子，我们不知道这里的#library.rules是选择器#library.rules，还是调用#library.rules</p>
                            <Row>
                                <Col span={10}>
                                    <div className="box">box
                                        <div id="library" className='rules'>library.rules</div>
                                    </div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value27} />
                                </Col>
                            </Row>
                        </PageHeader>
                    </div>
                </Fragment>
                <Fragment key='right'>
                    <ul>
                        <li><a href='#content-1'>npm的安装</a></li>
                        <li><a href='#content-2'>如何安装本地包</a></li>
                        <li><a href='#content-3'>使用package.json</a></li>
                        <li><a href='#content-4'>如何发布和更新程序包</a></li>
                        <li><a href='#content-5'>如何用dist标签标记包装</a></li>
                    </ul>
                </Fragment>
            </ContentPage>
        )
    }
}
