import React, { useState, useEffect } from 'react';
import Editor from '../../../component/Editor/index';
import { PageHeader } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'
function Child(props: any) {
  return(
    <div>{props.text}</div>
  )
}
export default function EffectHook() {
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(count+1)
        console.log('清除了')
    }
    const match = useRouteMatch()
    useEffect(() => {
        handleClick()
        return handleClick()
    }, []);
    console.log('match:', match)
    return (
        <div>
            <div>
              <h1>基础路由</h1>
              <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`${match.path}/about`}>About</Link>
            </li>
            <li>
              <Link to={`${match.path}/users`}>Users</Link>
            </li>
            <li>
              <Link to={`${match.path}/aa`}>aa</Link>
            </li>
          </ul>
        {/* A <Switch> 会遍历所有包含的 <Route>s 并渲染匹配的第一条 */}
        <Switch>
          <Redirect from={`${match.path}/aa`} to={`${match.path}/about`}/>
          <Route path={`${match.path}/about`}>
            <div>我是/about</div>
            <div>销售日期后<input/>天后自动关闭</div>
          </Route>
          <Route path={`${match.path}/users`}>
          <div>我是/users</div>
          </Route>
        </Switch>
            </div>
        </div>
    )
}