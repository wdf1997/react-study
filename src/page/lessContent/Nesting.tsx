import React, { Fragment } from 'react';
import { Row, Col, PageHeader } from 'antd';
import Editor from '../../component/Editor/index';
import ContentPage from '../../component/content-page';
import './index.less';

const value1 = `
.nest {
    color: blue;
    &:hover {
      color: green;
    }
  }
  // 结果是
  .nest {
      color: blue;
  }
  .nest:hover {
    color: green;
  }`
const value2 = `
.nest {
    &-1 {
      background: #8a2be2;
    }
    &-2 {
      background: #ff7f50;
    }
  }
  // 结果是：
.nest-1 {
    background: #8a2be2;
}
.nest-2 {
    background: #ff7f50;
}
`
const value3 = `
.link {
    & + & {
      color: red;
    }
  
    & & {
      color: green;
    }
  
    && {
      color: blue;
    }
  
    &, &ish {
      color: cyan;
    }
  }
  // 结果是：
  .link + .link {
    color: red;
  }
  .link .link {
    color: green;
  }
  .link.link {
    color: blue;
  }
  .link, .linkish {
    color: cyan;
  }`
const value4 = `
  .grand {
    .parent {
      & > & {
        color: red;
      }
  
      & & {
        color: green;
      }
  
      && {
        color: blue;
      }
  
      &, &ish {
        color: pink;
      }
    }
  }
  // 结果是：
  .grand .parent > .grand .parent {
    color: red;
  }
  .grand .parent .grand .parent {
    color: green;
  }
  .grand .parent.grand .parent {
    color: blue;
  }
  .grand .parent,
  .grand .parentish {
    color: lightblue;
  }`
const value5 = `
  .link {
    .menu {
      background: #f86767;
      .parent & {
        background: #6b20b2;
      }
    }
  }
  // 输出是：
.link .menu {
    background: #f86767;
}
.parent .link .menu {
    background: #6b20b2;
}`
const value6 = `
p, a {
    border-top: 2px dotted #366;
    & + & {
      border-top: 0;
    }
}
// 输出：
p,
a
{
  border-top: 2px dotted #366;
}
p + p,
p + a,
a + p,
a + a
{
  border-top: 0;
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
                            title="嵌套（Nesting）"
                            subTitle="Study hard"
                        >
                            <h1 className="font-bold">1.1 父母选择者</h1>
                            <p>引用父选择器 &</p>
                            <Row>
                                <Col span={12}>
                                    <div className="nest">nest</div>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value1}
                                    />
                                </Col>
                            </Row>
                            <p>请注意，如果没有使用&，则上面的示例将产生.nest :hover，而这并不是我们通常希望使用nested的结果:hover。</p>
                            <p>“父选择器”运算符有多种用途。基本上，任何时候您都需要使用默认规则以外的其他方式组合嵌套规则的选择器。例如，另一种典型用法&是产生重复的类名：</p>
                            <Row>
                                <Col span={12}>
                                    <div className="nest-1">nest-1</div>
                                    <div className="nest-2">nest-2</div>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value2}
                                    />
                                </Col>
                            </Row>
                            <h1 className="font-bold">1.2 多 &</h1>
                            <p>&在选择器中可能会出现多次。这使得可以重复引用父选择器而无需重复其名称。</p>
                            <Row>
                                <Col span={12}>
                                    <div className="link">link
                                        <div className="link">link</div>
                                    </div>
                                    <div className="linkish">linkish</div>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value3}
                                    />
                                </Col>
                            </Row>
                            <p className="font-bold">请注意，&代表所有父选择器（而不仅仅是最接近的祖先），因此以下示例：</p>
                            <Editor
                                value={value4}
                            />
                            <h1 className="font-bold">1.3 更改选择器顺序</h1>
                            <p>将选择器放在继承的（父）选择器之前可能很有用。这可以通过&在当前选择器之后放置来完成。例如，当使用Modernizr时，您可能要根据支持的功能指定不同的规则：</p>
                            <Row>
                                <Col span={12}>
                                    <div className="link">link
                                        <div className="menu">menu</div>
                                    </div>
                                    <div className="parent">parent
                                        <div className="link">link
                                            <div className="menu">menu</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <Editor
                                        value={value5}
                                    />
                                </Col>
                            </Row>
                            <h1 className="font-bold">1.4 组合爆炸</h1>
                            <p>& 也可以用于生成逗号分隔列表中选择器的所有可能排列：</p>
                            <Editor
                                value={value6}
                            />
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
