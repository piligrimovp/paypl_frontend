import React, {Component} from 'react';
import BreadcrumbFormatted from "../../components/BreadcrumbFormatted/BreadcrumbFormatted";
import {Alert, Badge, Button, ButtonToolbar, Carousel, OverlayTrigger, Tooltip} from "react-bootstrap";
import ProgressBar from "../../components/PropgressBar/PropgressBar";
import EditorJS from "react-editor-js";
import {createAuthProvider} from "../../Entity/AuthProvider";
import {Link} from "react-router-dom";
import Alerts from "../../components/Alerts/Alerts";
import UserMenu from "./menu/UserMenu";
import SellerMenu from "./menu/SellerMenu";
import AdminMenu from "./menu/AdminMenu";

export const {authFetch, getUser} = createAuthProvider();

export default class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            loading: false,
            alerts: []
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
            })
            .catch(error => {
                this.setState({
                    alerts: [
                        ...this.state.alerts,
                        {
                            text: 'Ошибка подключения',
                            status: 'error',
                            close: true
                        }
                    ]
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
                                            {this.state.product.discount} руб
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
                                {this.state.product.price} руб
                            </Badge></h1>}
                    </div>
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
                    {getUser() && getUser().seller && getUser().id === this.state.product.user_id
                    && <SellerMenu product={this.state.product} />}
                    {(!getUser() || (getUser().seller && getUser().id !== this.state.product.user_id))
                    && <UserMenu product={this.state.product}/>}
                    {getUser() && getUser().is_admin && <AdminMenu product={this.state.product} />}
                </div>
            </div>
        </>
            ;
    }

    closeAlert(index) {
        let alerts = this.state.alerts;
        alerts.splice(index, 1);
        this.setState({
            alerts: alerts
        })
    }

    render() {
        return <section className={'container p-0'}>
            <Alerts alerts={this.state.alerts} close={() => this.closeAlert} />
            {this.state.loading && <ProgressBar isAnimating={this.state.loading}/>}
            <BreadcrumbFormatted/>
            {this.renderProduct()}
        </section>
    }
}
