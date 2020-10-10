import React, { Fragment } from 'react';
import Editor from '../../component/Editor/index';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { PageHeader } from 'antd';
import ContentPage from '../../component/content-page';
import './index.less';
import { initState } from "../../store/textReducer";
import * as actions from "../../store/actions";

const value1 = `
npm set init.author.email "wombat@npmjs.com"
npm set init.author.name "ag_dubs"
npm set init.license "MIT"`

interface Props {
    textReducer: initState,
    actions: actions.Action
}
const mapStateToProps = (state: {textReducer: initState}) => ({
    textReducer: state.textReducer
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators(Object.assign({}, actions.textAction), dispatch)
})
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class First extends React.Component<Props> {
    render() {
        return (
            <ContentPage>
                <Fragment key='left'>
                    <div id='content-1'>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="npm的安装"
                            subTitle="Study hard"
                        >
                            <p>npm是用Node.js编写的，因此您需要安装Node.js才能使用npm。您可以通过Node.js网站或通过安装Node Version Manager或NVM 来安装npm 。本章介绍了这两个选项</p>
                            <h2>从 Node.js 网站安装 npm</h2>
                            <p className='font-bold'>1. 安装 Node.js 和 npm</p>
                            <p>如果您使用的是OS X或Windows，请使用Node.js下载页面中的安装程序之一。确保安装标有LTS的版本。其他版本尚未通过npm进行测试。</p>
                            <p>安装后，运行<span className='font-red-bold'>node -v</span>。版本应为v8.9.1或更高版本。</p>
                            <p className='font-bold'>2. 更新 npm</p>
                            <p>安装node.js时，将自动安装npm。但是，npm的更新频率比Node.js的更新频率高，因此请确保您具有最新版本。</p>
                            <p>要测试，请运行：<span className='font-red-bold'>npm -v</span>。</p>
                            <p>为确保它与最新版本匹配，请滚动到此页面底部。如果版本与最新版本不匹配，请运行：<span className='font-red-bold'>npm install npm@latest -g.</span></p>
                            <p>这将安装npm的最新官方经过测试的版本。</p>
                            <p>要安装将来发布的版本，请运行：<span className='font-red-bold'>npm install npm@next -g</span></p>
                        </PageHeader>
                    </div>
                    <div id='content-2'>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="如何安装本地包"
                            subTitle="Study hard"
                        >
                            <p className='font-red-bold'> npm install xxx</p>
                            <p>上述命令执行之后将会在当前的目录下创建一个 node_modules 的目录（如果不存在的话），然后将下载的包保存到这个目录下。</p>
                        </PageHeader>
                    </div>
                    <div id='content-3'>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="使用package.json"
                            subTitle="Study hard"
                        >
                            <h2>1、 一个package.json必须具备：</h2>
                            <ul>
                                <li>
                                    "name"
                                    <ul>
                                        <li>全部小写</li>
                                        <li>一个字，没有空格</li>
                                        <li>允许使用破折号和下划线</li>
                                    </ul>
                                </li>
                                <li>
                                "version"
                                    <ul>
                                        <li>以...的形式 x.x.x</li>
                                        <li>遵循semver规范</li>
                                    </ul>
                                </li>
                            </ul>
                            <h2>2、创建一个package.json</h2>
                            <p className='font-bold'>（1）运行CLI调查表：<span className='font-red-bold'>npm init</span></p>
                            <p className='font-bold'>（2）创建一个默认值 package.json：<span className='font-red-bold'>npm init --yes</span></p>
                            <p>您还可以为init命令设置几个配置选项。一些有用的：</p>
                            <Editor value={value1}/>
                            <h2>3、指定依赖项</h2>
                            <p>要指定项目所依赖的软件包，您需要列出要在package.json文件中使用的软件包。您可以列出2种类型的软件包：</p>
                            <ul>
                                <li><span className='font-bold'>"dependencies"：</span>您的应用程序在生产中需要这些软件包。</li>
                                <li><span className='font-bold'>"devDependencies"：</span>这些软件包仅在开发和测试时需要。</li>
                            </ul>
                            <h2>4、在--save和--save-dev安装标志</h2>
                            <p className='font-bold'>(1) 要将依赖包名称添加到您package.json的中dependencies：<span className='font-red-bold'>npm install xxx --save</span></p>
                            <p className='font-bold'>(2) 要将依赖包名称添加到您package.json的中devDependencies：<span className='font-red-bold'>npm install xxx --save-dev</span></p>
                            <h2>5、更新本地安装的包</h2>
                            <p className='font-bold'>(1) 在 package.json 文件所在的目录中执行<span className='font-red-bold'>npm update 命令。</span></p>
                            <p className='font-bold'>(2) 执行 <span className='font-red-bold'>npm outdated </span>命令。不应该有任何输出。</p>
                            <h2>6、卸载本地安装的包</h2>
                            <p>(1) 如需删除 node_modules 目录下面的包（package），执行：<span className='font-red-bold'>npm uninstall xxx</span></p>
                            <p>(2) 如需从 package.json文件中的dependencies删除依赖，执行: <span className='font-red-bold'>npm uninstall --save xxx</span></p>
                            <p>(3) 如需从 package.json文件中的json的中devDependencies删除依赖，执行: <span className='font-red-bold'>npm uninstall --save-dev xxx</span></p>
                            <h2>7、安装全局包</h2>
                            <p>执行：<span className='font-red-bold'>npm install -g jshint</span></p>
                            <h2>8、更新全局安装的包</h2>
                            <p>(1) 更新某个包，执行：<span className='font-red-bold'>npm update -g xxx</span></p>
                            <p>(2) 要找出需要更新的软件包，请输入：<span className='font-red-bold'>npm outdated -g --depth=0.</span></p>
                            <p>(3) 要更新所有全局软件包，请键入：<span className='font-red-bold'>npm update -g</span></p>
                            <h2>8、卸载全局安装的包</h2>
                            <p>(1) 执行：<span className='font-red-bold'>npm uninstall -g xxx</span></p>
                        </PageHeader>
                        <div id='content-4'>
                            <PageHeader
                                className="site-page-header"
                                onBack={() => null}
                                title="如何发布和更新程序包"
                                subTitle="Study hard"
                            >
                                <h2> 如何发布程序包</h2>
                                <p>要发布，您必须是npm注册表上的用户。如果您不是用户，请使用创建帐户<span className='font-red-bold'>npm adduser</span>。如果您在站点上创建了用户帐户，请使用<span className='font-red-bold'>npm login</span>从终端访问您的帐户。</p>
                                <p>然后执行，<span className='font-red-bold'>npm publish </span>发布</p>
                                <h2>如何更新套件</h2>
                                <p>执行：<span className='font-red-bold'>npm version xxx</span></p>
                                <p>此命令将更改中的版本号package.json。更新版本号后，npm publish再次运行。</p>
                            </PageHeader>
                        </div>
                        <div id='content-5'>
                            <PageHeader
                                className="site-page-header"
                                onBack={() => null}
                                title="如何用dist标签标记包装"
                                subTitle="Study hard"
                            >
                                <h2>添加标签</h2>
                                <p>要将标签添加到特定版本的软件包，请使用：<span className='font-red-bold'>{'npm dist-tag add <pkg>@<version> [<tag>]</span>'}</span></p>
                                <h2>使用标签发布</h2>
                                <p>默认情况下，npm publish将使用标签标记您的包裹latest。如果使用该--tag标志，则可以指定另一个要使用的标签。例如，以下将发布带有beta标签的软件包</p>
                                <p><span className='font-red-bold'>npm publish --tag beta</span></p>
                                <h2>使用标签安装</h2>
                                <p>与一样npm publish，默认情况下<span className='font-red-bold'>{'npm install <pkg>'}</span>会使用latest标记。要覆盖此行为，请使用<span className='font-red-bold'>{'npm install <pkg>@<tag>'}。</span></p>
                            </PageHeader>
                        </div>
                    </div>
                </Fragment>
                <Fragment key='right'>
                    <ul>
                        <li><a href='#content-1'>npm的安装</a></li>
                        <li><a href='#content-2'>如何安装本地包</a></li>
                        <li><a href='#content-3'>使用package.json</a></li>
                        <li><a href='#content-4'>如何发布和更新程序包</a></li>
                        <li><a href='#content-5'>如何用dist标签标记包装</a></li>
                        <li>
                            <button>点击一下</button>
                            <p style={{background: `${this.props.textReducer.background}`}}>{this.props.textReducer.value}</p>
                        </li>
                    </ul>
                </Fragment>
            </ContentPage>
        )
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(First as any)