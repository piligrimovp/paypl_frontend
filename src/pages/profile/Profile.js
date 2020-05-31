import React from "react";
import {Route} from "react-router-dom";
import {createAuthProvider} from "../../Entity/AuthProvider";
import AuthPage from "./auth/AuthPage";
import ProfilePage from "./profile/ProfilePage";
import ProfileSellerPage from "./seller/ProfileSellerPage";
import CreateProduct from "./product/CreateProduct";
import ErrorPath from "../../components/Errors/ErrorPath/ErrorPath";
import ProfileCart from "./cart/ProfileCart";

export const {useAuth, authFetch, login, getUser} = createAuthProvider();

export default function Profile() {
    return (
        <>
            {!useAuth() && <Route path={'/profile'} component={AuthPage}/>}
            {useAuth() && <>
                <Route exact={true} path={'/profile'} component={ProfilePage}/>
                <Route exact={true} path={'/profile/cart'} component={ProfileCart}/>
            </>}
            {
                (useAuth() && getUser().seller) &&
                <>
                    <Route exact={true} path={'/profile/seller'} component={ProfileSellerPage}/>
                    <Route exact={true} path={'/profile/addProduct'} component={CreateProduct}/>
                    <Route exact={true} path={'/profile/products'} component={ProfilePage}/>
                </>
            }
            <Route path={'/'} component={ErrorPath}/>
        </>
    );
}