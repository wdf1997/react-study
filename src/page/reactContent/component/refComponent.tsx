import React from 'react';
import Editor from '../../../component/Editor/index';
import { PageHeader } from 'antd';
import ForWordRef from './forwordRef'

// const ForWordRef = React.lazy(() => import('./forwordRef'))

const value1 = `
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));
  
  // 你可以直接获取 DOM button 的 ref：
  const ref = React.createRef();
  <FancyButton ref={ref}>Click me!</FancyButton>;`
const value2 = `
interface Prop {
    placeholder: string,
    forwardRef?: any,
    onRef?: any 
}
interface State {
    a: string
}
export default class ForwordRef extends React.Component<Prop, State> {
    constructor(props: Prop){
        super(props)
    }
    componentDidMount(){
        const { onRef } = this.props
        onRef && onRef(this)
    }
    state: State = {
        a: '我是a'
    }
    render() {
        let { forwardRef, placeholder } = this.props
        return (
            <input ref={forwardRef} placeholder={placeholder}/>
        )
    }
}

export default class RefComponent extends React.Component {
    constructor(props: any){
        super(props)
    }
    public onRef: any;  // 通过onRef可以获取到ForWordRef组件的所有方法和属性
    private inputRef = React.createRef<any>(); //要获取ForWordRef组件里面指定元素的ref只能这样子，不能用和onRef一样的方法
    handleClick = () => {
        alert(1)
        this.inputRef.current.focus()
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Click me!</button>
                <ForWordRef onRef={(ref: any) => this.onRef = ref}  forwardRef={this.inputRef} placeholder='请输入'/>   
            </div>    
        )
    }   
}  
`
const value3 = `
function logProps(Component) {
    class LogProps extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
      }
  
      render() {
        const {forwardedRef, ...rest} = this.props;
  
        // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
        return <Component ref={forwardedRef} {...rest} />;
      }
    }
  
    // 注意 React.forwardRef 回调的第二个参数 “ref”。
    // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
    // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
    return React.forwardRef((props, ref) => {
      return <LogProps {...props} forwardedRef={ref} />;
    });
}`
const FancyButton = React.forwardRef((props: any, ref: any) => (
    <button ref={ref} className="FancyButton" {...props}>
        {props.children}
    </button>
));
class FancyInput extends React.Component {
    focus = () => {
      console.log('打印', 'aa')
    }
    render() {
        return <input />
    }
}
function logProps(Component: any) {
    interface Prop {
        forwardedRef: any
    }
    class LogProps extends React.Component<Prop> {
        render() {
            let {forwardedRef, ...rest} = this.props
            return <Component ref={forwardedRef} {...rest}/>
        }
    }

    return React.forwardRef((props, ref) => {
        return <LogProps forwardedRef={ref} {...props}/>
    })
}
const A = logProps(FancyInput)

export default class RefComponent extends React.Component {
    public onRef: any;
    private inputRef = React.createRef<any>()
    //  = React.createRef<any>()
    componentDidMount() {
        console.log('打印onRef，', this.onRef)
        console.log('打印onRef，', this.inputRef)
    }
    handleClick = () => {
        // alert(1)
        this.inputRef.current.focus()
        this.onRef.handleAlert()
    }
    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Refs 转发"
                    subTitle="Study hard"
                >
                    <p>Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧</p>
                </PageHeader>
                <div id="content-14">
                    <PageHeader
                        className="site-page-header"
                        onBack={() => null}
                        title="转发 refs 到 DOM 组件"
                        subTitle="Study hard"
                    >
                        <p className='font-bold'>Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件。</p>
                        <FancyButton onClick={this.handleClick}>Click me!</FancyButton>
                        <Editor value={value1} />
                        <p className='font-red-bold'>注意：第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。</p>
                    </PageHeader>
                </div>
                <div id='content-15'>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => null}
                        title="在class组件中使用forwardRef"
                        subTitle="Study hard"
                    >
                        <button onClick={this.handleClick}>Click me!</button>
                        <ForWordRef onRef={(ref: any) => this.onRef = ref} forwardRef={this.inputRef} placeholder='请输入' />
                        <Editor value={value2} />
                    </PageHeader>
                </div>
                <div id='content-16'>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => null}
                        title="在高阶组件中转发 refs"
                        subTitle="Study hard"
                    >
                        <p className='font-bold'>refs 将不会透传下去。这是因为 ref 不是 prop 属性。就像 key 一样，其被 React 进行了特殊处理。如果你对 HOC 添加 ref，该 ref 将引用最外层的容器组件，而不是被包裹的组件。</p>
                        <p className='font-bold'>但是我们可以使用 React.forwardRef API 明确地将 refs 转发到内部的 组件。React.forwardRef 接受一个渲染函数，其接收 props 和 ref 参数并返回一个 React 节点。例如：</p>
                        <Editor value={value3} />
                    </PageHeader>
                </div>
            </div>
        )
    }
}