import React from 'react'
import {Router,Switch, Route} from 'react-router'
import LoginPage from "./LoginPage"
import App from "../App"
import {createBrowserHistory} from "history"
import './firebase'

export const history = createBrowserHistory()

const AppRouter = props => {
    return (
        <Router history={history}>
            <Switch>
                <Route component={LoginPage} path="/" exact/>
                <Route component={App} path="/game"/>
            </Switch>
        </Router>
    )
}

export default AppRouter