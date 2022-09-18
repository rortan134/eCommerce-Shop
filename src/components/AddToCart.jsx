import { Button } from "@mui/material";
import { useContext } from "react";

import CommerceHandler from "../contexts/commerce-context";

function AddToCart({ product, amount }) {
    const commerceHandling = useContext(CommerceHandler);

    return (
        <>
            <Button
                variant="contained"
                size="large"
                title="Add To Cart"
                disabled={commerceHandling.itemAddedToCart ? true : false}
                onClick={() => {
                    if (!commerceHandling.itemAddedToCart) {
                        commerceHandling.addToCart(product.id, amount ? amount : 1);
                    } else return;
                }}
            >
                {commerceHandling.itemAddedToCart ? "Added To Cart!" : "Add To Cart"}
            </Button>
        </>
    );
}

export default AddToCart;
