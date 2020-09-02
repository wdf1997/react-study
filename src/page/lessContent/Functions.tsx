import React, { Fragment } from 'react';
import { Row, Col, PageHeader } from 'antd';
import Editor from '../../component/Editor/index';
import ContentPage from '../../component/content-page';
import './index.less';
const value1 = `参数：

    condition：布尔表达式
    value1：如果condition为true，则返回一个值。
    value2：如果condition不正确，则返回一个值。
`
const value2 = `
@some: foo;
.func {
  border: if((1 < 2), 3px, 0) solid black;
  background:  if((iscolor(@some)), @some, #862cec);
}
// 结果
.func {
    border: 3px solid black;
    background: #862cec;
}`
const value3 = `
if(not (true), foo, bar);
if((true) and (2 > 1), foo, bar);
if((false) or (isstring("boo!")), foo, bar);`
const value4 = `
@bg: black;
@bg-light: boolean(luma(@bg) > 50%);
div {
  background: @bg; 
  color: if(@bg-light, black, white);
}

// 结果：
div {
  background: black;
  color: white;
}`
const value5 = `
escape('a=1')

输出：
a%3D1`
const value6 = `
参数：string-要转义的字符串。
返回：string-转义的字符串，不带引号。

例：
@mscode: "ms:alwaysHasItsOwnSyntax.For.Stuff()" 
filter: e(@mscode);

输出：
filter: ms:alwaysHasItsOwnSyntax.For.Stuff();`
const value7 = `
@list: "banana", "tomato", "potato", "peach";
n: length(@list);

输出：
n: 4;`
const value8 = `
@list: apple, pear, coconut, orange;
value: extract(@list, 3);

输出：
value: coconut;`
const value9 = `
value: range(4);

输出：
value: 1 2 3 4;`
const value10 = `
value: range(10px, 30px, 10);

输出：
value: 10px 20px 30px;`
const value11 = `
@selectors: blue, green, red;
each(@selectors, {
  .sel-@{value} {
    background: @value;
  }
});

输出：
.sel-blue {
    background: blue;
}
.sel-green {
    background: green;
}
.sel-red {
    background: red;
}`
const value12 = `
 @set: {
    one: blue;
    two: green;
    three: red;
  }
  .set {
    each(@set, {
      @{key}-@{index}: @value;
    });
  }

//  这将输出： 
  .set {
    one-1: blue;
    two-2: green;
    three-3: red;
  }`
const value13 = `
  .set-2() {
    one: blue;
    two: green;
    three: red;
  }
  .set-2 {
    // Call mixin and iterate each rule
    each(.set-2(), .(@v, @k, @i) {
      @{k}-@{i}: @v;
    });
  }

// 输出：
  .set-2 {
    one-1: blue;
    two-2: green;
    three-3: red;
  }`
const value14 = `
  each(range(4), {
    .col-@{value} {
      height: (@value * 20px);
      border: 2px solid pink;
    }
  });

//  输出：
  .col-1 {
    height: 20px;
  }
  .col-2 {
    height: 40px;
  }
  .col-3 {
    height: 60px;
  }
  .col-4 {
    height: 80px;
  }`
  const value15 = `
//  1、 ceil ：向上舍入到下一个最大整数。
  例： ceil(2.4)
  输出： 3 
//  2、 floor：向下舍入到下一个最小整数。
  例： floor(2.4)
  输出： 2 
// 3、 percentage：将浮点数转换为百分比字符串。
  例： percentage(0.5)
  输出： 50% 
// 4、 round
  参数：
  number：浮点数。
  decimalPlaces：可选：要舍入的小数位数。预设为0。

  例： round(1.67)  round(1.67, 1)
  输出： 1 , 1.7
// 5、 sqrt：计算数字的平方根。单位保持不变。
  例： sqrt(25cm)
  输出：5cm
// 6、 abs: 计算数字的绝对值。保持单位不变。
  例：abs(25cm)  abs(-18.6%)
  输出：25cm, 18.6%
// 7、 sin：计算正弦函数。
  例：sin(1) sin(1deg) sin(1grad)
  输出：
  0.8414709848078965; // sine of 1 radian
  0.01745240643728351; // sine of 1 degree
  0.015707317311820675; // sine of 1 gradian
  // ...中间还有好多个函数，不想写了，不懂的去看官网
// 8、 min：返回一个或多个值中的最小值。
  例：min(3px, 42px, 1px, 16px);
  输出：1px
// 9、 max：返回一个或多个值中的最大值。
  例：max(3px, 42px, 1px, 16px);
  输出：42px
`
const value16 = `
//  1、 isnumber ：返回true值表示是数字，false表示不是。
  例： isnumber(2.4) isnumber(7.8%) isnumber(56px);
  输出： true, true, true 
//  2、 isstring：返回true值表示是字符串，false表示不是。
  例： isstring("string") isstring(7.8%) isstring(56px)
  输出： true, false, false 
// 3、 iscolor: 返回true值表示是颜色，false表示不是。
  例： iscolor(blue) iscolor(#ff0)
  输出： true, true
// 4、 iskeyword：返回true值表示是关键字，false表示不是。
  例： iskeyword(keyword) iskeyword(1)
  输出：true false
// 5、 isurl: 返回true值表示是URL，false表示不是。
  例： isurl(url(...)) isurl(1)
  输出：true false
  // ...更多的查看文档`
