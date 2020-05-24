import React, {useState} from "react";
import {Alert, Button, Form, Image} from "react-bootstrap";
import {login} from "./Login";
import ProgressBar from "../../../components/PropgressBar/PropgressBar";

export default function Register() {
    const [errors, setErrors] = useState({});
    const [errorRegister, setErrorRegister] = useState({status: false, message: 'Ошибка при регистрации'});
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        avatar: {},
        name: '',
        email: '',
        login: '',
        password: '',
        password_confirmation: ''
    });

    const fileUpload = (event) =>
    {
        setAvatarPreview(URL.createObjectURL(event.target.files[0]));
        event.persist()
        setCredentials(prevState => ({ ...prevState, avatar: event.target.files[0]}))
    }

    const onRegister = (event?: React.FormEvent) => {
        if (event) {
            event.preventDefault();
        }
        setLoading(true);
        setErrors({});
        setErrorRegister(prevState => ({...prevState, status: false}));
        let formData = new FormData();
        for (let [key, value] of Object.entries(credentials)) {
            formData.append(key, value);
        }

        fetch(window.HOST + '/profile/register', {
            method: 'POST',
            body: formData
        })
            .then(r => r.json())
            .then(token => {
                if(token.status === 'success') {
                    login(token.data)
                }
                if (token.status === 'error') {
                    for (let [name, errors] of Object.entries(token.error)) {
                        setErrors(prevState => ({...prevState, [name]: errors}))
                    }
                }
                setLoading(false);
            })
            .catch(error => {
                setErrorRegister(prevState => ({...prevState, status: true}));
                setLoading(false);
            })
    }

    const onChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [name]: value})
    };

    return <>
        <div className={'col-6'}>
            <h3>Регистрация</h3>
            { errorRegister.status && <Alert variant={'danger'}>{errorRegister.message}</Alert>}
            {loading && <ProgressBar isAnimating={loading}/>}
            <Form onSubmit={onRegister} noValidate >
                <Form.Group controlId={'name'}>
                    <Form.Label>Имя*</Form.Label>
                    {
                        errors.hasOwnProperty('name') ?
                            <Form.Control name={'name'} onChange={onChange} required isInvalid type={'text'} placeholder={''} />
                            : <Form.Control name={'name'} onChange={onChange} required type={'text'} placeholder={''} />
                    }
                    <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={'login'}>
                    <Form.Label>Логин</Form.Label>
                    {
                        errors.hasOwnProperty('login') ?
                            <Form.Control name={'login'} onChange={onChange} isInvalid type={'text'} />
                            : <Form.Control name={'login'} onChange={onChange} type={'text'} />
                    }
                    <Form.Control.Feedback type='invalid'>{errors.login}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={'email'}>
                    <Form.Label>Email*</Form.Label>
                    {
                        errors.hasOwnProperty('email') ?
                            <Form.Control name={'email'} onChange={onChange} required isInvalid
                                          type={'email'} placeholder={'example@example.com'} />
                            : <Form.Control name={'email'} onChange={onChange} required
                                            type={'email'} placeholder={'example@example.com'} />
                    }
                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={'password'}>
                    <Form.Label>Пароль*</Form.Label>
                    {
                        errors.hasOwnProperty('password') ?
                            <Form.Control name={'password'} onChange={onChange} required isInvalid
                                          type={'password'} />
                            : <Form.Control name={'password'} onChange={onChange} required
                                            type={'password'} />
                    }
                    <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={'password_confirm'}>
                    <Form.Label>Подтверждение пароля*</Form.Label>
                    {
                        errors.hasOwnProperty('password_confirmation') ?
                            <Form.Control name={'password_confimation'} onChange={onChange}
                                          required isInvalid type={'password'} />
                            : <Form.Control name={'password_confirmation'} onChange={onChange}
                                            required type={'password'} />
                    }
                    <Form.Control.Feedback type='invalid'>{errors.password_confirmation}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.File id="avatar">
                        <Form.File.Label>Изображение профиля</Form.File.Label>
                        <Form.File.Input onChange={fileUpload} />
                        <Image src={avatarPreview} className={'register-avatar'} />
                    </Form.File>
                </Form.Group>
                <Form.Group className={'mt-5'}>
                    {/*
                                ToDo: текст согласия с обработкой данных
                            */}
                    <Form.Check required type={'checkbox'} label={'Согласие с обработкой данных'}/>
                </Form.Group>
                {!loading ?
                <Button type={'submit'}>Зарегистрироваться</Button>
                    : <Button disabled>Регистрация...</Button>
                }
            </Form>
        </div>
    </>
}