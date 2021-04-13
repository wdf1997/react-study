import { Button } from 'antd';
import React from 'react';
import CoreConcept from './coreConcept';
interface Props {
    aa: number
}
interface State {
    bb: number
}

export class ReactContent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        console.log('constructor')
    }
    state: State = {
        bb: 1
    }
    // componentWillMount() {
    //     console.log('componentWillMount')
    // }
    private static getDerivedStateFromProps() {
        console.log('getDerivedStateFromProps')
    }
    componentDidMount() {
        console.log('componentDidMount')
    }
    // componentWillReceiveProps() {
    //     console.log('componentWillReceiveProps')
    // }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')
        return true
    }
    // componentWillUpdate() {
    //     console.log('componentWillUpdate')
    // }
    getSnapshotBeforeUpdate() {
        console.log('getSnapshotBeforeUpdate')
        return {}
    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    onClick = () => {
        this.setState({
            bb: 2
        })
    }
    render() {
        console.log('render')
        return (
            // <CoreConcept/>
            <Button onClick={this.onClick}>child</Button>
        )
    }
}

export default class Content extends React.Component<Props, Props> {

    state: Props = {
        aa: 1
    }
    onClick = () => {
        this.setState({
            aa: 2
        })
    }
    render() {
        return (
            // <CoreConcept/>
            <>
            <Button type='primary' onClick={this.onClick}>ContentParent</Button>
            <ReactContent aa={this.state.aa}/>
            </>
        )
    }
}