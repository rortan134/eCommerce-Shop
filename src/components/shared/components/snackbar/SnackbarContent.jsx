import CommerceHandler from "../../commerce-context";
import { useContext, memo } from "react";
import { Snackbar, Slide, Button, Grid, Typography, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CloseSharp from "@material-ui/icons/CloseSharp";

const useStyles = makeStyles({
    snackbarComponent: {
        backgroundColor: "#ffffff",
        border: "1px solid rgba(255,255,255, 0.2)",
        boxShadow: "0 0 16px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
        maxWidth: "600px",
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
        padding: " .5em 1em",
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

function SnackbarContent({ body, closeHandler }) {
    const commerceHandling = useContext(CommerceHandler);

    const styles = useStyles();

    const SnackbarTransition = (props) => <Slide {...props} direction="up" />;

    const ToCartBtn = () =>
        commerceHandling.itemAddedToCart ? (
            <div>
                <Grid container item className={styles.snackbar__action__container}>
                    <Button className={styles.snackbar__action__btn} component={Link} to="/cart" variant="outlined" onClick={closeHandler}>
                        Cart
                    </Button>
                    <Button className={styles.snackbar__action__btn} component={Link} to="/checkout" variant="contained">
                        Proceed to payment
                    </Button>
                </Grid>
            </div>
        ) : (
            <div>
                <Grid container item className={styles.snackbar__action__container}>
                    <Grid item xs={12}>
                        <Button className={styles.snackbar__action__btn} onClick={closeHandler} variant="contained">
                            OK
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );

    return body.open ? (
        <Snackbar
            autoHideDuration={10000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            TransitionComponent={SnackbarTransition}
            onClose={closeHandler}
            className={body.open ? styles.openSnackbar : styles.snackbarClosed}
            open={body.open}
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
                <ToCartBtn />
            </Grid>
        </Snackbar>
    ) : null;
}

export default memo(SnackbarContent);
