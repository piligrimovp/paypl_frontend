import React from "react";
import {Alert, ButtonToolbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import qs from "qs";

export default function PaymentSuccess(props) {
    console.log(qs.parse(props.location.search,{ ignoreQueryPrefix: true }))
    return <>
        <section className={'container pb-5 p-0'}>
            <div className={'row justify-content-center'}>
                <div className={'col-7'}>
                    <Alert variant={'success'}>
                        <div className={'row'}>
                            <div className={'col-3'}>
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
                                        <Link to={'/profile'} className={'btn btn-info'}>Заказы</Link>
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
}