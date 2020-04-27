import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./pages/main/Main"
import ErrorPath from "./components/Errors/ErrorPath/ErrorPath";
import Category from "./pages/category/category";

window.HOST = 'http://paypl/api';

ReactDOM.render(
    <>
        <BrowserRouter>
            <Header/>
            <main className="container">
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/category/:subcategory' component={Category}/>
                    <Route path='/' component={ErrorPath}/>
                </Switch>
            </main>
            <Footer/>
        </BrowserRouter>
    </>
    ,
    document.getElementById('page')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
