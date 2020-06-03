import React from "react";
import {Breadcrumb} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Alerts from "../../../components/Alerts/Alerts";
import GoodsListOwner from "../../../components/GoodsList/GoodsList";
import ProfileMenu from "../../../components/profileMenu/profileMenu";

export default class GoodsList extends React.Component {
    constructor(props) {
        super(props);

    }

    render(): React.ReactNode {
        return <section className={'container pb-5 p-0'}>
            <Breadcrumb className={'mb-4'}>
                <LinkContainer to={'/'} exact={true}>
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to={'/profile'} exact={true}>
                    <Breadcrumb.Item>Профиль</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to={'/profile/seller'} exact={true}>
                    <Breadcrumb.Item>Cтраница продавца</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Управление товарами</Breadcrumb.Item>
            </Breadcrumb>
            <div className={'row m-0 justify-content-between'}>
                <div className={'col-10 p-0'}>
                    <GoodsListOwner  />
                </div>
                <ProfileMenu/>
            </div>
        </section>
    }
}