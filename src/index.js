import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MainPage from "./pages/main/MainPage";
import ErrorPath from "./components/Errors/ErrorPath/ErrorPath";
import CategoryPage from "./pages/category/CategoryPage";
import './settings';
import ProductPage from "./pages/product/ProductPage";
import AboutPage from "./pages/about/AboutPage";
import {createAuthProvider} from "./Entity/AuthProvider";
import AuthPage from "./pages/profile/auth/AuthPage";
import ProfilePage from "./pages/profile/profile/ProfilePage";
import ProfileCart from "./pages/profile/cart/ProfileCart";
import ProfileSellerPage from "./pages/profile/seller/ProfileSellerPage";
import CreateProduct from "./pages/profile/product/CreateProduct";
import Sellers from "./pages/profile/admin/sellers/Sellers";
import PaymentSuccess from "./pages/profile/payment/success/PaymentSuccess";
import PaymentFail from "./pages/profile/payment/fail/PaymentFail";

export const {getUser} = createAuthProvider();
let user = !!getUser();
let seller = getUser() && getUser().seller;
let admin = getUser() && getUser().is_admin;

ReactDOM.render(
    <>
        <Router>
            <Header/>
            <main className="pt-5 main mb-5">
                <Switch>
                    <Route exact path={'/'} component={MainPage}/>
                    <Route path={'/catalog/:category/:product'}
                           component={() => <ProductPage slug={useParams().product}/>}/>
                    <Route path={'/catalog/:category'} component={CategoryPage}/>
                    <Route exact path={'/catalog'} component={CategoryPage}/>
                    <Route exact path={'/about'} component={AboutPage}/>

                    {!user && <Route path={'/profile'} component={AuthPage}/>}

                    {user && <Route exact={true} path={'/profile'} component={ProfilePage}/>}
                    {user && <Route exact={true} path={'/profile/cart'} component={ProfileCart}/>}

                    {seller && <Route exact={true} path={'/profile/seller'} component={ProfileSellerPage}/>}
                    {seller && <Route exact={true} path={'/profile/addProduct'} component={CreateProduct}/>}
                    {seller && <Route exact={true} path={'/profile/products'} component={ProfilePage}/>}

                    {admin && <Route exact={true} path={'/admin/sellers'} component={Sellers}/>}

                    <Route path={'/payment/success'} component={PaymentSuccess}/>
                    <Route path={'/payment/fail'} component={PaymentFail}/>

                    <Route path={'/'} component={ErrorPath}/>
                </Switch>
            </main>
            <Footer/>
        </Router>
    </>
    ,
    document.getElementById('page')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
