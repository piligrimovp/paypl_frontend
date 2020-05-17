import React from "react";
import {Dropdown, DropdownButton, Nav} from "react-bootstrap";
import {HashLink as Link} from "react-router-hash-link";

export default function Footer() {
    return (
        <footer className={'page-footer fixed-bottom shadow-sm border border-top-1 p-2 bg-white'}>
            <div className={'container d-flex justify-content-center'}>
                <Nav>
                    <DropdownButton drop={'up'} variant={'link btn-block text-left'} id={'seller'} title={'Продавцам'}>
                        <Dropdown.Item as={'div'} className={'p-0'}>
                            <Link to={'/about#sellers_info'} className={'btn btn-block btn-link'}>
                                Какая-то информация
                            </Link>
                        </Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton drop={'up'} variant={'link btn-block text-left'} id={'buyer'} title={'Покупателям'}>
                        <Dropdown.Item as={'div'} className={'p-0'}>
                            <Link to={'/about#buyers_info'} className={'btn btn-block btn-link'}>
                                Небольшая информация
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item as={'div'} className={'p-0'}>
                            <Link to={'/about#buyers_more_info'} className={'btn btn-block btn-link'}>
                                Еще информация
                            </Link>
                        </Dropdown.Item>
                    </DropdownButton>
                    <Link to={'about'} className={'btn btn-link'}>О нас</Link>
                </Nav>
            </div>
        </footer>
    );
}