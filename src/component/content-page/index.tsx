import React from 'react';
import './index.less'

export default class ContentPage extends React.Component {
    componentDidMount() {
        this.setStyle()
    }
    setStyle = () => {
        const height = document.documentElement.clientHeight;
        const homeContent: any = document.querySelector('.left-content');
        homeContent.style.height = `${height - 100}px`;
    }
    getChildren = () => {
        let { children } = this.props;
        console.log(children)
        if (!(children instanceof Array)) {
            children = [children];
        }
        return Array.isArray(children) && children.reduce((acc: any, current: any) => {
            if (current) {
                acc[`${current.key}Child`] = current.props.children;
            }
            return acc;
        }, {});
    }
    render() {
        const {leftChild, rightChild} = this.getChildren()
        return (
            <div className="content-page">
                <div className="left-content">
                    {leftChild}
                </div>
                <div className="right-content">
                    {rightChild}
                </div>
            </div>
        )
    }
}