import React, { Fragment } from 'react';
import { PageHeader } from 'antd';
import Editor from '../../component/Editor/index';
import ContentPage from '../../component/content-page';
import './index.less';

const value1 = `
// 所有操作数被转换成相同的单位
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

// example with variables
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%`
const value2 = `
@color: #224488 / 2; //结果是 #112244
background-color: #112244 + #111; // 结果是 #223355`
const value3 = `
@var: 50vh/2;
width: calc(50% + (@var - 20px));  // 结果是 calc(50% + (25vh - 20px))`
const value4 = `
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}

编译为：
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}`
const value5 = `
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
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
                            title="1、运算（Operations）"
                            subTitle="Study hard"
                        >
                            <p>算术运算符 +、-、*、/ 可以对任何数字、颜色或变量进行运算。如果可能的话，算术运算符在加、减或比较之前会进行单位换算。计算的结果以最左侧操作数的单位类型为准。如果单位换算无效或失去意义，则忽略单位。无效的单位换算例如：px 到 cm 或 rad 到 % 的转换。</p>
                            <Editor value={value1}/>
                            <p>乘法和除法不作转换。因为这两种运算在大多数情况下都没有意义，一个长度乘以一个长度就得到一个区域，而 CSS 是不支持指定区域的。Less 将按数字的原样进行操作，并将为计算结果指定明确的单位类型。</p>
                            <Editor value='@base: 2cm * 3mm; // 结果是 6cm'/>
                            <p>你还可以对颜色进行算术运算：</p>
                            <Editor value={value2}/>
                            <h1 className="font-bold">1.1 calc() 特例</h1>
                            <p>为了与 CSS 保持兼容，calc() 并不对数学表达式进行计算，但是在嵌套函数中会计算变量和数学公式的值。</p>
                            <Editor value={value3}/>
                        </PageHeader>
                    </div>
                    <div id="variable">
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="2、转义（Escaping）"
                            subTitle="Study hard"
                        >
                            <p>转义（Escaping）允许你使用任意字符串作为属性或变量值。任何 ~"anything" 或 ~'anything' 形式的内容都将按原样输出，除非 interpolation。</p>
                            <Editor value={value4}/>
                            <p>注意，从 Less 3.5 开始，可以简写为：</p>
                            <Editor value={value5}/>
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
