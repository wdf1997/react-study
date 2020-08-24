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
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value1}
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
