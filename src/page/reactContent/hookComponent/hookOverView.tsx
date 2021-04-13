import React, { useState, useMemo, useCallback } from 'react';
import Editor from '../../../component/Editor/index';
import { PageHeader, Radio } from 'antd';
import { PlusCircleOutlined, ShareAltOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import treeList from './mock.ts';
import './hook.less';

const HookOverView: React.FC = () => {

  const linkChildren = useCallback((operate, children) => {
    return (
      <div className='container'>
        <div className='linkRadio'>
          <Radio.Group size="small" value={operate}>
            <Radio.Button value="and">And</Radio.Button>
            <Radio.Button value="or">Or</Radio.Button>
          </Radio.Group>
          <PlusCircleOutlined className='addRadio'/>
        </div>
        <div className='linkContent'>
          {children}
        </div>
      </div>
    )
  }, [])

  const nodeItem = useCallback((item) => {
    const { operate, leftValue, rightValue } = item
    return (
      <div className="nodeContainer">
        <div className='nodeContent'>{leftValue} {operate} {rightValue}</div>
        <ShareAltOutlined />
        <FormOutlined style={{ margin: '0 5px' }}/>
        <DeleteOutlined />
      </div>
    )
  }, [])

  const loop = (type: string, item: any) => {
    if (type === 'link') {
      const { children, operate } = item
      const content = children.map((v: any) => loop(v.type, v))
      return linkChildren(operate, content)
    } else if (type === 'node') {
      console.log('nodeItem:', nodeItem(item))
      return nodeItem(item)
    } else {
      return
    }
  }
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
          <div>
            <h1>对于节点连接线的测试</h1>
            <div>
              {loop(treeList.type, treeList)}
            </div>
          </div>
        </div>
    )
}

export default HookOverView