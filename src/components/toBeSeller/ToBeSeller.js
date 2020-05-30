import React, {useState} from "react";
import {authFetch} from "../profileMenu/profileMenu";
import {Button, Form, FormControl, FormGroup, FormLabel, Modal} from "react-bootstrap";
import InputMask from "react-input-mask";

export default function ToBeSeller() {
    const [showModal, setShowModal] = useState(true);
    const [content, setContent] = useState({
        fio: '',
        birthdate: '',
        doc_number: '',
        doc_own: '',
        doc_date: '',
        address: ''
    });
    const [successSend, setSuccessSend] = useState({
        status: false,
        message: 'Заявка подана'
    });
    const [failSend, setFailSend] = useState({
        status: false,
        message: []
    });

    const onSubmit = (event?: React.FormEvent) => {
        if (event) {
            event.preventDefault();
        }

        authFetch(window.HOST + '/request/store', {method: 'POST', body: JSON.stringify({content: JSON.stringify(content)}) })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setSuccessSend(prevState => ({...prevState, status: true}));
                }
                if (data.status === 'error') {
                    setFailSend(prevState => ({status: true, message: data.error}));
                }
                setShowModal(false);
            }).catch(error => {
            setFailSend(prevState => ({...prevState, status: true, message: 'Ошибка при отправке'}));
        });
    }

    const onChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setContent(prevState => ({...prevState, [name]: value}));
    };
    return <>
        {successSend.status &&
                <Modal show={successSend.status} onHide={() =>setSuccessSend(prevState => ({...prevState,status: false}))}>
                    <Modal.Body>
                        <p>{successSend.message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() =>setSuccessSend(prevState => ({...prevState,status: false}))}>
                            Ок</Button>
                    </Modal.Footer>
                </Modal>}
    {failSend.status &&
    <Modal show={failSend.status} onHide={() => setFailSend(prevState => ({...prevState,status: false}))}>
        <Modal.Body>
            <p>{failSend.message}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={() => setFailSend(prevState => ({...prevState,status: false}))}>
                Ок</Button>
        </Modal.Footer>
    </Modal>}
    <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowModal(false)}
    >
        <Form className={'m-auto'} onSubmit={onSubmit}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Стать продавцом
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Условия соглашения</h4>
                <p>
                    Ваша заявка будет рассмотрена в ручном режиме администраторами сайта.
                    Ответ придет вам на почту.
                </p>
                <FormGroup>
                    <FormLabel>ФИО*</FormLabel>
                    <FormControl onChange={onChange} type={'text'} name={'fio'} required/>
                </FormGroup>
                <div className={'row m-0 p-0 justify-content-between'}>
                    <FormGroup className={'col-3 p-0'}>
                        <FormLabel>Дата рождения*</FormLabel>
                        <FormControl onChange={onChange} required={true} type={'date'} name={'birthdate'}/>
                    </FormGroup>
                    <FormGroup className={'col-4 p-0 mx-2'}>
                        <FormLabel>Серия и номер паспорта*</FormLabel>
                        <InputMask required mask={'9999999999'} name={'doc_number'} onChange={onChange}
                                   className={'form-control'}/>
                    </FormGroup>
                    <FormGroup className={'col-3 p-0'}>
                        <FormLabel>Дата выдачи*</FormLabel>
                        <FormControl required={true} type={'date'} onChange={onChange} name={'doc_date'}/>
                    </FormGroup>
                </div>
                <FormGroup>
                    <FormLabel>Кем выдан*</FormLabel>
                    <FormControl required={true} as={'textarea'} onChange={onChange} name={'doc_own'} rows={3}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Адрес регистрации*</FormLabel>
                    <FormControl required={true} as={'textarea'} onChange={onChange} name={'address'} rows={3}/>
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button type={'submit'} variant={'light'}>Отправить заявку</Button>
                <Button variant={'info'} onClick={() => setShowModal(false)}>Отмена</Button>
            </Modal.Footer>
        </Form>
    </Modal>
    </>;
}