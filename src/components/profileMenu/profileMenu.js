import React from "react";
import {ButtonToolbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {createAuthProvider} from "../../Entity/AuthProvider";

export const {getUser} = createAuthProvider();

export default function ProfileMenu() {
    return <div className={'col-2 p-0'}>
        {!getUser().seller &&
        <ButtonToolbar className={'w-100'}>
            {/*
                                ToDo: не работают кнопки
                            */}
            <Link className={'btn btn-outline-primary btn-block'} to={'/profile/seller'}>Стать продавцом</Link>
        </ButtonToolbar>
        }
        {
            getUser().seller &&
            <ButtonToolbar className={'w-100'}>
                {/*
                                ToDo: не работает кнопка страница продавца
                            */}
                <Link className={'btn btn-outline-primary btn-block'} to={'/profile/seller'}>Страница продавца</Link>
                <Link className={'btn btn-outline-primary btn-block mt-4'} to={'/profile/addProduct'}>Добавить товар</Link>
                <Link className={'btn btn-outline-primary btn-block'} to={'/profile'}>Управление товарами</Link>
            </ButtonToolbar>
        }
    </div>
}