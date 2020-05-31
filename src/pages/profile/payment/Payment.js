import React from "react";
import {Switch} from "react-bootstrap";
import {Route} from "react-router-dom";
import ErrorPath from "../../../components/Errors/ErrorPath/ErrorPath";
import PaymentSuccess from "./success/PaymentSuccess";

export default function Payment() {
    return <>
        <Switch>
            <Route path={'/payment/success'} component={PaymentSuccess} />
            <Route path={'/payment/error'} component={PaymentSuccess} />
            <Route path={'/'} component={ErrorPath}/>
        </Switch>
    </>
}