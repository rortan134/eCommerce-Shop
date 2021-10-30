import Grid from "@material-ui/core/Grid";
import styles from "./styles.module.scss";
import Product from "./Product";

function ProductGrid({ products }) {
    return (
        <Grid className={styles.ProductGridContainer} container wrap="wrap" direction="row">
            {products.map((product) => (
                <Grid key={product.id} item xs={12} sm={6}>
                    <Product product={product} />
                </Grid>
            ))}
        </Grid>
    );
}
export default ProductGrid;
