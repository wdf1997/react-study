import React from 'react';

export const themes = {
    yellow: {
        foreground: '#000000',
        background: 'yellow',
      },
    pink: {
        foreground: '#ffffff',
        background: 'pink'
    }
}

export const ThemeContext  = React.createContext(
    themes.pink
)