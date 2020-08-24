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
const value5 =`
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
  const value8 =`
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
                                    <Editor value={value6}/>
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
