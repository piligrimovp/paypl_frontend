import React from "react";
import {Button, ButtonToolbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {createAuthProvider} from "../../Entity/AuthProvider";
import ToBeSeller from "../toBeSeller/ToBeSeller"
import AdminButtons from "./AdminButtons/AdminButtons";

export const {getUser, authFetch} = createAuthProvider();

export default class ProfileMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    render(): React.ReactNode {
        return <div className={'col-2 p-0'}>
            {!getUser().seller && !getUser().is_admin &&
            <ButtonToolbar className={'w-100'}>
                <Button variant={'outline-primary btn-block'} onClick={() => this.setState({showModal: true})}>
                    Стать продавцом</Button>
                {this.state.showModal && <ToBeSeller/>}
            </ButtonToolbar>
            }
            {
                getUser().seller && !getUser().is_admin &&
                <ButtonToolbar className={'w-100'}>
                    <Link className={'btn btn-outline-primary btn-block'} to={'/profile/seller'}>Страница продавца</Link>
                    <Link className={'btn btn-outline-primary btn-block mt-4'} to={'/profile/addProduct'}>Добавить
                        товар</Link>
                    <Link className={'btn btn-outline-primary btn-block'} to={'/profile'}>Управление товарами</Link>
                </ButtonToolbar>
            }
            {
                getUser().is_admin && <AdminButtons/>
            }
        </div>
    }
}