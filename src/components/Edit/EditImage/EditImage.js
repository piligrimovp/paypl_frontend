import React from "react";
import PropTypes from "prop-types";
import {Button, ButtonGroup, Form, Image, OverlayTrigger, Tooltip} from "react-bootstrap";

class EditImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState(props);
    }

    initialState = (props) => {
        return {
            edit: false,
            value: {},
            src: props.value,
            errors: []
        }
    }

    save = () => {
        if (this.state.src !== this.props.value) {
            this.props.saveFunction(this.props.name, this.state.value)
                .then(data => {
                    if (data.status === 'success') {
                        this.setState({edit: false})
                    }
                    if (data.status === 'error') {
                        this.setState({
                            errors: data.error
                        })
                    }
                });
        } else {
            this.setState(this.initialState(this.props))
        }
    }

    fileUpload = (event) =>
    {
        event.persist();
        this.setState({
            src: URL.createObjectURL(event.target.files[0]),
            value: event.target.files[0]
        });
    }

    render(): React.ReactNode {
        if (!this.props.delete && this.state.edit) {
            return <>
            <Form.Group>
                <Form.File id="avatar">
                    <Form.File.Label>Изображение профиля</Form.File.Label>
                    <Form.File.Input onChange={this.fileUpload} />
                    <Image src={this.state.src} className={'register-avatar'} />
                </Form.File>
            </Form.Group>
            <ButtonGroup>
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
                    <Button variant="outline-danger" onClick={() => {this.setState(this.initialState(this.props))}}>
                        <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"/>
                    </Button>
                </OverlayTrigger>
            </ButtonGroup>
                </>
        } else {
            return <div className={'position-relative'}>
                <Image src={this.state.src} roundedCircle={this.props.circle}/>
                <ButtonGroup className={'btn_edit-image'}>
                    {!this.props.delete && <Button variant={'default'} className={'ml-2'}
                            onClick={() => {
                                this.setState({edit: true})
                            }}>
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"/>
                    </Button>}
                    {this.props.delete && <Button variant={'default'} size={'sm'} className={'ml-2'}
                                                  onClick={this.props.deleteFunction}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"/>
                    </Button>}
                </ButtonGroup>
            </div>
        }
    }
}

EditImage.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    saveFunction: PropTypes.func,
    circle: PropTypes.bool,
    delete: PropTypes.bool,
    deleteFunction: PropTypes.func,
};

export default EditImage;