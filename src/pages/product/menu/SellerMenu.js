import React from "react";
import {createAuthProvider} from "../../../Entity/AuthProvider";
import {Button, ButtonToolbar} from "react-bootstrap";
import Alerts from "../../../components/Alerts/Alerts";

export const {authFetch, getUser} = createAuthProvider();

export default class SellerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            product: props.product
        }
    }

    closeAlert(index, alerts) {
        alerts.splice(index, 1);
        this.setState({
            alerts: alerts
        })
    }

    render(): React.ReactNode {
        let toolbar = '';
        if (!this.props.product.is_deleted) {
            toolbar = <ButtonToolbar>
                <Button type={'button'} variant={'outline-primary btn-block'}>
                    Редактировать
                </Button>
                <Button type={'button'} variant={'outline-primary btn-block mt-2'}>
                    Приостановить продажу
                </Button>
            </ButtonToolbar>
        }
        return <>
            <Alerts alerts={this.state.alerts} close={() => this.closeAlert()}/>
            {toolbar}
        </>
    }
}