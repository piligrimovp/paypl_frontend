import React, {Component} from "react";
import {Button, Form, InputGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import PropTypes from "prop-types";

class EditField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            text: props.text,
            errors: []
        }
    }

    onChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        this.setState({text: value});
    };

    save = () => {
        if (this.state.text !== this.props.text) {
            this.props.saveFunction(this.props.name, this.state.text)
                .then(this.setState({edit: false}));
        } else {
            this.setState({edit: false})
        }
    }

    render(): React.ReactNode {
        if (this.state.edit) {
            return (<>
                <div className={'col-12 mt-2'}>
                    <h3 className={'float-left mr-2'}>{this.props.label}</h3>
                    <Form.Group>
                        {
                            <InputGroup className={'w-75'}>
                                {this.state.errors.length > 0 ?
                                    <Form.Control name={this.props.name} value={this.state.text} isInvalid
                                                  onChange={this.onChange} type={this.props.type}/>
                                    : <Form.Control name={this.props.name} value={this.state.text}
                                                    onChange={this.onChange} type={this.props.type}/>
                                }
                                <InputGroup.Append>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip id={'save' + this.props.label}>Сохранить</Tooltip>
                                        }
                                    >
                                        <Button variant="outline-success" onClick={this.save}>
                                            <span className="glyphicon glyphicon-floppy-disk" aria-hidden="true"/>
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip id={'back' + this.props.label}>Отменить</Tooltip>
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
                <div className={'col-12 mt-2'}>
                    <h3 className={'float-left mr-2'}>{this.props.label}</h3>
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
    label: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email']).isRequired,
    saveFunction: PropTypes.func.isRequired
};

export default EditField;