import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import {
    Breadcrumb,
    Button,
    ButtonToolbar,
    Card,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";
import ProfileMenu from "../../../../components/profileMenu/profileMenu";
import InputMask from "react-input-mask";
import {createAuthProvider} from "../../../../Entity/AuthProvider";

export const {authFetch} = createAuthProvider();

export default class Sellers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: []
        }
    }

    componentDidMount(): void {
        authFetch(window.HOST + '/request/get', {method: 'POST'})
            .then(response => response.json())
            .then(data => {
                this.setState({
                    requests: data
                })
            });
    }

    decision = (id, accepted, index) => {
        authFetch(window.HOST + '/request/update', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                accepted: accepted
            })
        }).then(response => {
            let requests = this.state.requests;
            requests.splice(index, 1);
            this.setState({requests: requests});
        })
    }

    isJson = (item) => {
        try {
            JSON.parse(item);
            return true;
        } catch (e) {
            return false;
        }
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
                    <Breadcrumb.Item active>Заявки на продавца</Breadcrumb.Item>
                </Breadcrumb>
                <div className={'row m-0 justify-content-between'}>
                    <div className={'col-10 px-5'}>
                        {this.state.requests.map((item, index) => {
                            let isJson = this.isJson(item.content);
                            if (isJson) {
                                var json = JSON.parse(item.content)
                            }
                            return <Card key={index} className={'mt-3'}>
                                <Card.Header as="h5">Заявка № {item.id}</Card.Header>
                                <Card.Body>
                                    {isJson && <>
                                        <FormGroup>
                                            <FormLabel>ФИО</FormLabel>
                                            <FormControl value={json.fio} type={'text'} name={'fio'} readOnly/>
                                        </FormGroup>
                                        <div className={'row m-0 p-0 justify-content-between'}>
                                            <FormGroup className={'col-3 p-0'}>
                                                <FormLabel>Дата рождения</FormLabel>
                                                <FormControl value={json.birthdate} readOnly type={'date'}/>
                                            </FormGroup>
                                            <FormGroup className={'col-4 p-0 mx-2'}>
                                                <FormLabel>Серия и номер паспорта</FormLabel>
                                                <InputMask value={json.doc_number} readOnly mask={'9999999999'}
                                                           className={'form-control'}/>
                                            </FormGroup>
                                            <FormGroup className={'col-3 p-0'}>
                                                <FormLabel>Дата выдачи</FormLabel>
                                                <FormControl value={json.doc_date} type={'date'} readOnly={true}/>
                                            </FormGroup>
                                        </div>
                                        <FormGroup>
                                            <FormLabel>Кем выдан</FormLabel>
                                            <FormControl value={json.doc_own} as={'textarea'} readOnly={true} rows={3}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Адрес регистрации</FormLabel>
                                            <FormControl value={json.address} readOnly as={'textarea'} rows={3}/>
                                        </FormGroup>
                                    </>}
                                    <ButtonToolbar className={'d-flex justify-content-end'}>
                                        <Button variant="success" onClick={() => this.decision(item.id, true, index)}>
                                            Подтвердить</Button>
                                        <Button variant="danger" className={'ml-3'}
                                                onClick={() => this.decision(item.id, false, index)}>
                                            Отказ</Button>
                                    </ButtonToolbar>
                                </Card.Body>
                            </Card>
                        })}
                    </div>
                    <ProfileMenu/>
                </div>
            </section>
        </>;
    }
}