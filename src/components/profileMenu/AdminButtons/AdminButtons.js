import React from "react";
import {Link} from "react-router-dom";
import {Badge, ButtonToolbar} from "react-bootstrap";
import {createAuthProvider} from "../../../Entity/AuthProvider";

export const {getUser, authFetch} = createAuthProvider();

export default class AdminButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countRequest: 0
        }
    }

    componentDidMount(): void {
        authFetch(window.HOST + '/request/get',{method: 'POST'})
            .then(response => response.json())
            .then(data => {
                this.setState({
                    countRequest: data.length
                })
            });
    }

    render(): React.ReactNode {
        return <ButtonToolbar className={'w-100'}>
            <Link to={'/admin/sellers'} className={'btn btn-outline-primary btn-block'}>
                Заявки на продавца <Badge variant="secondary">{this.state.countRequest}</Badge>
            </Link>
        </ButtonToolbar>
    }

}