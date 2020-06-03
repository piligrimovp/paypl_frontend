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

export default function Orders(props) {
    return (
        <div className={'col-12'}>
            <div className={'col-12 row justify-content-between'}>
                <div className={'col-10'}>
                    <h4>Ваши заказы</h4>
                </div>
                <div className={'col align-self-end'}>
                    <Button variant={'outline-dark btn-block'}>
                        Фильтр
                    </Button>
                </div>
            </div>
            {props.orders.length > 0 &&
            <Accordion defaultActiveKey={0} className={'mt-4'}>
                {props.orders && props.orders.map((item, index) => {
                    let sum = 0;
                    item.goods.forEach(element => sum += parseFloat(element.pivot.price_current));
                    return <Card key={index}>
                        <Accordion.Toggle className={'row justify-content-around'} as={Card.Header} variant="link"
                                          eventKey={index}>
                            <div className={'col-3 text-left'}>
                                Номер заказа - {item.id}
                            </div>
                            <div className={'col-3 text-center'}>
                                {item.status.id === 13 &&
                                <Alert className={'m-0 p-0'} variant={'success'}>{item.status.name}</Alert>}
                                {item.status.id === 12 &&
                                <Alert className={'m-0 p-0'} variant={'warning'}>{item.status.name}</Alert>}
                            </div>
                            <div className={'col-3 text-right'}>
                                Сумма - <b>{sum}</b> руб.
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            <Card.Body>
                                {item.goods.map((good, indexGood) => {
                                    return <Form key={indexGood} className={''}>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <FormLabel>Название</FormLabel>
                                                    <Link className={'form-control'}
                                                          to={`/catalog/${good.category.slug}/${good.slug}`}>
                                                        {good.name}
                                                    </Link>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <FormLabel>Категория</FormLabel>
                                                    <Link className={'form-control'}
                                                          to={`/catalog/${good.category.slug}/`}>
                                                        {good.category.name}
                                                    </Link>
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <FormLabel>Цена руб.</FormLabel>
                                                    <FormControl readOnly value={good.pivot.price_current}
                                                                 type={'text'}/>
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <FormLabel>Количество</FormLabel>
                                                    <FormControl readOnly value={good.pivot.quantity}
                                                                 type={'text'}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {item.status.id === 12 && <Row>
                                            <Col>
                                                <ButtonToolbar className={'justify-content-end'}>
                                                    <Button variant={'warning'}>Подтвердить получение</Button>
                                                    <Button variant={'info ml-3'}>Написать продавцу</Button>
                                                </ButtonToolbar>
                                            </Col>
                                        </Row>}
                                    </Form>
                                })}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                })}
            </Accordion>
            }
            {props.orders.length <= 0 &&
                <h3>Заказы не найдены</h3>
            }
        </div>
    );
}