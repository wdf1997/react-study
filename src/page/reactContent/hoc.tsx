import React, { Fragment, Suspense, Profiler } from 'react';
import Editor from '../../component/Editor/index';
import ContentPage from '../../component/content-page';
import { PageHeader } from 'antd';

const OtherComponent = React.lazy(() => import('./component/OtherComponent'));
const ContextComponent = React.lazy(() => import('./component/contextComponent'));
const RefComponent = React.lazy(() => import('./component/refComponent'))
const HocComponent = React.lazy(() => import('./component/hocComponent'))
const RenderComponent = React.lazy(() => import('./component/renderComponent'))

const value1 = `
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}`
const value2 = `
function ListItem({ item }) {
  return (
    <>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
    </>
  );
}`
const value3 = `
function CustomTextInput(props: any) {
    return (
      <>
        <input ref={props.inputRef} />
      </>
    );
}

// 不在ts中我们需要这样写
export default class HocContent extends React.Component {
  constructor(props){
    super(props)
    this.inputRef = React.createRef()
  }
  handleOnClick = () => {
    this.inputRef.current.focus()
  }
  render(){
    return(
      <>
        <button onClick={this.handleOnClick}>点击一下</button>
        <CustomTextInput inputRef={this.inputRef}/>
      </>
    )
}`
const value4 = `
function CustomTextInput(props: any) {
    return (
      <>
        <input ref={props.inputRef} />
      </>
    );
}

// 在TS中我们需要这样写
export default class HocContent extends React.Component {
  // 创建引用时，显式指定它的类型。
  private inputRef = React.createRef<HTMLInputElement>()
  constructor(props: any){
    super(props)
  }
  handleOnClick = () => {
    // 通过变量后添加 ! 操作符告诉 TypeScript 该变量此时非空。
    this.inputRef.current!.focus()
  }
  render(){
    return(
      <>
        <button onClick={this.handleOnClick}>点击一下</button>
        <CustomTextInput inputRef={this.inputRef}/>
      </>
    )
}`
const value5 = `
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}`
const value6 = `
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);`
const value7 = `
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;

// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";

// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));`

const value8 = `
class MyClass extends React.Component {
    // 或者可以定义在class内部
    // static contextType = MyContext;

    componentDidMount() {
      let value = this.context;
      /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
    }
    componentDidUpdate() {
      let value = this.context;
      /* ... */
    }
    componentWillUnmount() {
      let value = this.context;
      /* ... */
    }
    render() {
      let value = this.context;
      /* 基于 MyContext 组件的值进行渲染 */
    }
  }
  MyClass.contextType = MyContext;`
const value9 = `
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>`

