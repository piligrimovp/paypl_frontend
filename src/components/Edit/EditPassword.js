import React, {Component} from "react";
import {Button, Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import PropTypes from "prop-types";

const initialState = {
    edit: false,
    password: '',
    password_confirmation: '',
    errors: {}
}

class EditPassword extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        this.setState({text: value});
    };

    save = () => {
        if (this.state.text !== this.props.text) {
            this.props.saveFunction(this.props.name, this.state.text)
                .then(this.setState({edit: false}));
        } else {
            this.setState(initialState)
        }
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
                                              type={'password'} />
                                : <Form.Control name={'password'} onChange={this.onChange} required
                                                type={'password'} />
                        }
                        <Form.Control.Feedback type='invalid'>{this.state.errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId={'password_confirm'}>
                        <Form.Label>Подтверждение пароля*</Form.Label>
                        {
                            this.state.errors.hasOwnProperty('password_confirmation') ?
                                <Form.Control name={'password_confimation'} onChange={this.onChange}
                                              required isInvalid type={'password'} />
                                : <Form.Control name={'password_confirmation'} onChange={this.onChange}
                                                required type={'password'} />
                        }
                        <Form.Control.Feedback type='invalid'>{this.state.errors.password_confirmation}</Form.Control.Feedback>
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
                        <Button variant="outline-danger" onClick={() => {this.setState({edit:false})}}>
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

EditPassword.propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    saveFunction: PropTypes.func.isRequired
};

export default EditPassword;