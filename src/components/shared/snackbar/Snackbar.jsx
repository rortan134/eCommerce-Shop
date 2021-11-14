import { commerce } from "../../../lib/commerce";
import { Snackbar, Slide, Button, Grid, Typography, IconButton } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CommerceHandler from "../commerce-context";

import styles from "./Snackbar.module.scss";
import CloseSharp from "@material-ui/icons/CloseSharp";

function SnackBar() {
    let [itemWarning, setItemWarning] = useState();

    const commerceHandling = useContext(CommerceHandler);

    useEffect(() => {
        if (commerceHandling.itemAddedToCart !== undefined) {
            commerce.products
                .retrieve(commerceHandling.itemAddedToCart)
                .then((product) => setItemWarning(`"${product.name}" was added to cart.`));
        }
    }, [commerceHandling.cartQty, commerceHandling.itemAddedToCart]);

    function SnackbarTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    function closeHandler() {
        commerceHandling.removeItemAddedWarning();
        setItemWarning();
    }

    return (
        <Snackbar
            autoHideDuration={10000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            TransitionComponent={SnackbarTransition}
            onClose={closeHandler}
            disableWindowBlurListener
            className={itemWarning ? styles.openSnackbar : styles.snackbarClosed}
            open={itemWarning ? true : false}
        >
            <Grid className={styles.snackbarComponent} container direction="column">
                <div className={styles.snackbar__topSpacing}>
                    <IconButton onClick={closeHandler}>
                        <CloseSharp />
                    </IconButton>
                </div>
                <Typography className={styles.snackbar__warning} variant="body1" gutterBottom>
                    {itemWarning ? itemWarning : null}
                </Typography>
                <Grid container item className={styles.snackbar__action__container}>
                    <Button
                        className={styles.snackbar__action__btn}
                        component={Link}
                        to="/cart"
                        variant="outlined"
                        onClick={closeHandler}
                    >
                        Cart
                    </Button>
                    <Button
                        className={styles.snackbar__action__btn}
                        component={Link}
                        to="/checkout"
                        variant="contained"
                    >
                        Proceed to payment
                    </Button>
                </Grid>
            </Grid>
        </Snackbar>
    );
}

export default SnackBar;
