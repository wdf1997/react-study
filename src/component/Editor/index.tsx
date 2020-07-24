import React from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-xcode";
import ReactAce from 'react-ace/lib/ace';
import './index.less'

interface Props {
    value: string,
    style?: object
}
export default class Editor extends React.Component<Props> {
    private aceRef = React.createRef<ReactAce>()
    componentDidMount() {
        // console.log('打印ref', this.aceRef)
    }
    render() {
        let { value, style } = this.props
        style = {width: '90%', fontSize: '14px', lineHeight: '20px', background: '#ededed', ...style}
        return (
            <AceEditor
                ref={this.aceRef}
                mode="javascript"
                theme="xcode"
                value={value}
                style={style}
                maxLines={Infinity}
                readOnly
            />
        )
    }
}