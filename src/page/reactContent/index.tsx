// import { Button } from 'antd';
// import React from 'react';
// import CoreConcept from './coreConcept';
// interface Props {
//     aa: number
// }
// interface State {
//     bb: number
// }

// export class ReactContent extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props)
//         console.log('constructor')
//     }
//     state: State = {
//         bb: 1
//     }
//     // componentWillMount() {
//     //     console.log('componentWillMount')
//     // }
//     private static getDerivedStateFromProps() {
//         console.log('getDerivedStateFromProps')
//     }
//     componentDidMount() {
//         console.log('componentDidMount')
//     }
//     // componentWillReceiveProps() {
//     //     console.log('componentWillReceiveProps')
//     // }

//     shouldComponentUpdate() {
//         console.log('shouldComponentUpdate')
//         return true
//     }
//     // componentWillUpdate() {
//     //     console.log('componentWillUpdate')
//     // }
//     getSnapshotBeforeUpdate() {
//         console.log('getSnapshotBeforeUpdate')
//         return {}
//     }
//     componentDidUpdate() {
//         console.log('componentDidUpdate')
//     }
//     componentWillUnmount() {
//         console.log('componentWillUnmount')
//     }
//     onClick = () => {
//         this.setState({
//             bb: 2
//         })
//     }
//     render() {
//         console.log('render')
//         return (
//             // <CoreConcept/>
//             <Button onClick={this.onClick}>child</Button>
//         )
//     }
// }

// export default class Content extends React.Component<Props, Props> {

//     state: Props = {
//         aa: 1
//     }
//     onClick = () => {
//         this.setState({
//             aa: 2
//         })
//     }
//     render() {
//         return (
//             // <CoreConcept/>
//             <>
//             <Button type='primary' onClick={this.onClick}>ContentParent</Button>
//             <ReactContent aa={this.state.aa}/>
//             </>
//         )
//     }
// }

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { PageHeader, Radio } from 'antd';
import classnames from 'classnames';
import { PlusCircleOutlined, ShareAltOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './hookComponent/hook.less';
import indexStyles from './index.less'
import Reveal from 'reveal.js';
import ReactGridLayout from './hookComponent/reactGridLayout'
import 'reveal.js/css/reveal.css';

const HookOverView: React.FC = () => {
  useEffect(() => {
    Reveal.initialize({
      hash: false,
      history: false,

      controls: true,
      controlsLayout: 'edges',
      controlsTutorial: false,
      progress: false,
      loop: true,

      width: '100%',
      height: '100%',
      margin: 0,
      minScale: 1,
      maxScale: 1,

      autoSlide: 2000,
      transition: 'slide',
      transitionSpeed: 'default',

      viewDistance: 100,
      autoSlideStoppable: true,

      dependencies: [
        {
          src: 'plugin/zoom-js/zoom.js',
          async: true
        }
      ]
    })
  }, [])

  const aa = [
    {
      name: '111',
      index: 1,
      value: 'hhh'
    },
    {
      name: '222',
      index: 2,
      value: 'hhh'
    },
    {
      name: '333',
      index: 3,
      value: 'hhh'
    },
    {
      name: '44',
      index: 4,
      value: 'hhh'
    },
  ]
  return (
    <div className={styles.revealContainer}>
      <div className="reveal">
          <div className="slides">
          {
              aa.map((item) => {
              return (
                  <section data-background="pink">
                  <h2>{item.name}</h2>
                  <p>{item.value}</p>
                  </section>
              )
              })
          }
          </div>
      </div>
      <div>
        <ReactGridLayout/>
      </div>
    </div>
  )
}

export default HookOverView