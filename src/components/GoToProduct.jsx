import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function GoToProduct({ product }) {
    const history = useHistory();

    return (
        <>
            <Button
                variant="contained"
                size="large"
                title="Discover"
                onClick={() => {
                    let path = `/products/${product.permalink}`;
                    history.push(path);
                }}
            >
                Shop Now
            </Button>
        </>
    );
}

export default GoToProduct;
