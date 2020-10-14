import React from 'react';
import Command from './command';
import flowChartJD from './aaa'
export default class ReactContent extends React.Component {
    renderButton = (data: any) => {
        switch (data.type) {
            case 'view':
                return <a>查看</a>
            case 'import':
                return <a>导入</a>
            case 'check':
                return <a>核对处理</a>
        }
    }
    renderChildren = (data: any) => {
        let content;
        if (data.type === 'horizontal-block') {
            let text = data.nodeList.map((a: any, i: any) => {
                if (a.type === 'block') {
                    return (
                        <div style={{ display: 'inline-block' }}>
                            <div style={{ background: 'pink' }}>
                                {a.text}
                            </div>
                            <p>
                                {a.button.map((b: any) => this.renderButton(b))}
                            </p>
                        </div>
                    )
                } else if (a.type === 'cycle') {
                    return (
                        <div style={{ display: 'inline-block' }}>
                            <img src={require('./img/cycle.jpg')} width="56px" height="48px" />
                            <p>
                                {a.button.map((b: any) => this.renderButton(b))}
                            </p>
                        </div>
                    )
                }
            })
            content = (
                <div style={{ border: '1px dotted #c9c7c7', display: 'inline-block' }}>
                    {text}
                </div>
            )
        } else {
            let text = data.nodeList.map((a: any, i: any) => {
                if (a.type === 'block') {
                    return (
                        <div>
                            <div style={{ background: 'pink' }}>
                                {a.text}
                            </div>
                            <p>
                                {a.button.map((b: any) => this.renderButton(b))}
                            </p>
                        </div>
                    )
                } else if (a.type === 'cycle') {
                    return (
                        <div>
                            <img src={require('./img/cycle.jpg')} width="56px" height="48px" />
                            <p>
                                {a.button.map((b: any) => this.renderButton(b))}
                            </p>
                        </div>
                    )
                }
            })
            let top = data.children.map((a: any) => {
                if (a.type === 'block') {
                    return (
                        <div>
                            <div style={{ background: 'pink' }}>
                                {a.text}
                            </div>
                            <p>
                                {a.button.map((b: any) => this.renderButton(b))}
                            </p>
                            <img src={require('./img/downArrow.jpg')} width="48px" height="76px" />
                        </div>
                    )
                } else if (a.type === 'cycle') {
                    return (
                        <div>
                            <img src={require('./img/cycle.jpg')} width="56px" height="48px" />
                            <p>
                                {a.button.map((b: any) => this.renderButton(b))}
                            </p>
                        </div>
                    )
                }
            })
            content = (
                <div>
                    {top}
                    <div style={{ border: '1px dotted #c9c7c7', display: 'inline-block' }}>
                        {text}
                    </div>
                </div>
            )
        }
        return content;
    }
    renderLeftChildren = (data: any) => {
        if (data.children) {
            let text = data.children.map((a: any) => {
                return (
                    <div style={{ display: 'inline-block' }}>
                        <div style={{ display: 'inline-block' }}>
                            <div style={{ background: 'pink' }}>
                                {a.text}
                            </div>
                            <p>
                                {a.button.map((b: any) => this.renderButton(b))}
                            </p>
                        </div>
                        <div style={{ display: 'inline-block' }}>
                            <img src={require('./img/rightArrow.jpg')} />
                        </div>
                    </div>
                )
            })
            return text;
        }
    }
    renderRightChildren = (data: any) => {
        let content;
        if (data.children) {
            let text = data.children.map((a: any) => {
                if (a.children) {
                    let rightCore = a.children.map((b: any) => this.renderChildren(b))
                    return rightCore
                }

            })
        }
    }
    renderTopChildren = (data: any) => {

    }
    renderAll = () => {
        const flowData = flowChartJD.data
        return (
            <div>
                {this.renderLeftChildren(flowData.nodeList[0])}
                {this.renderChildren(flowData)}
                {this.renderRightChildren(flowData.nodeList[2])}
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.renderAll()}
            </div>
        )
    }
} 