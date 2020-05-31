import React from "react";
import {Route, Switch} from "react-router-dom";
import ErrorPath from "../../../components/Errors/ErrorPath/ErrorPath";
import PaymentSuccess from "./success/PaymentSuccess";
import PaymentFail from "./fail/PaymentFail";

export default function Payment() {
    return <Switch>
            <Route path={'/payment/success'} component={PaymentSuccess} />
            <Route path={'/payment/fail'} component={PaymentFail} />
            <Route path={'/'} component={ErrorPath}/>
        </Switch>
}