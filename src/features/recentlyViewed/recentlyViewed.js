import { useState, useEffect } from "react";

function recentlyViewed(productId) {
    const [recent, setRecent] = useState([]);

    useEffect(() => {
        // if (!recent.includes(productId)) setRecent((prevProducts) => [...prevProducts, productId]);
        console.log(productId);
    }, []);

    return recent;
}

export default recentlyViewed;
