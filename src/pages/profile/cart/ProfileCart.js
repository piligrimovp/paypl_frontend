import React from "react";
import {authFetch} from "../profile/ProfilePage";
import {Alert, Breadcrumb, Button, ButtonToolbar, Card, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import ProfileMenu from "../../../components/profileMenu/profileMenu";
import {Link} from "react-router-dom";

export default class ProfileCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            error: {
                status: false,
                message: ''
            }
        }
    }

    componentDidMount(): void {
        authFetch(window.HOST + '/orders/buyer', {
            method: 'POST',
            body: JSON.stringify({
                status_id: 10
            })
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    orders: data
                })
            }).catch(e => {
            this.setState({
                error: {
                    status: true,
                    message: 'Ошибка при загрузке корзины'
                }
            })
        })
    }

    onChangeQuantity = ({target: {name, value}}: ChangeEvent<HTMLInputElement>, indexOrder, indexGood) => {
        let orders = this.state.orders;
        orders[indexOrder].goods[indexGood].pivot.quantity = value;
        this.setState({
            orders: orders
        })
    }

    BuyOrder = (order, index) => {
        this.setState({
            error: {
                status: false,
                message: ''
            }
        })
        authFetch(window.HOST + '/orders/payment', {
            method: 'POST',
            body: JSON.stringify({
                order: order
            })
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            } else {
                this.setError('Ошибка при попытке оплаты')
            }
        })
            .then(data => {
                if (data.hasOwnProperty('url')) {
                    window.location.href = data.url;
                }
            }).catch(e => {
            this.setError('Ошибка при попытке оплаты')
        })
    }

    setError = (error) => {
        this.setState({
            error: {
                status: true,
                message: error
            }
        })
    }


    DeleteOrder = (order, index) => {
        this.setState({
            error: {
                status: false,
                message: ''
            }
        })
        authFetch(window.HOST + '/orders/destroy', {
            method: 'POST',
            body: JSON.stringify({
                id: order.id
            })
        }).then(response => {
            if (response.status === 404) {
                this.setError('Ошибка при удалении')
            } else {
                let orders = this.state.orders;
                orders.splice(index, 1);
                this.setState({
                    orders: orders
                });
            }
        }).catch(e => {
            this.setError('Ошибка при удалении')
        })
    }

    render(): React.ReactNode {
        return <>
            <section className={'container pb-5 p-0'}>
                <Breadcrumb className={'mb-4'}>
                    <LinkContainer to={'/'} exact={true}>
                        <Breadcrumb.Item>Главная</Breadcrumb.Item>
                    </LinkContainer>
                    <LinkContainer to={'/profile'} exact={true}>
                        <Breadcrumb.Item>Профиль</Breadcrumb.Item>
                    </LinkContainer>
                    <Breadcrumb.Item active>Корзина</Breadcrumb.Item>
                </Breadcrumb>
                <div className={'row m-0 justify-content-between'}>
                    <div className={'col-10 px-5'}>
                        {this.state.error.status && <Alert variant={'danger'} className={'m-auto'}>
                            {this.state.error.message}</Alert>}
                        {this.state.orders.map((item, index) => {
                            return <Card key={index} className={'mt-3'}>
                                <Card.Body>
                                    {item.goods.map((good, goodIndex) => {
                                        return <div className={'row m-0 mt-3'} key={goodIndex}>
                                            <div className={'col-12'}>
                                                <FormGroup>
                                                    <FormLabel>Товар</FormLabel>
                                                    <Link className={'form-control'}
                                                          to={`/catalog/${good.category.slug}/${good.slug}`}>{good.name}</Link>
                                                </FormGroup>
                                            </div>

                                            <FormGroup>
                                                <FormLabel>Количество - {good.pivot.quantity}</FormLabel>
                                                <FormControl type={'range'} name={'quantity'} min={1}
                                                             max={good.is_unlimited ? 50 : good.quantity}
                                                             value={good.pivot.quantity}
                                                             onChange={e => this.onChangeQuantity(e, index, goodIndex)}/>
                                            </FormGroup>
                                        </div>
                                    })}
                                    <ButtonToolbar className={'d-flex justify-content-end mt-2   '}>
                                        <Button variant="success" onClick={() => this.BuyOrder(item, index)}>
                                            Оплатить</Button>
                                        <Button variant="danger" className={'ml-3'}
                                                onClick={() => this.DeleteOrder(item, index)}>
                                            Удалить</Button>
                                    </ButtonToolbar>
                                </Card.Body>
                            </Card>
                        })}
                    </div>
                    <ProfileMenu/>
                </div>
            </section>
        </>
    }
}