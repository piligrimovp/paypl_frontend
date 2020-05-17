import React, {Component} from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {LinkContainer} from "react-router-bootstrap";

export default class BreadcrumbFormatted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: [],
            loading: false,
            path: window.location.pathname
        };
    }

    componentDidMount() {
        if (this.state.path.length > 1) {
            this.setState({loading: true});
            fetch(window.HOST + this.state.path, {method: "get"})
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        loading: false,
                        uri: data,
                    })
                })
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (window.location.pathname !== this.state.path) || (this.state.uri !== nextState.uri);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (window.location.pathname !== this.state.path &&
            !this.state.loading && window.location.pathname.length > 1) {
            this.setState({loading: true});
            this.setState({path: window.location.pathname})
            fetch(window.HOST + window.location.pathname, {method: "get"})
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        loading: false,
                        uri: data
                    })
                })
        }
    }

    render() {
        return (
            <>
                <Breadcrumb className={'mb-4'}>
                    <LinkContainer to={'/'} exact={true}>
                        <Breadcrumb.Item>Главная</Breadcrumb.Item>
                    </LinkContainer>
                    {
                        !this.state.loading &&
                        this.state.uri.map((item, index) => {
                            return (
                                (index + 1) === this.state.uri.length ?
                                    <Breadcrumb.Item key={index} active>{item.name}</Breadcrumb.Item> :
                                    <LinkContainer key={index} to={item.link} exact={true}>
                                        <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
                                    </LinkContainer>
                            );
                        })
                    }
                </Breadcrumb>
            </>
        )
    }
}
