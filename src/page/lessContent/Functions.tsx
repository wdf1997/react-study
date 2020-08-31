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
                            <Editor value={value5}/>
                            <p>注意：如果参数不是字符串，则输出undefined</p>
                            <h1 className="font-bold">1.3 List Functions（列表函数）</h1>

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
