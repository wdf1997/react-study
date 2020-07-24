import React, { Fragment } from 'react';
import Editor from '../../component/Editor/index';
import { PageHeader } from 'antd';
import ContentPage from '../../component/content-page';
import reactImg from '../../apis/img/react.webp';
import './index.less';

const value1 = `
  const element = (
    <h1 className="greeting">
      Hello, world!
    </h1>
  );

  const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
  );`
const value2 = `
  // 注意：这是简化过的结构
  const element = {
    type: 'h1',
    props: {
     className: 'greeting',
     children: 'Hello, world!'
    }
  };`
const value3 = `
  const element = <h1>Hello world!</h1>
  ReactDOM.render(element,document.getElementById('root'))
`
const value4 = `
  function sum(a, b) {
    return a + b;
  }`
const value5 = `
  function withdraw(account, amount) {
    account.total -= amount;
  }`
const value6 =`
  // Wrong
  this.setState({
    counter: this.state.counter + this.props.increment,
  });`
const value7 = `
  this.setState((state,props) => {
    return {counter: state.counter + props.increment}
  })`
const value8 = `
* 1.componentWillMount 
    发生在 render 函数之前，还没有挂载 Dom
* 2.render 
* 3.componentDidMount
    发生在 render 函数之后，已经挂载 Dom`
const value9 = `
* props
    * 1. componentWillReceiveProps(nextProps,nextState)
        这个生命周期主要为我们提供对 props 发生改变的监听，如果你需要在 props 发生改变后，相应改变组件的一些 state。
        在这个方法中改变 state 不会二次渲染，而是直接合并 state。
    * 2. shouldComponentUpdate(nextProps,nextState)
        这个生命周期需要返回一个 Boolean 类型的值，判断是否需要更新渲染组件，优化 react 应用的主要手段之一，
        当返回 false 就不会再向下执行生命周期了，在这个阶段不可以 setState()，会导致循环调用。
    * 3. componentWillUpdate(nextProps,nextState)
        这个生命周期主要是给我们一个时机能够处理一些在 Dom 发生更新之前的事情，如获得 Dom 更新前某些元素的坐标、
        大小等，在这个阶段不可以 setState()，会导致循环调用。
    **一直到这里 this.props 和 this.state 都还未发生更新**
    * 4. render
        执行 render 函数。
    * 5. componentDidUpdate(prevProps, prevState) 
        在此时已经完成渲染，Dom 已经发生变化，State 已经发生更新，prevProps、prevState 均为上一个状态的值。
* state（具体同上）
    * 1. shouldComponentUpdate
    * 2. componentWillUpdate
    * 3. render
    * 4. componentDidUpdate`
