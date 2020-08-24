import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
const router = [
    {
        path: "/",
        component: lazy(() => import('../page/reactContent')),
        exact: true
    },
    {
        path: "/react",
        component: lazy(() => import('../page/reactContent')),
        exact: true
    },
    {
        path: "/react/coreConcept",
        component: lazy(() => import('../page/reactContent')),
        exact: true
    },
    {
        path: "/react/hoc",
        component: lazy(() => import('../page/reactContent/hoc')),
        exact: false
    },
    {
        path: "/react/hook",
        component: lazy(() => import('../page/reactContent/hook')),
        exact: false
    },
    {
        path: "/webpack",
        component: lazy(() => import('../page/webpackContent')),
        exact: false
    },
    {
        path: "/npm",
        component: lazy(() => import('../page/npmContent')),
        exact: true
    },
    {
        path: "/npm/first",
        component: lazy(() => import('../page/npmContent/first')),
        exact: false
    },
    {
        path: "/npm/command",
        component: lazy(() => import('../page/npmContent/command')),
        exact: false
    },
    {
        path: "/less",
        component: lazy(() => import('../page/lessContent')),
        exact: true
    },
    {
        path: "/less/Variables",
        component: lazy(() => import('../page/lessContent/Variables')),
        exact: false
    },
    {
        path: "/less/Mixins",
        component: lazy(() => import('../page/lessContent/Mixins')),
        exact: false
    }
]
export default class MenuRoute extends React.Component {
    render() {
        return (
            <>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        {router.map(item => <Route path={item.path} key={item.path} exact={item.exact} component={item.component} />)}
                    </Switch>
                </Suspense>
            </>
        )
    }
}