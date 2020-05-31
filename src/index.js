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
import Profile from "./pages/profile/Profile";
import AdminProfile from "./pages/profile/admin/AdminProfile";
import Payment from "./pages/profile/payment/Payment";

ReactDOM.render(
    <>
        <Router>
            <Header/>
            <main className="pt-5 main mb-5">
                <Switch>
                    <Route exact path={'/'} component={MainPage}/>
                    <Route path={'/catalog/:category/:product'} component={() => <ProductPage slug={useParams().product}/>}/>
                    <Route path={'/catalog/:category'} component={CategoryPage}/>
                    <Route exact path={'/catalog'} component={CategoryPage}/>
                    <Route exact path={'/about'} component={AboutPage}/>
                    <Route path={'/profile'} component={Profile} />
                    <Route path={'/admin'} component={AdminProfile} />
                    <Route path={'/payment'} component={Payment} />
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
