import { useContext } from "react";
import CommerceHandler from "../../shared/commerce-context";
import { Container, Typography, Grid, Button, IconButton } from "@material-ui/core";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";

import styles from "./styles.module.scss";

function Product({ product, customClickEvent }) {
    const commerceHandling = useContext(CommerceHandler);

    return (
        <div className={styles.productOuterWrap}>
            <Container>
                <Grid
                    className={styles.productWrap}
                    container
                    justifyContent="space-around"
                    alignItems="center"
                    direction="row"
                    wrap="nowrap"
                    spacing={8}
                >
                    <Container className={styles.productImage}>
                        <img src={product.image.url} alt="product" />
                    </Container>
                    <Container className={styles.productText}>
                        <Grid spacing={8} container direction="column">
                            <Typography
                                align="left"
                                style={{ color: "#4875ca", fontWeight: "500" }}
                                variant="h6"
                                nowrap
                            >
                                {product.price.raw + " €"}
                            </Typography>
                            <Typography
                                align="left"
                                style={{ color: "#333333", fontWeight: "600" }}
                                variant="h6"
                                nowrap
                            >
                                {product.name}
                            </Typography>
                            <Typography
                                dangerouslySetInnerHTML={{
                                    __html: product.description,
                                }}
                                align="left"
                                style={{ color: "#555555", fontWeight: "500" }}
                                variant="caption"
                                nowrap
                            />
                            <Grid container justifyContent="space-between" alignItems="center" direction="row">
                                <Grid item xs={7}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        className={styles.BuyButton}
                                        size="large"
                                        color="primary"
                                        onClick={customClickEvent}
                                    >
                                        Buy Now
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton
                                        onClick={() => commerceHandling.addToCart(product.id, 1)}
                                        color="primary"
                                        title="Add to Shopping Cart"
                                        aria-label="add to shopping cart"
                                    >
                                        <ShoppingBasket />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Container>
        </div>
    );
}

export default Product;
