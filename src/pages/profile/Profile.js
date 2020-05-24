import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createAuthProvider} from "../../Entity/AuthProvider";
import AuthPage from "./auth/AuthPage";
import profilePage from "./profile/profilePage";

export const {useAuth, authFetch, login, logout} = createAuthProvider();

export default function Profile() {
    return (
        <Router>
            <Switch>
                {!useAuth() && <Route path={'/profile'} component={AuthPage} />}
                <Route path={'/profile'} component={profilePage} />
            </Switch>
        </Router>
        );
}