const value10 = `
* componentWillUnmount
    componentWillUnmount 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，
    例如，清除 timer，取消网络请求或清除在 componentDidMount  中创建的订阅等。
    componentWillUnmount 中不应调用 setState，因为该组件将永远不会重新渲染。
    组件实例卸载后，将永远不会再挂载它。
`
const value11 = `
constructor(props: any){
    super(props)
    this.state = {a: 1}
}
componentDidMount() {
    this.setState({a: this.state.a+1})
    this.setState({a: this.state.a+1})
    this.setState({a: this.state.a+1})
    console.log('打印a：', this.state.a)    //打印a: 1
}
render(){
    console('打印a：', this.state.a)     //打印a: 2
}`
interface State {
    a: number
}
export default class CoreConcept extends React.Component<any, State> {
    state: State = {
        a: 1
    }
    componentDidMount() {
        this.setState({a: this.state.a+1})
        this.setState({a: this.state.a+1})
        this.setState({a: this.state.a+1})
    }
    render() {
        return (
            <ContentPage>
                <Fragment key='left'>
                    <div id='content-1'>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="JSX 简介"
                            subTitle="Study hard"
                        >
                            <p>下面两种方法完全相等</p>
                            <Editor value={value1} />
                            <p>React.createElement() 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：</p>
                            <Editor value={value2} />
                        </PageHeader>
                    </div>
                    <div id='content-2'>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="元素渲染"
                            subTitle="Study hard"
                        >
                            <p>假设你的 HTML 文件某处有一个 div, 我们将其称为“根” DOM 节点，因为该节点内的所有内容都将由 React DOM 管理。</p>
                            <p>仅使用 React 构建的应用通常只有单一的根 DOM 节点。如果你在将 React 集成进一个已有应用，那么你可以在应用中包含任意多的独立根 DOM 节点。</p>
                            <Editor value={`<div id="root"></div>`} />
                            <p>想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()：</p>
                            <Editor value={value3} />
                        </PageHeader>
                    </div>
                    <div id='content-3'>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="组件 & Props"
                            subTitle="Study hard"
                        >
                            <p className='font-red-bold'>{`注意： 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签。例如，<div /> 代表 HTML 的 div 标签，而 <Welcome /> 则代表一个组件，并且需在作用域内使用 Welcome。`}</p>
                            <p>组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。来看下这个 sum 函数：</p>
                            <Editor value={value4} />
                            <p>这样的函数被称为“纯函数”，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。</p>
                            <p>相反，下面这个函数则不是纯函数，因为它更改了自己的入参：</p>
                            <Editor value={value5} />
                            <p className='font-red-bold'>注意：所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。</p>
                        </PageHeader>
                    </div>
                    <div id='content-4'>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="State"
                            subTitle="Study hard"
                        >
                            <p className='font-red-bold'>{`注意： 不要直接修改 State，直接修改不会重新渲染组件，而应该使用setState()来修改state的值`}</p>
                            <p>State 的更新可能是异步的</p>
                            <p>出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。</p>
                            <p>因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。</p>
                            <p>例如，此代码可能会无法更新计数器：</p>
                            <Editor value={value6} />
                            <p>要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：</p>
                            <Editor value={value7} />
                        </PageHeader>
                    </div>
                    <div id='content-5'>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="关于setState的同步和异步"
                            subTitle="Study hard"
                        >
                            <p >在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates
                            默认是false，也就表示setState会同步更新this.state，但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前
                            就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。</p>
                            <p className='font-red-bold'>1、setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。</p>
                            <p><b>合成事件：</b>react为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在jsx中常见的onClick、onChange这些都是合成事件。</p>
                            <p><b>原生事件：</b>原生事件是指非react合成事件，原生自带的事件监听 addEventListener ，或者也可以用原生js、jq直接 document.querySelector().onclick 这种绑定事件的形式都属于原生事件。</p>
                            <p className='font-bold'>2、setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，
                            <span className='font-red-bold'>只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，</span>当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。</p>
                            <p className='font-bold'>3、setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，<span className='font-red-bold'>在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次
                            的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。</span></p>
                            <Editor value={value11}/>
                        </PageHeader>
                    </div>
                    <div id='content-6'>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="生命周期"
                            subTitle="Study hard"
                        >
                            <p className="font-red-bold">React 旧版生命周期</p>
                            <img src={reactImg} width='900px' alt="react生命周期图"/>
                            <p>React 的生命周期图如上所示，主要可分为 初始化阶段、挂载阶段、更新阶段、卸载阶段。</p>
                            <p className='font-bold'>初始化阶段:</p>
                            <p>发生在 constructor 中的内容，在 constructor 中进行 state、props 的初始化，在这个阶段修改 state，不会执行更新阶段的生命周期，可以直接对 state 赋值。</p>
                            <p className='font-bold'>挂载阶段：</p>
                            <p>对应的生命周期为：</p>
                            <Editor value={value8}/>
                            <p className='font-bold'>更新阶段：更新阶段分为由 state 更新引起和 props 更新引起</p>
                            <Editor value={value9} />
                            <p className='font-bold'>卸载阶段：</p>
                            <p>对应的生命周期为：</p>
                            <Editor value={value10}/>
                            <p className="font-red-bold">React 新版生命周期</p>
                            <p>React 16 中删除了如下三个生命周期。</p>
                            <ul>
                                <li>componentWillMount</li>
                                <li>componentWillReceiveProps</li>
                                <li>componentWillUpdate</li>
                            </ul>
                            <p className="font-bold">取代这三个生命周期的是两个新生命周期</p>
                            <p className="font-red-bold">1、static getDerivedStateFromProps(nextProps,nextState)</p>
                            <ul>
                                <li>在 React 16.3.0 版本中：在组件实例化、接收到新的 props 时会被调用</li>
                                <li>在 React 16.4.0 版本中：在组件实例化、接收到新的 props 、组件状态更新时会被调用</li>
                            </ul>
                            <Editor value='该方法可以返回一个对象，将会和 state 发生合并，且不会触发 
                            render。
                        这个生命周期主要为我们提供了一个可以在组件实例化或 props、state 发生变化后根据 props 修改 
                        state 的一个时机，用来替代旧的生命周期中的 componentWillMount、ComponentWillReceiveProps。
                        因为是一个静态方法，this 指向不是组件实例。
                            '/>
                            <p className="font-red-bold">2、getSnapshotBeforeUpdate（prevProps,prevState）</p>
                            <ul>
                                <li>在 render 函数调用之后，实际的 Dom 渲染之前，在这个阶段我们可以拿到上一个状态 Dom 元素的坐标、大小的等相关信息。用于替代旧的生命周期中的 componentWillUpdate。
                                    该函数的返回值将会作为 componentDidUpdate 的第三个参数出现
                                </li>
                            </ul>
                        </PageHeader>
                    </div>
                </Fragment>
                <Fragment key='right'>
                    <ul>
                        <li><a href='#content-1'>JSX简介</a></li>
                        <li><a href='#content-2'>元素渲染</a></li>
                        <li><a href='#content-3'>组件 & Props</a></li>
                        <li><a href='#content-4'>State</a></li>
                        <li><a href='#content-5'>关于setState的同步和异步</a></li>
                        <li><a href='#content-6'>生命周期</a></li>
                    </ul>
                </Fragment>
            </ContentPage>
        )
    }
}