import React, { Fragment } from 'react';
import { Row, Col, PageHeader } from 'antd';
import Editor from '../../component/Editor/index';
import ContentPage from '../../component/content-page';
import './index.less';

const value1 = `
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
}`
const value3 =`
@images: "./img";
.test-url {
    color: #444;
    height: 200px;
    background: url("@{images}/img.jpg");
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
                            title="1、安装"
                            subTitle="Study hard"
                        >
                            <p className="font-red-bold">npm install -g less</p>
                        </PageHeader>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="2、Less 变量"
                            subTitle="Study hard"
                        >
                            <h1 className="font-bold">2.1 变量</h1>
                            <p>在样式表中看到相同的值重复数十次甚至数百次的情况并不少见,变量使您可以从一个位置控制这些值，从而使代码易于维护：</p>
                            <Row>
                                <Col span={12}>
                                    <div className="test-Operations-1">test-Operations-1</div>
                                    <div className="test-Operations-2">test-Operations-2</div>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value1}
                                    />
                                </Col>
                            </Row>
                            <h1 className="font-bold">2.2 Less变量 (可变插值) </h1>
                            <p>上面的示例着重于使用变量来控制CSS规则中的值，但是它们也可以在其他地方使用，例如选择器名称，属性名称，URL和@import语句。</p>
                            <p className="font-bold">(1) 选择器变量: </p>
                            <Row>
                                <Col span={12}>
                                    <div className="banner">banner</div>
                                    <div className="test-Operations-2">test-Operations-2</div>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value2}
                                    />
                                </Col>
                            </Row>
                            <p className="font-bold">(2) 网址url变量</p>
                            <Row>
                                <Col span={12}>
                                    <div className="test-url">test-url</div>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value3}
                                    />
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
