import React from 'react';

interface Prop {
    placeholder: string,
    forwardRef: any,
    onRef?: Function 
}
interface State {
    a: string
}
export default class ForwordRef extends React.Component<Prop, State> {
    state: State = {
        a: '我是a'
    }
    componentDidMount() {
        const { onRef } = this.props
        onRef && onRef(this)
        console.log('打印props：', this.props)
        console.log('打印a：', this.state.a)
    }
    componentDidUpdate(prevProps:any) {
        // 典型用法（不要忘记比较 props）：
        if (this.props.placeholder !== prevProps.placeholder) {
          console.log('打印prevProps：', prevProps.placeholder)
          console.log('打印this.props：', this.props.placeholder)
        }
      }
    handleAlert = () => {
        alert(2)
    }
    render() {
        let { forwardRef, placeholder } = this.props
        return (
            <input ref={forwardRef} placeholder={placeholder}/>
        )
    }
}

