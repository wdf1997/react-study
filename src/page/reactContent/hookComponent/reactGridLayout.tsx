import React from 'react'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import styles from './hook.less'

const ReactGridLayout: React.FC = () => {

  const layout = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2},
    {i: 'b', x: 1, y: 0, w: 3, h: 2},
    {i: 'c', x: 4, y: 0, w: 1, h: 2}
  ]

  return (
    <div className={styles.reactGridLayout}>
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="a" className={'gridItem'}>a</div>
        <div key="b" className={'gridItem'}>b</div>
        <div key="c" className={'gridItem'}>
          <div>c</div>
        </div>
      </GridLayout>
    </div>
  )
}

export default ReactGridLayout