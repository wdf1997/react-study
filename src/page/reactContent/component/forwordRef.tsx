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

