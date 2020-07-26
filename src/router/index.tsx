import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
const ReactContent = lazy(() => import('../page/reactContent'));
const HocContent = lazy(() => import('../page/reactContent/hoc'));
const HookContent = lazy(() => import('../page/reactContent/hook'));
const WebpackContent = lazy(() => import('../page/webpackContent'));

export default class MenuRoute extends React.Component {
    render() {
        return (
            <>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/" exact component={ReactContent} />
                        <Route path='/react' exact component={ReactContent} />
                        <Route path='/react/coreConcept' exact component={ReactContent} />
                        <Route path='/react/hoc' component={HocContent} />
                        <Route path='/react/hook' component={HookContent} />
                        <Route path='/webpack' component={WebpackContent} />
                    </Switch>
                </Suspense>
            </>
        )
    }
}