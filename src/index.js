import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./pages/main/Main"
import ErrorPath from "./components/Errors/ErrorPath/ErrorPath";
import Category from "./pages/category/Category";
import './settings';
import BreadcrumbFormatted from "./components/BreadcrumbFormatted/BreadcrumbFormatted";
import ProductPage from "./pages/product/ProductPage";
import {useParams} from "react-router-dom";

ReactDOM.render(
    <>
        <Router>
            <Header/>
            <main className="mt-5 main">
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path={'/catalog/:category/:product'} component={() => <ProductPage slug={useParams().product}/>}/>
                    <Route path='/catalog' component={Category}/>
                    <Route path='/' component={ErrorPath}/>
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
