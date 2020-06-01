import React, {useState, useRef, useCallback} from "react";
import Goods from '../../Entity/Goods';
import ProgressBar from "../PropgressBar/PropgressBar";
import ErrorLoading from "../Errors/ErrorLoading/ErrorLoading";
import {Link} from "react-router-dom";

export default function GBlockGoods(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const {loading, error, goods, hasMore} = Goods(pageNumber, 20, props.mode);
    const observer = useRef();

    const lastGoodRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        if (node) observer.current.observe(node)
    }, [loading, hasMore]);

    return (
        <div className="col g-block text-center m-1 p-3">
            <h3>{props.title}</h3>
            <div className="g-block_goods row justify-content-between">
                {loading && <ProgressBar isAnimating={loading}/>}
                {goods.map((good, index) => {
                    let body = <>
                        <img src={good.media_link}
                             alt="" className="goods-small_image"/>
                        <div className="goods-small_info d-inline-block">
                            <span className="medium-label" data-toggle="tooltip" data-placement="bottom"
                                  title={good.name}>
                                <b>{good.name}</b>
                            </span>
                            <span className="medium-label">{good.price} руб.</span>
                        </div>
                    </>;
                    let goodBlock = null;
                    if (goods.length === index + 1) {
                        goodBlock = <div ref={lastGoodRef} key={good.slug} className="goods-small p-0"
                                         data-id={good.slug}>
                            {body}
                        </div>
                    } else {
                        goodBlock = <div key={good.slug} className="goods-small p-0" data-id={good.slug}>
                            {body}
                        </div>
                    }
                    return <Link key={good.slug} className={'btn-link'} to={'/catalog/' + good.category_slug + '/' + good.slug}>
                        {goodBlock}
                    </Link>
                })}
                {error && <ErrorLoading/>}
            </div>
        </div>
    );
}