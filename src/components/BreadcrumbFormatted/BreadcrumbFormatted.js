import React, {Component} from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

export default class BreadcrumbFormatted extends Component {
    constructor() {
        super();
    }

    render() {
        let path = window.location.pathname.substring(1).split("/");
        let locPath = '/';
        //ToDo: хлебные крошки сейчас выводят slug ссылки
        return (
            <>
                <Breadcrumb className={'mb-4'}>
                    <LinkContainer to={'/'} exact={true}>
                        <Breadcrumb.Item>Главная</Breadcrumb.Item>
                    </LinkContainer>
                    {
                        path.map((item, index) => {
                            locPath += item + '/';
                            return (
                                (index + 1) === path.length ?
                                    <Breadcrumb.Item key={index} active>{item}</Breadcrumb.Item> :
                                    <LinkContainer key={index} to={locPath} exact={true}>
                                        <Breadcrumb.Item>{item}</Breadcrumb.Item>
                                    </LinkContainer>
                            );
                        })
                    }
                </Breadcrumb>
            </>
        )
    }
}
