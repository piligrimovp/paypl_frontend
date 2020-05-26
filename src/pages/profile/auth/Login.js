import React, {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import ProgressBar from "../../../components/PropgressBar/PropgressBar";
import {createAuthProvider} from "../../../Entity/AuthProvider";

export const {useAuth, authFetch, login, logout, getUser} = createAuthProvider();

export default function Login() {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [credentialsLogin, setCredentialsLogin] = useState({
        email: '',
        password: ''
    });
    const [errorLogin, setErrorLogin] = useState({status: false, message: 'Ошибка при авторизации'});

    const onChangeLogin = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setCredentialsLogin({...credentialsLogin, [name]: value})
    };

    const onLogin = (event?: React.FormEvent) => {
        if (event) {
            event.preventDefault();
        }
        setLoading(true);
        setErrors({});
        setErrorLogin(prevState => {prevState.status = false; return prevState})

        fetch(window.HOST + '/profile/login', {
            method: 'POST',
            body: JSON.stringify(credentialsLogin)
        })
            .then(r => r.json())
            .then(token => {
                if(token.status === 'success') {
                    login(token.data)
                }
                if (token.status === 'error') {
                    setErrorLogin({status: true, message: token.data})
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setErrorLogin(prevState => ({...prevState, status: true}));
            })
    }

    return <>
        {loading && <ProgressBar isAnimating={loading}/>}
        <div className={'col-5 border-right'}>
            <h3>Авторизация</h3>
            <Form onSubmit={onLogin}>
                { errorLogin.status && <Alert variant={'danger'}>{errorLogin.message}</Alert>}
                <Form.Group controlId={'login_email'}>
                    <Form.Label>Email</Form.Label>
                    {
                        errors.hasOwnProperty('login_email') ?
                            <Form.Control name='email' onChange={onChangeLogin} required isInvalid type={'email'} placeholder={'example@example.com'} />
                            : <Form.Control name={'email'} onChange={onChangeLogin} required type={'email'} placeholder={'example@example.com'} />
                    }
                    <Form.Control.Feedback type='invalid'>{errors.login_email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={'login_password'}>
                    <Form.Label>Пароль</Form.Label>
                    {
                        errors.hasOwnProperty('login_password') ?
                            <Form.Control name={'password'} onChange={onChangeLogin} required isInvalid type={'password'} />
                            : <Form.Control name={'password'} onChange={onChangeLogin} required type={'password'} />
                    }
                    <Form.Control.Feedback type='invalid'>{errors.login_password}</Form.Control.Feedback>
                </Form.Group>
                {!loading ?
                    <Button type={'submit'}>Войти</Button>
                    : <Button disabled>Вход...</Button>
                }
            </Form>
        </div>
    </>
}