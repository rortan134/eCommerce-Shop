import { useContext } from "react";
import CommerceHandler from "../../shared/commerce-context";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

import { Container, Typography, Button, Grid, TextField, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseSharp from "@material-ui/icons/CloseSharp";

import shoppingSVG from "../../assets/Shopping.svg";
import CartItem from "./CartItem";

const emptyCartStyle = makeStyles({
    inputStyle: {
        background: "rgba(68, 68, 68, 0.7) !important",
        color: "rgba(255, 255, 255, .8) !important",
    },
});

function Cart() {
    const commerceHandling = useContext(CommerceHandler);

    const emptyCart = emptyCartStyle();

    let isEmpty = true;

    if (commerceHandling.cart.line_items !== undefined) {
        isEmpty = !commerceHandling.cart.line_items.length;
    }

    const FilledCart = () => (
        <>
            <Grid container className={styles.filledCart_grid}>
                {commerceHandling.cart.line_items.map((item) => (
                    <Grid item xs={12} key={item.id}>
                        <CartItem
                            item={item}
                            onUpdateCartQty={commerceHandling.updateCartQty}
                            onRemoveFromCart={commerceHandling.removeFromCart}
                        />
                        <div className={styles.cardDivisor} />
                    </Grid>
                ))}
            </Grid>
        </>
    );

    return (
        <div className={styles.outmost_cartWrapper}>
            <Container className={styles.allAround_cartWrapper}>
                <div className={styles.topSpacing}>
                    <Typography variant="h4">Your Cart</Typography>
                    <IconButton component={NavLink} to="./">
                        <CloseSharp style={{ color: "#222222" }} />
                    </IconButton>
                </div>
                <div className={styles.cartScrollable}>
                    {isEmpty ? (
                        <div className={styles.emptyCart_wrapper}>
                            <img src={shoppingSVG} alt=""></img>
                            <h1>Your Cart is Empty, Start shopping some things!</h1>
                            <NavLink to="/products/">Check our products</NavLink>
                        </div>
                    ) : (
                        <FilledCart />
                    )}
                </div>
                <div className={styles.bottom_wrapper}>
                    <div className={styles.inner__bottom_wrapper}>
                        <Grid
                            className={styles.cartInfo_container}
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            direction="row"
                        >
                            <Grid item>
                                <Grid container alignItems="center" direction="row">
                                    <Typography className={styles.codePromo} variant="subtitle1">
                                        Code Promo
                                    </Typography>
                                    <TextField
                                        disabled={isEmpty ? true : null}
                                        variant="filled"
                                        size="small"
                                        defaultValue="SOFA100"
                                        hiddenLabel
                                    ></TextField>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Grid container direction="row">
                                    <Typography variant="subtitle1">Subtotal</Typography>
                                    <Typography variant="h6" className={styles.cartSubtotal_value}>
                                        {commerceHandling.cart.subtotal
                                            ? commerceHandling.cart.subtotal.formatted_with_code
                                            : null}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            disabled={isEmpty ? true : null}
                            className={`${styles.inputStyle} ${isEmpty ? emptyCart.inputStyle : ""}`}
                            component={NavLink}
                            to="/checkout"
                            exact
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </Container>
            <div className={styles.cartBackdrop} />
        </div>
    );
}

export default Cart;
