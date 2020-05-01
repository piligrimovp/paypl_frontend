import React from "react";
import {Dropdown, DropdownButton, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className={'page-footer fixed-bottom shadow-sm border border-top-1 p-2 bg-white'}>
            <div className={'container d-flex justify-content-center'}>
                <Nav>
                    <DropdownButton drop={'up'} variant={'link btn-block text-left'} id={'seller'} title={'Продавцам'}>
                        <Dropdown.Item as={'div'} className={'p-0'}>
                            <Link to={''} className={'btn btn-block btn-link'}>1</Link>
                        </Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton drop={'up'} variant={'link btn-block text-left'} id={'buyer'} title={'Покупателям'}>
                        <Dropdown.Item as={'div'} className={'p-0'}>
                            <Link to={'#'} className={'btn btn-block btn-link'}>2</Link>
                        </Dropdown.Item>
                    </DropdownButton>
                    <Link to={'#'} className={'btn btn-link'}>О нас</Link>
                </Nav>
            </div>
        </footer>
    );
}