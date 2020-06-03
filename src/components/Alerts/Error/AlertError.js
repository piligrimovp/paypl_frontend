import React from "react";
import {Toast} from "react-bootstrap";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

export default class AlertError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            node: ''
        }
    }

    componentDidMount(): void {
        this.setState({node: ReactDOM.findDOMNode(this)});
    }

    findIndex = (list, item) => {
        for (var i = 0; i < list.length; i++) {
            if (list[i] === item)
                return i;
        }
        return -1;
    }

    calcTopCoord = () => {
        let top = 50;
        let items = document.getElementsByClassName('alert_toast');
        let index = this.findIndex(items,this.state.node);
        for (let i = 0; i < index; ++i) {
            if (items[i] !== undefined) {
                top += parseInt(items[i].offsetHeight) + 10;
            } else {
                top += 90 * i;
            }
        }
        return top;
    }

    render(): React.ReactNode {
        if (this.props.auto_close) {
            return <>
                <Toast className={'alert_toast alert_toast-error'}
                       style={{
                           top: this.calcTopCoord(),
                       }}
                       delay={4000} autohide
                       onClose={() => this.setState({show: false})}
                       //onClose={this.props.close}
                       show={this.state.show}>
                    <Toast.Header>
                        <strong className="mr-auto">Ошибка!</strong>
                    </Toast.Header>
                    <Toast.Body>{this.props.text}</Toast.Body>
                </Toast>
            </>
        } else {
            return <>
                <Toast className={'alert_toast alert_toast-error'}
                       style={{
                           top: this.calcTopCoord(),
                       }}
                       onClose={() => this.setState({show: false})}
                       //onClose={this.props.close}
                       show={this.state.show}>
                    <Toast.Header>
                        <strong className="mr-auto">Ошибка!</strong>
                    </Toast.Header>
                    <Toast.Body>{this.props.text}</Toast.Body>
                </Toast>
            </>
        }
    }
}

AlertError.propTypes = {
    text: PropTypes.string.isRequired,
    auto_close: PropTypes.bool,
    close: PropTypes.func.isRequired
}