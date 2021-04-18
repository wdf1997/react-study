import React from 'react';
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// 一个使用 ThemedButton 的中间组件
function Toolbar(props: any) {
    return (
      <ThemedButton onClick={props.changeTheme}>
        Change Theme
      </ThemedButton>
    );
  }

interface State {
  theme: any
}
export default class Text extends React.Component<any, State> {
    state: State = {
      theme: themes.yellow,
    };
    toggleTheme = () => {
        this.setState(state => ({
            theme:
            state.theme === themes.pink
                ? themes.yellow
                : themes.pink,
        }));
    };
    render() {
        // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
        // 而外部的组件使用默认的 theme 值
        return (
          <div>
            <ThemeContext.Provider value={this.state.theme}>
              <Toolbar changeTheme={this.toggleTheme} />
            </ThemeContext.Provider>
            <div>
              <ThemedButton />
            </div>
          </div>
        );
      }
}
