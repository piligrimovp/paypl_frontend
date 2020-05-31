import React, {useState} from "react";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import logo from './media/pp258.png'
import {
    Badge,
    Button,
    Dropdown,
    DropdownButton,
    Form,
    FormControl,
    Nav,
    Navbar,
} from "react-bootstrap";
import {createAuthProvider} from "./Entity/AuthProvider";
import {Link} from "react-router-dom";

export const {useAuth, authFetch, login, logout, getUser} = createAuthProvider();

export default function Header() {
    const [cart, setCart] = useState(0);

    if(useAuth()) {
        authFetch(window.HOST + '/orders/buyer', {
            method: 'POST',
            body: JSON.stringify({
                status_id: 10
            })
        }).then(response => response.json())
            .then(data => {
                setCart(data.length)
            });
    }

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
                        {/*<Nav.Link className={'notification notification__favourites mx-3 lg'} href={''}>
                            <span aria-hidden={true} className={'glyphicon glyphicon-heart'}/>
                            <Badge className={'badge-primary rounded-circle'}>2</Badge>
                        </Nav.Link>*/}
                        <Nav.Link className={'notification notification__messages mx-3'} href={''}>
                            <span aria-hidden={true} className={'glyphicon glyphicon-envelope'}/>
                            <Badge className={'badge-primary rounded-circle'}>2</Badge>
                        </Nav.Link>
                        <Nav.Link as={Link} className={'notification notification__cart mx-3'} to={'/profile/cart'}>
                            <span aria-hidden={true} className={'glyphicon glyphicon-shopping-cart'}/>
                            <Badge className={'badge-primary rounded-circle'}>{cart}</Badge>
                        </Nav.Link>
                    </Nav>
                    {
                        !useAuth() ?
                            <Link to={'/profile'} className={'btn btn-primary ml-4'}>
                                <span className={'large-label'}>
                                        Войти
                                        <span className={'glyphicon glyphicon-user ml-2'} aria-hidden={true}/>
                                    </span>
                            </Link>
                            :
                            <DropdownButton placement={'bottom'}
                                            variant={'primary text-left btn-profile no-dropdown-toggle-content'} title={
                                <span data-toggle="tooltip" data-placement="left"
                                      title={getUser().name}>
                                                    {getUser().name}
                                                </span>} id={'profile_dropdown'}>
                                <Dropdown.Item as={'div'} className={'p-0'}>
                                    <Link to={'/profile'} className={'btn btn-block btn-link text-left'}>
                                        Профиль
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item as={'div'} className={'p-0'}>
                                    <Button variant={'link'} className={'btn-block text-left'} onClick={logout}>
                                        Выйти
                                    </Button>
                                </Dropdown.Item>
                            </DropdownButton>
                    }
                </div>
            </Navbar>
        </header>
    );
}