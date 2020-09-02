import React, { Fragment } from 'react';
import { PageHeader } from 'antd';
import Editor from '../../component/Editor/index';
import ContentPage from '../../component/content-page';
import './index.less';

const value1 = `
#colors() {
    primary: blue;
    secondary: green;
  }
  
  .button {
    color: #colors[primary];
    border: 1px solid #colors[secondary];
  }`
  const value2 = `
  #header a {
    color: orange;
    #bundle.button();  // 还可以书写为 #bundle > .button 形式
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
                            title="命名空间和访问符"
                            subTitle="Study hard"
                        >
                            <p>从 Less 3.5 版本开始，你还可以将混合（mixins）和规则集（rulesets）作为一组值的映射（map）使用。</p>
                            <Editor value={value1}/>
                            <p>现在，如果我们希望把 .button 类混合到 #header a 中，我们可以这样做：</p>
                            <Editor value={value2}/>
                            <p>注意：如果不希望它们出现在输出的 CSS 中，例如 #bundle .tab，请将 () 附加到命名空间（例如 #bundle()）后面。</p>
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
