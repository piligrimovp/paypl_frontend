import React from "react";
import {Alert, Button, ButtonToolbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import qs from "qs";
import {createAuthProvider} from "../../../../Entity/AuthProvider";

export const {authFetch} = createAuthProvider();

export default class PaymentFail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    repeatPayment = () => {
        let data = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
        authFetch(window.HOST + '/orders/update', {
            method: 'POST',
            body: JSON.stringify({
                status_id: 12,
                key: data.SignatureValue,
                sum: data.OutSum,
            })
        }).then(response => response.json()).then(data => {
            if (data.status === 'error') {
                this.setState({
                    result: false,
                    message: data.error,
                    loading: false
                })
            } else {
                this.setState({
                    loading: false
                })
            }
        }).catch(e => {
            this.setState({
                result: false,
                message: 'Ошибка при попытке проверить данные платежа',
                loading: false
            })
        })
    }

    render(): React.ReactNode {
        return <>
            <section className={'container pb-5 p-0'}>
                <div className={'row justify-content-center'}>
                    <div className={'col-6'}>
                        <Alert variant={'danger'}>
                            <div className={'row'}>
                                <div className={'col-3 d-flex align-items-center'}>
                                    <div className={'payment-glyphicon'}>
                                        <span className="glyphicon glyphicon-remove" aria-hidden="true"/>
                                    </div>
                                </div>
                                <div className={'col-9'}>
                                    <div className={'row m-0 p-0'}>
                                        <h2>Ошибка при попытке оплаты</h2>
                                        <p>
                                            Оплата не прошла или платёж был отменён вами вручную.
                                        </p>
                                    </div>
                                    {!this.state.loading &&
                                    <div className={'row m-0 p-0'}>
                                        <ButtonToolbar>
                                            <Link to={'/profile/cart'} className={'btn btn-info'}>Корзина</Link>
                                            <Link to={'/profile'} className={'btn btn-info ml-3'}>Заказы</Link>
                                            <Button variant={'info ml-3'} onClick={this.repeatPayment}>
                                                Повторить платеж</Button>
                                        </ButtonToolbar>
                                    </div>
                                    }
                                </div>
                            </div>
                        </Alert>
                    </div>
                </div>
            </section>
        </>
    }
}