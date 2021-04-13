import React from 'react';
import Editor from '../../../component/Editor/index';
import CatImg from '../../../apis/img/cat.png';
import { PageHeader } from 'antd';

interface Props {
    mouse: any,
}
class Cat extends React.Component<Props> {
    render() {
      const mouse = this.props.mouse;
      return (
        <img src={CatImg} style={{ position: 'absolute', left: mouse.x, top: mouse.y }} alt='猫'/>
      );
    }
}
interface prop {
    children: any
}
interface State {
    x: Number,
    y: Number
}
class Mouse extends React.Component<prop, State> {
    state: State = {
        x: 0,
        y: 0
    }
    handleMouseMove = (e: any) => {
        this.setState({
            x: e.clientX- 200,
            y: e.clientY - 200
        })
    }
    render() {
        return(
            <div style={{ height: '50vh', background: '#fff', position: 'relative' }} onMouseMove={this.handleMouseMove}>
                <h1>移动鼠标!</h1>
                {this.props.children && this.props.children(this.state)}
            </div>
        )
    }
}
const value1 = `
interface Props {
    mouse: any,
}
class Cat extends React.Component<Props> {
    render() {
      const mouse = this.props.mouse;
      return (
        <img src={CatImg} style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
      );
    }
}

interface prop {
    // 当然这个render也可以是其他的名字，例如children
    render: any
}
class Mouse extends React.Component<prop> {
    state: State = {
        x: 0,
        y: 0
    }
    handleMouseMove = (e: any) => {
        this.setState({
            x: e.clientX- 200,
            y: e.clientY - 200
        })
    }
    render() {
        return(
            <div style={{ height: '50vh', background: '#fff', position: 'relative' }} onMouseMove={this.handleMouseMove}>
                <h1>移动鼠标!</h1>
                {this.props.render && this.props.render(this.state)}
            </div>
        )
    }
}
export default class RenderComponent extends React.Component {
    render() {
        return (
            <Mouse render={(mouse: {}) => {
                return <Cat mouse={mouse}/>
            }}/>
        )
    }
}`
const value2 = `
<Mouse children={mouse => (
   <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
)}/>
`
const value3 = `
<Mouse>
  {mouse => (
    <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
  )}
</Mouse>`

export default class RenderComponent extends React.Component {
    render() {
        return(
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Render Props"
                    subTitle="Study hard"
                >
                    <p>术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术</p>
                    <p>具有 render prop 的组件接受一个返回 React 元素的函数，并在组件内部通过调用此函数来实现自己的渲染逻辑。</p>
                    <Mouse children={(mouse: {}) => {
                        return <Cat mouse={mouse}/>
                    }}/>
                    <Editor value={value1}/>
                    <p>重要的是要记住，render prop 是因为模式才被称为 render prop ，你不一定要用名为 render 的 prop 来使用这种模式。事实上， 任何被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”.</p>
                    <p>尽管之前的例子使用了 render，我们也可以简单地使用 children prop！</p>
                    <Editor value={value2}/>
                    <p>记住，children prop 并不真正需要添加到 JSX 元素的 “attributes” 列表中。相反，你可以直接放置到元素的内部！也就是说，我们可以不用像render那样子要先声明他，而是可以直接写在组件里面作为他的子元素</p>
                    <Editor value={value3}/>
                    <p className='font-red-bold'>注意事项：</p>
                    <p className='font-bold'>将 Render Props 与 React.PureComponent 一起使用时要小心</p>
                    <p>如果你在 render 方法里创建函数，那么使用 render prop 会抵消使用 React.PureComponent 带来的优势。因为浅比较 props 的时候总会得到 false，并且在这种情况下每一个 render 对于 render prop 将会生成一个新的值。</p>
                </PageHeader>
            </div>
        )
    }
}
