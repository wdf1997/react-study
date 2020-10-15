import 'jquery';
import React from 'react';
import 'create-react-class';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { RMessage, RPanel, RButton, RModal, RFormItem } from '@components';
import { RImport } from '@BComponents';
import { post } from '@common/utils/http/http';
import './index.less';

// 节点背景色
const bgColorEnum = {
  childColor: '#38C394',
  horColor: '#13A7F9',
  verColor: '#9184F1'
};
let leftWidth = 0
let middleWidth = 0
let rightWidth = 0
export default class RFlowChart extends React.PureComponent {
  static propTypes = {
    /**
     * 流程图title
     */
    title: PropTypes.string,
    /**
     * 传入父组件的属性，该值只要写"this.props"即可
     */
    propsObj: PropTypes.object,
    /**
     * 描述节点的列表
     */
    flowList: PropTypes.object,
    /**
     * 描述节点的请求地址
     */
    flowAPI: PropTypes.string,
    /**
     * 查询描述节点请求时携带的参数
     */
    flowParams: PropTypes.object,
    /**
     * 外部传进来的参数，核对处理的时候会用到
     */
    propsParams: PropTypes.object
  };
  static defaultProps = {
    title: null,
    propsObj: null,
    flowList: {},
    flowAPI: null,
    flowParams: {},
    propsParams: {}
  }
  state = {
    flowArray: {} // 用来存储节点信息
  }
  componentDidMount() {
    this.getFlowList()
  }
  // 获取描述节点信息的列表
  getFlowList = () => {
    const { flowAPI, flowParams, flowList } = this.props
    if (Object.keys(flowList) > 0) {
      this.setState({
        flowArray: flowList
      })
    } else if (flowAPI) {
      flowAPI({ ...flowParams }).then((res) => {
        if (res.code === '0') {
          this.setState({
            flowArray: res.data
          })
        } else {
          this.setState({
            flowArray: {}
          })
        }
      })
    }
  }
  componentDidUpdate(preProps) {
    if (preProps.flowParams !== this.props.flowParams) {
      this.getFlowList()
    }
  }
  view = (data) => {
    let { propsObj } = this.props;
    const { forward } = propsObj;
    forward(data.url, {
      jumpParam: {
        closable: true,
        param: data.param
      }
    });
  }
  check = (data) => {
    // post(data.url, this.props.propsParams).then((res) => {
    //   if (res.returnCode === 0) {
    //     RMessage.success('核对成功')
    //   } else {
    //     RMessage.error(res.errorInfo)
    //   }
    // })
  }
  renderButton = (data) => {
    switch (data.type) {
      case 'view':
        return <a onClick={() => this.view(data)}>{data.text}</a>
      case 'import':
        return (
          <RImport
            title={data.text}
            btnStyle="a"
            importUrl={data.url}
          />)
      case 'check':
        return <a>{data.text}</a>
      default:
        return '';
    }
  }
  // 块的不同情况
  renderBlock = (a, type) => {
    console.log('打印，', type)
    if (type === 'right') {
      let width = document.documentElement.clientWidth - 200
      let totalWidth = rightWidth + leftWidth + middleWidth
      if (totalWidth > width - 270) {
        console.log('widthLL：：', rightWidth + leftWidth + middleWidth , width - 250)
        // eslint-disable-next-line no-param-reassign
        type = 'top'
      }
    }
    switch (type) {
      case 'ver':
      case 'hor':
        return (
          <div className={type === 'hor' ? 'block-inline' : null}>
            <div className={`block ${type === 'hor' ? 'block-hor' : 'block-ver'}`}>
              {a.text}
            </div>
            <p className="block-button">
              {a.button ? a.button.map(b => this.renderButton(b)) : ''}
            </p>
          </div>
        )
      case 'left':
      case 'right':
        return (
          <div className="block-inline">
            <div className={type === 'left' ? 'hidden' : 'block-inline img'}>
              <div className="img-left">{a.linkText}</div>
            </div>
            <div className="block-inline">
              <div className="block block-normal">
                {a.text}
              </div>
              <p className="block-button">
                {a.button ? a.button.map(b => this.renderButton(b)) : ''}
              </p>
            </div>
            <div className={type === 'left' ? 'block-inline img' : 'hidden'}>
              <div className="img-right">{a.linkText}</div>
            </div>
          </div>
        )
      case 'top':
        return (
          <div className="block-inline">
            <div className="block block-normal">
              {a.text}
            </div>
            <p className="block-button">
              {a.button ? a.button.map(b => this.renderButton(b)) : ''}
            </p>
            <div className="block-inline">
              <img src={require('./img/downArrow.png')} width="48px" height="76px" />
            </div>
          </div>
        )
      default:
        return ''
    }
  }
  // 循环的那个图
  renderCycle = (data, type) => (
    <div className={type === 'hor' ? 'block-inline' : ''}>
      <img src={require('./img/cycle.png')} alt="核对处理" width="60px" height="45px" />
      <p className="block-button">
        {data.button ? data.button.map(i => this.renderButton(i)) : ''}
      </p>
    </div>
  )
  // 通过判断type类型，来选择是返回普通块，还是有框框的块
  renderCore = (data, type) => {
    switch (data.type) {
      case 'horizontal-cycle':
        middleWidth += 388
        return (
          <div className="block-inline border-block border-block-hor">
            <div className="block-hor-content">
              {this.renderBlock(data.nodeList[0], 'hor')}
              {this.renderCycle(data, 'hor')}
              {this.renderBlock(data.nodeList[1], 'hor')}
            </div>
          </div>
        )
      case 'vertical-cycle':
        if (type === 'right') {
          rightWidth += 293
        } else {
          leftWidth += 293
        }
        return (
          <div className="block-inline">
            <div className={type === 'right' ? 'block-inline img img-ver' : 'hidden'}>
              <div className="img-left">{data.linkText}</div>
            </div>
            <div className="block-inline border-block border-block-ver">
              {this.renderBlock(data.nodeList[0], 'ver')}
              {this.renderCycle(data, 'ver')}
              {this.renderBlock(data.nodeList[1], 'ver')}
            </div>
            <div className={type === 'left' ? 'block-inline img img-ver' : 'hidden'}>
              <div className="img-right">{data.linkText}</div>
            </div>
          </div >
        )
      case 'block':
        if (type === 'right') {
          rightWidth += 236
        } else {
          leftWidth += 236
        }
        return this.renderBlock(data, type)
      default:
        return ''
    }
  }
  // 两边的内容
  renderChildren = (data, array, type) => {
    let text = data.map((a) => {
      if (a.children) {
        return this.renderChildren(a.children, [this.renderCore(a, type), array], type)
      }
      return [this.renderCore(a, type), array]
    })
    return type === 'left' ? text.reverse() : text;
  }
  renderAll = () => {
    const { flowArray } = this.state;
    if (Object.keys(flowArray).length) {
      return (
        <div>
          <div className="block-inline left-content">
            {flowArray.nodeList[0].children ? this.renderChildren(flowArray.nodeList[0].children, null, 'left') : ''}
          </div>
          <div className="block-inline middle-content">
            {this.renderCore(flowArray)}
          </div>
          <div className="block-inline right-content">
            {flowArray.nodeList[1].children ? this.renderChildren(flowArray.nodeList[1].children, null, 'right') : ''}
          </div>
        </div>
      )
    }
    return ''
  }
  render() {
    const { title } = this.props;
    if (document.getElementsByClassName('flow-chart-wrap').length) {
      let height = document.getElementsByClassName('flow-chart-wrap')[0].clientHeight
      document.getElementsByClassName('flow-chart-content')[0].style.height = `${height}px`
    }
    if (document.getElementsByClassName('left-content').length) {
      let width = document.getElementsByClassName('left-content')[0].clientWidth
      console.log('打印宽：', width)
    }
    return (
      <div className="flow-chart-wrap">
        <h3 className="flow-chart-title">
          <span style={{ marginRight: '20px' }}>稽核场景：{title.scene}</span>
          <span>稽核产品：{title.product}</span>
        </h3>
        <div className="flow-chart-content">
          {this.renderAll()}
        </div>
      </div>
    );
  }
}
