import React from 'react';
import Editor from '../../../component/Editor/index';
import ContentPage from '../../../component/content-page';
import { PageHeader, Button, Input } from 'antd';
import { render } from '@testing-library/react';

interface Props {
    history: any
}

export default class HocComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }
    render() {
        console.log('我是高阶组件，我只想看看没有在路由中，能不能获取当前路由：', this.props)
        return(
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="高阶组件"
                    subTitle="Study hard"
                >
                    <p>高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。</p>
                    <p className='font-red-bold'>具体而言，高阶组件是参数为组件，返回值为新组件的函数。</p>
                </PageHeader>
            </div>
        )
    }
}