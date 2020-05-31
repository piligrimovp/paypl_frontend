import React, {Component} from "react";
import {Button, Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import {createAuthProvider} from "../../Entity/AuthProvider";

const initialState = {
    edit: false,
    password: '',
    password_confirmation: '',
    errors: {}
}

export const {updateUser} = createAuthProvider();

class EditPassword extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        this.setState({[name]: value});
    };

    confirming = () => {
        if (this.state.password !== this.state.password_confirmation) {
            this.setState({
                errors: {
                    password: 'Пароли не совпадают',
                    password_confirmation: 'Пароли не совпадают'
                }
            })
            return false;
        }
        if (this.state.password.length === 0) {
            this.setState({
                errors: {
                    password: 'Заполните поле',
                }
            })
            return false;
        }
        return true;
    }

    save = () => {
        this.setState({
            errors: {}
        });
        if (!this.confirming()) return;
        updateUser('password', this.state.password)
            .then(data => {
                if (data.status === 'success') {
                    this.setState({edit: false})
                }
                if (data.status === 'error') {
                    this.setState({
                        errors: data.error,
                    })
                }
            });
    }

    render(): React.ReactNode {
        if (this.state.edit) {
            return (<>
                <div className={'col-12 mt-2'}>
                    <Form.Group controlId={'password'}>
                        <Form.Label>Пароль*</Form.Label>
                        {
                            this.state.errors.hasOwnProperty('password') ?
                                <Form.Control name={'password'} onChange={this.onChange} required isInvalid
                                              type={'password'}/>
                                : <Form.Control name={'password'} onChange={this.onChange} required
                                                type={'password'}/>
                        }
                        <Form.Control.Feedback type='invalid'>{this.state.errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId={'password_confirm'}>
                        <Form.Label>Подтверждение пароля*</Form.Label>
                        {
                            this.state.errors.hasOwnProperty('password_confirmation') ?
                                <Form.Control name={'password_confimation'} onChange={this.onChange}
                                              required isInvalid type={'password'}/>
                                : <Form.Control name={'password_confirmation'} onChange={this.onChange}
                                                required type={'password'}/>
                        }
                        <Form.Control.Feedback
                            type='invalid'>{this.state.errors.password_confirmation}</Form.Control.Feedback>
                    </Form.Group>
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={'save' + this.props.name}>Сохранить</Tooltip>
                        }
                    >
                        <Button variant="outline-success" onClick={this.save}>
                            <span className="glyphicon glyphicon-floppy-disk" aria-hidden="true"/>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={'back' + this.props.name}>Отменить</Tooltip>
                        }
                    >
                        <Button variant="outline-danger" onClick={() => {
                            this.setState({edit: false})
                        }}>
                            <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"/>
                        </Button>
                    </OverlayTrigger>
                </div>
            </>);
        } else {
            return (
                <div className={'col-12 mt-2'}>
                    <Button variant={'outline-dark'} className={'ml-2'}
                            onClick={() => {
                                this.setState({edit: true})
                            }}>
                        Cменить пароль
                    </Button>
                </div>
            );
        }
    }
}

export default EditPassword;