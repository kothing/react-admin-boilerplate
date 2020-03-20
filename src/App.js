import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AsyncLoadable from '@/utils/AsyncLoadable';
import 'animate.css';
import './style/base.scss';
import './style/App.scss';

// 公共模块
const DefaultLayout = AsyncLoadable(() => import(/* webpackChunkName: 'default' */ './containers'))

// 基础页面
const View404 = AsyncLoadable(() => import(/* webpackChunkName: '404' */ './views/Others/404'))
const View500 = AsyncLoadable(() => import(/* webpackChunkName: '500' */ './views/Others/500'))
const Login = AsyncLoadable(() => import(/* webpackChunkName: 'login' */ './views/Login'))

const App = () => (
    <Router>
        <Switch>
            <Route path='/' exact render={() => <Redirect to='/index' />} />
            <Route path='/500' component={View500} />
            <Route path='/login' component={Login} />
            <Route path='/404' component={View404} />
            <Route component={DefaultLayout} />
        </Switch>
    </Router>
)

export default App
