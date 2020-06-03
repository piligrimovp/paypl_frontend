import React from "react";
import {createAuthProvider} from "../../../Entity/AuthProvider";
import PropTypes from "prop-types";
import {Button, ButtonToolbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import Alerts from "../../../components/Alerts/Alerts";

export const {authFetch, getUser} = createAuthProvider();

export default class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            product: props.product
        }
    }

    addCart = () => {
        authFetch(window.HOST + "/orders/store", {
            method: "POST",
            body: JSON.stringify({slug: this.state.product.slug})
        }).then(respone => respone.json())
            .then(data => {
                if (data.status === 'success') {
                    this.setState({
                        product: {
                            ...this.state.product,
                            in_order: true
                        },
                        alerts: [
                            ...this.state.alerts,
                            {
                                close: true,
                                status: 'success',
                                text: 'Товар добавлен в корзину'
                            }
                        ]
                    });
                }
                if (data.status === 'error') {
                    this.setState({
                        alerts: [
                            ...this.state.alerts,
                            {
                                close: true,
                                status: 'error',
                                text: 'Ошибка добавления'
                            }
                        ]
                    })
                }
            }).catch(error => {
            this.setState({
                alerts: [
                    ...this.state.alerts,
                    {
                        close: true,
                        status: 'error',
                        text: 'Ошибка добавления'
                    }
                ]
            })
        })
    }


    closeAlert(index, alerts) {
        alerts.splice(index, 1);
        this.setState({
            alerts: alerts
        })
    }


    render(): React.ReactNode {
        let toolbar = '';
        if (!this.props.product.is_deleted) {
             toolbar = <ButtonToolbar>
                {
                    this.state.product.in_order && <>
                        <Button type={'button'} disabled variant={'outline-primary btn-block'}>
                            Товар добавлен в корзину</Button>
                    </>}
                {!this.state.product.in_order && getUser() &&
                <Button type={'button'} variant={'outline-primary btn-block'}
                        onClick={this.addCart}>В корзину</Button>}
                {!this.state.product.in_order && !getUser() &&
                <Link className={'btn btn-outline-primary btn-block'} to={'/profile'}>В
                    корзину</Link>}
                {/*
                                    ToDo: не работает кнопка написать продавцу
                                */}
                <Button type={'button'} variant={'outline-primary btn-block mt-2'}>Написать
                    продавцу</Button>
            </ButtonToolbar>
        }
        return <>
            <Alerts alerts={this.state.alerts} close={() => this.closeAlert()}/>
            {toolbar}
        </>
    }
}

UserMenu.propTypes = {
    product: PropTypes.object.isRequired,
}