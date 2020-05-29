import {useEffect, useState} from 'react';

export default function Orders(pageNumber, count, login, mode, order) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch(window.HOST + "/orders", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                page: pageNumber,
                count: count,
                mode: mode,
                login: login,
                order: order
            }),
        })
            .then(response => response.json())
            .then(data => {
                setOrders(prevOrders => {
                    return [...new Set([...prevOrders, ...data])];
                });
                setHasMore(data.length > 0);
                setLoading(false);
            })
            .catch(e => {
                setError(true);
            });
    }, [count, login, mode, order, pageNumber]);
    return {loading, error, orders, hasMore};
}