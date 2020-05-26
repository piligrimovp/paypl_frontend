import React, {Component} from "react";
import {Button, Form, FormControl, FormGroup, InputGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import PropTypes from "prop-types";
import {createAuthProvider} from "../../../Entity/AuthProvider";

class EditField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: props.edit,
            text: props.text,
            label: props.label,
            errors: []
        }
    }

    onChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        this.setState({text: value});
    };

    save = () => {
        this.props.saveFunction(this.props.name, this.state.text);
    }

    render(): React.ReactNode {
        if (this.state.edit) {
            return (<>
                <div className={'col-12'}>
                    <h3 className={'float-left mr-2'}>{this.state.label}</h3>
                    <Form.Group>
                        {
                            <InputGroup className={'w-75'}>
                                {this.state.errors.length > 0 ?
                                    <Form.Control name={'password'} value={this.state.text} isInvalid
                                                  onChange={this.onChange} type={this.props.type}/>
                                    : <Form.Control name={'password'} value={this.state.text}
                                                    onChange={this.onChange} type={this.props.type}/>
                                }
                                <InputGroup.Append>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip id={'save' + this.state.label}>Сохранить</Tooltip>
                                        }
                                    >
                                        <Button variant="outline-success" onClick={this.save}>
                                            <span className="glyphicon glyphicon-floppy-disk" aria-hidden="true"/>
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip id={'back' + this.state.label}>Отменить</Tooltip>
                                        }
                                    >
                                        <Button variant="outline-danger" onClick={() => {this.setState({edit:false})}}>
                                            <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"/>
                                        </Button>
                                    </OverlayTrigger>
                                </InputGroup.Append>
                            </InputGroup>
                        }
                        <Form.Control.Feedback type='invalid'>{this.state.errors}</Form.Control.Feedback>
                    </Form.Group>
                </div>
            </>);
        } else {
            return (
                <div className={'col-12'}>
                    <h3 className={'float-left mr-2'}>{this.state.label}</h3>
                    <h3 className={'mx-0 float-left'}>{this.state.text}</h3>
                    <Button variant={'default'} className={'ml-2'}
                            onClick={() => {
                                this.setState({edit: true})
                            }}>
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"/>
                    </Button>
                </div>
            );
        }
    }
}

EditField.propTypes = {
    edit: PropTypes.bool.isRequired,
    label: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email']).isRequired,
    saveFunction: PropTypes.func.isRequired
};

export default EditField;