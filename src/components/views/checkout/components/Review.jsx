import { Typography, List, ListItem, ListItemText, Paper, Divider, Grid, Button } from "@material-ui/core";
import { useContext } from "react";
import CommerceHandler from "../../../shared/commerce-context";
import styles from "../styles.module.scss";

function Review() {
    const commerceHandling = useContext(CommerceHandler);

    let items = commerceHandling.checkoutToken
        ? commerceHandling.checkoutToken.live.line_items.map((product) => ({
              productId: product.id,
              productName: product.name,
              productImage: product.image.url,
              productQty: product.quantity,
              productPrice: product.line_total.formatted_with_symbol,
          }))
        : null;

    return commerceHandling.checkoutToken ? (
        <>
            <Paper className={styles.review_paperWrapper}>
                <Typography variant="h6" gutterBottom>
                    Order Review
                </Typography>
                <List style={{ marginBottom: "1em" }}>
                    <Typography variant="subtitle1">Items</Typography>
                    {items.map((product) => (
                        <ListItem key={product.productName}>
                            <img
                                src={product.productImage}
                                width="60px"
                                height="auto"
                                style={{ marginRight: "1em", display: "inline-block" }}
                                alt={product.productName}
                            />
                            <ListItemText primary={product.productName} secondary={`Quantity: ${product.productQty}`} />
                            <Grid item>
                                <Typography variant="subtitle1">{product.productPrice}</Typography>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
                <Grid container item xs={12} spacing={3}>
                    {commerceHandling.currentShipping && commerceHandling.activeStep === 1 ? (
                        <Grid item container xs={12} justifyContent="space-between">
                            <Typography variant="subtitle1">Shipping</Typography>
                            <Typography>{commerceHandling.currentShipping.price.formatted_with_symbol}</Typography>
                        </Grid>
                    ) : null}
                    <Grid item container xs={12} justifyContent="space-between">
                        <Typography variant="subtitle1">Subtotal</Typography>
                        <Typography>
                            {commerceHandling.currentShipping
                                ? commerceHandling.currentShipping.live.subtotal.formatted_with_symbol
                                : commerceHandling.checkoutToken.live.subtotal.formatted_with_symbol}
                        </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent="space-between">
                        <Typography variant="subtitle1">Promo Code</Typography>
                        <Typography>
                            {commerceHandling.checkoutToken.live.discount.length !== 0 ? (
                                commerceHandling.checkoutToken.live.discount
                            ) : (
                                <Button style={{ color: "#4875ca" }}>Insert Promo Code</Button>
                            )}
                        </Typography>
                    </Grid>
                    <Divider variant="middle" style={{ backgroundColor: "rgba(0,0,0, .3)", width: "100%" }} />
                    <Grid item container xs={12} justifyContent="space-between">
                        <Typography variant="h6">Grand Total</Typography>
                        <Typography variant="h6">
                            {commerceHandling.currentShipping
                                ? commerceHandling.currentShipping.live.total.formatted_with_symbol
                                : commerceHandling.checkoutToken.live.total.formatted_with_symbol}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
    ) : null;
}

export default Review;
