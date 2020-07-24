import React, { createContext } from 'react';
import './App.css';
// 1. 使用 createContext 创建上下文
const ToggleContext  = createContext({
  toggle: true,
  handleToggle: () => {}
})
// 2. 创建 Provider
class ToggleProvider  extends React.Component {
  handleToggle = () => {
    this.setState({ toggle: !this.state.toggle })
  }
  // 2-1. 重写 state 
  state = {
    toggle: true,
    handleToggle: this.handleToggle
  }
  render(){
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}

export default ToggleProvider;
// 3. 创建 Consumer: 直接导出 Context.Consumer 给外部使用即可
export const ToggleConsumer = ToggleContext.Consumer
