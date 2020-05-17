import React, {useState} from "react";
import BreadcrumbFormatted from "../../components/BreadcrumbFormatted/BreadcrumbFormatted";
import {Link, useParams} from "react-router-dom";
import {Pagination} from "react-bootstrap";
import Category from "../../Entity/Category";
import ProgressBar from "../../components/PropgressBar/PropgressBar";

export default function CategoryPage(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const {loading, categories, products, pages} = Category(pageNumber, 48, useParams().category);

    return <>
        <section className={'container-fluid no-gutters p-0'}>
            <div className={'col-2 float-left filter border border-top-0'}>
                <menu className={'mt-5 px-3'}>
                    <div className={'text-wrap text-break list-group list-group-flush'}>
                        {!loading && categories.map((category, index) => {
                            return <Link key={index} className={'btn btn-link'} to={`/catalog/${category.slug}`}>
                                {category.name}
                            </Link>
                        })
                        }
                    </div>
                </menu>
            </div>
            <div className={'col-8 container pl-2'}>
                <BreadcrumbFormatted />
                <div className="row m-0">
                    {loading && <ProgressBar isAnimating={loading}/>}
                    <div className={'row justify-content-between m-0 w-100'}>
                    {products && products.map((product, index) => {
                        return <Link key={index} className={'btn-link'}
                              to={'/catalog/' + product.category_slug + '/' + product.slug}>
                            <div className="goods-medium">
                                <div className="goods-medium_header">
                                    <img src={product.media_link} className="goods-medium_header_image" alt=""/>
                                    <div className="goods-medium_info d-inline-block">
                            <span className="medium-label" data-toggle="tooltip" data-placement="bottom"
                                  title={product.name}>
                                {product.name}
                            </span>
                                        <span className="medium-label">{product.price}, руб.</span>
                                    </div>
                                </div>
                                <div className="goods-medium_description">
                                    <span className="tiny-text">{product.description}</span>
                                </div>
                            </div>
                        </Link>
                    })}
                    </div>
                    {pages > 1 && <Pagination className={'float-left my-4'}>
                        {Array.from(Array(pages), (e, i) => {
                            return <Pagination.Item key={i} active={i + 1 === pageNumber}
                                                    onClick={() => setPageNumber(i + 1)}>
                                {i + 1}
                            </Pagination.Item>
                        } )}
                    </Pagination>}
                </div>
            </div>
        </section>
    </>
}