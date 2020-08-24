import React, { Fragment } from 'react';
import { Row, Col, PageHeader } from 'antd';
import Editor from '../../component/Editor/index';
import ContentPage from '../../component/content-page';
import './index.less';

const value1 = `
@background: pink;
.test-Operations-1 {
    background-color: @background;
}
.test-Operations-2 {
    @background: yellowgreen;
    background-color: @background;
}`
const value2 = `
@selector: banner;
.@{selector} {
    font-weight: bold;
    background-color: orangered;
}
或者
@selector: .banner;
@{selector} {
    font-weight: bold;
    background-color: orangered;
    // 这里的@theme-color，我们用到了全局变量，可以去webpack里查看globalVars
    border: 1px solid @theme-color; 
}`
const value3 = `
@images: "./img";
.test-url {
    color: #444;
    height: 200px;
    background: url("@{images}/img.jpg");
  }`
const value4 = `
// 变量
@themes: "../../src/themes";

// 导入，当然也可以直接导入了
@import "@{themes}/tidal-wave.less";`
const value5 = `
@property: color;

.widget {
  @{property}: orange;
  background-@{property}: pink;
}`
const value6 = `
属性变量有两种写法
第一种：当@color里面引用的变量没有用@时，下面引用@color的时候，就要写两个@，即@@color
@primary:  green;
@secondary: blue;
.section {
  @color: secondary;
  .element {
    color: @@color;
  }
}

第二种：当@color里面引用的变量用@时，下面引用@color的时候，就只要写一个@，即@color
@primary:  green;
@secondary: blue;
.section {
  @color: @secondary;
  .element {
    color: @color;
  }
}`
const value7 = `
.lazy {
    background: @var;
    @a: green;
}
@var: @a;
@a: pink;`
const value8 = `
// 使用内部属性作为变量
.prop {
    color: pink;
    background-color: $color;
    color: orange;
}`
const value9 = `
// 在library.less文件中
@base-color: green;
@dark-color: darken(@base-color, 20%);

// 在当前的文件中导入library.less
@import "library.less";
@base-color: red;
.base {
    background: @dark-color;
}

// darken是less里降低亮度的函数，
//darken(color: 颜色, amount：它包含0 - 100%之间的百分比, 方法：它是可选参数，通过将其设置为相对，用于相对于当前值进行调整)`
export default class Easy extends React.Component {
    componentDidMount() {
        console.log("aa", document.getElementsByClassName('test-url')[0].innerHTML)
        console.log("aa", (document.getElementsByClassName('test-url')[0] as HTMLElement).innerText)
    }
    render() {
        return (
            <ContentPage>
                <Fragment key='left'>
                    <div id="install">
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="1、安装"
                            subTitle="Study hard"
                        >
                            <p className="font-red-bold">npm install -g less</p>
                        </PageHeader>
                    </div>
                    <div id="variable">
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="2、Less 变量"
                            subTitle="Study hard"
                        >
                            <h1 className="font-bold" id="content-1">2.1 变量</h1>
                            <p>在样式表中看到相同的值重复数十次甚至数百次的情况并不少见,变量使您可以从一个位置控制这些值，从而使代码易于维护：</p>
                            <Row>
                                <Col span={12}>
                                    <div className="test-Operations-1">test-Operations-1</div>
                                    <div className="test-Operations-2">test-Operations-2</div>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value1}
                                    />var
                                </Col>
                            </Row>
                            <h1 className="font-bold" id="content-2">2.2 Less变量 (可变插值) </h1>
                            <p>上面的示例着重于使用变量来控制CSS规则中的值，但是它们也可以在其他地方使用，例如选择器名称，属性名称，URL和@import语句。</p>
                            <p className="font-bold">(1) 选择器变量: </p>
                            <Row>
                                <Col span={8}>
                                    <div className="banner">banner</div>
                                    <div className="test-Operations-2">test-Operations-2</div>
                                </Col>
                                <Col span={16}>
                                    <Editor
                                        value={value2}
                                    />
                                </Col>
                            </Row>
                            <p className="font-bold" id="content-3">(2) URLs变量</p>
                            <Row>
                                <Col span={12}>
                                    <div className="test-url"><span>test-url</span></div>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value3}
                                    />
                                </Col>
                            </Row>
                            <p className="font-bold" id="content-4">(3) Import 变量</p>
                            <Editor
                                value={value4}
                            />
                            <p className="font-bold" id="content-5">(4) 属性变量</p>
                            <Row>
                                <Col span={10}>
                                    <div className='widget'>widget</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value5} />
                                </Col>
                            </Row>
                            <p className="font-bold" id="content-6">(5) 可变变量</p>
                            <Row>
                                <Col span={4}>
                                    <div className='section'>
                                        section
                                        <div className='element'>element</div>
                                    </div>
                                </Col>
                                <Col span={20}>
                                    <Editor value={value6} />
                                </Col>
                            </Row>
                            <p className="font-bold" id="content-7">(6) 懒惰评估</p>
                            <p>变量在使用之前不必声明。有效的更少代码段：</p>
                            <Row>
                                <Col span={10}>
                                    <div className='lazy'>
                                        lazy
                                    </div>
                                    <div>两次定义变量时，使用变量的最后定义，从当前作用域向上搜索。这类似于css本身，其中css定义中的最后一个属性用于确定值。</div>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value7} />
                                </Col>
                            </Row>
                            <p className="font-bold" id="content-8">(7) 属性作为变量（新！)</p>
                            <Row>
                                <Col span={10}>
                                    <div className='prop'>
                                        prop
                                    </div>
                                    <p>您可以使用$prop语法轻松地将属性像变量一样对待。有时，这会使您的代码更轻一些。</p>
                                    <p>请注意，像变量一样，Less将选择当前/父范围内的最后一个属性作为“最终”值。</p>
                                </Col>
                                <Col span={14}>
                                    <Editor value={value8} />
                                </Col>
                            </Row>
                            <p className="font-bold" id="content-9">(8) 默认变量</p>
                            <Row>
                                <Col span={4}>
                                    <div className='base'>
                                        base
                                    </div>
                                    <p>有时我们会请求默认变量-一种仅在尚未设置变量的情况下才可以设置的功能。不需要此功能是因为您可以通过在后面放置定义轻松地覆盖变量</p>
                                </Col>
                                <Col span={20}>
                                    <Editor value={value9} />
                                </Col>
                            </Row>
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
