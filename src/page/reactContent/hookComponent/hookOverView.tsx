import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Editor from '../../../component/Editor/index';
import { Button, PageHeader, Radio, Select } from 'antd';
import classnames from 'classnames';
import { PlusCircleOutlined, ShareAltOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import EditorContainer from './editor'
import treeList from './mock.ts';
import styles from './hook.less';

const HookOverView: React.FC = () => {

  const linkChildren = useCallback((operate, children) => {
    const cls = classnames({
      [styles.filterItem]: true,
      [styles.container]: true
    })
    return (
      <div className={cls}>
        <div className={styles.linkRadio}>
          <Radio.Group size="small" value={operate}>
            <Radio.Button value="and">And</Radio.Button>
            <Radio.Button value="or">Or</Radio.Button>
          </Radio.Group>
          <PlusCircleOutlined className={styles.addRadio}/>
        </div>
        <div className={styles.linkContent}>
          {children}
        </div>
      </div>
    )
  }, [])

  const nodeItem = useCallback((item) => {
    const { operate, leftValue, rightValue } = item
    const cls = classnames({
      [styles.filterItem]: true
    })
    return (
      <div className={cls}>
        <div className={styles.nodeContent}>{leftValue} {operate} {rightValue}</div>
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

  const onClick = useCallback(() => {
    window.history.replaceState(null, '', '/a')
  }, [])

  return (
      <div>
        <div id='content-1'>
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title=" Hook 使用规则"
            subTitle="Study hard"
          >
            <p className={styles.hooktest}>1、只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。</p>
            <p>2、只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）</p>
          </PageHeader>
        </div>
        <div>
          <h1>对于节点连接线的测试</h1>
          <div className={styles.filterTree}>
            {loop(treeList.type, treeList)}
          </div>
        </div>
        <div>
          <div className={styles.flexContainer}>
            <div>111</div>
            <div>222</div>
            <div>333</div>
            <div>444</div>
            <div>555</div>
            <div>666</div>
            <div>777</div>
          </div>
          <div className={styles.divContainer}>
            <div>
              <div className={styles.item}>111</div>
              <div className={styles.item}>222</div>
            </div>
            <div>
              <div className={styles.item}>111</div>
              <div>
                <div className={styles.item}>111</div>
                <div>
                  <div className={styles.item}>111</div>
                  <div className={styles.item}>222</div>
                </div>
                <div className={styles.item}>222</div>
              </div>
            </div>
            <div>
              <div className={styles.item}>111</div>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div className={styles.revealContainer}>
          <Button onClick={onClick}>点击一下history变化了</Button>
          <EditorContainer/>
        </div>
      </div>
  )
}

export default HookOverView