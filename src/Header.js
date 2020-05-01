import React from "react";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import logo from './media/pp258.png'
import {Badge, Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";

export default function Header() {
    return (
        <header>
            <Navbar bg={'gradient07'} expand={'lg'} className={'p-0'}>
                <div className={'container p-0'}>
                    <Navbar.Brand href={'/'}>
                        <img className="logo_img d-inline-block align-top" src={logo} alt="PayPlay"/>
                    </Navbar.Brand>
                        <HeaderMenu/>
                    <Form className={'input-group mx-4'}>
                        <FormControl type={'text'} placeholder={'Введите название продукта'}
                                     aria-describedby="basic-addon2"/>
                        <Button className="input-group-addon pull-right br-l-0" type="button">
                            <span aria-hidden={true} className={'glyphicon glyphicon-search'}/>
                        </Button>
                    </Form>
                    <Nav className={'mx-4'}>
                        <Nav.Link className={'notification notification__favourites mx-3 lg'} href={''}>
                                <span aria-hidden={true} className={'glyphicon glyphicon-heart'}/>
                                <Badge className={'badge-primary rounded-circle'}>2</Badge>
                        </Nav.Link>
                        <Nav.Link className={'notification notification__messages mx-3'} href={''}>
                            <span aria-hidden={true} className={'glyphicon glyphicon-envelope'}/>
                            <Badge className={'badge-primary rounded-circle'}>2</Badge>
                        </Nav.Link>
                        <Nav.Link className={'notification notification__cart mx-3'} href={''}>
                            <span aria-hidden={true} className={'glyphicon glyphicon-shopping-cart'}/>
                            <Badge className={'badge-primary rounded-circle'}>2</Badge>
                        </Nav.Link>
                    </Nav>
                    <Nav.Link href={'profile'} className={'btn btn-primary ml-4'}>
                        <span className={'large-label'}>
                            Войти
                            <span className={'glyphicon glyphicon-user ml-2'} aria-hidden={true}/>
                        </span>
                    </Nav.Link>
                </div>
            </Navbar>
        </header>
    );
}