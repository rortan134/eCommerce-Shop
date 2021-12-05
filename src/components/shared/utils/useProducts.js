import { commerce } from "../../../lib/commerce";
import { useEffect, useState } from "react";

export default function useProducts( method, payload ) {
    const [products, setProducts] = useState();

    useEffect(() => {
        if (method && payload) {
            const getProducts = async () => {
                const { data } = await commerce.products.list({ [method.toString()]: payload });
                setProducts(data);
            };
            getProducts();
        }
    }, [method, payload]);

    return products;
}