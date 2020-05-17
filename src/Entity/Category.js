import {useEffect, useState} from 'react';

export default function Category(pageNumber = 1, count = 20, categorySlug = '') {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategory] = useState([]);
    const [products, setProduct] = useState([]);
    const [pages, setPage] = useState(0);

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch(window.HOST + "/category", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                page: pageNumber,
                count: count,
                category: categorySlug,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setCategory(data.categories);
                setProduct(data.products);
                setPage(data.pages);
                setLoading(false);
            })
            .catch(e => {
                setError(true);
            });
    }, [categorySlug, count, pageNumber]);
    return {loading, error, categories, products, pages};
}