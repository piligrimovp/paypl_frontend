import React from "react";
import {
    Accordion,
    Alert,
    Button,
    ButtonToolbar,
    Card,
    Col,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Row
} from "react-bootstrap";
import {Link} from "react-router-dom";
import {createAuthProvider} from "../../Entity/AuthProvider";
import Alerts from "../Alerts/Alerts";

export const {getUser, updateUser, authFetch} = createAuthProvider();

export default class GoodsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: [],
            alerts: []
        }
    }

    componentDidMount(): void {
        authFetch(window.HOST + '/goods/owner', {
            method: "POST",
            body: JSON.stringify({
                user_id: getUser().id
            })
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    goods: data
                })
            }).catch(error => {
            this.setState({
                alerts: [
                    ...this.state.alerts,
                    {
                        text: 'Ошибка при загрузке списка товаров',
                        close: true,
                        status: 'error'
                    }
                ]
            })
        })
    }

    stopSale = () => {
        authFetch(window.HOST + '/')
    }

    delete = (id, index) => {
        authFetch(window.HOST + '/goods/destroy/',{
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        }).then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    let goods = this.state.goods;
                    goods.splice(index, 1);
                    this.setState({
                        goods: goods,
                        alerts: [
                            ...this.state.alerts,
                            {
                                text: 'Товар удален',
                                close: true,
                                status: 'success'
                            }
                        ]
                    })
                }
                if (data.status === 'error') {
                    let errors = data.error;
                    let alerts = [];
                    errors.map(item => {
                        alerts.push({
                            text: item,
                            close: false,
                            status: 'error'
                        })
                    });
                    this.setState({
                        alerts: [
                            ...this.state.alerts,
                            ...alerts
                        ]
                    })
                }
            }).catch(error => {
            this.setState({
                alerts: [
                    ...this.state.alerts,
                    {
                        text: 'Ошибка при попытке удаления',
                        close: true,
                        status: 'error'
                    }
                ]
            })
        })
    }

    render(): React.ReactNode {
        return (
            <div className={'col-12'}>
                <div className={'col-12 row justify-content-between'}>
                    <div className={'col-10'}>
                        <h4>Ваши товары</h4>
                    </div>
                    <div className={'col align-self-end'}>
                        <Button variant={'outline-dark btn-block'}>
                            Фильтр
                        </Button>
                    </div>
                </div>
                <Alerts alerts={this.state.alerts}/>
                {this.state.goods.length > 0 &&
                <Accordion defaultActiveKey={0} className={'mt-4'}>
                    {this.state.goods && this.state.goods.map((item, index) => {
                        return <Card key={index}>
                            <Accordion.Toggle className={'row justify-content-around'} as={Card.Header} variant="link"
                                              eventKey={index}>
                                <div className={'col-3 text-left'}>
                                    {item.name}
                                </div>
                                <div className={'col-3 text-center'}>
                                    {!item.status.locked &&
                                    <Alert className={'m-0 p-0'} variant={'success'}>{item.status.name}</Alert>}
                                    {item.status.locked &&
                                    <Alert className={'m-0 p-0'} variant={'warning'}>{item.status.name}</Alert>}
                                </div>
                                <div className={'col-3 text-right'}>
                                    Цена - <b>{item.discount > 0 ? item.discount : item.price}</b> руб.
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index}>
                                <Card.Body>
                                    <Form className={'w-100'}>
                                        <Row>
                                            <Col>
                                                <h2>
                                                    <Link to={`/catalog/${item.category.slug}/${item.slug}`}>
                                                        {item.name}</Link>
                                                </h2>
                                            </Col>
                                        </Row>
                                        <Row className={'mt-2'}>
                                            <Col className={'d-flex align-items-center justify-content-center '}>
                                                {item.is_unlimited && <h5>Количество неограничено</h5>}
                                                {!item.is_unlimited && <h5>Количество - {item.quantity}</h5>}
                                            </Col>
                                            <Col className={'d-flex align-items-center justify-content-center '}>
                                                <h5>
                                                    Цена - {item.price} руб.
                                                </h5>
                                            </Col>
                                            {
                                                item.discount > 0 && <Col className={'d-flex align-items-center justify-content-center '}>
                                                    <h5>
                                                        Цена со скидкой - {item.discount} руб.
                                                    </h5>
                                                </Col>
                                            }
                                        </Row>
                                        <Row className={'mt-2'}>
                                            <Col className={'d-flex align-items-center justify-content-center '}>
                                                <Button variant={'info'}>Редактировать</Button>
                                            </Col>
                                            <Col className={'d-flex align-items-center justify-content-center '}>
                                                <Button variant={'info'}>История продаж</Button>
                                            </Col>
                                            <Col className={'d-flex align-items-center justify-content-center '}>
                                                {item.status.locked && <Button variant={'warning'}>Открыть продажу</Button>}
                                                {!item.status.locked && <Button variant={'warning'}>Приостановить продажу</Button>}
                                            </Col>
                                            <Col className={'d-flex align-items-center justify-content-center '}>
                                                <Button variant={'danger'} onClick={() => this.delete(item.id, index)}>Удалить</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    })}
                </Accordion>
                }
                {this.state.goods.length <= 0 &&
                <h3>Товары не найдены</h3>
                }
            </div>
        );
    }
}