import React from 'react';
import Editor from '../../../component/Editor/index';
import { PageHeader } from 'antd';

export default function HookOverView() {
    return (
        <div>
          <div id='content-1'>
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title=" Hook 使用规则"
              subTitle="Study hard"
            >
              <p>1、只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。</p>
              <p>2、只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）</p>
            </PageHeader>
          </div>
        </div>
    )
}