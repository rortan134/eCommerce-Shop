import { Button, Grid, IconButton, Slide, Snackbar, Typography } from "@mui/material";
import CloseSharp from "@mui/icons-material/CloseSharp";
import makeStyles from "@mui/styles/makeStyles";
import { memo, useContext } from "react";
import { Link } from "react-router-dom";

import CommerceHandler from "../../contexts/commerce-context";

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
        whiteSpace: "nowrap",
        "&:first-child": {
            marginRight: "8px",
        },
        "&:last-child": {
            color: "#fff !important",
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
                <Grid spacing={4} container item className={styles.snackbar__action__container}>
                    <Grid item xs={12} md={4}>
                        <Button className={styles.snackbar__action__btn} component={Link} to="/cart" variant="outlined" onClick={closeHandler}>
                            <Typography variant="boldSubtitle">Cart</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button className={styles.snackbar__action__btn} component={Link} to="/checkout" variant="contained">
                            <Typography sx={{ color: "#fff" }} variant="boldSubtitle">
                                Proceed to Payment
                            </Typography>
                        </Button>
                    </Grid>
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
            sx={{ right: "5% !important", bottom: "30px !important" }}
            TransitionComponent={SnackbarTransition}
            onClose={closeHandler}
            open={body.open}
        >
            <Grid className={styles.snackbarComponent} container direction="column">
                <div className={styles.snackbar__topSpacing}>
                    <IconButton onClick={closeHandler} size="large">
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
