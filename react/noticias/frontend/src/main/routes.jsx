import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import Post from '../components/post/post.jsx'

import DashBoard from '../dashboard/dashboard.jsx'

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <DashBoard />
                </Route>
                <Route path="/post">
                    <Post />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes