import React, { useState, useEffect } from 'react';
import Editor from '../../../component/Editor/index';
import { PageHeader } from 'antd';

const value1 = `
import React, { useState, useEffect } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count+1)
  }, []);
  return (
    <div>
      <p>你点击了{count}下</p>
      <button onClick={() => setCount(count + 1)}>
        按钮
      </button>
    </div>
  );
}`

const value2 = `
function Child(props: any) {
  return(
    <div>{props.text}</div>
  )
}`
function Child(props: any) {
  return(
    <div>{props.text}</div>
  )
}
export default function EffectHook() {
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(count+1)
        console.log('清除了')
    }
    useEffect(() => {
        handleClick()
        return handleClick()
    }, []);
    return (
        <div>
            <div id='content-3'>
                <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="使用Effect Hook"
                subTitle="Study hard"
                >
                    <p>Effect Hook 可以让你在函数组件中执行副作用操作</p>
                    <div>
                        <button onClick={() => setCount(count+1)}>按钮</button>
                        <span>你点击了{count}下</span>
                        <Editor value={value1}/>
                    </div>
                    <p className="font-bold">提示：如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。</p>
                    <p className="font-bold">无需清除的 effect：</p>
                    <p>有时候，我们只想在 React 更新 DOM 之后运行一些额外的代码。比如发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作。因为我们在执行完这些操作之后，就可以忽略他们了。让我们对比一下使用 class 和 Hook 都是怎么实现这些副作用的。</p>
                    <Child text='我是div内容'/>
                    <Editor value={value2}/>
                </PageHeader>
          </div>
        </div>
    )
}