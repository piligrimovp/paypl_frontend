import React, {Component} from 'react';
import BreadcrumbFormatted from "../../components/BreadcrumbFormatted/BreadcrumbFormatted";
import {Badge, Button, ButtonGroup, ButtonToolbar, Carousel, OverlayTrigger, Tooltip} from "react-bootstrap";
import {array} from "prop-types";

export default class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        fetch(window.HOST + "/productDetail", {
            method: 'POST',
            body: JSON.stringify({
                slug: this.props.slug
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(typeof data.product)
                this.setState({
                    loading: false,
                    product: typeof data.product === "object" ? data.product : []
                })
            });
    }

    renderProduct() {
        return <>
            <section className={'container p-0'}>
                <BreadcrumbFormatted/>
                <div className={'row m-0 p-0 justify-content-between'}>
                    <div className={'col-3 mt-5'}>
                        <Carousel className={'carouselProduct bg-secondary row align-items-center p-0'}>
                            {this.state.product.media.map((image, index) => {
                                return <Carousel.Item key={image.id} className={'col'}>
                                    <img src={image.link} alt={image.id} className={'img-fluid d-block mx-auto'}/>
                                    {image.description.length > 0 && <Carousel.Caption>
                                        <p>{image.description}</p>
                                    </Carousel.Caption>}
                                </Carousel.Item>
                            })}
                        </Carousel>
                    </div>
                    <div className={'col-5'}>
                        <h1>{this.state.product.name}</h1>
                        <article>
                            {this.state.product.description}
                        </article>
                    </div>
                    <div className={'col-3 mt-5 p-0'}>
                        <div className={''}>
                            {this.state.product.discount !== null ?
                                <>
                                    <h1>
                                        <OverlayTrigger placement={'bottom'} overlay={
                                            <Tooltip id={`tooltip-${this.state.product.discount}`}>
                                                <strong>Цена со скидкой!</strong>.
                                            </Tooltip>
                                        }>
                                        <Badge variant={'danger'} className={'price'}>
                                            {this.state.product.discount}, руб
                                            <h3 className={'old_price'}>
                                                <OverlayTrigger placement={'bottom'} overlay={
                                                    <Tooltip id={`tooltip-${this.state.product.price}`}>
                                                        <strong>Cтарая цена</strong>.
                                                    </Tooltip>
                                                }>
                                                <Badge variant={'light'}><s>{this.state.product.price}</s></Badge>
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
                        <ButtonToolbar vertical className={'w-75'}>
                            {/*
                                ToDo: не работает кнопка в корзину
                            */}
                            <Button type={'button'} variant={'outline-primary btn-block'}>В корзину</Button>
                            {/*
                                ToDo: не работает кнопка написать продавцу
                            */}
                            <Button type={'button'} variant={'outline-primary btn-block mt-2'}>Написать
                                продавцу</Button>
                        </ButtonToolbar>
                    </div>
                </div>
            </section>
        </>;
    }

    render() {
        if (this.state.loading || this.state.product.length === 0) {
            return <section className={'container p-0'}><BreadcrumbFormatted/></section>
        } else {
            return this.renderProduct()
        }
    }
}
