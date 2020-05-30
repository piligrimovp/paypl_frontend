import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ErrorPath from "../../../components/Errors/ErrorPath/ErrorPath";
import {createAuthProvider} from "../../../Entity/AuthProvider";
import Sellers from "./sellers/Sellers";

export const {useAuth, authFetch, login, logout, getUser} = createAuthProvider();

export default function Profile() {
    return (
        <Router>
            <Switch>
                {getUser() && getUser().is_admin &&
                <>
                    <Route exact={true} path={'/admin/sellers'} component={Sellers} />
                </>
                }
                <Route path={'/'} component={ErrorPath}/>
            </Switch>
        </Router>
    );
}