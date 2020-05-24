import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
    return <>
        <section className={'container p-0 pb-5'}>
            <Breadcrumb className={'mb-4'}>
                <LinkContainer to={'/'} exact={true}>
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Авторизация</Breadcrumb.Item>
            </Breadcrumb>
            <div className={'row mb-3 p-1'}>
                <Login />
                <Register/>
            </div>
        </section>
    </>;
}