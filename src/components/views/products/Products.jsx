import Sidebar from "./Sidebar";
import ProductGrid from "./ProductsGrid";

import Box from "@material-ui/core/Box";
import styles from "./styles.module.scss";

function Products({ products }) {
    return (
        <div className={styles.products_container}>
            <Box component="section">
                <Sidebar />
                <ProductGrid products={products} />
            </Box>
        </div>
    );
}

export default Products;
