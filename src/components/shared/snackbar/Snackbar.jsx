import { commerce } from "../../../lib/commerce";
import { Snackbar, Slide, Button, Grid, Typography, IconButton } from "@material-ui/core";
import { useState, useEffect, useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import CommerceHandler from "../commerce-context";

import styles from "./Snackbar.module.scss";
import CloseSharp from "@material-ui/icons/CloseSharp";

const reducerActions = {
    SET_BODY: "set-body",
    CLEAR: "clear",
};

function reducer(state, action) {
    console.log(action);
    switch (action.type) {
        case reducerActions.SET_BODY: {
            return {
                content: action.handler.content,
                payload: action.handler.payload,
            };
        }
        case reducerActions.CLEAR: {
            return {
                content: "",
                payload: "",
            };
        }
        default: {
            return {
                content: "An error has ocurred.",
                payload: "",
            };
        }
    }
}

function SnackBar() {
    const commerceHandling = useContext(CommerceHandler);
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState({});

    const [body, dispatch] = useReducer(reducer, { content: "", payload: "" });

    const retrieveProduct = async () =>
        await commerce.products.retrieve(commerceHandling.itemAddedToCart).then((product) => {
            setProduct({
                content: product.name,
                payload: "was added to cart.",
            });
        });

    useEffect(() => {
        if (commerceHandling.itemAddedToCart) {
            retrieveProduct();
        }
        if (product && commerceHandling.itemAddedToCart) {
            dispatch({ type: reducerActions.SET_BODY, handler: product });
            setIsOpen(true);
        }
    }, [commerceHandling.itemAddedToCart]);

    function SnackbarTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    function closeHandler() {
        dispatch({ type: reducerActions.CLEAR });
        commerceHandling.removeItemAddedWarning();
        setIsOpen(false);
    }

    return (
        <Snackbar
            autoHideDuration={10000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            TransitionComponent={SnackbarTransition}
            onClose={closeHandler}
            disableWindowBlurListener
            className={isOpen ? styles.openSnackbar : styles.snackbarClosed}
            open={isOpen}
        >
            <Grid className={styles.snackbarComponent} container direction="column">
                <div className={styles.snackbar__topSpacing}>
                    <IconButton onClick={closeHandler}>
                        <CloseSharp />
                    </IconButton>
                </div>

                <Typography className={styles.snackbar__warning} variant="body1" gutterBottom>
                    {body.content} {body.payload}
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
