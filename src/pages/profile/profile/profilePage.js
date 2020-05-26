import React from "react";
import {createAuthProvider} from "../../../Entity/AuthProvider";
import {Breadcrumb, Button, ButtonToolbar, Form, Image} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import EditField from "../../../components/Edit/EditField/EditField";
import {Link} from "react-router-dom";

export const {logout,getUser, updateUser} = createAuthProvider();

export default function ProfilePage() {
    return <>
        <section className={'container pb-5 p-0'}>
            <Breadcrumb className={'mb-4'}>
                <LinkContainer to={'/'} exact={true}>
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Профиль</Breadcrumb.Item>
            </Breadcrumb>
            <div className={'row'}>
                <div className={'col'}>
                    <Image className={'profile-avatar'} src={getUser().avatar} roundedCircle/>
                </div>
                <div className={'col-7'}>
                    <div className={'row'}>
                        <EditField saveFunction={updateUser} name={'name'} edit={false} label={'Имя:'} type={'text'} text={getUser().name} />
                    </div>
                </div>
                <div className={'col-3 pl-5'}>
                    <ButtonToolbar className={'w-100'}>
                        {/*
                                ToDo: не работает кнопка стать продавцом
                            */}
                        <Link className={'btn btn-outline-primary btn-block'} to={'/profile'}>Стать продавцом</Link>
                        {/*
                                ToDo: не работает кнопка страница продавца
                            */}
                        <Link className={'btn btn-outline-primary btn-block mt-2'} to={'/profile'}>Страница продавца</Link>
                    </ButtonToolbar>
                </div>
            </div>
        </section>
    </>
}