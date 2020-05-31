import React, {Component} from 'react';
import BreadcrumbFormatted from "../../components/BreadcrumbFormatted/BreadcrumbFormatted";
import {Alert, Badge, Button, ButtonToolbar, Carousel, OverlayTrigger, Tooltip} from "react-bootstrap";
import ProgressBar from "../../components/PropgressBar/PropgressBar";
import EditorJS from "react-editor-js";
import {createAuthProvider} from "../../Entity/AuthProvider";
import {Link} from "react-router-dom";

export const {authFetch, getUser} = createAuthProvider();

export default class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            loading: false,
            error: {
                status: false,
                message: ''
            }
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        authFetch(window.HOST + "/productDetail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                slug: this.props.slug
            }),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    product: typeof data === "object" ? data : []
                })
            });
    }

    isJson = (item) => {
        try {
            JSON.parse(item);
            return true;
        } catch (e) {
            return false;
        }
    }

    addCart = () => {
        this.setState({
            error: {
                ...this.state.error,
                status: false
            }
        })
        authFetch(window.HOST + "/orders/store", {
            method: "POST",
            body: JSON.stringify({slug: this.state.product.slug})
        }).then(respone => respone.json())
            .then(data => {
                if (data.status === 'success') {
                    this.setState({
                        product: {
                            ...this.state.product,
                            in_order: true
                        }
                    });
                }
                if (data.status === 'error') {
                    this.setState({
                        error: {
                            status: true,
                            message: 'Ошибка добавления'
                        }
                    })
                }
            }).catch(error => {
            this.setState({
                error: {
                    status: true,
                    message: 'Ошибка добавления'
                }
            })
        })
    }

    renderProduct() {
        const render_badge = () => {
            if (!this.state.product.is_deleted)
                return <>
                    <div>
                        {this.state.product.discount !== null ?
                            <>
                                <h1>
                                    <OverlayTrigger placement={'bottom'} overlay={
                                        <Tooltip id={`tooltip-${this.state.product.discount}`}>
                                            <strong>Цена со скидкой!</strong>.
                                        </Tooltip>
                                    }>
                                        <Badge variant={'success'} className={'price'}>
                                            {this.state.product.discount}, руб
                                            <h3 className={'old_price'}>
                                                <OverlayTrigger placement={'bottom'} overlay={
                                                    <Tooltip id={`tooltip-${this.state.product.price}`}>
                                                        <strong>Cтарая цена</strong>.
                                                    </Tooltip>
                                                }>
                                                    <Badge variant={'danger'}>{this.state.product.price}</Badge>
                                                </OverlayTrigger>
                                            </h3>
                                        </Badge>
                                    </OverlayTrigger>
                                </h1>
                            </> :
                            <h1><Badge variant={'light'} className={'price'}>
                                {this.state.product.price}, руб
                            </Badge></h1>}
                    </div>
                    <ButtonToolbar className={'w-75'}>
                        {this.state.product.in_order && <>
                            <Button type={'button'} disabled variant={'outline-primary btn-block'}>
                                Товар добавлен в корзину</Button>
                        </>}
                        {/*
                                ToDo: не работает кнопка в корзину
                            */}
                        {!this.state.product.in_order && getUser() &&
                        <Button type={'button'} variant={'outline-primary btn-block'}
                                onClick={this.addCart}>В корзину</Button>}
                        {!this.state.product.in_order && !getUser() &&
                        <Link className={'btn btn-outline-primary btn-block'} to={'/profile'}>В корзину</Link>}
                        {/*
                                ToDo: не работает кнопка написать продавцу
                            */}
                        <Button type={'button'} variant={'outline-primary btn-block mt-2'}>Написать
                            продавцу</Button>
                    </ButtonToolbar>
                </>
            else {
                return <div>
                    <h1><Badge variant={'danger'} className={'price'}>Товар удален</Badge></h1>
                </div>
            }
        }

        if (this.state.loading || this.state.product.length === 0) {
            return <></>
        }

        let isJson = this.isJson(this.state.product.description);
        return <>
            {this.state.error.status &&
            <div className={'row m-0'}><Alert className={'m-auto'} variant={'danger'}>
                {this.state.error.message}</Alert></div>}
            <div className={'row m-0 p-0 justify-content-between'}>
                <div className={'col-3 mt-5'}>
                    <Carousel className={'carouselProduct bg-secondary row align-items-center p-0'}>
                        {this.state.product.media.map((image, index) => {
                            return <Carousel.Item key={image.id} className={'col'}>
                                <img src={image.link} alt={image.id} className={'img-fluid d-block mx-auto'}/>
                                {image.description && <Carousel.Caption>
                                    <p>{image.description}</p>
                                </Carousel.Caption>}
                            </Carousel.Item>
                        })}
                    </Carousel>
                </div>
                <div className={'col-5'}>
                    <h1>{this.state.product.name}</h1>
                    <article>
                        {!isJson && this.state.product.description}
                        {isJson && <> <EditorJS tools={window.TOOLS}
                                                data={{blocks: JSON.parse(this.state.product.description)}}/>
                            <div id={'js-editor'}/>
                        </>}
                    </article>
                </div>
                <div className={'col-3 mt-5 p-0'}> {/*Див с ценами и кнопками*/}
                    {render_badge()}
                </div>
            </div>
        </>
            ;
    }

    render() {
        return <section className={'container p-0'}>
            {this.state.loading && <ProgressBar isAnimating={this.state.loading}/>}
            <BreadcrumbFormatted/>
            {this.renderProduct()}
        </section>
    }
}
