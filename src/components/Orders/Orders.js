import React from "react";
import {Accordion, Button, Card} from "react-bootstrap";

export default function Orders() {
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
            <Accordion defaultActiveKey="0" className={'mt-4'}>
                <Card>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                        Номер заказа
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                        Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}