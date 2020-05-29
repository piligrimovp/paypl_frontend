import React from "react";
import {createAuthProvider} from "../../../Entity/AuthProvider";
import {Accordion, Breadcrumb, Button, ButtonToolbar, Card, Form, Image} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import EditField from "../../../components/Edit/EditField/EditField";
import {Link} from "react-router-dom";
import EditImage from "../../../components/Edit/EditImage/EditImage";
import EditPassword from "../../../components/Edit/EditPassword";
import ProfileMenu from "../../../components/profileMenu/profileMenu";
import Orders from "../../../components/Orders/Orders";

export const {logout,getUser, updateUser, getUserDetail, authFetch} = createAuthProvider();

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount()
    {
        authFetch(window.HOST + '/profile/detail',{method:'POST'})
            .then(response => response.json())
            .then(data => {
                console.log(data)
            });
    }

    render(): React.ReactNode {
        return <>
            <section className={'container pb-5 p-0'}>
                <Breadcrumb className={'mb-4'}>
                    <LinkContainer to={'/'} exact={true}>
                        <Breadcrumb.Item>Главная</Breadcrumb.Item>
                    </LinkContainer>
                    <Breadcrumb.Item active>Профиль</Breadcrumb.Item>
                </Breadcrumb>
                <div className={'row m-0 justify-content-between'}>
                    <div className={'col-10 p-0'}>
                        <div className={'row'}>
                            <div className={'col-3 profile-avatar'}>
                                <EditImage name={'avatar'} circle={true} value={getUser().avatar} saveFunction={()=> {}} />
                            </div>
                            <div className={'col-9'}>
                                <div className={'row'}>
                                    <EditField saveFunction={updateUser} name={'name'} label={'Имя:'} type={'text'} text={getUser().name} />
                                    <EditField saveFunction={updateUser} name={'login'} label={'Логин:'} type={'text'} text={''} />
                                    <EditField saveFunction={updateUser} name={'login'} label={'Email:'} type={'email'} text={''} />
                                    <EditPassword name={'password'} saveFunction={()=>{}}/>
                                </div>
                            </div>
                        </div>
                        <div className={'row mt-5 justify-content-center w-auto'}>
                            <Orders  />
                        </div>
                    </div>
                    <ProfileMenu/>
                </div>
            </section>
        </>
    }
}