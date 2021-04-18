import React from 'react';
import Editor from '../../../component/Editor/index';
import ContentPage from '../../../component/content-page';
import { PageHeader, Button, Input } from 'antd';
import { render } from '@testing-library/react';

export default class HocComponent extends React.Component {
    render() {
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