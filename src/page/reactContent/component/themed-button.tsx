import React from 'react';
import { ThemeContext } from './theme-context';

interface Prop {
    onClick?: () => void
}
export default class ThemedButton extends React.Component<Prop> {
    // 可以写在里面
    static contextType = ThemeContext;
    render() {
        let theme = this.context;
        let props = this.props;
        // console.log('打印，，', theme)
        return(
            <button
                {...props}
                style={{backgroundColor: theme.background}}
            >
                按钮
            </button>
        ) 
    }
}
// 也可以写在外面
// ThemedButton.contextType = ThemeContext