export default class Easy extends React.Component {
    render() {
        return (
            <ContentPage>
                <Fragment key='left'>
                    <div id="install">
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="函数（Functions）"
                            subTitle="Study hard"
                        >
                            <p>Less 内置了多种函数用于转换颜色、处理字符串、算术运算等</p>
                            <h1 className="font-bold">1.1 Logical Functions（逻辑函数）</h1>
                            <h1 className="font-bold">1.1.1 if</h1>
                            <Editor value={value1} />
                            <p>根据条件返回两个值之一。</p>
                            <Row>
                                <Col span={10}>
                                    <div className="func">func</div>
                                </Col>
                                <Col span={14}>
                                    <Editor
                                        value={value2}
                                    />
                                </Col>
                            </Row>
                            <p>注意：作为conditional参数支持的布尔表达式与Guard Statements相同。以下几种都是可以的，</p>
                            <Editor value={value3} />
                            <p>注意：在Less 3.6之前，该条件需要一组括号。</p>
                            <h1 className="font-bold">1.1.2 boolean</h1>
                            <Editor value={value4} />
                            <p>评估为真或假</p>
                            <h1 className="font-bold">1.2 String Functions（字符串函数）</h1>
                            <h1 className="font-bold">1.2.1 escape</h1>
                            <p>将URL编码应用于在输入字符串中找到的特殊字符。</p>
                            <li>这些字符不编码：,，/，?，@，&，+，'，~，!和$。</li>
                            <li>{'最常见的编码的字符：\\<space\\>，#，^，(，)，{，}，|，:，>，<，;，]，[和=。'}</li>
                            <p>参数：：string要转义的字符串。</p>
                            <p>返回：转义的string内容，不带引号。</p>
                            <Editor value={value5} />
                            <p>注意：如果参数不是字符串，则输出undefined</p>
                            <h1 className="font-bold">1.2.2 e</h1>
                            <p>字符串转义。</p>
                            <p>它期望将字符串作为参数并按原样返回其内容，但不带引号。它可用于输出无效的CSS语法的CSS值，或使用Less不能识别的专有语法。</p>
                            <Editor value={value6} />
                            <h1 className="font-bold">1.3 List Functions（列表函数）</h1>
                            <h1 className="font-bold">1.3.1 length</h1>
                            <p>返回值列表中的元素数。</p>
                            <p>参数：list -用逗号或空格分隔的值列表。</p>
                            <Editor value={value7} />
                            <h1 className="font-bold">1.3.2 extract</h1>
                            <p>返回列表中指定位置的值。</p>
                            <ul>参数：
                                <li>list -用逗号或空格分隔的值列表。</li>
                                <li>index -一个整数，指定要返回的列表元素的位置。</li>
                            </ul>
                            <Editor value={value8} />
                            <h1 className="font-bold">1.3.3 range</h1>
                            <p>生成跨越一系列值的列表</p>
                            <ul>
                                参数：
                                <li>start -（可选）起始值，例如1或1px</li>
                                <li>end - 最终值，例如5px</li>
                                <li>step -（可选）要增加的金额</li>
                            </ul>
                            <Editor value={value9}/>
                            <p>范围内每个值的输出将与该end值的单位相同。例如：</p>
                            <Editor value={value10}/>
                            <h1 className="font-bold">1.3.4 each</h1>
                            <p>将规则集的评估绑定到列表的每个成员。</p>
                            <ul>
                                参数：
                                <li>rules - An anonymous ruleset/mixin</li>
                                <li>list -用逗号或空格分隔的值列表。</li>
                            </ul>
                            <Row>
                                <Col span={10}>
                                    <div className='sel-blue'>sel-blue</div>
                                    <div className='sel-green'>sel-green</div>
                                    <div className='sel-red'>sel-red</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value11}/>
                                </Col>
                            </Row>
                            <p>默认情况下，每一个规则集的约束，每个列表构件，一个可变的 @value，@key 和 @index。对于大多数列表，@key 和 @index 将被分配相同的值（数字位置，基于1）。但是，您也可以将规则集本身用作结构化列表。如：</p>
                            <Editor value={value12}/>
                            <h1 className="font-bold">在 each() 中设置变量名称</h1>
                            <p>您没有使用@value，@key以及@index在你的each()功能。在Less 3.7中，Less使用该each()函数引入了匿名混入的概念，以后可能会扩展到语法的其他部分。</p>
                            <p>一位不愿具名的混入使用的形式，以 #() 或 .() 开始, . 或者 # 就像一个普通的混入会。在中each()，您可以像这样使用它：</p>
                            <Editor value={value13}/>
                            <p>该each()功能将在匿名混入定义的变量名和绑定他们的 @value，@key 和 @index 值，按照这个顺序。如果你只写 each(@list, #(@value) {})，则 @key 和 @index 也将被定义。</p>
                            <h1 className="font-bold">for使用range和创建循环each</h1>
                            <p>您可以通过 for 简单地生成数字列表并将其 each 扩展为规则集来模拟循环。</p>
                            <Row>
                                <Col span={10}>
                                    <div className='col-1'>col-1</div>
                                    <div className='col-2'>col-2</div>
                                    <div className='col-3'>col-3</div>
                                    <div className='col-4'>col-4</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value14}/>
                                </Col>
                            </Row>
                            <h1 className="font-bold">1.4 Math Functions（数学函数）</h1>
                            <Editor value={value15}/>
                            <h1 className="font-bold">1.5 Type Functions（类型函数）</h1>
                            <Editor value={value16}/>
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
