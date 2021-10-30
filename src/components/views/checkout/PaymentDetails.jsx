import CommerceHandler from "../../shared/commerce-context";
import { useContext, useEffect, useState } from "react";
import { Typography, Button, Paper, Grid } from "@material-ui/core";
import styles from "./styles.module.scss";

function PaymentDetails() {
    const commerceHandling = useContext(CommerceHandler);
    const [purchaseDate, setPurchaseDate] = useState();

    useEffect(() => {
        var myCurrentDate = new Date();
        var date =
            myCurrentDate.getFullYear() +
            "-" +
            (myCurrentDate.getMonth() + 1) +
            "-" +
            myCurrentDate.getDate() +
            " " +
            myCurrentDate.getHours() +
            ":" +
            myCurrentDate.getMinutes() +
            ":" +
            myCurrentDate.getSeconds();
        setPurchaseDate(date);
    }, []);

    return (
        <>
            <Paper className={styles.review_paperWrapper}>
                <Typography variant="h6" style={{ marginBottom: "1em" }}>
                    Billing Details
                </Typography>

                <Grid container spacing={3}>
                    <Grid item container xs={12}>
                        <Grid item container wrap="nowrap">
                            <Grid item xs={4}>
                                <Typography variant="body1">Order Number</Typography>
                            </Grid>
                            <Grid item xs={3} />
                            <Grid item>
                                <Typography noWrap variant="body1">
                                    {commerceHandling.checkoutToken.id}
                                    <Button
                                        disableRipple
                                        style={{ color: "#4875ca" }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(commerceHandling.checkoutToken.id);
                                        }}
                                    >
                                        Copy
                                    </Button>
                                </Typography>
                                <Typography variant="caption">
                                    Always remember the order <br /> number for easy tracking
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12}>
                        <Grid item container>
                            <Grid item xs={4}>
                                <Typography variant="body1">Purchase Date</Typography>
                            </Grid>
                            <Grid item xs={3} />
                            <Grid item>
                                <Typography variant="body1">{purchaseDate}</Typography>
                                <Typography variant="caption">
                                    Expires: {commerceHandling.checkoutToken.expires}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12}>
                        <Grid item container>
                            <Grid item xs={4}>
                                <Typography variant="body1">Full Name</Typography>
                            </Grid>
                            <Grid item xs={3} />
                            <Typography variant="body1">{commerceHandling.shippingData.fullName}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12}>
                        <Grid item container>
                            <Grid item xs={4}>
                                <Typography variant="body1">Phone Number</Typography>
                            </Grid>
                            <Grid item xs={3} />
                            <Typography variant="body1">+{commerceHandling.shippingData.phoneNumber}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12}>
                        <Grid item container>
                            <Grid item xs={4}>
                                <Typography variant="body1">Email</Typography>
                            </Grid>
                            <Grid item xs={3} />
                            <Typography variant="body1">{commerceHandling.shippingData.emailAdress}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12}>
                        <Grid item container>
                            <Grid item xs={4}>
                                <Typography variant="body1">Shipping Adress</Typography>
                            </Grid>
                            <Grid item xs={3} />
                            <Typography variant="body1">
                                {commerceHandling.shippingData.shippingCountry},
                                {commerceHandling.shippingData.shippingAdress}, <br />
                                {commerceHandling.shippingData.zipCode}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default PaymentDetails;
