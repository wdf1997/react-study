import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { PageHeader } from 'antd';
import Editor from '../../component/Editor/index';
import ContentPage from '../../component/content-page';
import { initState } from '../../store/textReducer';
import * as actions from "../../store/actions";
import './index.less';
interface Props {
  textReducer: initState,
  actions: actions.Action
}
const mapStateToProps = (state: {textReducer: initState}) => ({
  textReducer: state.textReducer
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});
const value1 = `
#colors() {
    primary: blue;
    secondary: green;
  }
  
  .button {
    color: #colors[primary];
    border: 1px solid #colors[secondary];
  }`
const value2 = `
  #header a {
    color: orange;
    #bundle.button();  // 还可以书写为 #bundle > .button 形式
  }`
const value3 = `
  #library() {
    .colors() {
      primary: green;
      secondary: blue;
    }
  }
  #library() {
    .colors() { primary: grey; }
  } 
  .button {
    color: #library.colors[primary];
    border-color: #library.colors[secondary];
  }
  // 这里也可以用mixins写
  .button {
    @colors: #library.colors();
    color: @colors[primary];
    border-color: @colors[secondary];
  }

// 输出: 
  .button {
    color: grey;
    border-color: blue;
  }`
const value4 = `
  @config: {
    @options: {
      library-on: true
    }
  }
  & when (@config[@options][library-on] = true) {
    .produce-ruleset {
      prop: val;
    }
  }`
const value5 = `
  .foods() {
    @dessert: ice cream;
  } 
  @key-to-lookup: dessert;
  
  .lunch {
    treat: .foods[@@key-to-lookup];
  }

//  这将输出： 
  .lunch {
    treat: ice cream;
  }`

class Easy extends React.Component<Props> {
  onChangeGreen = () => {
    // window.location.href = 'Mixins'
    this.props.actions.textAction({background: 'green'})
  }
  onChangeYellow = () => {
    this.props.actions.textAction({background: 'yellow'})
  }
  render() {
    console.log('打印href：', window.location.href)
    console.log('打印props：', this.props)
    return (
      <ContentPage>
        <Fragment key='left'>
          <div id="install">
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="命名空间和访问符"
              subTitle="Study hard"
            >
              <p>从 Less 3.5 版本开始，你还可以将混合（mixins）和规则集（rulesets）作为一组值的映射（map）使用。</p>
              <p>通过将命名空间与查找[]语法结合使用，我们可以将rulesets ，mixins写成maps。</p>
              <Editor value={value1} />
              <p>现在，如果我们希望把 .button 类混合到 #header a 中，我们可以这样做：</p>
              <Editor value={value2} />
              <p>注意：如果不希望它们出现在输出的 CSS 中，例如 #bundle .tab，请将 () 附加到命名空间（例如 #bundle()）后面。</p>
              <p>由于命名空间和重载mixin的能力，mixin作为映射更通用一些</p>
              <Editor value={value3} />
              <p>注意，如果一个查找值产生另一个规则集，您可以追加第二个[]查找，如下所示:</p>
              <Editor value={value4} />
              <h1 className='font-bold'>在查询中使用变量变量</h1>
              <p>需要注意的重要一件事是，其中的值[@lookup]是键（变量）名称@lookup，而不是被评估为变量。如果希望键名本身是可变的，则可以使用@@variable语法。</p>
              <Editor value={value5} />
            </PageHeader>
          </div>
        </Fragment>
        <Fragment key='right'>
          <ul>
            <li><a href='#install'>命名空间和访问符</a></li>
            <li>
              <button onClick={this.onChangeGreen}>点击测试变成绿色</button>
              <p style={{background: `${this.props.textReducer.background}`}}>{this.props.textReducer.value}</p>
            </li>
            <li>
              <button onClick={this.onChangeYellow}>点击测试变成黄色</button>
              <p style={{background: `${this.props.textReducer.background}`}}>{this.props.textReducer.value}</p>
            </li>
          </ul>
        </Fragment>
      </ContentPage>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Easy as any);