import { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";

// Fetch products inside any component
// Usage:
// const { products, error } = useProducts("category_slug", "your-category-slug");

export default function useProducts(method, payload) {
    const [products, setProducts] = useState();
    const [error, setError] = useState(null)

    useEffect(() => {
            const getProducts = async () => {  
                    try {
                        if (method && payload) {
                            const { data } = await commerce.products.list({ [method.toString()]: payload });
                            setProducts(data); 
                        } else {
                            const { data } = await commerce.products.list();
                            setProducts(data); 
                        }
                    } catch(error) {
                        setError(error);
                    }
            };
            getProducts();
    }, [method, payload]);

    return { products, error };
}
