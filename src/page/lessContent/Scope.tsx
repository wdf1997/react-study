import React, { Fragment } from 'react';
import { PageHeader } from 'antd';
import Editor from '../../component/Editor/index';
import ContentPage from '../../component/content-page';
import './index.less';

const value1 = `
@var: red;
#page {
  @var: white;
  #header {
    color: @var; // white
  }
}

与 CSS 自定义属性一样，混合（mixin）和变量的定义不必在引用之前事先定义。因此，下面的 Less 代码示例和上面的代码示例是相同的：

@var: red;
#page {
  #header {
    color: @var; // white
  }
  @var: white;
}`
const value2 = `
  .lazy-eval {
    width: @var;
  }
  @var: @a;
  @a: 9%;
  
// 和下面的结果一样
.lazy-eval {
    width: @var;
    @a: 9%;
  }
  @var: @a;
  @a: 100%;  

// 以上两种的结果都是：
  .lazy-eval {
    width: 9%;
  }  `
const value3 = `
  @var: 0;
  .class {
    @var: 1;
    .brass {
      @var: 2;
      three: @var;
      @var: 3;
    }
    one: @var;
  }

// 输出：
  .class {
    one: 1;
  }
  .class .brass {
    three: 3;
  } `
const value4 = `
  /* 一个块注释
 * style comment! */
@var: red;

// 这一行被注释掉了！
@var: white;`
const value5 = `
.foo {
    background: #900;
  }
@import "this-is-valid.less";`
const value6 = `
@import "foo";      // foo.less is imported
@import "foo.less"; // foo.less is imported
@import "foo.php";  // foo.php imported as a Less file
@import "foo.css";  // statement left in place, as-is`
export default class Easy extends React.Component {
    render() {
        return (
            <ContentPage>
                <Fragment key='left'>
                    <div id="install">
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="1、作用域（Scope）"
                            subTitle="Study hard"
                        >
                            <p>Less 中的作用域与 CSS 中的作用域非常类似。首先在本地查找变量和混合（mixins），如果找不到，则从“父”级作用域继承。</p>
                            <Editor value={value1} />
                            <h1 className='font-bold'>懒加载</h1>
                            <Editor value={value2} />
                            <p>当定义变量两次时，将使用该变量的最后一个定义，从当前范围向上搜索。这与css本身类似，其中使用定义中的最后一个属性来确定值。</p>
                            <Editor value={value3} />
                        </PageHeader>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="2、注释（Comments）"
                            subTitle="Study hard"
                        >
                            <p>块注释和行注释都可以使用：</p>
                            <Editor value={value4} />
                        </PageHeader>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="3、导入（Importing）"
                            subTitle="Study hard"
                        >
                            <p>“导入”的工作方式和你预期的一样。你可以导入一个 .less 文件，此文件中的所有变量就可以全部使用了。如果导入的文件是 .less 扩展名，则可以将扩展名省略掉：</p>
                            <h1 className='font-bold'>3.1 从其他样式表导入样式</h1>
                            <p>在标准CSS中，@import规则必须位于所有其他类型的规则之前。但是Less不在乎您将@import语句放在何处。</p>
                            <Editor value={value5} />
                            <h1 className='font-bold'>3.2 文件扩展名</h1>
                            <ul>
                                @import 取决于文件扩展名，Less可以对语句进行不同的处理：
                                <li>如果文件具有.css扩展名，它将被视为CSS，并且该@import语句保持原样（请参见下面的内联选项）。</li>
                                <li>如果有其他扩展名，则将其视为Less并导入。</li>
                                <li>如果没有扩展名，.less将被附加，并将作为导入的Less文件包含在内。</li>
                            </ul>
                            <Editor value={value6}/>
                        </PageHeader>
                    </div>
                </Fragment>
                <Fragment key='right'>
                    <ul>
                        <li><a href='#install'>命名空间和访问符</a></li>
                    </ul>
                </Fragment>
            </ContentPage>
        )
    }
}
