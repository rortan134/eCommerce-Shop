import { Box, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Product from "../../components/Product";
import CommerceHandler from "../../contexts/commerce-context";

import Toolbar from "./Toolbar";

const useStyles = makeStyles({});

function Products() {
    const styles = useStyles();
    const commerceHandling = useContext(CommerceHandler);
    const history = useHistory();

    const [priceRange, setPriceRange] = useState([0, 4000]);
    const [productFiltered, setFilteredProduct] = useState([]);

    const filterProducts = useCallback(() => {
        setFilteredProduct([]);
        commerceHandling.products.map((product) =>
            product.price.raw >= priceRange[0] && product.price.raw <= priceRange[1]
                ? setFilteredProduct((prevArray) => [...prevArray, product])
                : null
        );
    }, [commerceHandling.products, priceRange]);

    useEffect(() => {
        filterProducts();
    }, [commerceHandling.products]);

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    return (
        <div className={styles.products_container}>
            <Box component="section" className={styles.products__flex__wrapper}>
                <Grid className={styles.ProductGridContainer} container wrap="wrap" direction="row">
                    {productFiltered.slice(0, 6).map((product) => (
                        <Grid key={product.id} item xs={12} sm={6}></Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default Products;
