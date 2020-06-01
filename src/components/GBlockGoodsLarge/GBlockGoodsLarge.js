import React, {useState, useRef, useCallback} from "react";
import Goods from '../../Entity/Goods';
import ProgressBar from "../PropgressBar/PropgressBar";
import ErrorLoading from "../Errors/ErrorLoading/ErrorLoading";
import {Link} from "react-router-dom";
import EditorJS from "react-editor-js";

export default function GBlockGoodsLarge(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const {loading, error, goods, hasMore} = Goods(pageNumber, 48, props.mode);
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

    const isJson = (item) => {
        try{
            JSON.parse(item);
            return true;
        } catch (e) {
            return false;
        }
    }

    return (
        <div className="g-large-block row justify-content-between m-0">
            {loading && <ProgressBar isAnimating={loading}/>}
            {goods.map((good, index) => {
                let body = <>
                    <div className="goods-medium_header">
                        <img src={good.media_link} className="goods-medium_header_image" alt=""/>
                        <div className="goods-medium_info d-inline-block">
                            <span className="medium-label" data-toggle="tooltip" data-placement="bottom"
                                  title={good.name}>
                                <b>{good.name}</b>
                            </span>
                            <span className="medium-label">{good.price} руб.</span>
                        </div>
                    </div>
                    <div className="goods-medium_description">
                        <span className="tiny-text">
                            {!isJson(good.description) && good.description}
                        </span>
                        {isJson(good.description) &&
                        <> <EditorJS holder={'editor-'+index} tools={window.TOOLS} data={{blocks:JSON.parse(good.description)}}/>
                        <div id={'editor-'+index} /></>}
                    </div>
                </>;
                let goodBlock = null;
                if (goods.length === index + 1) {
                    goodBlock = <div ref={lastGoodRef} key={good.slug} className="goods-medium m-0" data-id={good.slug}>
                        {body}
                    </div>
                } else {
                    goodBlock = <div key={good.slug} className="goods-medium" data-id={good.slug}>
                        {body}
                    </div>;
                }
                return <Link key={good.slug} className={'btn-link g-block mb-3'}
                             to={'catalog/' + good.category_slug + '/' + good.slug}>
                    {goodBlock}
                </Link>
            })}
            {error && <ErrorLoading/>}
        </div>
    );
}