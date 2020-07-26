import React, { useState } from 'react';
import Editor from '../../../component/Editor/index';
import { PageHeader } from 'antd';

const value1 = `
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你点击了{count}下</p>
      <button onClick={() => setCount(count + 1)}>
        按钮
      </button>
    </div>
  );
}`
export default function StateHook() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <div id='content-2'>
                <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="使用State Hook"
                subTitle="Study hard"
                >
                    <p>Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。</p>
                    <div>
                        <button onClick={() => setCount(count+1)}>按钮</button>
                        <span>你点击了{count}下</span>
                        <Editor value={value1}/>
                    </div>
                </PageHeader>
          </div>
        </div>
    )
}