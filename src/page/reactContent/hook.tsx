import React, { Fragment, useState } from 'react';
import Editor from '../../component/Editor/index';
import { PageHeader } from 'antd';
import ContentPage from '../../component/content-page';
import './index.less';

const HookOverView = React.lazy(() => import('./hookComponent/hookOverView'))
const StateHook = React.lazy(() => import('./hookComponent/stateHook'))
const EffectHook = React.lazy(() => import('./hookComponent/effectHook'))

export default function hook() {
    return (
        <ContentPage>
            <Fragment key='left'>
                <HookOverView />
                <StateHook/>
                <EffectHook/>
            </Fragment>
            <Fragment key='right'>
                <ul>
                    <li><a href='#content-1'>Hook 使用规则</a></li>
                    <li><a href='#content-2'>使用State Hook</a></li>
                    <li>
                        <a href='#content-3'>React.lazy</a>
                        <ul>
                            <li><a href='#content-4'>基于路由的代码分割</a></li>
                            <li><a href='#content-5'>命名导出（Named Exports）</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href='#content-6'>Context</a>
                        <ul>
                            <li><a href='#content-7'>React.createContext</a></li>
                            <li><a href='#content-8'>Context.Provider</a></li>
                            <li><a href='#content-9'>Class.contextType</a></li>
                            <li><a href='#content-10'>Context.Consumer</a></li>
                            <li><a href='#content-11'>Context.displayName</a></li>
                        </ul>
                    </li>
                    <li><a href='#content-12'>错误边界</a></li>
                    <li>
                        <a href='#content-13'>Refs 转发</a>
                        <ul>
                            <li><a href='#content-14'>转发 refs 到 DOM 组件</a></li>
                            <li><a href='#content-15'>在class组件中使用forwardRef</a></li>
                            <li><a href='#content-16'>在高阶组件中转发 refs</a></li>
                        </ul>
                    </li>
                </ul>
            </Fragment>
        </ContentPage>
    )
}
