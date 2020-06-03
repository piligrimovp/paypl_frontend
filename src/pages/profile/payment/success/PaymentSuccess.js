import React from "react";
import {Alert, Button, ButtonToolbar, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import qs from "qs";
import {createAuthProvider} from "../../../../Entity/AuthProvider";
import ProgressBar from "../../../../components/PropgressBar/PropgressBar";

export const {authFetch} = createAuthProvider();

export default class PaymentSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            result: false,
            message: ''
        }
    }

    componentDidMount(): void {
        this.check();
    }

    check = () => {
        this.setState({
            result: true,
            message: '',
            loading: true
        })
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
        if (this.state.loading) {
            return <>
                <section className={'container pb-5 p-0'}>
                    <div className={'row justify-content-center'}>
                        <div className={'col-7'}>
                            <Alert variant={'warning'}>
                                <div className={'row py-5'}>
                                    <div className={'col-3 d-flex align-items-center'}>
                                        <div className="async-spinner"></div>
                                        <ProgressBar isAnimating={this.state.loading}/>
                                    </div>
                                    <div className={'col-9'}>
                                        <div className={'row m-0 p-0'}>
                                            <h2>Идет проверка платежа</h2>
                                            <p>Пожалуйста дождитесь проверки платежа</p>
                                        </div>
                                        <div className={'row m-0 p-0'}>
                                            <ButtonToolbar>
                                                <Link to={'/profile'} className={'btn btn-info ml-5'}>Заказы</Link>
                                            </ButtonToolbar>
                                        </div>
                                    </div>
                                </div>
                            </Alert>
                        </div>
                    </div>
                </section>
            </>
        } else {
            if (this.state.result) {
                return <>
                    <section className={'container pb-5 p-0'}>
                        <div className={'row justify-content-center'}>
                            <div className={'col-7'}>
                                <Alert variant={'success'}>
                                    <div className={'row'}>
                                        <div className={'col-3 d-flex align-items-center'}>
                                            <div className={'payment-glyphicon'}>
                                                <span className="glyphicon glyphicon-ok" aria-hidden="true"/>
                                            </div>
                                        </div>
                                        <div className={'col-9'}>
                                            <div className={'row m-0 p-0'}>
                                                <h2>Ваш заказ успешно оплачен</h2>
                                                <p>Квитанция об оплате выслана на почту</p>
                                                <p>Продавец в скором времени передаст вам товар через личное сообщение</p>
                                            </div>
                                            <div className={'row m-0 p-0'}>
                                                <ButtonToolbar>
                                                    <Link to={'/profile/cart'} className={'btn btn-info'}>Корзина</Link>
                                                    <Link to={'/profile'} className={'btn btn-info ml-5'}>Заказы</Link>
                                                    <Link to={'/'} className={'btn btn-info ml-5'}>Продолжить покупки</Link>
                                                </ButtonToolbar>
                                            </div>
                                        </div>
                                    </div>
                                </Alert>
                            </div>
                        </div>
                    </section>
                </>
            } else {
                return <>
                    <section className={'container pb-5 p-0'}>
                        <div className={'row justify-content-center'}>
                            <div className={'col-7'}>
                                <Alert variant={'danger'}>
                                    <div className={'row'}>
                                        <div className={'col-3 d-flex align-items-center'}>
                                            <div className={'payment-glyphicon'}>
                                                <span className="glyphicon glyphicon-remove" aria-hidden="true"/>
                                            </div>
                                        </div>
                                        <div className={'col-9'}>
                                            <div className={'row m-0 p-0'}>
                                                <h2>Ошибка при подтверждении оплаты</h2>
                                                <p>{this.state.message}</p>
                                            </div>
                                            <div className={'row m-0 p-0'}>
                                                <ButtonToolbar>
                                                    <Link to={'/profile/cart'} className={'btn btn-info'}>Корзина</Link>
                                                    <Link to={'/profile'} className={'btn btn-info ml-5'}>Заказы</Link>
                                                    <Link to={'/'} className={'btn btn-info ml-5'}>Службы поддержки</Link>
                                                    <Button variant={'info d-felx mt-2'} onClick={this.check}>
                                                        Повторить проверку</Button>
                                                </ButtonToolbar>
                                            </div>
                                        </div>
                                    </div>
                                </Alert>
                            </div>
                        </div>
                    </section>
                </>
            }
        }
    }
}