import {useEffect, useState} from 'react';

export default function Goods(pageNumber, count, mode) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [goods, setGoods] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch(window.HOST + "/goodsList", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                page: pageNumber,
                count: count,
                mode: mode,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setGoods(prevGoods => {
                    return [...new Set([...prevGoods, ...data])];
                });
                setHasMore(data.length > 0);
                setLoading(false);
            })
            .catch(e => {
                setError(true);
            });
    }, [count, mode, pageNumber]);
    return {loading, error, goods, hasMore};
}