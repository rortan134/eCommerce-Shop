import { commerce } from "../../../lib/commerce";
import { Snackbar, Slide, Button, Grid, Typography, IconButton } from "@material-ui/core";
import { useState, useEffect, useContext, useReducer, useCallback } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CommerceHandler from "../commerce-context";

import CloseSharp from "@material-ui/icons/CloseSharp";

const useStyles = makeStyles({
    snackbarComponent: {
        backgroundColor: "#ffffff",
        border: "1px solid rgba(255,255,255, 0.2)",
        boxShadow: "0 0 16px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
    },
    snackbar__topSpacing: {
        display: "flex",
        justifyContent: "flex-end",
        "& button": {
            padding: ".15em !important",
        },
    },
    snackbarClosed: {
        display: "none !important",
    },
    snackbar__warning: {
        padding: "0 1.2em .35em 1.2em",
    },
    snackbar__action__container: {
        padding: ".35em 1.2em 1.2em 1.2em",
    },
    snackbar__action__btn: {
        padding:" .5em 1em",
        "&:first-child": {
            marginRight: "8px",
            border: "1px solid rgba(32, 36, 49, 1)",
        },
        "&:last-child": {
            backgroundColor: "rgba(32, 36, 49, 1)",
            color: "#ffffff",
            "&:hover": {
                backgrounColor: "rgba(32, 36, 49, .85)",
            },
        },
    },
});

const reducerActions = {
    SET_BODY: "set-body",
    CLEAR: "clear",
};

function reducer(state, action) {
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
    const styles = useStyles();
    const commerceHandling = useContext(CommerceHandler);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState({});

    const [body, dispatch] = useReducer(reducer, { content: "", payload: "" });

    const dispatcher = useCallback(() => {
        dispatch({ type: reducerActions.SET_BODY, handler: message });
    }, [message, dispatch]);

    useEffect(() => {
        if (commerceHandling.itemAddedToCart) {
            const retrieveEl = async () => {
                await commerce.products.retrieve(commerceHandling.itemAddedToCart).then((product) => {
                    setMessage({
                        content: product.name,
                        payload: "was added to cart.",
                    });
                });
            };
            retrieveEl();
        }
    }, [commerceHandling.itemAddedToCart]);

    useEffect(() => {
        dispatcher();
    }, [dispatcher]);

    useEffect(() => {
        if (Object.values(message).length >= 1) setIsOpen(true);
    }, [message]);

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
