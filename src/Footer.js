import React from "react";
import {Dropdown, DropdownButton, Nav} from "react-bootstrap";
import {HashRouter} from "react-router-dom";

export default function Footer() {
    return (
        <footer className={'page-footer fixed-bottom shadow-sm border border-top-1 p-2 bg-white'}>
            <div className={'container d-flex justify-content-center'}>
                <HashRouter>
                    <Nav>
                        <DropdownButton drop={'up'} variant={'link btn-block text-left'} id={'seller'} title={'Продавцам'}>
                            <Dropdown.Item href={'#'}>1</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton drop={'up'} variant={'link btn-block text-left'} id={'buyer'} title={'Покупателям'}>
                            <Dropdown.Item href={'#'}>1</Dropdown.Item>
                        </DropdownButton>
                        <Nav.Link href={''} className={'btn btn-link'}>
                            О нас
                        </Nav.Link>
                    </Nav>
                </HashRouter>
            </div>
        </footer>
    );
}