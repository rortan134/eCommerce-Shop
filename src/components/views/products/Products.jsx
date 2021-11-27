import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CommerceHandler from "../../shared/commerce-context";
import Sidebar from "./Sidebar";
import Product from "./Product";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import styles from "./styles.module.scss";

function Products() {
    const commerceHandling = useContext(CommerceHandler);
    const history = useHistory();

    const [priceRange, setPriceRange] = useState([0, 4000]);
    const [productFiltered, setFilteredProduct] = useState([]);

    useEffect(() => {
        setFilteredProduct([]);
        const filterProducts = () => {
            commerceHandling.products.map((product) =>
                product.price.raw >= priceRange[0] && product.price.raw <= priceRange[1]
                    ? setFilteredProduct((prevArray) => [...prevArray, product])
                    : null
            );
        };
        filterProducts();
    }, [priceRange, commerceHandling.products]);

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    return (
        <div className={styles.products_container}>
            <Box component="section" className={styles.products__flex__wrapper}>
                <Sidebar handlePriceChange={handlePriceChange} priceRange={priceRange} />
                <Grid className={styles.ProductGridContainer} container wrap="wrap" direction="row">
                    {productFiltered.slice(0, 6).map((product) => (
                        <Grid key={product.id} item xs={12} sm={6}>
                            <Product
                                product={product}
                                customClickEvent={() => {
                                    let path = `/products/${product.permalink}`;
                                    history.push(path);
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default Products;
