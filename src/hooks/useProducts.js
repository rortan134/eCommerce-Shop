import { commerce } from "../lib/commerce";
import { useEffect, useState } from "react";

export default function useProducts(method, payload) {
    const [products, setProducts] = useState();

    useEffect(() => {
        console.log("request:", method, payload);
            const getProducts = async () => {
                if (method && payload) {
                    const { data } = await commerce.products.list({ [method.toString()]: payload });
                    setProducts(data);
                } else {
                    const { data } = await commerce.products.list();
                    setProducts(data);
                    
                }
            };
            getProducts();
    }, [method, payload]);

    return products;
}