function CustomTextInput(props: any) {
  return (
    <>
      <input ref={props.inputRef} />
    </>
  );
}
const value10 = `
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // 你同样可以将错误日志上报给服务器
      logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // 你可以自定义降级后的 UI 并渲染
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }`
const value11 = `
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>`
export default class HocContent extends React.Component {
  private inputRef = React.createRef<HTMLInputElement>()
  handleOnClick = () => {
    this.inputRef.current!.focus()
  }
  callback = (
    id: String, // 发生提交的 Profiler 树的 “id”
    phase: any, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration: any, // 本次更新 committed 花费的渲染时间
    baseDuration: any, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
    startTime: any, // 本次更新中 React 开始渲染的时间
    commitTime: any, // 本次更新中 React committed 的时间
    interactions: any // 属于本次更新的 interactions 的集合
  ) => {
    console.log('打印callback：', startTime)
  }
  render() {
    return (
      <ContentPage>
        <Fragment key='left'>
          <div id='content-1'>
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="语义化的 HTML"
              subTitle="Study hard"
            >
              <p>{'有时，语义化的 HTML 会被破坏。比如当在 JSX 中使用 <div> 元素来实现 React 代码功能的时候，又或是在使用列表（<ol>， <ul> 和 <dl>）和 HTML <table> 时。 在这种情况下，我们应该使用 React Fragments 来组合各个组件。'}</p>
              <p>举个例子：</p>
              <Editor value={value1} />
              <p>和其他的元素一样，你可以把一系列的对象映射到一个 fragment 的数组中。</p>
              <p>当你不需要在 fragment 标签中添加任何 prop 且你的工具支持的时候，你可以使用 短语法：</p>
              <Editor value={value2} />
            </PageHeader>
          </div>
          <div id='content-2'>
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="控制焦点"
              subTitle="Study hard"
            >
              <p>我们可以用 DOM 元素的 Refs 在 React 中设置焦点。</p>
              <button onClick={this.handleOnClick}>点击一下</button>
              <CustomTextInput inputRef={this.inputRef} />
              <Editor value={value3} />
              <Editor value={value4} />
              <p>{`在ts中，一个是提示我们的引用无法赋值到 <input> 的 ref 属性上，类型不兼容。引用需要与它真实所指代的元素类型相符，这正是 TypeScript 类型检查为我们添加的约束。这个约束的好处是，我们在使用引用的时候，就知道这个引用真实的元素类型，TypeScript 会自动提示可用的方法和属性，同时防止调用该元素身上没有的属性和方法。这里修正的方法很简单，如果 hover 或 F12 查看 React.createRef() 的方法签名，会发现它是个泛型方法，支持传递类型参数。`}</p>
              <p>第二个问题是即使在 componentDidMount 生命周期中使用，TypeScript 仍然提示 current 的值有可能为空。其实此时我们知道它不可能为空的。但因为 TypeScript 无法理解 componentDidMount，所以它不知道此时引用其实是可以安全使用的。解决办法当然是加上判空的逻辑。</p>
              <a href='https://www.cnblogs.com/Wayou/p/react_typescript_forwardref.html'>查看资料链接</a>
            </PageHeader>
          </div>
          <div id='content-3'>
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="React.lazy"
              subTitle="Study hard"
            >
              <p className='font-bold'>React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）</p>
              <b>使用之前:</b>
              <Editor value="import OtherComponent from './OtherComponent';" />
              <b>使用之后:</b>
              <Editor value="const OtherComponent = React.lazy(() => import('./OtherComponent'));" />
              <p>此代码将会在组件首次渲染时，自动导入包含 OtherComponent 组件的包。</p>
              <p className='font-bold'>React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。</p>
              <p>然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。</p>
              <div>
                <Suspense fallback={<div>Loading...</div>}>
                  <OtherComponent />
                </Suspense>
              </div>
              <Editor value={value5} />
              <p>fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense 组件包裹多个懒加载组件。</p>
            </PageHeader>
            <div id='content-4'>
              <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="基于路由的代码分割"
                subTitle="Study hard"
              >
                <p className='font-bold'>大多数网络用户习惯于页面之间能有个加载切换过程。你也可以选择重新渲染整个页面，这样您的用户就不必在渲染的同时再和页面上的其他元素进行交互。
                            这里是一个例子，展示如何在你的应用中使用 React.lazy 和 React Router 这类的第三方库，来配置基于路由的代码分割。</p>
                <Editor value={value6} />
              </PageHeader>
            </div>
            <div id='content-5'>
              <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="命名导出（Named Exports）"
                subTitle="Study hard"
              >
                <p className='font-bold'>React.lazy 目前只支持默认导出（default exports）。如果你想被引入的模块使用命名导出（named exports），你可以创建一个中间模块，来重新导出为默认模块。这能保证 tree shaking 不会出错，并且不必引入不需要的组件。</p>
                <Editor value={value7} />
              </PageHeader>
            </div>
          </div>
          <div id='content-6'>
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="Context"
              subTitle="Study hard"
            >
              <p className='font-bold'>Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。</p>
              <p>在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。</p>
              <ContextComponent />
              <a>返回项目查看源码，了解详情</a>
            </PageHeader>
            <div id='content-7'>
              <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="React.createContext"
                subTitle="Study hard"
              >
                <Editor value='const MyContext = React.createContext(defaultValue);' />
                <p>创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。</p>
                <p>只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。这有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。</p>
              </PageHeader>
            </div>
            <div id='content-8'>
              <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Context.Provider"
                subTitle="Study hard"
              >
                <Editor value='<MyContext.Provider value={/* 某个值 */}>' />
                <p>每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。</p>
                <p>Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据</p>
                <p>当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。</p>
              </PageHeader>
            </div>
            <div id='content-9'>
              <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Class.contextType"
                subTitle="Study hard"
              >
                <Editor value={value8} />
                <p>挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中</p>
              </PageHeader>
            </div>
            <div id='content-10'>
              <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Context.Consumer"
                subTitle="Study hard"
              >
                <Editor value={value9} />
                <p>这种方法需要一个函数作为子元素（function as a child）。这个函数接收当前的 context 值，并返回一个 React 节点。传递给函数的 value 值等等价于组件树上方离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。</p>
              </PageHeader>
            </div>
            <div id='content-11'>
              <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Context.displayName"
                subTitle="Study hard"
              >
                <p>context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。</p>
              </PageHeader>
            </div>
          </div>
          <div id='content-12'>
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="错误边界（Error Boundaries）"
              subTitle="Study hard"
            >
              <p>错误边界是一种 React 组件，这种组件<b>可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，</b>而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。</p>
              <p className='font-red-bold'>注意错误边界无法捕获以下场景中产生的错误：</p>
              <ul>
                <li><b>事件处理：</b>React 不需要错误边界来捕获事件处理器中的错误。与 render 方法和生命周期方法不同，事件处理器不会在渲染期间触发。因此，如果它们抛出异常，React 仍然能够知道需要在屏幕上显示什么。如果你需要在事件处理器内部捕获错误，使用普通的 JavaScript try / catch 语句。</li>
                <li><b>异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）</b></li>
                <li><b>服务端渲染</b></li>
                <li><b>它自身抛出来的错误（并非它的子组件）</b></li>
              </ul>
              <p>如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。</p>
              <Editor value={value10} />
              <p>然后你可以将它作为一个常规组件去使用：</p>
              <Editor value={value11} />
              <p className='font-red-bold'>错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，这也类似于 JavaScript 中 catch {} 的工作机制。</p>
            </PageHeader>
          </div>
          <div id="content-13">
            <Profiler id="RefComponent" onRender={this.callback}>
              <RefComponent />
            </Profiler>
          </div>
          <div id="content-17">
            <HocComponent history={this.props}/>
          </div>
          <div id="content-17">
            <RenderComponent />
          </div>
        </Fragment>
        <Fragment key='right'>
          <ul>
            <li><a href='#content-1'>语义化的 HTML</a></li>
            <li><a href='#content-2'>控制焦点</a></li>
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
}