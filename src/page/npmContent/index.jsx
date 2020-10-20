import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import * as actions from "../../store/actions";
import './index.less';
const mapStateToProps = (state) => ({
  textReducer: state.textReducer
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo())
});
class Easy extends React.Component {
  onChangeGreen = () => {
    this.props.actions.textAction({ background: 'green' })
  }
  onChangeYellow = () => {
    this.props.actions.textAction({ background: 'yellow' })
  }
  onUndo = () => {
    this.props.onUndo()
  }
  onRedo = () => {
    this.props.onRedo()
  }
  render() {
    const { background, value } = this.props.textReducer.present
    return (
      <ul>
        <li>
          <button onClick={this.onChangeGreen}>点击测试变成绿色</button>
          <p style={{ background: `${background}` }}>{value}</p>
        </li>
        <li>
          <button onClick={this.onChangeYellow}>点击测试变成黄色</button>
          <p style={{ background: `${background}` }}>{value}</p>
        </li>
        <li>
          <button onClick={this.onUndo}>撤回</button>
          <button onClick={this.onRedo}>重做</button>
        </li>
      </ul>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Easy);