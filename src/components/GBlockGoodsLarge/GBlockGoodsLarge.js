import React, {useState, useRef, useCallback} from "react";
import Goods from '../../Entity/Goods';
import ProgressBar from "../PropgressBar/PropgressBar";
import ErrorLoading from "../Errors/ErrorLoading/ErrorLoading";

export default function GBlockGoodsLarge(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const {loading, error, goods, hasMore} = Goods(pageNumber, 50, props.mode);
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
        <div className="g-large-block row justify-content-between m-0">
            {loading && <ProgressBar isAnimating={loading}/>}
            {goods.map((good, index) => {
                let body = <>
                    <div className="goods-medium_header">
                        <img src={good.media_link} className="goods-medium_header_image" alt=""/>
                        <div className="goods-medium_info d-inline-block">
                            <span className="medium-label"  data-toggle="tooltip" data-placement="bottom"
                                  title={good.name}>
                                {good.name}
                            </span>
                            <span className="medium-label">{good.price}, руб.</span>
                        </div>
                    </div>
                    <div className="goods-medium_description">
                        <span className="tiny-text">{good.description}</span>
                    </div>
                </>;
                if (goods.length === index + 1) {
                    return <div ref={lastGoodRef} key={good.id} className="goods-medium" data-id={good.id}>
                        {body}
                    </div>
                }
                return <div key={good.id} className="goods-medium" data-id={good.id}>
                    {body}
                </div>
            })}
            {error && <ErrorLoading />}
        </div>
    );
}